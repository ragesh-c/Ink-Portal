import React, { useRef, useState, MouseEvent } from 'react';

interface MagneticTiltProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // How much it tilts in degrees
  disabled?: boolean;
}

const MagneticTilt: React.FC<MagneticTiltProps> = ({ 
  children, 
  className = '', 
  intensity = 5,
  disabled = false
}) => {
  const [transformStyle, setTransformStyle] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const xPct = x / width;
    const yPct = y / height;

    // Calculate rotation: 
    // xPct 0 -> -intensity, 1 -> +intensity
    // We invert yPct because moving mouse down (higher Y) should tilt the top away (negative RotateX) usually, 
    // but in CSS rotateX positive brings bottom out. Let's aim for "look at mouse".
    
    // Look at mouse logic:
    // Mouse Left (x < 0.5) -> rotateY should be negative (left side goes down/back) -> actually negative rotateY tilts left side back.
    const rotateY = (xPct - 0.5) * intensity * 2; 
    
    // Mouse Top (y < 0.5) -> rotateX should be positive (top goes back/down)? 
    // Actually rotateX positive brings bottom forward, top back. So if mouse is at top, we want top to go back?
    // Let's try standard magnetic feel: mouse pushes the surface down.
    // Mouse Top -> Top goes down (RotateX Positive).
    const rotateX = (0.5 - yPct) * intensity * 2; 

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export default MagneticTilt;