import { useEffect, useRef } from 'react';

interface LaunchScreenProps {
  visible: boolean;
  onDismiss: () => void;
}

export function LaunchScreen({ visible, onDismiss }: LaunchScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visible) onDismiss();
    }, 5000);
    return () => clearTimeout(timer);
  }, [visible, onDismiss]);

  if (!visible) return null;

  const dots = Array.from({ length: 60 }, (_, i) => {
    const size = Math.random() * 15 + 3;
    return (
      <div
        key={i}
        className="absolute rounded-full bg-black animate-float-dot"
        style={{
          width: size,
          height: size,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.12 + 0.03,
          animationDelay: `${Math.random() * 20}s`,
          animationDuration: `${Math.random() * 15 + 10}s`,
        }}
      />
    );
  });

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 bg-[#f2f2f2] flex flex-col items-center justify-center z-[10000] cursor-pointer transition-all duration-800 ${
        !visible ? 'launch-exit' : ''
      }`}
      onClick={onDismiss}
    >
      {/* Scattered Dots */}
      <div className="absolute inset-0">{dots}</div>

      {/* Top Text */}
      <div className="font-mono text-[1.1rem] text-[#999] tracking-[3px] uppercase mb-15 z-2 animate-pulse-text">
        Tap to launch
      </div>

      {/* Rocket Icon */}
      <div className="z-2 relative animate-hover-rocket">
        <svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg" className="w-20 h-30">
          <path d="M40 5 C40 5 60 25 60 65 L60 85 L50 95 L50 80 L30 80 L30 95 L20 85 L20 65 C20 25 40 5 40 5Z" fill="#1a1a1a"/>
          <circle cx="40" cy="45" r="8" fill="#f2f2f2"/>
          <circle cx="40" cy="45" r="5" fill="#d0d0d0"/>
          <path d="M20 65 L10 85 L20 80Z" fill="#1a1a1a"/>
          <path d="M60 65 L70 85 L60 80Z" fill="#1a1a1a"/>
          <path d="M32 95 L40 115 L48 95" fill="#888" opacity="0.5">
            <animate attributeName="d" values="M32 95 L40 115 L48 95;M34 95 L40 110 L46 95;M32 95 L40 115 L48 95" dur="0.5s" repeatCount="indefinite"/>
          </path>
        </svg>
      </div>

      {/* Title */}
      <div className="font-mono text-[2rem] font-bold text-[#1a1a1a] tracking-[8px] mt-10 z-2 max-sm:text-[1.3rem] max-sm:tracking-[4px]">
        GHOSTNET
      </div>
      <div className="font-mono text-[0.75rem] text-[#999] tracking-[4px] mt-2.5 z-2">
        Dead Internet Detector
      </div>
    </div>
  );
}
