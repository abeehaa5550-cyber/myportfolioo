import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const NOTES = [
  { id: "NOTE.01", body: "I design automations as reliable products, not fragile shortcuts." },
  { id: "NOTE.02", body: "Every AI output needs context, validation, observability, and a clean fallback path." },
  { id: "NOTE.03", body: "The best backend systems feel calm from the outside because the complexity is handled in the architecture." },
];

const FOCUS = [
  { id: "FOCUS.01", title: "Python Backend Systems" },
  { id: "FOCUS.02", title: "Django Architecture & Django REST Framework APIs" },
  { id: "FOCUS.03", title: "AI Orchestration & Agentic Systems" },
  { id: "FOCUS.04", title: "Database Design & Optimization" },
  { id: "FOCUS.05", title: "Infrastructure & Deployment" },
  { id: "FOCUS.06", title: "AI Voice Integrations" },
  { id: "FOCUS.07", title: "Workflow Automation & RAG Pipelines" },
  { id: "FOCUS.08", title: "Scheduling Systems" },
  { id: "FOCUS.09", title: "Security & DevOps" },
];

const SERVICES = [
  "Custom Django + AI Web Applications",
  "Intelligent Workflow Automation Systems",
  "RAG & AI Agent Development",
  "API Development & Third-party Integrations",
  "AI Voice Assistants & Integrations",
  "Scalable Backend Architecture & Infrastructure",
];

export function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 py-16">
      <SectionHeader index="01" title="Backend systems with AI built in" subtitle="About" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-base leading-relaxed text-foreground/90">
            I am Abeeha Aamir, an AI Automation Engineer and Backend Systems Architect focused on building intelligent
            systems that remove operational drag without sacrificing engineering discipline.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            My work sits at the intersection of Python, Django, AI orchestration, RAG pipelines, third-party integrations,
            and workflow automation. I care about systems that are fast to use, easy to reason about, observable in
            production, and strong enough to support real business decisions.
          </p>
        </div>
        <div className="card-neon border border-[#1A3B32] bg-black/60 p-6">
          <div className="text-mono mb-4 text-[10px] uppercase tracking-[0.25em] text-[#2E7D64]">SERVICES I OFFER</div>
          <ul className="space-y-2.5">
            {SERVICES.map((s) => (
              <li
                key={s}
                className="row-hover text-mono flex items-start gap-3 border-l-2 border-transparent py-1 pl-3 text-sm text-foreground/85"
              >
                <span className="mt-0.5 text-[#2E7D64]">→</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-20">
        <div className="text-mono mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="text-[#2E7D64]">[01.A]</span>
          <span className="h-px w-12 bg-border" />
          <span>Engineering Philosophy</span>
        </div>
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          {NOTES.map((n, i) => (
            <Reveal key={n.id} delay={i * 0.08}>
              <div className="card-neon scan-host h-full bg-background p-8">
                <div className="text-mono text-[11px] uppercase tracking-[0.25em] text-[#2E7D64]">{n.id}</div>
                <p className="mt-4 text-base leading-relaxed text-foreground/90">{n.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <div className="text-mono mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="text-[#2E7D64]">[01.B]</span>
          <span className="h-px w-12 bg-border" />
          <span>Primary Focus Areas</span>
        </div>
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {FOCUS.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.04}>
              <div className="card-neon scan-host group h-full bg-background p-6 transition-colors hover:bg-[#1A3B32]/20">
                <div className="text-mono flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#2E7D64]">
                  <span>{f.id}</span>
                  <span className="text-muted-foreground transition-colors group-hover:text-[#2E7D64]">→</span>
                </div>
                <h4 className="mt-4 text-display text-lg font-semibold">{f.title}</h4>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
