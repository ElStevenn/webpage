'use client'
import { useEffect, useRef } from 'react'

export default function MouseParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<any[]>([])
  const rafRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = canvas.width = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)

    const emit = (x:number, y:number) => {
      for (let i = 0; i < 5; i++) {
        particlesRef.current.push({
          x, y,
          vx: (Math.random() - 0.5) * 1.8,
            vy: (Math.random() - 0.5) * 1.8,
            size: Math.random() * 3 + 1,
            life: 55
        })
      }
    }

    const update = () => {
      ctx.clearRect(0, 0, w, h)
      particlesRef.current = particlesRef.current.filter(p => p.life > 0)
      for (const p of particlesRef.current) {
        p.x += p.vx
        p.y += p.vy
        p.life--
        ctx.globalAlpha = p.life / 55
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = '#58A6FF'
        ctx.fill()
      }
      rafRef.current = requestAnimationFrame(update)
    }
    update()

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      emit(e.clientX - rect.left, e.clientY - rect.top)
    }
    canvas.parentElement?.addEventListener('mousemove', onMove)

    return () => {
      canvas.parentElement?.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}
