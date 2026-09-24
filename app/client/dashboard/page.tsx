'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Layers, 
  LayoutDashboard, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  Globe, 
  HelpCircle, 
  LogOut, 
  Send, 
  ExternalLink,
  Smartphone,
  Monitor,
  Calendar,
  Sparkles,
  Download,
  AlertCircle,
  CreditCard,
  ArrowRight
} from 'lucide-react';
import { ClientProject, ProjectStage } from '@/lib/types';

const stageSteps: ProjectStage[] = [
  'Inquiry Submitted',
  'Discussion',
  'Design',
  'Development',
  'Review',
  'Launch',
  'Maintenance',
];

export default function ClientDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<
    'overview' | 'requirements' | 'messages' | 'files' | 'payments' | 'preview' | 'support'
  >('overview');
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/me').then((r) => r.json()),
      fetch('/api/client-projects').then((r) => r.json()),
    ])
      .then(([userData, projData]) => {
        if (!userData.user) {
          router.push('/login?redirect=/client/dashboard');
          return;
        }
        setUser(userData.user);

        if (projData.clientProjects && projData.clientProjects.length > 0) {
          setProjects(projData.clientProjects);
          setActiveProjectId(projData.clientProjects[0].id);
        }
        setLoading(false);
      })
      .catch(() => {
        router.push('/login?redirect=/client/dashboard');
      });
  }, [router]);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeProject) return;

    setSendingMsg(true);
    try {
      const res = await fetch(`/api/client-projects/${activeProject.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: messageText }),
      });
      const data = await res.json();
      if (data.clientProject) {
        setProjects((prev) =>
          prev.map((p) => (p.id === data.clientProject.id ? data.clientProject : p))
        );
        setMessageText('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSendingMsg(false);
    }
  };

  const getStageIndex = (status: ProjectStage) => {
    const idx = stageSteps.indexOf(status);
    return idx === -1 ? 0 : idx;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-xs text-slate-500">
        Loading Client Portal...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-slate-900">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* Studio Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-accent to-accent-violet flex items-center justify-center shadow-glow">
                <Layers className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-base text-slate-900">
                AuraWeb<span className="text-accent">.</span> Studio
              </span>
            </Link>
          </div>

          {/* User Profile Pill */}
          <div className="p-4 mx-4 my-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-slate-900 truncate">{user?.name}</div>
            <div className="text-[11px] text-slate-500 truncate">{user?.email}</div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono text-accent bg-indigo-50 font-semibold mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>Client Portal</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="px-4 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-accent text-white font-semibold shadow-glow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Project Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('requirements')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'requirements'
                  ? 'bg-accent text-white font-semibold shadow-glow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Requirements</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'messages'
                  ? 'bg-accent text-white font-semibold shadow-glow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Team Messages</span>
              {activeProject?.messages?.length > 0 && (
                <span className={`ml-auto text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'messages' ? 'bg-white text-accent font-bold' : 'bg-slate-200 text-slate-700'}`}>
                  {activeProject.messages.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('files')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'files'
                  ? 'bg-accent text-white font-semibold shadow-glow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Deliverables & Files</span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'payments'
                  ? 'bg-accent text-white font-semibold shadow-glow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Invoices & Payments</span>
            </button>

            <button
              onClick={() => setActiveTab('preview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'preview'
                  ? 'bg-accent text-white font-semibold shadow-glow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Website Live Preview</span>
            </button>

            <button
              onClick={() => setActiveTab('support')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'support'
                  ? 'bg-accent text-white font-semibold shadow-glow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Direct Support</span>
            </button>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <Link
            href="/start"
            className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>New Project Request</span>
          </Link>

          <Link
            href="/api/auth/logout"
            className="w-full py-2 px-3 rounded-xl text-slate-500 hover:text-slate-900 text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-6xl">
        {!activeProject ? (
          <div className="bg-white rounded-3xl p-10 text-center space-y-4 max-w-xl mx-auto my-12 border border-slate-200 shadow-xl">
            <Sparkles className="w-10 h-10 text-accent mx-auto" />
            <h3 className="font-display text-2xl font-bold text-slate-900">No Active Projects Yet</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Submit your project specifications or select a package to initiate stage 01 (Analyze).
            </p>
            <Link
              href="/start"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent hover:bg-accent-hover text-white font-semibold text-xs shadow-glow"
            >
              <span>Submit Project Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Top Project Selector & Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                    {activeProject.packageName} PACKAGE
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500 font-mono">
                    ID: {activeProject.id}
                  </span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  {activeProject.projectName}
                </h1>
              </div>

              {projects.length > 1 && (
                <div>
                  <label className="block text-[10px] text-slate-500 mb-1">Switch Project</label>
                  <select
                    value={activeProjectId}
                    onChange={(e) => setActiveProjectId(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-900 text-xs shadow-sm"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.projectName}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* TAB 1: OVERVIEW & PROGRESS TIMELINE */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fade-in-up">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-display text-lg font-bold text-slate-900">Project Status Timeline</h3>
                      <p className="text-xs text-slate-500">Live milestone progression monitored by engineering lead.</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono text-accent font-semibold">{activeProject.status}</div>
                      <div className="text-[11px] text-slate-500">{activeProject.stageProgress}% Completed</div>
                    </div>
                  </div>

                  <div className="relative mb-8">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent via-accent-violet to-accent-emerald transition-all duration-700"
                        style={{ width: `${Math.max(12, activeProject.stageProgress)}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                    {stageSteps.map((stage, idx) => {
                      const currentIdx = getStageIndex(activeProject.status);
                      const isPast = idx < currentIdx;
                      const isCurrent = idx === currentIdx;

                      return (
                        <div
                          key={stage}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            isCurrent
                              ? 'bg-indigo-50 border-accent text-slate-900 shadow-glow ring-1 ring-accent'
                              : isPast
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                              : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          <div className="text-[10px] font-mono">0{idx + 1}</div>
                          <div className="text-xs font-semibold mt-0.5 truncate">{stage}</div>
                          <div className="text-[10px] mt-1">
                            {isCurrent ? 'Active Now' : isPast ? 'Completed' : 'Upcoming'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
                    <div className="text-xs text-slate-500 font-mono uppercase">Website Type</div>
                    <div className="text-base font-bold text-slate-900">{activeProject.requirements?.websiteType || 'Custom Website'}</div>
                    <div className="text-xs text-slate-500">Domain: {activeProject.requirements?.domainAvailable ? 'Ready' : 'Pending'}</div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
                    <div className="text-xs text-slate-500 font-mono uppercase">Staging Environment</div>
                    {activeProject.stagingUrl ? (
                      <a
                        href={activeProject.stagingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 mt-1"
                      >
                        <span className="truncate">{activeProject.stagingUrl}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <div className="text-xs text-slate-500">Building in progress</div>
                    )}
                    <div className="text-[11px] text-slate-400">SSL Secure Sandbox</div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
                    <div className="text-xs text-slate-500 font-mono uppercase">Latest Activity</div>
                    <div className="text-xs text-slate-900 truncate">
                      {activeProject.messages?.[activeProject.messages.length - 1]?.text || 'Project initialized.'}
                    </div>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="text-xs text-accent font-semibold hover:underline"
                    >
                      Open team chat →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: REQUIREMENTS */}
            {activeTab === 'requirements' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in-up">
                <h3 className="font-display text-xl font-bold text-slate-900">Project Scope & Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-mono uppercase text-slate-500">Business Name</div>
                    <div className="text-sm font-semibold text-slate-900">{activeProject.requirements?.businessName || activeProject.projectName}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-mono uppercase text-slate-500">Selected Package</div>
                    <div className="text-sm font-semibold text-accent">{activeProject.packageName}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-mono uppercase text-slate-500">Website Type</div>
                    <div className="text-sm font-semibold text-slate-900">{activeProject.requirements?.websiteType}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-mono uppercase text-slate-500">Budget Bracket</div>
                    <div className="text-sm font-semibold text-slate-900">{activeProject.requirements?.budget}</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="font-mono uppercase text-slate-500">Submitted Requirements & Notes</div>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {activeProject.requirements?.details || 'Standard package deliverables configured.'}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: TEAM MESSAGES */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col h-[550px] animate-fade-in-up">
                <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900">Direct Project Communication</h3>
                    <p className="text-xs text-slate-500">Live message feed with Aura Studio engineers.</p>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Lead Engineer Online" />
                </div>

                <div className="flex-1 overflow-y-auto py-4 space-y-3">
                  {(!activeProject.messages || activeProject.messages.length === 0) ? (
                    <div className="text-center text-xs text-slate-400 my-auto">
                      No messages yet. Send a note to the technical team!
                    </div>
                  ) : (
                    activeProject.messages.map((msg) => {
                      const isMe = msg.sender === 'CLIENT';
                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                        >
                          <div className="text-[10px] text-slate-400 mb-1 px-1">
                            {msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div
                            className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                              isMe
                                ? 'bg-accent text-white font-medium rounded-br-none shadow-glow'
                                : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-bl-none'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="pt-4 border-t border-slate-100 flex gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message or revision note..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-accent"
                  />
                  <button
                    type="submit"
                    disabled={sendingMsg || !messageText.trim()}
                    className="px-5 py-2.5 rounded-xl bg-accent text-white font-semibold text-xs sm:text-sm shadow-glow hover:bg-accent-hover disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB 4: FILES & DELIVERABLES */}
            {activeTab === 'files' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in-up">
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900">Project Deliverables & Assets</h3>
                  <p className="text-xs text-slate-500">Download approved wireframes, branding kits, and staging access packages.</p>
                </div>

                {(!activeProject.files || activeProject.files.length === 0) ? (
                  <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                    Deliverables will appear here as stages 02 (Design) and 03 (Implement) progress.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeProject.files.map((file) => (
                      <div
                        key={file.id}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:border-accent/40 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-accent">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 truncate max-w-[180px]">{file.name}</div>
                            <div className="text-[10px] text-slate-500">{file.size} • {file.type}</div>
                          </div>
                        </div>

                        <a
                          href={file.url}
                          download
                          className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-accent hover:text-white text-slate-700 transition-colors shadow-sm"
                          title="Download asset"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: PAYMENTS & INVOICES */}
            {activeTab === 'payments' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in-up">
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900">Invoices & Milestone Billing</h3>
                  <p className="text-xs text-slate-500">Transparent payment milestones aligned with the 4-stage workflow.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-500 uppercase">Invoice #INV-2026-081</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">PAID</span>
                    </div>
                    <div className="text-lg font-bold text-slate-900">Stage 01 & 02 Deposit</div>
                    <div className="text-xs text-slate-500">50% Kickoff & Design Approval Milestone</div>
                    <div className="text-base font-bold text-accent pt-1">$975.00 USD</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-500 uppercase">Invoice #INV-2026-082</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">PENDING LAUNCH</span>
                    </div>
                    <div className="text-lg font-bold text-slate-900">Stage 03 Final Settlement</div>
                    <div className="text-xs text-slate-500">50% Production Deployment & DNS Release</div>
                    <div className="text-base font-bold text-slate-900 pt-1">$975.00 USD</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: WEBSITE LIVE PREVIEW */}
            {activeTab === 'preview' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 animate-fade-in-up">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900">Interactive Staging Sandbox</h3>
                    <p className="text-xs text-slate-500">Preview your website live directly inside this viewport frame.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                        previewDevice === 'desktop'
                          ? 'bg-accent text-white font-semibold border-accent shadow-sm'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Desktop</span>
                    </button>

                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                        previewDevice === 'mobile'
                          ? 'bg-accent text-white font-semibold border-accent shadow-sm'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile</span>
                    </button>

                    <a
                      href={activeProject.stagingUrl || activeProject.productionUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-50 text-slate-700 hover:text-accent border border-slate-200 text-xs flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Tab</span>
                    </a>
                  </div>
                </div>

                <div className="flex justify-center p-4 bg-slate-100 rounded-2xl border border-slate-200 min-h-[460px]">
                  <div
                    className={`transition-all duration-300 rounded-xl overflow-hidden border border-slate-300 shadow-2xl bg-white flex flex-col ${
                      previewDevice === 'mobile' ? 'w-[375px] h-[600px]' : 'w-full h-[520px]'
                    }`}
                  >
                    <div className="flex items-center justify-between px-3 py-2 bg-slate-100 border-b border-slate-200 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <div className="truncate text-[10px] text-accent font-medium">
                        {activeProject.stagingUrl || 'https://sandbox.auraweb.studio/preview'}
                      </div>
                      <span className="text-[10px] text-emerald-600 font-mono font-medium">SSL Secure</span>
                    </div>

                    <div className="flex-1 p-6 flex flex-col justify-center items-center text-center space-y-4 bg-gradient-to-b from-slate-50 to-white">
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-accent">
                        <Globe className="w-6 h-6 animate-pulse" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">{activeProject.projectName}</h4>
                      <p className="text-xs text-slate-600 max-w-sm">
                        Staging sandbox is actively updating. Current stage:{' '}
                        <span className="text-accent font-semibold">{activeProject.status}</span>.
                      </p>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Server: Next.js Edge Runtime • Latency: 24ms
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: DIRECT SUPPORT */}
            {activeTab === 'support' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-fade-in-up">
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900">Dedicated Technical Support</h3>
                  <p className="text-xs text-slate-500">Contact your designated lead developer or schedule a milestone review.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <span>Assigned Senior Tech Lead</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Your project is actively engineered by AuraWeb Studio Core Team with 4-hour SLA response times.
                    </p>
                    <div className="pt-2 text-xs font-mono text-accent font-semibold">
                      Email: support@auraweb.studio
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                    <div className="text-xs font-bold text-emerald-900 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>Priority WhatsApp Support</span>
                    </div>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Instant response line available during business days for urgent revision requests.
                    </p>
                    <a
                      href="https://wa.me/15552348901"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 underline pt-1 hover:text-emerald-900"
                    >
                      <span>Open WhatsApp Chat</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
