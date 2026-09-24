import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center bg-mesh-hero">
      <div className="bg-white rounded-3xl p-10 max-w-md w-full border border-slate-200 shadow-xl space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-accent mx-auto">
          <Layers className="w-6 h-6" />
        </div>

        <div>
          <div className="text-4xl font-display font-bold text-slate-900 mb-2">404</div>
          <h1 className="text-lg font-bold text-slate-900">Page Not Found</h1>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            The page or project you are looking for has been moved or does not exist.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent hover:bg-accent-hover text-white font-semibold text-xs shadow-glow transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
