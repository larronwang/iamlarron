import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import ts from 'typescript';

const source = readFileSync(new URL('../interactionLayout.ts', import.meta.url), 'utf8');
const module = { exports: {} };
runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText,
  { module, exports: module.exports });
const { HERO_NAME, HERO_WORDMARK, heroWordmarkLayout, deckScale, wheelZoom, handleZoomWheel, MIN_ZOOM, MAX_ZOOM } = module.exports;
const { DEFAULT_HOME_ZOOM, DEFAULT_PORTFOLIO_ZOOM } = module.exports;

test('home starts at 80% and portfolio at 70% without losing responsive sizing', () => {
  assert.equal(DEFAULT_HOME_ZOOM, 0.8);
  assert.equal(DEFAULT_PORTFOLIO_ZOOM, 0.7);
  for (const [width, height] of [[390, 844], [1280, 720]]) {
    const fullSize = heroWordmarkLayout(width, height, 1);
    const defaultSize = heroWordmarkLayout(width, height, DEFAULT_HOME_ZOOM);
    assert.ok(Math.abs(defaultSize.width / fullSize.width - 0.8) < 0.001);
    assert.ok(defaultSize.x > fullSize.x);
  }
  assert.ok(deckScale(390, 600) * DEFAULT_PORTFOLIO_ZOOM < deckScale(1280, 600) * DEFAULT_PORTFOLIO_ZOOM);
});

test('interactive signature uses the provided CHE. artwork', () => {
  assert.equal(HERO_NAME, 'CHE.');
  assert.equal(HERO_WORDMARK.src, '/projects/che-wordmark.png');
  const artwork = readFileSync(new URL(`../public${HERO_WORDMARK.src}`, import.meta.url));
  assert.equal(artwork.subarray(1, 4).toString(), 'PNG');
  assert.ok(HERO_WORDMARK.x + HERO_WORDMARK.width <= 2388);
  assert.ok(HERO_WORDMARK.y + HERO_WORDMARK.height <= 1668);
});

test('signature preserves its proportions and fits every viewport and zoom boundary', () => {
  for (const [width, height] of [[320, 568], [390, 844], [844, 390], [1280, 720], [1920, 1080]]) {
    for (const zoom of [MIN_ZOOM, 1, MAX_ZOOM]) {
      const layout = heroWordmarkLayout(width, height, zoom);
      assert.ok(layout.width <= width * 0.88 + 0.01);
      assert.ok(layout.height <= height * 0.38 + 0.01);
      assert.ok(Math.abs(layout.width / layout.height - HERO_WORDMARK.width / HERO_WORDMARK.height) < 0.001);
      assert.ok(layout.x >= 0 && layout.y >= 0);
      assert.ok(layout.x + layout.width <= width && layout.y + layout.height <= height);
    }
  }
  assert.ok(heroWordmarkLayout(390, 844, 1).width < heroWordmarkLayout(1280, 720, 1).width);
  assert.ok(heroWordmarkLayout(1280, 720, MAX_ZOOM).width > heroWordmarkLayout(1280, 720, 1).width);
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
