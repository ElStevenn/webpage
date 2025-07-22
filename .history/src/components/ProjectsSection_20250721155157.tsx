// Projects – immersive, scroll‑triggered showcase
'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform
} from 'framer-motion'
import {
  GithubIcon,
  ServerCog,
  Bot,
  CalendarClock,
  Scale,
  Receipt
} from 'lucide-react'

interface Project {
  title: string
  blurb: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  link?: string
  highlight?: boolean   // golden ring + “MVP” badge
  tag?: string          // small badge with custom text
}

const PROJECTS: Project[] = [
  {
    title: 'Axrion',
    blurb: 'Self‑hosted observability suite that ingests millions of metrics per second and surfaces anomalies with ML‑driven insights.',
    icon: GithubIcon,
    link: 'https://github.com/your‑org/axrion',
    highlight: true          // MVP badge + gold ring
  },
  {
    title: 'Task Scheduler',
    blurb: 'Declarative cron‑on‑steroids: run anything, track everything, sleep peacefully.',
    icon: CalendarClock
  },
  {
    title: 'Custom Chatbot',
    blurb: '24/7 support agent powered by vector search & fine‑tuned LLMs.',
    icon: Bot
  },
  {
    title: 'Ulpiano',
    blurb: 'My flagship LegalTech venture – automates probate & inheritance workflows end‑to‑end for law firms and notaries.',
    icon: Scale,
    link: 'https://ulpiano.io'
  },
  {
    title: 'SkyShield Server',
    blurb: 'Hardened Linux image with automatic patching & live‑restore clusters.',
    icon: ServerCog
  },
  {
    title: 'BillFlow Automator',
    blurb: 'Capture invoices, OCR details, schedule payments and sync to your ledger – zero‑touch billing.',
    icon: Receipt,
    tag: 'Private Project'
  }
] as const

export default function ProjectsSection() {
  const pinRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: pinRef, offset: ['start start', 'end start'] })
  const waveOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  return (
    <section id="projects" className="relative py-32 md:py-48 overflow-hidden">
      {/* ————— top wave divider ————— */}
      <motion.svg
        style={{ opacity: waveOpacity }}
        className="absolute -top-px left-0 right-0 w-full -z-10"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path d="M0 100 Q 360 0 720 60 T 1440 40 V100 H0 Z" fill="url(#waveFill)" />
        <defs>
          <linearGradient id="waveFill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0b1219" />
            <stop offset="100%" stopColor="#0d141d" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* background sparkle grid */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px] opacity-5" />

      {/* floating colour blobs (reuse About palette) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15, x: [0, 60, -80, 0], y: [0, -60, 40, 0] }}
        transition={{ repeat: Infinity, duration: 40, ease: 'easeInOut' }}
        className="absolute -left-32 top-1/3 w-[55vw] h-[55vw] rounded-full blur-3xl bg-[conic-gradient(#58a6ff_20%,#ff5e5b_50%,#ffc371_80%,#58a6ff_100%)] -z-20"
      />

      <div ref={pinRef} className="container mx-auto px-6 max-w-7xl">
        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-brand-blue via-sky-300 to-brand-blue bg-clip-text text-transparent"
        >
          Projects
        </motion.h2>

        {/* grid */}
        <ul className="mt-24 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map(({ icon: Icon, title, blurb, link, highlight, tag }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, rotateX: 5, rotateY: -5 }}
              className={`relative group rounded-3xl p-8 bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transition-transform ${highlight ? 'ring-2 ring-[#ffd883]/80' : ''}`}
            >
              {/* badges */}
              {highlight && (
                <span className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-[#ffd883] text-xs font-semibold text-black shadow">
                  MVP
                </span>
              )}
              {!highlight && tag && (
                <span className="absolute -top-3 -right-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ring-1 ring-white/20 bg-white/10 text-white/80 shadow-inner">
                  {tag}
                </span>
              )}

              <Icon className="w-12 h-12 text-brand-blue drop-shadow-[0_0_8px_#58a6ff90] group-hover:scale-110 transition-transform" />
              <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-white/70 leading-relaxed text-sm min-h-[60px]">{blurb}</p>
              {link && (
                <a
                  href={link}
                  className="inline-block mt-6 px-5 py-2 rounded-md text-sm font-semibold text-white bg-gradient-to-br from-brand-blue via-sky-400 to-brand-coral/80 hover:shadow-[0_0_24px_-4px_rgba(88,166,255,0.6)] transition-shadow"
                  target="_blank" rel="noopener noreferrer"
                >
                  View Case →
                </a>
              )}
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <p className="text-white/80 text-lg">Got an ambitious idea? Let’s make it real.</p>
          <a
            href="#contact"
            className="inline-block mt-6 px-10 py-3 rounded-md font-semibold text-sm text-white bg-gradient-to-br from-brand-blue via-[#4e8edb] to-brand-coral/80 hover:shadow-[0_0_40px_-6px_rgba(88,166,255,0.55)] transition-shadow"
          >
            Start a conversation
          </a>
        </motion.div>
      </div>

      {/* bottom fade into next section */}
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#091017] via-[#0d141d]/80 to-transparent pointer-events-none" />
    </section>
  )
}
