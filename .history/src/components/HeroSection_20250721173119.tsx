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
    show: { opacity: 1, y: 0, filt
