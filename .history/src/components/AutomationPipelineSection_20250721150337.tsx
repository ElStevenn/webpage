// About me section – scroll friendly, animated highlights
'use client'

import { motion } from 'framer-motion'
import { BadgeCheck, Code, Server, Terminal } from 'lucide-react'

const HIGHLIGHTS = [
  {
    Icon: Terminal,
    title: 'DevOps Engineer',
    blurb: '4+ years automating cloud‑native infrastructures and CI/CD pipelines.'
  },
  {
    Icon: Server,
    title: 'Cloud Architect',
    blurb: 'Designed Kubernetes clusters & VPC networks on AWS, GCP and DigitalOcean.'
  },
  {
    Icon: Code,
    title: 'Python Enthusiast',
    blurb: 'FastAPI, NumPy, data pipelines – clean, typed, tested.'
  },
  {
    Icon: BadgeCheck,
    title: 'Open‑Source Lover',
    blurb: 'Contributor to IaC modules and container tooling.'
  }
] as const

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-[radial-gradient(circle_at_top,rgba(88,166,255,0.05),transparent_70%)]">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-4xl md:text-5xl font-bold tracking-tight text-white"
        >
          About&nbsp;me
        </motion.h2>

        {/* intro blurb */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-6 mx-auto max-w-2xl text-center text-lg text-white/80 leading-relaxed"
        >
          Hey! I’m <span className="font-semibold text-brand-blue">Pau Mateu</span> – a Barcelona‑born DevOps engineer who turns messy deployments into
          bullet‑proof automation. When I’m not wrangling containers you’ll find me building API integrations
          or learning German over a strong espresso.
        </motion.p>

        {/* highlight grid */}
        <ul className="mt-12 grid gap-8 sm:grid-cols-2">
          {HIGHLIGHTS.map(({ Icon, title, blurb }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4 rounded-2xl bg-white/5 p-6 backdrop-blur-lg border border-white/10 shadow-lg hover:shadow-xl transition"
            >
              <Icon className="w-10 h-10 flex-shrink-0 text-brand-blue drop-shadow-[0_0_6px_#58a6ff90]" />
              <div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-white/70 text-sm leading-normal">{blurb}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
