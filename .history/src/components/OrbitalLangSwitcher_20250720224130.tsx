'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const LANGS = [
  { code: 'en', flag: '🇬🇧', label: 'English'  },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' },
] as const
type LangCode = typeof LANGS[number]['code']

function useOutside(ref: React.RefObject<HTMLElement>, cb: () => void) {
  useEffect(() => {
    const h = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && cb()
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [cb])
}

export default function OrbitalLangSwitcher({
  value,
  onChange,
  className = '',
}: {
  value: LangCode
  onChange: (c: LangCode) => void
  className?: string
}) {
  /* ---------- estado ---------- */
  const [open, setOpen] = useState(false)
  const wrap = useRef<HTMLDivElement>(null)
  useOutside(wrap, () => setOpen(false))

  /* ---------- persistencia simple ---------- */
  useEffect(() => {
    const stored = localStorage.getItem('lang') as LangCode | null
    if (stored) onChange(stored)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => localStorage.setItem('lang', value), [value])

  /* ---------- hotkey “L” ---------- */
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'l') { e.preventDefault(); setOpen(o => !o) }
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])

  const current = LANGS.find(l => l.code === value)!
  const others  = LANGS.filter(l => l.code !== value)

  return (
    <div ref={wrap} className={`relative ${className}`}>
      {/* Botón central */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10
                   flex items-center justify-center text-lg backdrop-blur-md
                   text-white/80 hover:text-white transition focus:ring-2
                   focus:ring-brand-blue/50"
        title="Press L to change language"
      >
        {current.flag}
      </button>

      {/* Órbita */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ scale: .6, opacity: 0 }}
            animate={{ scale: 1,  opacity: 1 }}
            exit={{   scale: .6, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 360, damping: 26 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-40 h-40 rounded-full pointer-events-auto"
          >
            {others.map((l, i) => {
              const ang = (i / others.length) * Math.PI * 2 - Math.PI / 2
              const R = 68
              return (
                <motion.li
                  key={l.code}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{ x: Math.cos(ang)*R, y: Math.sin(ang)*R, opacity: 1 }}
                  exit={{ x: 0, y: 0, opacity: 0 }}
                  transition={{ delay: .05 + i*.05, type: 'spring', stiffness: 340, damping: 22 }}
                  className="absolute top-1/2 left-1/2"
                >
                  <button
                    onClick={() => { onChange(l.code); setOpen(false) }}
                    className="w-14 h-14 rounded-full bg-[#13202c]/70 border border-white/15
                               backdrop-blur-xl flex flex-col items-center justify-center
                               text-xs text-white/70 hover:text-white transition"
                  >
                    <span className="text-lg">{l.flag}</span>
                    {l.code.toUpperCase()}
                  </button>
                </motion.li>
              )
            })}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
              className="absolute inset-2 rounded-full border border-dashed border-white/5"
            />
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
