export type SkillGroup = {
  title: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'AI & Automation',
    items: ['n8n', 'Make', 'Zapier', 'LangChain', 'CrewAI', 'Claude', 'OpenAI'],
  },
  {
    title: 'Backend',
    items: ['Python', 'Django', 'Django REST Framework', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery'],
  },
  {
    title: 'Development',
    items: ['VS Code', 'Git', 'Docker', 'Linux'],
  },
  {
    title: 'Integrations',
    items: ['Notion', 'HubSpot', 'REST APIs', 'Webhooks', 'OAuth'],
  },
]
