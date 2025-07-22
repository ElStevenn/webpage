'use client'
import { motion } from 'framer-motion'

const parent = {
  hidden:{ opacity:0 },
  show:{ opacity:1, transition:{ staggerChildren:.12 } }
}
const fadeUp = {
  hidden:{ opacity:0, y:28, filter:'blur(8px)' },
  show:{ opacity:1, y:0, filter:'blur(0px)', transition:{ duration:.75, ease:'easeOut'} }
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-32 md:py-40 px-6 overflow-hidden"
    >
      {/* Fondo sutil */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-[#101924] to-[#0d1117]" />
        <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay bg-[radial-gradient(circle_at_20%_30%,rgba(88,166,255,0.3),transparent_60%),radial-gradient(circle_at_80%_65%,rgba(247,129,102,0.25),transparent_55%)]" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.18] bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_9px)]" />
      </div>

      <motion.div
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once:true, amount:0.35 }}
        className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16"
      >
        {/* Avatar / Panel */}
        <motion.div
          variants={fadeUp}
          className="relative w-full max-w-sm mx-auto lg:mx-0"
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-brand-blue/10 via-[#142132] to-brand-coral/10">
            {/* placeholder avatar abstracto */}
            <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-white/10 select-none tracking-widest">
              PAU
            </div>
            <div className="absolute -inset-px rounded-2xl pointer-events-none shadow-[0_0_35px_-6px_rgba(88,166,255,0.25)]" />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { k:'Years', v:'+5' },
              { k:'Projects', v:'20+' },
              { k:'Uptime', v:'99.9%' },
            ].map(x=>(
              <div key={x.k} className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm py-3 text-center">
                <div className="text-brand-blue font-semibold text-sm">{x.v}</div>
                <div className="text-[0.6rem] tracking-wider text-white/50 uppercase">{x.k}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Texto principal */}
        <motion.div
          variants={fadeUp}
          className="flex-1 max-w-2xl mx-auto lg:mx-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="mt-6 space-y-5 text-[0.95rem] leading-relaxed text-white/70">
            <p>
              Soy un ingeniero DevOps enfocado en crear plataformas cloud robustas, automatizar
              pipelines de entrega y elevar la observabilidad para reducir MTTR y acelerar ciclos de despliegue.
            </p>
            <p>
              Me muevo entre <span className="text-white/90 font-medium">infraestructura como código</span>,
              <span className="text-white/90 font-medium"> seguridad pragmática</span>, rendimiento y cultura SRE.
              Me obsesiona eliminar toil, endurecer superficies de ataque y medir todo.
            </p>
            <p>
              Disfruto transformar sistemas caóticos en arquitecturas limpias y reproducibles — adoptando
              patrones inmutables, diseños event‑driven y principios de mínima confianza.
            </p>
          </div>

          {/* Lista de focos */}
          <motion.ul
            variants={parent}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {[
              'Infrastructure as Code (Terraform, Pulumi, CDK)',
              'Kubernetes Platform Hardening',
              'Observability: Prometheus, Loki, Tempo, OpenTelemetry',
              'Secure Supply Chain (SBOM, SLSA-lite)',
              'GitOps & Progressive Delivery (Argo, Flagger)',
              'Incident Response & Chaos drills'
            ].map(item=>(
              <motion.li
                key={item}
                variants={fadeUp}
                className="flex items-start gap-3 text-sm text-white/70 bg-white/5 rounded-lg p-3 border border-white/10 hover:border-brand-blue/40 transition-colors"
              >
                <span className="mt-1 w-2 h-2 rounded-full bg-gradient-to-br from-brand-blue to-brand-coral shadow-[0_0_8px_-1px_rgba(88,166,255,0.8)]" />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  )
}
