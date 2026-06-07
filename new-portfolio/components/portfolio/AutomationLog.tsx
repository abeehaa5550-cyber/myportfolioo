import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const AUTO = [
  { id: "AUTO.01", body: "Django lead intake API connected to n8n enrichment and HubSpot sync" },
  { id: "AUTO.02", body: "RAG knowledge assistant with document ingestion, embeddings, and audit logs" },
  { id: "AUTO.03", body: "AI voice appointment flow with scheduling rules and human handoff states" },
  { id: "AUTO.04", body: "Webhook retry system for failed third-party API calls and alert routing" },
  { id: "AUTO.05", body: "PostgreSQL reporting pipeline for automation throughput and exceptions" },
  { id: "AUTO.06", body: "Notion operations dashboard synced from backend task and workflow events" },
];

export function AutomationLog() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const tick = setInterval(() => {
      i++;
      setVisible(i);
      if (i >= AUTO.length) clearInterval(tick);
    }, 380);
    return () => clearInterval(tick);
  }, [inView]);

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 py-16">
      <SectionHeader index="05" title="Workflow examples" subtitle="Automation Library" />
      <div ref={ref} className="card-neon border border-border bg-black/70 backdrop-blur-sm">
        <div className="text-mono flex items-center justify-between border-b border-border bg-[#0a0a0a] px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2E7D64]" />
            <span>~/abeeha/automations.log</span>
          </div>
          <span>tail -f</span>
        </div>
        <div className="p-4 font-mono text-[13px] leading-relaxed sm:p-6">
          {AUTO.map((a, i) => (
            <div
              key={a.id}
              className={`row-hover group flex items-start gap-3 border-l-2 border-transparent py-3 pl-3 transition-all sm:items-center sm:gap-4 ${
                i < visible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-[#2E7D64]">›</span>
              <span className="text-muted-foreground">{a.id}</span>
              <span className="text-foreground/90">{a.body}</span>
            </div>
          ))}
          <div className="mt-4 pl-3 text-[#2E7D64]">
            <span className="caret">{visible >= AUTO.length ? "› awaiting next deploy_" : `› executing ${visible}/${AUTO.length}`}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
