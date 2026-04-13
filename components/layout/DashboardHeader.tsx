'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Home, User, Filter, ChevronDown, X } from 'lucide-react';
import { AlertDropdown, RecruiterAlert, PanelistAlert } from '@/components/ui/AlertDropdown';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  userName?: string;
  userRole?: string;
  recruiterAlerts?: RecruiterAlert[];
  panelistAlerts?: PanelistAlert[];
  onAlertClick?: (candidateName: string) => void;
  onBellClick?: () => void;
  showAlerts?: boolean;
  actions?: React.ReactNode;
  activeFilterCount?: number;
  onClearAll?: () => void;
}

export function DashboardHeader({
  title,
  subtitle,
  userName,
  userRole,
  recruiterAlerts = [],
  panelistAlerts = [],
  onAlertClick,
  onBellClick,
  showAlerts = true,
  actions,
  activeFilterCount = 0,
  onClearAll,
}: DashboardHeaderProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Close filter panel when clicking outside
  useEffect(() => {
    if (!isFilterOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    // Add event listener after a small delay to prevent immediate closing
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  return (
    <header ref={headerRef} className="bg-white border-b border-slate-200 shadow-header sticky top-0 z-50">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Title and subtitle */}
          <div>
            <h1 className="text-lg font-semibold text-slate-900 tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          
          {/* Right: Clear All, Filter, Alerts, User info, and Home */}
          <div className="flex items-center gap-4">
            {/* Clear All Filters Button */}
            {actions && activeFilterCount > 0 && onClearAll && (
              <button
                onClick={onClearAll}
                className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs font-medium flex items-center gap-1.5 border border-red-200"
                title="Clear all filters"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            )}
            
            {/* Filter Button */}
            {actions && (
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors group"
                aria-label="Toggle filters"
              >
                <Filter className={`w-4 h-4 transition-colors ${isFilterOpen ? 'text-brand-500' : 'text-slate-500'}`} />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            )}

            {/* Alert Dropdown */}
            {showAlerts && (
              <AlertDropdown
                recruiterAlerts={recruiterAlerts}
                panelistAlerts={panelistAlerts}
                onAlertClick={onAlertClick}
                onBellClick={onBellClick}
              />
            )}
            
            {/* User Info */}
            {userName && (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-800">{userName}</p>
                  {userRole && (
                    <p className="text-xs text-slate-500">{userRole}</p>
                  )}
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <User className="w-4 h-4 text-slate-500" />
                </div>
              </div>
            )}
            
            {/* Home Link */}
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Go to home"
            >
              <Home className="w-5 h-5 text-slate-600" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Collapsible Filter Panel */}
      {actions && (
        <div
          className={`
            transition-all duration-300 ease-in-out border-t border-slate-100
            ${isFilterOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
          `}
          style={{ overflow: isFilterOpen ? 'visible' : 'hidden' }}
        >
          <div className="px-6 py-3 bg-slate-50">
            <div className="flex items-center gap-2 flex-wrap">
              {actions}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
