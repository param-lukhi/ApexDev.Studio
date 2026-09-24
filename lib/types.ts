export type UserRole = 'ADMIN' | 'CLIENT';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
}

export type ProjectCategory = 
  | 'All' 
  | 'Business' 
  | 'Portfolio' 
  | 'E-commerce' 
  | 'Booking' 
  | 'Landing Page' 
  | 'Restaurant' 
  | 'Custom';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  client: string;
  timeline: string;
  year: string;
  summary: string;
  requirement: string;
  challenge: string;
  solution: string;
  features: string[];
  technologies: string[];
  heroImage: string;
  screenshots: string[];
  liveUrl: string;
  featured: boolean;
  sortOrder: number;
}

export interface Package {
  id: string;
  name: string;
  tag: string;
  description: string;
  price: string;
  originalPrice?: string;
  billingPeriod?: string;
  features: string[];
  deliveryTime: string;
  isPopular: boolean;
  isCustom: boolean;
  sortOrder: number;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  turnaround: string;
  sortOrder: number;
}

export type InquiryStatus = 
  | 'New' 
  | 'Contacted' 
  | 'Discussion' 
  | 'Approved' 
  | 'In Progress' 
  | 'Completed' 
  | 'Rejected';

export interface Inquiry {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  businessName: string;
  websiteType: string;
  selectedPackageId: string;
  packageName: string;
  requiredPages?: string[];
  requiredFeatures?: string[];
  preferredDesign?: string;
  referenceWebsite?: string;
  domainAvailable: boolean;
  hostingAvailable: boolean;
  additionalRequirements?: string;
  budget?: string;
  message?: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
  clientId?: string;
}

export type ProjectStage = 
  | 'Inquiry Submitted'
  | 'Discussion'
  | 'Design'
  | 'Development'
  | 'Review'
  | 'Launch'
  | 'Maintenance';

export interface ProjectMessage {
  id: string;
  sender: 'CLIENT' | 'ADMIN';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface ClientProject {
  id: string;
  clientId: string;
  clientEmail: string;
  clientName: string;
  inquiryId: string;
  projectName: string;
  packageName: string;
  status: ProjectStage;
  stageProgress: number; // 0 to 100
  stagingUrl?: string;
  productionUrl?: string;
  requirements: {
    businessName: string;
    websiteType: string;
    budget: string;
    details: string;
    domainAvailable: boolean;
    hostingAvailable: boolean;
  };
  messages: ProjectMessage[];
  files: ProjectFile[];
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  role: string;
  projectType: string;
  review: string;
  rating: number;
  avatar?: string;
  verified: boolean;
  sortOrder: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
}

export interface AgencySettings {
  agencyName: string;
  tagline: string;
  headline: string;
  subheadline: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  socialLinks: {
    github: string;
    linkedin: string;
    instagram: string;
    twitter: string;
  };
}
