'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import BackgroundFX from './BackgroundFX'

const roles = ['DevOps Engineer','Backend Architect','Security Builder','Automation Nerd']

function RotatingWords() {
  const [i,setI] = useState(0)
  useEffect(() => {
    const id = setInterval(()=>setI(v=>(v+1)%roles.length),3000)
    return ()=>clearInterval(id)
  },[])
  return (
    <div className="relative h-7 md:h-8 overflow-hidden select-none">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[i]}
          initial={{ y:'60%', opacity:0, filter:'blur(6px)' }}
          animate={{ y:'0%', opacity:1, filter:'blur(0px)' }}
          exit={{ y:'-60%', opacity:0, filter:'blur(6px)' }}
          transition={{ duration:.55, ease:'easeOut' }}
          className="inline-block text-lg md:text-xl font-medium bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement|null>(null)
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const rotX = useSpring(mvX,{ stiffness:120, damping:18 })
  const rotY = useSpring(mvY,{ stiffness:120, damping:18 })

  const handleMouse = useCallback((e:MouseEvent)=>{
    const el = ref.current; if(!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    mvX.set(-(y - r.height/2)/35)
    mvY.set((x - r.width/2)/35)
  },[mvX,mvY])

  useEffect(()=>{
    const el = ref.current; if(!el) return
    const leave=()=>{ mvX.set(0); mvY.set(0) }
    el.addEventListener('mousemove',handleMouse)
    el.addEventListener('mouseleave',leave)
    return ()=>{
      el.removeEventListener('mousemove',handleMouse)
      el.removeEventListener('mouseleave',leave)
    }
  },[handleMouse,mvX,mvY])

  const container = {
    hidden:{ opacity:0 },
    show:{ opacity:1, transition:{ staggerChildren:.08, delayChildren:.1 } }
  }
  const item = {
    hidden:{ opacity:0, y:26, filter:'blur(8px)' },
    show:{ opacity:1, y:0, filter:'blur(0px)', transition:{ duration:.7, ease:'easeOut'} }
  }

  const scrollToAbout = () => {
    const el = document.getElementById('about')
    if (el) el.scrollIntoView({ behavior:'smooth' })
  }

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 text-center overflow-hidden"
    >
      <BackgroundFX />

      <motion.div
        style={{ rotateX:rotX, rotateY:rotY }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-4xl"
      >
        <motion.h1 variants={item} className="group relative text-[2.9rem] leading-[1.05] md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent">
            Hi, I&apos;m Pau
          </span>
          <span className="block mt-2 text-base md:text-lg font-normal text-white/55">
            <RotatingWords />
          </span>
          <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-3 h-[3px] w-0 group-hover:w-3/4 rounded-full bg-gradient-to-r from-brand-blue/0 via-brand-blue/70 to-brand-coral/0 transition-all duration-700" />
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 text-[1.05rem] md:text-xl leading-relaxed mx-auto max-w-2xl text-white/70 relative"
        >
          Engineering resilient cloud platforms, automated delivery pipelines and zero‑trust infrastructure with a focus on performance, reliability & privacy.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="#projects"
            className="relative group px-9 py-3 rounded-md font-semibold text-sm text-white bg-gradient-to-br from-brand-blue via-[#4e8edb] to-brand-coral/80 shadow-[0_0_0_0_rgba(88,166,255,0)] hover:shadow-[0_0_35px_-8px_rgba(88,166,255,0.55)] transition-all duration-300 outline-none focus:ring-2 focus:ring-brand-blue/60"
          >
            <span className="relative z-10">Explore My Projects</span>
            <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)] mix-blend-overlay" />
          </a>
          <a
            href="#contact"
            className="relative px-9 py-3 rounded-md font-semibold text-sm border border-white/15 text-white/80 backdrop-blur-md bg-white/5 hover:bg-white/10 hover:text-white transition-all duration-300 focus:ring-2 focus:ring-brand-blue/50"
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
          <span className="font-mono text-[0.75rem] text-white/40 flex items-center gap-1"><span className="text-brand-blue/70">$</span> build <span className="animate-pulse">|</span></span>
        </motion.div>
      </motion.div>

      <button
        onClick={scrollToAbout}
        aria-label="Scroll to About"
        className="group absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white text-2xl flex flex-col items-center"
      >
        <span className="relative flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 overflow-hidden">
          <span className="absolute inset-0 rounded-full bg-gradient-to-b from-brand-blue/25 to-brand-coral/0 opacity-0 group-hover:opacity-100 transition" />
          <span className="animate-bounce group-hover:animate-none">↓</span>
        </span>
        <span className="mt-1 text-[0.6rem] tracking-wider font-semibold opacity-0 group-hover:opacity-70 transition">ABOUT</span>
      </button>
    </section>
  )
}
