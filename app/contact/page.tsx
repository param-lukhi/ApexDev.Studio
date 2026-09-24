import React from 'react';
import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContactSection } from '@/components/ContactSection';
import { FAQSection } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'Contact Us — Let’s Build Something Great',
  description: 'Get in touch with AuraWeb Studio. Reach out via our project inquiry form, email, or direct WhatsApp chat.',
  openGraph: {
    title: 'Contact AuraWeb Studio — Web Development Inquiries',
    description: 'Direct communication with senior developers. 4-hour inquiry SLA.',
  },
};

export const revalidate = 0;

export default function ContactPage() {
  const user = getSessionUser();
  const settings = db.getSettings();
  const faqs = db.getFAQs().slice(0, 5);

  return (
    <>
      <Navbar user={user ? { name: user.name, email: user.email, role: user.role } : null} />

      <main className="flex-1 pt-24">
        {/* Banner */}
        <div className="bg-mesh-hero border-b border-slate-200 pt-12 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full badge-accent text-xs font-semibold mb-4">
              <span>Direct Communication</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
              Let&apos;s Build Something Great.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-foreground-muted max-w-2xl mx-auto leading-relaxed">
              Have a project in mind or need expert web development advice? Fill out the inquiry form or chat directly with our technical lead on WhatsApp.
            </p>
          </div>
        </div>

        {/* Contact Form & Studio Details */}
        <ContactSection settings={settings} />

        {/* Top Contact FAQs */}
        <FAQSection faqs={faqs} />
      </main>

      <Footer settings={settings} />
    </>
  );
}
