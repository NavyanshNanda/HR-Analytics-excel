'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  action?: ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
}

export function ChartCard({
  title,
  subtitle,
  children,
  className,
  icon,
  action,
  variant = 'glass'
}: ChartCardProps) {
  const variantStyles = {
    default: 'bg-white border border-slate-200 shadow-card',
    glass: 'bg-white border border-slate-200 shadow-card',
    elevated: 'bg-white border border-slate-200 shadow-elevated'
  };

  return (
    <div className={cn(
      'rounded-card p-5 transition-shadow duration-200',
      'hover:shadow-card-hover',
      variantStyles[variant],
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {action && (
          <div className="flex items-center gap-2">
            {action}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

// Specialized variant for metric cards
interface MetricCardGlassProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo';
  onClick?: () => void;
}

const glassColorStyles = {
  blue: {
    accent: 'border-l-blue-500',
    icon: 'text-blue-600 bg-blue-50',
  },
  green: {
    accent: 'border-l-emerald-500',
    icon: 'text-emerald-600 bg-emerald-50',
  },
  yellow: {
    accent: 'border-l-amber-500',
    icon: 'text-amber-600 bg-amber-50',
  },
  red: {
    accent: 'border-l-red-500',
    icon: 'text-red-600 bg-red-50',
  },
  purple: {
    accent: 'border-l-purple-500',
    icon: 'text-purple-600 bg-purple-50',
  },
  indigo: {
    accent: 'border-l-indigo-500',
    icon: 'text-indigo-600 bg-indigo-50',
  },
};

export function MetricCardGlass({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'blue',
  onClick
}: MetricCardGlassProps) {
  const styles = glassColorStyles[color];

  return (
    <div
      className={cn(
        'bg-white rounded-card border border-slate-200 border-l-[3px] shadow-card',
        'px-5 py-4 transition-shadow duration-200',
        'hover:shadow-card-hover',
        styles.accent,
        onClick && 'cursor-pointer'
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
          <div className={cn('p-2 rounded-lg', styles.icon)}>
            <Icon className="w-4 h-4" />
          </div>
          {trend && (
            <span className={cn(
              'text-xs font-semibold tabular-nums',
              trend.isPositive ? 'text-emerald-600' : 'text-red-500'
            )}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
