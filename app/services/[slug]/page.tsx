import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Zap,
  Building2,
  ShoppingBag,
  CalendarCheck,
  Flame,
  Code2,
  RefreshCw
} from 'lucide-react';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

interface ServiceDetailPageProps {
  params: {
    slug: string;
  };
}

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

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const service = db.getServices().find((s) => s.slug === params.slug);
  if (!service) {
    return { title: 'Service Not Found' };
  }
  return {
    title: `${service.title} — Web Development Services`,
    description: service.shortDesc,
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const user = getSessionUser();
  const service = db.getServices().find((s) => s.slug === params.slug);
  const settings = db.getSettings();
  const projects = db.getProjects().filter((p) => p.category.toLowerCase().includes(params.slug.split('-')[0]) || p.featured).slice(0, 2);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.iconName] || Code2;

  return (
    <>
      <Navbar user={user ? { name: user.name, email: user.email, role: user.role } : null} />

      <main className="flex-1 pt-28 pb-20 bg-background bg-mesh-hero">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-medium text-foreground-muted hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Services</span>
            </Link>
          </div>

          {/* Service Header Banner */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl mb-12 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-accent uppercase tracking-wider font-semibold">
                  AuraWeb Specialized Service
                </span>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                  {service.title}
                </h1>
              </div>
            </div>

            <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
              {service.fullDesc}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div>
                <div className="text-[10px] uppercase font-mono text-foreground-subtle">Average Turnaround</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{service.turnaround}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono text-foreground-subtle">Performance Standard</div>
                <div className="text-sm font-bold text-accent-emerald mt-0.5">&lt; 0.9s Mobile Load</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono text-foreground-subtle">Architecture</div>
                <div className="text-sm font-bold text-accent mt-0.5">Next.js 14 + Tailwind</div>
              </div>
            </div>
          </div>

          {/* Deliverables Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-14">
            <div className="md:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent-emerald" />
                <span>What We Deliver</span>
              </h2>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Every project built under this service undergoes our rigid 4-stage engineering sprint to guarantee scalability and search ranking superiority.
              </p>
              <ul className="space-y-3 pt-2">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Action Funnel Card */}
            <div className="md:col-span-5 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono uppercase text-accent font-semibold">Direct Kickoff</span>
                <h3 className="font-display text-xl font-bold text-slate-900 mt-1">Ready for {service.title}?</h3>
                <p className="text-xs text-foreground-muted mt-2 leading-relaxed">
                  Submit your requirements to receive a customized architecture proposal and milestone roadmap.
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/start?service=${encodeURIComponent(service.title)}`}
                  className="w-full py-3.5 px-4 rounded-full bg-accent hover:bg-accent-hover text-white font-semibold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/packages"
                  className="w-full py-3 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-colors"
                >
                  <span>View Package Pricing</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Related Case Studies Preview */}
          {projects.length > 0 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-slate-900">Related Project Showcases</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/work/${proj.slug}`}
                    className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-accent/40 shadow-xs hover:shadow-sm group transition-all"
                  >
                    <span className="text-[10px] font-mono text-accent uppercase font-semibold">{proj.category}</span>
                    <h4 className="font-display text-lg font-bold text-slate-900 group-hover:text-accent transition-colors mt-1">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-foreground-muted line-clamp-2 mt-1">
                      {proj.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer settings={settings} />
    </>
  );
}
