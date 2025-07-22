'use client'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface Skill {
  name:string
  level:number // 0-100
  blurb:string
  core?:boolean
}

const skills:Skill[] = [
  { name:'Kubernetes', level:88, blurb:'Multi-cluster, operators, autoscaling', core:true },
  { name:'Terraform / IaC', level:90, blurb:'Modular, policy as code', core:true },
  { name:'CI/CD & GitOps', level:85, blurb:'Pipelines, progressive rollout', core:true },
  { name:'Observability', level:80, blurb:'Tracing, metrics, SLOs' },
  { name:'Cloud (AWS/GCP)', level:82, blurb:'Networking, cost, security' },
  { name:'Security / Hardening', level:87, blurb:'Zero‑trust, SBOM, secrets' },
  { name:'Python Tooling', level:78, blurb:'Automation, CLIs, services' },
  { name:'Performance', level:76, blurb:'Profiling, load, tuning' },
]

const container = {
  hidden:{ opacity:0 },
  show:{ opacity:1, transition:{ staggerChildren:.09 } }
}
const card = {
  hidden:{ opacity:0, y:28, scale:.96 },
  show:{ opacity:1, y:0, scale:1, transition:{ duration:.65, ease:'easeOut'} }
}

export default function SkillsSection() {
  const core = useMemo(()=>skills.filter(s=>s.core),[])
  const secondary = useMemo(()=>skills.filter(s=>!s.core),[])

  return (
    <section id="skills" className="relative py-32 md:py-40 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-[#0f151d] to-[#0d1117]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_60%_40%,rgba(88,166,255,0.4),transparent_60%)]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once:true, amount:0.3 }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2
          variants={card}
          className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent"
        >
          Skills
        </motion.h2>

        {/* Core wheels */}
        <motion.div
          variants={container}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8"
        >
          {core.map(s=>(
            <motion.div
              key={s.name}
              variants={card}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-32 h-32">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:`conic-gradient(from 270deg, #58A6FF ${s.level}%, rgba(255,255,255,0.12) ${s.level}% 100%)`
                  }}
                />
                <div className="absolute inset-[6px] rounded-full bg-[#0f1923] flex items-center justify-center border border-white/10 shadow-inner">
                  <span className="text-brand-blue font-semibold text-lg">{s.level}%</span>
                </div>
                <div className="absolute inset-0 rounded-full blur-xl opacity-40 bg-[#58A6FF]/20" />
              </div>
              <div className="mt-4 font-semibold text-white/90">{s.name}</div>
              <div className="text-[0.65rem] uppercase tracking-wider text-white/40 mt-1">Core</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Grid secundaria */}
        <motion.div
          variants={container}
          className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {secondary.map(s=>(
            <motion.div
              key={s.name}
              variants={card}
              whileHover={{ y:-6 }}
              className="group relative rounded-xl border border-white/10 bg-white/[0.04] p-5 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_30%_20%,rgba(88,166,255,0.18),transparent_70%)]" />
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white/90 text-sm">{s.name}</h3>
                <span className="text-[0.65rem] font-mono text-brand-blue">{s.level}%</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-white/55">{s.blurb}</p>
              <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-blue via-brand-blue to-brand-coral"
                  style={{ width:`${s.level}%` }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
