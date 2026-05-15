'use client'

import { motion } from 'framer-motion'
import {
  ArrowDown,
  Bot,
  BrainCircuit,
  Code2,
  Database as DatabaseIcon,
  FileCode2,
  GitBranch,
  KeyRound,
  MapPin,
  Phone,
  Radio,
  RefreshCw,
  ServerCog,
  ShieldCheck,
  Terminal,
  Workflow,
  Zap,
} from 'lucide-react'
import { Navbar } from '@components/Navbar'
import { HeroScene } from '@components/HeroScene'
import { AmbientEffects } from '@components/AmbientEffects'
import { ProjectCard } from '@components/ProjectCard'
import { ContactForm } from '@components/ContactForm'
import { featuredProjects } from '@data/projects'
import { skillGroups } from '@data/skills'

const capabilities = [
  { code: 'SYS.01', name: 'Python Backend Systems', category: 'Backend Core', capacity: 95 },
  { code: 'SYS.02', name: 'Django & Django REST Framework', category: 'API Architecture', capacity: 92 },
  { code: 'SYS.03', name: 'AI Orchestration & RAG Pipelines', category: 'Intelligent Systems', capacity: 88 },
  { code: 'SYS.04', name: 'Database Systems & Optimization', category: 'PostgreSQL / Redis', capacity: 90 },
  { code: 'SYS.05', name: 'Workflow Automation', category: 'n8n / Webhooks', capacity: 93 },
  { code: 'SYS.06', name: 'AI Voice Integrations', category: 'Voice Automation', capacity: 85 },
  { code: 'SYS.07', name: 'Infrastructure & Deployment', category: 'DevOps Layer', capacity: 87 },
  { code: 'SYS.08', name: 'Security', category: 'System Hardening', capacity: 89 },
]

const focusAreas = [
  'Python Backend Systems',
  'Django Architecture & Django REST Framework APIs',
  'AI Orchestration & Agentic Systems',
  'Database Design & Optimization',
  'Infrastructure & Deployment',
  'AI Voice Integrations',
  'Workflow Automation & RAG Pipelines',
  'Scheduling Systems',
  'Security & DevOps',
]

const services = [
  'Custom Django + AI Web Applications',
  'Intelligent Workflow Automation Systems',
  'RAG & AI Agent Development',
  'API Development & Third-party Integrations',
  'AI Voice Assistants & Integrations',
  'Scalable Backend Architecture & Infrastructure',
]

const timelineEntries = [
  {
    code: 'SYS.EXP.01',
    role: 'AI Automation Engineer',
    title: 'Agentic workflow systems',
    period: '2025 - ACTIVE',
    description:
      'Designing AI-assisted workflow systems that combine Python services, structured data pipelines, retrieval logic, and automation control layers.',
  },
  {
    code: 'SYS.EXP.02',
    role: 'Backend Systems Architect',
    title: 'Django API architecture',
    period: '2024 - ACTIVE',
    description:
      'Building secure Django and DRF backends with clean API contracts, PostgreSQL data models, Redis-backed task flows, and deployment-ready architecture.',
  },
  {
    code: 'SYS.EXP.03',
    role: 'Automation Integrator',
    title: 'n8n and third-party operations',
    period: '2024 - ACTIVE',
    description:
      'Connecting business tools through n8n, REST APIs, OAuth, webhooks, and monitored execution paths that reduce manual coordination.',
  },
]

const automationLibrary = [
  'Django lead intake API connected to n8n enrichment and HubSpot sync',
  'RAG knowledge assistant with document ingestion, embeddings, and audit logs',
  'AI voice appointment flow with scheduling rules and human handoff states',
  'Webhook retry system for failed third-party API calls and alert routing',
  'PostgreSQL reporting pipeline for automation throughput and exceptions',
  'Notion operations dashboard synced from backend task and workflow events',
]

const academicLog = [
  { code: 'EDU.01', title: 'Backend Engineering', detail: 'Python, Django, Django REST Framework, API design, authentication, and service architecture' },
  { code: 'EDU.02', title: 'AI Automation Systems', detail: 'RAG pipelines, LangChain workflows, agentic systems, n8n orchestration, and prompt operations' },
  { code: 'EDU.03', title: 'Infrastructure & Security', detail: 'Docker, Linux, deployment workflows, CI/CD, monitoring, and secure backend practices' },
]

const contactPoints = [
  { icon: Radio, label: 'EMAIL', value: 'abeehaa5550@gmail.com' },
  { icon: Phone, label: 'PHONE', value: '03298891430' },
  { icon: MapPin, label: 'LOCATION', value: 'Bahawalpur, Punjab, Pakistan' },
]

const categoryIcons = [Bot, ServerCog, GitBranch, Workflow]

const toolIcons: Record<string, typeof Code2> = {
  n8n: Workflow,
  Make: RefreshCw,
  Zapier: Zap,
  LangChain: BrainCircuit,
  CrewAI: Bot,
  Claude: Bot,
  OpenAI: BrainCircuit,
  Python: FileCode2,
  Django: ServerCog,
  FastAPI: Zap,
  'Django REST Framework': ServerCog,
  PostgreSQL: ServerCog,
  Redis: DatabaseIcon,
  Celery: Workflow,
  'VS Code': Code2,
  Git: GitBranch,
  Docker: ServerCog,
  Linux: Terminal,
  Notion: FileCode2,
  HubSpot: Workflow,
  'REST APIs': Code2,
  Webhooks: Zap,
  OAuth: KeyRound,
}

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <motion.div
      variants={reveal}
      className="grid gap-5 border-b border-white/10 pb-5 lg:grid-cols-[0.72fr_1fr] lg:items-end"
    >
      <div>
        <p className="section-index">{eyebrow}</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-sand-100 sm:text-3xl">{title}</h2>
      </div>
      <p className="max-w-3xl text-sm leading-7 text-sand-300 lg:ml-auto">{description}</p>
    </motion.div>
  )
}

function CapabilityCard({ item }: { item: (typeof capabilities)[number] }) {
  return (
    <motion.article
      variants={reveal}
      whileHover={{ y: -7, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 240, damping: 20 }}
      className="block-panel hover-glow group"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-sand-400">{item.code}</p>
        <ShieldCheck className="h-4 w-4 text-sand-300 transition group-hover:text-sand-100" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-sand-100">{item.name}</h3>
      <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-sand-400">{item.category}</p>
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.26em] text-sand-400">
          <span>CAPACITY</span>
          <span>{item.capacity}%</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${item.capacity}%` }}
          />
        </div>
      </div>
    </motion.article>
  )
}

export default function HomePage() {
  return (
    <>
      <AmbientEffects />
      <Navbar />
      <main className="relative z-10 pb-16">
        <motion.section
          id="hero"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="hero-stage relative flex min-h-[calc(100vh-4.6rem)] w-full items-center justify-center overflow-hidden px-5 py-24 sm:px-8"
        >
          <HeroScene />
          <div className="absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-[#111111]/95 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-[#111111] to-transparent" />

          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <div className="status-line mx-auto justify-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-sand-100">SYS.STATUS</span>
              {['ONLINE', 'n8n ACTIVE', 'AI CORE READY'].map((item) => (
                <span key={item} className="status-chip">
                  <span className="h-1.5 w-1.5 rounded-full bg-sand-200 shadow-[0_0_16px_rgba(237,228,212,0.55)]" />
                  {item}
                </span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
              className="mt-12"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-sand-400">BACKEND / AI AUTOMATION / SYSTEMS</p>
              <h1 className="mt-6 text-5xl font-black leading-[0.92] tracking-tight text-sand-100 sm:text-7xl lg:text-[6.6rem]">
                Abeeha Aamir
              </h1>
              <p className="mx-auto mt-6 max-w-4xl text-lg font-semibold text-sand-200 sm:text-2xl lg:text-[1.55rem]">
                AI Automation Engineer & Backend Systems Architect
              </p>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-sand-300 sm:text-[1.05rem]">
                Building intelligent, scalable Python & Django systems powered by AI orchestration and automation.
              </p>
            </motion.div>

          </div>
          <motion.a
            href="#about"
            className="absolute bottom-6 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-sand-300 sm:bottom-8"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
          >
            <ArrowDown className="h-4 w-4" />
            Scroll to explore
          </motion.a>
        </motion.section>

        <div className="main-container">
        <motion.section
          id="about"
          className="section-space particle-field"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.08 }}
        >
          <SectionHeader
            eyebrow="01 / ABOUT"
            title="Backend systems with AI built in"
            description="I am a passionate AI Automation Engineer and Backend Developer specializing in designing high-performance, secure, and scalable systems. My expertise lies in architecting end-to-end solutions that combine powerful Python backends with advanced AI capabilities to solve complex business challenges."
          />
          <div className="grid gap-4 lg:grid-cols-[1fr_0.82fr]">
            <motion.div variants={reveal} className="block-panel hover-glow">
              <div className="flex items-center gap-3">
                <BrainCircuit className="h-5 w-5 text-sand-200" />
                <p className="small-header">PRIMARY FOCUS AREAS</p>
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {focusAreas.map((item, index) => (
                  <div key={item} className="border border-white/10 bg-graphite-800/70 p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-sand-400">
                      FOCUS.{String(index + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-2 text-sm text-sand-200">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={reveal} className="block-panel hover-glow">
              <div className="flex items-center gap-3">
                <Terminal className="h-5 w-5 text-sand-200" />
                <p className="small-header">SERVICES I OFFER</p>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-sand-300">
                {services.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 bg-sand-200" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="capabilities"
          className="section-space"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.07 }}
        >
          <SectionHeader
            eyebrow="02 / CAPABILITIES"
            title="TECH MATRIX"
            description="Core backend, AI, automation, infrastructure, and security capabilities mapped as system modules with animated capacity indicators."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((item) => (
              <CapabilityCard key={item.code} item={item} />
            ))}
          </div>
        </motion.section>

        <motion.section
          id="arsenal"
          className="section-space"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.07 }}
        >
          <SectionHeader
            eyebrow="03 / ARSENAL"
            title="Technical tools"
            description="A focused stack for building Django APIs, AI agents, RAG workflows, automations, integrations, and production-ready backend infrastructure."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group, index) => {
              const Icon = categoryIcons[index] ?? Code2
              return (
                <motion.div key={group.title} variants={reveal} whileHover={{ y: -5 }} className="block-panel hover-glow">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-sand-100">{group.title}</h3>
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-graphite-800 text-sand-200">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-graphite-800/70 px-3 py-1.5 text-xs text-sand-300"
                      >
                        {(() => {
                          const ToolIcon = toolIcons[item] ?? Code2
                          return <ToolIcon className="h-3.5 w-3.5 text-sand-200" />
                        })()}
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        <motion.section
          className="section-space particle-field"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          transition={{ staggerChildren: 0.08 }}
        >
          <SectionHeader
            eyebrow="PROFESSIONAL LOG"
            title="Timeline"
            description="Experience entries as system events: backend architecture, AI orchestration, automation integration, and secure operational delivery."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {timelineEntries.map((item) => (
              <motion.article key={item.code} whileHover={{ y: -5 }} className="block-panel hover-glow">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-sand-400">{item.code}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-sand-400">{item.period}</p>
                <h3 className="mt-4 text-lg font-semibold text-sand-100">{item.title}</h3>
                <p className="mt-2 text-sm font-medium text-sand-200">{item.role}</p>
                <p className="mt-4 text-sm leading-7 text-sand-300">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="showcase"
          className="section-space"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          transition={{ staggerChildren: 0.08 }}
        >
          <SectionHeader
            eyebrow="04 / SHOWCASE"
            title="Featured Projects"
            description="Realistic backend, AI, Django, and automation project examples aligned with the systems I build."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </motion.section>

        <motion.section
          className="section-space particle-field"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.16 }}
          transition={{ staggerChildren: 0.08 }}
        >
          <div className="grid gap-5 lg:grid-cols-[1fr_0.82fr]">
            <motion.div variants={reveal} className="block-panel hover-glow">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="small-header">AUTOMATION LIBRARY</p>
                  <h3 className="mt-3 text-xl font-semibold text-sand-100">Workflow examples</h3>
                </div>
                <Zap className="h-5 w-5 text-sand-300" />
              </div>
              <ul className="mt-5 grid gap-3 text-sm text-sand-300 sm:grid-cols-2">
                {automationLibrary.map((item, index) => (
                  <li key={item} className="border border-white/10 bg-graphite-700/70 p-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-sand-400">
                      AUTO.{String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="mt-3 leading-6">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={reveal} className="block-panel hover-glow">
              <p className="small-header">ACADEMIC LOG</p>
              <h3 className="mt-3 text-xl font-semibold text-sand-100">Learning path</h3>
              <div className="mt-5 space-y-4">
                {academicLog.map((entry) => (
                  <div key={entry.code} className="border-l border-sand-200/40 pl-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-sand-400">{entry.code}</p>
                    <h4 className="mt-2 font-semibold text-sand-100">{entry.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-sand-300">{entry.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="section-space"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          transition={{ staggerChildren: 0.08 }}
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_0.85fr] lg:items-start">
            <div>
              <SectionHeader
                eyebrow="CONTACT / START TRANSMISSION"
                title="Start transmission"
                description="Send the backend, AI, or automation system you want to build. Share the tools, workflow, constraints, and outcome you care about."
              />
              <div className="mt-6 grid gap-4">
                {contactPoints.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="block-panel flex items-center gap-4 p-5">
                      <span className="flex h-11 w-11 items-center justify-center border border-white/10 bg-graphite-800 text-sand-200">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="small-header">{item.label}</p>
                        <p className="mt-1 text-sm text-sand-300">{item.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <ContactForm />
          </div>
        </motion.section>
        </div>
      </main>
    </>
  )
}
