'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaLinkedinIn, FaTwitter, FaGithub } from 'react-icons/fa'

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Visionary leader with 15+ years of enterprise software experience',
      image: '👩‍💼',
      color: 'from-pink-500 to-rose-500',
      socials: { linkedin: '#', twitter: '#', github: '#' },
    },
    {
      id: 2,
      name: 'Marcus Chen',
      role: 'CTO & Co-Founder',
      bio: 'Full-stack architect passionate about scalable cloud solutions',
      image: '👨‍💻',
      color: 'from-blue-500 to-cyan-500',
      socials: { linkedin: '#', twitter: '#', github: '#' },
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'VP of Product',
      bio: 'Product strategist focused on user-centric design and innovation',
      image: '👩‍🔬',
      color: 'from-purple-500 to-indigo-500',
      socials: { linkedin: '#', twitter: '#', github: '#' },
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Head of Engineering',
      bio: 'Lead engineer building high-performance distributed systems',
      image: '👨‍🏫',
      color: 'from-orange-500 to-red-500',
      socials: { linkedin: '#', twitter: '#', github: '#' },
    },
    {
      id: 5,
      name: 'Sophia Kim',
      role: 'Head of Design',
      bio: 'Creative designer crafting beautiful and intuitive user experiences',
      image: '👩‍🎨',
      color: 'from-emerald-500 to-teal-500',
      socials: { linkedin: '#', twitter: '#', github: '#' },
    },
    {
      id: 6,
      name: 'David Thompson',
      role: 'Customer Success Director',
      bio: 'Champion of customer success and business development',
      image: '👨‍💼',
      color: 'from-amber-500 to-yellow-500',
      socials: { linkedin: '#', twitter: '#', github: '#' },
    },
  ]

  return (
    <section id="team" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            Meet Our <span className="text-gradient">Amazing Team</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Talented individuals united by a mission to transform how businesses operate
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              {/* Card background */}
              <div className="relative p-8 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden h-full">
                {/* Hover gradient overlay */}
                <motion.div
                  animate={hoveredId === member.id ? { opacity: 0.15 } : { opacity: 0 }}
                  className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 transition-opacity`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Avatar */}
                  <motion.div
                    animate={
                      hoveredId === member.id
                        ? { scale: 1.1, y: -5 }
                        : { scale: 1, y: 0 }
                    }
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${member.color} text-5xl mb-4 shadow-lg`}
                  >
                    {member.image}
                  </motion.div>

                  {/* Name and role */}
                  <motion.h3
                    animate={
                      hoveredId === member.id ? { x: 5 } : { x: 0 }
                    }
                    className="text-xl font-bold text-white mb-1"
                  >
                    {member.name}
                  </motion.h3>
                  <motion.p
                    animate={
                      hoveredId === member.id ? { x: 5 } : { x: 0 }
                    }
                    className="text-sm font-semibold text-gradient mb-3"
                  >
                    {member.role}
                  </motion.p>

                  {/* Bio */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Social links */}
                  <motion.div
                    animate={
                      hoveredId === member.id
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 10 }
                    }
                    transition={{ duration: 0.3 }}
                    className="flex gap-3"
                  >
                    <motion.a
                      href={member.socials.linkedin}
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 hover:border-cyan-400/70 text-cyan-400 transition-all"
                    >
                      <FaLinkedinIn size={16} />
                    </motion.a>
                    <motion.a
                      href={member.socials.twitter}
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-400/30 hover:border-pink-400/70 text-pink-400 transition-all"
                    >
                      <FaTwitter size={16} />
                    </motion.a>
                    <motion.a
                      href={member.socials.github}
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-400/30 hover:border-purple-400/70 text-purple-400 transition-all"
                    >
                      <FaGithub size={16} />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Animated border on hover */}
                <motion.div
                  animate={
                    hoveredId === member.id
                      ? { backgroundPosition: '200% center' }
                      : { backgroundPosition: '0% center' }
                  }
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            Interested in joining our talented team?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r from-cyan-500 to-pink-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            View Open Positions
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
