
import React from 'react';

export const COLORS = {
  BRAND_NAVY: '#000033',
  BRAND_NEON_GREEN: '#00cc44',
  LIGHT_BG: '#ffffff',
  LIGHT_TEXT: '#000033',
  DARK_BG: '#000033',
  DARK_TEXT: '#ffffff',
};

export const LogoOficina = ({ theme, className = "h-16" }: { theme: 'dark' | 'light', className?: string }) => {
  const mainColor = theme === 'light' ? COLORS.BRAND_NAVY : '#FFFFFF';
  const greenAccent = COLORS.BRAND_NEON_GREEN;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Gear Icon with Circuits */}
      <svg viewBox="0 0 100 100" className="h-full w-auto drop-shadow-sm">
        <path 
          d="M45,15 L55,15 L58,25 A35,35 0 0,1 65,28 L74,20 L80,26 L72,35 A35,35 0 0,1 75,42 L85,45 L85,55 L75,58 A35,35 0 0,1 72,65 L80,74 L74,80 L65,72 A35,35 0 0,1 58,75 L55,85 L45,85 L42,75 A35,35 0 0,1 35,72 L26,80 L20,74 L28,65 A35,35 0 0,1 25,58 L15,55 L15,45 L25,42 A35,35 0 0,1 28,35 L20,26 L26,20 L35,28 A35,35 0 0,1 42,25 Z" 
          fill={mainColor} 
        />
        <circle cx="50" cy="50" r="18" fill={mainColor} />
        {/* Neon Green Circuit Path */}
        <path 
          d="M30,70 L50,50 L75,25" 
          stroke={greenAccent} 
          strokeWidth="6" 
          strokeLinecap="round" 
        />
        <circle cx="50" cy="50" r="8" fill={greenAccent} />
        <circle cx="75" cy="25" r="5" fill={greenAccent} />
        {/* Extra Circuit Nodes */}
        <circle cx="65" cy="15" r="3" fill={mainColor} />
        <circle cx="80" cy="45" r="3" fill={mainColor} />
        <circle cx="80" cy="65" r="3" fill={mainColor} />
      </svg>
      
      {/* Brand Text */}
      <div className="flex flex-col justify-center leading-none">
        <span style={{ color: mainColor }} className="text-2xl font-[900] tracking-tight uppercase">Oficina do</span>
        <span style={{ color: mainColor }} className="text-4xl font-[900] tracking-tighter uppercase -mt-1">Futuro</span>
        <div className="flex flex-col mt-1">
          <span style={{ color: greenAccent }} className="text-[10px] font-bold uppercase tracking-wide">Cultivando Talentos</span>
          <span style={{ color: greenAccent }} className="text-[10px] font-bold uppercase tracking-wide -mt-1">Construindo Futuros</span>
        </div>
      </div>
    </div>
  );
};
