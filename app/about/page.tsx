import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Target, 
  Cpu, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Code2,
  Users
} from 'lucide-react';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TechStackSection } from '@/components/TechStackSection';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { FinalCTA } from '@/components/FinalCTA';

export const metadata: Metadata = {
  title: 'About Us — We Build More Than Websites',
  description: 'Learn about AuraWeb Studio: our engineering standards, design philosophy, supported technologies, and client-first mission.',
  openGraph: {
    title: 'About AuraWeb Studio — High-Performance Web Agency',
    description: 'We engineer digital assets designed around your brand, business model, and growth goals.',
  },
};

const studioValues = [
  {
    title: 'Zero Bloat Craftsmanship',
    description: 'We do not build with heavy drag-and-drop website builders or bloated monolithic themes. We write bespoke, lightweight Next.js and TypeScript code.',
  },
  {
    title: 'Sub-Second Speed Standard',
    description: 'A website that loads slowly loses customers. Every digital platform we deploy is engineered for 95+ Core Web Vitals and sub-second global mobile loads.',
  },
  {
    title: 'Conversion-Focused Architecture',
    description: 'Design is not just decoration. We map clear user journeys, persuasive typography, and frictionless lead funnels that drive real business revenue.',
  },
  {
    title: 'Direct Senior Developer Access',
    description: 'You communicate directly with the software engineers and UI designers building your website. Zero middleman bureaucracy or lost requirements.',
  },
];

export const revalidate = 0;

export default function AboutPage() {
  const user = getSessionUser();
  const settings = db.getSettings();

  return (
    <>
      <Navbar user={user ? { name: user.name, email: user.email, role: user.role } : null} />

      <main className="flex-1 pt-24">
        {/* Banner */}
        <div className="bg-mesh-hero border-b border-slate-200 pt-12 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full badge-accent text-xs font-semibold mb-4">
              <span>Studio Story & Philosophy</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
              We Build More Than Websites.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed">
              We are an engineering and design studio dedicated exclusively to building high-performance, bespoke web platforms that establish authority and drive business growth.
            </p>
          </div>
        </div>

        {/* Story & Philosophy Section */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                  Engineered For Speed, Crafted For <span className="text-gradient-accent">Brand Impact.</span>
                </h2>
                <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                  Founded with a singular conviction: modern businesses deserve web platforms that reflect the true quality of their products. We bridge the gap between creative visual artistry and institutional-grade software engineering.
                </p>
                <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                  Whether launching a high-converting landing page, scaling an e-commerce storefront, or redesigning a corporate digital presence, we approach every project with rigorous attention to typography, responsiveness, and performance.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="text-2xl font-bold text-accent font-display">100%</div>
                    <div className="text-xs text-foreground-muted mt-1">Custom Handcrafted Code (Zero Templates)</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="text-2xl font-bold text-accent-emerald font-display">&lt; 0.8s</div>
                    <div className="text-xs text-foreground-muted mt-1">Average Edge Mobile Load Time</div>
                  </div>
                </div>
              </div>

              {/* Values Stack */}
              <div className="lg:col-span-5 space-y-4">
                {studioValues.map((val, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-sm transition-all">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      <span>{val.title}</span>
                    </h3>
                    <p className="text-xs text-foreground-muted leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section Component */}
        <WhyChooseUs />

        {/* Tech Stack Component */}
        <TechStackSection />

        {/* Bottom CTA */}
        <FinalCTA />
      </main>

      <Footer settings={settings} />
    </>
  );
}
