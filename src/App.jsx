import React, { useState } from 'react';
import CharacterCanvas from './components/CharacterCanvas';
import Header from './components/Header';
import HeroContent from './components/HeroContent';
import CustomCursor from './components/CustomCursor';
import TelemetryHUD from './components/TelemetryHUD';
import InfoModal from './components/InfoModal';

export default function App() {
  const [telemetry, setTelemetry] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#729ec1] select-none">
      {/* 
        Ultra-Smooth 60 FPS Character Canvas
        Covers full viewport (100vw, 100vh)
        No CSS 3D transforms, 1 crisp frame at 100% opacity
      */}
      <CharacterCanvas onTelemetryUpdate={setTelemetry} />

      {/* Subtle luxury cinema-grade edge vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(15, 35, 55, 0.25) 100%)',
        }}
      />

      {/* Floating Frosted-Glass Header */}
      <Header
        activeModal={activeModal}
        onSelectTab={(tab) => setActiveModal(activeModal === tab ? null : tab)}
      />

      {/* Hero Typography & CTA Buttons (Bottom-Left) */}
      <HeroContent
        onOpenContact={() => setActiveModal('CONTACT')}
        onOpenWork={() => setActiveModal('WORK')}
      />

      {/* Real-time Tracking HUD (Bottom-Right) */}
      <TelemetryHUD telemetry={telemetry} />

      {/* Interactive Modal for [WORK], [ABOUT], [CONTACT] */}
      <InfoModal
        activeTab={activeModal}
        onClose={() => setActiveModal(null)}
      />

      {/* Custom Glowing Magnetic Cursor */}
      <CustomCursor />
    </main>
  );
}
