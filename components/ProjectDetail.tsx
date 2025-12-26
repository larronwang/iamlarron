import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../types';
import { X, ArrowRight, ArrowLeft, Play, ExternalLink, Download, Maximize2, ChevronLeft, ChevronRight, Award } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isNextAvailable: boolean;
  isPrevAvailable: boolean;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ 
  project, 
  onClose, 
  onNext, 
  onPrev,
  isNextAvailable, 
  isPrevAvailable 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [activePreviewUrl, setActivePreviewUrl] = useState<string | null>(null);

  const COMPETITION_IMAGE = "https://i.imgur.com/2TOJliv.jpeg";
  const OUTCOME_IMAGE = "https://i.imgur.com/9GJsJ7S.jpeg";

  // Identify if this project should use the single-image-per-row layout (First 8: Large & Medium)
  const isOnePerRow = project.id.startsWith('l') || project.id.startsWith('m');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [project.id]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (previewIndex !== null) {
          setPreviewIndex(null);
        } else if (activePreviewUrl !== null) {
          setActivePreviewUrl(null);
        } else {
          onClose();
        }
      } else if (previewIndex !== null && project.schematicImages) {
        if (e.key === 'ArrowRight') {
          handleNextImage();
        } else if (e.key === 'ArrowLeft') {
          handlePrevImage();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [previewIndex, activePreviewUrl, project.schematicImages, onClose]);

  const handleNextImage = () => {
    if (previewIndex !== null && project.schematicImages) {
      setPreviewIndex((previewIndex + 1) % project.schematicImages.length);
    }
  };

  const handlePrevImage = () => {
    if (previewIndex !== null && project.schematicImages) {
      setPreviewIndex((previewIndex - 1 + project.schematicImages.length) % project.schematicImages.length);
    }
  };

  const hasSchematics = project.schematicImages && project.schematicImages.length > 0;

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getYoutubeId(project.videoUrl || '');
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1` : null;
  const isDirectVideo = project.videoUrl?.match(/\.(mp4|webm|ogg)$/i);

  const VideoShowcase = () => (
    (embedUrl || isDirectVideo) ? (
      <div className="w-full bg-white pb-32">
          <div className="py-24 text-center">
              <h3 className="text-sm md:text-base font-bold uppercase tracking-[0.4em] text-black">
                  {project.videoLabel || "Project Showcase"}
              </h3>
          </div>
          <div className="max-w-[82vw] mx-auto px-0">
              <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden group border border-gray-100 shadow-sm transition-all duration-700 hover:shadow-2xl">
                  {embedUrl ? (
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={embedUrl}
                        title={`${project.title} Video Showcase`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                  ) : (
                    <video 
                      className="absolute inset-0 w-full h-full object-contain bg-black"
                      controls
                      playsInline
                      src={project.videoUrl}
                    />
                  )}
              </div>
              <div className="mt-12 flex flex-col md:flex-row md:items-start justify-between gap-12 px-4 md:px-0">
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-black text-white rounded-full">
                            <Play className="w-4 h-4 fill-current" />
                        </div>
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">
                            {project.title === 'GRUMPIES' ? 'Gameplay Highlights' : 'Validation Phase — Live Demo'}
                        </p>
                    </div>
                    
                    {project.downloadUrl && (
                      <div className="flex flex-col gap-4 pl-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Build Access</span>
                        <a 
                          href={project.downloadUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-4 px-10 py-6 bg-blue-600 text-white font-black uppercase tracking-[0.25em] text-sm md:text-base hover:bg-black transition-all duration-500 shadow-[0_25px_50px_-12px_rgba(0,113,227,0.4)] hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 w-fit group"
                        >
                          <Download className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                          <span>Download Game</span>
                          <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                        </a>
                        <p className="text-[9px] font-mono text-gray-400 uppercase tracking-[0.2em]">
                          Available on {project.downloadUrl.split('/')[2]}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {videoId && (
                    <a 
                      href={project.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gray-400 hover:text-black transition-colors md:mt-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Watch on Source</span>
                    </a>
                  )}
              </div>
          </div>
      </div>
    ) : null
  );

  const isLongTitle = project.title.length > 15;

  return (
    <div className="fixed inset-0 z-[2000] bg-white flex flex-col animate-in fade-in zoom-in-95 duration-500">
      
      {/* Lightbox for Single Image Previews */}
      {activePreviewUrl !== null && (
        <div 
          className="fixed inset-0 z-[3000] bg-black/95 flex flex-col items-center justify-center animate-in fade-in duration-300"
          onClick={() => setActivePreviewUrl(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2 z-[3002]"
            onClick={(e) => { e.stopPropagation(); setActivePreviewUrl(null); }}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full h-full flex items-center justify-center p-4 md:p-12 pointer-events-none">
            <img 
              src={activePreviewUrl} 
              className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-90 duration-500 pointer-events-auto" 
              alt="Full Preview"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="absolute bottom-8 text-white/40 font-mono text-[10px] uppercase tracking-[0.4em]">
            Click anywhere to close
          </div>
        </div>
      )}

      {/* Lightbox for Schematic Images Preview */}
      {previewIndex !== null && project.schematicImages && (
        <div 
          className="fixed inset-0 z-[3000] bg-black/95 flex flex-col items-center justify-center animate-in fade-in duration-300"
          onClick={() => setPreviewIndex(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2 z-[3002]"
            onClick={(e) => { e.stopPropagation(); setPreviewIndex(null); }}
          >
            <X className="w-8 h-8" />
          </button>

          {project.schematicImages.length > 1 && (
            <>
              <button 
                className="absolute left-4 md:left-8 text-white/30 hover:text-white transition-all p-4 z-[3001] bg-white/5 rounded-full hover:bg-white/10"
                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
              >
                <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
              </button>
              <button 
                className="absolute right-4 md:right-8 text-white/30 hover:text-white transition-all p-4 z-[3001] bg-white/5 rounded-full hover:bg-white/10"
                onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
              >
                <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
              </button>
            </>
          )}

          <div className="w-full h-full flex items-center justify-center p-4 md:p-12 pointer-events-none">
            <img 
              src={project.schematicImages[previewIndex]} 
              className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-90 duration-500 pointer-events-auto" 
              alt={`Schematic View ${previewIndex + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="absolute bottom-8 left-0 w-full flex flex-col items-center gap-2 pointer-events-none">
            <span className="text-[10px] font-mono text-white/60 uppercase tracking-[0.4em]">
              Sheet. {previewIndex + 1} / {project.schematicImages.length}
            </span>
            <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest hidden md:block">
              Use arrow keys to navigate • Esc to close
            </span>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50 text-black">
        <button 
            onClick={onClose} 
            className="flex items-center gap-3 group cursor-pointer"
        >
            <div className="p-2 rounded-full border border-black/10 group-hover:bg-black group-hover:text-white transition-all duration-300">
                <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="uppercase tracking-widest text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">Back to Work</span>
        </button>
        
        <button 
            onClick={onClose}
            className="p-2 hover:opacity-50 transition-opacity"
        >
            <X className="w-6 h-6" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden bg-white">
        
        {/* Header Layout */}
        <div className="max-w-7xl mx-auto px-6 pt-32 md:pt-48 pb-20">
            <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center md:items-start">
                <div className="w-full md:w-1/2 aspect-square bg-gray-50 border border-gray-100 overflow-hidden shadow-2xl">
                    <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                <div className="w-full md:w-1/2 pt-4 flex flex-col justify-center h-full">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-mono text-blue-600 uppercase tracking-[0.3em] font-bold">
                                {project.category}
                            </span>
                            <div className="h-[1px] w-8 bg-gray-200"></div>
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em]">
                                {project.year}
                            </span>
                        </div>
                        
                        <h1 className={`
                            ${isLongTitle ? 'text-4xl md:text-6xl max-w-lg leading-[0.95]' : 'text-5xl md:text-8xl leading-[0.85]'}
                            font-black text-black tracking-tighter uppercase
                        `}>
                            {isLongTitle ? (
                                project.title
                            ) : (
                                project.title.split(' ').map((word, i) => (
                                    <span key={i} className="block">{word}</span>
                                ))
                            )}
                        </h1>
                        
                        <div className="pt-8 max-w-md">
                            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div className="pt-12 flex gap-12 border-t border-gray-100">
                            <div className="space-y-1">
                                <h3 className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Role</h3>
                                <p className="text-sm font-semibold">{project.role}</p>
                            </div>
                            {project.designAdvisor && (
                              <div className="space-y-1">
                                  <h3 className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Advisor</h3>
                                  <p className="text-sm font-semibold">{project.designAdvisor}</p>
                              </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Editorial Content */}
        <div className="bg-gray-50/50 border-y border-gray-100">
            <div className="max-w-4xl mx-auto px-6 py-32 md:py-48">
                <div className="space-y-12">
                    <span className="text-black font-mono text-xs uppercase tracking-[0.5em] block">Overview</span>
                    <p className="text-3xl md:text-5xl leading-tight font-serif text-gray-900 tracking-tight italic">
                        "{project.fullDescription}"
                    </p>
                </div>
            </div>
        </div>

        {project.videoPosition === 'before' && <VideoShowcase />}

        {/* Process Content */}
        <div className="w-full bg-white">
            {project.id === 'l4' && (
              <div className="max-w-6xl mx-auto px-6 pt-32 pb-12">
                  <div className="py-12 text-center">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-[1px] w-8 bg-blue-200"></div>
                        <Award className="w-5 h-5 text-blue-600" />
                        <div className="h-[1px] w-8 bg-blue-200"></div>
                      </div>
                      <h3 className="text-[10px] font-mono uppercase tracking-[0.4em] text-blue-600 font-black">
                          Competition Showcase
                      </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 pb-32 items-start">
                    {[COMPETITION_IMAGE, OUTCOME_IMAGE].map((url, i) => (
                        <div 
                          key={i} 
                          onClick={() => setActivePreviewUrl(url)}
                          className="relative w-full h-auto overflow-hidden bg-white group border border-gray-100 shadow-sm transition-all duration-700 hover:shadow-2xl cursor-zoom-in"
                        >
                             <img 
                                src={url} 
                                className="w-full h-auto object-contain transition-transform duration-1000 ease-in-out group-hover:scale-[1.01]" 
                                alt={i === 0 ? "Competition Drawing" : "Outcome Showcase"} 
                             />
                             <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <div className="p-4 bg-white/90 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <Maximize2 className="w-6 h-6 text-black" />
                                </div>
                             </div>
                             <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                  <span className="text-[9px] font-mono bg-black/80 backdrop-blur-sm text-white px-4 py-2 uppercase tracking-[0.3em] shadow-xl">
                                    {i === 0 ? "Competition" : "Outcome"}
                                  </span>
                             </div>
                        </div>
                    ))}
                  </div>
                  <div className="flex justify-center pt-8">
                       <a 
                          href="https://www.cgc-jp.com/kyougi/archive/59th/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-4 px-10 py-5 bg-white border border-gray-200 text-black font-black uppercase tracking-[0.25em] text-[10px] md:text-xs hover:bg-black hover:text-white transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1 active:translate-y-0 group"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Official Competition Archive</span>
                          <ArrowRight className="w-3 h-3 opacity-30 group-hover:translate-x-1 transition-transform" />
                        </a>
                  </div>
                  <div className="mt-32 h-[1px] w-full bg-gray-100"></div>
              </div>
            )}

            {project.externalUrl && (
              <div className="flex justify-center pt-24">
                  <a 
                    href={project.externalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 px-12 py-7 bg-black text-white font-black uppercase tracking-[0.3em] text-sm md:text-base hover:bg-blue-600 transition-all duration-500 shadow-2xl hover:-translate-y-1 active:translate-y-0 w-fit group"
                  >
                    <ExternalLink className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    <span>{project.externalUrlLabel || "View Project"}</span>
                    <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                  </a>
              </div>
            )}

            {hasSchematics && (
                <>
                    <div className="py-24 text-center">
                        <span className="text-[10px] font-mono uppercase tracking-[0.6em] text-gray-300">
                            DESIGN SHOWCASE
                        </span>
                    </div>
                    
                    <div className="max-w-[82vw] mx-auto px-0">
                        {/* Grid changes based on project importance: First 8 projects stack full-width, others grid */}
                        <div className={`grid grid-cols-1 ${!isOnePerRow && project.schematicImages && project.schematicImages.length > 1 ? 'md:grid-cols-2' : ''} ${isOnePerRow ? 'gap-24 md:gap-40' : 'gap-12 md:gap-20'} pb-32 items-start`}>
                            {project.schematicImages?.map((url, i) => (
                                <div 
                                  key={i} 
                                  onClick={() => setPreviewIndex(i)}
                                  className="relative w-full h-auto overflow-hidden bg-white group border border-gray-100 shadow-sm transition-all duration-700 hover:shadow-2xl cursor-zoom-in"
                                >
                                     <img 
                                        src={url} 
                                        className="w-full h-auto object-contain transition-transform duration-1000 ease-in-out group-hover:scale-[1.01]" 
                                        alt={`Design Drawing ${i + 1}`} 
                                     />
                                     <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <div className="p-4 bg-white/90 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <Maximize2 className="w-6 h-6 text-black" />
                                        </div>
                                     </div>
                                     <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                          <span className="text-[9px] font-mono bg-black/80 backdrop-blur-sm text-white px-4 py-2 uppercase tracking-[0.3em] shadow-xl">
                                            Sheet. 0{i+1}
                                          </span>
                                     </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>

        {(project.videoPosition === 'after' || !project.videoPosition) && <VideoShowcase />}

        {/* Unified Navigation Footer */}
        <div className="flex flex-col md:flex-row border-t border-gray-100 min-h-[40vh] md:min-h-[50vh]">
            {/* Previous Project Button */}
            <div 
                onClick={isPrevAvailable ? onPrev : undefined}
                className={`
                    flex-1 flex flex-col justify-center items-center text-center p-12 border-b md:border-b-0 md:border-r border-gray-100
                    ${isPrevAvailable ? 'bg-white text-black cursor-pointer hover:bg-gray-50' : 'bg-gray-50 text-gray-200 cursor-default'}
                    transition-colors duration-500 group
                `}
            >
                {isPrevAvailable ? (
                    <div className="space-y-6">
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-[0.4em]">Previous</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none group-hover:-translate-x-2 transition-transform duration-500">
                            Prev <br/>Project
                        </h2>
                        <div className="flex justify-center mt-8">
                            <div className="p-4 rounded-full border border-black/5 group-hover:bg-black group-hover:text-white transition-all duration-500">
                                <ArrowLeft className="w-8 h-8" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold tracking-tighter opacity-10 uppercase">Start of List</h2>
                    </div>
                )}
            </div>

            {/* Next Project Button */}
            <div 
                onClick={isNextAvailable ? onNext : undefined}
                className={`
                    flex-1 flex flex-col justify-center items-center text-center p-12
                    ${isNextAvailable ? 'bg-black text-white cursor-pointer hover:bg-zinc-900' : 'bg-gray-100 text-gray-400 cursor-default'}
                    transition-colors duration-500 group
                `}
            >
                {isNextAvailable ? (
                    <div className="space-y-6">
                        <span className="text-xs font-mono text-gray-500 uppercase tracking-[0.4em]">Forward</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none group-hover:translate-x-2 transition-transform duration-500">
                            Next <br/>Project
                        </h2>
                        <div className="flex justify-center mt-8">
                            <div className="p-4 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                                <ArrowRight className="w-8 h-8" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold tracking-tighter opacity-30 uppercase">The End</h2>
                        <button onClick={onClose} className="text-xs font-mono uppercase tracking-widest border-b border-gray-400 pb-1 hover:text-black hover:border-black transition-all">Return to Home</button>
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;