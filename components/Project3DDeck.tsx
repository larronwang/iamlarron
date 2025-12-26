import React, { useMemo, useState } from 'react';
import { Project } from '../types';
import { ArrowRight } from 'lucide-react';

interface Project3DDeckProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  // Added featuredIds to interface to fix the reported TypeScript error in App.tsx
  featuredIds?: string[];
  className?: string;
}

const Project3DDeck: React.FC<Project3DDeckProps> = ({ 
  projects, 
  onProjectClick, 
  // Destructured featuredIds from props to match the caller's usage
  featuredIds = [],
  className = ""
}) => {
  const deckId = useMemo(() => `deck-${Math.random().toString(36).substr(2, 9)}`, []);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const seededRandom = (seed: number) => {
    const x = Math.sin(seed * 9999) * 10000;
    return x - Math.floor(x);
  };

  const hoveredProject = hoveredIndex !== null ? projects[hoveredIndex] : null;
  
  const getActivePushDistance = () => {
    if (!hoveredProject) return 0;
    switch (hoveredProject.displaySize) {
      case 'large': return 420;
      case 'medium': return 300;
      case 'small': return 180;
      default: return 220;
    }
  };

  const activePushDistance = getActivePushDistance();

  return (
    <div className={`w-full ${className} flex justify-center`}>
      <style>{`
        .${deckId}-container {
           perspective: 1500px;
           perspective-origin: 50% 50%;
        }

        .${deckId}-card {
          transform-style: preserve-3d;
          transform-origin: center bottom;
          transition: 
            transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), 
            margin 0.6s cubic-bezier(0.2, 0.8, 0.2, 1),
            width 0.6s ease,
            height 0.6s ease,
            z-index 0s;
          will-change: transform, margin-left;
        }

        .${deckId}-spine {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 1px;
          transform-origin: left;
          transform: rotateY(-90deg);
          background: rgba(0,0,0,0.08);
          pointer-events: none;
        }

        .${deckId}-shadow {
           position: absolute;
           bottom: 0;
           left: 5%;
           width: 90%;
           height: 20px;
           background: radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, transparent 70%);
           filter: blur(8px);
           opacity: 0.4;
           transform: rotateX(90deg) translateY(10px);
           transition: all 0.6s;
           pointer-events: none;
        }

        .${deckId}-card.active .${deckId}-shadow {
           opacity: 0.15;
           transform: rotateX(90deg) translateY(40px) scale(1.2);
           filter: blur(15px);
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className={`${deckId}-container w-full overflow-x-auto overflow-y-visible no-scrollbar py-32 flex justify-center`}>
        <div className="flex items-end px-12 pb-20 pt-12" style={{ transformStyle: 'preserve-3d' }}>
          {projects.map((project, index) => {
            const r1 = seededRandom(index * 7 + 1);
            const r2 = seededRandom(index * 3 + 2);
            const r3 = seededRandom(index * 11 + 3);
            
            let baseWidth = 220;
            let baseMargin = -150;
            
            if (project.displaySize === 'large') {
                baseWidth = 440;
                baseMargin = -320;
            } else if (project.displaySize === 'medium') {
                baseWidth = 310;
                baseMargin = -210;
            } else {
                baseWidth = 190;
                baseMargin = -130;
            }

            const variance = 10;
            const width = baseWidth + (r1 * variance * 2 - variance);
            // Image is strictly square, but card container is taller to fit text below
            const imageHeight = width; 
            const textHeight = 80;
            const totalHeight = imageHeight + textHeight;

            const baseRotY = 50 + (r2 * 5); 
            const baseRotX = (r3 * 4 - 2);
            const baseRotZ = (r1 * 2 - 1);

            const marginLeft = index === 0 ? 0 : baseMargin;

            const isHovered = hoveredIndex === index;
            const isLeft = hoveredIndex !== null && index < hoveredIndex;
            const isRight = hoveredIndex !== null && index > hoveredIndex;

            let transformString = `rotateY(${baseRotY}deg) rotateX(${baseRotX}deg) rotateZ(${baseRotZ}deg)`;
            let zIndex = index + 10;
            let activeClass = '';

            if (hoveredIndex !== null) {
              if (isHovered) {
                transformString = `translateX(0px) rotateY(0deg) rotateX(0deg) rotateZ(0deg) scale(1.1) translateZ(180px)`;
                zIndex = 1000;
                activeClass = 'active';
              } else if (isLeft) {
                transformString = `translateX(-${activePushDistance}px) ` + transformString;
              } else if (isRight) {
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
                   width: `${width}px`,
                   height: `${totalHeight}px`,
                   zIndex: zIndex,
                   marginLeft: `${marginLeft}px`,
                   transform: transformString,
                }}
              >
                {/* Shadow logic attached to the bottom of the square image, not the whole container */}
                <div className={`${deckId}-shadow`} style={{ bottom: `${textHeight}px` }}></div>
                <div className={`${deckId}-spine`} style={{ height: `${imageHeight}px` }}></div>

                {/* 1. Square Image Surface */}
                <div 
                  className="absolute top-0 left-0 w-full bg-white shadow-xl backface-hidden overflow-hidden border border-gray-100"
                  style={{ height: `${imageHeight}px` }}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  
                  {/* Visual textures */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-20 pointer-events-none" />
                </div>

                {/* 2. Text Label Area (External - Below Image) */}
                <div 
                  className={`
                    absolute left-0 w-full flex flex-col justify-start pt-4 transition-all duration-500
                    ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                  `}
                  style={{ top: `${imageHeight}px`, height: `${textHeight}px` }}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-mono text-blue-500 mb-1 uppercase tracking-[0.2em]">
                        {project.category}
                      </p>
                      <h4 className={`text-black font-bold leading-tight tracking-tight ${project.displaySize === 'large' ? 'text-2xl' : 'text-base'}`}>
                        {project.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-medium">
                        {project.year} — {project.role}
                      </p>
                    </div>
                    
                    <div className="flex-none mt-1 p-2 rounded-full bg-gray-50 border border-gray-100 group-hover:bg-black group-hover:text-white transition-all duration-300">
                      <ArrowRight className="w-4 h-4" />
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