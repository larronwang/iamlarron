import { RefObject, useEffect, useState } from 'react';
import { clamp, handleZoomWheel, MAX_ZOOM, MIN_ZOOM } from '../interactionLayout';

export function useInteractiveViewport<T extends HTMLElement>(ref: RefObject<T>) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => {
      const { width, height } = element.getBoundingClientRect();
      setSize(previous => previous.width === width && previous.height === height
        ? previous : { width, height });
    };
    const onWheel = (event: WheelEvent) => {
      handleZoomWheel(event, setZoom, element.clientHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    element.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      observer.disconnect();
      element.removeEventListener('wheel', onWheel);
    };
  }, [ref]);

  return {
    ...size, zoom,
    zoomIn: () => setZoom(current => clamp(current * 1.12, MIN_ZOOM, MAX_ZOOM)),
    zoomOut: () => setZoom(current => clamp(current / 1.12, MIN_ZOOM, MAX_ZOOM)),
    resetZoom: () => setZoom(1),
  };
}
