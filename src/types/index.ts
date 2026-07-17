// src/types/index.ts
import { IconType } from 'react-icons'

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  accountType: 'premium' | 'basic';
  avatar?: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  icon: string;
  price?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  type: 'order' | 'subscription' | 'update' | 'payment' | 'team';
}

export interface DashboardStats {
  totalRevenue: number;
  activeSubscriptions: number;
  pendingOrders: number;
  teamMembers: number;
}

export interface StatsData {
  title: string;
  value: string;
  icon: IconType;
  color: string;
  bgColor: string;
}

// Extended user type for NextAuth
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  accountType: 'premium' | 'basic';
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  accountType: 'premium' | 'basic';
}