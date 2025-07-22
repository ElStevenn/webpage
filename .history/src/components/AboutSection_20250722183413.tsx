// About me – vivid depth & contrast with wave divider
'use client'

import { motion, Variants } from 'framer-motion'
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

function Stars() {
  const layers = Array.from({ length: 3 })
  return (
    <>
      {layers.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.6, 0], x: ['0%', '40%', '-30%', '0%'] }}
          transition={{ duration: 120 - i * 20, repeat: Infinity, ease: 'linear' }}
          className={`absolute inset-0 bg-[url('/stars-${i + 1}.png')] bg-repeat opacity-0`}
          style={{ zIndex: -30 - i }}
        />
      ))}
    </>
  )
}

export default function AboutSection() {
  const blobVariants: Variants = {
    animate: {
      x: [0, -120, 60, 0],
      y: [0, -80, 100, 0],
      rotate: [0, 40, -40, 0],
            transition: {
              repeat: Infinity,
                repeatType: 'mirror',
                duration: 34,
                ease: 'easeInOut'
              }
    }
  }

  return (
    <section id="about" className="relative overflow-hidden pt-0 pb-40 md:pb-52 bg-gradient-to-br from-[#0b1219] via-[#0d141d] to-[#091017]">
      {/* ── WAVE DIVIDER OVERLAPPING THE HERO ── */}
      <svg
        className="block w-full h-28 md:h-40 text-[#0d141d] drop-shadow-[0_-4px_8px_rgba(0,0,0,0.4)]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,160C672,181,768,203,864,208C960,213,1056,203,1152,202.7C1248,203,1344,213,1392,218.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>

      {/* parallax stars & fog */}
      <Stars />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18, backgroundPosition: ['0% 0%', '200% 200%'] }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_10%_10%,rgba(88,166,255,0.35),transparent_60%),radial-gradient(circle_at_90%_90%,rgba(255,94,91,0.35),transparent_60%)] bg-[length:300%_300%]" />

      {/* motion blobs */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute -top-32 -left-32 w-[70vw] h-[70vw] rounded-full blur-3xl opacity-25 bg-[conic-gradient(from_var(--a),#58a6ff_10%,#ff5e5b_40%,#ffc371_70%,#58a6ff_100%)]"
        style={{ '--a': '0deg' } as React.CSSProperties} />
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute bottom-0 right-0 w-[55vw] h-[55vw] rounded-full blur-3xl opacity-15 bg-[conic-gradient(from_var(--a),#ff5e5b_10%,#58a6ff_50%,#ffc371_90%,#ff5e5b_100%)]"
        style={{ '--a': '90deg' } as React.CSSProperties} />

      {/* dotted mesh */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-5" />

      <div className="relative container mx-auto px-6 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-brand-blue via-sky-300 to-brand-blue bg-clip-text text-transparent"
        >
          About&nbsp;me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-10 mx-auto max-w-3xl text-center text-xl md:text-2xl text-white/85 leading-relaxed"
        >
          I’m <span className="font-semibold text-brand-blue">Pau&nbsp;Mateu</span> – DevOps addict, cloud tinkerer and relentless automation evangelist.
          My toolkit turns chaotic deployments into seamless delivery pipelines. Off‑hours? I craft API integrations, learn languages and hunt the perfect espresso.
        </motion.p>

        <ul className="mt-24 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map(({ Icon, title, blurb }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group rounded-3xl p-8 bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transition-transform">
              <Icon className="w-12 h-12 text-brand-blue drop-shadow-[0_0_10px_#58a6ff90] group-hover:scale-110 transition-transform" />
              <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-white/70 leading-relaxed text-sm">{blurb}</p>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* fade to next section */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#091017] via-[#0d141d]/80 to-transparent pointer-events-none" />
    </section>
  )
}
