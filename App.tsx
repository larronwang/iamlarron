import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar.tsx';
import HeroCanvas from './components/HeroCanvas.tsx';
import ProjectDetail from './components/ProjectDetail.tsx';
import Project3DDeck from './components/Project3DDeck.tsx';
import { KEY_PROJECTS, MINOR_PROJECTS, ABOUT_DATA } from './constants.ts';
import { Project } from './types.ts';
import { Mail } from 'lucide-react';

const ALL_PROJECTS: Project[] = [...KEY_PROJECTS, ...MINOR_PROJECTS];

// Loading Screen Component
const LoadingScreen: React.FC<{ progress: number; isFinished: boolean }> = ({ progress, isFinished }) => {
  return (
    <div 
      className={`fixed inset-0 z-[5000] bg-[#F5F5F7] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
        isFinished ? 'opacity-0 pointer-events-none scale-110' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-black tracking-[0.5em] text-black mb-8 animate-pulse uppercase">
          LARRONWANG
        </h1>
        <div className="w-48 h-[1px] bg-gray-200 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-black transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 font-mono text-[10px] text-gray-400 tracking-widest uppercase">
          Initialising Environment — {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Collect all critical image URLs to preload
  const criticalImages = useMemo(() => {
    const urls = [ABOUT_DATA.imageUrl];
    ALL_PROJECTS.forEach(p => {
      if (p.imageUrl) urls.push(p.imageUrl);
    });
    return Array.from(new Set(urls)); // Unique URLs
  }, []);

  useEffect(() => {
    let loadedCount = 0;
    const totalToLoad = criticalImages.length;
    
    // Safety timeout to hide loader after 6 seconds regardless
    const timer = setTimeout(() => {
      setLoading(false);
      setMounted(true);
    }, 6000);

    if (totalToLoad === 0) {
      setLoading(false);
      setMounted(true);
      clearTimeout(timer);
      return;
    }

    const updateProgress = () => {
      loadedCount++;
      const currentProgress = (loadedCount / totalToLoad) * 100;
      setLoadProgress(currentProgress);
      
      if (loadedCount >= totalToLoad) {
        // Slight delay for visual satisfaction of reaching 100%
        setTimeout(() => {
          setLoading(false);
          setMounted(true);
          clearTimeout(timer);
        }, 500);
      }
    };

    criticalImages.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = updateProgress;
      img.onerror = updateProgress; // Skip if error, but continue progress
    });

    return () => clearTimeout(timer);
  }, [criticalImages]);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = ALL_PROJECTS.findIndex(p => p.id === selectedProject.id);
    if (currentIndex >= 0 && currentIndex < ALL_PROJECTS.length - 1) {
      setSelectedProject(ALL_PROJECTS[currentIndex + 1]);
    }
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = ALL_PROJECTS.findIndex(p => p.id === selectedProject.id);
    if (currentIndex > 0) {
      setSelectedProject(ALL_PROJECTS[currentIndex - 1]);
    }
  };

  const isNextAvailable = selectedProject 
    ? ALL_PROJECTS.findIndex(p => p.id === selectedProject.id) < ALL_PROJECTS.length - 1
    : false;

  const isPrevAvailable = selectedProject
    ? ALL_PROJECTS.findIndex(p => p.id === selectedProject.id) > 0
    : false;

  const featuredIds = KEY_PROJECTS.map(p => p.id);

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <LoadingScreen progress={loadProgress} isFinished={!loading} />
      
      <div className={`transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />

        {/* Hero Section */}
        <section id="home" className="h-screen w-full overflow-hidden bg-[#F5F5F7]">
          <HeroCanvas />
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="h-screen w-full bg-gray-50 overflow-hidden relative flex flex-col justify-center">
          <div className={`absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`} />
          
          <div className="container mx-auto px-6 relative z-10 mb-4">
            <div className="flex items-end justify-between border-b border-gray-200 pb-4">
                <div>
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-1">
                      WORK
                  </h2>
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-widest ml-1">
                      Selected Archives (2022 — 2024)
                  </p>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-[10px] text-gray-400 max-w-xs uppercase tracking-wide">
                        Drag to explore <br/>
                        Click to view
                    </p>
                </div>
            </div>
          </div>

          <div className="relative z-20 w-full mt-[-20px]">
              <Project3DDeck 
                  projects={ALL_PROJECTS} 
                  onProjectClick={handleOpenProject}
                  featuredIds={featuredIds}
              />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 bg-black text-white">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
                      {ABOUT_DATA.title}
                  </h2>
                  <div className="h-1 w-24 bg-white/20"></div>
                  <p className="text-xl text-gray-400 font-light leading-relaxed">
                      {ABOUT_DATA.description}
                  </p>
              </div>
              <div className="relative h-[600px] bg-gray-900 rounded-none overflow-hidden border border-white/10 group">
                  <img 
                      src={ABOUT_DATA.imageUrl} 
                      alt="Portrait" 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                      onError={(e) => {
                        e.currentTarget.src = "https://picsum.photos/id/447/800/1200";
                      }}
                  />
              </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 bg-gray-50">
          <div className="container mx-auto px-6 max-w-4xl text-center">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Let's build something extraordinary.</h2>
              <p className="text-xl text-gray-500 mb-12">Welcome academic research and collaborations.</p>
              
              <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=m13240921218@163.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-none text-lg font-medium hover:bg-blue-600 transition-colors duration-300 shadow-xl"
              >
                  <Mail className="w-5 h-5" />
                  <span>Get in touch</span>
              </a>

              <div className="mt-24">
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.25em] leading-loose max-w-2xl mx-auto">
                    YIYANG WANG TEL:+8613522922855 EMAIL:m13240921218@163.com BEIJING
                  </p>
              </div>
          </div>
        </section>

        <footer className="py-8 bg-white border-t border-gray-100 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Yiyang Wang. All rights reserved.</p>
        </footer>
      </div>

      {selectedProject && (
        <ProjectDetail 
            project={selectedProject} 
            onClose={handleCloseProject}
            onNext={handleNextProject}
            onPrev={handlePrevProject}
            isNextAvailable={isNextAvailable}
            isPrevAvailable={isPrevAvailable}
        />
      )}
    </div>
  );
};

export default App;