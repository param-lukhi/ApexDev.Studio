import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service and project engagement parameters for AuraWeb Studio.',
};

export default function TermsPage() {
  const user = getSessionUser();
  const settings = db.getSettings();

  return (
    <>
      <Navbar user={user ? { name: user.name, email: user.email, role: user.role } : null} />
      <main className="flex-1 pt-32 pb-24 bg-background bg-mesh-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-6 text-sm text-slate-600 leading-relaxed">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">Terms of Service</h1>
            <p className="text-xs font-mono text-accent font-semibold">Last updated: September 2026</p>

            <h2 className="text-lg font-bold text-slate-900 pt-4">1. Scope of Engagement</h2>
            <p>
              AuraWeb Studio provides custom website design, web engineering, redesigns, performance optimization, and ongoing maintenance under agreed package specifications.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2">2. 4-Stage Development Methodology</h2>
            <p>
              All client projects follow our structured 4-stage pipeline: (1) Analyze, (2) Design, (3) Implement, and (4) Maintain. Client feedback milestones are aligned at each stage before progression to final production deployment.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2">3. Intellectual Property</h2>
            <p>
              Upon full settlement of agreed project fees, all bespoke source code, visual designs, assets, and database configurations created specifically for the client become 100% the property of the client.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2">4. Support & Warranty</h2>
            <p>
              Each package includes dedicated post-launch support (ranging from 14 to 60 days). Continued retainer support is available under our Website Maintenance service plans.
            </p>
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
