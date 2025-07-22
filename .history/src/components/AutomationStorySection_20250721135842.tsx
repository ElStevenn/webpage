// components/AutomationStorySection.tsx
'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform
} from 'framer-motion'
import {
  BoltIcon,
  ShieldCheckIcon,
  ChartBarSquareIcon,
  ServerStackIcon
} from '@heroicons/react/24/outline'

const STEPS = [
  {
    Icon: ServerStackIcon,
    title: 'Infrastructure as Code',
    blurb: 'Terraform modules bootstrap multi‑env stacks in minutes.'
  },
  {
    Icon: BoltIcon,
    title: 'CI / CD Pipeline',
    blurb: 'GitHub Actions builds, tests & pushes containers.'
  },
  {
    Icon: ShieldCheckIcon,
    title: 'Security Automation',
    blurb: 'Secrets rotation & zero‑trust policies.'
  },
  {
    Icon: ChartBarSquareIcon,
    title: 'Observability',
    blurb: 'Metrics, traces & SLO‑driven alerts.'
  }
] as const

export default function AutomationStorySection() {
  const pinRef = useRef<HTMLDivElement | null>(null)

  /** global ‑– drives every animation in the section */
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end']
  })

  /** track slides upward through 0 → ‑300 % */
  const trackY = useTransform(scrollYProgress, [0, 1], ['0%', '-300%'])

  return (
    <section id="workflow" className="relative overflow-visible">
      {/* give the page room to scroll */}
      <div className="h-[400vh]" />

      {/* === sticky viewport ================================= */}
      <div ref={pinRef} className="sticky top-0 h-screen overflow-hidden">
        {/* soft radial glow behind the slides */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(88,166,255,0.12),transparent_70%)]" />

        {/* slide stack */}
        <motion.div
          style={{ y: trackY }}
          className="h-[400%] flex flex-col"
        >
          {STEPS.map((step, i) => {
            /* slice boundaries for this slide */
            const start = i / STEPS.length
            const end   = (i + 1) / STEPS.length

            /** entrance / exit **/
            const opacity = useTransform(
              scrollYProgress,
              [start, start + 0.1, end - 0.1, end],
              [0, 1, 1, 0]
            )
            const scale = useTransform(
              scrollYProgress,
              [start, start + 0.1, end - 0.1, end],
              [.9, 1, 1, .9]
            )

            return (
              <motion.article
                key={step.title}
                style={{ opacity, scale }}
                className="w-full h-screen flex flex-col items-center justify-center"
              >
                <IconDrawing Icon={step.Icon} progress={opacity} />

                <h3 className="mt-10 text-3xl md:text-4xl font-bold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-6 max-w-md text-center text-white/70">
                  {step.blurb}
                </p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- little SVG helper ---------- */
function IconDrawing({
  Icon,
  progress
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  progress: any
}) {
  /* ring draws from 0 to 1 in sync with slide opacity */
  const ring = useTransform(progress, [0, 1], [0, 1])

  return (
    <div className="relative">
      <Icon className="w-24 h-24 text-brand-blue drop-shadow-[0_0_6px_#58a6ff90]" />
      <motion.svg
        viewBox="0 0 48 48"
        className="absolute inset-0 w-24 h-24 text-brand-blue/60"
      >
        <motion.circle
          cx="24"
          cy="24"
          r="23"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: ring }}
        />
      </motion.svg>
    </div>
  )
}
