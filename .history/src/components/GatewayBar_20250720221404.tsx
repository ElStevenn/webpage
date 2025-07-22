'use client'
export default function GatewayBar() {
  return (
    <div className="relative w-full h-14 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/15 via-white/8 to-brand-coral/15 backdrop-blur-sm border-t border-white/10" />
      {/* Pulsos */}
      <div className="absolute inset-0 opacity-60 mix-blend-screen">
        <div className="animate-pulse-slow absolute top-1/2 -translate-y-1/2 left-[8%] w-3 h-3 rounded-full bg-brand-blue/70 blur-sm" />
        <div className="animate-pulse-slow2 absolute top-1/2 -translate-y-1/2 left-[38%] w-2.5 h-2.5 rounded-full bg-white/60 blur-[2px]" />
        <div className="animate-pulse-slow absolute top-1/2 -translate-y-1/2 left-[65%] w-3 h-3 rounded-full bg-brand-coral/60 blur-sm" />
        <div className="animate-pulse-slow2 absolute top-1/2 -translate-y-1/2 left-[85%] w-2 h-2 rounded-full bg-brand-blue/50 blur-[1px]" />
      </div>
      {/* Requests / packets que avanzan horizontalmente */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_,i)=>(
          <div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-gradient-to-r from-white/40 to-white/5"
            style={{
              width: Math.random()*70 + 40,
              left: `${Math.random()*100}%`,
              animation: `packet-move ${5 + Math.random()*4}s linear infinite`,
              animationDelay: `-${Math.random()*6}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes packet-move {
          0% { transform: translateY(-50%) translateX(-120%); opacity:0; }
          10% { opacity:1; }
          90% { opacity:1; }
          100% { transform: translateY(-50%) translateX(220%); opacity:0; }
        }
        .animate-pulse-slow { animation: pulseGlow 3.2s ease-in-out infinite; }
        .animate-pulse-slow2 { animation: pulseGlow 4.5s ease-in-out infinite 1s; }
        @keyframes pulseGlow {
          0%,100% { opacity:.25; transform:scale(.6); }
          50% { opacity:.9; transform:scale(1); }
        }
      `}</style>
    </div>
  )
}
