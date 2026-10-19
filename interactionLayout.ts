export const HERO_NAME = 'yiyang che wang';
export const HERO_LINES = ['yiyang che', 'wang'];
export const MIN_ZOOM = 0.55;
export const MAX_ZOOM = 1.65;

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function wheelZoom(current: number, deltaY: number, deltaMode = 0, height = 720) {
  const pixels = deltaY * (deltaMode === 1 ? 16 : deltaMode === 2 ? height : 1);
  return clamp(current * Math.exp(-clamp(pixels, -160, 160) * 0.002), MIN_ZOOM, MAX_ZOOM);
}

export function handleZoomWheel(event: Pick<WheelEvent, 'ctrlKey' | 'metaKey' | 'defaultPrevented' | 'deltaY' | 'deltaMode' | 'preventDefault' | 'stopPropagation'>,
  update: (transform: (current: number) => number) => void, height: number) {
  if ((!event.ctrlKey && !event.metaKey) || event.defaultPrevented) return false;
  event.preventDefault();
  event.stopPropagation();
  update(current => wheelZoom(current, event.deltaY, event.deltaMode, height));
  return true;
}

export function heroLayout(width: number, height: number, zoom: number,
  measure: (text: string, size: number) => number) {
  const baseSize = Math.max(20, Math.min(width * 0.12, height * 0.15, 120));
  let fontSize = baseSize * clamp(zoom, MIN_ZOOM, MAX_ZOOM);
  const widest = Math.max(...HERO_LINES.map(line => measure(line, fontSize)));
  const textHeight = fontSize * (1 + 1.08 * (HERO_LINES.length - 1));
  fontSize *= Math.min(1, width * 0.82 / Math.max(1, widest), height * 0.42 / Math.max(1, textHeight));
  const lineHeight = fontSize * 1.08;
  return { fontSize, lineHeight, startY: height * 0.46 - lineHeight * (HERO_LINES.length - 1) / 2 };
}

export function deckScale(width: number, height: number) {
  const widthScale = clamp(0.38 + (width - 360) * 0.47 / 1240, 0.36, 0.85);
  const heightScale = Math.max(0.12, (height - 200) / 470);
  return Math.min(widthScale, heightScale);
}
