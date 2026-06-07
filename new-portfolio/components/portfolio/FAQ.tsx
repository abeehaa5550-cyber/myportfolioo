import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const FAQS = [
  {
    q: "What kinds of AI automation systems do you build?",
    a: "I build backend-driven automations for lead intake, document processing, customer support, owner portals, payout operations, CRM sync, RAG assistants, and AI voice workflows.",
  },
  {
    q: "Can you connect AI agents with existing business tools?",
    a: "Yes — I connect AI agents and automations to Notion, HubSpot, Slack, payment platforms, internal Django APIs, and any system that exposes a REST, OAuth, or webhook surface.",
  },
  {
    q: "Do you work on Django and Django REST Framework projects?",
    a: "Django and DRF are core tools for me. I design API contracts, data models, authentication flows, background tasks with Celery/Redis, and clean deployment paths for production workloads.",
  },
  {
    q: "How do you approach RAG and document automation?",
    a: "I build retrieval pipelines with document ingestion, chunking, embeddings, hybrid search, citation tracking, and observability so the system remains accurate and debuggable as it grows.",
  },
  {
    q: "Can you improve an existing automation that is unreliable?",
    a: "Yes — I audit fragile workflows, add validation, retries, idempotency, structured logging, and clean fallback paths so the automation behaves like a real product instead of a brittle script.",
  },
  {
    q: "What makes your work different from a simple no-code workflow?",
    a: "I treat automations as engineered systems: validated inputs, observable outputs, recoverable failures, and a clear contract with the rest of the backend — not isolated steps glued together.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 py-16">
      <SectionHeader index="07" title="Common questions" subtitle="FAQ / System Notes" />
      <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Practical answers for founders and teams planning AI agents, automation infrastructure, Django backends, RAG pipelines, and business workflow systems.
      </p>
      <div className="overflow-hidden rounded-2xl border border-border bg-black/60 backdrop-blur-sm">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-border last:border-b-0">
              <button
                data-cursor="hover"
                onClick={() => setOpen(isOpen ? null : i)}
                className="row-hover group flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#1A3B32]/15"
              >
                <span className="flex items-start gap-4">
                  <span className="text-mono text-[11px] uppercase tracking-[0.25em] text-[#2E7D64]">
                    Q.0{i + 1}
                  </span>
                  <span className="text-display text-base font-medium text-foreground/95">{f.q}</span>
                </span>
                <span className={`text-mono text-[#2E7D64] transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pl-[88px] text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
