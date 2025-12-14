import React, { useEffect, useRef } from 'react';

const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let dpr = 1;
    let width = 0;
    let height = 0;
    
    // Interaction settings
    let mouse = { x: -9999, y: -9999, radius: 0 };

    const BASE_GAP = 3; 
    
    class Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      
      // Physics: Adjusted for fluid, natural feel
      friction = 0.90; 
      ease = 0.05; // Reduced slightly to prevent "snapping" at edges

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
        // Overlap slightly to create solid look
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        // 1. Calculate distance to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // 2. Interaction Logic
        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            
            // Normalize distance (0 at center, 1 at edge)
            const d = distance / mouse.radius;
            
            // QUADRATIC FALLOFF (The Key Fix)
            const force = Math.pow(1 - d, 2); 

            // VARIANCE
            // Higher variance for more "jumping" / lively edge
            const variance = 0.5 + Math.random() * 1.5;
            
            // Increased strength for larger amplitude
            const explosionStrength = 65 * force * variance;
            
            this.vx -= forceDirectionX * explosionStrength;
            this.vy -= forceDirectionY * explosionStrength;
        }

        // 3. Homing Logic
        const homeDx = this.originX - this.x;
        const homeDy = this.originY - this.y;
        
        this.vx += homeDx * this.ease;
        this.vy += homeDy * this.ease;

        // 4. Physics Step
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const init = () => {
      // Ensure we have valid references
      if (!canvas || !container || !ctx) return;

      particles = [];
      dpr = window.devicePixelRatio || 1;
      
      const rect = container.getBoundingClientRect();
      
      width = Math.floor(rect.width * dpr);
      height = Math.floor(rect.height * dpr);

      // Guard against 0-size (e.g., if container is hidden)
      if (width === 0 || height === 0) return;

      canvas.width = width;
      canvas.height = height;
      
      // Scale via CSS to fit container
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Smaller interaction radius for precision
      mouse.radius = 70 * dpr;

      // 1. Background Setup
      ctx.fillStyle = '#F5F5F7'; 
      ctx.fillRect(0, 0, width, height);
      
      // 2. Text Setup
      ctx.fillStyle = '#1D1D1F';
      
      // Dynamic font size calculation (scaled by DPR)
      const fontSize = Math.min(width / 5, 220 * dpr); 
      const lineHeight = fontSize * 0.95; 
      
      ctx.font = `900 ${fontSize}px 'Inter', -apple-system, BlinkMacSystemFont, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const totalTextHeight = lineHeight * 2;
      const startY = (height - totalTextHeight) / 2 + (lineHeight / 2);

      // Draw Text
      ctx.fillText("I'M", width / 2, startY);
      ctx.fillText("LARRON", width / 2, startY + lineHeight);

      // 3. Analyze pixels
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      ctx.clearRect(0, 0, width, height);

      // 4. Create Particles
      // Ensure gap is at least 1 pixel
      const gap = Math.max(BASE_GAP * dpr, 2); 
      const particleRadius = gap * 0.6; 

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          // Use integer coordinates for array indexing
          const iy = Math.floor(y);
          const ix = Math.floor(x);
          
          if (ix >= width || iy >= height) continue;

          // Calculate 1D index: (Row * Width + Col) * 4 channels
          const index = (iy * width + ix) * 4;
          
          // Check pixel opacity/darkness
          // Alpha > 128 (not transparent) AND Red < 200 (dark color)
          if (data[index + 3] > 128 && data[index] < 200) {
            // Add slight randomness to position to prevent "grid" look
            const randomX = x + (Math.random() - 0.5) * (gap * 0.5);
            const randomY = y + (Math.random() - 0.5) * (gap * 0.5);
            
            particles.push(new Particle(randomX, randomY, '#1D1D1F', particleRadius));
          }
        }
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear with Light Background
      ctx.fillStyle = '#F5F5F7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
    };

    const handleTouchMove = (e: TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = (e.touches[0].clientX - rect.left) * dpr;
        mouse.y = (e.touches[0].clientY - rect.top) * dpr;
    };

    const handleMouseLeave = () => {
        mouse.x = -9999;
        mouse.y = -9999;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Initial setup: Wait for fonts to be ready to ensure text draws correctly
    document.fonts.ready.then(() => {
        init();
    });
    
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-[#F5F5F7] relative select-none overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
      />
      
      {/* Subtle Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.4] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply"></div>
      
      {/* Tagline */}
      <div className="absolute bottom-28 w-full text-center pointer-events-none">
          <p className="text-[11px] md:text-sm font-semibold tracking-[0.25em] text-gray-400 uppercase opacity-70">
            Always pursuing human-centric design
          </p>
      </div>

      <div className="absolute bottom-12 w-full text-center opacity-40 pointer-events-none">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-400">
             Scroll to Explore
          </span>
      </div>
    </div>
  );
};

export default HeroCanvas;
