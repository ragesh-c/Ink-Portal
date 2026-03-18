import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  width?: 'full' | 'auto';
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = "",
  delay = 0,
  width = 'full'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Compute rotation once at construction time using a ref — avoids an extra
  // setState/re-render cycle that was previously triggered in useEffect.
  const rotationRef = useRef<{ start: number; mid: number } | null>(null);
  if (rotationRef.current === null) {
    // Generate random rotation values for a natural "tossed" look
    // Start rotation: between -3 and 3 degrees
    const startRot = (Math.random() * 6) - 3;
    // Mid bounce rotation: opposite small rotation
    const midRot = -(startRot * 0.3);
    rotationRef.current = { start: startRot, mid: midRot };
  }
  const rotation = rotationRef.current;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before fully in view
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Use CSS custom properties to pass dynamic rotation to the animation keyframes
  const style = {
    animationDelay: `${delay}ms`,
    '--reveal-rotate-start': `${rotation.start}deg`,
    '--reveal-rotate-mid': `${rotation.mid}deg`,
  } as React.CSSProperties;

  return (
    <div 
      ref={ref} 
      className={`${width === 'full' ? 'w-full' : 'inline-block'} ${className} ${isVisible ? 'animate-comic-pop' : 'opacity-0'}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;