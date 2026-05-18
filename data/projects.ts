export type Project = {
  code: string
  title: string
  description: string
  image: string
  keyFeatures: string[]
  stack: string[]
}

export const featuredProjects: Project[] = [
  {
    code: 'SYS.PRJ.01',
    title: 'Hostyo - Property Management Owner Portal',
    description:
      'A full-stack owner portal built with Next.js 15 and TypeScript, using Notion as a headless backend.',
    image: '/images/hostyo-owner-portal.png',
    keyFeatures: [
      'Live visibility into reservations',
      'Payouts, expenses, and financial dashboards',
      'Real-time sync',
    ],
    stack: ['Next.js 15', 'Notion API', 'Tailwind', 'n8n', 'Supabase', 'Vercel'],
  },
  {
    code: 'SYS.PRJ.02',
    title: 'HubSpot Email Scraper & Importer',
    description:
      'An automation that scrapes hundreds of prospect emails and imports enriched contacts into HubSpot using Python scrapers and an n8n pipeline.',
    image: '/images/hubspot-email-scraper-importer.png',
    keyFeatures: [
      'High-volume extraction',
      'Email validation and deduplication',
      'Automatic segmentation',
      'Idempotent imports',
    ],
    stack: ['Python', 'BeautifulSoup', 'Apify', 'n8n', 'HubSpot API'],
  },
  {
    code: 'SYS.PRJ.03',
    title: 'Borrower Concierge AI Agent',
    description:
      'Intelligent multi-step AI agent that assists borrowers throughout the lending process.',
    image: '/images/borrower-concierge-ai-agent.png',
    keyFeatures: ['Document analysis', 'Personalized guidance', 'Automated workflows'],
    stack: ['Django', 'Agno', 'OpenAI', 'Claude', 'PostgreSQL'],
  },
  {
    code: 'SYS.PRJ.04',
    title: 'Business Lending Document Auditor AI Agent',
    description:
      'AI-powered system that audits business lending documents with high accuracy and structured output.',
    image: '/images/business-lending-document-auditor-ai-agent.png',
    keyFeatures: ['PDF extraction', 'Risk assessment', 'Compliance checking'],
    stack: ['Django', 'LangChain', 'OpenAI', 'pdfplumber'],
  },
  {
    code: 'SYS.PRJ.05',
    title: 'Automated Owner Payouts - n8n + Revolut + Notion',
    description:
      'Production-grade n8n workflow for owner payout automation and reconciliation.',
    image: '/images/automated-owner-payouts-n8n-revolut-notion.png',
    keyFeatures: ['Multi-account segregation', 'Automated statements', 'Full audit trail'],
    stack: ['n8n', 'Revolut Business API', 'Notion API', 'PostgreSQL', 'Slack'],
  },
]
