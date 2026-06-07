import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const EDU = [
  {
    id: "EDU.01",
    title: "Backend Engineering",
    body: "Python, Django, Django REST Framework, API design, authentication, and service architecture.",
  },
  {
    id: "EDU.02",
    title: "AI Automation Systems",
    body: "RAG pipelines, LangChain workflows, agentic systems, n8n orchestration, and prompt operations.",
  },
  {
    id: "EDU.03",
    title: "Infrastructure & Security",
    body: "Docker, Linux, deployment workflows, CI/CD, monitoring, and secure backend practices.",
  },
];

export function AcademicLog() {
  return (
    <section id="education" className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 py-16">
      <SectionHeader index="06" title="Learning path" subtitle="Academic Log" />
      <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
        {EDU.map((e, i) => (
          <Reveal key={e.id} delay={i * 0.08}>
            <div className="card-neon scan-host h-full bg-background p-8">
              <div className="text-mono text-[11px] uppercase tracking-[0.25em] text-[#2E7D64]">{e.id}</div>
              <h3 className="mt-4 text-display text-lg font-semibold">{e.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
