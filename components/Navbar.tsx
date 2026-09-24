'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  LayoutDashboard, 
  LogOut 
} from 'lucide-react';

interface NavbarProps {
  user?: {
    name: string;
    email: string;
    role: 'ADMIN' | 'CLIENT';
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'Packages', href: '/packages' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent to-accent-violet flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Layers className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-tight text-slate-900 flex items-center gap-1">
              AuraWeb<span className="text-accent">.</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-foreground-muted font-medium -mt-1">
              Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-white/85 border border-slate-200/80 px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                  active
                    ? 'bg-accent text-white shadow-sm font-bold'
                    : 'text-foreground-muted hover:text-foreground hover:bg-slate-100/80'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === 'ADMIN' ? (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-accent-violet/10 border border-accent-violet/30 text-accent-violet hover:bg-accent-violet/20 transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin Panel
                </Link>
              ) : (
                <Link
                  href="/client/dashboard"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 transition-all"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  My Dashboard
                </Link>
              )}
              <Link
                href="/api/auth/logout"
                className="text-xs text-foreground-subtle hover:text-foreground-muted transition-colors p-2"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className="px-4 py-2 text-xs font-semibold text-foreground-muted hover:text-foreground transition-colors"
              >
                Login
              </Link>
              <a
                href="#start"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-accent hover:bg-accent-hover text-white shadow-sm hover:shadow transition-all duration-200"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {user && (
            <Link
              href={user.role === 'ADMIN' ? '/admin' : '/client/dashboard'}
              className="p-2 rounded-lg bg-surface border border-slate-200 text-accent"
              aria-label="Dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-surface border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 border-b border-slate-200 px-5 pt-4 pb-8 space-y-4 shadow-xl backdrop-blur-xl animate-fade-in-up">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                    active
                      ? 'bg-accent text-white font-bold'
                      : 'text-slate-700 hover:text-accent hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
            {user ? (
              <div className="flex flex-col gap-2">
                <Link
                  href={user.role === 'ADMIN' ? '/admin' : '/client/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center rounded-xl bg-accent text-white font-semibold text-xs shadow-sm"
                >
                  {user.role === 'ADMIN' ? 'Go to Admin Control' : 'Open Client Dashboard'}
                </Link>
                <Link
                  href="/api/auth/logout"
                  className="w-full py-2.5 text-center rounded-xl bg-surface border border-slate-200 text-foreground-muted font-medium text-xs"
                >
                  Sign Out ({user.email})
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs"
                >
                  Client Login
                </Link>
                <a
                  href="#start"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl bg-accent text-white font-semibold text-xs shadow-sm flex items-center justify-center"
                >
                  Get Started
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
