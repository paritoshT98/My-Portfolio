import React from 'react';
import { ArrowUpRight, MessageCircle, FileDown } from 'lucide-react';

export default function HeroContent({ onOpenContact, onOpenWork }) {
  return (
    <div className="absolute bottom-8 left-6 sm:bottom-12 sm:left-12 md:bottom-16 md:left-16 z-30 pointer-events-auto max-w-sm select-none">
      {/* "Hi, I'm" subtitle */}
      <div className="text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase text-white/80 mb-1 pl-1">
        Hi, I'm
      </div>

      {/* Elegant cursive name */}
      <h1 className="font-cursive text-7xl sm:text-8xl md:text-9xl font-bold text-white leading-none tracking-normal drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)] -ml-2 mb-2">
        Paritosh
      </h1>

      {/* Role Tagline */}
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200/90 mb-3 pl-1">
        Cloud Data & Big Data Engineer • AWS
      </div>

      {/* Compact 3-line bio based on Paritosh Thakur's resume */}
      <p className="text-sm text-white/85 font-normal leading-relaxed max-w-[340px] mb-7 text-shadow-subtle pl-1">
        7+ years architecting enterprise ETL frameworks, distributed PySpark pipelines, and cloud data infrastructures at scale.
      </p>

      {/* Two stylish white pill buttons */}
      <div className="flex items-center space-x-3 sm:space-x-4 pl-1">
        {/* Solid white button with download/arrow icon */}
        <a
          href="/ParitoshThakur_Resume_NEW.docx"
          download="ParitoshThakur_Resume_NEW.docx"
          data-hover="true"
          className="group relative inline-flex items-center justify-center space-x-2 px-5 sm:px-6 py-3 rounded-full bg-white text-slate-900 text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_10px_25px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95"
          title="Download Paritosh Thakur Resume"
        >
          <span>Resume</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        {/* Frosted glass / white border button */}
        <button
          onClick={onOpenContact}
          data-hover="true"
          className="group relative inline-flex items-center justify-center space-x-2 px-5 sm:px-6 py-3 rounded-full frosted-glass text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-105 active:scale-95"
        >
          <span>Let's Talk</span>
          <MessageCircle className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
}
