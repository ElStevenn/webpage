// src/app/contact/page.tsx – super‑charged contact hub ✨
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Mail, Github, Linkedin, Twitter, Send, Phone, Download, Calendar
} from 'lucide-react'

/* ------------------------------------------------- */
/* utility for fake submit */
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
/* ------------------------------------------------- */

export default function ContactPage() {
  const [sent, setSent]     = useState(false)
  const [loading, setLoad]  = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoad(true)
    await sleep(1500) // TODO wire your API here
    setSent(true)
    setLoad(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0b0f19] to-[#0f111a] text-white px-4 md:px-10 py-28 flex flex-col gap-24">
      {/* —————————————————  Hero  ————————————————— */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .7, ease: 'easeOut' }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent">
          Get in touch
        </h1>
        <p className="mt-4 text-white/70 text-lg md:text-xl">
          Whether you have an idea, a problem that needs solving or just want to chat – my inbox is always open.
        </p>
      </motion.div>

      {/* ————————————— 2‑column contact hub ————————————— */}
      <motion.section
        initial={{ opacity: 0, scale: .97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .6, ease: 'easeOut' }}
        className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12"
      >
        {/* —— left: profile & quick links —— */}
        <aside className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md p-10 flex flex-col justify-between">
          {/* floating gradient blobs */}
          <div className="absolute -inset-20 bg-[radial-gradient(ellipse_at_top_left,rgba(88,166,255,0.25),transparent_60%)]" />
          <div className="relative z-10 flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-bold">Pau Mateu</h2>
              <p className="text-brand-blue/80 font-mono text-sm mt-1">DevOps · SRE · Backend</p>
            </div>

            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 cursor-pointer hover:text-brand-blue transition" onClick={() => navigator.clipboard.writeText('pau@example.com')}>
                <Mail size={18} /> pau@example.com <span className="ml-auto text-[11px] text-brand-coral/70">copy</span>
              </li>
              <li className="flex items-center gap-3"><Phone size={18}/> +34 600 123 456</li>
              <li className="flex items-center gap-3"><Github size={18}/> <Link href="https://github.com/pau" className="underline">github.com/pau</Link></li>
              <li className="flex items-center gap-3"><Linkedin size={18}/> <Link href="https://linkedin.com/in/pau" className="underline">linkedin.com/in/pau</Link></li>
              <li className="flex items-center gap-3"><Twitter size={18}/> <Link href="https://x.com/pau" className="underline">@pau</Link></li>
            </ul>

            <div className="flex flex-wrap gap-3 pt-6">
              <Link href="/cv.pdf" target="_blank" className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-md bg-white/10 border border-white/15 hover:bg-white/15">
                <Download size={14}/> Download CV
              </Link>
              <Link href="https://cal.com/pau/30min" target="_blank" className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-md bg-gradient-to-r from-brand-blue to-brand-coral">
                <Calendar size={14}/> Book a call
              </Link>
            </div>
          </div>
        </aside>

        {/* —— right: animated form —— */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md p-10">
          <AnimatePresence mode="wait" initial={false}>
            {!sent ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: .5, ease: 'easeOut' }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {[
                  { label: 'Name',   type: 'text',  placeholder: 'John Doe' },
                  { label: 'Email',  type: 'email', placeholder: 'you@example.com' }
                ].map(f => (
                  <div key={f.label} className="relative">
                    <input
                      required
                      type={f.type}
                      placeholder=" "
                      className="peer w-full rounded-md bg-transparent border border-white/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/60 placeholder-transparent"
                    />
                    <label className="absolute left-4 top-2 text-xs text-white/50 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/30 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-blue">
                      {f.label}
                    </label>
                  </div>
                ))}

                {/* message */}
                <div className="relative">
                  <textarea
                    required
                    rows={5}
                    placeholder=" "
                    className="peer w-full rounded-md bg-transparent border border-white/15 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/60 placeholder-transparent"
                  />
                  <label className="absolute left-4 top-2 text-xs text-white/50 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/30 peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-blue">
                    Message
                  </label>
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 font-semibold rounded-md text-sm bg-gradient-to-r from-brand-blue to-brand-coral hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? 'Sending…' : (<><Send size={16}/>Send Message</>)}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="thank"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: .5, ease: 'easeOut' }}
                className="text-center flex flex-col items-center justify-center h-full"
              >
                <h3 className="text-2xl font-semibold text-brand-blue">Thank you! 🚀</h3>
                <p className="text-white/70 mt-2 max-w-sm">Your message has been sent successfully. I’ll reply as soon as possible.</p>
                <Link href="/" className="mt-6 text-sm font-medium text-brand-coral hover:underline">← Back to home</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* ——————————————————  FAQ  —————————————————— */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: .2 }}
        transition={{ duration: .6, ease: 'easeOut' }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent">Frequently asked</h2>
        <details className="border border-white/10 rounded-lg p-4 mb-3 bg-white/5 [&_summary]:cursor-pointer">
          <summary className="font-medium">Do you work with startups or only large companies?</summary>
          <p className="mt-2 text-sm text-white/70">I love helping early‑stage teams as much as enterprise clients – the challenge is what matters.</p>
        </details>
        <details className="border border-white/10 rounded-lg p-4 mb-3 bg-white/5">
          <summary className="font-medium">What’s your typical response time?</summary>
          <p className="mt-2 text-sm text-white/70">Within 24 hours during weekdays, often much faster.</p>
        </details>
        <details className="border border-white/10 rounded-lg p-4 bg-white/5">
          <summary className="font-medium">Can we schedule a discovery call first?</summary>
          <p className="mt-2 text-sm text-white/70">Absolutely. Use the “Book a call” button above and pick a slot that suits you.</p>
        </details>
      </motion.section>
    </main>
  )
}
