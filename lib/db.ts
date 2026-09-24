import fs from 'fs';
import path from 'path';
import {
  User,
  Project,
  Package,
  Service,
  Inquiry,
  ClientProject,
  Testimonial,
  FAQItem,
  AgencySettings,
  InquiryStatus,
  ProjectStage,
} from './types';
import {
  initialUsers,
  initialProjects,
  initialPackages,
  initialServices,
  initialTestimonials,
  initialFAQs,
  initialAgencySettings,
} from './seedData';

interface DatabaseSchema {
  users: User[];
  projects: Project[];
  packages: Package[];
  services: Service[];
  inquiries: Inquiry[];
  clientProjects: ClientProject[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  settings: AgencySettings;
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'agency_db.json');

// Pre-seeded demo client project
const initialClientProjects: ClientProject[] = [
  {
    id: 'cproj-demo-1',
    clientId: 'user-client-1',
    clientEmail: 'client@demo.com',
    clientName: 'Elena Rostova',
    inquiryId: 'inq-demo-1',
    projectName: 'Lumina Atelier Swiss E-commerce',
    packageName: 'PROFESSIONAL',
    status: 'Development',
    stageProgress: 60,
    stagingUrl: 'https://staging.lumina.example.com',
    productionUrl: 'https://lumina-horology.example.com',
    requirements: {
      businessName: 'Lumina Atelier Geneva',
      websiteType: 'E-commerce & VIP Booking',
      budget: '$2,500 - $4,000',
      details: 'Luxury Swiss timepieces with VIP private viewing booking and multi-currency checkout.',
      domainAvailable: true,
      hostingAvailable: true,
    },
    messages: [
      {
        id: 'msg-1',
        sender: 'CLIENT',
        senderName: 'Elena Rostova',
        text: 'Hi team! We just approved the high-fidelity UI wireframes. Loving the dark Swiss typography!',
        timestamp: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
      },
      {
        id: 'msg-2',
        sender: 'ADMIN',
        senderName: 'Aura Studio Dev Team',
        text: 'Wonderful, Elena! We have moved into Stage 03 — IMPLEMENT. We are currently configuring the real-time Stripe checkout and mobile product animations.',
        timestamp: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
      },
    ],
    files: [
      {
        id: 'file-1',
        name: 'Lumina_UI_Design_System_v2.pdf',
        size: '4.2 MB',
        type: 'PDF Document',
        url: '#',
        uploadedAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
      },
      {
        id: 'file-2',
        name: 'Staging_Credentials_Access.txt',
        size: '1.2 KB',
        type: 'Text Document',
        url: '#',
        uploadedAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const initialInquiries: Inquiry[] = [
  {
    id: 'inq-demo-1',
    clientName: 'Elena Rostova',
    email: 'client@demo.com',
    phone: '+1 (555) 782-9912',
    businessName: 'Lumina Atelier Geneva',
    websiteType: 'E-commerce',
    selectedPackageId: 'pkg-pro',
    packageName: 'PROFESSIONAL',
    requiredPages: ['Home', 'Collections', 'Watch Configurator', 'About Atelier', 'VIP Booking', 'Contact'],
    requiredFeatures: ['Stripe Multi-currency', 'VIP Booking Engine', 'High-Res Zoom', 'WhatsApp Concierge'],
    preferredDesign: 'Minimalist dark luxury with Swiss grid alignment',
    referenceWebsite: 'https://lumina-horology.example.com',
    domainAvailable: true,
    hostingAvailable: true,
    budget: '$2,500 - $4,000',
    message: 'We are launching our spring timepiece catalog and need a flawless digital showroom.',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),
    updatedAt: new Date().toISOString(),
    clientId: 'user-client-1',
  },
  {
    id: 'inq-demo-2',
    clientName: 'Julian Sterling',
    email: 'julian@pulseflow.io',
    phone: '+1 (555) 912-3049',
    businessName: 'PulseFlow Labs',
    websiteType: 'Landing Page',
    selectedPackageId: 'pkg-starter',
    packageName: 'STARTER',
    requiredPages: ['Landing Page', 'Docs Preview', 'Pricing', 'Changelog'],
    requiredFeatures: ['Interactive CLI Code Tabs', 'Sub-0.5s Load Time', 'Email Capture'],
    preferredDesign: 'Modern dark developer aesthetic with electric cyan glow',
    referenceWebsite: 'https://pulseflow.example.com',
    domainAvailable: true,
    hostingAvailable: false,
    budget: '$1,000 - $2,000',
    message: 'Need a fast developer marketing page for our upcoming Product Hunt launch.',
    status: 'Approved',
    createdAt: new Date(Date.now() - 3600 * 1000 * 20).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function getDefaultDatabase(): DatabaseSchema {
  return {
    users: initialUsers,
    projects: initialProjects,
    packages: initialPackages,
    services: initialServices,
    inquiries: initialInquiries,
    clientProjects: initialClientProjects,
    testimonials: initialTestimonials,
    faqs: initialFAQs,
    settings: initialAgencySettings,
  };
}

// Helper to ensure DB file exists
function ensureDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const defaultData = getDefaultDatabase();
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
      return defaultData;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as DatabaseSchema;
    // Ensure all keys exist
    const defaultData = getDefaultDatabase();
    let updated = false;
    for (const key of Object.keys(defaultData) as Array<keyof DatabaseSchema>) {
      if (!parsed[key]) {
        (parsed as any)[key] = defaultData[key];
        updated = true;
      }
    }
    if (updated) {
      fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
    }
    return parsed;
  } catch (err) {
    console.error('Error reading/initializing database file:', err);
    return getDefaultDatabase();
  }
}

function saveDatabase(data: DatabaseSchema): boolean {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing database file:', err);
    return false;
  }
}

export const db = {
  // --- USERS ---
  getUsers: (): User[] => {
    return ensureDatabase().users;
  },
  findUserByEmail: (email: string): User | undefined => {
    const data = ensureDatabase();
    return data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },
  findUserById: (id: string): User | undefined => {
    const data = ensureDatabase();
    return data.users.find((u) => u.id === id);
  },
  createUser: (user: Omit<User, 'id' | 'createdAt'>): User => {
    const data = ensureDatabase();
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    data.users.push(newUser);
    saveDatabase(data);
    return newUser;
  },

  // --- PROJECTS ---
  getProjects: (): Project[] => {
    const data = ensureDatabase();
    return [...data.projects].sort((a, b) => a.sortOrder - b.sortOrder);
  },
  getProjectBySlug: (slug: string): Project | undefined => {
    const data = ensureDatabase();
    return data.projects.find((p) => p.slug === slug || p.id === slug);
  },
  getProjectById: (id: string): Project | undefined => {
    const data = ensureDatabase();
    return data.projects.find((p) => p.id === id);
  },
  createProject: (project: Omit<Project, 'id'>): Project => {
    const data = ensureDatabase();
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
    };
    data.projects.push(newProject);
    saveDatabase(data);
    return newProject;
  },
  updateProject: (id: string, updates: Partial<Project>): Project | null => {
    const data = ensureDatabase();
    const index = data.projects.findIndex((p) => p.id === id);
    if (index === -1) return null;
    data.projects[index] = { ...data.projects[index], ...updates };
    saveDatabase(data);
    return data.projects[index];
  },
  deleteProject: (id: string): boolean => {
    const data = ensureDatabase();
    const initialLen = data.projects.length;
    data.projects = data.projects.filter((p) => p.id !== id);
    if (data.projects.length !== initialLen) {
      saveDatabase(data);
      return true;
    }
    return false;
  },

  // --- PACKAGES ---
  getPackages: (): Package[] => {
    const data = ensureDatabase();
    return [...data.packages].sort((a, b) => a.sortOrder - b.sortOrder);
  },
  getPackageById: (id: string): Package | undefined => {
    const data = ensureDatabase();
    return data.packages.find((p) => p.id === id);
  },
  createPackage: (pkg: Omit<Package, 'id'>): Package => {
    const data = ensureDatabase();
    const newPkg: Package = {
      ...pkg,
      id: `pkg-${Date.now()}`,
    };
    data.packages.push(newPkg);
    saveDatabase(data);
    return newPkg;
  },
  updatePackage: (id: string, updates: Partial<Package>): Package | null => {
    const data = ensureDatabase();
    const index = data.packages.findIndex((p) => p.id === id);
    if (index === -1) return null;
    data.packages[index] = { ...data.packages[index], ...updates };
    saveDatabase(data);
    return data.packages[index];
  },
  deletePackage: (id: string): boolean => {
    const data = ensureDatabase();
    const initialLen = data.packages.length;
    data.packages = data.packages.filter((p) => p.id !== id);
    if (data.packages.length !== initialLen) {
      saveDatabase(data);
      return true;
    }
    return false;
  },

  // --- SERVICES ---
  getServices: (): Service[] => {
    const data = ensureDatabase();
    return [...data.services].sort((a, b) => a.sortOrder - b.sortOrder);
  },
  getServiceById: (id: string): Service | undefined => {
    const data = ensureDatabase();
    return data.services.find((s) => s.id === id);
  },
  createService: (srv: Omit<Service, 'id'>): Service => {
    const data = ensureDatabase();
    const newSrv: Service = {
      ...srv,
      id: `srv-${Date.now()}`,
    };
    data.services.push(newSrv);
    saveDatabase(data);
    return newSrv;
  },
  updateService: (id: string, updates: Partial<Service>): Service | null => {
    const data = ensureDatabase();
    const index = data.services.findIndex((s) => s.id === id);
    if (index === -1) return null;
    data.services[index] = { ...data.services[index], ...updates };
    saveDatabase(data);
    return data.services[index];
  },
  deleteService: (id: string): boolean => {
    const data = ensureDatabase();
    const initialLen = data.services.length;
    data.services = data.services.filter((s) => s.id !== id);
    if (data.services.length !== initialLen) {
      saveDatabase(data);
      return true;
    }
    return false;
  },

  // --- INQUIRIES ---
  getInquiries: (): Inquiry[] => {
    const data = ensureDatabase();
    return [...data.inquiries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  getInquiryById: (id: string): Inquiry | undefined => {
    const data = ensureDatabase();
    return data.inquiries.find((i) => i.id === id);
  },
  getInquiriesByClientId: (clientId: string): Inquiry[] => {
    const data = ensureDatabase();
    return data.inquiries.filter((i) => i.clientId === clientId);
  },
  createInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'> & { status?: InquiryStatus }): Inquiry => {
    const data = ensureDatabase();
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: inquiry.status || 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.inquiries.unshift(newInquiry);

    // Auto-create or update a client project for the user
    if (newInquiry.clientId) {
      const newClientProject: ClientProject = {
        id: `cproj-${Date.now()}`,
        clientId: newInquiry.clientId,
        clientEmail: newInquiry.email,
        clientName: newInquiry.clientName,
        inquiryId: newInquiry.id,
        projectName: newInquiry.businessName || `${newInquiry.clientName}'s Website`,
        packageName: newInquiry.packageName,
        status: 'Inquiry Submitted',
        stageProgress: 15,
        requirements: {
          businessName: newInquiry.businessName,
          websiteType: newInquiry.websiteType,
          budget: newInquiry.budget || 'Standard',
          details: newInquiry.message || 'Requirements submitted via inquiry form.',
          domainAvailable: newInquiry.domainAvailable,
          hostingAvailable: newInquiry.hostingAvailable,
        },
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'ADMIN',
            senderName: 'Aura Studio Dev Team',
            text: `Hello ${newInquiry.clientName}! We received your project inquiry for ${newInquiry.packageName} package. Our team will review the requirements and start stage 01 (Analyze).`,
            timestamp: new Date().toISOString(),
          },
        ],
        files: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      data.clientProjects.unshift(newClientProject);
    }

    saveDatabase(data);
    return newInquiry;
  },
  updateInquiryStatus: (id: string, status: InquiryStatus): Inquiry | null => {
    const data = ensureDatabase();
    const index = data.inquiries.findIndex((i) => i.id === id);
    if (index === -1) return null;
    data.inquiries[index].status = status;
    data.inquiries[index].updatedAt = new Date().toISOString();
    saveDatabase(data);
    return data.inquiries[index];
  },

  // --- CLIENT PROJECTS ---
  getClientProjects: (): ClientProject[] => {
    const data = ensureDatabase();
    return data.clientProjects;
  },
  getClientProjectById: (id: string): ClientProject | undefined => {
    const data = ensureDatabase();
    return data.clientProjects.find((cp) => cp.id === id);
  },
  getClientProjectsByClientId: (clientId: string): ClientProject[] => {
    const data = ensureDatabase();
    return data.clientProjects.filter((cp) => cp.clientId === clientId);
  },
  updateClientProjectStage: (
    id: string,
    status: ProjectStage,
    stageProgress: number,
    urls?: { stagingUrl?: string; productionUrl?: string }
  ): ClientProject | null => {
    const data = ensureDatabase();
    const index = data.clientProjects.findIndex((cp) => cp.id === id);
    if (index === -1) return null;
    data.clientProjects[index].status = status;
    data.clientProjects[index].stageProgress = stageProgress;
    if (urls?.stagingUrl !== undefined) data.clientProjects[index].stagingUrl = urls.stagingUrl;
    if (urls?.productionUrl !== undefined) data.clientProjects[index].productionUrl = urls.productionUrl;
    data.clientProjects[index].updatedAt = new Date().toISOString();
    saveDatabase(data);
    return data.clientProjects[index];
  },
  addProjectMessage: (
    projectId: string,
    message: { sender: 'CLIENT' | 'ADMIN'; senderName: string; text: string }
  ): ClientProject | null => {
    const data = ensureDatabase();
    const index = data.clientProjects.findIndex((cp) => cp.id === projectId);
    if (index === -1) return null;
    const newMessage = {
      id: `msg-${Date.now()}`,
      ...message,
      timestamp: new Date().toISOString(),
    };
    data.clientProjects[index].messages.push(newMessage);
    data.clientProjects[index].updatedAt = new Date().toISOString();
    saveDatabase(data);
    return data.clientProjects[index];
  },
  addProjectFile: (
    projectId: string,
    file: { name: string; size: string; type: string; url: string }
  ): ClientProject | null => {
    const data = ensureDatabase();
    const index = data.clientProjects.findIndex((cp) => cp.id === projectId);
    if (index === -1) return null;
    const newFile = {
      id: `file-${Date.now()}`,
      ...file,
      uploadedAt: new Date().toISOString(),
    };
    data.clientProjects[index].files.push(newFile);
    data.clientProjects[index].updatedAt = new Date().toISOString();
    saveDatabase(data);
    return data.clientProjects[index];
  },

  // --- TESTIMONIALS ---
  getTestimonials: (): Testimonial[] => {
    const data = ensureDatabase();
    return [...data.testimonials].sort((a, b) => a.sortOrder - b.sortOrder);
  },
  createTestimonial: (test: Omit<Testimonial, 'id'>): Testimonial => {
    const data = ensureDatabase();
    const newTest: Testimonial = {
      ...test,
      id: `test-${Date.now()}`,
    };
    data.testimonials.push(newTest);
    saveDatabase(data);
    return newTest;
  },
  updateTestimonial: (id: string, updates: Partial<Testimonial>): Testimonial | null => {
    const data = ensureDatabase();
    const index = data.testimonials.findIndex((t) => t.id === id);
    if (index === -1) return null;
    data.testimonials[index] = { ...data.testimonials[index], ...updates };
    saveDatabase(data);
    return data.testimonials[index];
  },
  deleteTestimonial: (id: string): boolean => {
    const data = ensureDatabase();
    const initialLen = data.testimonials.length;
    data.testimonials = data.testimonials.filter((t) => t.id !== id);
    if (data.testimonials.length !== initialLen) {
      saveDatabase(data);
      return true;
    }
    return false;
  },

  // --- FAQS ---
  getFAQs: (): FAQItem[] => {
    const data = ensureDatabase();
    return [...data.faqs].sort((a, b) => a.sortOrder - b.sortOrder);
  },
  createFAQ: (faq: Omit<FAQItem, 'id'>): FAQItem => {
    const data = ensureDatabase();
    const newFaq: FAQItem = {
      ...faq,
      id: `faq-${Date.now()}`,
    };
    data.faqs.push(newFaq);
    saveDatabase(data);
    return newFaq;
  },
  updateFAQ: (id: string, updates: Partial<FAQItem>): FAQItem | null => {
    const data = ensureDatabase();
    const index = data.faqs.findIndex((f) => f.id === id);
    if (index === -1) return null;
    data.faqs[index] = { ...data.faqs[index], ...updates };
    saveDatabase(data);
    return data.faqs[index];
  },
  deleteFAQ: (id: string): boolean => {
    const data = ensureDatabase();
    const initialLen = data.faqs.length;
    data.faqs = data.faqs.filter((f) => f.id !== id);
    if (data.faqs.length !== initialLen) {
      saveDatabase(data);
      return true;
    }
    return false;
  },

  // --- SETTINGS ---
  getSettings: (): AgencySettings => {
    return ensureDatabase().settings;
  },
  updateSettings: (updates: Partial<AgencySettings>): AgencySettings => {
    const data = ensureDatabase();
    data.settings = { ...data.settings, ...updates };
    saveDatabase(data);
    return data.settings;
  },
};
