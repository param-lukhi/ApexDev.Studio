import React from 'react';
import { Sparkles, Layout, Smartphone, Zap, Server, ShieldCheck } from 'lucide-react';

const reasons = [
  {
    icon: Sparkles,
    title: 'Custom Built',
    desc: 'Bespoke architecture designed from scratch for your brand, not bloated one-size-fits-all templates.',
  },
  {
    icon: Layout,
    title: 'Modern UI',
    desc: 'Clean typography, balanced visual hierarchy, subtle micro-interactions, and elevated aesthetics.',
  },
  {
    icon: Smartphone,
    title: 'Fully Responsive',
    desc: 'Pixel-perfect rendering tested across smartphones, tablets, laptops, and ultra-wide screens.',
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    desc: 'Engineered for sub-second loads and 95+ Core Web Vitals to maximize search ranking and conversion.',
  },
  {
    icon: Server,
    title: 'Scalable',
    desc: 'Clean modular codebase ready to scale smoothly from a 5-page launchpad to an enterprise SaaS.',
  },
  {
    icon: ShieldCheck,
    title: 'Post-Launch Support',
    desc: 'Dedicated post-launch warranty, security monitoring, and ongoing technical guidance.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-muted text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Competitive Edge</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Why Work With Us?
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted">
            We focus on clean craftsmanship, transparent communication, and measurable performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="glass-panel-interactive rounded-2xl p-6 border border-slate-200"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
