import React from 'react';
import { CareerItem } from '../types';
import ComicPanel from './ComicPanel';

interface CareerTimelineProps {
  data: CareerItem[];
}

// Short first-person mission log per entry
const LOGS: Record<string, string> = {
  'c-00': "Found myself at Atomicwork in January. Product work — sitting with engineers, figuring out what people actually need. Still finding my footing, but there's something honest about it.",
  'c-01': "A short spell at FPL Core. Moved fast, thought clear. Made some things I'm proud of.",
  'c-02': "Near a year with Sustain Film Festival. Design, technical work — invented the rules as I went. Built things from nothing. That's the work I like best.",
  'c-03': "Crossed the water to study in England. Film, Animation, Digital Arts. A year of pulling ideas apart and putting them back together different.",
  'c-04': "Taking work on my own since 2023. All kinds of clients. You learn sharp when there's nobody else to ask.",
  'c-05': "Three years at McKinsey. Proper outfit. Learned what's inside a corporate machine. Glad I did. Gladder I left.",
  'c-06': "Where it all started. Bharathiar University, 2016–2019. Figured out early I was more drawn to how things look than how they calculate.",
};

// ── Pencil-style SVG Sketches ──
const SketchLaptop = () => (
  <svg viewBox="0 0 120 90" fill="none" className="w-full h-full">
    <path d="M12 72 Q60 68 108 72" stroke="#0a0a0a" strokeWidth="1.1" strokeLinecap="round" opacity="0.45"/>
    <path d="M30 70 Q60 68 90 70 L87 52 Q60 49 33 52 Z" stroke="#0a0a0a" strokeWidth="1.1" fill="rgba(10,10,10,0.04)" opacity="0.6"/>
    <path d="M34 51 Q60 48 86 51 L83 22 Q60 19 37 22 Z" stroke="#0a0a0a" strokeWidth="1.1" fill="rgba(10,10,10,0.03)" opacity="0.55"/>
    <line x1="42" y1="32" x2="78" y2="32" stroke="#0a0a0a" strokeWidth="0.7" opacity="0.28"/>
    <line x1="42" y1="38" x2="68" y2="38" stroke="#0a0a0a" strokeWidth="0.7" opacity="0.22"/>
    <rect x="42" y="44" width="22" height="5" rx="1" stroke="#0a0a0a" strokeWidth="0.7" opacity="0.25"/>
    <path d="M92 60 L89 72 Q89 76 93 76 Q97 76 97 72 L94 60 Z" stroke="#0a0a0a" strokeWidth="0.9" fill="rgba(10,10,10,0.05)" opacity="0.45"/>
    <path d="M97 63 Q102 63 102 67 Q102 71 97 71" stroke="#0a0a0a" strokeWidth="0.8" fill="none" opacity="0.38"/>
  </svg>
);

const SketchStylus = () => (
  <svg viewBox="0 0 120 90" fill="none" className="w-full h-full">
    <rect x="14" y="42" width="52" height="38" rx="1" stroke="#0a0a0a" strokeWidth="1.1" fill="rgba(10,10,10,0.03)" transform="rotate(-7 40 61)" opacity="0.5"/>
    <rect x="54" y="38" width="48" height="36" rx="1" stroke="#0a0a0a" strokeWidth="1.1" fill="rgba(10,10,10,0.04)" transform="rotate(4 78 56)" opacity="0.48"/>
    <line x1="88" y1="18" x2="38" y2="86" stroke="#0a0a0a" strokeWidth="1.6" strokeLinecap="round" opacity="0.55"/>
    <path d="M38 86 L34 96 L44 88 Z" fill="rgba(10,10,10,0.5)" opacity="0.55"/>
    <rect x="12" y="26" width="68" height="9" rx="1" stroke="#0a0a0a" strokeWidth="0.9" fill="rgba(10,10,10,0.03)" transform="rotate(-13 46 30)" opacity="0.4"/>
  </svg>
);

const SketchReel = () => (
  <svg viewBox="0 0 120 90" fill="none" className="w-full h-full">
    <circle cx="52" cy="48" r="36" stroke="#0a0a0a" strokeWidth="1.2" fill="rgba(10,10,10,0.03)" opacity="0.55"/>
    <circle cx="52" cy="48" r="13" stroke="#0a0a0a" strokeWidth="1" opacity="0.45"/>
    <circle cx="52" cy="48" r="4"  stroke="#0a0a0a" strokeWidth="1.2" opacity="0.5"/>
    {[0,60,120,180,240,300].map(a => (
      <line key={a}
        x1={52 + 13 * Math.cos(a * Math.PI / 180)}
        y1={48 + 13 * Math.sin(a * Math.PI / 180)}
        x2={52 + 34 * Math.cos(a * Math.PI / 180)}
        y2={48 + 34 * Math.sin(a * Math.PI / 180)}
        stroke="#0a0a0a" strokeWidth="0.9" opacity="0.38"
      />
    ))}
    <line x1="96" y1="16" x2="96" y2="64" stroke="#0a0a0a" strokeWidth="1" opacity="0.35"/>
    <line x1="108" y1="16" x2="108" y2="64" stroke="#0a0a0a" strokeWidth="1" opacity="0.35"/>
    {[20,32,44,56].map((y,i) => (
      <rect key={i} x="97" y={y} width="10" height="7" rx="1" stroke="#0a0a0a" strokeWidth="0.8" opacity="0.38"/>
    ))}
  </svg>
);

const SketchBooks = () => (
  <svg viewBox="0 0 120 90" fill="none" className="w-full h-full">
    <rect x="16" y="66" width="88" height="14" rx="1" stroke="#0a0a0a" strokeWidth="1.1" fill="rgba(10,10,10,0.04)" opacity="0.5"/>
    <rect x="22" y="52" width="76" height="14" rx="1" stroke="#0a0a0a" strokeWidth="1.1" fill="rgba(10,10,10,0.04)" opacity="0.5"/>
    <rect x="28" y="40" width="64" height="12" rx="1" stroke="#0a0a0a" strokeWidth="1.1" fill="rgba(10,10,10,0.04)" opacity="0.5"/>
    <path d="M24 22 Q60 17 60 42 Q60 17 96 22 L96 42 Q60 37 60 42 Q60 37 24 42 Z" stroke="#0a0a0a" strokeWidth="1.2" fill="rgba(10,10,10,0.03)" opacity="0.55"/>
    <line x1="60" y1="42" x2="60" y2="20" stroke="#0a0a0a" strokeWidth="0.8" opacity="0.35"/>
    <path d="M60 10 L78 17 L60 23 L42 17 Z" stroke="#0a0a0a" strokeWidth="1" fill="rgba(10,10,10,0.05)" opacity="0.5"/>
  </svg>
);

const SketchCompass = () => (
  <svg viewBox="0 0 120 90" fill="none" className="w-full h-full">
    <path d="M5 78 L30 30 L58 56 L76 22 L108 78" stroke="#0a0a0a" strokeWidth="1" strokeLinejoin="round" fill="rgba(10,10,10,0.03)" opacity="0.42"/>
    <circle cx="62" cy="50" r="24" stroke="#0a0a0a" strokeWidth="1" fill="rgba(252,251,247,0.85)" opacity="0.8"/>
    <line x1="62" y1="26" x2="62" y2="74" stroke="#0a0a0a" strokeWidth="0.7" opacity="0.35"/>
    <line x1="38" y1="50" x2="86" y2="50" stroke="#0a0a0a" strokeWidth="0.7" opacity="0.35"/>
    <path d="M62 32 L66 50 L62 46 L58 50 Z" fill="rgba(10,10,10,0.55)" opacity="0.6"/>
    <path d="M62 68 L66 50 L62 54 L58 50 Z" fill="rgba(10,10,10,0.18)" opacity="0.5"/>
  </svg>
);

const SketchEasel = () => (
  <svg viewBox="0 0 120 90" fill="none" className="w-full h-full">
    <line x1="60" y1="16" x2="38" y2="88" stroke="#0a0a0a" strokeWidth="1" strokeLinecap="round" opacity="0.42"/>
    <line x1="60" y1="16" x2="82" y2="88" stroke="#0a0a0a" strokeWidth="1" strokeLinecap="round" opacity="0.42"/>
    <line x1="60" y1="16" x2="60" y2="88" stroke="#0a0a0a" strokeWidth="0.7" opacity="0.3"/>
    <line x1="46" y1="68" x2="74" y2="68" stroke="#0a0a0a" strokeWidth="0.9" opacity="0.3"/>
    <rect x="20" y="14" width="80" height="52" rx="1" stroke="#0a0a0a" strokeWidth="1.2" fill="rgba(10,10,10,0.03)" opacity="0.58"/>
    <line x1="30" y1="58" x2="30" y2="26" stroke="#0a0a0a" strokeWidth="0.8" opacity="0.35"/>
    <line x1="30" y1="58" x2="94" y2="58" stroke="#0a0a0a" strokeWidth="0.8" opacity="0.35"/>
    <rect x="36" y="44" width="9" height="14" stroke="#0a0a0a" strokeWidth="0.7" fill="rgba(10,10,10,0.06)" opacity="0.45"/>
    <rect x="50" y="36" width="9" height="22" stroke="#0a0a0a" strokeWidth="0.7" fill="rgba(10,10,10,0.06)" opacity="0.45"/>
    <rect x="64" y="40" width="9" height="18" stroke="#0a0a0a" strokeWidth="0.7" fill="rgba(10,10,10,0.06)" opacity="0.45"/>
    <rect x="78" y="30" width="9" height="28" stroke="#0a0a0a" strokeWidth="0.7" fill="rgba(10,10,10,0.06)" opacity="0.45"/>
  </svg>
);

const SketchCampus = () => (
  <svg viewBox="0 0 120 90" fill="none" className="w-full h-full">
    <line x1="5" y1="78" x2="115" y2="78" stroke="#0a0a0a" strokeWidth="1" opacity="0.38"/>
    <rect x="28" y="36" width="64" height="42" stroke="#0a0a0a" strokeWidth="1.1" fill="rgba(10,10,10,0.03)" opacity="0.52"/>
    {[36,47,58,69,80].map((x,i) => (
      <line key={i} x1={x} y1="36" x2={x} y2="78" stroke="#0a0a0a" strokeWidth="0.7" opacity="0.26"/>
    ))}
    <path d="M22 36 L60 12 L98 36" stroke="#0a0a0a" strokeWidth="1.1" strokeLinejoin="round" fill="rgba(10,10,10,0.03)" opacity="0.52"/>
    {[36,52,68,84].map((x,i) => (
      <rect key={i} x={x} y={52} width="9" height="13" rx="1" stroke="#0a0a0a" strokeWidth="0.7" opacity="0.32"/>
    ))}
    <line x1="60" y1="12" x2="60" y2="4"  stroke="#0a0a0a" strokeWidth="0.8" opacity="0.4"/>
    <path d="M60 4 L70 8 L60 12 Z" fill="rgba(10,10,10,0.2)" opacity="0.45"/>
  </svg>
);

const SketchController = () => (
  <svg viewBox="0 0 120 90" fill="none" className="w-full h-full">
    <path d="M18 46 Q14 30 26 26 Q50 20 60 22 Q70 20 94 26 Q106 30 102 46 Q99 60 90 68 Q78 76 68 72 Q64 70 60 66 Q56 70 52 72 Q42 76 30 68 Q21 60 18 46 Z" stroke="#0a0a0a" strokeWidth="1.2" fill="rgba(10,10,10,0.03)" opacity="0.58"/>
    <rect x="28" y="40" width="5" height="14" rx="1" stroke="#0a0a0a" strokeWidth="0.8" opacity="0.42"/>
    <rect x="22" y="46" width="16" height="5"  rx="1" stroke="#0a0a0a" strokeWidth="0.8" opacity="0.42"/>
    <circle cx="84" cy="40" r="3.5" stroke="#0a0a0a" strokeWidth="0.8" opacity="0.42"/>
    <circle cx="92" cy="48" r="3.5" stroke="#0a0a0a" strokeWidth="0.8" opacity="0.42"/>
    <circle cx="76" cy="48" r="3.5" stroke="#0a0a0a" strokeWidth="0.8" opacity="0.42"/>
    <circle cx="84" cy="56" r="3.5" stroke="#0a0a0a" strokeWidth="0.8" opacity="0.42"/>
    <rect x="54" y="38" width="6" height="4" rx="1.5" stroke="#0a0a0a" strokeWidth="0.7" opacity="0.35"/>
    <rect x="64" y="38" width="6" height="4" rx="1.5" stroke="#0a0a0a" strokeWidth="0.7" opacity="0.35"/>
    <circle cx="40" cy="56" r="6" stroke="#0a0a0a" strokeWidth="0.8" fill="rgba(10,10,10,0.03)" opacity="0.38"/>
    <circle cx="78" cy="36" r="6" stroke="#0a0a0a" strokeWidth="0.8" fill="rgba(10,10,10,0.03)" opacity="0.38"/>
  </svg>
);

const SKETCHES: Record<string, React.FC> = {
  'c-00': SketchLaptop,
  'c-01': SketchStylus,
  'c-02': SketchReel,
  'c-03': SketchBooks,
  'c-04': SketchCompass,
  'c-05': SketchEasel,
  'c-06': SketchCampus,
};

const CareerTimeline: React.FC<CareerTimelineProps> = ({ data }) => {
  const current  = data[0];
  const rest     = data.slice(1);

  return (
    <div className="w-full">

      {/* ── Section Header ── */}
      <div className="bg-ink text-white border-4 border-ink shadow-comic mb-6 overflow-hidden relative">
        <div className="absolute inset-0 halftone-pattern pointer-events-none mix-blend-overlay opacity-30 z-0" />
        <div className="relative z-10 p-6 flex flex-col md:flex-row md:items-end gap-2 justify-between">
          <div>
            <p className="font-sans text-xs text-secondary tracking-[0.3em] uppercase opacity-70 mb-1">
              Field Operations &amp; Academic Missions
            </p>
            <h3 className="font-comic text-5xl md:text-6xl uppercase leading-none tracking-wide">
              Career Quest Log
            </h3>
          </div>
          <span className="font-comic text-secondary text-2xl opacity-60 hidden md:block">
            {data.length} Entries
          </span>
        </div>
        {/* Bottom accent stripe */}
        <div className="h-3 bg-secondary relative z-10" />
      </div>

      {/* ── Current Role — Hero Card ── */}
      {current && (() => {
        const Sketch = SKETCHES[current.id] ?? SketchLaptop;
        return (
          <div className="mb-6">
            <ComicPanel className="overflow-hidden hover:shadow-comic-hover transition-shadow duration-300" variant="white">
              {/* Yellow "current level" header bar */}
              <div className="bg-secondary border-b-4 border-ink px-5 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Pulsing live indicator */}
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent border border-ink"></span>
                  </span>
                  <span className="font-comic text-lg uppercase tracking-wide text-ink">
                    ★ Current Level
                  </span>
                </div>
                <span className="font-sans text-xs font-bold text-ink opacity-50 uppercase tracking-widest hidden md:block">
                  {current.period}
                </span>
              </div>

              {/* Card body */}
              <div className="flex flex-col md:flex-row">
                {/* Text */}
                <div className="flex-1 p-6 md:p-8">
                  <span className="font-sans text-xs font-bold text-ink opacity-40 uppercase tracking-widest md:hidden block mb-2">
                    {current.period}
                  </span>
                  <h4 className="font-comic text-5xl md:text-6xl leading-tight uppercase text-ink mb-2">
                    {current.role}
                  </h4>
                  <p className="font-sans font-extrabold text-lg text-gray-700 mb-5">
                    {current.organization}
                  </p>
                  <p className="font-sans text-base text-gray-700 leading-relaxed italic border-l-4 border-secondary pl-4">
                    {LOGS[current.id]}
                  </p>
                </div>

                {/* Right: sketch + XP bar */}
                <div className="w-full md:w-64 border-t-4 md:border-t-0 md:border-l-4 border-ink flex flex-col items-center justify-center gap-6 p-6 bg-paper">
                  <div className="w-full opacity-65">
                    <Sketch />
                  </div>
                  {/* XP bar */}
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="font-comic text-xs text-ink opacity-50 uppercase">XP</span>
                      <span className="font-comic text-xs text-accent">GAINING</span>
                    </div>
                    <div className="h-3 w-full border-2 border-ink bg-white overflow-hidden">
                      <div
                        className="h-full bg-accent"
                        style={{ width: '35%', backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 8px)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ComicPanel>
          </div>
        );
      })()}

      {/* ── Past Entries Grid ── */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {rest.map((item) => {
          const isWork  = item.type === 'Work';
          const Sketch  = SKETCHES[item.id] ?? SketchLaptop;
          return (
            <ComicPanel key={item.id} className="flex flex-col h-full hover:shadow-comic-hover transition-shadow duration-300" variant="white">
              {/* Card header */}
              <div className={`flex items-center justify-between px-4 py-2 border-b-4 border-ink ${isWork ? 'bg-secondary' : 'bg-ink'}`}>
                <span className={`font-comic text-sm tracking-wide uppercase ${isWork ? 'text-ink' : 'text-secondary'}`}>
                  {isWork ? '⬡ Field Work' : '⬡ Academy'}
                </span>
                <span className={`font-sans text-[10px] font-bold uppercase tracking-widest ${isWork ? 'text-ink opacity-60' : 'text-white opacity-60'}`}>
                  {item.period}
                </span>
              </div>
              {/* Card body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex gap-4 mb-4">
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-comic text-2xl leading-tight uppercase mb-1">{item.role}</h4>
                    <p className="font-sans font-bold text-sm text-gray-600">{item.organization}</p>
                  </div>
                  {/* Sketch thumbnail */}
                  <div className="w-20 flex-shrink-0 opacity-50">
                    <Sketch />
                  </div>
                </div>
                <p className="font-sans text-sm text-gray-700 leading-relaxed italic flex-1">
                  {LOGS[item.id]}
                </p>
                <div className="mt-4 pt-3 border-t-2 border-gray-100 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  <span className="font-comic text-gray-400 text-xs uppercase tracking-widest">Mission Complete</span>
                </div>
              </div>
            </ComicPanel>
          );
        })}
      </div>

      {/* ── Side Quest ── */}
      <ComicPanel variant="yellow" className="overflow-hidden hover:shadow-comic-hover transition-shadow duration-300">
        <div className="flex flex-col md:flex-row">
          {/* Left */}
          <div className="flex-1 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-comic text-sm bg-ink text-secondary px-3 py-1 border-2 border-ink shadow-[2px_2px_0_rgba(0,0,0,0.4)]">
                ⊕ SIDE QUEST
              </span>
              <span className="font-sans text-xs text-ink opacity-50 uppercase tracking-widest">
                Invite-Only
              </span>
            </div>
            <h4 className="font-comic text-4xl uppercase leading-tight mb-1">QA Tester</h4>
            <p className="font-sans font-bold text-gray-800 text-lg mb-4">
              Electronic Arts &amp; Glowmade
            </p>
            <p className="font-sans text-sm text-gray-800 leading-relaxed italic border-l-4 border-ink/30 pl-4">
              Got word from EA — invite only. The kind you don't turn down. Played builds that weren't finished yet. Found what was broken, wrote it down proper. Evaluated balance, flow, and what it actually felt like to play. Did the same for Glowmade. Quiet work. Honest work.
            </p>
          </div>
          {/* Right: sketch */}
          <div className="w-full md:w-52 border-t-4 md:border-t-0 md:border-l-4 border-ink/30 flex items-center justify-center p-6 bg-black/5">
            <div className="w-full opacity-60">
              <SketchController />
            </div>
          </div>
        </div>
      </ComicPanel>

    </div>
  );
};

export default CareerTimeline;
