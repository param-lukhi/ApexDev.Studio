import React from 'react';
import { Target, Cpu, Award, Sparkles, ShieldCheck, Zap, Layers } from 'lucide-react';
import { TechStackSection } from './TechStackSection';

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative bg-background border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-muted text-xs font-semibold uppercase tracking-wider">
              <span>Studio Philosophy</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              We Build More Than Websites. We Build <span className="text-gradient-accent">Digital Assets.</span>
            </h2>

            <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
              We are an engineering and design studio specialized exclusively in high-performance web development. We reject bloated templates, unnecessary libraries, and slow monolithic CMS plugins in favor of lean, bespoke Next.js architectures.
            </p>

            <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
              Our design philosophy is anchored in clarity, typography, and speed. A website should immediately communicate value, guide the visitor intuitively to take action, and load in under 1 second on mobile networks.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-2xl font-bold text-slate-900 mb-1 font-display">100%</div>
                <div className="text-xs text-foreground-muted">Custom Handcrafted Code (Zero Bloat)</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-2xl font-bold text-accent mb-1 font-display">&lt; 0.8s</div>
                <div className="text-xs text-foreground-muted">Average Global Mobile Load Time</div>
              </div>
            </div>
          </div>

          {/* Right Column Core Values */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Conversion-First Architecture</h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  Every section, headline, and call-to-action is strategically mapped to turn visitors into inquiries, customers, and long-term brand advocates.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center text-accent-violet shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Modern High-Speed Stacks</h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  We use Next.js, React, TypeScript, and edge hosting networks to ensure instant navigation, SEO ranking superiority, and bank-grade security.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 flex items-start gap-4 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-accent-emerald/10 border border-accent-emerald/20 flex items-center justify-center text-accent-emerald shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Direct Developer Access</h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  You work directly with the senior engineers building your platform. No middlemen, no telephone games, and rapid turnarounds.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Tech Stack Grid */}
        <TechStackSection />
      </div>
    </section>
  );
}
