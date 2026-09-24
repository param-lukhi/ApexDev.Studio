'use client';

import React from 'react';
import { Check, Zap, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Package } from '@/lib/types';

interface PricingPackagesProps {
  packages: Package[];
  onSelectPackage?: (pkgId: string) => void;
}

export function PricingPackages({ packages, onSelectPackage }: PricingPackagesProps) {
  return (
    <section id="packages" className="py-24 relative bg-background border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-muted text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Transparent Investment</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Choose Your Website Package
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted">
            Clear deliverables with zero hidden fees. Select a package to configure your project requirements.
          </p>
        </div>

        {/* 4 Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {packages.map((pkg) => {
            const isPop = pkg.isPopular;

            return (
              <div
                key={pkg.id}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                  isPop
                    ? 'bg-white border-2 border-accent shadow-xl lg:-translate-y-2 ring-4 ring-accent/10'
                    : 'glass-panel border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popular Pill */}
                {isPop && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-accent text-white text-[11px] font-bold tracking-wide uppercase shadow-md flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-white" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  {/* Package Tag & Name */}
                  <div className="text-xs uppercase tracking-wider font-mono text-foreground-subtle mb-1">
                    {pkg.tag}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-foreground-muted leading-relaxed mb-6 min-h-[36px]">
                    {pkg.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-slate-200">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                        {pkg.price}
                      </span>
                      {pkg.billingPeriod && (
                        <span className="text-xs text-foreground-subtle">
                          / {pkg.billingPeriod}
                        </span>
                      )}
                    </div>
                    {pkg.originalPrice && (
                      <div className="text-xs text-foreground-subtle line-through mt-1">
                        Regular {pkg.originalPrice}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-accent mt-3 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Delivery: {pkg.deliveryTime}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-semibold text-slate-900">What&apos;s Included:</div>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-foreground-muted leading-relaxed">
                          <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isPop ? 'text-accent' : 'text-accent-emerald'}`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Selection Action Button */}
                <div className="pt-2">
                  <a
                    href="#start"
                    onClick={() => {
                      if (onSelectPackage) onSelectPackage(pkg.id);
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                      isPop
                        ? 'bg-accent hover:bg-accent-hover text-white shadow-md font-bold'
                        : pkg.isCustom
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 font-semibold'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold'
                    }`}
                  >
                    <span>{pkg.isCustom ? "Let's Discuss" : 'Select Package'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
