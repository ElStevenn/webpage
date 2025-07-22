'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      className="relative max-w-5xl mx-auto px-6 py-32 scroll-mt-24"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .6 }}
        className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-[#58A6FF] to-[#F78166] bg-clip-text text-transparent"
      >
        About Me
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .7, delay: .1 }}
        className="text-white/70 leading-relaxed max-w-2xl"
      >
        I’m a DevOps / backend engineer focused on secure, resilient infra, API integrations
        and automation. This site is WIP—just scaffolding the first pass so I can iterate fast.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .7, delay: .25 }}
        className="mt-12 grid gap-6 sm:grid-cols-2"
      >
        {[
          { t: 'Infrastructure', d: 'Kubernetes, scaling, HA, observability.' },
          { t: 'Automation', d: 'Pipelines, schedulers, async workers.' },
          { t: 'Security', d: 'Hardening, secrets, privacy mindset.' },
          { t: 'Python', d: 'APIs, data scripts, async services.' }
        ].map(card => (
          <div key={card.t} className="group relative rounded-lg border border-white/10 p-5 bg-white/[0.02] hover:bg-white/[0.05] transition">
            <h3 className="font-semibold text-sm tracking-wide mb-2 text-[#58A6FF]">{card.t}</h3>
            <p className="text-xs text-white/60">{card.d}</p>
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none"
                 style={{ boxShadow: '0 0 25px -5px rgba(88,166,255,0.35)' }}/>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
