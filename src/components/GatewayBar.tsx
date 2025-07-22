'use client'

export default function GatewayBar() {
  return (
    <div className="gateway-bar absolute bottom-0 left-0 right-0 h-14 overflow-hidden z-10 select-none">
      {/* Base semi-transparente */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/15 via-white/8 to-brand-coral/15 backdrop-blur-sm border-t border-white/10" />

      {/* Pulsos estacionarios */}
      <div className="absolute inset-0 opacity-60 mix-blend-screen">
        <div className="pulse-a absolute top-1/2 -translate-y-1/2 left-[8%]" />
        <div className="pulse-b absolute top-1/2 -translate-y-1/2 left-[38%]" />
        <div className="pulse-a absolute top-1/2 -translate-y-1/2 left-[65%]" />
        <div className="pulse-b absolute top-1/2 -translate-y-1/2 left-[85%]" />
      </div>

      {/* “Packets” (requests) que cruzan horizontalmente */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(9)].map((_, i) => {
          const width = Math.random() * 70 + 40
          const top = 20 + Math.random() * 50
          return (
            <div
              key={i}
              className="packet absolute h-2 rounded-full bg-gradient-to-r from-white/50 to-white/5"
              style={{
                width,
                top: `${top}%`,
                animationDuration: `${5 + Math.random() * 4}s`,
                animationDelay: `-${Math.random() * 6}s`,
              }}
            />
          )
        })}
      </div>

      <style jsx>{`
        .pulse-a, .pulse-b {
          border-radius: 9999px;
          background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(255,255,255,0));
          filter: blur(2px);
          opacity: .25;
        }
        .pulse-a { width:14px; height:14px; animation: pulseGlow 3.2s ease-in-out infinite; }
        .pulse-b { width:10px; height:10px; animation: pulseGlow 4.6s ease-in-out infinite 1s; }

        @keyframes pulseGlow {
          0%,100% { transform:scale(.55); opacity:.25; }
          50% { transform:scale(1); opacity:.9; }
        }

        .packet {
          animation: packet-move linear infinite;
          opacity:0;
        }
        @keyframes packet-move {
          0% { transform:translateX(-130%); opacity:0; }
          8% { opacity:1; }
          92% { opacity:1; }
          100% { transform:translateX(230%); opacity:0; }
        }
      `}</style>
    </div>
  )
}
