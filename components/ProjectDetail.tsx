import React, { useEffect, useRef } from 'react';
import { Project } from '../types';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  onNext: () => void;
  isNextAvailable: boolean;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose, onNext, isNextAvailable }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when project changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    // Prevent body scrolling behind the modal
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  return (
    // Z-INDEX UPDATE: Increased to z-[2000] to ensure it covers the 3D Deck (which uses z-1000)
    <div className="fixed inset-0 z-[2000] bg-white flex flex-col animate-in fade-in duration-300">
      
      {/* Top Navigation Bar - Sticky & Blend Mode for visibility on dark/light images */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 pointer-events-none mix-blend-difference text-white">
        <button 
            onClick={onClose} 
            className="pointer-events-auto flex items-center gap-3 group cursor-pointer"
        >
            <div className="p-2 rounded-full border border-white/30 group-hover:bg-white group-hover:text-black transition-all">
                <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="uppercase tracking-widest text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">Back</span>
        </button>
        
        <div className="hidden md:block uppercase tracking-[0.2em] text-xs font-bold">
            {project.category} — {project.year}
        </div>
        
        <button 
            onClick={onClose}
            className="pointer-events-auto p-2 hover:opacity-70 transition-opacity"
        >
            <X className="w-8 h-8" />
        </button>
      </div>

      {/* Main Scrollable Content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden bg-white">
        
        {/* 1. Hero Section */}
        <div className="relative w-full h-[70vh] md:h-[85vh]">
            <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-20">
                <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-4 leading-none">
                    {project.title}
                </h1>
                <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light">
                    {project.description}
                </p>
            </div>
        </div>

        {/* 2. Metadata Grid */}
        <div className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
                    <div className="space-y-2">
                        <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Role</h3>
                        <p className="text-lg font-medium">{project.role}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Year</h3>
                        <p className="text-lg font-medium">{project.year}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Category</h3>
                        <p className="text-lg font-medium">{project.category}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Client</h3>
                        <p className="text-lg font-medium">Confidential</p>
                    </div>
                </div>
            </div>
        </div>

        {/* 3. Editorial Content */}
        <div className="max-w-4xl mx-auto px-6 py-24">
             {/* Introduction */}
            <div className="mb-20">
                <span className="text-blue-600 font-mono text-sm mb-6 block">01 — The Challenge</span>
                <p className="text-2xl md:text-4xl leading-relaxed font-serif text-gray-900">
                    {project.fullDescription}
                </p>
            </div>

            {/* Simulated Process Text */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 text-gray-600 leading-8 text-lg">
                <p>
                    Our approach began with a deep dive into user behavior. We identified key friction points in the existing journey and mapped out a new, streamlined architecture. The goal was to reduce cognitive load while maximizing engagement through micro-interactions.
                </p>
                <p>
                    By stripping away the non-essential, we revealed the core value proposition. The visual language evolved to be quieter, allowing the content to take center stage. Every animation was timed to 60fps to ensure a buttery smooth experience.
                </p>
            </div>
        </div>

        {/* 4. Image Gallery / Visuals */}
        <div className="w-full bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-6 space-y-24">
                
                {/* Image 1: Full Width */}
                <div className="w-full">
                    <img 
                        src={`https://picsum.photos/seed/${project.id}full/1600/900`} 
                        className="w-full h-auto shadow-2xl rounded-sm"
                        alt="Design System"
                    />
                    <p className="mt-4 text-xs text-center text-gray-400 uppercase tracking-widest">Design System Components</p>
                </div>

                {/* Grid: 2 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-8">
                        <span className="text-blue-600 font-mono text-sm block">02 — The Details</span>
                        <h3 className="text-3xl font-bold">Precision in every pixel.</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We developed a custom iconography set to match the brand's geometric roots. The color palette was restrained to monochromatic tones with a single accent color to guide user action.
                        </p>
                    </div>
                    <div className="h-[600px] overflow-hidden rounded-sm shadow-xl">
                         <img 
                            src={`https://picsum.photos/seed/${project.id}vert/800/1200`} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]"
                            alt="Mobile View"
                        />
                    </div>
                </div>

                {/* Grid: 3 Columns Staggered */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="h-64 md:h-80 bg-gray-200">
                        <img src={`https://picsum.photos/seed/${project.id}g1/600/600`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                     </div>
                     <div className="h-64 md:h-80 bg-gray-200 md:mt-12">
                        <img src={`https://picsum.photos/seed/${project.id}g2/600/600`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                     </div>
                     <div className="h-64 md:h-80 bg-gray-200 md:mt-24">
                        <img src={`https://picsum.photos/seed/${project.id}g3/600/600`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                     </div>
                </div>
            </div>
        </div>

        {/* 5. Process Schematics (6 Images, 16:9, Static) */}
        <div className="w-full bg-white">
            <div className="py-8 text-center">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400">Technical Schematics</span>
            </div>
            {/* Changed to grid-cols-1 for single column full-width stack */}
            <div className="grid grid-cols-1 gap-1 bg-white pb-24">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="relative aspect-video w-full overflow-hidden bg-gray-100">
                         <img 
                            src={`https://picsum.photos/seed/${project.id}-schematic-${i}/1920/1080`} 
                            className="w-full h-full object-cover"
                            alt={`Schematic ${i + 1}`}
                        />
                        <div className="absolute bottom-4 left-4">
                             <span className="text-[10px] font-mono bg-white/90 text-black px-2 py-1 uppercase">Fig. 0{i+1}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* 6. Next Project Footer */}
        <div 
            onClick={isNextAvailable ? onNext : undefined}
            className={`
                min-h-[50vh] flex flex-col justify-center items-center text-center p-12
                ${isNextAvailable ? 'bg-black text-white cursor-pointer hover:bg-gray-900' : 'bg-gray-100 text-gray-400 cursor-default'}
                transition-colors duration-500
            `}
        >
            {isNextAvailable ? (
                <div className="group space-y-6">
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Up Next</span>
                    <h2 className="text-6xl md:text-8xl font-bold tracking-tighter group-hover:scale-105 transition-transform duration-500">
                        Next Project
                    </h2>
                    <div className="flex justify-center mt-8">
                        <div className="p-4 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all duration-300">
                            <ArrowRight className="w-8 h-8" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tighter opacity-50">End of Portfolio</h2>
                    <button onClick={onClose} className="text-sm underline underline-offset-4 hover:text-black transition-colors">Return Home</button>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;
