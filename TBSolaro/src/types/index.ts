export type Status = 'draft' | 'published';

export interface SEOMeta {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  features: string[];
  specs?: Record<string, string>;
  tiers: ProductTier[];
  gallery: string[];
  featuredImage: string;
  category: string;
  tags: string[];
  downloadUrl?: string;
  relatedSlugs?: string[];
  status: Status;
  sortOrder: number;
  seo: SEOMeta;
  createdAt: string;
  updatedAt: string;
}

export interface ProductTier {
  name: string;
  label: string;
  isDefault?: boolean;
  items?: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'enterprise' | 'household' | 'community' | 'csr';
  location: string;
  power?: string;
  installationDate?: string;
  year?: number;
  gallery: string[];
  featuredImage: string;
  videoUrl?: string;
  relatedSlugs?: string[];
  status: Status;
  sortOrder: number;
  seo: SEOMeta;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  featuredImage: string;
  gallery?: string[];
  tags: string[];
  relatedSlugs?: string[];
  status: Status;
  seo: SEOMeta;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface Showroom {
  id: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  openingHours: string;
  mapEmbed?: string;
  coordinates?: { lat: number; lng: number };
  gallery: string[];
  status: Status;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface DownloadDocument {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  category: string;
  version?: string;
  featuredImage?: string;
  status: Status;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source: string;
  status: 'new' | 'reviewed' | 'closed';
  notesAdmin?: string;
  submittedAt: string;
}

export interface ShowroomBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  area: string;
  showroom: string;
  time: string;
  status: 'new' | 'confirmed' | 'cancelled';
  notesAdmin?: string;
  submittedAt: string;
}

export interface SiteSetting {
  key: string;
  value: string;
  group: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export type UserRole = 'superadmin' | 'admin' | 'editor' | 'viewer';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
}
