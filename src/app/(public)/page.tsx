'use client'

import FooterNew from '@/src/components/landing/Footer'
import HeaderNew from '@/src/components/landing/Header'
import HeroEnhanced from '@/src/components/landing/Hero'
import Subscriptions from '@/src/components/landing/Subscriptions'
import AnimatedBackground from '@/src/components/ui/AnimatedBackground'
import InteractiveEffects from '@/src/components/ui/InteractiveEffects'
import InteractiveLoader from '@/src/components/ui/InteractiveLoader'
import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import ProductsEnhanced from '../(main)/products/page'
import Team from '@/src/components/landing/Team'
import Contact from '@/src/components/landing/Contact'
import About from '@/src/components/landing/About'

export default function Page() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    // Hide loader after 3 seconds
    const timer = setTimeout(() => {
      setShowLoader(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showLoader && <InteractiveLoader />}
      <AnimatedBackground />
      <InteractiveEffects />
      <div className="relative min-h-screen">
        <HeaderNew />
        <HeroEnhanced />
        <ProductsEnhanced />
        <Subscriptions />
        <Contact />
        <About />
        <Team />
        <FooterNew />
        <Toaster position="bottom-right" />
      </div>
    </>
  )
}




// // src/app/(public)/page.tsx
// "use client";

// import Footer from "@/src/components/landing/Footer";
// import Header from "@/src/components/landing/Header";
// import Hero from "@/src/components/landing/Hero";
// import Products from "@/src/components/landing/Products";
// import Subscriptions from "@/src/components/landing/Subscriptions";
// import Team from "@/src/components/landing/Team";
// import CursorFollower from "@/src/components/shared/CursorFollower";
// import ScrollProgress from "@/src/components/shared/ScrollProgress";
// import { motion } from "framer-motion";
// import { Contact } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [showLoader, setShowLoader] = useState(true);
//   useEffect(() => {
//     // Hide loader after 3 seconds
//     const timer = setTimeout(() => {
//       setShowLoader(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);
//   return (
//     <>
//       <ScrollProgress />
//       <CursorFollower />
//       <div className="min-h-screen">
//         <Header />
//         <main>
//           <Hero />
//           <Products />
//           <Subscriptions />
//           <Team />
//           <Contact />
//         </main>
//         <Footer />
//       </div>
//     </>
//   );
// }
