// src/app/(public)/page.tsx
'use client'

import Footer from '@/src/components/landing/Footer'
import Header from '@/src/components/landing/Header'
import Hero from '@/src/components/landing/Hero'
import Products from '@/src/components/landing/Products'
import Team from '@/src/components/landing/Team'
import CursorFollower from '@/src/components/shared/CursorFollower'
import ScrollProgress from '@/src/components/shared/ScrollProgress'
import { motion } from 'framer-motion'
import { Contact } from 'lucide-react'


export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorFollower />
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Products />
          <Team />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}