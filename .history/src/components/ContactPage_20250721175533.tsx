// src/app/contact/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Github, Linkedin, Send } from 'lucide-react'

export default function ContactPage() {
  const [sent, setSent]   = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: connect to email API
    setTimeout(() => { setLoading(false); setSent(true) }, 1500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0b0f19] to-[#0f111a] text-white px-6 py-24 flex items-center justify-center">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-5xl grid md:grid-cols-2 gap-10"
      >
        {/* Contact profile / links */}
        <div className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-brand-blue via-white to-brand-coral bg-clip-text text-transparent">Let’s connect</h2>
            <p className="mt-3 text-white/70 text-sm leading-relaxed">
              I’m open for freelance gigs, consulting or just a friendly chat. Drop a message or reach me on social media.
            </p>
          </div>

          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3 text-white/80">
              <Mail size={18} className="text-brand-blue" /> pau@example.com
            </li>
            <li className="flex items-center gap-3 text-white/80">
              <Github size={18} className="text-brand-blue" /> github.com/pau
            </li>
            <li className="flex items-center gap-3 text-white/80">
              <Linkedin size={18} className="text-brand-blue" /> linkedin.com/in/pau
            </li>
          </ul>
        </div>

        {/* Form */}
        <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-white/70">Name</label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  className="rounded-md bg-transparent border border-white/15 px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/60"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-white/70">Email</label>
                <input
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-md bg-transparent border border-white/15 px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/60"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-white/70">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Let's build something amazing together..."
                  className="rounded-md bg-transparent border border-white/15 px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-blue/60"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 w-full py-2 font-semibold rounded-md text-sm text-white bg-gradient-to-r from-brand-blue to-brand-coral hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Sending…' : (<><Send size={16}/>Send Message</>)}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: .5, ease: 'easeOut' }}
              className="text-center"
            >
              <h3 className="text-2xl font-semibold text-brand-blue">Thanks for reaching out 🚀</h3>
              <p className="text-white/60 mt-2">I'll reply as soon as possible.</p>
              <Link href="/" className="inline-block mt-6 text-sm font-medium text-brand-coral hover:underline">
                ← Back to home
              </Link>
            </motion.div>
          )}
        </div>
      </motion.section>
    </main>
  )
}