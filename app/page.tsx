'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { UserType, CandidateRecord } from '@/lib/types';
import { parseCSVContent, getUniqueHiringManagers, getUniqueRecruiters, getUniquePanelists } from '@/lib/dataProcessing';
import { UserTypeSelector } from '@/components/ui/UserTypeSelector';
import { UserNameLookup } from '@/components/ui/UserNameLookup';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { BarChart3, Users, Shield, TrendingUp, Activity, Zap, ArrowRight, Sparkles, Target, Clock } from 'lucide-react';

export default function Home() {
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);
  const [data, setData] = useState<CandidateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    async function loadData() {
      try {
        setLoading(true);
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Failed to load data');
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  // Compute live stats from data
  const stats = useMemo(() => {
    if (!data.length) return null;
    const hms = new Set(data.map(d => d.hmDetails).filter(Boolean));
    const recruiters = new Set(data.map(d => d.recruiterName).filter(Boolean));
    const panelists = new Set([
      ...data.map(d => d.panelistNameR1).filter(Boolean),
      ...data.map(d => d.panelistNameR2).filter(Boolean),
      ...data.map(d => d.panelistNameR3).filter(Boolean),
    ]);
    const joined = data.filter(d => d.dashboardCategory === 'Joined').length;
    return {
      candidates: data.length,
      hiringManagers: hms.size,
      recruiters: recruiters.size,
      panelists: panelists.size,
      joined,
      conversionRate: data.length > 0 ? ((joined / data.length) * 100).toFixed(1) : '0',
    };
  }, [data]);
  
  const getUserList = (): string[] => {
    switch (selectedUserType) {
      case 'hiring-manager':
        return getUniqueHiringManagers(data);
      case 'recruiter':
        return getUniqueRecruiters(data);
      case 'panelist':
        return getUniquePanelists(data);
      default:
        return [];
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen landing-bg flex items-center justify-center">
        <div className="mesh-blob mesh-blob-1" />
        <div className="mesh-blob mesh-blob-2" />
        <div className="noise-overlay" />
        <div className="relative z-10 text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-slate-500 text-sm font-mono">Initializing dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen landing-bg flex items-center justify-center">
        <div className="mesh-blob mesh-blob-1" />
        <div className="noise-overlay" />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h1 className="text-xl font-semibold text-slate-900 mb-2">Connection Error</h1>
          <p className="text-slate-500 mb-6 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen landing-bg">
      {/* Animated Background */}
      <div className="mesh-blob mesh-blob-1" />
      <div className="mesh-blob mesh-blob-2" />
      <div className="mesh-blob mesh-blob-3" />
      <div className="mesh-blob mesh-blob-4" />
      <div className="grid-overlay" />
      <div className="noise-overlay" />

      {/* Animated Gradient Accent Line */}
      <div className="accent-line w-full relative z-30" />

      {/* Top Bar — full width */}
      <header className="relative z-20 border-b border-slate-200/60 bg-white/40 backdrop-blur-md">
        <div className="w-full px-8 lg:px-16 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-900 tracking-wide">HR Analytics</h1>
                <p className="text-[10px] text-indigo-500/80 font-mono uppercase tracking-[0.2em]">Command Center</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[11px] text-emerald-700 font-semibold font-mono">LIVE</span>
              </div>
              {stats && (
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-mono tabular-nums">
                  <Activity className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="font-medium">{stats.candidates} records</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content — full width */}
      <main className="relative z-10">
        {selectedUserType && selectedUserType !== 'super-admin' ? (
          <div className="w-full px-8 lg:px-16 py-12">
            <UserNameLookup 
              userType={selectedUserType}
              users={getUserList()}
              onBack={() => setSelectedUserType(null)}
            />
          </div>
        ) : (
          <div className="w-full">
            {/* Hero Section — massive, full-bleed */}
            <section className="pt-24 pb-20 px-8 lg:px-16 text-center">
              <div className={`${mounted ? 'anim-float-up' : 'opacity-0'}`}>
                <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-indigo-200 bg-white/80 backdrop-blur-sm shadow-sm mb-10">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="text-xs font-semibold text-indigo-700 tracking-wide">Recruitment Intelligence Platform</span>
                </div>
              </div>
              
              <h2 className={`text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-[0.95] mb-8 ${mounted ? 'anim-float-up-d1' : 'opacity-0'}`}>
                <span className="text-slate-900">Hire </span>
                <span className="bg-gradient-to-r from-indigo-600 via-cyan-500 to-violet-600 bg-clip-text text-transparent">smarter</span>
                <span className="text-slate-900">,</span>
                <br />
                <span className="text-slate-900">not </span>
                <span className="bg-gradient-to-r from-cyan-500 via-pink-500 to-indigo-600 bg-clip-text text-transparent">harder</span>
                <span className="text-slate-300">.</span>
              </h2>
              
              <p className={`text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-16 ${mounted ? 'anim-float-up-d2' : 'opacity-0'}`}>
                Track every stage of your recruitment pipeline with real-time analytics, 
                role-based dashboards, and intelligent alerting.
              </p>

              {/* Live Stats — full-width cards grid */}
              {stats && (
                <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-20 ${mounted ? 'anim-float-up-d2' : 'opacity-0'}`}>
                  <div className="stat-card-landing rounded-2xl p-6 text-center">
                    <div className="stat-ticker text-4xl sm:text-5xl font-extrabold bg-gradient-to-br from-indigo-600 to-indigo-800 bg-clip-text text-transparent font-mono">{stats.candidates}</div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-[0.2em] mt-2 font-mono font-semibold">Candidates</div>
                  </div>
                  <div className="stat-card-landing rounded-2xl p-6 text-center">
                    <div className="stat-ticker text-4xl sm:text-5xl font-extrabold bg-gradient-to-br from-cyan-500 to-cyan-700 bg-clip-text text-transparent font-mono">{stats.recruiters}</div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-[0.2em] mt-2 font-mono font-semibold">Recruiters</div>
                  </div>
                  <div className="stat-card-landing rounded-2xl p-6 text-center">
                    <div className="stat-ticker text-4xl sm:text-5xl font-extrabold bg-gradient-to-br from-violet-500 to-violet-700 bg-clip-text text-transparent font-mono">{stats.panelists}</div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-[0.2em] mt-2 font-mono font-semibold">Panelists</div>
                  </div>
                  <div className="stat-card-landing rounded-2xl p-6 text-center">
                    <div className="stat-ticker text-4xl sm:text-5xl font-extrabold bg-gradient-to-br from-pink-500 to-rose-600 bg-clip-text text-transparent font-mono">{stats.conversionRate}%</div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-[0.2em] mt-2 font-mono font-semibold">Conversion</div>
                  </div>
                </div>
              )}
            </section>

            {/* Role Selection — full width */}
            <section className={`pb-24 px-8 lg:px-16 ${mounted ? 'anim-float-up-d3' : 'opacity-0'}`}>
              <div className="text-center mb-12">
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-[0.25em] mb-3">Select your role</h3>
                <p className="text-sm text-slate-400">Choose a role to access your personalized command center</p>
              </div>
              <UserTypeSelector onSelect={setSelectedUserType} />
            </section>
            
            {/* Feature Grid — full width 3-col */}
            <section className={`pb-28 px-8 lg:px-16 ${mounted ? 'anim-float-up-d3' : 'opacity-0'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-6xl mx-auto">
                <div className="feature-card rounded-2xl p-7 group">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5 group-hover:bg-indigo-100 group-hover:border-indigo-200 transition-all duration-300">
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">Real-time Pipeline</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Track sourcing → screening → interview → offer stages with live funnel analytics
                  </p>
                </div>
                <div className="feature-card rounded-2xl p-7 group">
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center mb-5 group-hover:bg-cyan-100 group-hover:border-cyan-200 transition-all duration-300">
                    <Target className="w-5 h-5 text-cyan-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">Role-based Views</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Tailored dashboards for Super Admin, Hiring Managers, Recruiters & Panelists
                  </p>
                </div>
                <div className="feature-card rounded-2xl p-7 group">
                  <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-5 group-hover:bg-violet-100 group-hover:border-violet-200 transition-all duration-300">
                    <Clock className="w-5 h-5 text-violet-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">48h Alert Engine</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Automatic detection of screening delays, feedback bottlenecks & hiring SLA breaches
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200/60 bg-white/30 backdrop-blur-sm">
        <div className="w-full px-8 lg:px-16 py-5 flex items-center justify-between">
          <p className="text-[11px] text-slate-400 font-mono">
            © 2026 HR Analytics
          </p>
          <p className="text-[11px] text-slate-400 font-mono">
            v2.0 — Built with Next.js
          </p>
        </div>
      </footer>
    </div>
  );
}
