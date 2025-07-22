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
      {/* botón central */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10
                   flex items-center justify-center text-lg backdrop-blur-md
                   text-white/80 hover:text-white transition focus:ring-2
                   focus:ring-brand-blue/50"
        title="Press L"
      >
        {current.flag}
      </button>
  
      {/* contenedor popover */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -4, opacity: 0, scale: .85 }}
            animate={{ y: 6,  opacity: 1, scale: 1 }}
            exit={{    y: -4, opacity: 0, scale: .85 }}
            transition={{ type:'spring', stiffness: 340, damping: 26 }}
            className="absolute left-1/2 top-full mt-3 -translate-x-1/2
                       origin-top pointer-events-auto"
          >
            {/* “plato” semitransparente */}
            <div className="absolute inset-0 rounded-xl bg-[#0f1a25]/80
                            backdrop-blur-xl border border-white/10 shadow-lg" />
  
            {/* línea guía muy fina */}
            <span className="absolute top-0 left-1/2 h-full w-px
                             -translate-x-1/2 bg-gradient-to-b
                             from-white/10 via-white/5 to-transparent" />
  
            {/* botones de idiomas */}
            <ul className="relative flex flex-col items-center p-4 gap-2">
              {others.map((l, idx) => (
                <motion.li
                  key={l.code}
                  initial={{ y: -6, opacity: 0 }}
                  animate={{ y: 0,  opacity: 1 }}
                  exit={{   y: -6, opacity: 0 }}
                  transition={{ delay: .05 + idx*.04 }}
                >
                  <button
                    onClick={() => { onChange(l.code); setOpen(false) }}
                    className="w-11 h-11 rounded-full border border-white/15
                               flex flex-col items-center justify-center
                               bg-[#172634]/70 text-xs text-white/70
                               hover:bg-brand-blue/20 hover:text-white
                               transition-colors"
                  >
                    <span className="text-lg leading-none">{l.flag}</span>
                    <span className="mt-[1px] leading-none text-[10px]">
                      {l.code.toUpperCase()}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
