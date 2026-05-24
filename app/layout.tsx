import type { Metadata } from 'next'
import './globals.css'
import { SmoothScroll } from '@components/SmoothScroll'

export const metadata: Metadata = {
  applicationName: 'Abeeha Aamir Portfolio',
  title: 'Abeeha Aamir | AI Automation Engineer & Backend Systems Architect',
  description:
    'Premium futuristic portfolio for Abeeha Aamir, an AI Automation Engineer and Backend Systems Architect building Python, Django, AI orchestration, RAG, and workflow automation systems.',
  keywords: [
    'Abeeha Aamir',
    'AI Automation Engineer',
    'Backend Systems Architect',
    'Python Developer',
    'Django Developer',
    'RAG Pipelines',
    'n8n Automation',
    'Django REST Framework',
  ],
  metadataBase: new URL('https://abeeha-aamir.dev'),
  openGraph: {
    title: 'Abeeha Aamir | AI Automation Engineer & Backend Systems Architect',
    description: 'Futuristic portfolio for Python, Django, AI automation, RAG pipelines, and backend systems architecture.',
    type: 'website',
    siteName: 'Abeeha Aamir Portfolio',
    locale: 'en_US',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abeeha Aamir | AI Automation Engineer & Backend Systems Architect',
    description: 'Python, Django, AI automation, RAG pipelines, and backend systems architecture.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abeeha Aamir',
    jobTitle: 'AI Automation Engineer & Backend Systems Architect',
    email: 'mailto:abeehaaamirr@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bahawalpur',
      addressRegion: 'Punjab',
      addressCountry: 'PK',
    },
    knowsAbout: [
      'Python',
      'Django',
      'Django REST Framework',
      'AI orchestration',
      'RAG pipelines',
      'workflow automation',
      'database optimization',
      'backend architecture',
    ],
    url: 'https://abeeha-aamir.dev',
  }

  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="font-sans bg-[#111111] text-[#EDE4D4] antialiased">
        <SmoothScroll />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
