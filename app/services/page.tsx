import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Building2, 
  Sparkles, 
  ShoppingBag, 
  CalendarCheck, 
  Flame, 
  Code2, 
  RefreshCw, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FinalCTA } from '@/components/FinalCTA';

export const metadata: Metadata = {
  title: 'Services — What We Build',
  description: 'Custom Web Development, E-commerce, Booking Engines, Landing Pages, High-Performance Redesigns, and 24/7 Website Maintenance.',
};

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Sparkles,
  ShoppingBag,
  CalendarCheck,
  Flame,
  Code2,
  RefreshCw,
  ShieldCheck,
};

export const revalidate = 0;

export default function ServicesPage() {
  const user = getSessionUser();
  const services = db.getServices();
  const settings = db.getSettings();

  return (
    <>
      <Navbar user={user ? { name: user.name, email: user.email, role: user.role } : null} />

      <main className="flex-1 pt-24">
        {/* Header Hero */}
        <div className="bg-mesh-hero border-b border-slate-200 pt-12 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full badge-accent text-xs font-semibold mb-4">
              <span>Capabilities & Engineering</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
              What We Build
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed">
              We engineer bespoke digital platforms built with Next.js, sub-second performance tuning, clean UI/UX, and high-converting workflows.
            </p>
          </div>
        </div>

        {/* Services Showcase Cards */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = iconMap[service.iconName] || Code2;

                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-accent/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Header Strip */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-300 group-hover:text-accent transition-colors">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h2 className="font-display text-2xl font-bold text-slate-900 mb-3 group-hover:text-accent transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-sm text-foreground-muted leading-relaxed mb-6">
                        {service.fullDesc}
                      </p>

                      {/* Deliverables List */}
                      <div className="space-y-2 mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="text-xs font-semibold text-slate-900 mb-2 font-mono uppercase tracking-wider">
                          Key Deliverables:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.deliverables.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald shrink-0" />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                      <div className="text-xs text-accent font-medium">
                        Turnaround: {service.turnaround}
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-foreground-muted hover:text-slate-900 transition-colors"
                        >
                          <span>Deep Dive</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/start?service=${encodeURIComponent(service.title)}`}
                          className="px-4 py-2 rounded-full bg-accent text-white font-semibold text-xs shadow-sm hover:bg-accent-hover transition-all"
                        >
                          Inquire Service
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <FinalCTA />
      </main>

      <Footer settings={settings} />
    </>
  );
}
