'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check, Layers3 } from 'lucide-react'
import type { Project } from '@data/projects'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      whileHover={{ y: -7, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-[#242424]/95 shadow-soft transition duration-300 hover:border-[#EDE4D4]/45 hover:shadow-[0_20px_70px_rgba(237,228,212,0.14)]"
    >
      <div className="relative aspect-[16/8] overflow-hidden border-b border-white/10 bg-[#111111]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1280px) 50vw, 100vw"
          className="object-cover opacity-[0.88] transition duration-500 group-hover:scale-[1.055] group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex rounded-md border border-white/10 bg-[#1A1A1A] px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.24em] text-[#B8B8B0] transition group-hover:border-[#EDE4D4]/35">
            {project.code}
          </span>
          <Layers3 className="h-4 w-4 text-[#EDE4D4] opacity-70 transition group-hover:rotate-6 group-hover:opacity-100" />
        </div>

        <div className="mt-4">
          <h3 className="text-base font-semibold leading-snug text-[#F5EDE4] transition group-hover:text-white">{project.title}</h3>
          <p className="mt-2.5 text-xs leading-6 text-[#D8CDBA] transition group-hover:text-[#EDE4D4]">{project.description}</p>
        </div>

        <div className="mt-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#B8B8B0]">KEY FEATURES</p>
          <ul className="mt-2.5 space-y-1.5 text-xs leading-5 text-[#D8CDBA]">
            {project.keyFeatures.map((feature) => (
              <li key={feature} className="flex gap-2">
                <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-[#EDE4D4]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#B8B8B0]">STACK</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <span key={item} className="rounded-md border border-white/10 bg-[#1A1A1A] px-2 py-1 text-[10px] text-[#D8CDBA] transition group-hover:border-[#EDE4D4]/20">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
