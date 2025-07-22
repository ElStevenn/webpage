'use client'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import BackgroundFX from './BackgroundFX'

export default function HeroSection() {
  const ref = useRef<HTMLDivElement | null>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const sx = useSpring(rx, { stiffness: 120, damping: 20 })
  const sy = useSpring(ry, { stiffness: 120, damping: 20 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      rx.set(-(y - r.height / 2) / 40)
      ry.set((x - r.width / 2) / 40)
    }
    const leave = () => { rx.set(0); ry.set(0) }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [rx, ry])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 text-center overflow-hidden"
    >
      <BackgroundFX enableNebula />

      <motion.div style={{ rotateX: sx, rotateY: sy }} className="relative max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(88,166,255,0.25)]"
        >
          Hi, I&apos;m Pau
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed"
        >
          I build secure & scalable infrastructure and backend systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-md font-semibold text-sm bg-brand-blue hover:bg-brand-coral hover:scale-105 active:scale-95 transition shadow-lg shadow-brand-blue/30"
          >
            Explore My Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-md font-semibold text-sm border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-black hover:scale-105 active:scale-95 transition"
          >
            Contact Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-8 flex items-center justify-center gap-3 text-sm text-brand-coral"
        >
          <span className="inline-flex items-center gap-2">
            <span className="text-base">♟</span> Chess Enthusiast
          </span>
          <span className="text-white/30">|</span>
          <span>Privacy Focused</span>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-2xl animate-bounce">
        ↓
      </div>
    </section>
  )
}
