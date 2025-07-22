// src/app/contact/page.tsx
'use client'

import Script from 'next/script'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Download,
  Calendar,
  Send,
  Phone,
} from 'lucide-react'

/** helper */
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

export default function ContactPage() {
  const [sent, setSent]     = useState(false)
  const [loading, setLoad]  = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoad(true)
    // TODO → call your /api/contact endpoint here
    await sleep(1500)
    setSent(true)
    setLoad(false)
  }

  return (
    <>
      {/* 1️⃣ Load Cal.com embed script */}
      <div
          data-cal="pau/30min"      // ← exactly your slug here
          data-cal-embed="inline"
          style={{ width: '100%', minHeight: '500px' }}
        />


      <main className="relative min-h-screen flex flex-col gap-28 bg-gradient-to-br from-[#0b0f19] via-[#0c101b] to-[#0f111a] text-white
                       px-4 md:px-10 py-32 overflow-hidden">
        {/* floating particles */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -inset-1 blur-[120px] opacity-20 bg-[conic-gradient(from_20deg,theme(colors.brand-blue),theme(colors.brand-coral),transparent_70%)] animate-[spin_18s_linear_infinite]" />
        </div>

        {/* 2️⃣ Header */}
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8, ease: 'easeOut' }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent">
            Let’s Talk <span className="animate-pulse">👋</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg md:text-xl">
            Drop me a line, share an idea, or just say hi – I reply within 24h.
          </p>
        </motion.header>

        {/* 3️⃣ Contact Hub: two‑column */}
        <motion.section
          initial={{ opacity:0, scale:.97 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ duration:.6, ease:'easeOut' }}
          className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12"
        >
          {/* — LEFT CARD: profile + Cal widget */}
          <aside className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg p-10 flex flex-col justify-between">
            {/* avatar + info */}
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-coral p-[2px]">
                  <img src="/avatar.jpg" alt="Pau" className="w-full h-full object-cover rounded-full"/>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Pau Mateu</h2>
                  <p className="text-brand-blue/80 text-xs font-mono">DevOps · SRE · Backend</p>
                </div>
              </div>

              <ul className="space-y-4 text-sm mt-2">
                <li className="flex items-center gap-3 cursor-pointer hover:text-brand-blue transition"
                    onClick={()=>navigator.clipboard.writeText('pau@example.com')}>
                  <Mail size={18}/> pau@example.com
                  <span className="ml-auto text-[10px] text-brand-coral/70">copy</span>
                </li>
                <li className="flex items-center gap-3"><Phone size={18}/> +34 640 123 456</li>
                <li className="flex items-center gap-3"><Github size={18}/> <Link href="https://github.com/ElStevenn" className="underline">github.com/ElStevenn</Link></li>
                <li className="flex items-center gap-3"><Linkedin size={18}/> <Link href="https://linkedin.com/in/pau" className="underline">linkedin.com/in/pau</Link></li>
                <li className="flex items-center gap-3"><Twitter size={18}/> <Link href="https://x.com/pau" className="underline">@pau</Link></li>
              </ul>
            </div>

            {/* — INLINE CAL.COM WIDGET mount point — */}
            <div className="relative z-10 pt-6">
              <div
                data-cal="pau/30min"      {/* ← your event slug */}
                data-cal-embed="inline"   {/* ← inline mode */}
                style={{ minHeight: '500px', width: '100%' }}
              />
            </div>
          </aside>

          {/* — RIGHT CARD: your existing contact form */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg p-10">
            <AnimatePresence mode="wait" initial={false}>
              {!sent ? (
                <motion.form
                  key="form"
                  initial={{ opacity:0, x:40 }}
                  animate={{ opacity:1, x:0 }}
                  exit={{ opacity:0, x:-40 }}
                  transition={{ duration:.5, ease:'easeOut' }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Name & Email */}
                  {[
                    { name:'Name',  type:'text',  placeholder:'Pau Mateu' },
                    { name:'Email', type:'email', placeholder:'you@example.com' }
                  ].map(f=>(
                    <div key={f.name} className="relative">
                      <input
                        required
                        type={f.type}
                        placeholder=" "
                        className="peer w-full rounded-md bg-transparent border border-white/15 px-4 py-3 text-sm
                                   focus:outline-none focus:ring-2 focus:ring-brand-blue/60 placeholder-transparent"
                      />
                      <label className="absolute left-4 top-2 text-xs text-white/50 transition-all
                                        peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/30
                                        peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-blue">
                        {f.name}
                      </label>
                    </div>
                  ))}

                  {/* Project type */}
                  <div className="relative">
                    <select required
                            className="w-full rounded-md bg-transparent border border-white/15 px-4 py-3 text-sm text-white/80
                                       focus:outline-none focus:ring-2 focus:ring-brand-blue/60 appearance-none">
                      <option value="" disabled selected>Project type</option>
                      <option>DevOps automation</option>
                      <option>Kubernetes architecture</option>
                      <option>Backend API</option>
                      <option>Consulting / Audit</option>
                    </select>
                    <span className="absolute right-4 top-3.5 pointer-events-none text-white/40">⌄</span>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <textarea required rows={5} placeholder=" "
                              className="peer w-full rounded-md bg-transparent border border-white/15 px-4 py-3 text-sm
                                         focus:outline-none focus:ring-2 focus:ring-brand-blue/60 placeholder-transparent"/>
                    <label className="absolute left-4 top-2 text-xs text-white/50 transition-all
                                      peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/30
                                      peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-blue">
                      Message
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 font-semibold rounded-md text-sm
                               bg-gradient-to-r from-brand-blue to-brand-coral hover:opacity-90 transition disabled:opacity-50"
                  >
                    {loading ? 'Sending…' : (<><Send size={16}/> Send Message</>)}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity:0, y:30 }}
                  animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-30 }}
                  transition={{ duration:.5, ease:'easeOut' }}
                  className="text-center flex flex-col items-center justify-center h-full"
                >
                  <h3 className="text-2xl font-semibold text-brand-blue">Thank you! 🚀</h3>
                  <p className="text-white/70 mt-2 max-w-sm">
                    Your message was sent successfully. I’ll reply as soon as possible.
                  </p>
                  <Link href="/" className="mt-6 text-sm font-medium text-brand-coral hover:underline">
                    ← Back to home
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* 4️⃣ FAQ */}
        <motion.section
          initial={{ opacity:0, y:40 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, amount:.2 }}
          transition={{ duration:.6, ease:'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent">
            Frequently asked
          </h2>
          {[
            ['Do you work with startups or only large companies?',
             'I love helping early‑stage teams just as much as enterprise clients – the challenge is what matters.'],
            ['What’s your typical response time?',
             'Within 24 hours on weekdays, often faster.'],
            ['Can we schedule a discovery call first?',
             'Absolutely. Use the “Book a call” widget on the left and pick a slot that suits you.']
          ].map(([q,a])=>(
            <details key={q} className="mb-3 rounded-lg border border-white/10 bg-white/5 p-4 [&_summary]:cursor-pointer">
              <summary className="font-medium">{q}</summary>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{a}</p>
            </details>
          ))}
        </motion.section>
      </main>
    </>
  )
}
