import React, { ReactNode } from 'react';

interface ComicPanelProps {
  children: ReactNode;
  className?: string;
  variant?: 'white' | 'accent' | 'dark' | 'yellow';
  noShadow?: boolean;
  hoverEffect?: boolean;
}

const ComicPanel: React.FC<ComicPanelProps> = ({ 
  children, 
  className = "", 
  variant = 'white',
  noShadow = false,
  hoverEffect = false
}) => {
  const bgColors = {
    white: 'bg-paper',
    accent: 'bg-accent',
    dark: 'bg-ink',
    yellow: 'bg-secondary'
  };

  const textColors = {
    white: 'text-ink',
    accent: 'text-white',
    dark: 'text-white',
    yellow: 'text-ink'
  };

  const shadowClass = noShadow 
    ? '' 
    : hoverEffect 
      ? 'shadow-comic transition-all duration-200 hover:-translate-y-1 hover:shadow-comic-hover'
      : 'shadow-comic';

  return (
    <div className={`
      relative border-4 border-ink 
      ${bgColors[variant]} 
      ${textColors[variant]} 
      ${shadowClass}
      ${className}
      overflow-hidden
    `}>
      {/* Halftone texture overlay for visual depth */}
      <div className="absolute inset-0 halftone-pattern pointer-events-none mix-blend-multiply z-0" />
      
      {/* Content wrapper */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default ComicPanel;