'use client'
import { useEffect, useRef } from 'react'

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const starsRef = useRef<any[]>([])
  const rafRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    const numStars = 140
    starsRef.current = Array.from({ length: numStars }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.3 + 0.2,
      speed: Math.random() * 0.5 + 0.2,
      alpha: Math.random() * 0.6 + 0.2
    }))

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      for (const s of starsRef.current) {
        s.y -= s.speed
        if (s.y < 0) {
          s.y = h
          s.x = Math.random() * w
        }
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`
        ctx.fill()
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10"
    />
  )
}
