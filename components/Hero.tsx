'use client'

import { motion } from 'framer-motion'
import { HeroScene } from './HeroScene'

export function Hero() {
  return (
    <section id="hero" className="relative h-screen w-screen overflow-hidden bg-slate-950">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/80" />

      {/* Content Overlay */}
      <div className="relative z-20 flex h-full items-center">
        <div className="mx-auto w-full max-w-5xl px-6 py-24 sm:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="space-y-8"
          >
            <span className="inline-flex rounded-full border border-brand-400/20 bg-brand-500/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-brand-200 backdrop-blur-xl">
              AI AUTOMATION DEVELOPER
            </span>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Premium AI automation systems that make business operations feel modern, effortless, and highly reliable.
            </h1>

            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              I build intelligent workflow platforms, automation governance portals, and AI agent experiences that streamline processes, protect business value, and scale with confidence.
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-400"
              >
                View projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 px-6 py-3 text-sm font-semibold text-slate-200 transition duration-300 hover:border-brand-400 hover:text-white"
              >
                Let's connect
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: [12, 0, 12], opacity: [0, 1, 0.9] }}
        transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
        className="absolute inset-x-0 bottom-10 z-20 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-brand-300 shadow-soft backdrop-blur-xl"
      >
        <span className="text-2xl leading-none">↓</span>
      </motion.a>
    </section>
  )
}
