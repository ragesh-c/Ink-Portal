import React from 'react';
import { CareerItem } from '../types';

interface CareerTimelineProps {
  data: CareerItem[];
}

const LOGS: Record<string, string> = {
  'c-00': "Found myself at Atomicwork in December. Product work — sitting with engineers, figuring out what people actually need. Still finding my footing, but there's something honest about it. Learnt a great deal and left with a changed perspective.",
  'c-01': "A short spell at FPL Core. Moved fast, thought clear. Made some things I'm proud of.",
  'c-02': "Near a year with Sustain Film Festival. Design, technical work — invented the rules as I went. Built things from nothing. That's the work I like best.",
  'c-03': "Crossed the water to study in England. Film, Animation, Digital Arts. A year of pulling ideas apart and putting them back together different.",
  'c-04': "Taking work on my own since 2023. All kinds of clients. You learn sharp when there's nobody else to ask.",
  'c-05': "Three years at McKinsey. Proper outfit. Learned what's inside a corporate machine. Glad I did. Gladder I left.",
  'c-06': "Where it all started. Bharathiar University, 2016–2019. Figured out early I was more drawn to how things look than how they calculate.",
};

const SIDE_QUEST = {
  id: 'sq',
  role: 'QA Tester',
  organization: 'Electronic Arts & Glowmade',
  period: 'Invite-Only',
  type: 'Work' as const,
};
const SIDE_QUEST_LOG = "Got word from EA — invite only. The kind you don't turn down. Played builds that weren't finished yet. Found what was broken, wrote it down proper. Did the same for Glowmade. Quiet work. Honest work.";

// Pencil sketches — kept as small panel illustrations
const SketchLaptop = () => (
  <svg viewBox="0 0 120 90" fill="none" className="w-full h-full">
    <path d="M12 72 Q60 68 108 72" stroke="#0a0a0a" strokeWidth="1.1" strokeLinecap="round" opacity="0.45"/>
    <path d="M30 70 Q60 68 90 70 L87 52 Q60 49 33 52 Z" stroke="#0a0a0a" strokeWidth="1.1" fill="rgba(10,10,10,0.04)" opacity="0.6"/>
    <path d="M34 51 Q60 48 86 51 L83 22 Q60 19 37 22 Z" stroke="#0a0a0a" strokeWidth="1.1" fill="rgba(10,10,10,0.03)" opacity="0.55"/>
    <line x1="42" y1="32" x2="78" y2="32" stroke="#0a0a0a" strokeWidth="0.7" opacity="0.28"/>
    <line x1="42" y1="38" x2="68" y2="38" stroke="#0a0a0a" strokeWidth="0.7" opacity="0.22"/>
  </svg>
);
const SketchStylus = () => (
  <svg viewBox="0 0 120 90" fill="none" className="w-full h-full">
    <rect x="14" y="42" width="52" height="38" rx="1" stroke="#0a0a0a" strokeWidth="1.1" fill="rgba(10,10,10,0.03)" transform="rotate(-7 40 61)" opacity="0.5"/>
    <rect x="54" y="38" width="48" height="36" rx="1" stroke="#0a0a0a" strokeWidth="1.1" fill="rgba(10,10,10,0.04)" transform="rotate(4 78 56)" opacity="0.48"/>
    <line x1="88" y1="18" x2="38" y2="86" stroke="#0a0a0a" strokeWidth="1.6" strokeLinecap="round" opacity="0.55"/>
    <path d="M38 86 L34 96 L44 88 Z" fill="rgba(10,10,10,0.5)" opacity="0.55"/>
  </svg>
);
const SketchReel = () => (
  <svg viewBox="0 0 120 90" fill="none" className="w-full h-full">
    <circle cx="52" cy="48" r="36" stroke="#0a0a0a" strokeWidth="1.2" fill="rgba(10,10,10,0.03)" opacity="0.55"/>
    <circle cx="52" cy="48" r="13" stroke="#0a0a0a" strokeWidth="1" opacity="0.45"/>
    <circle cx="52" cy="48" r="4"  stroke="#0a0a0a" strokeWidth="1.2" opacity="0.5"/>
    {[0,60,120,180,240,300].map(a => (
      <line key={a} x1={52+13*Math.cos(a*Math.PI/180)} y1={48+13*Math.sin(a*Math.PI/180)} x2={52+34*Math.cos(a*Math.PI/180)} y2={48+34*Math.sin(a*Math.PI/180)} stroke="#0a0a0a" strokeWidth="0.9" opacity="0.38"/>
    ))}
  </svg>
);
const SketchBooks = () => (
  <svg viewBox="0 0 120 90" fill="none" className="w-full h-full">
    <rect x="16" y="66" width="88" height="14" rx="1" stroke="#0a0a0a" strokeWidth="1.1" fill="rgba(10,10,10,0.04)" opacity="0.5"/>
    <rect x="22" y="52" width="76" height="14" rx="1" stroke="#0a0a0a" strokeWidth="1.1" fill="rgba(10,10,10,0.04)" opacity="0.5"/>
    <path d="M24 22 Q60 17 60 42 Q60 17 96 22 L96 42 Q60 37 60 42 Q60 37 24 42 Z" stroke="#0a0a0a" strokeWidth="1.2" fill="rgba(10,10,10,0.03)" opacity="0.55"/>
  </svg>
);
const SketchCompass = () => (
  <svg viewBox="0 0 120 90" fill="none" className="w-full h-full">
    <circle cx="62" cy="50" r="24" stroke="#0a0a0a" strokeWidth="1" fill="rgba(252,251,247,0.85)" opacity="0.8"/>
    <line x1="62" y1="26" x2="62" y2="74" stroke="#0a0a0a" strokeWidth="0.7" opacity="0.35"/>
    <line x1="38" y1="50" x2="86" y2="50" stroke="#0a0a0a" strokeWidth="0.7" opacity="0.35"/>
    <path d="M62 32 L66 50 L62 46 L58 50 Z" fill="rgba(10,10,10,0.55)" opacity="0.6"/>
  </svg>
);
const SketchEasel = () => (
  <svg viewBox="0 0 120 90" fill="none" className="w-full h-full">
    <line x1="60" y1="16" x2="38" y2="88" stroke="#0a0a0a" strokeWidth="1" strokeLinecap="round" opacity="0.42"/>
    <line x1="60" y1="16" x2="82" y2="88" stroke="#0a0a0a" strokeWidth="1" strokeLinecap="round" opacity="0.42"/>
    <rect x="20" y="14" width="80" height="52" rx="1" stroke="#0a0a0a" strokeWidth="1.2" fill="rgba(10,10,10,0.03)" opacity="0.58"/>
  </svg>
);
const SketchCampus = () => (
  <svg viewBox="0 0 120 90" fill="none" className="w-full h-full">
    <rect x="28" y="36" width="64" height="42" stroke="#0a0a0a" strokeWidth="1.1" fill="rgba(10,10,10,0.03)" opacity="0.52"/>
    <path d="M22 36 L60 12 L98 36" stroke="#0a0a0a" strokeWidth="1.1" strokeLinejoin="round" fill="rgba(10,10,10,0.03)" opacity="0.52"/>
  </svg>
);
const SketchController = () => (
  <svg viewBox="0 0 120 90" fill="none" className="w-full h-full">
    <path d="M18 46 Q14 30 26 26 Q50 20 60 22 Q70 20 94 26 Q106 30 102 46 Q99 60 90 68 Q78 76 68 72 Q64 70 60 66 Q56 70 52 72 Q42 76 30 68 Q21 60 18 46 Z" stroke="#0a0a0a" strokeWidth="1.2" fill="rgba(10,10,10,0.03)" opacity="0.58"/>
    <rect x="28" y="40" width="5" height="14" rx="1" stroke="#0a0a0a" strokeWidth="0.8" opacity="0.42"/>
    <rect x="22" y="46" width="16" height="5" rx="1" stroke="#0a0a0a" strokeWidth="0.8" opacity="0.42"/>
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
  'sq':   SketchController,
};

interface PanelCardProps {
  entry: CareerItem | typeof SIDE_QUEST;
  chapterLabel: string;
  log: string;
  Sketch?: React.FC;
  isCurrent: boolean;
  isEdu: boolean;
  isSQ: boolean;
}

const PanelCard: React.FC<PanelCardProps> = ({ entry, chapterLabel, log, Sketch, isCurrent, isEdu, isSQ }) => (
  <div className={`
    relative border-4 border-ink p-5 w-full overflow-hidden
    ${isCurrent ? 'bg-secondary shadow-[6px_6px_0_#0a0a0a]' : 'bg-paper shadow-[4px_4px_0_#0a0a0a]'}
    ${isSQ ? 'border-dashed' : ''}
  `}>
    {/* Chapter tag */}
    <span className={`
      inline-block px-2 py-0.5 text-xs font-comic uppercase tracking-widest mb-3 border-2 border-ink
      ${isSQ ? 'bg-secondary text-ink' : isEdu ? 'bg-accent text-white' : 'bg-ink text-white'}
    `}>
      {chapterLabel}
    </span>

    {/* Role */}
    <h3 className="font-comic text-3xl md:text-4xl uppercase leading-tight text-ink mb-1">
      {entry.role}
    </h3>

    {/* Org + period */}
    <div className="flex flex-wrap justify-between items-baseline gap-x-3 mb-4">
      <span className="font-sans font-black text-sm uppercase tracking-wide text-gray-700">{entry.organization}</span>
      <span className="font-sans text-xs text-gray-500 font-semibold">{entry.period}</span>
    </div>

    {/* Mission log */}
    <p className="font-sans text-sm italic text-gray-700 border-l-4 border-ink pl-3 leading-relaxed pr-16">
      {log}
    </p>

    {/* Sketch illustration */}
    {Sketch && (
      <div className="absolute bottom-3 right-3 w-16 h-12 opacity-30 pointer-events-none">
        <Sketch />
      </div>
    )}

    {/* Active marker */}
    {isCurrent && (
      <div className="absolute -top-3 -right-3 bg-accent text-white border-2 border-ink px-2 py-0.5 font-comic text-xs uppercase transform rotate-2 shadow-sm">
        Active
      </div>
    )}
  </div>
);

const CareerTimeline: React.FC<CareerTimelineProps> = ({ data }) => {
  // Journey order: oldest → newest
  const journey = [...data].reverse();

  // Weave side quest in after c-03 (Masters degree)
  type AnyEntry = CareerItem | typeof SIDE_QUEST;
  const allItems: AnyEntry[] = [];
  journey.forEach(entry => {
    allItems.push(entry);
    if (entry.id === 'c-03') allItems.push(SIDE_QUEST);
  });

  let workChapter = 0;
  let eduChapter = 0;

  return (
    <div className="relative">
      {/* Quest path line — desktop center, mobile left */}
      <div
        className="absolute top-0 bottom-0 left-5 md:left-1/2 z-0 md:-translate-x-px"
        style={{
          width: '4px',
          background: 'repeating-linear-gradient(to bottom, #0a0a0a 0px, #0a0a0a 14px, transparent 14px, transparent 24px)',
        }}
      />

      <div className="relative z-10 space-y-6 md:space-y-10">
        {allItems.map((entry, i) => {
          const isSQ = entry.id === 'sq';
          const isCurrent = entry.id === 'c-00';
          const isEdu = entry.type === 'Education';
          const log = isSQ ? SIDE_QUEST_LOG : (LOGS[entry.id] ?? '');
          const Sketch = SKETCHES[entry.id];

          let chapterLabel: string;
          if (isSQ) {
            chapterLabel = '⊕ Side Quest';
          } else if (isEdu) {
            eduChapter++;
            chapterLabel = `Training Arc ${String(eduChapter).padStart(2, '0')}`;
          } else {
            workChapter++;
            chapterLabel = `Chapter ${String(workChapter).padStart(2, '0')}`;
          }

          // Desktop: alternating sides. Side quest always right.
          const panelOnLeft = !isSQ && i % 2 === 0;

          const dotBg = isCurrent
            ? 'bg-accent'
            : isSQ
            ? 'bg-secondary'
            : isEdu
            ? 'bg-secondary'
            : 'bg-paper';

          return (
            <div key={entry.id} className="relative flex items-start">

              {/* Desktop left slot */}
              <div className="hidden md:flex w-[calc(50%-1.5rem)] pr-6 justify-end">
                {panelOnLeft && (
                  <PanelCard
                    entry={entry} chapterLabel={chapterLabel} log={log}
                    Sketch={Sketch} isCurrent={isCurrent} isEdu={isEdu} isSQ={false}
                  />
                )}
              </div>

              {/* Waypoint dot */}
              {/* Mobile */}
              <div className={`
                md:hidden absolute top-5 left-[0.625rem] w-6 h-6 rounded-full border-4 border-ink z-10
                flex items-center justify-center flex-shrink-0 ${dotBg}
              `}>
                {isCurrent && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
              </div>
              {/* Desktop */}
              <div className="hidden md:flex w-12 flex-shrink-0 justify-center pt-5">
                <div className={`
                  w-7 h-7 rounded-full border-4 border-ink flex items-center justify-center flex-shrink-0 ${dotBg}
                  ${isCurrent ? 'shadow-[0_0_0_4px_rgba(239,68,68,0.2)]' : ''}
                `}>
                  {isCurrent && <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />}
                </div>
              </div>

              {/* Desktop right slot */}
              <div className="hidden md:flex w-[calc(50%-1.5rem)] pl-6">
                {(!panelOnLeft) && (
                  <PanelCard
                    entry={entry} chapterLabel={chapterLabel} log={log}
                    Sketch={Sketch} isCurrent={isCurrent} isEdu={isEdu} isSQ={isSQ}
                  />
                )}
              </div>

              {/* Mobile panel */}
              <div className="md:hidden flex-1 pl-10">
                <PanelCard
                  entry={entry} chapterLabel={chapterLabel} log={log}
                  Sketch={Sketch} isCurrent={isCurrent} isEdu={isEdu} isSQ={isSQ}
                />
              </div>
            </div>
          );
        })}

        {/* To be continued */}
        <div className="relative flex items-start">
          <div className="hidden md:block w-[calc(50%-1.5rem)] pr-6" />
          <div className="hidden md:flex w-12 flex-shrink-0 justify-center pt-5">
            <div className="w-7 h-7 border-4 border-dashed border-gray-400 flex items-center justify-center bg-paper">
              <span className="font-comic text-xs text-gray-400">?</span>
            </div>
          </div>
          {/* Mobile dot */}
          <div className="md:hidden absolute top-5 left-[0.625rem] w-6 h-6 border-4 border-dashed border-gray-400 z-10 flex items-center justify-center bg-paper">
            <span className="font-comic text-[8px] text-gray-400">?</span>
          </div>
          <div className="flex-1 md:w-[calc(50%-1.5rem)] pl-10 md:pl-6">
            <div className="border-4 border-dashed border-gray-400 p-4 bg-paper/60">
              <div className="font-comic text-xs uppercase tracking-widest text-gray-400 mb-1">Next Chapter</div>
              <div className="font-comic text-2xl text-gray-400 uppercase">To be continued...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerTimeline;
