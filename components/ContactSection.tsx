'use client';

import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { AgencySettings } from '@/lib/types';

interface ContactSectionProps {
  settings: AgencySettings;
}

export function ContactSection({ settings }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    websiteType: 'Business Website',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessName: formData.business,
          websiteType: formData.websiteType,
          selectedPackageId: 'pkg-custom',
          packageName: 'General Contact Inquiry',
          message: formData.message,
          domainAvailable: false,
          hostingAvailable: false,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        business: '',
        websiteType: 'Business Website',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hi AuraWeb Studio! I would like to discuss building a website for my business.'
  )}`;

  return (
    <section id="contact" className="py-24 relative bg-background border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-muted text-xs font-semibold uppercase tracking-wider">
              <span>Direct Reach</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Let&apos;s Discuss Your Project.
            </h2>

            <p className="text-sm text-foreground-muted leading-relaxed">
              Have a question or looking to build a new website? Fill out the quick form or message our engineering lead directly on WhatsApp.
            </p>

            <div className="space-y-4 pt-4">
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-accent/40 text-foreground-muted hover:text-slate-900 shadow-xs hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-foreground-subtle uppercase font-mono">Email Us</div>
                  <div className="text-sm font-semibold text-slate-900 group-hover:text-accent transition-colors">
                    {settings.email}
                  </div>
                </div>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-emerald-50 border border-emerald-200 hover:border-emerald-300 text-emerald-700 shadow-xs hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-emerald-800 uppercase font-mono">Instant WhatsApp</div>
                    <div className="text-sm font-semibold text-slate-900">Chat With Our Tech Lead</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center text-accent-violet">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-foreground-subtle uppercase font-mono">Direct Phone</div>
                  <div className="text-sm font-semibold text-slate-900">{settings.phone}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl">
              <h3 className="font-display text-xl font-bold text-slate-900 mb-2">Send a Message</h3>
              <p className="text-xs text-foreground-muted mb-6">
                We respond to all project inquiries within 4 business hours.
              </p>

              {success ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fade-in-up">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">Inquiry Received!</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                    Thank you! Our technical lead will review your requirements and reach out via email and phone shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-xs font-semibold text-emerald-700 underline pt-2 hover:text-emerald-800"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">
                        Phone / Mobile
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">
                        Business / Project Name
                      </label>
                      <input
                        type="text"
                        value={formData.business}
                        onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                        placeholder="e.g. Morgan Capital"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Website Type
                    </label>
                    <select
                      value={formData.websiteType}
                      onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    >
                      <option value="Business Website">Business Website</option>
                      <option value="E-commerce Store">E-commerce Store</option>
                      <option value="Booking & Hospitality">Booking & Hospitality</option>
                      <option value="Creative Portfolio">Creative Portfolio</option>
                      <option value="High-Converting Landing Page">High-Converting Landing Page</option>
                      <option value="Custom Web Application">Custom Web Application</option>
                      <option value="Website Redesign">Website Redesign</option>
                      <option value="Maintenance & Support">Maintenance & Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Project Details / Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your brand, requirements, desired timeline, or any reference websites you admire..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Inquiry</span>
                        </>
                      )}
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto py-3 px-5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
