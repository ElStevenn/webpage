'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import BackgroundFX from './BackgroundFX'

const roles = [
  'DevOps Engineer',
  'Backend Architect',
  'Security Builder',
  'Automation Nerd'
]

/* Componente de palabras rotando */
function RotatingWords() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % roles.length)
    }, 2600)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative h-7 md:h-8 overflow-hidden select-none">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
            initial={{ y: '60%', opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: '-60%', opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-block text-lg md:text-xl font-medium bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement | null>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const sx = useSpring(rx, { stiffness: 120, damping: 18 })
  const sy = useSpring(ry, { stiffness: 120, damping: 18 })

  const handleMouse = useCallback((e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    rx.set(-(y - r.height / 2) / 35)
    ry.set((x - r.width / 2) / 35)
  }, [rx, ry])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener('mousemove', handleMouse)
    const leave = () => { rx.set(0); ry.set(0) }
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', handleMouse)
      el.removeEventListener('mouseleave', leave)
    }
  }, [handleMouse, rx, ry])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: 'easeOut' } }
  }

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 text-center overflow-hidden"
    >
      <BackgroundFX />

      <motion.div
        style={{ rotateX: sx, rotateY: sy }}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative max-w-4xl"
      >
        <motion.h1
          variants={item}
          className="group relative text-[2.9rem] leading-[1.05] md:text-6xl font-extrabold tracking-tight"
        >
          <span className="bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent">
            Hi, I&apos;m Pau
          </span>
          <span className="block mt-2 text-base md:text-lg font-normal text-white/55">
            <RotatingWords />
          </span>
          <span
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-3 h-[3px] w-0 group-hover:w-3/4 rounded-full
             bg-gradient-to-r from-brand-blue/0 via-brand-blue/70 to-brand-coral/0 transition-all duration-700"
          />
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 text-[1.05rem] md:text-xl leading-relaxed mx-auto max-w-2xl text-white/70 relative tagline-mask"
        >
          Engineering resilient cloud platforms, automated delivery pipelines & zero‑trust infrastructure
          with a relentless focus on performance, reliability & privacy.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col sm:flex-row gap-5 justify-center"
        >
          <a
            href="#projects"
            className="relative group px-9 py-3 rounded-md font-semibold text-sm text-white
             bg-gradient-to-br from-brand-blue via-[#4e8edb] to-brand-coral/80
             shadow-[0_0_0_0_rgba(88,166,255,0.0)]
             hover:shadow-[0_0_35px_-8px_rgba(88,166,255,0.55)]
             transition-all duration-400 outline-none focus:ring-2 focus:ring-brand-blue/60"
          >
            <span className="relative z-10">Explore My Projects</span>
            <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition
              bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)] mix-blend-overlay" />
          </a>

          <a
            href="#contact"
            className="relative px-9 py-3 rounded-md font-semibold text-sm
             border border-white/15 text-white/80 backdrop-blur-md
             bg-white/5 hover:bg-white/10 hover:text-white
             transition-all duration-300 focus:ring-2 focus:ring-brand-blue/50"
          >
            Contact Me
            <span className="absolute inset-0 rounded-md pointer-events-none border border-white/5" />
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-9 flex flex-wrap items-center justify-center gap-4 text-[0.8rem] tracking-wide font-medium text-white/55"
        >
          <span className="inline-flex items-center gap-1">
            <span className="text-brand-blue/90">♟</span> Chess Enthusiast
          </span>
          <span className="w-px h-4 bg-white/15" />
          <span className="text-brand-coral/80">Privacy Focused</span>
          <span className="w-px h-4 bg-white/15" />
          <span className="font-mono text-[0.75rem] text-white/40 flex items-center gap-1">
            <span className="text-brand-blue/70">$</span> build <span className="animate-pulse">▊</span>
          </span>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-2xl animate-bounce select-none">
        ↓
      </div>

      {/* CSS para efecto reveal del párrafo */}
      <style jsx>{`
        .tagline-mask {
          position: relative;
        }
        .tagline-mask::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #0d1117 0%, transparent 12%, transparent 88%, #0d1117 100%);
          pointer-events: none;
          mix-blend-mode: multiply;
          opacity: .35;
        }
      `}</style>
    </section>
  )
}
