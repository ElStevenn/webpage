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

const STEPS = [
  { Icon: ServerStackIcon,  title:'Infrastructure as Code',
    blurb:'Terraform modules bootstrap multi‑env stacks in minutes.' },
  { Icon: BoltIcon,         title:'CI / CD Pipeline',
    blurb:'GitHub Actions builds, tests & pushes containers.' },
  { Icon: ShieldCheckIcon,  title:'Security Automation',
    blurb:'Secrets rotation & zero‑trust policies.' },
  { Icon: ChartBarSquareIcon,title:'Observability',
    blurb:'Metrics, traces & SLO‑driven alerts.' }
] as const

const EXTRA_H = (STEPS.length - 1) * 100          // 300 vh for 4 slides

export default function AutomationStorySection () {
  const pin = useRef<HTMLDivElement|null>(null)

  /* global progress of the sticky viewport */
  const { scrollYProgress } = useScroll({
    target: pin,
    offset: ['start start','end start']
  })

  /* move the whole column upward */
  const trackY = useTransform(scrollYProgress,[0,1],['0%',`-${EXTRA_H}%`])

  return (
    <section id="workflow" className="relative overflow-visible">
      {/* sticky viewport */}
      <div ref={pin} className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(88,166,255,0.10),transparent_70%)]" />

        <motion.div style={{ y:trackY }} className="h-full">
          {STEPS.map((step,i)=>{
            const start = i/STEPS.length
            const end   = (i+1)/STEPS.length

            /* FIRST slide: show immediately (opacity=1) */
            const base   = i===0 ? 1 : 0
            const opacity = useTransform(
              scrollYProgress,
              i===0
                ? [0, start+.08, end-.08, end]   // no ramp‑in
                : [start, start+.08, end-.08, end],
              i===0
                ? [1, 1,        1,       0]
                : [0, 1,        1,       0]
            )
            const scale   = useTransform(scrollYProgress,
              [start,start+.08,end-.08,end],
              [.90,1,1,.90]
            )

            return (
              <motion.article key={step.title}
                style={{opacity,scale}}
                className="w-full h-screen flex flex-col items-center justify-center">
                <IconDrawing Icon={step.Icon} progress={opacity}/>
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

      {/* extra scroll room (n‑1 screens) */}
      <div style={{height:`${EXTRA_H}vh`}}/>
    </section>
  )
}

/* ─────────────────────────────────────────────── */
function IconDrawing({
  Icon, progress
}:{ Icon:React.ComponentType<React.SVGProps<SVGSVGElement>>
   progress:any }){

  /* ring length follows opacity, icon “breathes” */
  const ring   = useTransform(progress,[0,1],[0,1])
  const bounce = useTransform(progress,[0,1],[1,1.05])

  return(
    <motion.div
      style={{scale:bounce}}
      className="relative"
    >
      <Icon className="w-24 h-24 text-brand-blue drop-shadow-[0_0_6px_#58a6ff90]" />
      <motion.svg viewBox="0 0 48 48"
        className="absolute inset-0 w-24 h-24 text-brand-blue/60">
        <motion.circle
          cx="24" cy="24" r="23"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          style={{pathLength:ring}}
        />
      </motion.svg>
    </motion.div>
  )
}
