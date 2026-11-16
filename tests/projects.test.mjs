import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(resolve(root, 'constants.ts'), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS }
}).outputText;
const module = { exports: {} };
runInNewContext(compiled, { module, exports: module.exports });
const { ALL_PROJECTS, KEY_PROJECTS, LARGE_PROJECTS, MEDIUM_PROJECTS } = module.exports;
const newIds = ['l-same-table', 'l-the-pass', 'l-classroom'];

test('all 14 original projects remain and the three new projects lead the medium tier', () => {
  assert.equal(ALL_PROJECTS.length, 17);
  assert.deepEqual(Array.from(MEDIUM_PROJECTS.slice(0, 3), p => p.id), newIds);
  assert.deepEqual(Array.from(KEY_PROJECTS, p => p.id), ['l1', 'l2', 'l3', 'l4']);
  assert.equal(LARGE_PROJECTS.length, 4);
  for (const id of newIds) {
    assert.equal(ALL_PROJECTS.find(p => p.id === id).displaySize, 'medium');
    assert.ok(!LARGE_PROJECTS.some(p => p.id === id));
  }
  assert.deepEqual(Array.from(ALL_PROJECTS.slice(4, 7), p => p.id), newIds);
  for (const id of ['l1', 'l2', 'l3', 'l4', 'm1', 'm2', 'm3', 'm4', 's0', 's1', 's2', 's3', 's4', 's5']) {
    assert.ok(ALL_PROJECTS.some(p => p.id === id), `Missing original project ${id}`);
  }
  assert.equal(new Set(ALL_PROJECTS.map(p => p.id)).size, ALL_PROJECTS.length);
});

test('every new project has a real local cover, process images, captions and case-study content', () => {
  for (const project of ALL_PROJECTS.filter(p => newIds.includes(p.id))) {
    assert.ok(project.caseStudy.length >= 4);
    assert.equal(project.schematicImages.length, project.imageCaptions.length);
    for (const url of [project.imageUrl, ...project.schematicImages]) {
      assert.ok(url.startsWith('/projects/'));
      assert.ok(existsSync(resolve(root, 'public', url.slice(1))), `Missing asset: ${url}`);
    }
  }
});

test('demo destinations are correct and the self-contained game is included', () => {
  assert.equal(ALL_PROJECTS.find(p => p.id === 'l-same-table').externalUrl, 'https://same-table-next-time.netlify.app');
  const pass = ALL_PROJECTS.find(p => p.id === 'l-the-pass');
  assert.equal(pass.externalUrl, '/demos/the-pass.html');
  const html = readFileSync(resolve(root, 'public', pass.externalUrl.slice(1)), 'utf8');
  assert.match(html, /The Pass/);
  assert.match(html, /Start a 4-minute service/);
});

test('HCI contribution, team attribution and unvalidated concepts are explicit', () => {
  const hci = ALL_PROJECTS.find(p => p.id === 'l-classroom');
  const text = hci.caseStudy.map(s => s.body).join(' ');
  assert.match(hci.status, /In progress/);
  assert.match(text, /four-person team project/);
  assert.match(text, /designed and built the whole Figma prototype/);
  assert.match(text, /Teammates ran/);
  assert.match(text, /sample data and scripted interactions; it is not a working classroom system/);
  assert.match(text, /think-aloud sessions/);
  assert.equal(hci.externalUrl, '/case-studies/question-parking-lot.html');
  assert.equal(hci.extraLinks.map(l => l.label).join(' | '), 'Figma prototype · Student | Figma prototype · Instructor');
  assert.ok(hci.extraLinks.every(l => l.url.startsWith('https://www.figma.com/proto/CQxlXj2BGaYYTSDvdYpBt9')));
  assert.ok(existsSync(resolve(root, 'public', hci.externalUrl.slice(1))));
});
