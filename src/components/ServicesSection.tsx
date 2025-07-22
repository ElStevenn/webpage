// src/components/ServicesSection.tsx
'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform
} from 'framer-motion'
import {
  Lightbulb,
  Rocket,
  BrainCog
} from 'lucide-react'

interface Pack {
  title: string
  blurb: string
  price: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  tag?: string
  comingSoon?: boolean
}

const PACKS: Pack[] = [
  {
    title: 'Product Strategy Consultation',
    price: '€60 / 30 min',
    blurb: 'Expert guidance on shaping product direction, refining strategy and solving key challenges.',
    icon: Lightbulb,
    tag: 'Best Starter'
  },
  {
    title: 'Startup Mentorship',
    price: '€120–€200 / hr',
    blurb: 'Tailored 1:1 sessions for founders and early‑stage teams covering tech, product & growth.',
    icon: Rocket,
    tag: 'Founder Focus'
  },
  {
    title: 'AI Automation Consultation',
    price: '€100 / hr',
    blurb: 'Practical advice on automating business processes with AI – ideal for law & accounting firms.',
    icon: BrainCog,
    tag: 'Coming Soon',
    comingSoon: true
  }
] as const

export default function ServicesSection() {
  const pinRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end start']
  })
  const waveOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  return (
    <section id="services" className="relative py-32 md:py-48 overflow-hidden">
      {/* ─── smoother divider wave ─── */}
      <motion.svg
        style={{ opacity: waveOpacity }}
        className="absolute top-0 left-0 right-0 w-full -z-10"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 
             C360,40 1080,40 1440,100 
             L1440,0 
             L0,0 
             Z"
          fill="url(#waveFillS)"
        />
        <defs>
          <linearGradient id="waveFillS" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0b1219" />
            <stop offset="100%" stopColor="#0d141d" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* ─── layered backdrop ─── */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-[#0b1219] via-[#0d141d] to-[#091017]" />
      <div
        className="absolute inset-0 -z-20 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)]
                   [background-size:22px_22px] opacity-5"
      />
      <div
        className="absolute inset-0 -z-10 pointer-events-none mix-blend-overlay opacity-5
                   bg-[url('/grain.png')] bg-repeat"
      />

      {/* animated blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.13,
          x: [0, -70, 60, 0],
          y: [0, 80, -60, 0]
        }}
        transition={{ repeat: Infinity, duration: 46, ease: 'easeInOut' }}
        className="absolute right-0 top-1/3 w-[60vw] h-[60vw] rounded-full blur-3xl
                   bg-[conic-gradient(#ff5e5b_15%,#58a6ff_45%,#ffc371_75%,#ff5e5b_100%)] -z-20"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.1,
          x: [0, 60, -50, 0],
          y: [0, -70, 50, 0]
        }}
        transition={{ repeat: Infinity, duration: 52, ease: 'easeInOut', delay: 4 }}
        className="absolute -left-32 bottom-1/4 w-[55vw] h-[55vw] rounded-full blur-3xl
                   bg-[conic-gradient(#58a6ff_20%,#ffc371_50%,#ff5e5b_80%,#58a6ff_100%)] -z-20"
      />

      <div ref={pinRef} className="relative container mx-auto px-6 max-w-6xl">
        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-5xl md:text-6xl font-extrabold
                     bg-gradient-to-r from-brand-blue via-sky-300 to-brand-blue
                     bg-clip-text text-transparent"
        >
          Services
        </motion.h2>

        {/* grid */}
        <ul className="mt-24 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {PACKS.map(({ icon: Icon, title, blurb, price, tag, comingSoon }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              viewport={{ once: true }}
              whileHover={comingSoon ? {} : { y: -6 }}
              className={`relative group rounded-3xl p-8 backdrop-blur-lg border border-white/10
                          shadow-xl transition-transform ${
                            comingSoon
                              ? 'bg-white/5 opacity-50 cursor-default'
                              : 'bg-white/5 hover:shadow-2xl'
                          }`}
            >
              {/* badge */}
              {tag && (
                <span
                  className={`absolute -top-3 -right-3 inline-flex items-center gap-1
                              px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-white/20
                              backdrop-blur-md shadow-inner ${
                                comingSoon ? 'bg-white/15 text-white/70' : 'bg-brand-blue/30 text-white'
                              }`}
                >
                  {tag}
                </span>
              )}

              {/* icon */}
              <Icon
                className={`w-12 h-12 text-brand-blue drop-shadow-[0_0_8px_#58a6ff90]
                            ${comingSoon ? 'grayscale' : 'group-hover:scale-110'} transition-transform`}
              />

              <h3 className="mt-6 text-2xl font-semibold text-white leading-snug">
                {title}
              </h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed min-h-[66px]">
                {blurb}
              </p>
              <p className="mt-4 text-lg font-semibold
                         bg-gradient-to-r from-brand-blue via-sky-300 to-brand-blue
                         bg-clip-text text-transparent"
              >
                {price}
              </p>

              {comingSoon ? (
                <button
                  disabled
                  className="inline-block mt-6 px-5 py-2 rounded-md text-sm font-semibold
                             text-white/40 bg-white/10 cursor-not-allowed"
                >
                  Waitlist opening soon
                </button>
              ) : (
                <a
                  href="#contact"
                  className="inline-block mt-6 px-5 py-2 rounded-md text-sm font-semibold
                             text-white bg-gradient-to-br from-brand-blue via-sky-400 to-brand-coral/80
                             hover:shadow-[0_0_24px_-4px_rgba(88,166,255,0.6)] transition-shadow"
                >
                  Book a call →
                </a>
              )}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-44
                      bg-gradient-to-t from-[#091017] via-[#0d141d]/80 to-transparent
                      pointer-events-none"
      />
    </section>
  )
}
