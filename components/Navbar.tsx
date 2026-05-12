'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = window.localStorage.getItem('theme')
    if (stored === 'light') {
      setTheme('light')
      document.documentElement.classList.remove('dark')
    } else {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem('theme', theme)
  }, [theme, mounted])

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl"
    >
      <div className="main-container flex items-center justify-between gap-6 py-4">
        <a href="#hero" className="flex items-center gap-3 text-base font-semibold text-white transition duration-300 hover:text-brand-300">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 ring-1 ring-brand-500/20">AA</span>
          <span className="hidden sm:inline">Abeeha Aamir</span>
        </a>

        <nav className="hidden items-center gap-5 md:flex">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/90 text-slate-200 transition hover:border-brand-400 hover:text-white"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <a
            href="#contact"
            className="hidden rounded-full bg-brand-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-400 md:inline-flex"
          >
            Get in touch
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/90 text-slate-200 transition hover:border-brand-400 hover:text-white md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/10 bg-slate-950/95 px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-2xl bg-slate-900/80 px-4 py-3 text-sm text-slate-100 transition hover:bg-slate-900"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" className="block rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-400">
              Contact
            </a>
          </div>
        </div>
      ) : null}
    </motion.header>
  )
}
