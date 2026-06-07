import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const LOG = [
  {
    id: "SYS.EXP.01",
    year: "2025 — ACTIVE",
    title: "Agentic workflow systems",
    role: "AI Automation Engineer",
    body: "Designing AI-assisted workflow systems that combine Python services, structured data pipelines, retrieval logic, and automation control layers.",
  },
  {
    id: "SYS.EXP.02",
    year: "2024 — ACTIVE",
    title: "Django API architecture",
    role: "Backend Systems Architect",
    body: "Building secure Django and DRF backends with clean API contracts, PostgreSQL data models, Redis-backed task flows, and deployment-ready architecture.",
  },
  {
    id: "SYS.EXP.03",
    year: "2024 — ACTIVE",
    title: "n8n and third-party operations",
    role: "Automation Integrator",
    body: "Connecting business tools through n8n, REST APIs, OAuth, webhooks, and monitored execution paths that reduce manual coordination.",
  },
];

export function ProfessionalLog() {
  return (
    <section id="log" className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 py-16">
      <SectionHeader index="03" title="Timeline" subtitle="Professional Log" />
      <p className="mb-12 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Experience entries as system events: backend architecture, AI orchestration, automation integration, and secure operational delivery.
      </p>
      <div className="relative border-l border-border pl-8">
        {LOG.map((l, i) => (
          <Reveal key={l.id} delay={i * 0.08}>
            <div className="relative pb-12 last:pb-0">
              <span className="absolute -left-[34px] top-1.5 flex h-3 w-3 items-center justify-center">
                <span className="h-3 w-3 rotate-45 border border-[#2E7D64] bg-black" />
              </span>
              <div className="text-mono flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#2E7D64]">
                <span>{l.id}</span>
                <span className="text-border">|</span>
                <span className="text-muted-foreground">{l.year}</span>
              </div>
              <h3 className="mt-3 text-display text-xl font-semibold">{l.title}</h3>
              <div className="text-mono mt-1 text-xs uppercase tracking-wider text-foreground/80">{l.role}</div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{l.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
