'use client'

import { About } from '@/components/portfolio/About'
import { AcademicLog } from '@/components/portfolio/AcademicLog'
import { AutomationLog } from '@/components/portfolio/AutomationLog'
import { Contact } from '@/components/portfolio/Contact'
import { FAQ } from '@/components/portfolio/FAQ'
import { Footer } from '@/components/portfolio/Footer'
import { Header } from '@/components/portfolio/Header'
import { Hero } from '@/components/portfolio/Hero'
import { ProfessionalLog } from '@/components/portfolio/ProfessionalLog'
import { Showcase } from '@/components/portfolio/Showcase'
import { SocialRail } from '@/components/portfolio/SocialRail'
import { TechMatrix } from '@/components/portfolio/TechMatrix'
import { CustomCursor } from '@/components/CustomCursor'
import { Reveal } from '@/components/portfolio/Reveal'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-foreground">
      <CustomCursor />
      <SocialRail />
      <div className="top-light" />
      <div className="noise" />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Reveal><About /></Reveal>
        <Reveal><TechMatrix /></Reveal>
        <Reveal><ProfessionalLog /></Reveal>
        <Reveal><Showcase /></Reveal>
        <Reveal><AutomationLog /></Reveal>
        <Reveal><AcademicLog /></Reveal>
        <Reveal><FAQ /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>
      <Footer />
    </div>
  )
}
