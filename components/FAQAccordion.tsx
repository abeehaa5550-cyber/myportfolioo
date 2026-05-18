'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What kinds of AI automation systems do you build?',
    answer:
      'I build backend-driven automations for lead intake, document processing, customer support, owner portals, payout operations, CRM sync, RAG assistants, and AI voice workflows.',
  },
  {
    question: 'Can you connect AI agents with existing business tools?',
    answer:
      'Yes. I design API and webhook layers that connect tools such as HubSpot, Notion, Revolut, Slack, CRMs, databases, and n8n workflows with reliable retry and audit paths.',
  },
  {
    question: 'Do you work on Django and Django REST Framework projects?',
    answer:
      'Yes. Django and DRF are core parts of my stack for secure APIs, authentication, admin tooling, relational models, async task flows, and scalable backend architecture.',
  },
  {
    question: 'How do you approach RAG and document automation?',
    answer:
      'I structure ingestion, parsing, embeddings, retrieval, validation, and logging so the AI layer produces traceable outputs instead of black-box responses.',
  },
  {
    question: 'Can you improve an existing automation that is unreliable?',
    answer:
      'Yes. I audit the current workflow, identify failure points, add validation and monitoring, tighten API contracts, and rebuild brittle steps into maintainable services.',
  },
  {
    question: 'What makes your work different from a simple no-code workflow?',
    answer:
      'I combine no-code orchestration with custom Python and Django systems, which keeps the speed of automation while adding the control, security, and scalability of real backend engineering.',
  },
]

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="space-y-3">
      {faqs.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <motion.div
            key={item.question}
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="overflow-hidden rounded-lg border border-white/10 bg-[#242424]/90 shadow-soft transition duration-300 hover:border-[#EDE4D4]/35 hover:shadow-[0_20px_70px_rgba(237,228,212,0.12)]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-[#F5EDE4] sm:text-base">{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 flex-none text-[#EDE4D4] transition duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                  <p className="border-t border-white/10 px-5 py-4 text-sm leading-7 text-[#D8CDBA]">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
