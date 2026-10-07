import React from 'react';

export default function Header({ activeModal, onSelectTab }) {
  const navItems = ['WORK', 'ABOUT', 'CONTACT'];

  return (
    <header className="fixed top-5 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 pointer-events-none">
      {/* Left status / availability badge */}
      <div className="hidden md:flex items-center space-x-2 py-1.5 px-3.5 rounded-full frosted-glass-subtle pointer-events-auto">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
        </span>
        <span className="text-[11px] font-medium tracking-wider text-white/90 uppercase">
          Cloud Support Engineer @ AWS
        </span>
      </div>

      {/* Centered Floating Frosted-Glass Navigation Pill */}
      <nav className="mx-auto flex items-center p-1 rounded-full frosted-glass pointer-events-auto shadow-2xl transition-all duration-300">
        {navItems.map((item) => {
          const isActive = activeModal === item;
          return (
            <button
              key={item}
              onClick={() => onSelectTab(item)}
              data-hover="true"
              className={`relative px-5 py-2 text-xs font-semibold tracking-[0.2em] rounded-full transition-all duration-300 ${
                isActive
                  ? 'text-white bg-white/25 shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              [{item}]
            </button>
          );
        })}
      </nav>

      {/* Right Monogram / Luxury Accent */}
      <div className="hidden md:flex items-center space-x-3 pointer-events-auto">
        <div className="text-right">
          <div className="text-xs font-semibold tracking-wider text-white">PARITOSH THAKUR</div>
          <div className="text-[10px] text-sky-200/80 tracking-widest uppercase">Big Data Architect</div>
        </div>
      </div>
    </header>
  );
}
