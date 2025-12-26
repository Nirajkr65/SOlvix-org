//ANIMATION PAGE

import React, { useEffect, useState } from "react";

const SplashScreen = ({ onFinish }) => {
  const [animate, setAnimate] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimate(true), 100);
    
    // Trigger glitches randomly
    const glitchInterval = setInterval(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 200);
    }, 2500);

    const timer2 = setTimeout(() => {
        onFinish();
    }, 4500); 

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(glitchInterval);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#030303] flex items-center justify-center overflow-hidden font-mono">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 perspective-2000 pointer-events-none">
         <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] transition-opacity duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`} />
         
         {/* Moving Scanline */}
         <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.5)] animate-scanline" />
      </div>

      {/* Main 3D Container */}
      <div className="relative perspective-1000 z-10">
        <div className={`transform-style-3d transition-all duration-[1200ms] cubic-bezier(0.23, 1, 0.32, 1) flex flex-col items-center 
            ${animate ? 'rotate-x-0 scale-100 opacity-100 translate-z-0 blur-none' : 'rotate-x-90 scale-50 opacity-0 translate-z-[-500px] blur-sm'}
            ${glitch ? 'translate-x-1 skew-x-2' : ''}
        `}>
            
            {/* Hexagon Decoration */}
            <div className={`absolute -top-32 w-24 h-24 border border-emerald-500/20 rotate-45 transition-all duration-1000 delay-500 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <div className="absolute inset-2 border border-emerald-500/40" />
            </div>

            {/* Main Text Layer */}
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 relative">
                <span className="relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">SOLVIX</span>
                
                {/* Glitch Layers */}
                <span className={`absolute inset-0 text-emerald-500 mix-blend-screen opacity-50 z-0 animate-pulse ${glitch ? 'translate-x-[2px] -translate-y-[2px]' : 'translate-x-0'}`}>SOLVIX</span>
                <span className={`absolute inset-0 text-blue-500 mix-blend-screen opacity-50 z-0 animate-pulse delay-75 ${glitch ? '-translate-x-[2px] translate-y-[2px]' : 'translate-x-0'}`}>SOLVIX</span>
                
                {/* Reflection */}
                <span className="absolute top-full left-0 text-white/5 blur-sm transform scale-y-[-0.5] mask-linear-fade origin-top">SOLVIX</span>
            </h1>

            {/* Tagline / Loader */}
            <div className={`mt-12 flex items-center gap-4 transition-all duration-1000 delay-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="h-px w-12 bg-emerald-500/50" />
                <div className="text-emerald-500 text-xs tracking-[0.3em] font-bold uppercase typing-effect whitespace-nowrap overflow-hidden border-r-2 border-emerald-500/50">
                    Loading.....
                </div>
                <div className="h-px w-12 bg-emerald-500/50" />
            </div>

        </div>
      </div>

      <style>{`
        .perspective-2000 { perspective: 2000px; }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .mask-linear-fade { mask-image: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent); }
        
        @keyframes scanline {
            0% { top: -10%; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
        }
        .animate-scanline {
            animation: scanline 3s linear infinite;
        }

        .typing-effect {
            animation: typing 3s steps(20), blink 0.5s step-end infinite alternate;
            white-space: nowrap;
            overflow: hidden;
            border-right: 2px solid rgba(16, 185, 129, 0.5);
        }
        
        @keyframes typing {
            from { width: 0; }
            to { width: 140px; } /* Adjust based on text length */
        }
        
        @keyframes blink {
            50% { border-color: transparent; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
