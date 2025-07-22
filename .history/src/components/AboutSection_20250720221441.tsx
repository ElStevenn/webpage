'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import PipelineFX from './PipelineFX'

const staggerParent = {
  hidden:{ opacity:0 },
  show:{ opacity:1, transition:{ staggerChildren:.11, delayChildren:.15 } }
}
const fadeItem = {
  hidden:{ opacity:0, y:30, filter:'blur(10px)' },
  show:{ opacity:1, y:0, filter:'blur(0)', transition:{ duration:.7, ease:'easeOut' } }
}

export default function AboutSection() {
  const rootRef = useRef<HTMLDivElement|null>(null)
  const inView = useInView(rootRef, { once:true, margin:'-10% 0px -10% 0px' })

  return (
    <section
      id="about"
      ref={rootRef}
      className="relative pt-36 pb-44 px-6 overflow-hidden"
    >
      {/* Background fusion */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-[#101a24] to-[#0d1117]" />
        <div className="absolute inset-0 opacity-[0.16] bg-[radial-gradient(circle_at_12%_28%,rgba(88,166,255,0.35),transparent_60%),radial-gradient(circle_at_85%_72%,rgba(247,129,102,0.28),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay bg-[repeating-linear-gradient(120deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_9px)]" />
        {/* Mask fade top */}
        <div className="absolute -top-32 left-0 right-0 h-32 pointer-events-none
          bg-gradient-to-b from-[#0d1117] to-transparent" />
        <PipelineFX />
      </div>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16"
      >
        {/* Panel / Stats */}
        <motion.div variants={fadeItem} className="relative w-full max-w-sm mx-auto lg:mx-0">
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-brand-blue/12 via-[#142132] to-brand-coral/12">
            <div className="absolute inset-0 flex items-center justify-center font-bold tracking-widest text-5xl text-white/10 select-none">
              PAU
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.20),transparent_70%)] mix-blend-overlay" />
            <div className="absolute -inset-px rounded-2xl pointer-events-none shadow-[0_0_40px_-10px_rgba(88,166,255,0.35)]" />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { k:'Experience', v:'5+ yrs' },
              { k:'Projects', v:'20+' },
              { k:'Prod Uptime', v:'99.9%' },
            ].map(x=>(
              <div key={x.k} className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm py-3 text-center">
                <div className="text-brand-blue font-semibold text-sm">{x.v}</div>
                <div className="text-[0.6rem] tracking-wider text-white/50 uppercase">{x.k}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Texto */}
        <motion.div variants={fadeItem} className="flex-1 max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="mt-6 space-y-5 text-[0.95rem] leading-relaxed text-white/70">
            <p>
              I specialize in building <strong className="text-white/90">robust cloud & platform foundations</strong> that let teams ship fast with confidence while keeping reliability and security uncompromised.
            </p>
            <p>
              My focus spans <strong className="text-white/90">Infrastructure as Code</strong>, pragmatic security, SRE culture and ruthless automation to eliminate toil, reduce MTTR and harden attack surfaces.
            </p>
            <p>
              I enjoy turning chaotic, fragile systems into <strong className="text-white/90">deterministic, observable, self‑healing architectures</strong> using immutable patterns, event‑driven design and least‑privilege principles.
            </p>
          </div>

          <motion.ul
            variants={staggerParent}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              'Infrastructure as Code (Terraform, Pulumi, CDK)',
              'Kubernetes Platform Hardening',
              'Observability (Prometheus, Loki, Tempo, OpenTelemetry)',
              'Secure Supply Chain (SBOM, signing, provenance)',
              'GitOps & Progressive Delivery (Argo, Flagger)',
              'Incident Response, Chaos & SLO Engineering'
            ].map(item=>(
              <motion.li
                key={item}
                variants={fadeItem}
                className="flex items-start gap-3 text-sm text-white/70 bg-white/5 rounded-lg p-3 border border-white/10 hover:border-brand-blue/40 transition-colors group"
              >
                <span className="mt-1 w-2 h-2 rounded-full bg-gradient-to-br from-brand-blue to-brand-coral shadow-[0_0_8px_-1px_rgba(88,166,255,0.8)] group-hover:scale-125 transition-transform" />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  )
}
