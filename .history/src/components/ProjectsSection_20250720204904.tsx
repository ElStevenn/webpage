'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const items = [
  { title: 'API Integrator', desc: 'Unified adapters + async workers.' },
  { title: 'Task Scheduler', desc: 'Cron-like orchestrator with UI.' },
  { title: 'Inheritance Planner', desc: 'Legal tech scenario engine.' },
  { title: 'SkyShield Infra', desc: 'Secure infra baseline templates.' },
  { title: 'Chat Assistant', desc: 'Domain AI assistant prototype.' },
  { title: 'Metrics Edge', desc: 'Lightweight telemetry pipeline.' },
]

export default function ProjectsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} className="relative max-w-6xl mx-auto px-6 py-32 scroll-mt-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .6 }}
        className="text-3xl md:text-4xl font-bold mb-10"
      >
        <span className="bg-gradient-to-r from-white to-[#58A6FF] bg-clip-text text-transparent">
          Projects & Focus
        </span>
      </motion.h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: .55, delay: .1 * i }}
            className="group relative rounded-lg border border-white/10 bg-white/[0.03] p-5 text-sm hover:-translate-y-1 hover:border-[#58A6FF]/50 transition"
          >
            <h3 className="font-semibold text-[#58A6FF] mb-2 tracking-wide">{p.title}</h3>
            <p className="text-white/60 text-xs leading-relaxed">{p.desc}</p>
            <div className="mt-4 inline-block text-[11px] uppercase tracking-wide text-white/40 group-hover:text-[#F78166] transition">
              WIP →
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition"
                 style={{ boxShadow: '0 0 25px -8px rgba(88,166,255,0.25)' }}/>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
