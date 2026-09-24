import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Testimonial } from '@/lib/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-24 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-muted text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Verified Feedback</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted">
            Direct experiences from founders, directors, and leaders who trusted us with their core web presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300" />
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 italic">
                  &ldquo;{test.review}&rdquo;
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{test.clientName}</span>
                    {test.verified && (
                      <span title="Verified Client">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald" />
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-foreground-muted">
                    {test.role} • <span className="text-slate-800 font-medium">{test.company}</span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-accent bg-accent/10 px-2.5 py-1 rounded-md border border-accent/20">
                  {test.projectType}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
