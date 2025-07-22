'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 backdrop-blur-md bg-black/40 border-b border-white/10 flex items-center px-5">
      <div className="flex items-center gap-2 font-semibold text-sm tracking-wide">
        <span className="text-[#58A6FF] text-lg">PM</span>
        <span className="text-xs text-white/60">DevOps & Entrepreneur</span>
      </div>

      <nav className="ml-auto hidden md:block">
        <ul className="flex items-center gap-8 text-sm font-medium">
          <li><Link href="#hero" className="hover:text-[#58A6FF] transition">Home</Link></li>
            <li><Link href="#about" className="hover:text-[#58A6FF] transition">About</Link></li>
            <li><Link href="#projects" className="hover:text-[#58A6FF] transition">Projects</Link></li>
            <li><Link href="#contact" className="hover:text-[#58A6FF] transition">Contact</Link></li>
            <li>
              <button className="bg-[#F78166] hover:bg-amber-300 hover:text-black text-white px-4 py-2 rounded-md text-xs font-semibold transition">
                Contact Me
              </button>
            </li>
        </ul>
      </nav>

      <button
        onClick={() => setOpen(o => !o)}
        className="ml-auto md:hidden relative w-8 h-8 flex flex-col justify-center"
        aria-label="Menu"
      >
        <span className={`h-0.5 bg-white transition ${open ? 'translate-y-1.5 rotate-45' : '-translate-y-1.5'}`}/>
        <span className={`h-0.5 bg-white transition ${open ? 'opacity-0' : 'opacity-100'}`}/>
        <span className={`h-0.5 bg-white transition ${open ? '-translate-y-1.5 -rotate-45' : 'translate-y-1.5'}`}/>
      </button>

      {open && (
        <div className="absolute top-14 right-0 left-0 bg-black/90 border-b border-white/10 md:hidden">
          <ul className="flex flex-col p-6 gap-4 text-sm">
            {['hero','about','projects','contact'].map(id => (
              <li key={id}>
                <a
                  onClick={() => setOpen(false)}
                  href={`#${id}`}
                  className="block py-1 hover:text-[#58A6FF]"
                >
                  {id === 'hero' ? 'Home' : id.charAt(0).toUpperCase()+id.slice(1)}
                </a>
              </li>
            ))}
            <li>
              <button className="w-full bg-[#F78166] hover:bg-amber-300 hover:text-black text-white px-4 py-2 rounded-md text-xs font-semibold transition">
                Contact Me
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
