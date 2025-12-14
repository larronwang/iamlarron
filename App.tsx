import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroCanvas from './components/HeroCanvas';
import ProjectDetail from './components/ProjectDetail';
import Project3DDeck from './components/Project3DDeck';
import { KEY_PROJECTS, MINOR_PROJECTS } from './constants';
import { Project } from './types';
import { Mail, Linkedin, Twitter, Github } from 'lucide-react';

// Sort: Large (Key) projects first, then Small (Minor) projects
// This creates a natural visual hierarchy from Left to Right
const ALL_PROJECTS: Project[] = [...KEY_PROJECTS, ...MINOR_PROJECTS];

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const isNextAvailable = selectedProject 
    ? ALL_PROJECTS.findIndex(p => p.id === selectedProject.id) < ALL_PROJECTS.length - 1
    : false;

  // Identify featured IDs for special styling in the deck
  const featuredIds = KEY_PROJECTS.map(p => p.id);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="h-screen w-full">
        <HeroCanvas />
      </section>

      {/* Portfolio Section */}
      {/* Changed to h-screen for a tighter, single-viewport fit */}
      <section id="portfolio" className="h-screen w-full bg-gray-50 overflow-hidden relative flex flex-col justify-center">
        {/* Background Grid */}
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
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

        {/* 
          Single Unified Deck
          Projects flow from Big (Left) to Small (Right)
        */}
        <div className="relative z-20 w-full mt-[-20px]">
            <Project3DDeck 
                projects={ALL_PROJECTS} 
                onProjectClick={handleOpenProject}
                featuredIds={featuredIds}
            />
        </div>
      </section>

      {/* About Section - Dark Theme */}
      <section id="about" className="py-32 bg-black text-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <h2 className="text-5xl font-bold tracking-tighter">Design is intelligence made visible.</h2>
                <div className="h-1 w-24 bg-white/20"></div>
                <p className="text-xl text-gray-400 font-light leading-relaxed">
                    I am a multidisciplinary designer and developer obsessed with the finer details. 
                    With over a decade of experience in the digital space, I help brands and startups 
                    bridge the gap between complex technology and human-centric design.
                </p>
                <div className="grid grid-cols-2 gap-8 text-sm text-gray-500 pt-8">
                    <div>
                        <h4 className="text-white font-semibold mb-2">Services</h4>
                        <ul className="space-y-1">
                            <li>Art Direction</li>
                            <li>UI/UX Design</li>
                            <li>Frontend Development</li>
                            <li>Brand Strategy</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-2">Recognition</h4>
                        <ul className="space-y-1">
                            <li>Awwwards SOTD</li>
                            <li>FWA Site of the Day</li>
                            <li>Behance Featured</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="relative h-[600px] bg-gray-900 rounded-none overflow-hidden border border-white/10">
                <img 
                    src="https://picsum.photos/id/447/800/1200" 
                    alt="Portrait" 
                    className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-500 grayscale"
                />
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Let's build something extraordinary.</h2>
            <p className="text-xl text-gray-500 mb-12">Available for freelance opportunities and collaborations.</p>
            
            <a 
                href="mailto:hello@nexus.com" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-none text-lg font-medium hover:bg-blue-600 transition-colors duration-300 shadow-xl"
            >
                <Mail className="w-5 h-5" />
                <span>Get in touch</span>
            </a>

            <div className="mt-24 flex justify-center gap-8">
                {[Github, Twitter, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="p-4 bg-white border border-gray-200 hover:border-black transition-colors duration-300 text-gray-700 hover:text-black shadow-sm">
                        <Icon className="w-6 h-6" />
                    </a>
                ))}
            </div>
        </div>
      </section>

      <footer className="py-8 bg-white border-t border-gray-100 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Nexus Portfolio. All rights reserved.</p>
      </footer>

      {/* Overlay Modal */}
      {selectedProject && (
        <ProjectDetail 
            project={selectedProject} 
            onClose={handleCloseProject}
            onNext={handleNextProject}
            isNextAvailable={isNextAvailable}
        />
      )}
    </div>
  );
};

export default App;
