/* ────────────────────────────────────────────────────────── */
/*  src/components/AutomationStorySection.tsx                */
/*                                                            */
/*  Sticky 3‑D slide deck that explains your pipeline steps   */
/* ────────────────────────────────────────────────────────── */
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

/* ①  content ------------------------------------------------ */
const STEPS = [
  {
    Icon  : ServerStackIcon,
    title : 'Infrastructure as Code',
    blurb : 'Terraform modules bootstrap multi‑env stacks in minutes.'
  },
  {
    Icon  : BoltIcon,
    title : 'CI / CD Pipeline',
    blurb : 'GitHub Actions builds, tests & pushes containers.'
  },
  {
    Icon  : ShieldCheckIcon,
    title : 'Security Automation',
    blurb : 'Secrets rotation & zero‑trust policies.'
  },
  {
    Icon  : ChartBarSquareIcon,
    title : 'Observability',
    blurb : 'Metrics, traces & SLO‑driven alerts.'
  }
] as const

const EXTRA_VH = (STEPS.length - 1) * 100        // 300 vh of extra scroll

/* ②  component --------------------------------------------- */
export default function AutomationStorySection () {
  const pin = useRef<HTMLDivElement>(null)

  /**  global progress of the sticky viewport  */
  const { scrollYProgress } = useScroll({
    target : pin,
    offset : ['start start','end start']
  })

  /**  translate the column upward (0 → −300 %)  */
  const trackY = useTransform(scrollYProgress, [0,1], ['0%', `-${EXTRA_VH}%`])

  return (
    <section id="workflow" className="relative overflow-visible">
      {/* ───────── sticky viewport ───────── */}
      <div ref={pin} className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10
                        bg-[radial-gradient(circle_at_center,rgba(88,166,255,0.08),transparent_75%)]" />

        {/* slide stack */}
        <motion.div style={{ y: trackY }} className="h-full">
          {STEPS.map((step,i)=>{
            const start =  i      / STEPS.length   // 0, .25, .5, .75
            const end   = (i + 1) / STEPS.length

            /* opacity & scale for each slice */
            const opacity = useTransform(
              scrollYProgress,
              [start, start+.08, end-.08, end],
              i === 0 ? [1, 1, 1, 0] : [0, 1, 1, 0]   // first slide is pre‑shown
            )
            const scale   = useTransform(
              scrollYProgress,
              [start, start+.08, end-.08, end],
              [.92, 1, 1, .92]
            )
            /* tiny parallax to reinforce depth */
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

      {/* Extra scroll‑space so the sticky region can leave smoothly */}
      <div style={{ height: `${EXTRA_VH}vh` }} />
    </section>
  )
}

/* ③  helper: icon + animated ring -------------------------- */
function IconDrawing ({
  Icon,
  progress
}:{
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  progress: any
}) {
  /* ring draws from 0 → 1 together with slide opacity */
  const ring = useTransform(progress, [0,1], [0,1])

  /* breathing effect */
  const pulse = useTransform(progress, [0,1],[1,1.05])

  /* use a hard‑coded colour so it never falls back to black */
  const blue = '#58A6FF'

  return (
    <motion.div style={{ scale: pulse }} className="relative">
      <Icon
        /* heroicons accept stroke / strokeWidth props */
        strokeWidth={1.6}
        stroke={blue}
        fill="none"
        className="w-24 h-24 drop-shadow-[0_0_6px_#58a6ff90]"
      />
      <motion.svg
        viewBox="0 0 48 48"
        className="absolute inset-0 w-24 h-24"
      >
        <motion.circle
          cx="24" cy="24" r="23"
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
