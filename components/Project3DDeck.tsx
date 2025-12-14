import React, { useMemo, useState } from 'react';
import { Project } from '../types';
import { ArrowRight } from 'lucide-react';

interface Project3DDeckProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  featuredIds?: string[];
  title?: string;
  className?: string;
}

const Project3DDeck: React.FC<Project3DDeckProps> = ({ 
  projects, 
  onProjectClick, 
  featuredIds = [],
  title,
  className = ""
}) => {
  const deckId = useMemo(() => `deck-${Math.random().toString(36).substr(2, 9)}`, []);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Deterministic random generator for layout variations
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed * 9999) * 10000;
    return x - Math.floor(x);
  };

  // Determine properties of the currently hovered item to adjust animation physics
  const hoveredProject = hoveredIndex !== null ? projects[hoveredIndex] : null;
  const isHoveredFeatured = hoveredProject ? featuredIds.includes(hoveredProject.id) : false;
  
  // Dynamic Push Distance:
  // If the active card is "Featured" (Large), we need a large push (320px) to prevent clipping.
  // If the active card is "Small", we use a smaller push (180px) so neighbors don't fly away too far.
  const activePushDistance = isHoveredFeatured ? 320 : 180;

  return (
    <div className={`w-full ${className} flex justify-center`}>
      <style>{`
        .${deckId}-container {
           perspective: 1500px;
           perspective-origin: 50% 50%;
        }

        /* 
           Card Base 
        */
        .${deckId}-card {
          transform-style: preserve-3d;
          transform-origin: center bottom;
          /* Smooth transition for all transform changes */
          transition: 
            transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), 
            margin 0.6s cubic-bezier(0.2, 0.8, 0.2, 1),
            width 0.6s ease,
            height 0.6s ease,
            z-index 0s;
          will-change: transform, margin-left;
        }

        /* 
           The Spine (Thickness) - Super thin like photo paper
        */
        .${deckId}-spine {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 1px; /* Thinned to 1px */
          transform-origin: left;
          transform: rotateY(-90deg);
          background: rgba(0,0,0,0.1);
        }

        /* Shadow Element */
        .${deckId}-shadow {
           position: absolute;
           bottom: -15px;
           left: 5%;
           width: 90%;
           height: 15px;
           background: radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, transparent 70%);
           filter: blur(5px);
           opacity: 0.4;
           transform: rotateX(90deg) translateZ(0px);
           transition: all 0.6s;
           pointer-events: none;
        }

        /* Show shadow depth when hovered/lifted */
        .${deckId}-card.active .${deckId}-shadow {
           opacity: 0.2;
           transform: rotateX(90deg) translateZ(-60px) scale(1.1);
           filter: blur(10px);
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {title && (
        <h3 className="px-6 md:px-12 text-sm font-bold uppercase tracking-widest text-gray-400 mb-8 ml-4">
          {title}
        </h3>
      )}

      {/* Scroll Container */}
      <div 
        className={`${deckId}-container w-full overflow-x-auto overflow-y-visible no-scrollbar py-20 flex justify-center`}
      >
        {/* Flex container */}
        <div className="flex items-end px-12 pb-8 pt-12" style={{ transformStyle: 'preserve-3d' }}>
          {projects.map((project, index) => {
            const isFeatured = featuredIds.includes(project.id);
            
            // Random calc
            const r1 = seededRandom(index * 7 + 1);
            const r2 = seededRandom(index * 3 + 2);
            const r3 = seededRandom(index * 11 + 3);
            
            // Size: Compact
            const baseSize = isFeatured ? 400 : 220; 
            const variance = isFeatured ? 20 : 15;
            const size = baseSize + (r1 * variance * 2 - variance);

            // Base Rotation: Tighter angles
            const baseRotY = 50 + (r2 * 5); 
            const baseRotX = (r3 * 4 - 2);
            const baseRotZ = (r1 * 2 - 1);

            // Margins: Slightly looser than before to allow breathing room (-300 -> -260, -190 -> -150)
            const baseMargin = isFeatured ? -260 : -150;
            const marginVar = 5;
            const randomMarginOffset = (r3 * marginVar * 2 - marginVar);
            const marginLeft = index === 0 ? 0 : baseMargin + randomMarginOffset;

            // --- INTERACTION LOGIC ---
            const isHovered = hoveredIndex === index;
            const isLeft = hoveredIndex !== null && index < hoveredIndex;
            const isRight = hoveredIndex !== null && index > hoveredIndex;

            let transformString = `rotateY(${baseRotY}deg) rotateX(${baseRotX}deg) rotateZ(${baseRotZ}deg)`;
            let zIndex = index + 10;
            let activeClass = '';

            if (hoveredIndex !== null) {
              if (isHovered) {
                // ACTIVE CARD: Flat, scaled up, pulled forward
                transformString = `translateX(0px) rotateY(0deg) rotateX(0deg) rotateZ(0deg) scale(1.15) translateZ(100px)`;
                zIndex = 1000;
                activeClass = 'active';
              } else if (isLeft) {
                // LEFT NEIGHBORS: Push left
                transformString = `translateX(-${activePushDistance}px) ` + transformString;
              } else if (isRight) {
                // RIGHT NEIGHBORS: Push right
                transformString = `translateX(${activePushDistance}px) ` + transformString;
              }
            }

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onProjectClick(project)}
                className={`
                  ${deckId}-card ${activeClass}
                  relative flex-none
                  cursor-pointer group
                `}
                style={{ 
                   width: `${size}px`,
                   height: `${size}px`,
                   zIndex: zIndex,
                   marginLeft: `${marginLeft}px`,
                   transform: transformString,
                }}
              >
                {/* Floor Shadow */}
                <div className={`${deckId}-shadow`}></div>

                {/* 1. Spine (Paper thin) */}
                <div className={`${deckId}-spine`}></div>

                {/* 2. Front Face */}
                <div className="absolute inset-0 bg-white shadow-2xl backface-hidden overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                  />
                  
                  {/* Texture */}
                  <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                  
                  {/* Subtle Reflection Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-40 pointer-events-none" />

                  {/* Hover Overlay Content */}
                  <div className={`absolute inset-0 bg-black/80 flex flex-col justify-center items-center text-center p-8 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                     <span className="text-xs font-mono text-blue-400 mb-4 uppercase tracking-wider">{project.category}</span>
                     <h4 className="text-white text-xl font-bold leading-none tracking-tight mb-6">{project.title}</h4>
                     
                     <div className="flex items-center gap-3 text-white/70 text-xs uppercase tracking-widest border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
                        View <ArrowRight className="w-3 h-3" />
                     </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Project3DDeck;
