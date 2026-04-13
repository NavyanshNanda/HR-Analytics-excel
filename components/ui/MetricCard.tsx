'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray' | 'indigo' | 'cyan';
  onClick?: () => void;
}

const colorStyles = {
  blue: {
    accent: 'border-l-blue-500',
    icon: 'text-blue-600 bg-blue-50',
    trendUp: 'text-emerald-600',
    trendDown: 'text-red-500',
  },
  green: {
    accent: 'border-l-emerald-500',
    icon: 'text-emerald-600 bg-emerald-50',
    trendUp: 'text-emerald-600',
    trendDown: 'text-red-500',
  },
  red: {
    accent: 'border-l-red-500',
    icon: 'text-red-600 bg-red-50',
    trendUp: 'text-emerald-600',
    trendDown: 'text-red-500',
  },
  yellow: {
    accent: 'border-l-amber-500',
    icon: 'text-amber-600 bg-amber-50',
    trendUp: 'text-emerald-600',
    trendDown: 'text-red-500',
  },
  purple: {
    accent: 'border-l-purple-500',
    icon: 'text-purple-600 bg-purple-50',
    trendUp: 'text-emerald-600',
    trendDown: 'text-red-500',
  },
  indigo: {
    accent: 'border-l-indigo-500',
    icon: 'text-indigo-600 bg-indigo-50',
    trendUp: 'text-emerald-600',
    trendDown: 'text-red-500',
  },
  cyan: {
    accent: 'border-l-cyan-500',
    icon: 'text-cyan-600 bg-cyan-50',
    trendUp: 'text-emerald-600',
    trendDown: 'text-red-500',
  },
  gray: {
    accent: 'border-l-slate-400',
    icon: 'text-slate-600 bg-slate-50',
    trendUp: 'text-emerald-600',
    trendDown: 'text-red-500',
  },
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'blue',
  onClick,
}: MetricCardProps) {
  const styles = colorStyles[color];
  const CardWrapper = onClick ? 'button' : 'div';

  return (
    <CardWrapper
      className={cn(
        'relative bg-white rounded-card border border-slate-200 border-l-[3px] shadow-card',
        'px-5 py-4 text-left transition-shadow duration-200',
        'hover:shadow-card-hover',
        styles.accent,
        onClick && 'cursor-pointer w-full'
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 truncate">
            {title}
          </p>
          <p className="text-2xl font-bold text-slate-900 tabular-nums tracking-tight leading-none">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1.5 truncate">{subtitle}</p>
          )}
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          {Icon && (
            <div className={cn('p-2 rounded-lg', styles.icon)}>
              <Icon className="w-4 h-4" />
            </div>
          )}
          {trend && (
            <span className={cn(
              'text-xs font-semibold tabular-nums',
              trend.isPositive ? styles.trendUp : styles.trendDown
            )}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
          )}
        </div>
      </div>
    </CardWrapper>
  );
}

interface MetricCardGroupProps {
  children: React.ReactNode;
}

export function MetricCardGroup({ children }: MetricCardGroupProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {children}
    </div>
  );
}
