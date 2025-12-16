import React from 'react';
import { CareerItem } from '../types';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';
import ComicPanel from './ComicPanel';

interface CareerTimelineProps {
  data: CareerItem[];
}

const CareerTimeline: React.FC<CareerTimelineProps> = ({ data }) => {
  return (
    <ComicPanel className="h-full flex flex-col" variant="white">
      {/* Header */}
      <div className="p-4 border-b-4 border-ink bg-secondary flex items-center gap-3 sticky top-0 z-20">
        <div className="bg-ink p-2 rounded-full shadow-comic-sm">
          <MapPin className="text-white" size={20} />
        </div>
        <h3 className="font-comic text-2xl uppercase tracking-wide">Career Quest Mode</h3>
      </div>

      {/* Scrollable Timeline Area */}
      <div className="overflow-y-auto max-h-[500px] p-6 relative custom-scrollbar">
        {/* The Path Line */}
        <div className="absolute left-[39px] top-6 bottom-6 w-1 bg-gray-300 z-0"></div>
        <div className="absolute left-[37px] top-6 bottom-6 w-1.5 border-l-4 border-dashed border-ink z-0 opacity-80"></div>

        <div className="space-y-8 relative z-10">
          {data.map((item, index) => {
            const isWork = item.type === 'Work';
            return (
              <div key={item.id} className="group relative flex gap-6 items-start">
                
                {/* Timeline Node / "Level Marker" */}
                <div className={`
                  flex-shrink-0 w-12 h-12 rounded-full border-4 border-ink z-10 
                  flex items-center justify-center shadow-comic-sm transition-transform duration-300 group-hover:scale-110
                  ${isWork ? 'bg-accent' : 'bg-secondary'}
                `}>
                  {isWork ? (
                    <Briefcase size={20} className="text-white" />
                  ) : (
                    <GraduationCap size={22} className="text-ink" />
                  )}
                </div>

                {/* Content Card */}
                <div className="flex-grow">
                  <div className={`
                    relative bg-white border-2 border-ink p-4 shadow-comic-sm 
                    transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-comic
                    ${index === 0 ? 'bg-yellow-50' : ''}
                  `}>
                    {/* Tiny connector triangle */}
                    <div className="absolute top-4 -left-[9px] w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-ink"></div>
                    <div className="absolute top-4 -left-[6px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-white"></div>

                    {index === 0 && (
                      <div className="absolute -top-3 -right-2 bg-ink text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce">
                        CURRENT LEVEL
                      </div>
                    )}

                    <h4 className="font-comic text-xl leading-tight mb-1">{item.role}</h4>
                    <p className="font-sans font-bold text-sm text-gray-700 mb-2">{item.organization}</p>
                    
                    <div className="flex items-center gap-2 text-xs font-mono bg-gray-100 p-1.5 rounded border border-gray-200 inline-block">
                      <Calendar size={12} className="text-gray-500" />
                      <span className="uppercase">{item.period}</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
          
          {/* End of Line Dot */}
          <div className="flex gap-6 items-center opacity-50">
             <div className="w-12 flex justify-center">
                <div className="w-4 h-4 bg-ink rounded-full"></div>
             </div>
             <div className="font-comic text-gray-400">GAME START</div>
          </div>
        </div>
      </div>
    </ComicPanel>
  );
};

export default CareerTimeline;