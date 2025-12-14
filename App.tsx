import React, { useState, useEffect } from 'react';
import { APP_CONFIG, PROJECTS_DATA, ABOUT_DATA } from './constants';
import { TabType, Project } from './types';
import Navigation from './components/Navigation';
import ComicPanel from './components/ComicPanel';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import ScrollReveal from './components/ScrollReveal';
import MagneticTilt from './components/MagneticTilt';
import Marquee from './components/Marquee';
import SkillsChart from './components/SkillsChart';
import { ArrowRight, Star, Cpu, PenTool, Layout, Linkedin, Mail, Phone, ArrowDown } from 'lucide-react';

type AnimationState = 'idle' | 'out' | 'in-snap' | 'in';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [clickPosition, setClickPosition] = useState<{x: number, y: number} | null>(null);
  const [flipState, setFlipState] = useState<AnimationState>('idle');
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter projects
  const featuredProjects = PROJECTS_DATA.filter(p => p.featured);

  const handleProjectClick = (project: Project, e: React.MouseEvent) => {
    // Capture the click coordinates to originate the modal animation
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    // Use the center of the clicked card as the origin
    setClickPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    setSelectedProject(project);
  };

  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab) return;
    
    // Phase 1: Flip Out (Lift current page)
    setFlipState('out');
    
    // Wait for the flip-out transition (400ms)
    setTimeout(() => {
      // Phase 2: Logic Swap & Snap
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Snap to the incoming position (leaning right)
      setFlipState('in-snap');
      
      // Phase 3: Flip In (Drop new page)
      // Slight delay to ensure DOM update and snap render
      requestAnimationFrame(() => {
        setTimeout(() => {
          setFlipState('in');
        }, 50);
      });

      // Cleanup: Reset to idle after the elastic bounce finishes (600ms)
      setTimeout(() => {
        setFlipState('idle');
      }, 700); // 50ms + 650ms buffer
      
    }, 400); 
  };

  const handleNavToProjects = () => {
    handleTabChange('Projects');
  };

  const getPageClass = () => {
    switch(flipState) {
      case 'out': return 'page-flip-out';
      case 'in-snap': return 'page-flip-in-setup';
      case 'in': return 'page-flip-in-active';
      default: return 'page-idle';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <div className="space-y-16">
            {/* Intro Panel */}
            <section className="grid md:grid-cols-12 gap-8 relative items-stretch">
              
              {/* Decorative Action Burst behind the text */}
              <div className="absolute -top-10 -left-10 w-[300px] h-[300px] z-0 opacity-10 md:opacity-20 pointer-events-none text-accent">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-pulse">
                  <path fill="currentColor" d="M42.7,-62.9C55.0,-52.8,64.6,-40.8,71.2,-27.5C77.8,-14.2,81.4,0.4,78.2,14.1C75.0,27.8,64.9,40.6,52.9,51.6C40.9,62.6,27.0,71.8,11.8,74.7C-3.4,77.6,-19.9,74.2,-34.5,66.6C-49.1,59.0,-61.8,47.2,-69.6,33.1C-77.4,19.0,-80.3,2.6,-77.1,-12.3C-73.9,-27.2,-64.6,-40.6,-52.5,-50.7C-40.4,-60.8,-25.5,-67.6,-10.8,-69.1C3.9,-70.6,18.6,-66.8,30.4,-73.0" transform="translate(100 100)" />
                </svg>
              </div>

              <div className="md:col-span-8 relative z-10">
                <ScrollReveal>
                  <MagneticTilt intensity={3}>
                    <ComicPanel className="p-8 md:p-12 h-full flex flex-col justify-center border-ink bg-white/95 relative overflow-hidden group">
                      
                      {/* Background Detail */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-20 rounded-bl-[100px] transform transition-transform duration-700 group-hover:scale-110"></div>

                      {/* Main Header */}
                      <h2 className="font-comic text-5xl md:text-7xl mb-6 leading-[0.9] tracking-wide uppercase text-ink text-stroke-white drop-shadow-[5px_5px_0px_#0a0a0a]">
                        CRAFTING DIGITAL <br/>
                        <span className="text-accent text-stroke-ink drop-shadow-[4px_4px_0_rgba(0,0,0,1)] group-hover:text-secondary transition-colors duration-300">NARRATIVES</span>
                      </h2>
                      <p className="font-sans text-lg md:text-xl text-gray-800 leading-relaxed mb-6 max-w-2xl font-medium">
                        I’m a <span className="font-bold">Product Designer</span> with a strong visual and systems background. I combine UX thinking with 3D, animation and narrative craft to create clear, expressive and logic-driven experiences.
                      </p>
                      
                      {/* Contact Info */}
                      <div className="flex flex-col gap-2 mb-8 font-sans font-semibold text-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="bg-secondary p-1 border border-ink shadow-[2px_2px_0_#000]">
                              <Mail size={16} className="text-ink" />
                            </div>
                            <a href="mailto:cragesh13@gmail.com" className="hover:text-accent transition-colors">cragesh13@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-secondary p-1 border border-ink shadow-[2px_2px_0_#000]">
                              <Phone size={16} className="text-ink" />
                            </div>
                            <span>(IN) +91 8848185043 / (UK) +44 7775671837</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <button 
                          onClick={handleNavToProjects}
                          className="bg-ink text-white font-comic text-2xl px-10 py-3 transition-all border-4 border-transparent hover:border-ink shadow-comic hover-comic-pop"
                        >
                          SEE MY WORK
                        </button>
                      </div>
                    </ComicPanel>
                  </MagneticTilt>
                </ScrollReveal>
              </div>
              
              {/* Featured Artist - Comic Cover Style */}
              <div className="md:col-span-4 h-[500px] md:h-full z-10">
                 <ScrollReveal delay={200} className="h-full">
                   <MagneticTilt intensity={15} className="h-full">
                    <ComicPanel variant="dark" className="h-full relative group overflow-hidden" noShadow>
                        {/* Background Image Layer */}
                        <div className="absolute inset-0 bg-ink">
                          <img 
                            src="https://res.cloudinary.com/dpxbzg9tn/image/upload/v1765621370/2e799a8f-da91-49e7-a4c4-0fc92241f526_ks2ia0.jpg" 
                            className="w-full h-full object-cover opacity-90 mix-blend-normal filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500 transform group-hover:scale-105"
                            alt="Featured Artist"
                          />
                          {/* Halftone & Gradient Overlays */}
                          <div className="absolute inset-0 halftone-pattern opacity-30 mix-blend-overlay pointer-events-none"></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-black/20 pointer-events-none"></div>
                        </div>

                        {/* Bottom Content "Narration Box" */}
                        <div className="absolute bottom-8 left-0 right-4 z-20 flex flex-col items-start pl-0">
                            {/* Title Box - Sticking out from left */}
                            <div className="bg-secondary border-y-4 border-r-4 border-ink py-2 pl-6 pr-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] mb-3 transform -translate-x-2 group-hover:translate-x-0 transition-transform">
                              <h3 className="font-comic text-3xl md:text-4xl uppercase leading-none text-ink">
                                Featured<br/>
                                <span className="text-white drop-shadow-[2px_2px_0_#000]">Artist</span>
                              </h3>
                            </div>
                            
                            {/* Name Tag */}
                            <div className="ml-6 bg-white border-2 border-ink px-3 py-1 transform -rotate-1 shadow-sm">
                              <p className="font-sans text-xs font-black uppercase tracking-widest text-ink">
                                Ragesh Changam
                              </p>
                            </div>
                        </div>
                    </ComicPanel>
                   </MagneticTilt>
                 </ScrollReveal>
              </div>
            </section>

            {/* Marquee Section */}
            <div className="transform -rotate-1 scale-[1.02] shadow-comic-sm">
               <Marquee text="UX Design • Animation • Environment Art • Storytelling • Prototyping" className="bg-secondary" />
            </div>

            {/* Featured Strip */}
            <section className="relative">
              <ScrollReveal delay={300}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-4 bg-ink w-8 -skew-x-12"></div>
                  <h3 className="font-comic text-4xl uppercase text-ink text-stroke-white drop-shadow-[2px_2px_0_#000]">Top Issues (Projects)</h3>
                  <div className="h-1 bg-ink flex-grow"></div>
                  <ArrowDown className="animate-bounce" />
                </div>
              </ScrollReveal>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredProjects.slice(0, 3).map((project, index) => (
                  <ScrollReveal key={project.id} delay={300 + (index * 100)}>
                    <ProjectCard project={project} onClick={handleProjectClick} />
                  </ScrollReveal>
                ))}
              </div>
            </section>
          </div>
        );

      case 'Projects':
        return (
          <div>
             <ScrollReveal>
               <div className="flex items-center gap-4 mb-8">
                  <h3 className="font-comic text-4xl uppercase bg-secondary px-6 py-2 border-4 border-ink shadow-comic transform -rotate-1">Full Archive</h3>
                  <span className="font-sans text-gray-500 font-bold hidden md:inline-block border-b-4 border-gray-300 pb-1">// SELECT A PANEL TO VIEW</span>
               </div>
             </ScrollReveal>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
               {PROJECTS_DATA.map((project, index) => (
                 <ScrollReveal key={project.id} delay={index * 50}>
                   <ProjectCard project={project} onClick={handleProjectClick} />
                 </ScrollReveal>
               ))}
             </div>
          </div>
        );

      case 'About Me':
        return (
          <div className="grid md:grid-cols-12 gap-8 relative isolate">
            {/* Bio Column */}
            <div className="md:col-span-7 space-y-8">
              <ScrollReveal>
                <MagneticTilt intensity={2}>
                  <ComicPanel className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-accent p-2 border-2 border-ink shadow-comic-sm">
                        <Star className="text-white" size={24} />
                      </div>
                      <h2 className="font-comic text-4xl uppercase text-stroke-white drop-shadow-md">Origin Story</h2>
                    </div>
                    <p className="font-sans text-lg leading-relaxed whitespace-pre-line">
                      {ABOUT_DATA.bio}
                    </p>
                  </ComicPanel>
                </MagneticTilt>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <ComicPanel variant="yellow" className="p-8 transform rotate-1 transition-transform hover:rotate-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-ink p-2">
                      <Cpu className="text-white" size={20} />
                    </div>
                    <h3 className="font-comic text-2xl uppercase">Philosophy</h3>
                  </div>
                  <p className="font-sans font-medium italic text-lg border-l-4 border-ink pl-4">
                    "{ABOUT_DATA.philosophy}"
                  </p>
                </ComicPanel>
              </ScrollReveal>
            </div>

            {/* Stats / Tech Stack Column */}
            <div className="md:col-span-5 space-y-8">
              <ScrollReveal delay={300}>
                <MagneticTilt intensity={5}>
                  <ComicPanel variant="white" className="p-6">
                    <h3 className="font-comic text-2xl mb-4 text-center bg-ink text-white py-2 uppercase border-2 border-transparent">Tech Stack</h3>
                    
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        {ABOUT_DATA.toolStack.map((tool) => (
                          <div key={tool.name} className="flex flex-col items-center justify-center p-4 border-2 border-ink bg-gray-50 hover:bg-white hover-comic-pop transition-all text-center group cursor-default">
                            <div className="w-10 h-10 mb-2 flex items-center justify-center transform group-hover:scale-125 transition-transform">
                              <img 
                                src={tool.logo} 
                                alt={`${tool.name} Logo`} 
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <span className="font-bold font-sans text-sm group-hover:text-accent transition-colors">{tool.name}</span>
                          </div>
                        ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                        <p className="font-comic text-gray-400 text-sm tracking-widest">ARSENAL LOADED</p>
                    </div>
                  </ComicPanel>
                </MagneticTilt>
              </ScrollReveal>
              
              {/* Skills Chart - Added to fix unused component and enhance section */}
              <ScrollReveal delay={350}>
                <MagneticTilt intensity={2}>
                  <ComicPanel variant="white" className="p-4" noShadow>
                    <div className="bg-secondary p-1 border-b-4 border-ink mb-2 -mx-4 -mt-4 text-center">
                       <h3 className="font-comic text-xl uppercase">Skill Stats</h3>
                    </div>
                    <SkillsChart data={ABOUT_DATA.skills} />
                  </ComicPanel>
                </MagneticTilt>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="grid grid-cols-2 gap-4">
                  <MagneticTilt>
                    <div className="bg-ink text-white p-4 border-4 border-black text-center shadow-comic hover-comic-pop h-full flex flex-col items-center justify-center">
                      <PenTool className="mx-auto mb-2" />
                      <div className="font-comic text-xl">Design</div>
                    </div>
                  </MagneticTilt>
                  <MagneticTilt>
                    <div className="bg-accent text-white p-4 border-4 border-ink text-center shadow-comic hover-comic-pop h-full flex flex-col items-center justify-center">
                      <Layout className="mx-auto mb-2" />
                      <div className="font-comic text-xl">Code</div>
                    </div>
                  </MagneticTilt>
                </div>
              </ScrollReveal>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-comic-light p-2 md:p-6 font-sans selection:bg-accent selection:text-white flex flex-col overflow-x-hidden">
      
      {/* Scroll Parallax Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Floating Circle */}
        <div 
          className="absolute top-[10%] left-[5%] text-gray-200 opacity-50"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="10 5" />
          </svg>
        </div>
        {/* Floating Cross */}
        <div 
          className="absolute top-[40%] right-[10%] text-accent opacity-10"
          style={{ transform: `translateY(${-scrollY * 0.1}px) rotate(45deg)` }}
        >
          <svg width="80" height="80" viewBox="0 0 100 100">
             <path d="M45 0H55V100H45z" fill="currentColor"/>
             <path d="M0 45H100V55H0z" fill="currentColor"/>
          </svg>
        </div>
        {/* Floating Zigzag */}
        <div 
           className="absolute bottom-[20%] left-[15%] text-secondary opacity-20"
           style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
           <svg width="120" height="40" viewBox="0 0 120 40">
             <path d="M0,40 L20,0 L40,40 L60,0 L80,40 L100,0 L120,40" fill="none" stroke="currentColor" strokeWidth="6" />
           </svg>
        </div>
      </div>

      {/* Main Container - The "Page" */}
      <div className="flex-grow max-w-7xl mx-auto w-full paper-texture border-4 border-ink shadow-comic relative flex flex-col bg-paper z-10">
        
        {/* Header Strip */}
        <header className="border-b-4 border-ink p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-transparent relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] p-2 opacity-5 pointer-events-none transform rotate-12">
             <h1 className="text-[12rem] font-comic text-ink">ART</h1>
          </div>
          
          <div className="relative z-10">
            {/* Main Header with Increased Legibility (Thicker white stroke, wider tracking) */}
            <h1 className="font-comic text-6xl md:text-8xl leading-none tracking-wide uppercase text-ink text-stroke-white drop-shadow-[5px_5px_0px_#0a0a0a]">
              {APP_CONFIG.appName}
            </h1>
            <div className="bg-accent text-white inline-block px-3 py-1 mt-2 transform -rotate-2 shadow-comic-sm border-2 border-ink">
              <p className="font-bold tracking-widest text-sm md:text-base uppercase">
                {APP_CONFIG.appSubtitle}
              </p>
            </div>
          </div>

          <div className="flex gap-4 relative z-10">
            {/* Social / Contact Placeholders */}
            <a 
              href="https://www.linkedin.com/in/ragesh-changam-8985b215b/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 border-4 border-ink rounded-none flex items-center justify-center hover:bg-black hover:text-white transition-all bg-white text-ink shadow-comic hover:shadow-none hover-comic-pop"
            >
               <Linkedin size={24} />
            </a>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-4 md:p-8 relative flex-grow overflow-hidden perspective-1000">
           {/* Navigation */}
           <Navigation 
             activeTab={activeTab} 
             onTabChange={handleTabChange} 
             tabs={['Home', 'Projects', 'About Me']} 
           />

           {/* Dynamic Content Panel with 3D Flip Effect */}
           <div className={`h-full transform-style-3d ${getPageClass()}`}>
             {renderContent()}
           </div>
        </main>

        {/* Footer */}
        <footer className="border-t-4 border-ink p-6 bg-zinc-100/50 text-center mt-auto">
          <p className="font-comic text-gray-500 uppercase">
             © {new Date().getFullYear()} {APP_CONFIG.appName}. All rights reserved. No capes.
          </p>
        </footer>

      </div>

      {/* Modal Layer */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        clickPosition={clickPosition}
      />
    </div>
  );
};

export default App;