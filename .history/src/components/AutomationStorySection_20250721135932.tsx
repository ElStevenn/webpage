// src/components/AutomationStorySection.tsx
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

/* ────────────────────────────────────────────────────────── */
/* 1)  the slides you want to show                                                   */
const STEPS = [
  {
    Icon: ServerStackIcon,
    title : 'Infrastructure as Code',
    blurb : 'Terraform modules bootstrap multi‑env stacks in minutes.'
  },
  {
    Icon: BoltIcon,
    title : 'CI / CD Pipeline',
    blurb : 'GitHub Actions builds, tests & pushes containers.'
  },
  {
    Icon: ShieldCheckIcon,
    title : 'Security Automation',
    blurb : 'Secrets rotation & zero‑trust policies.'
  },
  {
    Icon: ChartBarSquareIcon,
    title : 'Observability',
    blurb : 'Metrics, traces & SLO‑driven alerts.'
  }
] as const
const EXTRA_SCREEN_HEIGHT = (STEPS.length - 1) * 100   // e.g. 300

/* ────────────────────────────────────────────────────────── */
/* 2)  main component                                                             */
export default function AutomationStorySection () {
  const pinRef = useRef<HTMLDivElement | null>(null)

  /* global scroll‑progress of the sticky block */
  const { scrollYProgress } = useScroll({
    target : pinRef,
    offset : ['start start', 'end start']          // sticky enters / leaves
  })

  /* translate the whole slide‑stack upward                                   */
  const trackY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${EXTRA_SCREEN_HEIGHT}%`]             // 0  →  -300 %
  )

  return (
    <section id="workflow" className="relative overflow-visible">
      {/* ───────── STICKY VIEWPORT ───────── */}
      <div ref={pinRef} className="sticky top-0 h-screen overflow-hidden">
        {/* soft glow behind everything */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(88,166,255,0.12),transparent_70%)]" />

        {/* slide‑stack */}
        <motion.div style={{ y: trackY }} className="h-full">
          {STEPS.map((step, i) => {
            /* own slice (0‑1) divided equally                                       */
            const start = i   / STEPS.length         // 0, .25, .50, .75
            const end   = (i+1) / STEPS.length

            const opacity = useTransform(
              scrollYProgress,
              [start, start+0.08, end-0.08, end],
              [0, 1, 1, 0]
            )
            const scale = useTransform(
              scrollYProgress,
              [start, start+0.08, end-0.08, end],
              [.92, 1, 1, .92]
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

      {/* Extra scroll‑space so the sticky block has room to play */}
      <div style={{ height: `${EXTRA_SCREEN_HEIGHT}vh` }} />
    </section>
  )
}

/* ────────────────────────────────────────────────────────── */
/* 3)  helper that draws the animated ring around each icon                     */
function IconDrawing ({
  Icon,
  progress
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  progress: any
}) {
  /** ring draws from 0 → 1 in sync with slide opacity */
  const ring = useTransform(progress, [0, 1], [0, 1])

  return (
    <div className="relative">
      <Icon className="w-24 h-24 text-brand-blue drop-shadow-[0_0_6px_#58a6ff90]" />

      <motion.svg
        viewBox="0 0 48 48"
        className="absolute inset-0 w-24 h-24 text-brand-blue/60"
      >
        <motion.circle
          cx="24" cy="24" r="23"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: ring }}
        />
      </motion.svg>
    </div>
  )
}
