// About me – animated, gradient‑driven eye‑candy ✨
'use client'

import { motion } from 'framer-motion'
import {
  BadgeCheck,
  Code as CodeIcon,
  Server,
  Terminal
} from 'lucide-react'

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
    Icon: CodeIcon,
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
  /* blob motion */
  const blobVariants = {
    animate: {
      x: [0, -100, 50, 0],
      y: [0, -50, 100, 0],
      rotate: [0, 45, -45, 0],
      transition: {
        repeat: Infinity,
        repeatType: 'mirror',
        duration: 25,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <section id="about" className="relative py-28 md:py-40 overflow-hidden">
      {/* background blobs & gradient grid */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(88,166,255,0.08),transparent_70%)]" />
        <motion.div
          variants={blobVariants}
          animate="animate"
          className="absolute -top-20 -left-20 w-[60vw] h-[60vw] rounded-full bg-[conic-gradient(from_var(--angle),#58a6ff_20%,#ff5e5b_50%,#ffc371_80%,#58a6ff_100%)] opacity-30 blur-3xl"
          style={{ '--angle': '0deg' } as React.CSSProperties}
        />
        <motion.div
          variants={blobVariants}
          animate="animate"
          className="absolute bottom-0 right-0 w-[45vw] h-[45vw] rounded-full bg-[conic-gradient(from_var(--angle),#ff5e5b_10%,#58a6ff_50%,#ffc371_90%,#ff5e5b_100%)] opacity-20 blur-3xl"
          style={{ '--angle': '90deg' } as React.CSSProperties}
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-brand-blue via-sky-300 to-brand-blue bg-clip-text text-transparent"
        >
          About&nbsp;me
        </motion.h2>

        {/* intro */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-8 mx-auto max-w-3xl text-center text-xl md:text-2xl text-white/80 leading-relaxed"
        >
          I’m <span className="font-semibold text-brand-blue">Pau&nbsp;Mateu</span> – DevOps addict, cloud tinkerer and relentless
          automation evangelist. My toolkit turns chaotic deployments into seamless delivery pipelines.
          Off‑hours? I craft API integrations, learn languages and hunt the perfect espresso.
        </motion.p>

        {/* highlights */}
        <ul className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map(({ Icon, title, blurb }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04, rotateX: 3, rotateY: -3 }}
              className="group rounded-3xl p-8 bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transition-transform"
            >
              <Icon className="w-12 h-12 text-brand-blue drop-shadow-[0_0_8px_#58a6ff90] group-hover:scale-110 transition-transform" />
              <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-white/70 leading-relaxed text-sm">{blurb}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
