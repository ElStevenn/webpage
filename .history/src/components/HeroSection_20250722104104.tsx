'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  motion, AnimatePresence, useMotionValue, useSpring,
  useScroll, useTransform
} from 'framer-motion'
import BackgroundFX from './BackgroundFX'

/* ---------- Helpers ---------- */

const roles = ['DevOps Engineer', 'Platform & Reliability', 'Security Automation', 'Cloud Architect']

function RotatingWords() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % roles.length), 3000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative h-7 md:h-8 overflow-hidden select-none">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[i]}
          initial={{ y: '60%', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-60%', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: .55, ease: 'easeOut' }}
          className="inline-block text-lg md:text-xl font-medium bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

/* ---------- Typewriter for CLI commands (flush‑left) ---------- */

function TypeCommand() {
  const cmds = [
    'cat my_portfolio.txt',
    'python3 -m src.main',
    'git push origin main',
    'docker compose up -d',
    'chmod +x deploy.sh'
  ]
  const [cmd, setCmd] = useState(0)
  const [txt, setTxt] = useState('')
  const [del, setDel] = useState(false)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const current = cmds[cmd]

    if (!del) {
      if (txt.length < current.length) {
        t = setTimeout(() => setTxt(current.slice(0, txt.length + 1)), 90)
      } else {
        t = setTimeout(() => setDel(true), 1200)
      }
    } else {
      if (txt.length) {
        t = setTimeout(() => setTxt(current.slice(0, txt.length - 1)), 45)
      } else {
        setDel(false)
        setCmd((cmd + 1) % cmds.length)
      }
    }

    return () => clearTimeout(t)
  }, [txt, del, cmd])

  return (
    <span
      className="relative inline-block text-left whitespace-pre overflow-hidden"
      style={{ width: '25ch' }}  /* keeps badges from jumping */
    >
      {txt}<span className="animate-pulse">▊</span>
    </span>
  )
}

/* ---------- Main ---------- */

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const rotX = useSpring(mvX, { stiffness: 120, damping: 16 })
  const rotY = useSpring(mvY, { stiffness: 120, damping: 16 })

  const handleMouse = useCallback((e: MouseEvent) => {
    const el = sectionRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mvX.set(-(e.clientY - r.top - r.height / 2) / 35)
    mvY.set((e.clientX - r.left - r.width / 2) / 35)
  }, [mvX, mvY])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const out = () => { mvX.set(0); mvY.set(0) }
    el.addEventListener('mousemove', handleMouse)
    el.addEventListener('mouseleave', out)
    return () => {
      el.removeEventListener('mousemove', handleMouse)
      el.removeEventListener('mouseleave', out)
    }
  }, [handleMouse, mvX, mvY])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })

  const bgOpacity     = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.6, 0])
  const contentOpacity= useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const contentScale  = useTransform(scrollYProgress, [0, 0.85], [1, 0.95])
  const contentY      = useTransform(scrollYProgress, [0, 0.85], [0, -40])
  const arrowOpacity  = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 0.4, 0])

  const [pulse, setPulse] = useState(false)
  const onArrowClick = () => {
    if (pulse) return
    setPulse(true)
    const target = document.getElementById('about')
    const start = performance.now()
    const from = window.scrollY
    const to = target ? target.getBoundingClientRect().top + window.scrollY - 40 : window.innerHeight
    const duration = 1000
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
    const animate = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = easeOutCubic(p)
      window.scrollTo(0, from + (to - from) * eased)
      if (p < 1) requestAnimationFrame(animate)
      else setTimeout(() => setPulse(false), 350)
    }
    requestAnimationFrame(animate)
  }

  const [showUp, setShowUp] = useState(false)
  useEffect(() => {
    const onS = () => setShowUp(window.scrollY > window.innerHeight * 0.75)
    window.addEventListener('scroll', onS, { passive: true })
    onS()
    return () => window.removeEventListener('scroll', onS)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: .07, delayChildren: .12 } }
  }
  const item = {
    hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: .7, ease: 'easeOut' } }
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 text-center overflow-hidden"
    >
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0">
        <BackgroundFX />
        <div className="absolute inset-0 pointer-events-none
                        [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_70%,rgba(0,0,0,0)_100%)]" />
      </motion.div>

      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, opacity: contentOpacity, scale: contentScale, y: contentY }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-4xl will-change-transform"
      >
        <motion.h1 variants={item} className="group relative text-[2.9rem] leading-[1.05] md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent">
            Hi, I&apos;m Pau
          </span>
          <span className="block mt-2 text-base md:text-lg font-normal text-white/55">
            <RotatingWords />
          </span>
          <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-3 h-[3px] w-0 group-hover:w-3/4 rounded-full
                           bg-gradient-to-r from-brand-blue/0 via-brand-blue/70 to-brand-coral/0 transition-all duration-700" />
        </motion.h1>

        <motion.p variants={item}
          className="mt-8 text-[1.05rem] md:text-xl leading-relaxed mx-auto max-w-2xl text-white/70">
          Engineering resilient cloud platforms, automated delivery pipelines & zero‑trust infrastructure
          with relentless focus on performance, reliability and privacy.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="#projects"
            className="relative group px-9 py-3 rounded-md font-semibold text-sm text-white
                       bg-gradient-to-br from-brand-blue via-[#4e8edb] to-brand-coral/80
                       hover:shadow-[0_0_40px_-6px_rgba(88,166,255,0.55)]
                       transition-all duration-300 outline-none focus:ring-2 focus:ring-brand-blue/60"
          >
            <span className="relative z-10">Explore My Projects</span>
            <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition
                             bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)] mix-blend-overlay" />
          </a>
          <a
            href="/contact"
            className="relative px-9 py-3 rounded-md font-semibold text-sm
                       border border-white/15 text-white/80 backdrop-blur-md
                       bg-white/5 hover:bg-white/10 hover:text-white
                       transition-all duration-300 focus:ring-2 focus:ring-brand-blue/50"
          >
            Contact Me
            <span className="absolute inset-0 rounded-md pointer-events-none border border-white/5" />
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-4 text-[0.8rem] tracking-wide font-medium text-white/55">
          <span className="inline-flex items-center gap-1"><span className="text-brand-blue/90">♟</span> Chess Enthusiast</span>
          <span className="w-px h-4 bg-white/15" />
          <span className="text-brand-coral/80">Privacy Focused</span>
          <span className="w-px h-4 bg-white/15" />
          <span className="font-mono text-[0.75rem] text-white/40 flex items-center gap-1">
            <span className="text-brand-blue/70">$</span>
            <TypeCommand />
          </span>
        </motion.div>
      </motion.div>

      <motion.button
        style={{ opacity: arrowOpacity }}
        onClick={onArrowClick}
        aria-label="Scroll to About"
        className="group absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white text-2xl flex flex-col items-center"
      >
        <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 overflow-hidden">
          <motion.span
            animate={pulse ? { scale: [0, 1, 1.4], opacity: [.6, .35, 0] } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-blue/50 to-brand-coral/40"
          />
          <span className="relative z-10 animate-bounce group-hover:animate-none">↓</span>
        </span>
        <span className="mt-1 text-[0.55rem] tracking-wider font-semibold opacity-0 group-hover:opacity-70 transition">ABOUT</span>
      </motion.button>

      <AnimatePresence>
        {showUp && (
          <motion.button
            key="up"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 border border-white/15 text-white/70
                       hover:text-white hover:bg-white/15 backdrop-blur-md text-lg"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  )
}
