import React from 'react';
import { Search, PenTool, Code, ShieldCheck, ArrowRight, CheckCircle2, Clock, FileCheck, Sparkles } from 'lucide-react';

const workflowStages = [
  {
    step: '01',
    name: 'ANALYZE',
    tagline: 'Understand Before We Build',
    icon: Search,
    accentColor: 'text-accent',
    borderColor: 'border-accent/30',
    bgColor: 'bg-accent/10',
    duration: '2 - 4 Business Days',
    description: [
      'Understand your business revenue model & target audience intent',
      'Collect comprehensive technical specifications & API requirements',
      'Analyze design references, competitor strengths & industry benchmarks',
      'Define essential page architecture, user journeys & feature milestones',
      'Produce comprehensive technical scoping document & milestone schedule',
    ],
    output: 'Clear Project Plan & Technical Scope',
  },
  {
    step: '02',
    name: 'DESIGN',
    tagline: 'Turn Ideas Into Experience',
    icon: PenTool,
    accentColor: 'text-accent-violet',
    borderColor: 'border-accent-violet/30',
    bgColor: 'bg-accent-violet/10',
    duration: '4 - 7 Business Days',
    description: [
      'Architect intuitive wireframe structure & navigation hierarchy',
      'Design high-fidelity desktop, tablet, and mobile interface mockups',
      'Curate color tokens, typography scales, and custom icon sets',
      'Interactive design prototype review with direct client feedback',
      'Revisions and final sign-off on design approval milestone',
    ],
    output: 'Approved Website Design & Prototypes',
  },
  {
    step: '03',
    name: 'IMPLEMENT',
    tagline: 'Turn Design Into Reality',
    icon: Code,
    accentColor: 'text-accent-emerald',
    borderColor: 'border-accent-emerald/30',
    bgColor: 'bg-accent-emerald/10',
    duration: '7 - 14 Business Days',
    description: [
      'Next.js 14 App Router frontend engineering with TypeScript',
      'Backend REST/GraphQL APIs, relational database & authentication',
      'Stripe payments, headless CMS, and CRM integrations',
      'Sub-0.8s mobile Core Web Vitals optimization & image compression',
      'Multi-device responsive testing & SSL staging deployment',
    ],
    output: 'Working Staging Website',
  },
  {
    step: '04',
    name: 'MAINTAIN',
    tagline: 'Keep Your Website Running',
    icon: ShieldCheck,
    accentColor: 'text-amber-400',
    borderColor: 'border-amber-400/30',
    bgColor: 'bg-amber-400/10',
    duration: 'Ongoing / Retainer Support',
    description: [
      'DNS migration, SSL certificate activation & production launch',
      '24/7 uptime monitoring & automated daily database backups',
      'Security patches, framework upgrades & vulnerability scanning',
      'Monthly speed re-audits & search console indexing verification',
      'On-demand content revisions & direct engineer technical support',
    ],
    output: 'Healthy & Updated Website',
  },
];

export function WorkflowSection() {
  return (
    <section id="process" className="py-24 relative bg-surface-raised/40 border-t border-slate-200 overflow-hidden">
      {/* Background Decorative Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-accent/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-muted text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Engineering Methodology</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            How We Build Your Website
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
            From understanding your idea to keeping your website running, we follow a clear, transparent and structured 4-stage process.
          </p>

          {/* Quick Step Indicator */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 text-xs font-semibold font-mono">
            <span className="text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">01 ANALYZE</span>
            <ArrowRight className="w-3.5 h-3.5 text-foreground-subtle hidden sm:block" />
            <span className="text-accent-violet bg-accent-violet/10 px-3 py-1 rounded-full border border-accent-violet/20">02 DESIGN</span>
            <ArrowRight className="w-3.5 h-3.5 text-foreground-subtle hidden sm:block" />
            <span className="text-accent-emerald bg-accent-emerald/10 px-3 py-1 rounded-full border border-accent-emerald/20">03 IMPLEMENT</span>
            <ArrowRight className="w-3.5 h-3.5 text-foreground-subtle hidden sm:block" />
            <span className="text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">04 MAINTAIN</span>
          </div>
        </div>

        {/* 4 In-Depth Connected Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {workflowStages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-slate-200 hover:border-accent/40 transition-all duration-300 relative group shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-mono font-bold text-slate-300 group-hover:text-slate-800 transition-colors">
                      {stage.step}
                    </span>
                    <div className={`w-11 h-11 rounded-2xl ${stage.bgColor} border ${stage.borderColor} flex items-center justify-center ${stage.accentColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Stage Title */}
                  <div className="text-[10px] uppercase tracking-widest font-mono text-foreground-subtle mb-1">
                    STAGE {stage.step}
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-1">
                    {stage.name}
                  </h3>
                  <div className={`text-xs font-semibold ${stage.accentColor} mb-2`}>
                    &ldquo;{stage.tagline}&rdquo;
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[10px] text-foreground-muted font-mono mb-4">
                    <Clock className="w-3 h-3 text-accent" />
                    <span>{stage.duration}</span>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2 mb-6">
                    {stage.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-foreground-muted leading-relaxed">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${stage.accentColor} shrink-0 mt-0.5`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Deliverable / Output Badge */}
                <div className="pt-4 border-t border-slate-200 mt-2">
                  <div className="text-[10px] uppercase font-mono text-foreground-subtle mb-1 flex items-center gap-1">
                    <FileCheck className="w-3 h-3 text-accent" />
                    <span>DELIVERABLE OUTPUT:</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl">
                    {stage.output}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
