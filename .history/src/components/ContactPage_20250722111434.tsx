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
  Send,
  Phone,
} from 'lucide-react'

// simple sleep helper
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

export default function ContactPage() {
  const [sent, setSent]    = useState(false)
  const [loading, setLoad] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoad(true)
    // TODO → wire up your /api/contact call here
    await sleep(1500)
    setSent(true)
    setLoad(false)
  }

  return (
    <>
      {/* 1) Load Cal.com embed helper */}
      <Script src="https://assets.cal.com/embed.js" strategy="afterInteractive" />

      <main className="relative min-h-screen px-4 md:px-10 py-32 bg-gradient-to-br from-[#0b0f19] via-[#0c101b] to-[#0f111a] text-white flex flex-col gap-28">
        {/* Header */}
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
            Drop me a line or pick a time on my calendar – I’ll reply within 24 h.
          </p>
        </motion.header>

        {/* Two‑column layout */}
        <motion.section
          initial={{ opacity: 0, scale: .97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .6, ease: 'easeOut' }}
          className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12"
        >
          {/* LEFT: Cal.com inline widget */}
          <aside className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-10">
            <div
              data-cal="pau-mateu-gmdp11/30min"
              data-cal-embed="inline"
              style={{ width: '100%', minHeight: '500px' }}
            />
          </aside>

          {/* RIGHT: fallback contact form */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-10">
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
                  {['Name','Email'].map(label => (
                    <div key={label} className="relative">
                      <input
                        required
                        type={label === 'Email' ? 'email' : 'text'}
                        placeholder=" "
                        className="peer w-full rounded-md bg-transparent border border-white/15 px-4 py-3 text-sm
                                   focus:outline-none focus:ring-2 focus:ring-brand-blue/60 placeholder-transparent"
                      />
                      <label className="absolute left-4 top-2 text-xs text-white/50 transition-all
                                        peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/30
                                        peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-blue">
                        {label}
                      </label>
                    </div>
                  ))}

                  <div className="relative">
                    <textarea
                      required rows={5} placeholder=" "
                      className="peer w-full rounded-md bg-transparent border border-white/15 px-4 py-3 text-sm
                                 focus:outline-none focus:ring-2 focus:ring-brand-blue/60 placeholder-transparent"
                    />
                    <label className="absolute left-4 top-2 text-xs text-white/50 transition-all
                                      peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/30
                                      peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-blue">
                      Message
                    </label>
                  </div>

                  <button
                    type="submit" disabled={loading}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 font-semibold rounded-md text-sm
                               bg-gradient-to-r from-brand-blue to-brand-coral hover:opacity-90 transition disabled:opacity-50"
                  >
                    {loading ? 'Sending…' : <><Send size={16}/> Send Message</>}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: .5, ease: 'easeOut' }}
                  className="text-center flex flex-col items-center justify-center h-full"
                >
                  <h3 className="text-2xl font-semibold text-brand-blue">Thank you! 🚀</h3>
                  <p className="text-white/70 mt-2 max-w-sm">
                    I’ll be in touch soon.
                  </p>
                  <Link href="/" className="mt-6 text-sm font-medium text-brand-coral hover:underline">
                    ← Back to home
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </main>
    </>
  )
}
