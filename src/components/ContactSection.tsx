// src/app/contact/page.tsx – nicer “Book a call” button + FAQ back
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Mail, Github, Linkedin, Twitter, Calendar, Send, Phone } from 'lucide-react'

const sleep = (ms:number) => new Promise(r=>setTimeout(r,ms))

export default function ContactPage() {
  const [sent, setSent]         = useState(false)
  const [loading, setLoad]      = useState(false)
  const [project, setProject]   = useState('')
  const [copied, setCopied]     = useState(false)
  const [calendarOpen, setOpen] = useState(false)

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault(); setLoad(true)
    await sleep(1500)
    setSent(true); setLoad(false)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('pau@example.com')
    setCopied(true)
    setTimeout(()=>setCopied(false),1500)
  }

  return (
    <main className="relative min-h-screen flex flex-col gap-28 bg-gradient-to-br from-[#0b0f19] via-[#0c101b] to-[#0f111a] text-white px-4 md:px-10 py-32 overflow-hidden">
      {/* swirling bg */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-1 blur-[120px] opacity-20 bg-[conic-gradient(from_20deg,theme(colors.brand-blue),theme(colors.brand-coral),transparent_70%)] animate-[spin_18s_linear_infinite]" />
      </div>

      {/* hero */}
      <motion.header initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:.8,ease:'easeOut'}} className="mx-auto max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent">Let’s Talk <span className="animate-pulse">👋</span></h1>
        <p className="mt-4 text-white/70 text-lg md:text-xl">Drop me a line, share an idea, or just say hi – I reply within 24h.</p>
      </motion.header>

      {/* hub */}
      <motion.section initial={{opacity:0,scale:.97}} animate={{opacity:1,scale:1}} transition={{duration:.6,ease:'easeOut'}} className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* profile card */}
        <aside className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg p-10 flex flex-col justify-between">
          <div className="absolute -inset-24 bg-[radial-gradient(circle_at_top_left,rgba(88,166,255,0.25),transparent_60%)]" />

          <div className="relative z-10 flex flex-col gap-6">
            {/* avatar & name */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-coral p-[2px]">
                <img src="/avatar.jpg" alt="Pau" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Pau Mateu</h2>
                <p className="text-brand-blue/80 text-xs font-mono">DevOps · SRE · Backend</p>
              </div>
            </div>

            {/* links */}
            <ul className="space-y-4 text-sm mt-2">
              <li onClick={copyEmail} className="flex items-center gap-3 cursor-pointer hover:text-brand-blue/90 transition">
                <Mail size={18}/> pau@example.com {copied && <span className="text-[11px] text-brand-coral">Copied!</span>}
              </li>
              <li className="flex items-center gap-3"><Phone size={18}/> +34 600 123 456</li>
              <li className="flex items-center gap-3"><Github size={18}/> <Link href="https://github.com/pau" className="underline">github.com/pau</Link></li>
              <li className="flex items-center gap-3"><Linkedin size={18}/> <Link href="https://linkedin.com/in/pau" className="underline">linkedin.com/in/pau</Link></li>
              <li className="flex items-center gap-3"><Twitter size={18}/> <Link href="https://x.com/pau" className="underline">@pau</Link></li>
            </ul>

            {/* book‑a‑call button */}
            <button onClick={()=>setOpen(true)} className="mt-8 w-full inline-flex items-center justify-center gap-2 py-3 font-semibold rounded-md bg-gradient-to-r from-brand-blue via-[#4e8edb] to-brand-coral shadow-[0_4px_20px_-5px_rgba(88,166,255,0.45)] hover:shadow-[0_6px_25px_-4px_rgba(88,166,255,0.6)] transition">
              <Calendar size={16}/> Book a call
            </button>
          </div>
        </aside>

        {/* form card */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg p-10">
          <AnimatePresence mode="wait" initial={false}>
          {!sent ? (
            <motion.form key="f" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} transition={{duration:.5,ease:'easeOut'}} onSubmit={handleSubmit} className="space-y-6">
              {['Name','Email'].map(label=> (
                <div key={label} className="relative">
                  <input required type={label==='Email'?'email':'text'} placeholder=" " className="peer w-full rounded-md bg-transparent border border-white/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/60 placeholder-transparent" />
                  <label className="absolute left-4 top-2 text-xs text-white/50 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/30 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-blue">{label}</label>
                </div>
              ))}
              <select required value={project} onChange={e=>setProject(e.target.value)} 
                className="w-full rounded-md bg-[#181c23] border border-white/15 px-4 py-3 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-brand-blue/60 appearance-none relative pr-10"
                style={{backgroundImage: `url('data:image/svg+xml;utf8,<svg fill=\'white\' height=\'20\' viewBox=\'0 0 20 20\' width=\'20\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z\'/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.25em 1.25em'}}
              >
                <option value="" disabled className="bg-[#232834] text-white/60">Project type</option>
                <option value="devops" className="bg-[#232834] text-white">DevOps automation</option>
                <option value="k8s" className="bg-[#232834] text-white">Kubernetes architecture</option>
                <option value="backend" className="bg-[#232834] text-white">Backend API</option>
                <option value="consult" className="bg-[#232834] text-white">Consulting / Audit</option>
              </select>
              <div className="relative">
                <textarea required rows={5} placeholder=" " className="peer w-full rounded-md bg-transparent border border-white/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/60 placeholder-transparent"></textarea>
                <label className="absolute left-4 top-2 text-xs text-white/50 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/30 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-blue">Message</label>
              </div>
              <button disabled={loading} type="submit" className="inline-flex items-center justify-center gap-2 w-full py-3 font-semibold rounded-md text-sm bg-gradient-to-r from-brand-blue to-brand-coral hover:opacity-90 transition disabled:opacity-50">
                {loading ? 'Sending…' : (<><Send size={16}/> Send Message</>)}
              </button>
            </motion.form>
          ) : (
            <motion.div key="t" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-30}} transition={{duration:.5,ease:'easeOut'}} className="text-center flex flex-col items-center justify-center h-full">
              <h3 className="text-2xl font-semibold text-brand-blue">Thank you! 🚀</h3>
              <p className="text-white/70 mt-2 max-w-sm">Your message was sent successfully. I’ll reply as soon as possible.</p>
              <Link href="/" className="mt-6 text-sm font-medium text-brand-coral hover:underline">← Back to home</Link>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.6,ease:'easeOut'}} className="max-w-5xl mx-auto mt-20 px-0 md:px-2">
        <div className="flex items-center gap-3 mb-8">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-brand-blue"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 20v-2m0-2a6 6 0 1 0-6-6"/><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/></svg>
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent">Frequently asked</h2>
        </div>
        <div className="flex flex-col gap-5">
        {[
          ['Do you work with startups or only large companies?','I love helping early‑stage teams just as much as enterprise clients – the challenge is what matters.'],
          ['What’s your typical response time?','Within 24 hours during weekdays, often quicker.'],
          ['Can we schedule a discovery call first?','Absolutely. Hit the “Book a call” button above and pick any slot that suits you.']
        ].map(([q,a],i)=> (
          <details key={q} className="w-full group rounded-xl border border-white/10 bg-white/10 p-6 shadow-lg transition-all duration-300 hover:border-brand-blue/40 focus-within:border-brand-blue/60">
            <summary className="flex items-center font-semibold text-lg cursor-pointer select-none outline-none focus:text-brand-blue transition-colors">
              <span className="flex-1">{q}</span>
              <svg className="ml-2 w-5 h-5 text-brand-blue transition-transform duration-300 group-open:rotate-90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </summary>
            <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} transition={{duration:.3}} className="overflow-hidden">
              <p className="mt-3 text-base text-white/80 leading-relaxed pl-1 pr-2 pb-1">{a}</p>
            </motion.div>
          </details>
        ))}
        </div>
      </motion.section>

      {/* calendar modal */}
      <AnimatePresence>
        {calendarOpen && (
          <motion.div key="modal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div initial={{scale:.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.9,opacity:0}} transition={{duration:.3}} className="relative w-full max-w-3xl aspect-video bg-[#0e111b] rounded-2xl overflow-hidden shadow-xl">
              <iframe src="https://cal.com/pau/30min" className="w-full h-full border-none" />
              <button onClick={()=>setOpen(false)} className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl leading-none">×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
