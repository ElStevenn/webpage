'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiLightningBolt, HiShieldCheck, HiChartBar, HiServer } from 'react-icons/hi'

/** Pasos del workflow  ---------------------------------- */
const STEPS = [
  {
    id: 'iac',
    icon: <HiServer className="w-7 h-7" />,
    title: 'Infrastructure as Code',
    blurb: 'Terraform modules bootstrap multi‑env stacks in minutes.',
    details: 'Reusable modules, policy‑as‑code (OPA), remote state locking and CI‑driven plans.'
  },
  {
    id: 'cicd',
    icon: <HiLightningBolt className="w-7 h-7" />,
    title: 'CI / CD Pipeline',
    blurb: 'GitHub Actions builds, tests & pushes containers.',
    details: 'Parallel test matrix, SBOM signing, multi‑arch images and progressive rollout with Argo Rollouts.'
  },
  {
    id: 'security',
    icon: <HiShieldCheck className="w-7 h-7" />,
    title: 'Security Automation',
    blurb: 'Secrets rotation & zero‑trust policies.',
    details: 'HashiCorp Vault, workload identity, auto‑patch & CVE scanning on every merge.'
  },
  {
    id: 'observability',
    icon: <HiChartBar className="w-7 h-7" />,
    title: 'Observability',
    blurb: 'Metrics, traces & SLO‑driven alerts.',
    details: 'Prometheus, Loki, Tempo & Grafana dashboards wired to PagerDuty with error budgets.'
  }
] as const

/** Variants ------------------------------------------------- */
const container = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: .09 } }
}
const card = {
  hidden: { opacity: 0, y: 40, scale: .95 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: .65, ease: 'easeOut' } }
}

export default function AutomationPipelineSection() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section id="workflow" className="relative py-32 md:py-40 px-6 overflow-hidden">
      {/* fondo muy suave */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-[#0f151d] to-[#0d1117]" />
        <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle_at_50%_30%,rgba(88,166,255,0.35),transparent_60%)]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2
          variants={card}
          className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r
                     from-brand-blue via-white to-brand-coral bg-clip-text text-transparent"
        >
          How I Automate a Work&nbsp;Environment
        </motion.h2>

        {/* Grid de pasos */}
        <motion.div
          variants={container}
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {STEPS.map(step => (
            <motion.button
              key={step.id}
              variants={card}
              whileHover={{ y: -8, rotateX: 8, rotateY: -8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 16 }}
              onClick={() => setOpen(open === step.id ? null : step.id)}
              className={`group relative rounded-xl border border-white/10
                          bg-white/[0.04] p-6 backdrop-blur-md text-left
                          hover:border-brand-blue/50 transition-colors
                          ${open === step.id ? 'ring-2 ring-brand-blue/60' : ''}`}
            >
              {/* aura glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                              bg-[radial-gradient(circle_at_30%_20%,rgba(88,166,255,0.14),transparent_70%)] pointer-events-none"/>
              <div className="flex items-center gap-3">
                <span className="text-brand-blue">{step.icon}</span>
                <h3 className="font-semibold text-white/90">{step.title}</h3>
              </div>
              <p className="mt-3 text-sm text-white/60">{step.blurb}</p>

              {/* panel expandible */}
              <AnimatePresence>
                {open === step.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: .35 }}
                    className="mt-4 rounded-lg border border-white/10 bg-[#0f1a25]/80 p-4 text-xs leading-relaxed text-white/70"
                  >
                    {step.details}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
