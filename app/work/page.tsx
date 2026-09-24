import React from 'react';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PortfolioSection } from '@/components/PortfolioSection';
import { FinalCTA } from '@/components/FinalCTA';

export const metadata: Metadata = {
  title: 'Our Work — Portfolio & Case Studies',
  description: 'Explore bespoke, high-performance websites and digital applications designed and engineered by AuraWeb Studio.',
  openGraph: {
    title: 'Our Work — AuraWeb Studio Portfolio',
    description: 'Explore bespoke websites engineered for performance, brand authority, and high conversions.',
  },
};

export const revalidate = 0;

export default function WorkPage() {
  const user = getSessionUser();
  const projects = db.getProjects();
  const settings = db.getSettings();

  return (
    <>
      <Navbar user={user ? { name: user.name, email: user.email, role: user.role } : null} />
      <main className="flex-1 pt-24">
        {/* Page Banner */}
        <div className="bg-mesh-hero border-b border-white/[0.06] pt-12 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full badge-accent text-xs font-semibold mb-4">
              <span>Production Portfolio</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
              Our Work
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed">
              Websites designed and developed for different businesses, brands and ideas. Tested for sub-second speeds, flawless responsiveness, and conversion.
            </p>
          </div>
        </div>

        {/* Dynamic Portfolio Grid with Category Filters */}
        <PortfolioSection projects={projects} />

        {/* Bottom CTA */}
        <FinalCTA />
      </main>
      <Footer settings={settings} />
    </>
  );
}
