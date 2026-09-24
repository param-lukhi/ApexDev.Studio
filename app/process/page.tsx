import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Search, 
  PenTool, 
  Code, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  FileCheck,
  Zap,
  Layers
} from 'lucide-react';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FinalCTA } from '@/components/FinalCTA';

export const metadata: Metadata = {
  title: 'Our Process — How We Build Your Website',
  description: 'Our 4-stage engineering sprint: Analyze, Design, Implement, and Maintain. Transparent milestones from kickoff to post-launch support.',
  openGraph: {
    title: 'How We Build Your Website — AuraWeb Studio',
    description: 'A structured 4-stage engineering workflow: Analyze → Design → Implement → Maintain.',
  },
};

const detailedStages = [
  {
    step: '01',
    name: 'ANALYZE',
    title: 'Understand Before We Build',
    icon: Search,
    accent: 'text-accent',
    border: 'border-accent/30',
    bg: 'bg-accent/10',
    duration: '2 - 4 Business Days',
    summary: 'We delve deeply into your target audience, conversion objectives, and technical constraints before writing a single line of code.',
    tasks: [
      'Understand your business revenue model & target audience intent',
      'Collect comprehensive technical specifications & API requirements',
      'Analyze design references, competitor strengths & industry benchmarks',
      'Define essential page architecture, user journeys & feature milestones',
      'Produce comprehensive technical scoping document & milestone schedule',
    ],
    deliverable: 'Clear Project Plan & Technical Scope Document',
  },
  {
    step: '02',
    name: 'DESIGN',
    title: 'Turn Ideas Into Experience',
    icon: PenTool,
    accent: 'text-accent-violet',
    border: 'border-accent-violet/30',
    bg: 'bg-accent-violet/10',
    duration: '4 - 7 Business Days',
    summary: 'We architect intuitive wireframes and high-fidelity, dark-first UI designs with meticulous typography, responsive layout balance, and micro-interactions.',
    tasks: [
      'Architect intuitive wireframe structure & navigation hierarchy',
      'Design high-fidelity desktop, tablet, and mobile interface mockups',
      'Curate color tokens, typography scales, and custom icon sets',
      'Interactive design prototype review with direct client feedback',
      'Revisions and final sign-off on design approval milestone',
    ],
    deliverable: 'Approved Website Design & Interactive Prototype',
  },
  {
    step: '03',
    name: 'IMPLEMENT',
    title: 'Turn Design Into Reality',
    icon: Code,
    accent: 'text-accent-emerald',
    border: 'border-accent-emerald/30',
    bg: 'bg-accent-emerald/10',
    duration: '7 - 14 Business Days',
    summary: 'Our full-stack engineers transform approved designs into high-speed Next.js code with sub-second page loads, database integrations, and automated testing.',
    tasks: [
      'Next.js 14 App Router frontend engineering with TypeScript',
      'Backend REST/GraphQL APIs, relational database & authentication',
      'Stripe payments, headless CMS, and CRM integrations',
      'Sub-0.8s mobile Core Web Vitals optimization & image compression',
      'Multi-device responsive testing & SSL staging deployment',
    ],
    deliverable: 'Fully Functional Working Website on Staging',
  },
  {
    step: '04',
    name: 'MAINTAIN',
    title: 'Keep Your Website Running',
    icon: ShieldCheck,
    accent: 'text-amber-400',
    border: 'border-amber-400/30',
    bg: 'bg-amber-400/10',
    duration: 'Ongoing / Post-Launch Support',
    summary: 'We guarantee continuous uptime, security patches, performance re-audits, and monthly content updates so you never worry about technical debt.',
    tasks: [
      'DNS migration, SSL certificate activation & production launch',
      '24/7 uptime monitoring & automated daily database backups',
      'Security patches, framework upgrades & vulnerability scanning',
      'Monthly speed re-audits & search console indexing verification',
      'On-demand content revisions & direct engineer technical support',
    ],
    deliverable: 'Healthy, High-Converting & Continuously Updated Website',
  },
];

export const revalidate = 0;

export default function ProcessPage() {
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
              <span>Methodology & Precision</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
              How We Build Your Website
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed">
              From understanding your idea to keeping your website running, we follow a clear, transparent and structured 4-stage engineering process.
            </p>

            {/* Quick Flow Pipeline */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8 font-mono text-xs font-semibold">
              <span className="text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">01 ANALYZE</span>
              <ArrowRight className="w-4 h-4 text-foreground-subtle hidden sm:block" />
              <span className="text-accent-violet bg-accent-violet/10 px-3 py-1 rounded-full border border-accent-violet/20">02 DESIGN</span>
              <ArrowRight className="w-4 h-4 text-foreground-subtle hidden sm:block" />
              <span className="text-accent-emerald bg-accent-emerald/10 px-3 py-1 rounded-full border border-accent-emerald/20">03 IMPLEMENT</span>
              <ArrowRight className="w-4 h-4 text-foreground-subtle hidden sm:block" />
              <span className="text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">04 MAINTAIN</span>
            </div>
          </div>
        </div>

        {/* Detailed Stages Deep Dive */}
        <section className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {detailedStages.map((stage) => {
              const Icon = stage.icon;

              return (
                <div
                  key={stage.step}
                  className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md relative overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Col: Step Header */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl ${stage.bg} border ${stage.border} flex items-center justify-center ${stage.accent}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs font-mono text-foreground-subtle font-semibold uppercase tracking-widest">
                            STAGE {stage.step}
                          </span>
                          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                            {stage.name}
                          </h2>
                        </div>
                      </div>

                      <div className={`text-sm font-semibold ${stage.accent}`}>
                        &ldquo;{stage.title}&rdquo;
                      </div>

                      <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                        {stage.summary}
                      </p>

                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-foreground-muted font-mono">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        <span>Duration: {stage.duration}</span>
                      </div>
                    </div>

                    {/* Right Col: Tasks & Output */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="space-y-3">
                        <div className="text-xs font-mono uppercase text-slate-900 font-semibold tracking-wider">
                          Key Milestone Actions:
                        </div>
                        <ul className="space-y-2.5">
                          {stage.tasks.map((task, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                              <CheckCircle2 className={`w-4 h-4 ${stage.accent} shrink-0 mt-0.5`} />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Deliverable Box */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                        <FileCheck className={`w-5 h-5 ${stage.accent} shrink-0`} />
                        <div>
                          <div className="text-[10px] uppercase font-mono text-foreground-subtle">
                            STAGE DELIVERABLE OUTPUT:
                          </div>
                          <div className="text-xs sm:text-sm font-bold text-slate-900">
                            {stage.deliverable}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <FinalCTA />
      </main>

      <Footer settings={settings} />
    </>
  );
}
