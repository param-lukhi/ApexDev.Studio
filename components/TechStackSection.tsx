import React from 'react';
import { Layers } from 'lucide-react';

const technologies = [
  { name: 'Next.js', category: 'Framework', desc: 'App Router, SSR & Edge Runtime' },
  { name: 'React', category: 'Frontend', desc: 'Component Architecture & UI State' },
  { name: 'TypeScript', category: 'Language', desc: 'Type-safe Enterprise Code' },
  { name: 'JavaScript', category: 'Core', desc: 'ESNext Modern Standards' },
  { name: 'HTML5 & CSS3', category: 'Styling', desc: 'Semantic & Responsive Markup' },
  { name: 'Tailwind CSS', category: 'Styling', desc: 'Modern Design System Tokens' },
  { name: 'Node.js', category: 'Backend', desc: 'High-Throughput Microservices' },
  { name: 'Express', category: 'API', desc: 'RESTful Endpoint Architecture' },
  { name: 'MongoDB', category: 'Database', desc: 'Flexible Document Storage' },
  { name: 'Supabase', category: 'Database & Auth', desc: 'PostgreSQL & Realtime State' },
  { name: 'Firebase', category: 'Backend Cloud', desc: 'Realtime DB & Cloud Functions' },
  { name: 'Stripe API', category: 'Payments', desc: 'Global Secure Checkouts' },
];

export function TechStackSection() {
  return (
    <section className="py-20 relative bg-surface-raised/40 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-muted text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-accent" />
            <span>Modern Production Tools</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Technologies We Work With
          </h2>
          <p className="text-xs sm:text-sm text-foreground-muted">
            Battle-tested frameworks and modern cloud infrastructure selected for speed, security, and developer ergonomics.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="p-4 rounded-xl bg-white border border-slate-200 hover:border-accent/40 hover:bg-slate-50 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="text-[10px] uppercase tracking-wider text-accent font-mono mb-1">
                  {tech.category}
                </div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-accent transition-colors">
                  {tech.name}
                </div>
              </div>
              <div className="text-[11px] text-foreground-muted mt-2">
                {tech.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
