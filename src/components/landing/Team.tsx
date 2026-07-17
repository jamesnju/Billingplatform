// src/components/landing/Team.tsx
'use client'

import { motion } from 'framer-motion'
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 15+ years in tech',
    avatar: `https://ui-avatars.com/api/?name=Sarah+Johnson&background=6366f1&color=fff&size=128`,
    social: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Full-stack architect & AI enthusiast',
    avatar: `https://ui-avatars.com/api/?name=Michael+Chen&background=8b5cf6&color=fff&size=128`,
    social: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Product',
    bio: 'Product strategist with a passion for UX',
    avatar: `https://ui-avatars.com/api/?name=Emily+Rodriguez&background=ec4899&color=fff&size=128`,
    social: { linkedin: '#', twitter: '#', github: '#' },
  },
  {
    name: 'David Kim',
    role: 'Lead Developer',
    bio: 'Full-stack developer & open source contributor',
    avatar: `https://ui-avatars.com/api/?name=David+Kim&background=14b8a6&color=fff&size=128`,
    social: { linkedin: '#', twitter: '#', github: '#' },
  },
]

export default function Team() {
  return (
    <section id="team" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Our <span className="text-gradient">Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Passionate experts dedicated to your success
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-shadow group"
            >
              <div className="relative inline-block">
                <motion.img
                  src={member.avatar}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary-100"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
                <div className="absolute inset-0 bg-primary-600/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a href={member.social.linkedin} className="text-white hover:scale-110 transition-transform">
                    <FaLinkedin size={20} />
                  </a>
                  <a href={member.social.twitter} className="text-white hover:scale-110 transition-transform">
                    <FaTwitter size={20} />
                  </a>
                  <a href={member.social.github} className="text-white hover:scale-110 transition-transform">
                    <FaGithub size={20} />
                  </a>
                </div>
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-primary-600 font-semibold">{member.role}</p>
              <p className="text-gray-600 text-sm mt-2">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}