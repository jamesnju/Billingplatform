"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Products", href: "#products" },
  { name: "Pricing", href: "#subscriptions" },
  { name: "Contact", href: "#contact" },
];

export default function HeaderNew() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-lg shadow-cyan-500/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 20 }}
              className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold"
            >
              ⚡
            </motion.div>
            <span className="text-xl font-bold text-gradient hidden sm:inline">
              BusinessSuite
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ color: "#ec4899" }}
                className="text-gray-300 hover:text-pink-500 transition-colors text-sm font-medium"
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-cyan-400 hover:text-pink-500 transition-colors text-sm font-medium"
              >
                Login
              </motion.button>
            </Link>
            <Link href="/register">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(0, 217, 255, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
              >
                Sign Up
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cyan-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass py-4 px-4 mt-2 rounded-lg border border-slate-700/50"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-pink-500 transition-colors text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-2 pt-4 border-t border-slate-700">
                <button className="flex-1 px-4 py-2 text-cyan-400 border border-cyan-400/50 rounded-lg text-sm font-medium">
                  Login
                </button>
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 text-white rounded-lg text-sm font-medium">
                  Sign Up
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}

// // src/components/landing/Header.tsx
// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { motion } from 'framer-motion'
// import { FaBars, FaTimes } from 'react-icons/fa'
// import { useAuth } from '@/src/context/AuthContext'
// import MagneticButton from '../ui/MagneticButton'

// const navLinks = [
//   { name: 'Home', href: '#home' },
//   { name: 'Products', href: '#products' },
//   { name: 'Team', href: '#team' },
//   { name: 'Contact', href: '#contact' },
// ]

// export default function Header() {
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const { user } = useAuth()

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   return (
//     <motion.header
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.5 }}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled ? 'glass shadow-lg' : 'bg-transparent'
//       }`}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <svg
//               className="w-8 h-8 text-primary-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M13 10V3L4 14h7v7l9-11h-7z"
//               />
//             </svg>
//             <span className="text-xl font-bold text-gradient">BusinessSuite</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className="text-gray-700 hover:text-primary-600 transition-colors"
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </nav>

//           {/* Auth Buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             {user ? (
//               <Link href="/dashboard">
//                 <MagneticButton className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
//                   Dashboard
//                 </MagneticButton>
//               </Link>
//             ) : (
//               <>
//                 <Link href="/login">
//                   <MagneticButton className="px-4 py-2 text-primary-600 hover:text-primary-700 transition-colors">
//                     Login
//                   </MagneticButton>
//                 </Link>
//                 <Link href="/register">
//                   <MagneticButton className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
//                     Register
//                   </MagneticButton>
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden text-gray-700"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="md:hidden glass py-4 px-4 mt-2 rounded-lg"
//           >
//             <nav className="flex flex-col space-y-4">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   className="text-gray-700 hover:text-primary-600 transition-colors"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//               {user ? (
//                 <Link
//                   href="/dashboard"
//                   className="px-4 py-2 bg-primary-600 text-white rounded-lg text-center"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Dashboard
//                 </Link>
//               ) : (
//                 <>
//                   <Link
//                     href="/login"
//                     className="px-4 py-2 text-primary-600 border border-primary-600 rounded-lg text-center"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     href="/register"
//                     className="px-4 py-2 bg-primary-600 text-white rounded-lg text-center"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     Register
//                   </Link>
//                 </>
//               )}
//             </nav>
//           </motion.div>
//         )}
//       </div>
//     </motion.header>
//   )
// }
