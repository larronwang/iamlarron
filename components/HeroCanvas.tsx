import React, { useEffect, useRef, useState } from 'react';
import { DEFAULT_HOME_ZOOM, HERO_NAME, HERO_WORDMARK, heroWordmarkLayout } from '../interactionLayout';
import { useInteractiveViewport } from './useInteractiveViewport';
import ZoomControls from './ZoomControls';

const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const viewport = useInteractiveViewport(containerRef, DEFAULT_HOME_ZOOM);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Use alpha: false to optimize and ensure solid background filling
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId = 0;
    let disposed = false;
    let dpr = 1;
    let width = 0;
    let height = 0;
    
    let mouse = { x: -9999, y: -9999, radius: 0 };
    const BASE_GAP = 2;
    const wordmark = new Image();
    
    class Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      friction = 0.90; 
      ease = 0.05;

      constructor(x: number, y: number, color: string, size: number) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.vx = 0;
        this.vy = 0;
        this.color = color;
        this.size = size;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            const forceDirectionX = dx / Math.max(distance, 0.001);
            const forceDirectionY = dy / Math.max(distance, 0.001);
            const d = distance / mouse.radius;
            const force = Math.pow(1 - d, 2); 
            const variance = 0.5 + Math.random() * 1.5;
            const explosionStrength = 65 * force * variance;
            
            this.vx -= forceDirectionX * explosionStrength;
            this.vy -= forceDirectionY * explosionStrength;
        }

        const homeDx = this.originX - this.x;
        const homeDy = this.originY - this.y;
        this.vx += homeDx * this.ease;
        this.vy += homeDy * this.ease;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const init = (artwork: HTMLImageElement | null) => {
      if (!canvas || !container || !ctx) return;

      particles = [];
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width * dpr);
      height = Math.floor(rect.height * dpr);

      if (width === 0 || height === 0) return;

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      mouse.radius = Math.max(35, Math.min(rect.width * 0.06, 65)) * dpr;

      // Ensure background is filled immediately
      ctx.fillStyle = '#F5F5F7'; 
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = '#1D1D1F';
      const layout = heroWordmarkLayout(rect.width, rect.height, viewport.zoom);
      if (artwork) {
        ctx.drawImage(artwork, HERO_WORDMARK.x, HERO_WORDMARK.y, HERO_WORDMARK.width, HERO_WORDMARK.height,
          layout.x * dpr, layout.y * dpr, layout.width * dpr, layout.height * dpr);
      } else {
        // A readable fallback keeps the home usable if the local artwork cannot load.
        ctx.font = `italic 700 ${layout.height * dpr}px cursive`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(HERO_NAME, width / 2, rect.height * 0.46 * dpr, layout.width * dpr);
      }

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      ctx.clearRect(0, 0, width, height);

      const gap = Math.max(BASE_GAP * dpr, 2); 
      const particleRadius = gap * 0.6; 

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const iy = Math.floor(y);
          const ix = Math.floor(x);
          if (ix >= width || iy >= height) continue;
          const index = (iy * width + ix) * 4;
          if (data[index + 3] > 128 && data[index] < 200) {
            const randomX = x + (Math.random() - 0.5) * (gap * 0.5);
            const randomY = y + (Math.random() - 0.5) * (gap * 0.5);
            particles.push(new Particle(randomX, randomY, '#1D1D1F', particleRadius));
          }
        }
      }
      setIsReady(true);
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.fillStyle = '#F5F5F7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
    };
    const handleMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Immediate background fill to prevent any empty frame
    const initialRect = container.getBoundingClientRect();
    if (initialRect.width > 0) {
        canvas.width = initialRect.width * Math.min(window.devicePixelRatio || 1, 2);
        canvas.height = initialRect.height * Math.min(window.devicePixelRatio || 1, 2);
        ctx.fillStyle = '#F5F5F7';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const start = (artwork: HTMLImageElement | null) => {
      if (disposed) return;
      init(artwork);
      animate();
    };
    wordmark.onload = () => start(wordmark);
    wordmark.onerror = () => start(null);
    wordmark.src = HERO_WORDMARK.src;

    return () => {
      disposed = true;
      wordmark.onload = null;
      wordmark.onerror = null;
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [viewport.width, viewport.height, viewport.zoom]);

  return (
    <div ref={containerRef} aria-label="Interactive CHE. signature" className="w-full h-full bg-[#F5F5F7] relative select-none overflow-hidden">
      <h1 className="sr-only">{HERO_NAME} — Yiyang Che Wang</h1>
      <canvas 
        aria-hidden="true"
        ref={canvasRef} 
        className={`block w-full h-full transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Texture with solid backdrop visibility */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.4] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply"></div>
      
      <div className={`absolute bottom-28 w-full px-6 text-center pointer-events-none transition-all duration-1000 delay-300 ${isReady ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-[clamp(8px,0.9vw,11px)] font-semibold tracking-[0.2em] text-gray-400 uppercase">
            Always pursuing human-centric design
          </p>
      </div>

      <div className={`absolute bottom-5 sm:bottom-8 left-6 pointer-events-none transition-opacity duration-1000 delay-500 ${isReady ? 'opacity-50' : 'opacity-0'}`}>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-400">
             Scroll to Explore
          </span>
      </div>
      <div className="absolute bottom-3 sm:bottom-5 right-4 sm:right-6 flex items-center gap-3">
        <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-widest text-gray-400">Ctrl / ⌘ + scroll</span>
        <ZoomControls label="home" {...viewport} />
      </div>
    </div>
  );
};

export default HeroCanvas;
