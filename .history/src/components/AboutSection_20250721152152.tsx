// About me – layered animated backdrop (no flat fill)
'use client'

import { motion } from 'framer-motion'
import {
  BadgeCheck,
  Code as CodeIcon,
  Server,
  Terminal
} from 'lucide-react'

const HIGHLIGHTS = [
  { Icon: Terminal,  title: 'DevOps Engineer',   blurb: '4+ years automating cloud‑native infrastructures and CI/CD pipelines.' },
  { Icon: Server,    title: 'Cloud Architect',   blurb: 'Designed Kubernetes clusters & VPC networks on AWS, GCP and DigitalOcean.' },
  { Icon: CodeIcon,  title: 'Python Enthusiast', blurb: 'FastAPI, NumPy, data pipelines – clean, typed, tested.' },
  { Icon: BadgeCheck,title: 'Open‑Source Lover', blurb: 'Contributor to IaC modules and container tooling.' }
] as const

export default function AboutSection() {
  /* large blobby shapes */
  const blobVariants = {
    animate: {
      x: [0, -100, 50, 0],
      y: [0, -60, 80, 0],
      rotate: [0, 35, -35, 0],
      transition: { repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', duration: 32 }
    }
  }

  /* slow diagonal shimmer */
  const shimmerVariants = {
    animate: {
      backgroundPosition: ['0% 0%', '200% 200%'],
      transition: { repeat: Infinity, ease: 'linear', duration: 60 }
    }
  }

  return (
    <section id="about" className="relative overflow-hidden py-32 md:py-44 bg-gradient-to-b from-[#0e1621] via-[#0d141d] to-[#0b1018]">
      {/* ——— top fade into hero ——— */}
      <div className="absolute -top-1 left-0 right-0 h-40 pointer-events-none select-none bg-gradient-to-b from-transparent via-[#0d141d]/80 to-[#0d141d]" />

      {/* animated shimmer overlay */}
      <motion.div
        variants={shimmerVariants}
        animate="animate"
        className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,rgba(88,166,255,0.04)_0%,rgba(255,94,91,0.04)_33%,rgba(255,195,113,0.04)_66%,rgba(88,166,255,0.04)_100%)] bg-[length:300%_300%]" />

      {/* blobby shapes + subtle grid */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* dotted grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:22px_22px] opacity-5" />

        {/* colourful motion blobs */}
        <motion.div
          variants={blobVariants}
          animate="animate"
          className="absolute -top-24 -left-24 w-[65vw] h-[65vw] rounded-full opacity-25 blur-3xl bg-[conic-gradient(from_0deg,#58a6ff_20%,#ff5e5b_50%,#ffc371_80%,#58a6ff_100%)]" />
        <motion.div
          variants={blobVariants}
          animate="animate"
          className="absolute bottom-0 right-0 w-[50vw] h-[50vw] rounded-full opacity-15 blur-3xl bg-[conic-gradient(from_90deg,#ff5e5b_10%,#58a6ff_50%,#ffc371_90%,#ff5e5b_100%)]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
          className="text-center text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-brand-blue via-sky-300 to-brand-blue bg-clip-text text-transparent"
        >
          About&nbsp;me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.75 }}
          viewport={{ once: true }}
          className="mt-9 mx-auto max-w-3xl text-center text-xl md:text-2xl text-white/80 leading-relaxed"
        >
          I’m <span className="font-semibold text-brand-blue">Pau&nbsp;Mateu</span> – DevOps addict, cloud tinkerer and relentless automation evangelist.
          My toolkit turns chaotic deployments into seamless delivery pipelines. Off‑hours? I craft API integrations, learn languages and hunt the perfect espresso.
        </motion.p>

        <ul className="mt-24 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map(({ Icon, title, blurb }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 45, rotateX: -12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.07, rotateX: 3, rotateY: -4 }}
              className="group rounded-3xl p-8 bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transition-transform">
              <Icon className="w-12 h-12 text-brand-blue drop-shadow-[0_0_8px_#58a6ff90] group-hover:scale-110 transition-transform" />
              <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-white/70 leading-relaxed text-sm">{blurb}</p>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* ——— bottom fade into next section ——— */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none select-none bg-gradient-to-t from-[#0b1018] via-[#0d141d]/80 to-transparent" />
    </section>
  )
}
