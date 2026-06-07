import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { ProjectPreview } from "./ProjectPreview";

const PROJECTS = [
  {
    id: "SYS.PRJ.01",
    name: "Hostyo — Property Management Owner Portal",
    body: "A full-stack owner portal built with Next.js 15 and TypeScript, using Notion as a headless backend.",
    features: ["Live visibility into reservations", "Payouts, expenses, and financial dashboards", "Real-time sync"],
    stack: ["Next.js 15", "Notion API", "Tailwind", "n8n", "Supabase", "Vercel"],
    image: "/images/projects/hostyo.jpg",
  },
  {
    id: "SYS.PRJ.02",
    name: "HubSpot Email Scraper & Importer",
    body: "An automation that scrapes hundreds of prospect emails and imports enriched contacts into HubSpot using Python scrapers and an n8n pipeline.",
    features: ["High-volume extraction", "Email validation and deduplication", "Automatic segmentation", "Idempotent imports"],
    stack: ["Python", "BeautifulSoup", "Apify", "n8n", "HubSpot API"],
    image: "/images/projects/hubspot-scraper.jpg",
  },
  {
    id: "SYS.PRJ.03",
    name: "Borrower Concierge AI Agent",
    body: "Intelligent multi-step AI agent that assists borrowers throughout the lending process.",
    features: ["Document analysis", "Personalized guidance", "Automated workflows"],
    stack: ["Django", "Agno", "OpenAI", "Claude", "PostgreSQL"],
    image: "/images/projects/borrower-ai.jpg",
  },
  {
    id: "SYS.PRJ.04",
    name: "Business Lending Document Auditor AI Agent",
    body: "AI-powered system that audits business lending documents with high accuracy and structured output.",
    features: ["PDF extraction", "Risk assessment", "Compliance checking"],
    stack: ["Django", "LangChain", "OpenAI", "pdfplumber"],
    image: "/images/projects/document-auditor.jpg",
  },
  {
    id: "SYS.PRJ.05",
    name: "Automated Owner Payouts — n8n + Revolut + Notion",
    body: "Production-grade n8n workflow for owner payout automation and reconciliation.",
    features: ["Multi-account segregation", "Automated statements", "Full audit trail"],
    stack: ["n8n", "Revolut Business API", "Notion API", "PostgreSQL", "Slack"],
    image: "/images/projects/owner-payouts.jpg",
  },
];

export function Showcase() {
  return (
    <section id="systems" className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 py-16">
      <SectionHeader index="04" title="Featured Projects" subtitle="Showcase" />
      <p className="mb-12 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Realistic backend, AI, Django, and automation project examples aligned with the systems I build.
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06}>
            <article
              data-cursor="hover"
              className="card-neon group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#1A3B32] bg-[#0A0A0A] shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
            >
              <div className="relative">
                <ProjectPreview src={p.image} alt={p.name} />
                <div className="text-mono absolute left-3 top-3 rounded-md border border-[#2E7D64]/60 bg-black/70 px-2 py-1 text-[10px] uppercase tracking-[0.25em] text-[#2E7D64]">
                  {p.id}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-display text-lg font-bold leading-tight">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>

                <div className="mt-5">
                  <div className="text-mono mb-2 text-[10px] uppercase tracking-[0.25em] text-[#2E7D64]">KEY FEATURES</div>
                  <ul className="space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="text-mono flex items-start gap-2 text-[12px] text-foreground/85">
                        <span className="mt-0.5 text-[#2E7D64]">›</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <div className="text-mono mb-2 text-[10px] uppercase tracking-[0.25em] text-[#2E7D64]">STACK</div>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="chip-neon text-mono rounded-md border border-[#1A3B32] px-2 py-1 text-[10px] uppercase tracking-wider text-foreground/80">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
