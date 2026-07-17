
// src/app/(dashboard)/layout.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '@/src/components/dashboard/Sidebar'
import { SidebarProvider, useSidebar } from '@/src/components/dashboard/SidebarContext'

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()
  const pathname = usePathname()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsSidebarOpen])

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  )
}



// // src/app/(dashboard)/layout.tsx
// 'use client'

// import { useState, useEffect } from 'react'
// import { usePathname } from 'next/navigation'
// import { motion, AnimatePresence } from 'framer-motion'
// import Sidebar from '@/src/components/dashboard/Sidebar'

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true)
//   const pathname = usePathname()

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false)
//       } else {
//         setIsSidebarOpen(true)
//       }
//     }
//     handleResize()
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <main className="flex-1 overflow-y-auto p-4 md:p-6">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={pathname}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//               className="max-w-7xl mx-auto"
//             >
//               {children}
//             </motion.div>
//           </AnimatePresence>
//         </main>
//       </div>
//     </div>
//   )
// }