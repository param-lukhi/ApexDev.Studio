import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-20 relative bg-background overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-64 bg-accent/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-16 text-center border border-slate-200 relative overflow-hidden shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full badge-accent text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Start Your Journey</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 max-w-2xl mx-auto leading-tight">
            Ready to Build Your Website?
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-foreground-muted mb-8 max-w-2xl mx-auto leading-relaxed">
            Tell us what you need and let&apos;s turn your idea into a professional digital experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/start"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold bg-accent hover:bg-accent-hover text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-medium bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4 text-accent" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
