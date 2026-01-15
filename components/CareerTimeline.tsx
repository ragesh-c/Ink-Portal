import React, { useRef, useEffect } from 'react';
import { CareerItem } from '../types';
import { Briefcase, GraduationCap, MapPin, Calendar, Flag } from 'lucide-react';
import ComicPanel from './ComicPanel';

interface CareerTimelineProps {
  data: CareerItem[];
}

const CareerTimeline: React.FC<CareerTimelineProps> = ({ data }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Map vertical scroll (deltaY) to horizontal scroll
      if (e.deltaY !== 0) {
        // Determine scroll limits
        const { scrollLeft, scrollWidth, clientWidth } = container;
        const maxScrollLeft = scrollWidth - clientWidth;
        
        // Check if we can scroll in the requested direction
        // Allow 1px buffer for calculation precision
        const canScrollRight = e.deltaY > 0 && scrollLeft < maxScrollLeft - 1;
        const canScrollLeft = e.deltaY < 0 && scrollLeft > 1;

        // If we can scroll in that direction, do so and prevent page scroll
        if (canScrollRight || canScrollLeft) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      }
    };

    // { passive: false } is required to use e.preventDefault()
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <ComicPanel className="w-full flex flex-col bg-white" variant="white">
      {/* Header */}
      <div className="p-4 border-b-4 border-ink bg-secondary flex items-center gap-3 sticky left-0 z-30 shadow-sm">
        <div className="bg-ink p-2 rounded-full shadow-comic-sm">
          <MapPin className="text-white" size={20} />
        </div>
        <h3 className="font-comic text-2xl uppercase tracking-wide">Career Quest Mode</h3>
        <span className="text-xs font-sans font-bold opacity-60 ml-auto hidden md:inline-block">SCROLL TO EXPLORE ➡</span>
      </div>

      {/* Horizontal Scrollable Timeline Area */}
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto custom-scrollbar w-full bg-paper relative"
      >
        <div className="min-w-max p-10 relative flex items-start gap-12">
          
          {/* The Path Line - Horizontal */}
          {/* Positioned to align with the center of the nodes (approx top spacing + half node height) */}
          <div className="absolute left-16 right-16 top-[3.75rem] h-2 bg-gray-200 z-0 rounded-full"></div>
          <div className="absolute left-16 right-16 top-[3.75rem] h-2 border-t-4 border-dashed border-ink opacity-30 z-0"></div>

          {data.map((item, index) => {
            const isWork = item.type === 'Work';
            const isLatest = index === 0;

            return (
              <div key={item.id} className="group relative flex flex-col items-center gap-6 w-[320px] z-10">
                
                {/* Timeline Node / "Level Marker" */}
                <div className={`
                  relative
                  flex-shrink-0 w-14 h-14 rounded-full border-4 border-ink z-10 
                  flex items-center justify-center shadow-comic-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6
                  ${isLatest ? 'bg-purple-600' : (isWork ? 'bg-accent' : 'bg-secondary')}
                `}>
                  {isWork ? (
                    <Briefcase size={22} className="text-white" />
                  ) : (
                    <GraduationCap size={24} className="text-ink" />
                  )}
                  
                  {/* Pulse effect for current role */}
                  {isLatest && (
                     <div className="absolute inset-0 rounded-full border-4 border-purple-500 animate-ping opacity-75"></div>
                  )}
                </div>

                {/* Content Card */}
                <div className="w-full flex-grow">
                  <div className={`
                    relative bg-white border-2 border-ink p-5 shadow-comic-sm 
                    transition-all duration-200 group-hover:-translate-y-2 group-hover:shadow-comic
                    ${isLatest ? 'bg-purple-50' : ''}
                    h-full flex flex-col
                  `}>
                    {/* Connector Triangle Pointing UP */}
                    <div className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-ink"></div>
                    <div className={`
                      absolute -top-[6px] left-1/2 -translate-x-1/2 w-0 h-0 
                      border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] 
                      ${isLatest ? 'border-b-purple-50' : 'border-b-white'}
                    `}></div>

                    {isLatest && (
                      <div className="absolute -top-3 right-4 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 transform rotate-2 rounded-sm shadow-sm animate-bounce">
                        CURRENT LEVEL
                      </div>
                    )}

                    <h4 className="font-comic text-xl leading-tight mb-2 min-h-[3rem] flex items-center">{item.role}</h4>
                    <p className="font-sans font-bold text-sm text-gray-700 mb-3 border-b-2 border-gray-100 pb-2">{item.organization}</p>
                    
                    <div className="mt-auto flex items-center gap-2 text-xs font-mono bg-gray-100 p-2 rounded border border-gray-200 w-full justify-center">
                      <Calendar size={12} className="text-gray-500" />
                      <span className="uppercase">{item.period}</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
          
          {/* Game Start / End Node */}
          <div className="flex flex-col items-center justify-start pt-3 opacity-50 min-w-[100px]">
             <div className="w-8 h-8 bg-ink rounded-full border-4 border-gray-400 flex items-center justify-center">
                <Flag size={12} className="text-white fill-white" />
             </div>
             <div className="font-comic text-gray-400 mt-2 whitespace-nowrap text-lg">GAME START</div>
          </div>

        </div>
      </div>
    </ComicPanel>
  );
};

export default CareerTimeline;