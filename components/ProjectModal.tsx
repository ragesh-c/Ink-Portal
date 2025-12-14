import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { X, ExternalLink } from 'lucide-react';
import ComicPanel from './ComicPanel';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  clickPosition?: { x: number; y: number } | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, clickPosition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [renderProject, setRenderProject] = useState<Project | null>(null);

  useEffect(() => {
    if (project) {
      setRenderProject(project);
      // Small timeout to ensure DOM is present before adding active class for animation
      const timer = setTimeout(() => setIsVisible(true), 10);
      document.body.style.overflow = 'hidden';
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      // Wait for animation to finish before removing from DOM
      const timer = setTimeout(() => {
        setRenderProject(null);
        document.body.style.overflow = 'unset';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [project]);

  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsVisible(false);
    // Wait for animation then call parent close
    setTimeout(onClose, 300);
  };

  // Calculate transform origin based on click position relative to viewport
  // This simulates the "pop out" originating from the clicked card
  const getTransformOrigin = () => {
    if (!clickPosition) return 'center';
    
    const xPercent = (clickPosition.x / window.innerWidth) * 100;
    const yPercent = (clickPosition.y / window.innerHeight) * 100;
    
    return `${xPercent}% ${yPercent}%`;
  };

  if (!renderProject) return null;

  const isYouTube = renderProject.platform === 'YouTube';
  const isEmbeddable = isYouTube; 

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-ink/90 backdrop-blur-sm transition-opacity duration-300 cursor-pointer ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div 
        className={`
          relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col 
          transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${isVisible ? 'opacity-100 scale-100 rotate-0 translate-y-0' : 'opacity-0 scale-[0.2] rotate-6 translate-y-12'}
        `}
        style={{ transformOrigin: getTransformOrigin() }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex justify-between items-center mb-4">
          <ComicPanel className="px-6 py-2 bg-secondary inline-block" noShadow>
             <h2 className="font-comic text-2xl uppercase tracking-wider">{renderProject.title}</h2>
          </ComicPanel>
          
          <button 
            onClick={handleClose}
            className="bg-accent text-white border-4 border-ink p-2 shadow-comic hover:translate-y-1 hover:shadow-none transition-all"
            aria-label="Close Modal"
          >
            <X size={28} strokeWidth={3} />
          </button>
        </div>

        {/* Main Viewing Area */}
        <ComicPanel className="flex-grow overflow-hidden flex flex-col bg-white" noShadow>
          <div className="flex-grow relative bg-black min-h-[400px] md:min-h-[500px]">
            {isEmbeddable ? (
              <iframe 
                src={renderProject.externalURL} 
                title={renderProject.title}
                className="w-full h-full absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            ) : (
              // Fallback for non-embeddable content
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-zinc-900 text-white overflow-hidden">
                {/* Background Image - Full visibility */}
                <div className="absolute inset-0">
                  <img 
                    src={renderProject.thumbnailImage} 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle overlay for text readability */}
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 max-w-md drop-shadow-md">
                   <h3 className="font-comic text-3xl mb-4 text-secondary drop-shadow-md">Content hosted on {renderProject.platform}</h3>
                   <p className="mb-6 font-sans text-gray-100 text-lg font-medium drop-shadow-md">{renderProject.shortDescription}</p>
                   <a 
                    href={renderProject.externalURL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent text-white font-comic text-xl px-8 py-4 border-4 border-white hover:bg-white hover:text-ink transition-colors shadow-comic"
                   >
                     View Project <ExternalLink size={20} />
                   </a>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer Info */}
          <div className="p-6 border-t-4 border-ink bg-paper">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div>
                <span className="font-bold font-comic text-lg bg-ink text-white px-2 py-1 mr-2">{renderProject.type}</span>
                <span className="font-sans text-gray-600">{renderProject.shortDescription}</span>
              </div>
              
              {!isEmbeddable && (
                <span className="text-xs font-mono text-gray-400">External Link Mode</span>
              )}
            </div>
          </div>
        </ComicPanel>

      </div>
    </div>
  );
};

export default ProjectModal;