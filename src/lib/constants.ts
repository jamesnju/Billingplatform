// src/lib/constants.ts

import { Product, TeamMember } from "../types";

export const DEFAULT_CREDENTIALS = {
  admin: {
    email: 'admin@demo.com',
    password: 'Admin123!',
  },
  user: {
    email: 'user@demo.com',
    password: 'User123!',
  },
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'PO & Cashbook',
    description: 'Streamlined purchase order management and cash flow tracking',
    icon: '📊',
  },
  {
    id: '2',
    name: 'Subscription Cards',
    description: 'Automated recurring billing and membership management',
    icon: '💳',
  },
  {
    id: '3',
    name: 'Business Analytics',
    description: 'Real-time insights and reporting dashboard',
    icon: '📈',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 15+ years in business technology',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&size=128',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Full-stack architect passionate about scalable solutions',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&size=128',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Lead Designer',
    bio: 'Creating beautiful, intuitive experiences for complex problems',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&size=128',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    id: '4',
    name: 'David Park',
    role: 'Product Manager',
    bio: 'Bridging the gap between business needs and technical solutions',
    avatar: 'https://ui-avatars.com/api/?name=David+Park&size=128',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
];

export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '#products' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

export const DASHBOARD_NAV = [
  { name: 'Overview', href: '/dashboard', icon: '📊' },
  { name: 'Products', href: '/dashboard/products', icon: '📦' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
  { name: 'Team', href: '/dashboard/team', icon: '👥' },
  { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
];