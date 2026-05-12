'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Project } from '@data/projects'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 210, damping: 20 }}
      className="group overflow-hidden rounded-[1.75rem] border border-slate-800/90 bg-slate-900/95 shadow-[0_24px_100px_rgba(15,23,42,0.22)] transition duration-300 hover:border-brand-400"
    >
      <div className="relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={720}
          className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105"
          priority={false}
        />
      </div>
      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex flex-col gap-3 text-sm text-brand-200 sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex rounded-full bg-brand-500/10 px-3 py-1.5 font-medium text-brand-100">{project.subtitle}</span>
          <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Featured</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
          <p className="mt-3 text-slate-400 leading-7 text-sm">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-800/90 bg-slate-950/90 px-3 py-1 text-slate-300 transition duration-300 group-hover:border-brand-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {project.liveLink ? (
            <a
              href={project.liveLink}
              className="inline-flex items-center justify-center rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm font-semibold text-brand-100 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-500/20"
            >
              View demo
            </a>
          ) : null}
          {project.githubLink ? (
            <a
              href={project.githubLink}
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/90 px-4 py-2 text-sm font-semibold text-slate-200 transition duration-300 hover:border-brand-400"
            >
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
