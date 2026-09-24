'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Layers, 
  Sparkles, 
  Check, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle,
  HelpCircle,
  Globe,
  Server
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PackageOption {
  id: string;
  name: string;
  price: string;
  deliveryTime: string;
}

const defaultPackages: PackageOption[] = [
  { id: 'pkg-starter', name: 'STARTER', price: '$990', deliveryTime: '7 - 10 Business Days' },
  { id: 'pkg-pro', name: 'PROFESSIONAL', price: '$1,950', deliveryTime: '2 - 3 Weeks' },
  { id: 'pkg-premium', name: 'PREMIUM', price: '$3,800', deliveryTime: '3 - 5 Weeks' },
  { id: 'pkg-custom', name: 'CUSTOM', price: 'Custom Quote', deliveryTime: 'Custom Timeline' },
];

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

function StartProjectFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPackageParam = searchParams.get('package') || 'pkg-pro';
  const referenceParam = searchParams.get('reference') || '';
  const serviceParam = searchParams.get('service') || '';

  const [user, setUser] = useState<any>(null);
  const [packages, setPackages] = useState<PackageOption[]>(defaultPackages);

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    businessName: '',
    websiteType: serviceParam || 'Business Website',
    selectedPackageId: initialPackageParam,
    packageName: 'PROFESSIONAL',
    requiredPages: ['Homepage / Landing', 'About Us / Story', 'Services / Offerings', 'Contact & Location'],
    requiredFeatures: ['Custom Responsive UI/UX Design', 'Sub-Second Page Load Speed Tuning', 'Advanced Search Engine Optimization (SEO)'],
    preferredDesign: 'Minimalist modern dark theme with clean typography',
    referenceWebsite: referenceParam ? `Inspired by ${referenceParam}` : '',
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

    fetch('/api/packages')
      .then((res) => res.json())
      .then((data) => {
        if (data.packages && data.packages.length > 0) {
          setPackages(data.packages);
          const matched = data.packages.find((p: any) => p.id === initialPackageParam);
          if (matched) {
            setFormData((prev) => ({
              ...prev,
              selectedPackageId: matched.id,
              packageName: matched.name,
            }));
          }
        }
      })
      .catch(() => {});
  }, [initialPackageParam]);

  const handlePackageChange = (pkgId: string) => {
    const pkg = packages.find((p) => p.id === pkgId);
    setFormData({
      ...formData,
      selectedPackageId: pkgId,
      packageName: pkg?.name || 'PROFESSIONAL',
    });
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

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-16 px-4 bg-mesh-hero">
        <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-xl w-full text-center border border-slate-200 shadow-2xl space-y-6 animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Project Request Confirmed!
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            Thank you, <span className="text-slate-900 font-semibold">{formData.clientName}</span>. Your project inquiry for the <span className="text-accent font-semibold">{formData.packageName}</span> package has been created.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-left space-y-2">
            <div className="text-slate-900 font-semibold">Immediate Next Milestones:</div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Our lead engineer reviews your technical requirements.</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
              <span>Stage 01 (ANALYZE) kickoff begins within 4 business hours.</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
              <span>Track progress, view wireframes, and chat inside your Client Dashboard.</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={user ? '/client/dashboard' : '/login?redirect=/client/dashboard'}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-accent hover:bg-accent-hover text-white font-semibold text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2"
            >
              <span>Open Client Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs sm:text-sm border border-slate-200"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-mesh-hero">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-accent to-accent-violet flex items-center justify-center shadow-glow">
              <Layers className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-lg text-slate-900">
              AuraWeb Studio
            </span>
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-2">
            Start Your Project
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Tell us what you need and let&apos;s turn your idea into a high-performance website.
          </p>
        </div>

        {/* User Auth Banner Notice */}
        {!user && (
          <div className="rounded-2xl p-4 mb-8 border border-accent/30 bg-indigo-50/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-slate-700">
              <HelpCircle className="w-4 h-4 text-accent shrink-0" />
              <span>Already have an account? Sign in to link this project directly to your Client Dashboard.</span>
            </div>
            <Link
              href="/login?redirect=/start"
              className="px-4 py-1.5 rounded-full bg-accent text-white hover:bg-accent-hover font-semibold shadow-sm whitespace-nowrap transition-colors"
            >
              Client Login
            </Link>
          </div>
        )}

        {/* Main Requirement Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. Selected Package Choice */}
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
                    onClick={() => handlePackageChange(pkg.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-indigo-50 border-accent text-slate-900 shadow-glow ring-1 ring-accent'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <div className="text-[11px] font-mono text-slate-500">Package</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">{pkg.name}</div>
                    <div className="text-xs font-semibold text-accent mt-1">{pkg.price}</div>
                    <div className="text-[10px] text-slate-500 mt-1">{pkg.deliveryTime}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Client & Business Contact Details */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <label className="block text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              Step 2: Client & Contact Info
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Elena Rostova"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-accent"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-accent"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-accent"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Website Type
                </label>
                <select
                  value={formData.websiteType}
                  onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-accent"
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
          <div className="space-y-3 pt-4 border-t border-slate-100">
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
                        ? 'bg-indigo-50 border-accent text-indigo-700 font-semibold shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
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
          <div className="space-y-3 pt-4 border-t border-slate-100">
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
                        ? 'bg-indigo-50 border-accent text-indigo-700 font-semibold shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
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
          <div className="space-y-4 pt-4 border-t border-slate-100">
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
                  placeholder="e.g. Modern minimalist light theme, clean typography, luxury Swiss style"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-accent"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-accent"
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
                  className="w-4 h-4 rounded text-accent focus:ring-accent border-slate-300"
                />
                <div className="text-xs">
                  <div className="font-semibold text-slate-900">Domain Ready</div>
                  <div className="text-[10px] text-slate-500">I already own a custom domain</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.hostingAvailable}
                  onChange={(e) => setFormData({ ...formData, hostingAvailable: e.target.checked })}
                  className="w-4 h-4 rounded text-accent focus:ring-accent border-slate-300"
                />
                <div className="text-xs">
                  <div className="font-semibold text-slate-900">Hosting Ready</div>
                  <div className="text-[10px] text-slate-500">I have cloud hosting provider</div>
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
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Additional Requirements / Special Notes
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Any custom third-party integrations, launch deadline, target audience specifications..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-accent resize-none"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-2xl bg-accent hover:bg-accent-hover text-white font-bold text-sm sm:text-base shadow-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50 transform hover:-translate-y-0.5"
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
            <p className="text-center text-[11px] text-slate-500 mt-3">
              Zero obligation inquiry. We will review your scope and provide a formal project breakdown within 4 hours.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function StartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-xs text-slate-500">Loading start flow...</div>}>
      <StartProjectFormContent />
    </Suspense>
  );
}
