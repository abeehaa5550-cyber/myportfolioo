'use client'

import { Github, Linkedin } from 'lucide-react'

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Arsenal', href: '#arsenal' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abeeha-aamir-7a700530b',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/abeehaa5550-cyber',
    icon: Github,
  },
]

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#080808]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(237,228,212,0.08),transparent_22rem),radial-gradient(circle_at_82%_18%,rgba(184,184,176,0.06),transparent_20rem)]" />
      <div className="main-container relative py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr] lg:items-start">
          <div>
            <a href="#hero" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#EDE4D4]/20 bg-[#1F1F1F] text-lg font-black text-[#F5EDE4] shadow-[0_0_28px_rgba(237,228,212,0.08)]">
                A
              </span>
              <span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.35em] text-[#B8B8B0]">SYSTEM ID</span>
                <span className="block text-sm font-semibold text-[#F5EDE4]">Abeeha Aamir</span>
              </span>
            </a>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#B8B8B0]">
              Designed & Built by <span className="font-semibold text-[#F5EDE4]">Abeeha Aamir</span>
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.26em] text-[#6F6F68]">
              © 2026 All Rights Reserved.
            </p>
          </div>

          <nav>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#6F6F68]">Navigation</p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap lg:grid lg:grid-cols-1">
              {footerLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-[#B8B8B0] transition duration-300 hover:translate-x-1 hover:text-[#F5EDE4] hover:[text-shadow:0_0_18px_rgba(237,228,212,0.28)]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#6F6F68]">Social Connect</p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="group flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-[#111111]/80 text-[#D8CDBA] transition duration-300 hover:-translate-y-1 hover:border-[#EDE4D4]/45 hover:text-[#F5EDE4] hover:shadow-[0_0_30px_rgba(237,228,212,0.18)]"
                  >
                    <Icon className="h-5 w-5 transition duration-300 group-hover:scale-110" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
