import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Abeeha Aamir | AI Automation Developer',
  description: 'Premium AI Automation portfolio for Abeeha Aamir. Expert in n8n workflows, AI agents, and productivity portals.',
  metadataBase: new URL('https://abeha-portfolio.vercel.app'),
  openGraph: {
    title: 'Abeeha Aamir | AI Automation Developer',
    description: 'AI Automation Developer building n8n workflows, AI agents, and scalable automation portals.',
    type: 'website',
    siteName: 'Abeeha Aamir Portfolio',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans bg-slate-950 text-slate-100 antialiased`}>{children}</body>
    </html>
  )
}
