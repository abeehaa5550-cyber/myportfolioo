export type SkillGroup = {
  title: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'n8n & Workflow Orchestration',
    items: ['Workflow architecture', 'Trigger logic', 'Error handling', 'Deployment governance'],
  },
  {
    title: 'AI & LLMs',
    items: ['Prompt engineering', 'AI agent design', 'Document intelligence', 'Extraction pipelines'],
  },
  {
    title: 'Integrations & APIs',
    items: ['REST & Webhooks', 'SaaS connectors', 'HubSpot / Notion / Outlook', 'Custom endpoints'],
  },
  {
    title: 'Frontend Experience',
    items: ['Next.js 15', 'Tailwind CSS', 'Responsive UIs', 'Micro-interactions'],
  },
  {
    title: 'Backend & Automation',
    items: ['Node.js', 'Serverless patterns', 'Data pipelines', 'Monitoring'],
  },
  {
    title: 'Tools & Productivity',
    items: ['Framer Motion', 'React Hook Form', 'Vercel deployment', 'Observability'],
  },
]
