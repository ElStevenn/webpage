// Services – premium consultation packs
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
  Sparkles
} from 'lucide-react'

interface Pack {
  title: string
  blurb: string
  price: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  tag?: string // e.g. “Best value”
}

const PACKS: Pack[] = [
  {
    title: 'Product Strategy Consultation',
    blurb: 'Expert guidance on shaping product direction, refining strategy and solving key challenges so you can build successful products.',
    price: '€60 · 30 min',
    icon: Lightbulb,
    tag: 'Popular'
  },
  {
    title: 'Startup Mentorship',
    blurb: 'Tailored 1:1 mentorship for founders & early‑stage teams. Accelerate progress, avoid pitfalls and scale with confidence.',
    price: '€120–€200 · hr',
    icon: Rocket,
    tag: 'Founders'
  },
  {
    title: 'AI Automation Consultation',
    blurb: 'Practical advice on automating business processes using AI — ideal for lawyers, accountants & ops teams looking to unlock efficiency.',
    price: '€100 · hr',
    icon: Sparkles,
    tag: 'AI'
  }
] as const

export default function ServicesSection() {
  const pinRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: pinRef, offset: ['start start', 'end start'] })
  const waveOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  return (
    <section id="services" className="relative py-32 md:py-48 overflow-hidden">
      {/* ——— top divider wave (shares palette with previous section) ——— */}
      <motion.svg
        style={{ opacity: waveOpacity }}
        className="absolute -top-px left-0 right-0 w-full -z-10"
        viewBox="0 0 1440 100" preserveAspectRatio="none"
      >
        <path d="M0 100 Q 360 0 720 60 T 1440 40 V100 H0 Z" fill="url(#waveFillSvc)" />
        <defs>
          <linearGradient id="waveFillSvc" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#091017" />
            <stop offset="100%" stopColor="#0d141d" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* sparkle grid background */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px] opacity-5" />

      {/* soft color blob */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.14, x: [0, -70, 90, 0], y: [0, 50, -60, 0] }}
        transition={{ repeat: Infinity, duration: 46, ease: 'easeInOut' }}
        className="absolute right-0 top-1/4 w-[60vw] h-[60vw] rounded-full blur-3xl bg-[conic-gradient(#ff5e5b_10%,#58a6ff_40%,#ffc371_70%,#ff5e5b_100%)] -z-20"
      />

      <div ref={pinRef} className="container mx-auto px-6 max-w-6xl">
        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-brand-blue via-sky-300 to-brand-blue bg-clip-text text-transparent"
        >
          Advisory Packs
        </motion.h2>

        {/* card grid */}
        <ul className="mt-24 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {PACKS.map(({ icon: Icon, title, blurb, price, tag }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, rotateX: 5, rotateY: -5 }}
              className="relative group rounded-3xl p-8 bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transition-transform"
            >
              {/* tag badge */}
              {tag && (
                <span className="absolute -top-3 -right-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ring-1 ring-white/20 bg-white/10 text-white/80 shadow-inner">
                  {tag}
                </span>
              )}

              <Icon className="w-12 h-12 text-brand-blue drop-shadow-[0_0_8px_#58a6ff90] group-hover:scale-110 transition-transform" />
              <h3 className="mt-6 text-2xl font-semibold text-white leading-snug">
                {title}
              </h3>
              <p className="mt-3 text-white/70 leading-relaxed text-sm min-h-[72px]">
                {blurb}
              </p>
              <p className="mt-6 text-lg font-semibold bg-gradient-to-r from-brand-blue via-sky-300 to-brand-blue bg-clip-text text-transparent">
                {price}
              </p>
              <a
                href="#contact"
                className="inline-block mt-6 px-5 py-2 rounded-md text-sm font-semibold text-white bg-gradient-to-br from-brand-blue via-sky-400 to-brand-coral/80 hover:shadow-[0_0_24px_-4px_rgba(88,166,255,0.6)] transition-shadow"
              >
                Book a call →
              </a>
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
          <p className="text-white/80 text-lg">Not sure which pack fits? Let’s craft a custom engagement.</p>
          <a
            href="#contact"
            className="inline-block mt-6 px-10 py-3 rounded-md font-semibold text-sm text-white bg-gradient-to-br from-brand-blue via-[#4e8edb] to-brand-coral/80 hover:shadow-[0_0_40px_-6px_rgba(88,166,255,0.55)] transition-shadow"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* bottom fade to next section */}
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#091017] via-[#0d141d]/80 to-transparent pointer-events-none" />
    </section>
  )
}
