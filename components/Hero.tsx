'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Radio } from 'lucide-react'
import { HeroScene } from './HeroScene'

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#111111]">
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/85 via-[#111111]/55 to-[#1A1A1A]/90" />

      <div className="relative z-20 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="space-y-8"
          >
            <span className="inline-flex rounded-lg border border-[#EDE4D4]/20 bg-[#2A2A2A]/80 px-4 py-2 font-mono text-xs uppercase tracking-[0.35em] text-[#EDE4D4] backdrop-blur-xl">
              AI AUTOMATION DEVELOPER
            </span>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[#F5EDE4] sm:text-5xl lg:text-6xl">
              Premium AI automation systems that make business operations feel modern, effortless, and highly reliable.
            </h1>

            <p className="max-w-2xl text-base leading-8 text-[#D8CDBA] sm:text-lg">
              I build intelligent workflow platforms, automation governance portals, and AI agent experiences that streamline processes, protect business value, and scale with confidence.
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <a
                href="#showcase"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EDE4D4] px-6 py-3 text-sm font-semibold text-[#111111] shadow-[0_18px_45px_rgba(237,228,212,0.12)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#F5EDE4]"
              >
                <ArrowDown className="h-4 w-4" />
                View projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#2A2A2A]/90 px-6 py-3 text-sm font-semibold text-[#EDE4D4] transition duration-300 hover:border-[#EDE4D4]/50 hover:text-[#F5EDE4]"
              >
                <Radio className="h-4 w-4" />
                Let's connect
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: [12, 0, 12], opacity: [0, 1, 0.9] }}
        transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
        className="absolute inset-x-0 bottom-10 z-20 mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-[#1A1A1A]/70 text-[#EDE4D4] shadow-soft backdrop-blur-xl"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.a>
    </section>
  )
}
