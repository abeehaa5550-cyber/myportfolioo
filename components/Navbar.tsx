'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu, Radio, X } from 'lucide-react'

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'CAPABILITIES', href: '#capabilities' },
  { label: 'ARSENAL', href: '#arsenal' },
  { label: 'SHOWCASE', href: '#showcase' },
  { label: 'CONTACT', href: '#contact' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#111111]/82 backdrop-blur-2xl">
      <div className="main-container flex items-center justify-between gap-4 py-4">
        <a href="#hero" className="group flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-lg border border-white/10 bg-[#1F1F1F] transition duration-300 group-hover:border-[#EDE4D4]/45 group-hover:shadow-[0_0_34px_rgba(237,228,212,0.2)]">
            <Image
              src="/images/abeeha-logo.jpg"
              alt="Abeeha Aamir logo"
              fill
              priority
              sizes="44px"
              className="object-cover opacity-95 transition duration-300 group-hover:scale-110 group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-[#EDE4D4]/0 transition group-hover:bg-[#EDE4D4]/5" />
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#B8B8B0]">SYSTEM ID</p>
            <p className="text-sm font-semibold text-[#F5EDE4] transition group-hover:text-white">Abeeha Aamir</p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-lg bg-[#EDE4D4] px-4 py-2.5 text-xs font-semibold text-[#111111] transition duration-300 hover:-translate-y-0.5 hover:bg-[#F5EDE4] hover:shadow-[0_0_32px_rgba(237,228,212,0.24),0_18px_45px_rgba(237,228,212,0.14)] md:inline-flex"
          >
            <Radio className="h-4 w-4" />
            START TRANSMISSION
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#2A2A2A] text-[#EDE4D4] transition hover:border-[#EDE4D4] md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/10 bg-[#111111]/95 px-6 py-5 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-lg border border-white/10 bg-[#2A2A2A] px-4 py-3 text-sm text-[#EDE4D4] transition hover:border-[#EDE4D4]/40 hover:bg-[#333333]"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="block rounded-lg bg-[#EDE4D4] px-4 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#F5EDE4]"
            >
              START TRANSMISSION
            </a>
          </div>
        </div>
      ) : null}
    </header>
  )
}
