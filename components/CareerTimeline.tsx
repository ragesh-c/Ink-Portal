import React, { useState } from 'react';
import { CareerItem } from '../types';

interface CareerTimelineProps {
  data: CareerItem[];
}

// Short first-person mission log per entry
const LOGS: Record<string, string> = {
  'c-00': "Found myself at Atomicwork in December. Product work — sitting with engineers, figuring out what people actually need. Still finding my footing, but there's something honest about it.",
  'c-01': "A short spell at FPL Core. Moved fast, thought clear. Made some things I'm proud of.",
  'c-02': "Near a year with Sustain Film Festival. Design, technical work — invented the rules as I went. Built things from nothing. That's the work I like best.",
  'c-03': "Crossed the water to study in England. Film, Animation, Digital Arts. A year of pulling ideas apart and putting them back together different.",
  'c-04': "Taking work on my own since 2023. All kinds of clients. You learn sharp when there's nobody else to ask.",
  'c-05': "Three years at McKinsey. Proper outfit. Learned what's inside a corporate machine. Glad I did. Gladder I left.",
  'c-06': "Where it all started. Bharathiar University, 2016–2019. Figured out early I was more drawn to how things look than how they calculate.",
};


// ── Badge SVGs ──
const BadgeStar = ({ glow }: { glow?: boolean }) => (
  <svg viewBox="0 0 48 48" fill="none">
    {glow && <circle cx="24" cy="24" r="21" fill="#fbbf24" opacity="0.2" className="animate-ping" style={{ animationDuration: '2.5s' }} />}
    <polygon points="24,3 27.5,16 40,10 33,22 46,24 33,26 40,38 27.5,32 24,45 20.5,32 8,38 15,26 2,24 15,22 8,10 20.5,16"
      fill="#fbbf24" stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="24" cy="24" r="4" fill="rgba(0,0,0,0.2)" />
    <circle cx="24" cy="24" r="2.5" fill="#fffbeb" opacity="0.9" />
    <ellipse cx="17" cy="14" rx="4" ry="1.8" fill="white" opacity="0.4" transform="rotate(-35 17 14)" />
  </svg>
);
const BadgeDiamond = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <polygon points="24,3 44,24 24,45 4,24" fill="#60a5fa" stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
    <polygon points="24,10 37,24 24,38 11,24" fill="#93c5fd" opacity="0.4" />
    <polygon points="24,17 31,24 24,31 17,24" fill="white" opacity="0.35" />
    <ellipse cx="18" cy="15" rx="3.5" ry="1.6" fill="white" opacity="0.5" transform="rotate(-35 18 15)" />
  </svg>
);
const BadgeHex = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <polygon points="24,3 42,13.5 42,34.5 24,45 6,34.5 6,13.5" fill="#f97316" stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="15" y="19" width="18" height="10" rx="1" fill="white" opacity="0.2" />
    <rect x="15" y="19" width="4" height="3" rx="0.5" fill="white" opacity="0.5" />
    <rect x="29" y="19" width="4" height="3" rx="0.5" fill="white" opacity="0.5" />
    <rect x="15" y="26" width="4" height="3" rx="0.5" fill="white" opacity="0.5" />
    <rect x="29" y="26" width="4" height="3" rx="0.5" fill="white" opacity="0.5" />
    <polygon points="21,21 21,27 29,24" fill="white" opacity="0.7" />
    <ellipse cx="17" cy="12" rx="3.5" ry="1.6" fill="white" opacity="0.38" transform="rotate(-35 17 12)" />
  </svg>
);
const BadgeShield = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <path d="M24 3 L42 10 L42 26 Q42 38 24 45 Q6 38 6 26 L6 10 Z" fill="#8b5cf6" stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M24 9 L37 15 L37 26 Q37 34 24 40 Q11 34 11 26 L11 15 Z" fill="#a78bfa" opacity="0.4" />
    <rect x="17" y="19" width="14" height="10" rx="1" fill="white" opacity="0.25" />
    <line x1="24" y1="19" x2="24" y2="29" stroke="white" strokeWidth="1" opacity="0.55" />
    <line x1="18" y1="22" x2="23" y2="22" stroke="white" strokeWidth="0.8" opacity="0.45" />
    <line x1="18" y1="25" x2="23" y2="25" stroke="white" strokeWidth="0.8" opacity="0.45" />
    <ellipse cx="17" cy="12" rx="3.5" ry="1.6" fill="white" opacity="0.38" transform="rotate(-35 17 12)" />
  </svg>
);
const BadgeCompass = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="20" fill="#10b981" stroke="#0a0a0a" strokeWidth="1.5" />
    <polygon points="24,5 27,21 24,19 21,21"  fill="white" opacity="0.9" />
    <polygon points="24,43 27,27 24,29 21,27" fill="white" opacity="0.35" />
    <polygon points="5,24 21,21 19,24 21,27"  fill="white" opacity="0.45" />
    <polygon points="43,24 27,21 29,24 27,27" fill="white" opacity="0.45" />
    <circle cx="24" cy="24" r="3" fill="rgba(0,0,0,0.25)" />
    <circle cx="24" cy="24" r="1.5" fill="white" opacity="0.9" />
    <ellipse cx="17" cy="13" rx="3.5" ry="1.6" fill="white" opacity="0.38" transform="rotate(-35 17 13)" />
  </svg>
);
const BadgePenta = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <polygon points="24,3 44,17 37,41 11,41 4,17" fill="#ef4444" stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="16" y="30" width="4" height="8"  fill="white" opacity="0.3" />
    <rect x="22" y="24" width="4" height="14" fill="white" opacity="0.5" />
    <rect x="28" y="27" width="4" height="11" fill="white" opacity="0.4" />
    <path d="M18 22 L24 15 L30 22" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
    <ellipse cx="17" cy="10" rx="3.5" ry="1.6" fill="white" opacity="0.38" transform="rotate(-35 17 10)" />
  </svg>
);
const BadgeArch = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <path d="M4 44 L4 20 L12 12 L12 20 L24 8 L36 20 L36 12 L44 20 L44 44 Z" fill="#0ea5e9" stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="11" y="28" width="5" height="16" fill="white" opacity="0.28" />
    <rect x="21" y="28" width="6" height="16" fill="white" opacity="0.28" />
    <rect x="32" y="28" width="5" height="16" fill="white" opacity="0.28" />
    <line x1="8" y1="28" x2="40" y2="28" stroke="white" strokeWidth="1.2" opacity="0.45" />
    <ellipse cx="17" cy="14" rx="3.5" ry="1.6" fill="white" opacity="0.38" transform="rotate(-35 17 14)" />
  </svg>
);
const BadgeBolt = () => (
  <svg viewBox="0 0 48 48" fill="none">
    <polygon points="16,3 32,3 45,16 45,32 32,45 16,45 3,32 3,16" fill="#6b7280" stroke="#0a0a0a" strokeWidth="1.5" strokeLinejoin="round" />
    <polygon points="18,7 30,7 41,18 41,30 30,41 18,41 7,30 7,18" fill="#9ca3af" opacity="0.35" />
    <path d="M28 12 L20 24 L25 24 L20 36 L28 24 L23 24 Z" fill="white" opacity="0.82" />
    <ellipse cx="17" cy="12" rx="3.5" ry="1.6" fill="white" opacity="0.38" transform="rotate(-35 17 12)" />
  </svg>
);

const BADGE_COMPONENTS: Record<string, React.FC<{ glow?: boolean }>> = {
  'c-00': BadgeStar,
  'c-01': BadgeDiamond,
  'c-02': BadgeHex,
  'c-03': BadgeShield,
  'c-04': BadgeCompass,
  'c-05': BadgePenta,
  'c-06': BadgeArch,
  'sq':   BadgeBolt,
};

const px = { fontFamily: "'Press Start 2P', monospace" } as const;

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
  'sq':   SketchController,
};

const SIDE_QUEST = {
  id: 'sq', role: 'QA Tester', organization: 'Electronic Arts & Glowmade',
  period: 'Invite-Only', type: 'Work' as const,
};
const SIDE_QUEST_LOG = "Got word from EA — invite only. The kind you don't turn down. Played builds that weren't finished yet. Found what was broken, wrote it down proper. Evaluated balance, flow, what it actually felt like to play. Did the same for Glowmade. Quiet work. Honest work.";

const CareerTimeline: React.FC<CareerTimelineProps> = ({ data }) => {
  const [selectedId, setSelectedId]     = useState('c-00');

  const allEntries  = [...data, SIDE_QUEST];
  const selected   = allEntries.find(e => e.id === selectedId) ?? allEntries[0];
  const SelBadge   = BADGE_COMPONENTS[selectedId] ?? BadgeStar;
  const SelSketch  = SKETCHES[selectedId] ?? SketchLaptop;
  const selLog     = selectedId === 'sq' ? SIDE_QUEST_LOG : (LOGS[selectedId] ?? '');
  const isCurrent  = selectedId === 'c-00';
  const isSideQ    = selectedId === 'sq';

  return (
    <div className="w-full">

      {/* ── Pokédex Device Body ── */}
      <div style={{
        background: 'linear-gradient(160deg, #e81010 0%, #cc0000 45%, #a80000 100%)',
        borderRadius: '14px 14px 10px 10px',
        padding: '18px 18px 14px 18px',
        border: '3px solid #1a1a1a',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18), 6px 6px 0 #1a1a1a',
      }}>

        {/* ── Top decorative bar (camera + lights + title) ── */}
        <div className="flex items-center gap-3 mb-3">
          {/* Camera eye */}
          <div style={{
            position: 'relative', width: '54px', height: '54px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #93c5fd 0%, #3b82f6 55%, #1e40af 100%)',
            border: '4px solid #1a1a1a',
            boxShadow: '0 2px 10px rgba(0,0,0,0.5), inset 0 1px 3px rgba(255,255,255,0.3)',
          }}>
            <div style={{ position: 'absolute', top: '8px', left: '8px', width: '14px', height: '14px', borderRadius: '50%', background: 'rgba(255,255,255,0.65)' }} />
            <div style={{ position: 'absolute', inset: '7px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }} />
          </div>
          {/* Indicator lights */}
          <div className="flex gap-2 items-center">
            <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ff6b6b', border: '2px solid #1a1a1a', boxShadow: '0 0 6px rgba(255,80,80,0.7)' }} />
            <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#fbbf24', border: '2px solid #1a1a1a', boxShadow: '0 0 6px rgba(251,191,36,0.7)' }} />
            <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#4ade80', border: '2px solid #1a1a1a', boxShadow: '0 0 6px rgba(74,222,128,0.7)' }} />
          </div>
          {/* Title */}
          <span className="font-comic text-white text-2xl uppercase tracking-wide ml-2" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.4)' }}>Career Quest Log</span>
          <span className="ml-auto" style={{ ...px, fontSize: '9px', color: 'rgba(255,255,255,0.45)' }}>CAREER DEX v1.0</span>
        </div>

        {/* ── Screen bezel ── */}
        <div style={{
          background: '#111111',
          borderRadius: '6px',
          padding: '8px',
          boxShadow: 'inset 0 3px 10px rgba(0,0,0,0.7)',
        }}>
          <div style={{ borderRadius: '3px', overflow: 'hidden' }}>

        {/* ── Shared header row — single flex row guarantees alignment ── */}
        <div className="flex border-b border-[#1f2937]" style={{ background: '#0a1628' }}>
          {/* Left label */}
          <div className="md:w-[40%] flex-shrink-0 flex items-center px-4 py-3 border-r border-[#1f2937]">
            <p style={{ ...px, fontSize: '8px', color: '#4ade80' }}>SELECT MISSION</p>
          </div>
          {/* Right status */}
          <div className="flex-1 flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-3">
              {isCurrent && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
              )}
              <span className="font-comic text-sm uppercase tracking-wide" style={{ color: isCurrent ? '#fbbf24' : isSideQ ? '#a78bfa' : '#4ade80' }}>
                {isCurrent ? '★ Current Level' : isSideQ ? '⊕ Side Quest' : '✓ Mission Complete'}
              </span>
            </div>
            <span className="font-sans text-xs font-bold uppercase tracking-widest hidden md:block" style={{ color: '#6b7280' }}>
              {selected?.period}
            </span>
          </div>
        </div>

        {/* ── Main two-panel area ── */}
        <div className="flex flex-col md:flex-row" style={{ minHeight: '480px' }}>

          {/* LEFT — Badge list nav */}
          <div
            className="md:w-[40%] flex-shrink-0 flex flex-col border-b-4 md:border-b-0 md:border-r-4 border-ink overflow-y-auto"
            style={{ background: '#0a1628' }}
          >

            {/* Badge entries */}
            {allEntries.map((entry) => {
              const BadgeComp  = BADGE_COMPONENTS[entry.id];
              const isSelected = selectedId === entry.id;
              const isCurr     = entry.id === 'c-00';
              const isSQ       = entry.id === 'sq';
              return (
                <button
                  key={entry.id}
                  onClick={() => setSelectedId(entry.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 border-b border-[#1a2640]"
                  style={{
                    background: isSelected ? '#111d2e' : 'transparent',
                    borderLeft: isSelected ? '3px solid #fbbf24' : '3px solid transparent',
                  }}
                >
                  {/* Badge icon */}
                  <div
                    className="w-8 h-8 flex-shrink-0 transition-all duration-150"
                    style={{ opacity: isSelected ? 1 : 0.6, transform: isSelected ? 'scale(1.1)' : 'scale(1)' }}
                  >
                    {BadgeComp && <BadgeComp glow={isSelected && isCurr} />}
                  </div>
                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p
                      className="font-comic text-base uppercase leading-tight"
                      style={{ color: isSelected ? '#fbbf24' : '#e5e7eb' }}
                    >
                      {entry.role}
                    </p>
                    <p className="font-sans text-xs" style={{ color: '#9ca3af' }}>
                      {entry.organization}
                    </p>
                  </div>
                  {/* Status dot */}
                  {isCurr && (
                    <span className="flex-shrink-0 relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                    </span>
                  )}
                  {isSQ && !isSelected && (
                    <span className="flex-shrink-0 font-comic text-[10px] text-[#a78bfa]">SQ</span>
                  )}
                </button>
              );
            })}

            {/* Future slot */}
            <div
              className="flex items-center gap-3 px-4 py-3 opacity-30"
              style={{ borderLeft: '3px solid transparent' }}
            >
              <div
                className="w-8 h-8 flex-shrink-0 flex items-center justify-center"
                style={{ border: '2px dashed #374151' }}
              >
                <span style={{ ...px, fontSize: '9px', color: '#374151' }}>?</span>
              </div>
              <p className="font-comic text-sm uppercase text-gray-600">Next Chapter</p>
            </div>
          </div>

          {/* RIGHT — Selected detail */}
          <div className="flex-1 flex flex-col" style={{ background: '#fcfbf7' }}>

            {/* Content row */}
            <div className="flex flex-col md:flex-row flex-1">

              {/* Text */}
              <div className="flex-1 p-6 md:p-8">
                <h4 className="font-comic text-5xl md:text-6xl leading-tight uppercase text-ink mb-2">
                  {selected?.role}
                </h4>
                <p className="font-sans font-extrabold text-lg text-gray-700 mb-5">
                  {selected?.organization}
                </p>
                <p className={`font-sans text-base leading-relaxed italic border-l-4 pl-4 ${isSideQ ? 'border-[#a78bfa] text-gray-800' : isCurrent ? 'border-secondary text-gray-700' : 'border-ink/20 text-gray-700'}`}>
                  {selLog}
                </p>
              </div>

              {/* Badge + sketch + XP */}
              <div className="w-full md:w-56 border-t-4 md:border-t-0 md:border-l-4 border-ink flex flex-col items-center justify-center gap-5 p-6">
                <div className="w-16 h-16">
                  <SelBadge glow={isCurrent} />
                </div>
                <div className="w-full opacity-65">
                  <SelSketch />
                </div>
                {isCurrent && (
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
                )}
              </div>
            </div>
          </div>
        </div>

          </div>{/* end screen inner */}
        </div>{/* end screen bezel */}

        {/* ── Bottom controls ── */}
        <div className="flex items-center justify-between mt-4 px-2">

          {/* D-pad */}
          <div style={{ position: 'relative', width: '64px', height: '64px', flexShrink: 0 }}>
            {[
              { top: 0,    left: '33%', right: '33%', bottom: '67%', br: '4px 4px 0 0' },
              { bottom: 0, left: '33%', right: '33%', top: '67%',    br: '0 0 4px 4px' },
              { left: 0,   top: '33%',  bottom: '33%', right: '67%', br: '4px 0 0 4px' },
              { right: 0,  top: '33%',  bottom: '33%', left: '67%',  br: '0 4px 4px 0' },
              { top: '33%',left: '33%', right: '33%',  bottom: '33%',br: '0' },
            ].map((s, i) => (
              <div key={i} style={{ position: 'absolute', ...s, background: '#1a1a1a', borderRadius: s.br, boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.05)' }} />
            ))}
          </div>

          {/* Select / Start */}
          <div className="flex gap-2">
            {['SELECT','START'].map(l => (
              <div key={l} style={{ background: '#1a1a1a', borderRadius: '20px', padding: '5px 12px', border: '2px solid #333' }}>
                <span style={{ ...px, fontSize: '6px', color: '#666' }}>{l}</span>
              </div>
            ))}
          </div>

          {/* A / B buttons */}
          <div className="flex items-center gap-3">
            {[{ label: 'B', bg: '#fbbf24', color: '#1a1a1a' }, { label: 'A', bg: '#cc0000', color: '#fff' }].map(b => (
              <div key={b.label} style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: b.bg, border: '3px solid #1a1a1a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 3px 0 rgba(0,0,0,0.4)',
              }}>
                <span className="font-comic text-sm" style={{ color: b.color }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>{/* end Pokédex body */}

    </div>
  );
};

export default CareerTimeline;
