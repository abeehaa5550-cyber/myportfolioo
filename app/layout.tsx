import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Abeeha Aamir | AI Automation Engineer & Backend Systems Architect',
  description:
    'Premium futuristic portfolio for Abeeha Aamir, an AI Automation Engineer and Backend Systems Architect building Python, Django, AI orchestration, RAG, and workflow automation systems.',
  metadataBase: new URL('https://abeha-portfolio.vercel.app'),
  openGraph: {
    title: 'Abeeha Aamir | AI Automation Engineer & Backend Systems Architect',
    description: 'Futuristic portfolio for Python, Django, AI automation, RAG pipelines, and backend systems architecture.',
    type: 'website',
    siteName: 'Abeeha Aamir Portfolio',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="font-sans bg-[#111111] text-[#EDE4D4] antialiased">{children}</body>
    </html>
  )
}
