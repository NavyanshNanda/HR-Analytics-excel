'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UserType } from '@/lib/types';
import { Users, UserCircle, Briefcase, ClipboardList, Shield, ArrowRight } from 'lucide-react';

interface UserTypeSelectorProps {
  onSelect?: (type: UserType) => void;
}

const userTypes: { type: UserType; label: string; description: string; icon: React.ReactNode; tag: string; tagColor: string }[] = [
  {
    type: 'super-admin',
    label: 'Super Admin',
    description: 'Full org-wide analytics, recruiter performance, and hiring pipeline oversight',
    icon: <Shield className="w-6 h-6" />,
    tag: 'FULL ACCESS',
    tagColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
  },
  {
    type: 'hiring-manager',
    label: 'Hiring Manager',
    description: 'Team panelist performance, candidate pipeline, and interview tracking',
    icon: <Briefcase className="w-6 h-6" />,
    tag: 'TEAM VIEW',
    tagColor: 'text-cyan-700 bg-cyan-50 border-cyan-200',
  },
  {
    type: 'recruiter',
    label: 'Recruiter',
    description: 'Sourcing metrics, screening rates, candidate funnel, and personal SLAs',
    icon: <Users className="w-6 h-6" />,
    tag: 'PERSONAL',
    tagColor: 'text-violet-700 bg-violet-50 border-violet-200',
  },
  {
    type: 'panelist',
    label: 'Panelist',
    description: 'Interview history, feedback metrics, pass rates, and pending actions',
    icon: <ClipboardList className="w-6 h-6" />,
    tag: 'INTERVIEWS',
    tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
];

export function UserTypeSelector({ onSelect }: UserTypeSelectorProps) {
  const router = useRouter();
  
  const handleSelect = (type: UserType) => {
    if (type === 'super-admin') {
      router.push('/dashboard/super-admin');
    } else if (onSelect) {
      onSelect(type);
    }
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
      {userTypes.map(({ type, label, description, icon, tag, tagColor }) => (
        <button
          key={type}
          onClick={() => handleSelect(type)}
          className="role-card group rounded-2xl p-6 text-left cursor-pointer"
        >
          <div className="relative z-10">
            {/* Top row: icon + tag */}
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-all duration-300">
                {icon}
              </div>
              <span className={`text-[10px] font-bold tracking-[0.15em] px-2.5 py-1 rounded-full border font-mono ${tagColor}`}>
                {tag}
              </span>
            </div>
            
            {/* Title */}
            <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors">
              {label}
            </h3>
            
            {/* Description */}
            <p className="text-xs text-slate-500 leading-relaxed mb-4 group-hover:text-slate-600 transition-colors">
              {description}
            </p>
            
            {/* CTA */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
              <span>Open dashboard</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
