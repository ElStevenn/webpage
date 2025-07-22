'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import OrbitalLangSwitcher, { LANGS } from './OrbitalLangSwitcher'
type LangCode = typeof LANGS[number]['code']


/* Secciones a mostrar en la navegación */
const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' }
]

const ROTATING_ROLES = [
  'Infra & Cloud',
  'Automation',
  'Security',
  'SRE Mindset'
]

export default function Header() {
  const [active, setActive]     = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [roleIndex, setRoleIndex]   = useState(0)
  const [hidden, setHidden]     = useState(false)
  const [progress, setProgress] = useState(0)
  const [lang, setLang] = useState<LangCode>('en')

  const lastScroll = useRef(0)
  const headerRef = useRef<HTMLElement | null>(null)

  /* Rotación de roles mini */
  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex(i => (i + 1) % ROTATING_ROLES.length),
      2200
    )
    return () => clearInterval(id)
  }, [])

  /* Scroll progress */
  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docH > 0 ? st / docH : 0)

      // Hide / show header
      if (st > 120) {
        if (st > lastScroll.current + 10) setHidden(true)
        else if (st < lastScroll.current - 10) setHidden(false)
      } else {
        setHidden(false)
      }
      lastScroll.current = st
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Scrollspy con IntersectionObserver */
  useEffect(() => {
    const sections = NAV_ITEMS
      .map(i => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[]

    if (!sections.length) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setActive(e.target.id)
          }
        })
      },
      {
        threshold: 0.45
      }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  /* Cerrar mobile con Esc */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* Click en link -> cerrar */
  const handleNavClick = useCallback((id: string) => {
    setActive(id)
    setMobileOpen(false)
  }, [])

  /* Clases base */
  const linkBase =
    'relative px-1 py-1 font-medium text-[0.8rem] tracking-wide uppercase transition-colors'

  return (
    <>
      {/* Barra de progreso superior */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[60] bg-gradient-to-r from-brand-blue via-brand-coral to-brand-blue transition-[width]"
        style={{ width: `${progress * 100}%` }}
      />

      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-transform duration-400
        ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div
          className="absolute inset-0 backdrop-blur-md bg-[#0d1117]/65 border-b border-white/10
          after:absolute after:inset-0 after:pointer-events-none
          after:bg-[radial-gradient(circle_at_30%_10%,rgba(88,166,255,0.10),transparent_60%)]"
        />
        <div className="relative w-full mx-auto max-w-7xl px-5 flex items-center gap-6">

          {/* Logo / Identidad */}
            <Link
              href="#hero"
              className="group flex items-center gap-3"
              onClick={() => handleNavClick('hero')}
            >
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-brand-blue/25 via-brand-blue/10 to-brand-coral/20
                flex items-center justify-center text-[0.9rem] font-bold text-brand-blue
                shadow-[0_0_0_0_rgba(88,166,255,0.0)] group-hover:shadow-[0_0_25px_-6px_rgba(88,166,255,0.55)]
                transition-all duration-500">
                <span className="tracking-tight">PM</span>
                <span className="absolute inset-0 rounded-full border border-brand-blue/30 group-hover:border-brand-coral/40 transition-colors" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-white/90 tracking-wide">
                  Pau Mateu
                </span>
                <span className="text-[0.65rem] font-medium text-white/40 relative">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ROTATING_ROLES[roleIndex]}
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="inline-block"
                    >
                      {ROTATING_ROLES[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>
            </Link>

          {/* Navegación Desktop */}
          <nav className="ml-auto hidden md:block">
            <ul className="flex items-center gap-9 text-xs">
              {NAV_ITEMS.map(item => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`${linkBase} ${
                        isActive
                          ? 'text-brand-blue'
                          : 'text-white/55 hover:text-white/85'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full
                           bg-gradient-to-br from-brand-blue to-brand-coral shadow-[0_0_0_0_rgba(88,166,255,0.0)]
                           ring-2 ring-brand-blue/25"
                          transition={{ type: 'spring', stiffness: 360, damping: 25 }}
                        />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* CTA + Badge */}
          {/* Lang Switcher + Badge + CTA */}
          <div className="hidden md:flex items-center gap-5">
            <OrbitalLangSwitcher
              value={lang}
              onChange={(code) => {
                setLang(code)
                /* Conecta aquí tu librería de i18n:
                  router.replace(pathname, { locale: code }) */
              }}
            />

            <span className="relative flex items-center">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping bg-emerald-500/40" />
              <span className="relative inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                bg-emerald-500/15 text-emerald-300 text-[0.6rem] font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(16,185,129,0.55)]" />
                Available
              </span>
            </span>

            <a
              href="#Services"
              onClick={() => handleNavClick('Services')}
              className="group relative overflow-hidden px-5 py-2 rounded-md text-xs font-semibold tracking-wide
                text-white bg-gradient-to-r from-brand-blue via-[#3d7fc7] to-brand-coral/85
                shadow-[0_0_0_0_rgba(88,166,255,0)]
                hover:shadow-[0_0_28px_-6px_rgba(88,166,255,0.55)]
                transition-all duration-400 outline-none focus:ring-2 focus:ring-brand-blue/50"
            >
              Hire Me
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)] mix-blend-overlay" />
            </a>
          </div>


          {/* Botón hamburguesa */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle Menu"
            className="md:hidden ml-auto relative w-9 h-9 flex flex-col items-center justify-center gap-1"
          >
            <span
              className={`h-0.5 w-6 bg-white transition-transform ${
                mobileOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-opacity ${
                mobileOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-transform ${
                mobileOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>

        {/* Overlay móvil */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                 className="absolute inset-0 rounded-xl bg-[#0f1a25]/80
             backdrop-blur-xl border border-white/10 shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
              />
              <motion.aside
                className="fixed top-0 right-0 bottom-0 z-50 w-[75%] max-w-xs
                  bg-[#0d1117]/85 backdrop-blur-xl border-l border-white/10
                  flex flex-col p-6"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              >
                <div className="mb-8">
                  <div className="text-sm font-semibold text-white/90">
                    Pau Mateu
                  </div>
                  <div className="text-[0.65rem] text-white/40 mt-0.5">
                    {ROTATING_ROLES[roleIndex]}
                  </div>
                </div>
                <ul className="flex flex-col gap-5">
                  {NAV_ITEMS.map(item => {
                    const isActive = active === item.id
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={() => handleNavClick(item.id)}
                          className={`block text-sm font-medium tracking-wide ${
                            isActive
                              ? 'text-brand-blue'
                              : 'text-white/65 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
                <div className="mt-auto pt-10">
                  <a
                    href="#Services"
                    onClick={() => handleNavClick('Services')}
                    className="w-full text-center block px-5 py-3 rounded-md font-semibold text-xs
                     bg-gradient-to-r from-brand-blue to-brand-coral/80 text-white
                     shadow-[0_0_0_0_rgba(88,166,255,0)]
                     hover:shadow-[0_0_25px_-6px_rgba(88,166,255,0.55)]
                     transition-all"
                  >
                    Hire Me
                  </a>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
