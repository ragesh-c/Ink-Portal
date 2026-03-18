import React from 'react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  tabs: TabType[];
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, tabs }) => {
  return (
    <nav className="w-full mb-8 relative z-20">
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-start">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`
                relative px-6 py-3 md:px-8 md:py-4 
                font-comic text-xl md:text-2xl uppercase tracking-wide
                border-4 border-ink transition-all duration-300
                ${isActive 
                  ? 'bg-accent text-white -translate-y-2 shadow-comic transform -rotate-1' 
                  : 'bg-paper text-ink hover-comic-pop hover:shadow-comic-sm hover:bg-zinc-50'
                }
              `}
            >
              {tab}
              {/* Decorative corner tick for active tab */}
              {isActive && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-ink" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;