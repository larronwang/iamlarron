export const HERO_NAME = 'CHE.';
// Tight ink bounds of the supplied artwork; keep the original image untouched.
export const HERO_WORDMARK = { src: '/projects/che-wordmark.png', x: 682, y: 621, width: 1292, height: 340 };
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

export function heroWordmarkLayout(width: number, height: number, zoom: number) {
  const aspect = HERO_WORDMARK.width / HERO_WORDMARK.height;
  const widthRatio = width < 640 ? 0.76 : 0.55;
  const baseWidth = Math.min(width * widthRatio, height * 1.05, 760);
  const inkWidth = Math.min(baseWidth * clamp(zoom, MIN_ZOOM, MAX_ZOOM), width * 0.88, height * 0.38 * aspect);
  const inkHeight = inkWidth / aspect;
  return { x: (width - inkWidth) / 2, y: height * 0.46 - inkHeight / 2, width: inkWidth, height: inkHeight };
}

export function deckScale(width: number, height: number) {
  const widthScale = clamp(0.38 + (width - 360) * 0.47 / 1240, 0.36, 0.85);
  const heightScale = Math.max(0.12, (height - 200) / 470);
  return Math.min(widthScale, heightScale);
}
