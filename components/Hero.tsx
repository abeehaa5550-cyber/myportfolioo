'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { HeroScene } from './HeroScene'

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#111111]">
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      <div className="absolute inset-0 bg-[#111111]/35" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#111111] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#111111] to-transparent" />

      <div className="relative z-20 flex min-h-screen items-start justify-center">
        <div className="mx-auto w-full max-w-5xl px-6 pb-28 pt-12 text-center sm:px-10 sm:pt-14 lg:px-12 lg:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="flex flex-col items-center gap-5 sm:gap-6"
          >
            <div className="mx-auto inline-flex flex-wrap items-center justify-center gap-3 border border-white/10 bg-[#111111]/35 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.34em] text-[#B8B8B0] backdrop-blur-md">
              <span>SYS.STATUS</span>
              {['ONLINE', 'N8N ACTIVE', 'AI CORE READY'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[9px] tracking-[0.26em] text-[#D8CDBA]">
                  <span className="h-1 w-1 rounded-full bg-[#D8CDBA]" />
                  {item}
                </span>
              ))}
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#B8B8B0] sm:text-[11px]">
              BACKEND / AI AUTOMATION / SYSTEMS
            </p>

            <h1 className="mx-auto max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-[#F5EDE4] text-glow sm:text-7xl lg:text-[7.4rem]">
              Abeeha Aamir
            </h1>

            <p className="mx-auto max-w-3xl text-base font-medium leading-8 text-[#EDE4D4] sm:text-xl lg:text-2xl">
              AI Automation Engineer & Backend Systems Architect
            </p>

            <p className="mx-auto max-w-2xl text-sm leading-7 text-[#D8CDBA] sm:text-base">
              Building intelligent, scalable Python & Django systems powered by AI orchestration and automation.
            </p>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: [0, 6, 0], opacity: 1 }}
        transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
        className="absolute inset-x-0 bottom-8 z-20 mx-auto inline-flex w-fit items-center justify-center gap-3 rounded-lg border border-white/10 bg-[#111111]/65 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.32em] text-[#D8CDBA] shadow-soft backdrop-blur-xl transition duration-300 hover:border-[#EDE4D4]/35 hover:bg-[#1A1A1A]/80 hover:text-[#F5EDE4] sm:bottom-10"
      >
        <ArrowDown className="h-4 w-4 shrink-0" />
        Scroll to explore
      </motion.a>
    </section>
  )
}
