import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  User, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Monitor,
  Smartphone
} from 'lucide-react';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const project = db.getProjectBySlug(params.slug);
  if (!project) {
    return { title: 'Project Not Found' };
  }
  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Website Development Case Study`,
      description: project.summary,
      images: [{ url: project.heroImage }],
    },
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const user = getSessionUser();
  const project = db.getProjectBySlug(params.slug);
  const settings = db.getSettings();

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar user={user ? { name: user.name, email: user.email, role: user.role } : null} />

      <main className="flex-1 pt-28 pb-20 bg-background bg-mesh-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-xs font-medium text-foreground-muted hover:text-slate-900 transition-colors p-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Projects</span>
            </Link>
          </div>

          {/* Project Title & Meta Banner */}
          <div className="space-y-4 mb-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 border border-accent/20 text-accent">
                {project.category}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs text-foreground-muted bg-slate-100 border border-slate-200">
                {project.year} Case Study
              </span>
              {project.featured && (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  Featured Client
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-foreground-muted leading-relaxed max-w-3xl">
              {project.summary}
            </p>

            {/* Quick Metadata Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
              <div>
                <div className="text-[11px] font-mono uppercase text-foreground-subtle">Client</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5">{project.client}</div>
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase text-foreground-subtle">Timeline</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5">{project.timeline}</div>
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase text-foreground-subtle">Category</div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5">{project.category}</div>
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase text-foreground-subtle">Live Project</div>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-accent hover:underline mt-0.5"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Hero Full-Bleed Showcase Image */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 relative aspect-[16/9] shadow-xl mb-14 bg-slate-100">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-top"
            />
          </div>

          {/* Core Case Study Breakdown: Requirements, Challenge, Solution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* 1. Client Requirement */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-3">
              <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <span className="font-mono text-xs font-bold">01</span>
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900">Client Requirement</h3>
              <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                {project.requirement}
              </p>
            </div>

            {/* 2. Challenge */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-3">
              <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                <span className="font-mono text-xs font-bold">02</span>
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900">The Challenge</h3>
              <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* 3. Solution */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <span className="font-mono text-xs font-bold">03</span>
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900">Our Solution</h3>
              <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features & Tech Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Features */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="font-display text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <span>Engineered Features</span>
              </h3>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-accent-violet" />
                  <span>Technologies Used</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 mt-6">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-accent text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-accent-hover transition-all"
                >
                  <span>Launch Live Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Secondary Screenshots Gallery */}
          {project.screenshots && project.screenshots.length > 1 && (
            <div className="space-y-6 mb-20">
              <h3 className="font-display text-2xl font-bold text-slate-900">Responsive Previews & Screens</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.screenshots.slice(1).map((shot, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-md"
                  >
                    <Image
                      src={shot}
                      alt={`${project.title} screenshot ${idx + 2}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Lead Funnel Box */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-accent text-xs font-semibold mb-4">
              <span>Tailored For Your Brand</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Want a Website Like This?
            </h2>

            <p className="text-xs sm:text-sm text-foreground-muted mb-6 max-w-xl mx-auto leading-relaxed">
              We can design, engineer, and deploy a bespoke platform for your business with the same level of speed and visual excellence.
            </p>

            <Link
              href={`/start?reference=${encodeURIComponent(project.title)}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-white font-semibold text-sm shadow-md transition-all duration-300"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </>
  );
}
