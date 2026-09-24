'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Layers, Mail, Lock, ArrowRight, AlertCircle, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotModal, setForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to authenticate');
      }

      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (data.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const quickFill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative bg-mesh-hero">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent to-accent-violet flex items-center justify-center shadow-glow transition-transform group-hover:scale-105">
              <Layers className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-2xl text-slate-900">
              AuraWeb<span className="text-accent">.</span> Studio
            </span>
          </Link>
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
            Client & Admin Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Access your active website projects, milestones & client dashboard.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700 animate-fade-in-up">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModal(true)}
                  className="text-[11px] text-accent hover:underline font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Pills */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <div className="text-[11px] text-slate-400 text-center font-mono uppercase">
              Quick 1-Click Demo Logins
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => quickFill('client@demo.com', 'Client@12345')}
                className="py-2 px-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] text-slate-700 hover:text-slate-900 font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-accent" />
                <span>Demo Client</span>
              </button>

              <button
                type="button"
                onClick={() => quickFill('admin@auraweb.studio', 'Admin@12345')}
                className="py-2 px-2.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-[11px] text-indigo-700 font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-accent-violet" />
                <span>Demo Admin</span>
              </button>
            </div>
          </div>

          {/* Create Account Link */}
          <div className="text-center pt-2 text-xs text-slate-600">
            New client?{' '}
            <Link
              href={redirectUrl ? `/signup?redirect=${encodeURIComponent(redirectUrl)}` : '/signup'}
              className="text-accent font-semibold hover:underline"
            >
              Create an account
            </Link>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
            ← Back to Homepage
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <h3 className="font-display text-lg font-bold text-slate-900">Reset Password</h3>
            <p className="text-xs text-slate-600">
              Enter your account email address. A password recovery link will be dispatched immediately.
            </p>
            {forgotSent ? (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                Password reset instructions have been sent to your email.
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="your-email@company.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-accent"
                />
                <button
                  onClick={() => setForgotSent(true)}
                  className="w-full py-2.5 rounded-xl bg-accent text-white font-semibold text-xs shadow-glow hover:bg-accent-hover"
                >
                  Send Recovery Link
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setForgotModal(false);
                setForgotSent(false);
              }}
              className="w-full py-2 text-xs text-slate-500 hover:text-slate-900"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-xs text-slate-500">Loading portal...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
