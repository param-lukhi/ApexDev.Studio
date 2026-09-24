'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Send, 
  Check, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  MessageSquare, 
  Mail, 
  Phone, 
  ArrowRight,
  Globe,
  Server,
  ArrowUpRight,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AgencySettings, Package } from '@/lib/types';

interface StartProjectSectionProps {
  settings: AgencySettings;
  packages: Package[];
}

const availablePages = [
  'Homepage / Landing',
  'About Us / Story',
  'Services / Offerings',
  'Portfolio / Case Studies',
  'Pricing & Packages',
  'Blog / News CMS',
  'Contact & Location',
  'Client Portal / Login',
  'Booking / Reservation System',
  'E-commerce Store Catalog',
  'FAQ & Help Center',
  'Custom Specialized Page',
];

const availableFeatures = [
  'Custom Responsive UI/UX Design',
  'Sub-Second Page Load Speed Tuning',
  'Interactive Animations & Micro-interactions',
  'Content Management System (CMS)',
  'Stripe / PayPal Payment Processing',
  'Direct WhatsApp & CRM Integration',
  'Interactive Booking & Calendar Sync',
  'Multi-Language & Localization',
  'Advanced Search Engine Optimization (SEO)',
  'Client Login & Gated Membership',
];

export function StartProjectSection({ settings, packages }: StartProjectSectionProps) {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    businessName: '',
    websiteType: 'Business Website',
    selectedPackageId: 'pkg-pro',
    packageName: 'PROFESSIONAL',
    requiredPages: ['Homepage / Landing', 'About Us / Story', 'Services / Offerings', 'Contact & Location'],
    requiredFeatures: ['Custom Responsive UI/UX Design', 'Sub-Second Page Load Speed Tuning', 'Advanced Search Engine Optimization (SEO)'],
    preferredDesign: 'Minimalist modern dark theme with clean typography',
    referenceWebsite: '',
    domainAvailable: true,
    hostingAvailable: false,
    additionalRequirements: '',
    budget: '$1,500 - $3,500',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setFormData((prev) => ({
            ...prev,
            clientName: prev.clientName || data.user.name,
            email: prev.email || data.user.email,
            phone: prev.phone || data.user.phone || '',
          }));
        }
      })
      .catch(() => {});
  }, []);

  const handlePackageSelect = (pkgId: string) => {
    const pkg = packages.find((p) => p.id === pkgId);
    setFormData((prev) => ({
      ...prev,
      selectedPackageId: pkgId,
      packageName: pkg?.name || 'PROFESSIONAL',
    }));
  };

  const togglePage = (pageName: string) => {
    setFormData((prev) => {
      const exists = prev.requiredPages.includes(pageName);
      return {
        ...prev,
        requiredPages: exists
          ? prev.requiredPages.filter((p) => p !== pageName)
          : [...prev.requiredPages, pageName],
      };
    });
  };

  const toggleFeature = (featureName: string) => {
    setFormData((prev) => {
      const exists = prev.requiredFeatures.includes(featureName);
      return {
        ...prev,
        requiredFeatures: exists
          ? prev.requiredFeatures.filter((f) => f !== featureName)
          : [...prev.requiredFeatures, featureName],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit requirements.');
      }

      setSubmitted(true);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    } catch (err: any) {
      setError(err.message || 'Submission error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hi AuraWeb Studio! I would like to discuss building a website for my business.'
  )}`;

  return (
    <section id="start" className="py-24 relative bg-surface-raised/40 border-t border-slate-200 bg-mesh-hero">
      <div id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full badge-accent text-xs font-semibold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Interactive Project Builder</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Start Your Project
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted">
            Configure your website requirements, required pages, and desired features to receive a formal project plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Communication & Studio Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 shadow-sm">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-1">Direct Contact</h3>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  Have a quick question? Reach out to our technical team directly.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-accent/40 text-foreground-muted hover:text-slate-900 shadow-xs hover:shadow-sm transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] text-foreground-subtle uppercase font-mono">Email Us</div>
                    <div className="text-xs font-semibold text-slate-900 group-hover:text-accent transition-colors truncate">
                      {settings.email}
                    </div>
                  </div>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 hover:border-emerald-300 text-emerald-700 shadow-xs hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-emerald-800 uppercase font-mono">WhatsApp Chat</div>
                      <div className="text-xs font-semibold text-slate-900">Chat With Tech Lead</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center text-accent-violet shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-foreground-subtle uppercase font-mono">Direct Phone</div>
                    <div className="text-xs font-semibold text-slate-900">{settings.phone}</div>
                  </div>
                </div>
              </div>

              {/* Guarantees Strip */}
              <div className="pt-4 border-t border-slate-200 space-y-2.5 text-xs text-foreground-subtle">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
                  <span>4-Hour Business Response SLA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>100% Bespoke Next.js Code</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-violet shrink-0" />
                  <span>Zero Obligation Requirement Scoping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Requirement Builder */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-2xl space-y-6 animate-fade-in-up">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                  Project Request Confirmed!
                </h3>

                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed max-w-md mx-auto">
                  Thank you, <span className="text-slate-900 font-semibold">{formData.clientName}</span>. We have created your project record for the <span className="text-accent font-semibold">{formData.packageName}</span> package.
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left space-y-2 max-w-md mx-auto">
                  <div className="text-slate-900 font-semibold">Immediate Next Milestones:</div>
                  <div className="flex items-center gap-2 text-foreground-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>Our senior technical lead reviews your requirements.</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
                    <span>Stage 01 (ANALYZE) kickoff begins within 4 business hours.</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                    <span>You can track live milestones and chat in your Client Dashboard.</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <Link
                    href={user ? '/client/dashboard' : '/login?redirect=/client/dashboard'}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-white font-semibold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Open Client Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs sm:text-sm border border-slate-200"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-xs text-red-700">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* 1. Package Choice */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-3">
                    Step 1: Choose Website Package
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {packages.map((pkg) => {
                      const isSelected = formData.selectedPackageId === pkg.id;
                      return (
                        <button
                          type="button"
                          key={pkg.id}
                          onClick={() => handlePackageSelect(pkg.id)}
                          className={`p-3.5 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? 'bg-accent/10 border-accent text-slate-900 shadow-sm ring-1 ring-accent/20'
                              : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-foreground-muted'
                          }`}
                        >
                          <div className="text-[10px] font-mono text-foreground-subtle">Package</div>
                          <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">{pkg.name}</div>
                          <div className="text-xs font-semibold text-accent mt-1">{pkg.price}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Client & Contact Info */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <label className="block text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                    Step 2: Client & Contact Information
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="Elena Rostova"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">
                        Business / Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Lumina Horology"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">
                        Website Category
                      </label>
                      <select
                        value={formData.websiteType}
                        onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      >
                        <option value="Business Website">Business Website</option>
                        <option value="E-commerce Store">E-commerce Store</option>
                        <option value="Booking & Hospitality">Booking & Hospitality</option>
                        <option value="Creative Portfolio">Creative Portfolio</option>
                        <option value="High-Converting Landing Page">High-Converting Landing Page</option>
                        <option value="Custom Web Application">Custom Web Application</option>
                        <option value="Website Redesign">Website Redesign</option>
                        <option value="Website Maintenance">Website Maintenance</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Required Pages Multi-Select */}
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <label className="block text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                    Step 3: Select Required Pages ({formData.requiredPages.length} selected)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {availablePages.map((page) => {
                      const isChecked = formData.requiredPages.includes(page);
                      return (
                        <button
                          type="button"
                          key={page}
                          onClick={() => togglePage(page)}
                          className={`p-2.5 rounded-xl text-left text-xs border transition-all flex items-center justify-between ${
                            isChecked
                              ? 'bg-accent/10 border-accent text-slate-900 font-medium'
                              : 'bg-slate-50 border-slate-200 text-foreground-muted hover:border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <span className="truncate pr-1">{page}</span>
                          {isChecked && <Check className="w-3.5 h-3.5 text-accent shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Required Features Multi-Select */}
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <label className="block text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                    Step 4: Desired Features & Integrations
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableFeatures.map((feat) => {
                      const isChecked = formData.requiredFeatures.includes(feat);
                      return (
                        <button
                          type="button"
                          key={feat}
                          onClick={() => toggleFeature(feat)}
                          className={`p-3 rounded-xl text-left text-xs border transition-all flex items-center justify-between ${
                            isChecked
                              ? 'bg-accent/10 border-accent text-slate-900 font-medium'
                              : 'bg-slate-50 border-slate-200 text-foreground-muted hover:border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <span>{feat}</span>
                          {isChecked && <Check className="w-3.5 h-3.5 text-accent shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Design Preferences & Domain/Hosting Toggles */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <label className="block text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                    Step 5: Design Direction & Technical Setup
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">
                        Preferred Visual Style / Theme
                      </label>
                      <input
                        type="text"
                        value={formData.preferredDesign}
                        onChange={(e) => setFormData({ ...formData, preferredDesign: e.target.value })}
                        placeholder="e.g. Clean minimalist light aesthetic, indigo accents, modern typography"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">
                        Reference Website URL (Inspiring design)
                      </label>
                      <input
                        type="text"
                        value={formData.referenceWebsite}
                        onChange={(e) => setFormData({ ...formData, referenceWebsite: e.target.value })}
                        placeholder="https://example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>

                  {/* Domain & Hosting Checkbox Toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.domainAvailable}
                        onChange={(e) => setFormData({ ...formData, domainAvailable: e.target.checked })}
                        className="w-4 h-4 rounded text-accent focus:ring-accent bg-white border-slate-300"
                      />
                      <div className="text-xs">
                        <div className="font-semibold text-slate-900">Domain Ready</div>
                        <div className="text-[10px] text-foreground-subtle">I own a custom domain</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.hostingAvailable}
                        onChange={(e) => setFormData({ ...formData, hostingAvailable: e.target.checked })}
                        className="w-4 h-4 rounded text-accent focus:ring-accent bg-white border-slate-300"
                      />
                      <div className="text-xs">
                        <div className="font-semibold text-slate-900">Hosting Ready</div>
                        <div className="text-[10px] text-foreground-subtle">I have cloud hosting provider</div>
                      </div>
                    </label>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">
                        Budget Estimate
                      </label>
                      <input
                        type="text"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder="$1,000 - $3,000"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Project Details / Special Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your brand, requirements, desired launch deadline, or custom third-party integrations..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-slate-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-2xl bg-accent hover:bg-accent-hover text-white font-bold text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 transform hover:-translate-y-0.5"
                  >
                    {loading ? (
                      <span>Submitting Project Request...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit Project Request</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-foreground-subtle mt-3">
                    Zero obligation inquiry. We will review your scope and provide a formal project breakdown within 4 hours.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
