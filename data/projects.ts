export type Project = {
  title: string
  subtitle: string
  description: string
  image: string
  tags: string[]
  liveLink?: string
  githubLink?: string
}

export const featuredProjects: Project[] = [
  {
    title: 'Hostyo Owner Portal',
    subtitle: 'Next.js property management portal',
    description:
      'A polished owner-facing portal for property management, integrating rental operations with modern automation and process governance.',
    image: '/images/hostyo-portal.svg',
    tags: ['Next.js', 'Tailwind CSS', 'API integrations', 'Portal UX'],
    liveLink: '#contact',
    githubLink: '#',
  },
  {
    title: 'n8n Automation Suite',
    subtitle: 'Business workflow orchestration',
    description:
      'A production-grade set of n8n workflows connecting Notion, HubSpot, Hostex, Outlook, and core systems to remove manual handoffs and improve data velocity.',
    image: '/images/n8n-workflows.svg',
    tags: ['n8n', 'API Automation', 'Webhooks', 'Reliability'],
  },
  {
    title: 'Loan Document AI Agent',
    subtitle: 'Intelligent underwriting assistance',
    description:
      'An AI agent that accelerates loan document review, extracts critical underwriting details, and delivers precise operational insights.',
    image: '/images/ai-agents.svg',
    tags: ['AI Agents', 'Document intelligence', 'Underwriting', 'Extraction'],
  },
  {
    title: 'User Onboarding AI Agent',
    subtitle: 'Business lending activation',
    description:
      'A workflow-driven agent that validates borrower data, triggers onboarding tasks, and makes new applications move faster.',
    image: '/images/ai-agents.svg',
    tags: ['Onboarding', 'AI workflows', 'Customer experience', 'Activation'],
  },
]
