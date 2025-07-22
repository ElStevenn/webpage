'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" ref={ref} className="max-w-3xl mx-auto px-6 py-32 scroll-mt-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .6 }}
        className="text-3xl md:text-4xl font-bold mb-8"
      >
        <span className="bg-gradient-to-r from-[#58A6FF] to-[#F78166] bg-clip-text text-transparent">
          Contact
        </span>
      </motion.h2>

      <motion.form
        initial={{ opacity: 0, y: 25 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .7, delay: .1 }}
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        className="space-y-5"
      >
        <div>
          <input
            required
            placeholder="Your email"
            type="email"
            className="w-full rounded-md bg-white/[0.05] border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#58A6FF] transition"
          />
        </div>
        <div>
          <textarea
            required
            placeholder="Message"
            rows={5}
            className="w-full resize-none rounded-md bg-white/[0.05] border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#58A6FF] transition"
          />
        </div>
        <button
          className="px-6 py-3 rounded-md text-xs font-semibold bg-[#58A6FF] hover:bg-[#F78166] active:scale-95 transition"
        >
          {sent ? 'Sent ✓' : 'Send Message'}
        </button>
      </motion.form>
    </section>
  )
}
