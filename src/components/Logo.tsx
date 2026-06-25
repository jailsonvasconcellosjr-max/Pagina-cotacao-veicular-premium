import React from 'react';

interface LogoProps {
  lightTheme?: boolean; // If true, rendering with white text (e.g. inside dark footer)
  sizeMultiplier?: number;
}

export default function Logo({ lightTheme = false, sizeMultiplier = 1 }: LogoProps) {
  const textColor = lightTheme ? 'text-white' : 'text-brand-blue-dark';
  const subtextColor = lightTheme ? 'text-slate-300' : 'text-brand-blue/75';

  return (
    <div className="flex items-center gap-2 select-none" style={{ transform: `scale(${sizeMultiplier})`, transformOrigin: 'left center' }}>
      
      {/* Text Branding Details */}
      <div className="flex flex-col">
        {/* "Premium" Calligraphy styling in cursive font from Index.css */}
        <span 
          className={`font-brand italic font-semibold ${textColor} text-3xl sm:text-4xl leading-none`}
          style={{ letterSpacing: '-0.02em', textShadow: lightTheme ? '0 1px 2px rgba(0,0,0,0.1)' : 'none' }}
        >
          Premium
        </span>
        
        {/* Support subtitle with stars */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-widest ${subtextColor}`}>
            CLUBE DE BENEFÍCIOS
          </span>
          
          {/* Orange stars badge exactly matching the logo in the attachment */}
          <span className="flex items-center text-[7px] sm:text-[8px] text-brand-orange">
            ★ ★ ★ ★ ★
          </span>
        </div>
      </div>

      {/* Decorative Brand Orange Pill Symbol with White Chevron */}
      <div className="flex items-center shrink-0 ml-1">
        <div 
          className="w-8 h-8 sm:w-11 sm:h-9 bg-gradient-to-br from-brand-orange to-brand-orange-light rounded-[12px] sm:rounded-[15px] flex items-center justify-center shadow-sm relative overflow-hidden"
          style={{
            transform: 'skewX(-8deg)',
            boxShadow: '0 4px 12px rgba(249, 90, 30, 0.25)'
          }}
        >
          {/* Outer glossy layer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
          
          {/* Chevron mark scaled down inside */}
          <div style={{ transform: 'skewX(8deg)' }} className="flex items-center justify-center">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="w-4 h-4 sm:w-5.5 sm:h-5.5 text-white"
              stroke="currentColor" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
}
