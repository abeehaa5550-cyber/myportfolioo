"use client";

import { motion } from 'framer-motion'
import { Navbar } from '@components/Navbar'
import { Hero } from '@components/Hero'
import { SectionHeading } from '@components/SectionHeading'
import { ProjectCard } from '@components/ProjectCard'
import { ContactForm } from '@components/ContactForm'
import { featuredProjects } from '@data/projects'
import { skillGroups } from '@data/skills'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="main-container space-y-24 pb-16 pt-8">
        <section id="about">
          <SectionHeading
            eyebrow="About me"
            title="Fast-moving automation with a premium execution mindset."
            description="I help teams turn manual toil into predictable, intelligent process flows. With 5 months of focused experience, I deliver stable automation systems that are designed for scale, observability, and immediate business value."
          />
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="surface-card p-8 lg:p-10"
            >
              <p className="text-slate-300 leading-8">
                I combine modern frontend polish, automation architecture, and AI-enabled workflows to create solutions that feel premium and perform reliably. My work emphasizes strong error handling, maintainable orchestration, and rapid delivery for teams that need automation to move faster.
              </p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  title: 'Reliability-first automation',
                  description: 'Designing workflows with retries, alerts, and graceful fallback paths.',
                },
                {
                  title: 'Business value focus',
                  description: 'Delivering integrations that accelerate outcomes and reduce manual effort.',
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                  className="surface-card rounded-[1.75rem] border border-slate-800/80 bg-slate-950/95 p-6"
                >
                  <p className="text-sm uppercase tracking-[0.25em] text-brand-300">{item.title}</p>
                  <p className="mt-4 text-slate-300 leading-7">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills">
          <SectionHeading eyebrow="Skills & tech stack" title="Technical foundations that support premium automation." />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title} className="surface-card p-6">
                <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                <ul className="mt-5 space-y-3 text-slate-400">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-brand-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="experience">
          <SectionHeading
            eyebrow="Experience"
            title="5 months of intensive automation delivery."
            description="I have led automation efforts that span portal development, workflow orchestration, and AI-powered integrations. The focus is always on systems that reduce risk and unlock operational speed."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Internal portal launch',
                description: 'Created the AI Automation Portal that centralizes monitoring, deployment, and workflow management.',
              },
              {
                title: 'Production-grade n8n automation',
                description: 'Delivered dozens of reliable workflows across Notion, HubSpot, Hostex, Outlook, and custom systems.',
              },
              {
                title: 'AI agent enablement',
                description: 'Built intelligent agents for loan document review and borrower onboarding systems.',
              },
            ].map((item) => (
              <div key={item.title} className="surface-card p-6">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-slate-300 leading-7">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="pb-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_0.9fr] lg:items-start">
            <div>
              <SectionHeading eyebrow="Get in touch" title="Let's build the next generation of intelligent automation." description="Reach out to discuss a custom portal, n8n workflow strategy, or AI automation pipeline for your team." />
              <div className="surface-card p-8">
                <p className="text-sm uppercase tracking-[0.25em] text-brand-300">Connect</p>
                <p className="mt-4 text-slate-300 leading-7">abeha.aamir@example.com</p>
                <p className="mt-4 text-sm uppercase tracking-[0.25em] text-brand-300">Location</p>
                <p className="mt-2 text-slate-300 leading-7">Remote — available for global teams</p>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/90 py-8">
        <div className="main-container flex flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Abeeha Aamir. AI Automation Developer.</p>
          <div className="flex flex-wrap gap-4 text-slate-400">
            <a href="#hero" className="transition hover:text-white">
              Back to top
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
