import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const source = readFileSync(new URL('../interactionLayout.ts', import.meta.url), 'utf8');
const module = { exports: {} };
runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText,
  { module, exports: module.exports });
const { HERO_NAME, HERO_LINES, heroLayout, deckScale, wheelZoom, handleZoomWheel, MIN_ZOOM, MAX_ZOOM } = module.exports;
const measure = (text, size) => text.length * size * 0.65;

test('interactive heading spells the requested name exactly', () => {
  assert.equal(HERO_NAME, 'yiyang che wang');
  assert.equal(HERO_LINES.join(' '), HERO_NAME);
});

test('name typography fits small, landscape and large viewports at every zoom boundary', () => {
  for (const [width, height] of [[320, 568], [390, 844], [844, 390], [1280, 720], [1920, 1080]]) {
    for (const zoom of [MIN_ZOOM, 1, MAX_ZOOM]) {
      const layout = heroLayout(width, height, zoom, measure);
      assert.ok(Math.max(...HERO_LINES.map(line => measure(line, layout.fontSize))) <= width * 0.82 + 0.01);
      assert.ok(layout.fontSize + layout.lineHeight <= height * 0.42 + 0.01);
    }
  }
  assert.ok(heroLayout(390, 844, 1, measure).fontSize < heroLayout(1280, 720, 1, measure).fontSize);
  assert.ok(heroLayout(1280, 720, 1, measure).fontSize < 140);
});

test('card scale responds to width and available height and stays smaller than the old default', () => {
  assert.ok(deckScale(390, 600) < deckScale(1280, 500));
  assert.ok(deckScale(1280, 300) < deckScale(1280, 600));
  assert.ok(deckScale(1920, 900) <= 0.85);
  assert.ok(deckScale(320, 240) > 0);
  for (const height of [280, 320, 500, 700]) {
    assert.ok(450 * deckScale(1280, height) + 198 <= height, 'Default card, caption, toolbar and padding fit the available height');
  }
});

test('wheel zoom direction, delta normalization, and limits are stable', () => {
  assert.ok(wheelZoom(1, -100) > 1);
  assert.ok(wheelZoom(1, 100) < 1);
  assert.equal(wheelZoom(1, 0), 1);
  assert.equal(wheelZoom(MAX_ZOOM, -1000), MAX_ZOOM);
  assert.equal(wheelZoom(MIN_ZOOM, 1000), MIN_ZOOM);
  assert.equal(wheelZoom(1, 2, 1), wheelZoom(1, 32, 0));
});

test('Ctrl and Command wheel gestures zoom locally; ordinary and consumed wheel events are untouched', () => {
  for (const modifier of ['ctrlKey', 'metaKey']) {
    let zoom = 1, prevented = false, stopped = false;
    const event = { ctrlKey: false, metaKey: false, defaultPrevented: false, deltaY: -80, deltaMode: 0,
      preventDefault: () => { prevented = true; }, stopPropagation: () => { stopped = true; }, [modifier]: true };
    assert.equal(handleZoomWheel(event, update => { zoom = update(zoom); }, 720), true);
    assert.ok(zoom > 1);
    assert.ok(prevented && stopped);
  }
  for (const defaultPrevented of [false, true]) {
    const event = { ctrlKey: defaultPrevented, metaKey: false, defaultPrevented, deltaY: 80, deltaMode: 0,
      preventDefault: () => assert.fail('Must not consume ordinary or already-consumed wheel'),
      stopPropagation: () => assert.fail('Must not consume ordinary or already-consumed wheel') };
    assert.equal(handleZoomWheel(event, () => assert.fail('Must not zoom'), 720), false);
  }
});
