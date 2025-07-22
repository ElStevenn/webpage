'use client'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'

const parent = {
  hidden:{ opacity:0 },
  show:{ opacity:1, transition:{ staggerChildren:.12 } }
}
const fadeUp = {
  hidden:{ opacity:0, y:32, filter:'blur(10px)' },
  show:{ opacity:1, y:0, filter:'blur(0px)', transition:{ duration:.8, ease:'easeOut'} }
}

export default function AboutSection() {
  const secRef = useRef<HTMLDivElement|null>(null)
  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ["start 85%","end 20%"]
  })
  const clip = useTransform(scrollYProgress, [0,1], [
    'polygon(0 0, 100% 0, 100% 0, 0 0)',
    'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
  ])
  const bgOpacity = useTransform(scrollYProgress, [0,1],[0.15,1])

  return (
    <section id="about" ref={secRef} className="relative py-40 px-6">
      {/* Reveal panel */}
      <motion.div
        style={{ clipPath:clip }}
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          style={{ opacity:bgOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-[#101a25] to-[#0d1117]"
        />
        <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_18%_30%,rgba(88,166,255,0.28),transparent_60%),radial-gradient(circle_at_82%_70%,rgba(247,129,102,0.25),transparent_60%)]" />
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.13] bg-[repeating-linear-gradient(125deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_10px)]" />
      </motion.div>

      {/* Animated vertical line (parallax) */}
      <motion.div
        style={{ scaleY: useTransform(scrollYProgress,[0,1],[0,1]) }}
        className="origin-top absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-brand-blue via-white/60 to-brand-coral/70 pointer-events-none"
      />

      <motion.div
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once:true, amount:0.4 }}
        className="relative max-w-6xl mx-auto flex flex-col lg:flex-row gap-16"
      >
        {/* Profile / stats */}
        <motion.div variants={fadeUp} className="relative w-full max-w-sm mx-auto lg:mx-0">
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-brand-blue/15 via-[#142132] to-brand-coral/15">
            <div className="absolute inset-0 flex items-center justify-center font-bold tracking-widest text-5xl text-white/10 select-none">
              PAU
            </div>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.18),transparent_65%)] mix-blend-overlay" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { k:'Experience', v:'5+ yrs' },
              { k:'Projects', v:'20+' },
              { k:'Prod. Uptime', v:'99.9%' },
            ].map(x=>(
              <div key={x.k} className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm py-3 text-center">
                <div className="text-brand-blue font-semibold text-sm">{x.v}</div>
                <div className="text-[0.6rem] tracking-wider text-white/50 uppercase">{x.k}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Text */}
        <motion.div variants={fadeUp} className="flex-1 max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="mt-6 space-y-5 text-[0.95rem] leading-relaxed text-white/70">
            <p>
              I specialize in building **robust cloud & platform foundations** that empower teams to ship fast with confidence while keeping reliability and security uncompromised.
            </p>
            <p>
              My focus spans <span className="text-white/90 font-medium">Infrastructure as Code</span>, pragmatic security, SRE culture and ruthless automation to eliminate toil, reduce MTTR and harden attack surfaces.
            </p>
            <p>
              I enjoy turning chaotic, fragile systems into **deterministic, observable, self‑healing architectures** using immutable patterns, event‑driven design and least‑privilege principles.
            </p>
          </div>

          <motion.ul variants={parent} className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Infrastructure as Code (Terraform, Pulumi, CDK)',
              'Kubernetes Platform Hardening',
              'Observability: Prometheus, Loki, Tempo, OpenTelemetry',
              'Secure Supply Chain (SBOM, signing, provenance)',
              'GitOps & Progressive Delivery (Argo, Flagger)',
              'Incident Response, Chaos & SLO Engineering'
            ].map(item=>(
              <motion.li
                key={item}
                variants={fadeUp}
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
