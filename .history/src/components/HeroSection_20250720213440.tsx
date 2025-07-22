'use client'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Starfield from './Starfield'
import MouseParticles from './MouseParticles'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const rx = useSpring(rotateX, { stiffness: 120, damping: 20 })
  const ry = useSpring(rotateY, { stiffness: 120, damping: 20 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rY = (x - centerX) / 40
      const rX = -(y - centerY) / 40
      rotateX.set(rX)
      rotateY.set(rY)
    }
    const reset = () => {
      rotateX.set(0)
      rotateY.set(0)
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', reset)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', reset)
    }
  }, [rotateX, rotateY])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 text-center overflow-hidden"
    >
      <Starfield />

      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1117] via-[#0D1117]/70 to-[#161B22] pointer-events-none" />

      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        className="relative max-w-3xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[#58A6FF] via-white to-[#F78166] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(88,166,255,0.3)]"
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
            className="px-8 py-3 rounded-md font-semibold text-sm bg-[#58A6FF] hover:bg-[#F78166] hover:scale-105 active:scale-95 transition transform shadow-lg shadow-[#58A6FF]/20"
          >
            Explore My Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-md font-semibold text-sm border border-[#58A6FF] text-[#58A6FF] hover:bg-[#58A6FF] hover:text-black hover:scale-105 active:scale-95 transition"
          >
            Contact Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-8 flex items-center justify-center gap-3 text-sm text-[#F78166]"
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

      <div className="pointer-events-none absolute -inset-24 opacity-50 blur-3xl mix-blend-screen"
           style={{
             background:
               'radial-gradient(circle at 30% 40%, rgba(88,166,255,0.15), transparent 60%), radial-gradient(circle at 70% 60%, rgba(247,129,102,0.18), transparent 65%)'
           }}
      />
    </section>
  )
}
