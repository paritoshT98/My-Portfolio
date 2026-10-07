import React, { useState } from 'react';
import { Eye, Compass, Activity, ChevronUp, ChevronDown } from 'lucide-react';

export default function TelemetryHUD({ telemetry }) {
  const [collapsed, setCollapsed] = useState(false);

  if (!telemetry) return null;

  const { angle, frameIndex, inDeadzone } = telemetry;

  // Derive compass label
  const getCompassDirection = (deg) => {
    if (inDeadzone) return 'CENTER (DIRECT)';
    if (deg >= 337.5 || deg < 22.5) return 'RIGHT';
    if (deg >= 22.5 && deg < 67.5) return 'DOWN-RIGHT';
    if (deg >= 67.5 && deg < 112.5) return 'DOWN';
    if (deg >= 112.5 && deg < 157.5) return 'DOWN-LEFT';
    if (deg >= 157.5 && deg < 202.5) return 'LEFT';
    if (deg >= 202.5 && deg < 247.5) return 'UP-LEFT';
    if (deg >= 247.5 && deg < 292.5) return 'UP';
    if (deg >= 292.5 && deg < 337.5) return 'UP-RIGHT';
    return 'TRACKING';
  };

  const directionName = getCompassDirection(angle);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-12 z-30 pointer-events-auto">
      <div className="frosted-glass-subtle rounded-2xl p-3 sm:p-4 text-white shadow-xl transition-all duration-300 min-w-[210px] sm:min-w-[240px]">
        {/* Header bar */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Compass className="w-3.5 h-3.5 text-white/70 animate-spin" style={{ animationDuration: '10s' }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/80">
              GAZE TELEMETRY
            </span>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            data-hover="true"
            className="text-white/50 hover:text-white p-0.5 rounded transition-colors"
          >
            {collapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Content */}
        {!collapsed && (
          <div className="mt-2.5 space-y-2 text-xs">
            {/* Status mode */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-white/60">State</span>
              <span
                className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                  inDeadzone
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                }`}
              >
                <Eye className="w-2.5 h-2.5 mr-1" />
                {inDeadzone ? 'Eye Contact' : 'Tracking'}
              </span>
            </div>

            {/* Direction */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-white/60">Direction</span>
              <span className="font-mono text-white text-[11px] font-medium">
                {directionName}
              </span>
            </div>

            {/* Angle & Frame */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-white/60">Angle / Frame</span>
              <span className="font-mono text-white/90 text-[11px]">
                {angle}° • #{inDeadzone ? 'CTR' : String(frameIndex).padStart(2, '0')}
              </span>
            </div>

            {/* Latency & Frame Rate */}
            <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] text-white/50">
              <span className="flex items-center space-x-1">
                <Activity className="w-3 h-3 text-emerald-400" />
                <span>Zero-Lag Lerp</span>
              </span>
              <span>~35ms • 60 FPS</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
