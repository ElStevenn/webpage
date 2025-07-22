// components/AutomationStorySection.tsx
'use client'
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence
} from 'framer-motion'
+import {
    +  BoltIcon,
    +  ShieldCheckIcon,
    +  ChartBarSquareIcon,
    +  ServerStackIcon
    +} from '@heroicons/react/24/outline'
const STEPS = [
  {
    Icon: ServerStackIcon,
    title: 'Infrastructure as Code',
    blurb: 'Terraform modules bootstrap multi‑env stacks in minutes.',
  },
  {
    Icon: BoltIcon,
    title: 'CI / CD Pipeline',
    blurb: 'GitHub Actions builds, tests & pushes containers.',
  },
  {
    Icon: ShieldCheckIcon,
    title: 'Security Automation',
    blurb: 'Secrets rotation & zero‑trust policies.',
  },
  {
    Icon: ChartBarSquareIcon,
    title: 'Observability',
    blurb: 'Metrics, traces & SLO‑driven alerts.',
  },
] as const

export default function AutomationStorySection() {
  const ref = useRef<HTMLDivElement | null>(null)

  /* sticky container scroll progress */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // move whole slide stack upward as we scroll
  const trackY = useTransform(scrollYProgress, [0, 1], ['0%', '-300%'])

  return (
    <section id="workflow" className="relative py-60 overflow-visible">
      {/* SENTINEL — gives us 400 vh of scrolling room */}
      <div className="h-[400vh]" />

      {/* STICKY track */}
      <div ref={ref} className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ y: trackY }} className="h-full">
          {STEPS.map((s, idx) => {
            /* each slide owns its own scroll slice (0‑1) / 4  */
            const start = idx / STEPS.length
            const end   = (idx + 1) / STEPS.length
            const slideOpacity = useTransform(
              scrollYProgress,
              [start, start + 0.1, end - 0.1, end],
              [0, 1, 1, 0]
            )
            const slideScale = useTransform(
              scrollYProgress,
              [start, start + 0.1, end - 0.1, end],
              [0.95, 1, 1, 0.95]
            )
            return (
              <motion.article
                key={s.title}
                style={{ opacity: slideOpacity, scale: slideScale }}
                className="w-full h-screen flex flex-col items-center justify-center"
              >
                {/* simple “drawing” – blue outline animates */}
                <Drawing Icon={s.Icon} progress={slideOpacity} />

                {/* title typing effect */}
                <motion.h3
                  className="mt-10 text-3xl md:text-4xl font-bold text-white tracking-tight"
                  variants={{
                    hidden: { clipPath: 'inset(0 100% 0 0)' },
                    show:   { clipPath: 'inset(0 0 0 0)',
                              transition:{ duration:0.8, ease:'easeOut'} },
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {s.title}
                </motion.h3>

                <motion.p
                  style={{ opacity: slideOpacity }}
                  className="mt-6 max-w-md text-center text-white/70"
                >
                  {s.blurb}
                </motion.p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- little SVG helper ---------- */
function Drawing({ Icon, progress }:{
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  progress: any
}) {
  return (
    <motion.svg
      width={120} height={120} viewBox="0 0 48 48"
      className="text-brand-blue"
    >
      <Icon width="48" height="48" fill="none" stroke="currentColor" />
      <motion.circle
        cx="24" cy="24" r="23"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength: progress }}
        className="opacity-40"
      />
    </motion.svg>
  )
}
