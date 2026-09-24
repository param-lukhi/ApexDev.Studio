'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, Globe, Zap, Layers, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-mesh-hero">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          {/* Studio Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-accent text-xs font-semibold mb-6 animate-fade-in-up shadow-glow">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>High-Performance Web Development Studio</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Websites That Build{' '}
            <span className="text-gradient-accent">Your Brand.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-foreground-muted leading-relaxed mb-8 max-w-2xl mx-auto">
            Modern, responsive and high-performance websites designed around your business, brand and goals.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#start"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold bg-accent hover:bg-accent-hover text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Get Your Website</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-medium bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 shadow-sm transition-all duration-300"
            >
              <span>View Our Work</span>
            </a>
          </div>

          {/* Key Quick Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-xs text-foreground-subtle">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald" />
              <span>Sub-1s Page Speeds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
              <span>100% Mobile Optimized</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent-violet" />
              <span>Dedicated Support</span>
            </div>
          </div>
        </div>

        {/* Multi-Mockup Hero Showcase */}
        <div className="relative max-w-5xl mx-auto">
          {/* Ambient Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-accent/10 via-accent-violet/10 to-accent-emerald/10 rounded-3xl blur-2xl opacity-60 -z-10 pointer-events-none" />

          {/* Main Desktop Mockup Frame */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
            {/* Browser Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-100/90 border-b border-slate-200">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-white border border-slate-200 text-[11px] text-slate-600 max-w-xs w-full justify-center font-mono shadow-xs">
                <Globe className="w-3 h-3 text-accent" />
                <span className="truncate">https://aurapay-platform.preview.live</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground-subtle">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase font-mono text-emerald-600 font-medium">99 / 100 Score</span>
              </div>
            </div>

            {/* Inner Interactive Showcase Canvas */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 bg-gradient-to-b from-white to-slate-50/70">
              {/* Left Column Preview: FinTech Platform */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20 text-[11px] font-semibold text-accent">
                    <Zap className="w-3 h-3" /> Featured Production Showcase
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                    AuraPay Global Treasury Platform
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                    Ultra-fast cross-border payments architecture built with Next.js 14, real-time rate engines, and sub-0.6s time-to-interactive.
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Stripe API', 'PostgreSQL'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-[11px] text-slate-700 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metric Strip */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="text-xs text-foreground-subtle">Load Speed</div>
                    <div className="text-base font-bold text-accent">0.48s</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="text-xs text-foreground-subtle">Lighthouse</div>
                    <div className="text-base font-bold text-accent-emerald">100%</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="text-xs text-foreground-subtle">Conversion</div>
                    <div className="text-base font-bold text-accent-violet">+142%</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Multi-Device Responsive Stacking Preview */}
              <div className="md:col-span-5 flex flex-col justify-center gap-3">
                <div className="group p-3.5 rounded-xl bg-white hover:bg-slate-50/80 border border-slate-200 shadow-sm transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center font-bold text-amber-600 text-xs">
                      LMN
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Lumina Luxury Horology</div>
                      <div className="text-[11px] text-foreground-subtle">Bespoke Swiss E-commerce</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Live
                  </span>
                </div>

                <div className="group p-3.5 rounded-xl bg-white hover:bg-slate-50/80 border border-slate-200 shadow-sm transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center font-bold text-indigo-600 text-xs">
                      SLS
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Solstice Alpine Resort</div>
                      <div className="text-[11px] text-foreground-subtle">Real-Time Booking Engine</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">
                    Direct Sync
                  </span>
                </div>

                <div className="group p-3.5 rounded-xl bg-white hover:bg-slate-50/80 border border-slate-200 shadow-sm transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center font-bold text-violet-600 text-xs">
                      KRU
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Kuro Architecture Studio</div>
                      <div className="text-[11px] text-foreground-subtle">Spatial Minimalist Archive</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200">
                    Sub-0.5s
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
