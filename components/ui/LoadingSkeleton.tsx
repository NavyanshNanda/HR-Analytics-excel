'use client';

import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'card' | 'chart' | 'table' | 'metric';
  count?: number;
}

export function LoadingSkeleton({ variant = 'card', count = 1 }: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (variant === 'metric') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {skeletons.map((i) => (
          <div
            key={i}
            className="animate-pulse bg-white rounded-card p-5 border border-slate-200 shadow-card"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 bg-slate-100 rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-slate-100 rounded w-20" />
              <div className="h-3 bg-slate-100 rounded w-28" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div className="animate-pulse bg-white rounded-card p-5 border border-slate-200 shadow-card">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 bg-slate-100 rounded-lg" />
          <div className="space-y-1.5">
            <div className="h-4 bg-slate-100 rounded w-28" />
            <div className="h-3 bg-slate-50 rounded w-20" />
          </div>
        </div>
        <div className="h-72 bg-slate-50 rounded-lg" />
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className="animate-pulse bg-white rounded-card p-5 border border-slate-200 shadow-card">
        <div className="space-y-3">
          <div className="h-5 bg-slate-100 rounded w-40" />
          {skeletons.map((i) => (
            <div key={i} className="h-12 bg-slate-50 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {skeletons.map((i) => (
        <div
          key={i}
          className="animate-pulse bg-white rounded-card p-5 border border-slate-200 shadow-card h-56"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 bg-slate-100 rounded-lg" />
            <div className="h-4 bg-slate-100 rounded w-28" />
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-slate-50 rounded" />
            <div className="h-3 bg-slate-50 rounded w-5/6" />
            <div className="h-3 bg-slate-50 rounded w-4/6" />
          </div>
        </div>
      ))}
    </>
  );
}

// Dashboard-specific loading state
export function DashboardLoading() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-6 space-y-6">
        {/* Metrics skeleton */}
        <section>
          <div className="h-4 bg-slate-200 rounded w-28 mb-3" />
          <LoadingSkeleton variant="metric" count={5} />
        </section>

        {/* Charts skeleton */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <LoadingSkeleton variant="chart" />
          <LoadingSkeleton variant="chart" />
        </section>

        {/* Table skeleton */}
        <section>
          <LoadingSkeleton variant="table" count={5} />
        </section>
      </div>
    </div>
  );
}
