'use client';

import React, { useState } from 'react';
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
  Clock,
  Zap,
  Layers
} from 'lucide-react';
import { Service } from '@/lib/types';

interface ServicesSectionProps {
  services: Service[];
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

export function ServicesSection({ services }: ServicesSectionProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || 'srv-1');

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];
  const ActiveIcon = iconMap[selectedService?.iconName] || Code2;

  return (
    <section id="services" className="py-24 relative bg-surface-raised/50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-muted text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            What We Build
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted">
            Engineered with modern full-stack architectures, sub-second performance, and conversion-first UI/UX.
          </p>
        </div>

        {/* In-Depth Interactive Split Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 8 Interactive Service Selectors */}
          <div className="lg:col-span-5 space-y-2.5">
            {services.map((service, idx) => {
              const Icon = iconMap[service.iconName] || Code2;
              const isSelected = service.id === selectedServiceId;

              return (
                <button
                  type="button"
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-accent/10 border-accent text-slate-900 shadow-sm ring-1 ring-accent/20'
                      : 'bg-white border-slate-200 text-foreground-muted hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-accent text-white font-bold' : 'bg-slate-100 text-accent'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{service.title}</div>
                      <div className="text-[11px] text-foreground-subtle truncate max-w-[200px]">
                        {service.turnaround}
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-accent' : 'text-slate-300'}`}>
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: In-Depth Service Detail Canvas */}
          <div className="lg:col-span-7">
            {selectedService && (
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6 sticky top-28 animate-fade-in-up">
                {/* Header */}
                <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <ActiveIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-accent font-semibold">
                      ENGINEERING SPECIFICATION
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {selectedService.fullDesc}
                </p>

                {/* Turnaround & Speed Standard Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] uppercase font-mono text-foreground-subtle">Turnaround</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">{selectedService.turnaround}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="text-[10px] uppercase font-mono text-emerald-800">Speed Target</div>
                    <div className="text-xs sm:text-sm font-bold text-emerald-700 mt-0.5">&lt; 0.8s Global Load</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200">
                    <div className="text-[10px] uppercase font-mono text-indigo-800">Code Base</div>
                    <div className="text-xs sm:text-sm font-bold text-indigo-700 mt-0.5">Next.js 14 + TS</div>
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono uppercase text-slate-900 font-semibold tracking-wider">
                    Included Architecture Deliverables:
                  </div>
                  <ul className="space-y-2.5">
                    {selectedService.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Funnel Trigger */}
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-foreground-muted">
                    Ready to build your <span className="text-slate-900 font-semibold">{selectedService.title}</span>?
                  </div>
                  <a
                    href="#start"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-accent hover:bg-accent-hover text-white font-semibold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Inquire This Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
