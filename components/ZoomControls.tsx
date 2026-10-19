import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { MAX_ZOOM, MIN_ZOOM } from '../interactionLayout';

interface ZoomControlsProps {
  label: string;
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

export default function ZoomControls({ label, zoom, zoomIn, zoomOut, resetZoom }: ZoomControlsProps) {
  return (
    <div role="group" aria-label={`${label} scale`} className="inline-flex items-center gap-1 border border-black/10 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-sm">
      <button type="button" onClick={zoomOut} disabled={zoom <= MIN_ZOOM} aria-label={`Zoom out ${label}`} className="p-2 rounded-full hover:bg-black/5 disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
        <Minus className="w-3.5 h-3.5" />
      </button>
      <button type="button" onClick={resetZoom} aria-label={`Reset ${label} zoom`} title="Reset to automatic size" className="min-w-[46px] py-2 px-1 font-mono text-[10px] text-gray-600 rounded-full hover:bg-black/5 focus-visible:outline focus-visible:outline-2">
        {Math.round(zoom * 100)}%
      </button>
      <button type="button" onClick={zoomIn} disabled={zoom >= MAX_ZOOM} aria-label={`Zoom in ${label}`} className="p-2 rounded-full hover:bg-black/5 disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
