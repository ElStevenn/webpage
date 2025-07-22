'use client'
import { useEffect, useRef } from 'react'

interface Props {
  bubbles?: number      // cantidad de burbujas
  speed?: number        // multiplicador de velocidad
  className?: string
}

interface Bubble {
  x: number
  y: number
  r: number
  baseR: number
  vx: number
  vy: number
  drift: number
  hueShift: number
}

export default function BackgroundFX({
  bubbles = 26,
  speed = 1,
  className = ''
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number>()
  const bubbleRef = useRef<Bubble[]>([])
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = window.innerWidth
    let h = window.innerHeight
    const dpr = window.devicePixelRatio || 1
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    ctx.scale(dpr, dpr)

    // Config burbujas
    const createBubbles = () => {
      bubbleRef.current = Array.from({ length: bubbles }, () => {
        const r = rand(90, 300) * 0.5  // radios grandes, luego desenfoque
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          baseR: r,
            vx: rand(-0.05, 0.05) * speed,
            vy: rand(-0.04, 0.04) * speed,
          drift: rand(0.4, 1.2),
          hueShift: Math.random()
        }
      })
    }

    const rand = (a: number, b: number) => a + Math.random() * (b - a)
    createBubbles()

    const draw = () => {
      timeRef.current += 0.5
      const t = timeRef.current

      ctx.clearRect(0, 0, w, h)

      // Fondo oscuro muy suave añadido al canvas (extra depth)
      const grad = ctx.createLinearGradient(0, 0, w, h)
      grad.addColorStop(0, '#0c121a')
      grad.addColorStop(1, '#101a25')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // Burbujas
      for (const b of bubbleRef.current) {
        b.x += b.vx + Math.sin((t + b.drift) * 0.003) * 0.08 * b.drift
        b.y += b.vy + Math.cos((t + b.drift) * 0.003) * 0.08 * b.drift

        // wrap edges
        if (b.x < -b.r) b.x = w + b.r
        if (b.x > w + b.r) b.x = -b.r
        if (b.y < -b.r) b.y = h + b.r
        if (b.y > h + b.r) b.y = -b.r

        // ligera respiración
        b.r = b.baseR * (0.9 + Math.sin(t * 0.002 + b.drift) * 0.07)

        const cx = b.x
        const cy = b.y
        const radial = ctx.createRadialGradient(
          cx - b.r * 0.3,
          cy - b.r * 0.35,
          b.r * 0.1,
          cx,
          cy,
          b.r
        )

        // Color base azulado + shift
        const c1 = `hsla(${210 + b.hueShift * 10}, 70%, 55%, 0.18)`
        const c2 = `hsla(${210 + b.hueShift * 10}, 70%, 45%, 0.04)`
        radial.addColorStop(0, c1)
        radial.addColorStop(1, c2)

        ctx.beginPath()
        ctx.fillStyle = radial
        ctx.globalCompositeOperation = 'lighter'
        ctx.arc(cx, cy, b.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // restablecer composite
      ctx.globalCompositeOperation = 'source-over'

      // Vignette suave
      const vg = ctx.createRadialGradient(
        w * 0.5, h * 0.55, w * 0.15,
        w * 0.5, h * 0.5, w * 0.8
      )
      vg.addColorStop(0, 'rgba(0,0,0,0)')
      vg.addColorStop(1, 'rgba(0,0,0,0.55)')
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, w, h)

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      w = window.innerWidth
      h = window.innerHeight
      const d = window.devicePixelRatio || 1
      canvas.width = w * d
      canvas.height = h * d
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(d, d)
      createBubbles()
    }

    window.addEventListener('resize', onResize)

    const vis = () => {
      if (document.hidden && rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      } else if (!document.hidden) {
        draw()
      }
    }
    document.addEventListener('visibilitychange', vis)

    return () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', vis)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [bubbles, speed])

  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <div className="bg-base-gradient" />
      <div className="hero-halo" />
      <div className="bg-grain" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-[0.55]"
      />
    </div>
  )
}
