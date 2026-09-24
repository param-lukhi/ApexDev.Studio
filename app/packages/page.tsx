import React from 'react';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PricingPackages } from '@/components/PricingPackages';
import { FAQSection } from '@/components/FAQSection';
import { FinalCTA } from '@/components/FinalCTA';

export const metadata: Metadata = {
  title: 'Packages & Pricing — Transparent Investment',
  description: 'Transparent website development packages: Starter, Professional, Premium, and Custom. No hidden fees.',
  openGraph: {
    title: 'Website Development Packages — AuraWeb Studio',
    description: 'Explore tailored website packages with clear deliverables, guaranteed turnarounds, and post-launch support.',
  },
};

export const revalidate = 0;

export default function PackagesPage() {
  const user = getSessionUser();
  const packages = db.getPackages();
  const faqs = db.getFAQs().filter((f) => f.category === 'Pricing' || f.category === 'Timeline' || f.category === 'General');
  const settings = db.getSettings();

  return (
    <>
      <Navbar user={user ? { name: user.name, email: user.email, role: user.role } : null} />

      <main className="flex-1 pt-24">
        {/* Banner */}
        <div className="bg-mesh-hero border-b border-slate-200 pt-12 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full badge-accent text-xs font-semibold mb-4">
              <span>Transparent Pricing & SLAs</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
              Website Packages & Pricing
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed">
              Every package is engineered from scratch for optimal performance, mobile responsiveness, and high conversion. No recurring software lock-ins.
            </p>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <PricingPackages packages={packages} />

        {/* Pricing & Guarantee FAQs */}
        <FAQSection faqs={faqs.length > 0 ? faqs : db.getFAQs()} />

        {/* Bottom CTA */}
        <FinalCTA />
      </main>

      <Footer settings={settings} />
    </>
  );
}
