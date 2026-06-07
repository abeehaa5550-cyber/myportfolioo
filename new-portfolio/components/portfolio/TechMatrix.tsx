import React, { useRef, useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import {
  SiN8N, SiZapier, SiLangchain, SiOpenai, SiAnthropic,
  SiPython, SiDjango, SiFastapi, SiPostgresql, SiRedis, SiCelery,
  SiGit, SiDocker, SiLinux,
  SiNotion, SiHubspot, SiAuth0,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { TbWebhook, TbApi, TbBrain, TbRobot } from "react-icons/tb";

type IconCmp = ComponentType<{ size?: number; color?: string; className?: string; style?: React.CSSProperties }>;

const STACK = [
  { id: "SYS.01", name: "Python Backend Systems", tag: "Backend Core", pct: 95 },
  { id: "SYS.02", name: "Django & Django REST Framework", tag: "API Architecture", pct: 92 },
  { id: "SYS.03", name: "AI Orchestration & RAG Pipelines", tag: "Intelligent Systems", pct: 88 },
  { id: "SYS.04", name: "Database Systems & Optimization", tag: "PostgreSQL / Redis", pct: 90 },
  { id: "SYS.05", name: "Workflow Automation", tag: "n8n / Webhooks", pct: 93 },
  { id: "SYS.06", name: "AI Voice Integrations", tag: "Voice Automation", pct: 85 },
  { id: "SYS.07", name: "Infrastructure & Deployment", tag: "DevOps Layer", pct: 87 },
  { id: "SYS.08", name: "Security", tag: "System Hardening", pct: 89 },
];

const ARSENAL: { group: string; items: { name: string; Icon: IconCmp; color: string }[] }[] = [
  {
    group: "AI & Automation",
    items: [
      { name: "n8n", Icon: SiN8N, color: "#E64A19" },
      { name: "Make", Icon: TbBrain, color: "#00C4B3" },
      { name: "Zapier", Icon: SiZapier, color: "#FF4A00" },
      { name: "LangChain", Icon: SiLangchain, color: "#3D9B82" },
      { name: "CrewAI", Icon: TbRobot, color: "#FFD700" },
      { name: "Claude", Icon: SiAnthropic, color: "#D97757" },
      { name: "OpenAI", Icon: SiOpenai, color: "#10A37F" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "Django", Icon: SiDjango, color: "#44B78B" },
      { name: "DRF", Icon: SiDjango, color: "#A30000" },
      { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
      { name: "Redis", Icon: SiRedis, color: "#DC382D" },
      { name: "Celery", Icon: SiCelery, color: "#A4C639" },
    ],
  },
  {
    group: "Development",
    items: [
      { name: "VS Code", Icon: VscVscode, color: "#007ACC" },
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "Linux", Icon: SiLinux, color: "#FCC624" },
    ],
  },
  {
    group: "Integrations",
    items: [
      { name: "Notion", Icon: SiNotion, color: "#FFFFFF" },
      { name: "HubSpot", Icon: SiHubspot, color: "#FF7A59" },
      { name: "REST APIs", Icon: TbApi, color: "#009688" },
      { name: "Webhooks", Icon: TbWebhook, color: "#A855F7" },
      { name: "OAuth", Icon: SiAuth0, color: "#E34234" },
    ],
  },
];

function Core({ id, name, tag, pct }: { id: string; name: string; tag: string; pct: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  return (
    <div
      ref={ref}
      data-cursor="hover"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="card-neon scan-host group relative flex h-full flex-col justify-between rounded-xl border border-border bg-[#0A0A0A] p-6"
    >
      <div>
        <div className="text-mono flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#2E7D64]">
          <span>{id}</span>
          <span className="text-muted-foreground">{tag}</span>
        </div>
        <h3 className="mt-4 text-display font-medium leading-snug" style={{ fontSize: "18px", letterSpacing: "-0.01em" }}>{name}</h3>
      </div>
      <div className="mt-6">
        <div className="text-mono mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>CAPACITY</span>
          <motion.span
            animate={{ opacity: hover ? 1 : 0.6 }}
            className="text-[#2E7D64]"
          >
            {hover ? `${pct}%` : "---%"}
          </motion.span>
        </div>
        <div className="relative h-3 w-full overflow-hidden border border-[#2E7D64]/40 bg-black">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: hover ? `${pct}%` : 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0"
            style={{
              background: "linear-gradient(90deg, #1A3B32 0%, #2E7D64 60%, #3D9B82 100%)",
              boxShadow: "0 0 12px #2E7D64",
            }}
          />
          {/* ticks */}
          {[25, 50, 75].map((t) => (
            <div key={t} className="absolute inset-y-0 w-px bg-border/60" style={{ left: `${t}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TechMatrix() {
  return (
    <section id="arsenal" className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 py-16">
      <SectionHeader index="02" title="Tech Matrix" subtitle="Capabilities" />
      <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Core backend, AI, automation, infrastructure, and security capabilities mapped as system modules with animated capacity indicators.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STACK.map((s) => (
          <Core key={s.id} {...s} />
        ))}
      </div>

      <div className="mt-16">
        <div className="text-mono mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="text-[#2E7D64]">[03 / ARSENAL]</span>
          <span className="h-px w-12 bg-border" />
          <span>Technical tools</span>
        </div>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A focused stack for building Django APIs, AI agents, RAG workflows, automations, integrations, and production-ready backend infrastructure.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {ARSENAL.map((a) => (
            <div
              key={a.group}
              data-cursor="hover"
              className="group rounded-2xl border border-[#1A3B32] bg-[#0A0A0A] p-5 transition-all duration-[250ms] ease-out hover:scale-[1.01] hover:border-[#2E7D64] hover:shadow-[0_8px_20px_rgba(0,0,0,0.4),0_0_0_1px_rgba(46,125,100,0.2)]"
            >
              <div className="text-mono mb-5 flex items-center gap-3 uppercase tracking-[0.18em] text-[#2E7D64]" style={{ fontSize: "16px" }}>
                <span>{a.group}</span>
                <span className="h-px flex-1 bg-[#1A3B32] group-hover:bg-[#2E7D64]/60 transition-colors" />
              </div>
              <div className="flex flex-wrap gap-3">
                {a.items.map(({ name, Icon, color }) => (
                  <div
                    key={name}
                    data-cursor="hover"
                    className="group/chip flex items-center gap-2 rounded-lg border border-[#1A3B32] bg-[#111111] px-4 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2E7D64] hover:shadow-[0_0_12px_rgba(46,125,100,0.35)]"
                  >
                    <Icon size={18} color={color} className="shrink-0 transition-transform duration-150 group-hover/chip:scale-110" />
                    <span className="text-mono font-medium text-[#E5E5E5]" style={{ fontSize: "14px" }}>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
