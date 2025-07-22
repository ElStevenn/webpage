// src/app/contact/page.tsx   (Next.js App Router)
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ContactPage() {
  const [sent, setSent]   = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: replace with real API call
    setTimeout(() => { setLoading(false); setSent(true) }, 1500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0b0f19] to-[#0f111a] 
                     text-white px-6 py-24 flex flex-col items-center justify-center">
      {/* headline */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold 
                       bg-gradient-to-r from-brand-blue via-white to-brand-coral 
                       bg-clip-text text-transparent">
          Let&apos;s work together
        </h1>
        <p className="mt-4 text-white/70 text-lg">
          Got an idea? A project? Or just want to say hi? Drop me a line and I’ll get back to you.
        </p>
      </motion.div>

      {/* form / success block */}
      {!sent ? (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: .2, duration: .5, ease: 'easeOut' }}
          className="mt-12 w-full max-w-xl space-y-6 bg-white/5 backdrop-blur-lg 
                     p-8 rounded-xl border border-white/10"
        >
          {/* Name */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-white/70">Name</label>
            <input
              required
              type="text"
              placeholder="John Doe"
              className="rounded-md bg-white/10 border border-white/10 px-4 py-2 
                         text-sm text-white placeholder-white/30 focus:outline-none 
                         focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-white/70">Email</label>
            <input
              required
              type="email"
              placeholder="you@example.com"
              className="rounded-md bg-white/10 border border-white/10 px-4 py-2 
                         text-sm text-white placeholder-white/30 focus:outline-none 
                         focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-white/70">Message</label>
            <textarea
              required
              rows={5}
              placeholder="Let's build something amazing together..."
              className="rounded-md bg-white/10 border border-white/10 px-4 py-2 
                         text-sm text-white placeholder-white/30 focus:outline-none 
                         focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 font-semibold rounded-md text-sm text-white 
                       bg-gradient-to-r from-brand-blue to-brand-coral 
                       hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Sending…' : 'Send Message'}
          </button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .5, ease: 'easeOut' }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-semibold text-brand-blue">
            Thanks for reaching out 🚀
          </h2>
          <p className="text-white/60 mt-2">
            I&apos;ll reply to you as soon as possible.
          </p>
          <Link href="/" className="inline-block mt-6 text-sm font-medium 
                                   text-brand-coral hover:underline">
            ← Back to home
          </Link>
        </motion.div>
      )}
    </main>
  )
}
