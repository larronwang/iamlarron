
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

// Added React import to resolve React.FC namespace issue
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
        if (previewIndex !== null) setPreviewIndex(null);
        else if (activePreviewUrl !== null) setActivePreviewUrl(null);
        else onClose();
      } else if (previewIndex !== null && project.schematicImages) {
        if (e.key === 'ArrowRight') handleNextImage();
        else if (e.key === 'ArrowLeft') handlePrevImage();
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
      <div className="w-full bg-white pb-[10vh]">
          <div className="py-[6vh] text-center">
              <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-black">
                  {project.videoLabel || "Project Showcase"}
              </h3>
          </div>
          <div className="max-w-[85vw] mx-auto">
              <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden border border-gray-100 shadow-sm transition-all duration-700 hover:shadow-2xl">
                  {embedUrl ? (
                    <iframe className="absolute inset-0 w-full h-full" src={embedUrl} title="Showcase" frameBorder="0" allowFullScreen loading="lazy"></iframe>
                  ) : (
                    <video className="absolute inset-0 w-full h-full object-contain bg-black" controls playsInline src={project.videoUrl} />
                  )}
              </div>
              <div className="mt-[4vh] flex flex-col md:flex-row md:items-start justify-between gap-6 px-2">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-black text-white rounded-full">
                            <Play className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                        </div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
                            {project.title === 'GRUMPIES' ? 'Gameplay Highlights' : 'Live Demo'}
                        </p>
                    </div>
                    {project.downloadUrl && (
                      <div className="flex flex-col gap-3">
                        <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-6 py-4 bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-sm hover:bg-black transition-all duration-500 shadow-xl w-fit">
                          <Download className="w-4 h-4" />
                          <span>Download Game</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
              </div>
          </div>
      </div>
    ) : null
  );

  return (
    <div className="fixed inset-0 z-[2000] bg-white flex flex-col animate-in fade-in zoom-in-95 duration-500 overflow-hidden">
      
      {/* Lightbox logic remains but icons scaled */}
      {(activePreviewUrl || previewIndex !== null) && (
        <div className="fixed inset-0 z-[3000] bg-black/95 flex flex-col items-center justify-center animate-in fade-in duration-300" onClick={() => { setActivePreviewUrl(null); setPreviewIndex(null); }}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white p-2">
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <div className="w-full h-full flex items-center justify-center p-6 md:p-12">
            <img src={activePreviewUrl || (project.schematicImages ? project.schematicImages[previewIndex!] : '')} className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-90 duration-500" alt="Preview" />
          </div>
        </div>
      )}

      {/* Main Nav Bar - Proportional Sizing */}
      <div className="absolute top-0 left-0 w-full px-[4vw] py-[3vh] flex justify-between items-center z-50 text-black">
        <button onClick={onClose} className="flex items-center gap-2 group">
            <div className="p-1.5 md:p-2 rounded-full border border-black/10 group-hover:bg-black group-hover:text-white transition-all">
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span className="uppercase tracking-widest text-[9px] font-bold hidden md:block">Back</span>
        </button>
        <button onClick={onClose} className="p-1.5 md:p-2 hover:opacity-50 transition-opacity">
            <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden bg-white no-scrollbar">
        
        {/* Proportional Header */}
        <div className="max-w-[90vw] md:max-w-7xl mx-auto px-4 pt-[15vh] pb-[10vh]">
            <div className="flex flex-col md:flex-row gap-[6vw] items-center md:items-stretch">
                <div className="w-full md:w-1/2 aspect-square max-h-[60vh] md:max-h-none overflow-hidden shadow-2xl border border-gray-100">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <div className="space-y-[2vh]">
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] md:text-[10px] font-mono text-blue-600 uppercase tracking-[0.3em] font-bold">{project.category}</span>
                            <div className="h-[1px] w-6 bg-gray-200"></div>
                            <span className="text-[9px] md:text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em]">{project.year}</span>
                        </div>
                        
                        <h1 className="text-[clamp(2.5rem,10vw,5rem)] font-black text-black tracking-tighter uppercase leading-[0.9]">
                            {project.title.split(' ').map((word, i) => (
                                <span key={i} className="block">{word}</span>
                            ))}
                        </h1>
                        
                        <p className="text-[clamp(1rem,2vw,1.5rem)] text-gray-600 font-light leading-relaxed max-w-lg">
                            {project.description}
                        </p>

                        <div className="pt-[4vh] flex gap-[4vw] border-t border-gray-100">
                            <div>
                                <h3 className="text-[8px] uppercase tracking-widest text-gray-400 font-bold mb-1">Role</h3>
                                <p className="text-[10px] md:text-xs font-semibold">{project.role}</p>
                            </div>
                            {project.designAdvisor && (
                              <div>
                                  <h3 className="text-[8px] uppercase tracking-widest text-gray-400 font-bold mb-1">Advisor</h3>
                                  <p className="text-[10px] md:text-xs font-semibold">{project.designAdvisor}</p>
                              </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Proportional Overview Section */}
        <div className="bg-gray-50/50 border-y border-gray-100">
            <div className="max-w-[80vw] md:max-w-4xl mx-auto py-[12vh]">
                <div className="space-y-[4vh]">
                    <span className="text-black font-mono text-[9px] md:text-[10px] uppercase tracking-[0.5em] block">Overview</span>
                    <p className="text-[clamp(1.5rem,4vw,2.5rem)] leading-tight font-serif text-gray-900 tracking-tight italic">
                        "{project.fullDescription}"
                    </p>
                </div>
            </div>
        </div>

        {project.videoPosition === 'before' && <VideoShowcase />}

        {/* Process Content - Proportional Grids */}
        <div className="w-full bg-white">
            {project.id === 'l4' && (
              <div className="max-w-[85vw] md:max-w-6xl mx-auto py-[8vh]">
                  <div className="py-8 text-center">
                      <Award className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                      <h3 className="text-[9px] font-mono uppercase tracking-[0.4em] text-blue-600 font-black">Competition Showcase</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[4vw] pb-[8vh]">
                    {[COMPETITION_IMAGE, OUTCOME_IMAGE].map((url, i) => (
                        <div key={i} onClick={() => setActivePreviewUrl(url)} className="relative overflow-hidden border border-gray-100 cursor-zoom-in group">
                             <img src={url} className="w-full h-auto" alt="Showcase" />
                             <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Maximize2 className="w-6 h-6 text-black" />
                             </div>
                        </div>
                    ))}
                  </div>
              </div>
            )}

            {project.externalUrl && (
              <div className="flex justify-center py-[6vh]">
                  <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-5 bg-black text-white font-black uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-blue-600 transition-all shadow-2xl group">
                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                    <span>{project.externalUrlLabel || "View Project"}</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
              </div>
            )}

            {hasSchematics && (
                <div className="max-w-[85vw] mx-auto pb-[10vh]">
                    <div className="py-[6vh] text-center">
                        <span className="text-[9px] font-mono uppercase tracking-[0.6em] text-gray-300">DESIGN SHOWCASE</span>
                    </div>
                    <div className={`grid grid-cols-1 ${!isOnePerRow && project.schematicImages && project.schematicImages.length > 1 ? 'md:grid-cols-2' : ''} gap-[4vw] md:gap-[6vw] items-start`}>
                        {project.schematicImages?.map((url, i) => (
                            <div key={i} onClick={() => setPreviewIndex(i)} className="relative w-full overflow-hidden border border-gray-100 cursor-zoom-in group">
                                 <img src={url} className="w-full h-auto" alt={`Drawing ${i + 1}`} />
                                 <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <span className="text-[8px] font-mono bg-black/80 text-white px-3 py-1.5 uppercase tracking-[0.2em]">Sheet. {i+1}</span>
                                 </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {(project.videoPosition === 'after' || !project.videoPosition) && <VideoShowcase />}

        {/* Proportional Navigation Footer */}
        <div className="flex flex-col md:flex-row border-t border-gray-100 min-h-[30vh]">
            <div onClick={isPrevAvailable ? onPrev : undefined} className={`flex-1 flex flex-col justify-center items-center p-[6vw] border-b md:border-b-0 md:border-r border-gray-100 ${isPrevAvailable ? 'bg-white cursor-pointer hover:bg-gray-50' : 'bg-gray-50 text-gray-200'} transition-colors group`}>
                {isPrevAvailable && (
                    <div className="text-center space-y-4">
                        <span className="text-[8px] font-mono text-gray-400 uppercase tracking-[0.4em]">Previous</span>
                        <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-black uppercase leading-none">Prev Project</h2>
                        <ArrowLeft className="w-6 h-6 md:w-8 md:h-8 mx-auto mt-4 transition-transform group-hover:-translate-x-1" />
                    </div>
                )}
            </div>
            <div onClick={isNextAvailable ? onNext : undefined} className={`flex-1 flex flex-col justify-center items-center p-[6vw] ${isNextAvailable ? 'bg-black text-white cursor-pointer hover:bg-zinc-900' : 'bg-gray-100 text-gray-400'} transition-colors group`}>
                {isNextAvailable ? (
                    <div className="text-center space-y-4">
                        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-[0.4em]">Forward</span>
                        <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-black uppercase leading-none">Next Project</h2>
                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8 mx-auto mt-4 transition-transform group-hover:translate-x-1" />
                    </div>
                ) : (
                    <button onClick={onClose} className="text-[9px] font-mono uppercase tracking-widest border-b border-gray-400 pb-1">Return Home</button>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;
