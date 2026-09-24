import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for AuraWeb Studio web development services and client portal.',
};

export default function PrivacyPage() {
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">Privacy Policy</h1>
            <p className="text-xs font-mono text-accent font-semibold">Last updated: September 2026</p>

            <h2 className="text-lg font-bold text-slate-900 pt-4">1. Information We Collect</h2>
            <p>
              When you submit a project requirement inquiry, create a client portal account, or contact AuraWeb Studio, we collect necessary business contact information including your full name, email address, phone number, company name, and project specifications.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2">2. How We Use Your Data</h2>
            <p>
              We utilize your project information solely to evaluate requirements, prepare project scopes, engineer bespoke websites, and maintain direct communications with your team throughout the development sprint.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2">3. Data Security & Storage</h2>
            <p>
              We implement industry-standard encryption, password hashing (bcrypt), and role-gated access control. We never sell, rent, or trade client information to third parties.
            </p>

            <h2 className="text-lg font-bold text-slate-900 pt-2">4. Contact Us</h2>
            <p>
              For privacy inquiries or data requests, please reach out directly to{' '}
              <a href={`mailto:${settings.email}`} className="text-accent underline font-medium">
                {settings.email}
              </a>.
            </p>
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
