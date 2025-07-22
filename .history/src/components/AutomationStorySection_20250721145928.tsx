'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
    blurb: 'GitHub Actions builds, tests & pushes containers.'
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
]

const EXTRA_VH = (STEPS.length - 1) * 100

export default function AutomationStorySection() {
  const pin = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: pin,
    offset: ['start end', 'end start']
  })

  const trackY = useTransform(scrollYProgress, [0, 1], ['0%', `-${EXTRA_VH}%`])

  return (
    <section id="workflow" className="relative overflow-visible">
      {/* 👇 Add some scroll space before */}
      <div className="h-[100vh]" />

      <div ref={pin} className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(88,166,255,0.08),transparent_75%)]" />

        <motion.div style={{ y: trackY }} className="h-full">
          {STEPS.map((step, i) => {
            const start = i / STEPS.length
            const end = (i + 1) / STEPS.length

            const opacity = useTransform(
              scrollYProgress,
              [start, start + 0.08, end - 0.08, end],
              i === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0]
            )
            const scale = useTransform(
              scrollYProgress,
              [start, start + 0.08, end - 0.08, end],
              [0.92, 1, 1, 0.92]
            )
            const offsetY = useTransform(
              scrollYProgress,
              [start, end],
              ['10%', '-10%']
            )

            return (
              <motion.article
                key={step.title}
                style={{ opacity, scale, y: offsetY }}
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

      {/* 👇 Add scroll space after */}
      <div style={{ height: `${EXTRA_VH}vh` }} />
    </section>
  )
}

function IconDrawing({
  Icon,
  progress
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  progress: any
}) {
  const ring = useTransform(progress, [0, 1], [0, 1])
  const pulse = useTransform(progress, [0, 1], [1, 1.05])
  const blue = '#58A6FF'

  return (
    <motion.div style={{ scale: pulse }} className="relative">
      <Icon
        strokeWidth={1.6}
        stroke={blue}
        fill="none"
        className="w-24 h-24 drop-shadow-[0_0_6px_#58a6ff90]"
      />
      <motion.svg viewBox="0 0 48 48" className="absolute inset-0 w-24 h-24">
        <motion.circle
          cx="24"
          cy="24"
          r="23"
          stroke={blue}
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: ring }}
          className="opacity-70"
        />
      </motion.svg>
    </motion.div>
  )
}
