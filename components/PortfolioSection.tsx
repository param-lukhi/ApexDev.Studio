'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  X, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Project, ProjectCategory } from '@/lib/types';

interface PortfolioSectionProps {
  projects: Project[];
}

const categories: ProjectCategory[] = [
  'All',
  'Business',
  'Portfolio',
  'E-commerce',
  'Booking',
  'Landing Page',
  'Restaurant',
  'Custom',
];

export function PortfolioSection({ projects }: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-24 relative bg-background border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-muted text-xs font-semibold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5 text-accent" />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Our Work
            </h2>
            <p className="text-sm sm:text-base text-foreground-muted mt-2 max-w-xl">
              Websites designed and developed for different businesses, brands and ideas.
            </p>
          </div>

          <div className="text-xs text-foreground-subtle">
            Showing <span className="text-slate-900 font-medium">{filteredProjects.length}</span> production projects
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-accent text-white font-bold shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-foreground-muted hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group glass-panel rounded-3xl overflow-hidden flex flex-col justify-between border border-slate-200 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
              onClick={() => setSelectedModalProject(project)}
            >
              <div>
                {/* Website Preview Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-accent text-white">
                        FEATURED
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="text-[11px] text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-foreground-muted line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-medium text-slate-700 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Strip */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedModalProject(project);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
                >
                  <span>Inspect Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                  title="Visit Staging / Live"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Portfolio Prompt */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 max-w-2xl mx-auto shadow-sm">
            <div className="text-left">
              <div className="text-sm font-semibold text-slate-900">Have a specific website requirement?</div>
              <div className="text-xs text-foreground-muted">We design bespoke solutions around your unique business model.</div>
            </div>
            <a
              href="#packages"
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-accent text-white hover:bg-accent-hover transition-all whitespace-nowrap shadow-sm"
            >
              Choose Your Package
            </a>
          </div>
        </div>
      </div>

      {/* On-Page In-Depth Case Study Modal */}
      {selectedModalProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto animate-fade-in-up"
          onClick={() => setSelectedModalProject(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 border border-slate-200 my-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedModalProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-accent/10 text-accent border border-accent/20">
                  {selectedModalProject.category}
                </span>
                <span className="text-xs text-foreground-subtle">
                  {selectedModalProject.year} Case Study • {selectedModalProject.timeline}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                {selectedModalProject.title}
              </h3>
              <p className="text-sm text-foreground-muted mt-2 leading-relaxed">
                {selectedModalProject.summary}
              </p>
            </div>

            {/* Showcase Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
              <Image
                src={selectedModalProject.heroImage}
                alt={selectedModalProject.title}
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Requirements / Challenge / Solution Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="text-[10px] uppercase font-mono text-accent font-bold">01 Requirement</div>
                <p className="text-foreground-muted leading-relaxed">{selectedModalProject.requirement}</p>
              </div>

              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-1.5">
                <div className="text-[10px] uppercase font-mono text-red-600 font-bold">02 Challenge</div>
                <p className="text-red-900/80 leading-relaxed">{selectedModalProject.challenge}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                <div className="text-[10px] uppercase font-mono text-emerald-700 font-bold">03 Solution</div>
                <p className="text-emerald-900/80 leading-relaxed">{selectedModalProject.solution}</p>
              </div>
            </div>

            {/* Engineered Features */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Engineered Features</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedModalProject.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <div className="text-xs font-semibold text-slate-900 mb-2">Technologies Used</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedModalProject.technologies.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={selectedModalProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
              >
                <span>Launch Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`#start`}
                onClick={() => setSelectedModalProject(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-accent hover:bg-accent-hover text-white font-semibold text-xs shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Want a Website Like This? Start Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
