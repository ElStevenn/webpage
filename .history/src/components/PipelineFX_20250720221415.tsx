'use client'
import { useRef, useEffect } from 'react'

export default function PipelineFX() {
  const ref = useRef<HTMLDivElement|null>(null)

  useEffect(()=>{
    const el = ref.current
    if(!el) return
    const spawn = () => {
      const chip = document.createElement('div')
      chip.className = 'pipeline-chip'
      const lane = Math.floor(Math.random()*6)
      chip.style.left = `calc(${lane * 16 + 8}%)`
      chip.style.animationDuration = `${5 + Math.random()*4}s`
      chip.style.animationDelay = `-${Math.random()*4}s`
      el.appendChild(chip)
      // limpiar chips antiguos
      if (el.childNodes.length > 80) {
        el.removeChild(el.firstChild as Node)
      }
    }
    const id = setInterval(spawn, 350)
    return ()=>clearInterval(id)
  },[])

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      <style jsx>{`
        .pipeline-chip {
          position:absolute;
          top:-5%;
          width:14px;
          height:14px;
          border-radius:4px;
          background:
            linear-gradient(135deg, rgba(88,166,255,0.85), rgba(255,255,255,0.1));
          box-shadow:0 0 12px -2px rgba(88,166,255,0.6);
          animation: chip-fall linear infinite;
          opacity:0;
        }
        .pipeline-chip::after {
          content:'';
          position:absolute;
          inset:0;
          border-radius:inherit;
          background:radial-gradient(circle at 30% 30%,rgba(255,255,255,0.6),transparent 60%);
          mix-blend-mode:overlay;
          opacity:.6;
        }
        @keyframes chip-fall {
          0% { transform:translateY(0); opacity:0; }
          8% { opacity:1; }
          92% { opacity:1; }
          100% { transform:translateY(120vh); opacity:0; }
        }
      `}</style>
    </div>
  )
}
