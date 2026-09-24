import React from 'react';
import Link from 'next/link';
import { Layers, Mail, Phone, MessageSquare, Github, Linkedin, Instagram, Twitter } from 'lucide-react';
import { AgencySettings } from '@/lib/types';

interface FooterProps {
  settings: AgencySettings;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Our Work', href: '/work' },
    { label: 'Services', href: '/services' },
    { label: 'Packages & Pricing', href: '/packages' },
    { label: 'Our 4-Stage Process', href: '/process' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Start Project', href: '/start' },
  ];

  const serviceLinks = [
    { label: 'Business Websites', href: '/services/business-websites' },
    { label: 'Portfolio Websites', href: '/services/portfolio-websites' },
    { label: 'E-commerce Storefronts', href: '/services/ecommerce-websites' },
    { label: 'Booking & Scheduling', href: '/services/booking-websites' },
    { label: 'High-Converting Landing Pages', href: '/services/landing-pages' },
    { label: 'Custom Web Applications', href: '/services/custom-web-applications' },
    { label: 'Website Redesign', href: '/services/website-redesign' },
    { label: 'Maintenance & Support', href: '/services/website-maintenance' },
  ];

  return (
    <footer className="relative bg-slate-50 border-t border-slate-200 text-foreground-muted overflow-hidden bg-mesh-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Col 1: Studio Branding */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-accent to-accent-violet flex items-center justify-center shadow-sm">
                <Layers className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-lg text-slate-900">
                AuraWeb<span className="text-accent">.</span> Studio
              </span>
            </Link>

            <p className="text-xs text-foreground-muted leading-relaxed max-w-sm">
              We engineer modern, responsive, and high-performance websites designed around your brand, business model, and revenue goals.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-wider font-mono text-slate-900 font-semibold">
              Navigation
            </div>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs text-foreground-muted hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-wider font-mono text-slate-900 font-semibold">
              Services
            </div>
            <ul className="space-y-2">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs text-foreground-muted hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Access */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-wider font-mono text-slate-900 font-semibold">
              Direct Reach
            </div>
            <div className="space-y-2.5 text-xs">
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-2 text-foreground-muted hover:text-slate-900 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-accent shrink-0" />
                <span className="truncate">{settings.email}</span>
              </a>
              <div className="flex items-center gap-2 text-foreground-muted">
                <Phone className="w-3.5 h-3.5 text-accent-violet shrink-0" />
                <span>{settings.phone}</span>
              </div>
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>WhatsApp Direct Chat</span>
              </a>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center gap-3">
              <Link
                href="/login"
                className="text-[11px] text-foreground-subtle hover:text-slate-900 transition-colors"
              >
                Client Portal
              </Link>
              <span className="text-slate-300">•</span>
              <Link
                href="/admin"
                className="text-[11px] text-foreground-subtle hover:text-accent-violet transition-colors"
              >
                Admin Gateway
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground-subtle">
          <div>
            &copy; {currentYear} {settings.agencyName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-foreground-muted transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground-muted transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="hover:text-foreground-muted transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
