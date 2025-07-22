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

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

export default function ContactPage() {
  const [sent, setSent]    = useState(false)
  const [loading, setLoad] = useState(false)

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
      {/* 1️⃣ Load Cal.com’s embed script */}
      <Script
        src="https://assets.cal.com/embed.js"
        strategy="afterInteractive"
      />

      <main className="relative min-h-screen flex flex-col gap-28 bg-gradient-to-br from-[#0b0f19] via-[#0c101b] to-[#0f111a] text-white
                       px-4 md:px-10 py-32 overflow-hidden">

        {/* … your header here … */}

        <motion.section
          initial={{ opacity:0, scale:.97 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ duration:.6, ease:'easeOut' }}
          className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12"
        >
          {/* — LEFT CARD: Profile + Calendar */}
          <aside className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-10 flex flex-col justify-between">
            {/* … your avatar & links … */}

            {/* 👉 Inline embed of exactly the 30‑min event */}
            <div className="pt-6">
              <div
                data-cal="pau-mateu-gmdp11/30min"
                data-cal-embed="inline"
                style={{ width: '100%', minHeight: '500px' }}
              />
            </div>
          </aside>

          {/* — RIGHT CARD: Contact form */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-10">
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
                    { name:'Email', type:'email', placeholder:'you@example.com' },
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

        {/* … FAQ … */}

      </main>
    </>
  )
}
