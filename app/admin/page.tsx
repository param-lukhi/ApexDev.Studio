'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Layers, 
  LayoutDashboard, 
  FolderKanban, 
  Package as PackageIcon, 
  Sparkles, 
  MessageSquare, 
  HelpCircle, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  LogOut, 
  ExternalLink,
  Users,
  Briefcase,
  AlertCircle,
  FileText,
  Upload,
  Send
} from 'lucide-react';
import { 
  Project, 
  Package, 
  Service, 
  Inquiry, 
  ClientProject, 
  Testimonial, 
  FAQItem, 
  AgencySettings,
  InquiryStatus,
  ProjectStage 
} from '@/lib/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'inquiries' | 'client-projects' | 'portfolio' | 'packages' | 'services' | 'testimonials' | 'faqs' | 'settings'
  >('overview');

  const [loading, setLoading] = useState(true);

  // Dynamic Data States
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [clientProjects, setClientProjects] = useState<ClientProject[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [settings, setSettings] = useState<AgencySettings | null>(null);

  // Modals
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingPackage, setEditingPackage] = useState<Partial<Package> | null>(null);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [editingFaq, setEditingFaq] = useState<Partial<FAQItem> | null>(null);

  // Project Stage & Message Modals
  const [selectedClientProject, setSelectedClientProject] = useState<ClientProject | null>(null);
  const [newAdminMsg, setNewAdminMsg] = useState('');
  const [newDeliverableName, setNewDeliverableName] = useState('');
  const [newDeliverableSize, setNewDeliverableSize] = useState('2.4 MB');

  useEffect(() => {
    // Check Admin auth
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (!data.user || data.user.role !== 'ADMIN') {
          router.push('/login?redirect=/admin');
          return;
        }
        setAdminUser(data.user);
        loadAllData();
      })
      .catch(() => {
        router.push('/login?redirect=/admin');
      });
  }, [router]);

  const loadAllData = async () => {
    try {
      const [inqRes, cpRes, projRes, pkgRes, srvRes, testRes, faqRes, setRes] = await Promise.all([
        fetch('/api/inquiries').then((r) => r.json()),
        fetch('/api/client-projects').then((r) => r.json()),
        fetch('/api/projects').then((r) => r.json()),
        fetch('/api/packages').then((r) => r.json()),
        fetch('/api/services').then((r) => r.json()),
        fetch('/api/testimonials').then((r) => r.json()),
        fetch('/api/faqs').then((r) => r.json()),
        fetch('/api/settings').then((r) => r.json()),
      ]);

      if (inqRes.inquiries) setInquiries(inqRes.inquiries);
      if (cpRes.clientProjects) setClientProjects(cpRes.clientProjects);
      if (projRes.projects) setProjects(projRes.projects);
      if (pkgRes.packages) setPackages(pkgRes.packages);
      if (srvRes.services) setServices(srvRes.services);
      if (testRes.testimonials) setTestimonials(testRes.testimonials);
      if (faqRes.faqs) setFaqs(faqRes.faqs);
      if (setRes.settings) setSettings(setRes.settings);
    } catch (err) {
      console.error('Error loading admin data', err);
    } finally {
      setLoading(false);
    }
  };

  // --- INQUIRY ACTIONS ---
  const handleUpdateInquiryStatus = async (id: string, status: InquiryStatus) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.inquiry) {
        setInquiries((prev) => prev.map((i) => (i.id === id ? data.inquiry : i)));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(data.inquiry);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- CLIENT PROJECT STAGE ACTIONS ---
  const handleUpdateStage = async (id: string, stage: ProjectStage, progress: number, stagingUrl?: string) => {
    try {
      const res = await fetch(`/api/client-projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: stage, stageProgress: progress, stagingUrl }),
      });
      const data = await res.json();
      if (data.clientProject) {
        setClientProjects((prev) =>
          prev.map((cp) => (cp.id === id ? data.clientProject : cp))
        );
        setSelectedClientProject(data.clientProject);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendAdminMessage = async (projectId: string) => {
    if (!newAdminMsg.trim()) return;
    try {
      const res = await fetch(`/api/client-projects/${projectId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newAdminMsg.trim() }),
      });
      const data = await res.json();
      if (data.clientProject) {
        setClientProjects((prev) =>
          prev.map((cp) => (cp.id === projectId ? data.clientProject : cp))
        );
        setSelectedClientProject(data.clientProject);
        setNewAdminMsg('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddDeliverable = async (projectId: string) => {
    if (!newDeliverableName.trim()) return;
    try {
      const res = await fetch(`/api/client-projects/${projectId}/files`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newDeliverableName.trim(),
          size: newDeliverableSize,
          type: 'Project Asset',
          url: '#',
        }),
      });
      const data = await res.json();
      if (data.clientProject) {
        setClientProjects((prev) =>
          prev.map((cp) => (cp.id === projectId ? data.clientProject : cp))
        );
        setSelectedClientProject(data.clientProject);
        setNewDeliverableName('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- PORTFOLIO CRUD ---
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      const isNew = !editingProject.id;
      const url = isNew ? '/api/projects' : `/api/projects/${editingProject.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });
      const data = await res.json();
      if (data.project) {
        if (isNew) {
          setProjects([data.project, ...projects]);
        } else {
          setProjects(projects.map((p) => (p.id === data.project.id ? data.project : p)));
        }
        setEditingProject(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // --- PACKAGE CRUD ---
  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;

    try {
      const isNew = !editingPackage.id;
      const url = isNew ? '/api/packages' : `/api/packages/${editingPackage.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPackage),
      });
      const data = await res.json();
      if (data.package) {
        if (isNew) {
          setPackages([...packages, data.package]);
        } else {
          setPackages(packages.map((pkg) => (pkg.id === data.package.id ? data.package : pkg)));
        }
        setEditingPackage(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePackage = async (id: string) => {
    if (!confirm('Delete this package?')) return;
    try {
      await fetch(`/api/packages/${id}`, { method: 'DELETE' });
      setPackages(packages.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // --- SETTINGS UPDATE ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
        alert('Studio settings updated successfully!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-xs text-slate-500">
        Loading Admin Control Center...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-slate-900">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* Logo Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-accent-violet to-accent flex items-center justify-center shadow-glow">
                <ShieldCheck className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm text-slate-900">
                  Aura Studio Admin
                </span>
                <span className="text-[10px] text-accent font-mono font-medium">
                  Master Control
                </span>
              </div>
            </Link>
          </div>

          {/* Admin Profile */}
          <div className="p-4 mx-4 my-4 rounded-xl bg-indigo-50 border border-indigo-200">
            <div className="text-xs font-bold text-slate-900 truncate">{adminUser?.name}</div>
            <div className="text-[10px] text-indigo-700 truncate font-medium">{adminUser?.email}</div>
          </div>

          {/* Nav Items */}
          <nav className="px-4 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-accent text-white font-semibold shadow-glow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'inquiries'
                  ? 'bg-accent text-white font-semibold shadow-glow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Project Inquiries</span>
              {inquiries.filter((i) => i.status === 'New').length > 0 && (
                <span className="ml-auto px-1.5 py-0.2 rounded-full text-[10px] bg-accent text-white font-bold">
                  {inquiries.filter((i) => i.status === 'New').length} New
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('client-projects')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'client-projects'
                  ? 'bg-accent text-white font-semibold shadow-glow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Active Client Projects</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-accent text-white font-semibold shadow-glow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Portfolio Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('packages')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'packages'
                  ? 'bg-accent text-white font-semibold shadow-glow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PackageIcon className="w-4 h-4" />
              <span>Package Management</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'services'
                  ? 'bg-accent text-white font-semibold shadow-glow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Services Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'testimonials'
                  ? 'bg-accent text-white font-semibold shadow-glow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Testimonials</span>
            </button>

            <button
              onClick={() => setActiveTab('faqs')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'faqs'
                  ? 'bg-accent text-white font-semibold shadow-glow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>FAQ Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-accent text-white font-semibold shadow-glow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Agency Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Exit */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <Link
            href="/"
            className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </Link>
          <Link
            href="/api/auth/logout"
            className="w-full py-2 px-3 rounded-xl text-slate-500 hover:text-slate-900 text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                Studio Performance & Control
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Real-time snapshot of client inquiries, active development sprints, and content assets.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-mono uppercase">Total Inquiries</div>
                <div className="text-3xl font-bold text-slate-900 mt-1">{inquiries.length}</div>
                <div className="text-[11px] text-accent mt-2 font-semibold">
                  {inquiries.filter((i) => i.status === 'New').length} Pending Review
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-mono uppercase">Active Client Sprints</div>
                <div className="text-3xl font-bold text-accent mt-1">{clientProjects.length}</div>
                <div className="text-[11px] text-slate-500 mt-2">Tracked in Dashboard</div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-mono uppercase">Portfolio Projects</div>
                <div className="text-3xl font-bold text-slate-900 mt-1">{projects.length}</div>
                <div className="text-[11px] text-emerald-600 mt-2 font-medium">Live on Public Showcase</div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-mono uppercase">Active Packages</div>
                <div className="text-3xl font-bold text-indigo-700 mt-1">{packages.length}</div>
                <div className="text-[11px] text-slate-500 mt-2">Configured in DB</div>
              </div>
            </div>

            {/* Recent Inquiries Quick Table */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-slate-900">Recent Inbound Inquiries</h3>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="text-xs font-semibold text-accent hover:underline"
                >
                  View All ({inquiries.length}) →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500">
                      <th className="py-2.5 px-3">Client</th>
                      <th className="py-2.5 px-3">Business</th>
                      <th className="py-2.5 px-3">Package</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inquiries.slice(0, 5).map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3 font-semibold text-slate-900">{inq.clientName}</td>
                        <td className="py-3 px-3 text-slate-500">{inq.businessName || '—'}</td>
                        <td className="py-3 px-3 text-accent font-semibold">{inq.packageName}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            inq.status === 'New' ? 'bg-indigo-50 text-accent' :
                            inq.status === 'Approved' || inq.status === 'In Progress' ? 'bg-emerald-50 text-emerald-800' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {inq.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-400">{new Date(inq.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedInquiry(inq);
                              setActiveTab('inquiries');
                            }}
                            className="text-xs text-accent hover:underline font-semibold"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES MANAGEMENT */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-2xl font-bold text-slate-900">Project Inquiries</h1>
                <p className="text-xs text-slate-500">Review incoming requirements, budgets, and change statuses.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Inquiry List */}
              <div className="lg:col-span-6 space-y-3">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedInquiry?.id === inq.id
                        ? 'bg-indigo-50 border-accent text-slate-900 shadow-glow ring-1 ring-accent'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-slate-900">{inq.clientName}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        inq.status === 'New' ? 'bg-indigo-50 text-accent font-bold' :
                        inq.status === 'Approved' ? 'bg-emerald-50 text-emerald-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {inq.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">{inq.businessName || 'General Inquiry'} • <span className="text-accent font-semibold">{inq.packageName}</span></div>
                    <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                      <span>{inq.email}</span>
                      <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inquiry Detail View */}
              <div className="lg:col-span-6">
                {selectedInquiry ? (
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5 sticky top-6">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="font-display text-lg font-bold text-slate-900">{selectedInquiry.clientName}</h3>
                        <div className="text-xs text-slate-500">{selectedInquiry.email} • {selectedInquiry.phone}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-accent">{selectedInquiry.packageName}</div>
                        <div className="text-[10px] text-slate-400">{selectedInquiry.budget}</div>
                      </div>
                    </div>

                    {/* Status Changer */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-900 mb-2">Update Inquiry Status</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                        {(['New', 'Contacted', 'Discussion', 'Approved', 'In Progress', 'Completed', 'Rejected'] as InquiryStatus[]).map((st) => (
                          <button
                            key={st}
                            onClick={() => handleUpdateInquiryStatus(selectedInquiry.id, st)}
                            className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold border transition-all ${
                              selectedInquiry.status === st
                                ? 'bg-accent text-white border-accent shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Required Pages */}
                    {selectedInquiry.requiredPages && selectedInquiry.requiredPages.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold text-slate-900 mb-1.5">Required Pages</div>
                        <div className="flex flex-wrap gap-1">
                          {selectedInquiry.requiredPages.map((pg) => (
                            <span key={pg} className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-700">
                              {pg}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Required Features */}
                    {selectedInquiry.requiredFeatures && selectedInquiry.requiredFeatures.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold text-slate-900 mb-1.5">Required Features</div>
                        <div className="flex flex-wrap gap-1">
                          {selectedInquiry.requiredFeatures.map((ft) => (
                            <span key={ft} className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-[10px] text-accent font-medium">
                              {ft}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Client Notes */}
                    <div>
                      <div className="text-xs font-semibold text-slate-900 mb-1">Client Message & Requirements</div>
                      <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed whitespace-pre-wrap">
                        {selectedInquiry.message || 'No additional note attached.'}
                      </p>
                    </div>

                    {/* Technical Toggles */}
                    <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-slate-500">Domain: </span>
                        <span className="font-semibold text-slate-900">{selectedInquiry.domainAvailable ? 'Ready' : 'Needed'}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-slate-500">Hosting: </span>
                        <span className="font-semibold text-slate-900">{selectedInquiry.hostingAvailable ? 'Ready' : 'Needed'}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center text-xs text-slate-500 shadow-sm">
                    Select an inquiry from the list to view specifications and update status.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CLIENT PROJECTS & STAGE CONTROLLER */}
        {activeTab === 'client-projects' && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h1 className="font-display text-2xl font-bold text-slate-900">Active Client Projects & Stage Controller</h1>
              <p className="text-xs text-slate-500">Update live project milestones, set staging URLs, post team messages, and upload assets.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Projects List */}
              <div className="lg:col-span-5 space-y-3">
                {clientProjects.map((cp) => (
                  <div
                    key={cp.id}
                    onClick={() => setSelectedClientProject(cp)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedClientProject?.id === cp.id
                        ? 'bg-indigo-50 border-accent text-slate-900 shadow-glow ring-1 ring-accent'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-slate-900">{cp.projectName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-accent">
                        {cp.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">{cp.clientName} ({cp.clientEmail})</div>
                    <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
                      <span>Package: {cp.packageName}</span>
                      <span>Progress: {cp.stageProgress}%</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Project Manager Panel */}
              <div className="lg:col-span-7">
                {selectedClientProject ? (
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 sticky top-6">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="font-display text-lg font-bold text-slate-900">{selectedClientProject.projectName}</h3>
                        <div className="text-xs text-slate-500">{selectedClientProject.clientName} • {selectedClientProject.clientEmail}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono text-accent font-semibold">{selectedClientProject.status}</span>
                      </div>
                    </div>

                    {/* Stage Controller */}
                    <div className="space-y-3">
                      <label className="block text-xs font-semibold text-slate-900">Project Stage Milestone</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {([
                          'Inquiry Submitted',
                          'Discussion',
                          'Design',
                          'Development',
                          'Review',
                          'Launch',
                          'Maintenance',
                        ] as ProjectStage[]).map((st, idx) => (
                          <button
                            key={st}
                            onClick={() => handleUpdateStage(selectedClientProject.id, st, (idx + 1) * 14)}
                            className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
                              selectedClientProject.status === st
                                ? 'bg-accent text-white border-accent shadow-glow'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Staging URL Updater */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-900">Live Staging Sandbox URL</label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          defaultValue={selectedClientProject.stagingUrl || ''}
                          onBlur={(e) => handleUpdateStage(selectedClientProject.id, selectedClientProject.status, selectedClientProject.stageProgress, e.target.value)}
                          placeholder="https://staging.yourproject.com"
                          className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-accent"
                        />
                      </div>
                    </div>

                    {/* Send Message directly to Client Feed */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <label className="block text-xs font-semibold text-slate-900">Post Update to Client Feed</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newAdminMsg}
                          onChange={(e) => setNewAdminMsg(e.target.value)}
                          placeholder="Post design milestone or staging link..."
                          className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-accent"
                        />
                        <button
                          onClick={() => handleSendAdminMessage(selectedClientProject.id)}
                          className="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-xs shadow-glow"
                        >
                          Post
                        </button>
                      </div>
                    </div>

                    {/* Attach Deliverable File */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <label className="block text-xs font-semibold text-slate-900">Attach Deliverable Asset</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newDeliverableName}
                          onChange={(e) => setNewDeliverableName(e.target.value)}
                          placeholder="Asset name (e.g. Design_Tokens_v1.pdf)"
                          className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-accent"
                        />
                        <button
                          onClick={() => handleAddDeliverable(selectedClientProject.id)}
                          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200"
                        >
                          Attach
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center text-xs text-slate-500 shadow-sm">
                    Select an active project to manage milestones.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PORTFOLIO CRUD */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-2xl font-bold text-slate-900">Portfolio Manager</h1>
                <p className="text-xs text-slate-500">Add, edit, or delete public case study showcases.</p>
              </div>
              <button
                onClick={() =>
                  setEditingProject({
                    title: '',
                    slug: '',
                    category: 'Business',
                    client: '',
                    timeline: '2 Weeks',
                    year: new Date().getFullYear().toString(),
                    summary: '',
                    requirement: '',
                    challenge: '',
                    solution: '',
                    features: ['Responsive UI', 'Sub-1s Speeds', 'SEO Optimized'],
                    technologies: ['Next.js', 'React', 'Tailwind CSS'],
                    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop',
                    liveUrl: 'https://example.com',
                    featured: false,
                    sortOrder: projects.length + 1,
                  })
                }
                className="px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-xs shadow-glow flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {proj.category}
                      </span>
                      {proj.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-base font-bold text-slate-900 mb-1">{proj.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{proj.summary}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setEditingProject(proj)}
                      className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit Project Modal */}
            {editingProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
                <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl my-8 space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      {editingProject.id ? 'Edit Project' : 'Create New Project'}
                    </h3>
                    <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={editingProject.title || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-accent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Category</label>
                        <select
                          value={editingProject.category || 'Business'}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-accent"
                        >
                          <option value="Business">Business</option>
                          <option value="Portfolio">Portfolio</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Booking">Booking</option>
                          <option value="Landing Page">Landing Page</option>
                          <option value="Restaurant">Restaurant</option>
                          <option value="Custom">Custom</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Client Name</label>
                        <input
                          type="text"
                          value={editingProject.client || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Hero Image URL</label>
                      <input
                        type="url"
                        value={editingProject.heroImage || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, heroImage: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Summary Overview</label>
                      <textarea
                        rows={2}
                        value={editingProject.summary || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-accent resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Client Requirement</label>
                        <textarea
                          rows={2}
                          value={editingProject.requirement || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, requirement: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-accent resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Solution Provided</label>
                        <textarea
                          rows={2}
                          value={editingProject.solution || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-accent resize-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Live Website URL</label>
                      <input
                        type="url"
                        value={editingProject.liveUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-accent"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingProject.featured || false}
                          onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                          className="rounded text-accent focus:ring-accent border-slate-300"
                        />
                        <span className="text-slate-900 font-medium">Featured Project Badge</span>
                      </label>
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold shadow-glow"
                      >
                        Save Project
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PACKAGES CRUD */}
        {activeTab === 'packages' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-2xl font-bold text-slate-900">Package & Pricing Manager</h1>
                <p className="text-xs text-slate-500">Update package pricing, delivery times, and included features in real-time.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono uppercase text-accent font-semibold">{pkg.tag}</span>
                      {pkg.isPopular && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-accent text-white">POPULAR</span>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-bold text-slate-900">{pkg.name}</h3>
                    <div className="text-2xl font-bold text-slate-900 mt-2">{pkg.price}</div>
                    <div className="text-xs text-slate-500 mt-1">Delivery: {pkg.deliveryTime}</div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setEditingPackage(pkg)}
                      className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Package</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit Package Modal */}
            {editingPackage && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="font-display text-lg font-bold text-slate-900">Edit Package: {editingPackage.name}</h3>
                    <button onClick={() => setEditingPackage(null)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSavePackage} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Package Name</label>
                      <input
                        type="text"
                        required
                        value={editingPackage.name || ''}
                        onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-accent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Display Price</label>
                        <input
                          type="text"
                          required
                          value={editingPackage.price || ''}
                          onChange={(e) => setEditingPackage({ ...editingPackage, price: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Delivery Time</label>
                        <input
                          type="text"
                          value={editingPackage.deliveryTime || ''}
                          onChange={(e) => setEditingPackage({ ...editingPackage, deliveryTime: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={editingPackage.description || ''}
                        onChange={(e) => setEditingPackage({ ...editingPackage, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-accent resize-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingPackage.isPopular || false}
                          onChange={(e) => setEditingPackage({ ...editingPackage, isPopular: e.target.checked })}
                          className="rounded text-accent focus:ring-accent border-slate-300"
                        />
                        <span className="text-slate-900 font-medium">Mark as Most Popular</span>
                      </label>
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingPackage(null)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold shadow-glow"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'settings' && settings && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm max-w-3xl space-y-6 animate-fade-in-up">
            <div>
              <h1 className="font-display text-2xl font-bold text-slate-900">Agency & Contact Settings</h1>
              <p className="text-xs text-slate-500">Configure studio brand name, WhatsApp direct click-to-chat number, and social links.</p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Studio Brand Name</label>
                  <input
                    type="text"
                    value={settings.agencyName}
                    onChange={(e) => setSettings({ ...settings, agencyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Studio Email Address</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">WhatsApp Direct Number (E.164 without +)</label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    placeholder="15552348901"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Display Phone</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Hero Section Headline</label>
                <input
                  type="text"
                  value={settings.headline}
                  onChange={(e) => setSettings({ ...settings, headline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-accent"
                />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-accent text-white font-semibold text-xs shadow-glow hover:bg-accent-hover transition-all"
                >
                  Save Studio Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
