'use client'

import { motion } from 'framer-motion'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="mb-8 max-w-3xl"
    >
      <p className="text-sm uppercase tracking-[0.28em] text-brand-300">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-slate-400 leading-8">{description}</p> : null}
    </motion.div>
  )
}
