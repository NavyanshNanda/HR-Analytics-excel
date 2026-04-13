'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Users, 
  BarChart3, 
  TrendingUp, 
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  PieChart,
  Target
} from 'lucide-react';

type UserRole = 'super-admin' | 'recruiter' | 'hiring-manager' | 'panelist';

type SidebarSection = {
  id: string;
  label: string;
  icon: React.ReactNode;
  roles: UserRole[];
};

const sidebarSections: SidebarSection[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: ['super-admin', 'hiring-manager']
  },
  {
    id: 'my-performance',
    label: 'My Performance',
    icon: <TrendingUp className="w-5 h-5" />,
    roles: ['recruiter', 'panelist']
  },
  {
    id: 'interviews',
    label: 'My Interviews',
    icon: <ClipboardList className="w-5 h-5" />,
    roles: ['panelist']
  },
  {
    id: 'alerts',
    label: 'Alerts',
    icon: <AlertTriangle className="w-5 h-5" />,
    roles: ['super-admin', 'recruiter', 'hiring-manager', 'panelist']
  },
  {
    id: 'panelist-performance',
    label: 'Panelist Performance',
    icon: <Target className="w-5 h-5" />,
    roles: ['super-admin', 'hiring-manager', 'recruiter']
  },
  {
    id: 'candidates',
    label: 'Candidate Details',
    icon: <Users className="w-5 h-5" />,
    roles: ['super-admin', 'recruiter', 'hiring-manager']
  },
  {
    id: 'recruiter-performance',
    label: 'Recruiter Performance',
    icon: <TrendingUp className="w-5 h-5" />,
    roles: ['super-admin']
  }
];

interface DashboardSidebarProps {
  userRole: UserRole;
  activeSection: string;
  onSectionChange: (section: string) => void;
  className?: string;
}

export function DashboardSidebar({ 
  userRole, 
  activeSection, 
  onSectionChange,
  className = ''
}: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const visibleSections = sidebarSections.filter(section => 
    section.roles.includes(userRole)
  );

  return (
    <aside 
      className={`
        fixed top-20 left-0 h-[calc(100vh-5rem)] transition-all duration-300 ease-in-out z-40
        ${isCollapsed ? 'w-20' : 'w-64'}
        ${className}
      `}
    >
      {/* Sidebar Container */}
      <div className="h-full bg-white border-r border-slate-200 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed && (
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                Dashboard
              </h2>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-md hover:bg-slate-50 transition-colors group"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto scrollbar-hide">
          {visibleSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`
                w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg
                transition-colors duration-150
                ${isCollapsed ? 'justify-center' : ''}
                ${
                  activeSection === section.id
                    ? 'bg-brand-50 text-brand-700 font-medium'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
                group relative
              `}
            >
              <span className={`
                ${activeSection === section.id ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'}
                transition-colors
              `}>
                {section.icon}
              </span>
              
              {!isCollapsed && (
                <span className="text-[13px] whitespace-nowrap">
                  {section.label}
                </span>
              )}

              {/* Active Indicator */}
              {activeSection === section.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-brand-500 rounded-r-full" />
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="
                  fixed left-20 px-3 py-2 
                  bg-slate-900 text-white text-sm rounded-lg
                  opacity-0 group-hover:opacity-100
                  pointer-events-none transition-opacity duration-200
                  whitespace-nowrap z-[9999]
                  shadow-lg
                "
                style={{
                  top: '50%',
                  transform: 'translateY(-50%)',
                  marginLeft: '0.5rem'
                }}
                >
                  {section.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-1 border-[6px] border-transparent border-r-slate-900" />
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className={`p-4 border-t border-slate-100 ${isCollapsed ? 'hidden' : ''}`}>
          <div className="text-xs text-slate-400 space-y-0.5">
            <p className="font-medium text-slate-600 capitalize">
              {userRole.replace('-', ' ')}
            </p>
            <p>Navigate sections above</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
