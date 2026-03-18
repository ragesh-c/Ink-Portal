import React, { useState } from 'react';
import { Project } from '../types';
import ComicPanel from './ComicPanel';
import MagneticTilt from './MagneticTilt';
import { Monitor, Youtube, BookOpen, ExternalLink, ImageOff } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project, e: React.MouseEvent) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getIcon = () => {
    switch (project.platform) {
      case 'YouTube': return <Youtube size={20} />;
      case 'Medium': return <BookOpen size={20} />;
      default: return <Monitor size={20} />;
    }
  };

  return (
    <div onClick={(e) => onClick(project, e)} className="cursor-pointer group h-full w-full">
      <MagneticTilt intensity={8} className="h-full">
        <ComicPanel className="h-full flex flex-col hover:shadow-comic-hover transition-shadow duration-300">
          {/* Image Section - Enforced 16:9 Aspect Ratio via aspect-video */}
          <div className="relative aspect-video w-full overflow-hidden border-b-4 border-ink bg-gray-200">
            
            {/* Placeholder Comic Panel */}
            {!isLoaded && !imgError && (
                <div className="absolute inset-0 bg-paper flex flex-col items-center justify-center z-10">
                  <div className="absolute inset-0 halftone-pattern opacity-10"></div>
                  <div className="font-comic text-2xl text-gray-300 transform -rotate-6 select-none animate-pulse">
                      INKING...
                  </div>
                </div>
            )}

            {!imgError ? (
              <img 
                src={project.thumbnailImage} 
                alt={project.title}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                onError={() => setImgError(true)}
                // Parallax-like scale effect on image when hovering card
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            ) : (
              /* Fallback for broken images */
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4 text-gray-400 z-20 relative">
                <ImageOff size={48} className="mb-2 opacity-50" />
                <span className="font-comic text-xs uppercase tracking-widest">Image Unavailable</span>
              </div>
            )}

            {/* Platform Badge */}
            <div className="absolute top-2 right-2 bg-secondary border-2 border-ink px-2 py-1 flex items-center gap-1 shadow-comic-sm z-20 transition-transform group-hover:rotate-3">
              {getIcon()}
              <span className="font-bold text-xs font-comic uppercase tracking-wider">{project.platform}</span>
            </div>
            
            {/* Type Label */}
            <div className="absolute bottom-0 left-0 bg-ink text-white px-3 py-1 z-20 transition-transform group-hover:-translate-y-1">
              <span className="font-bold text-xs uppercase tracking-widest">{project.type}</span>
            </div>
            
            {/* Interactive Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10 z-30">
                <div className="bg-white border-4 border-black rounded-full p-3 shadow-comic transform scale-0 group-hover:scale-100 transition-transform duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)">
                  <ExternalLink size={24} className="text-black" />
                </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-5 flex flex-col flex-grow bg-paper relative z-10">
            <h3 className="font-comic text-2xl mb-3 leading-none uppercase tracking-wide group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="font-sans text-sm text-gray-700 line-clamp-3 flex-grow leading-relaxed">
              {project.shortDescription}
            </p>
          </div>
        </ComicPanel>
      </MagneticTilt>
    </div>
  );
};

export default ProjectCard;