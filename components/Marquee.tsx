import React from 'react';

interface MarqueeProps {
  text: string;
  className?: string;
  repeat?: number;
}

const Marquee: React.FC<MarqueeProps> = ({ text, className = '', repeat = 10 }) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap border-y-4 border-ink py-3 select-none ${className}`}>
      <div className="inline-block animate-marquee will-change-transform">
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="mx-8 font-comic text-2xl uppercase tracking-widest text-ink font-bold inline-flex items-center">
             {text} <span className="text-white text-stroke-ink mx-4 text-3xl">•</span>
          </span>
        ))}
      </div>
      {/* Duplicate for seamless loop */}
      <div className="inline-block animate-marquee will-change-transform" aria-hidden="true">
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="mx-8 font-comic text-2xl uppercase tracking-widest text-ink font-bold inline-flex items-center">
             {text} <span className="text-white text-stroke-ink mx-4 text-3xl">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;