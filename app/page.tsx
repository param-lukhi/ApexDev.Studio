import React from 'react';
import { db } from '@/lib/db';
import { getSessionUser } from '@/lib/auth';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { PortfolioSection } from '@/components/PortfolioSection';
import { ServicesSection } from '@/components/ServicesSection';
import { WorkflowSection } from '@/components/WorkflowSection';
import { PricingPackages } from '@/components/PricingPackages';
import { AboutSection } from '@/components/AboutSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FAQSection } from '@/components/FAQSection';
import { StartProjectSection } from '@/components/StartProjectSection';
import { Footer } from '@/components/Footer';

export const revalidate = 0;

export default function HomePage() {
  const user = getSessionUser();
  const projects = db.getProjects();
  const services = db.getServices();
  const packages = db.getPackages();
  const testimonials = db.getTestimonials();
  const faqs = db.getFAQs();
  const settings = db.getSettings();

  return (
    <>
      <Navbar user={user ? { name: user.name, email: user.email, role: user.role } : null} />

      <main className="flex-1">
        {/* 1. Hero Showcase Section (#home) */}
        <Hero />

        {/* 2. Trust & Quick Benefits Bar */}
        <TrustBar />

        {/* 3. In-Depth Portfolio & Interactive Case Studies (#work) */}
        <PortfolioSection projects={projects} />

        {/* 4. In-Depth Capabilities & Interactive Services Explorer (#services) */}
        <ServicesSection services={services} />

        {/* 5. In-Depth 4-Stage Methodology & Milestones (#process) */}
        <WorkflowSection />

        {/* 6. Pricing Packages Matrix & SLAs (#packages) */}
        <PricingPackages packages={packages} />

        {/* 7. Studio Philosophy, Values & Technology Matrix (#about) */}
        <AboutSection />

        {/* 8. Verified Client Testimonials */}
        <TestimonialsSection testimonials={testimonials} />

        {/* 9. Complete 10-Question FAQ Accordion */}
        <FAQSection faqs={faqs} />

        {/* 10. Interactive On-Page Project Requirement Builder & WhatsApp (#start / #contact) */}
        <StartProjectSection settings={settings} packages={packages} />
      </main>

      <Footer settings={settings} />
    </>
  );
}
