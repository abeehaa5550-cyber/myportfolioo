'use client'

import { Github, Linkedin } from 'lucide-react'

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

export function SocialRail() {
  return (
    <aside className="fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 sm:flex">
      <div className="h-16 w-px bg-gradient-to-b from-transparent via-[#EDE4D4]/25 to-[#EDE4D4]/10" />
      {socialLinks.map((item) => {
        const Icon = item.icon

        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#111111]/70 text-[#D8CDBA] shadow-soft backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#EDE4D4]/50 hover:bg-[#1F1F1F]/90 hover:text-[#F5EDE4] hover:shadow-[0_0_28px_rgba(237,228,212,0.22)]"
          >
            <Icon className="h-4 w-4 transition duration-300 group-hover:scale-110" />
          </a>
        )
      })}
      <div className="h-24 w-px bg-gradient-to-b from-[#EDE4D4]/10 via-[#EDE4D4]/25 to-transparent" />
    </aside>
  )
}
