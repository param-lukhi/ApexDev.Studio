import React from 'react';
import { Palette, Smartphone, Zap, HeartHandshake } from 'lucide-react';

const trustPillars = [
  {
    icon: Palette,
    title: 'Custom Design',
    description: 'No generic templates. Tailored pixel-perfect UI crafted specifically for your brand identity.',
  },
  {
    icon: Smartphone,
    title: 'Responsive & Fluid',
    description: 'Flawlessly tested across mobile, tablet, laptop, and ultra-wide desktop viewports.',
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Optimized for sub-second load times and 95+ Core Web Vitals to maximize search ranking.',
  },
  {
    icon: HeartHandshake,
    title: 'Client Focused',
    description: 'Direct communication with dedicated developers, transparent milestones, and post-launch support.',
  },
];

export function TrustBar() {
  return (
    <section className="py-10 border-y border-slate-200/80 bg-white/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200/80 hover:border-accent/40 shadow-xs hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">{pillar.title}</h4>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
