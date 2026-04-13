'use client';

import React from 'react';
import { DateFilter } from '@/components/ui/DateFilter';
import { MultiSelectFilter } from '@/components/ui/MultiSelectFilter';
import { Calendar, Users, Briefcase } from 'lucide-react';
import { DateFilters, ReqType } from '@/lib/types';

interface FilterPanelProps {
  // Date filters
  dateFilters: DateFilters;
  onDateFilterChange: (filters: DateFilters) => void;
  showReqDate?: boolean;
  showSourcingDate?: boolean;
  showScreeningDate?: boolean;
  
  // People filters
  allHMs?: string[];
  selectedHMs?: string[];
  onHMsChange?: (selected: string[]) => void;
  
  allRecruiters?: string[];
  selectedRecruiters?: string[];
  onRecruitersChange?: (selected: string[]) => void;
  
  allPanelists?: string[];
  selectedPanelists?: string[];
  onPanelistsChange?: (selected: string[]) => void;
  
  // Other filters
  allDesignations?: string[];
  selectedDesignations?: string[];
  onDesignationsChange?: (selected: string[]) => void;
  
  allCandidates?: string[];
  selectedCandidates?: string[];
  onCandidatesChange?: (selected: string[]) => void;
  
  allLocations?: string[];
  selectedLocations?: string[];
  onLocationsChange?: (selected: string[]) => void;
  
  reqType?: ReqType;
  onReqTypeChange?: (reqType: ReqType) => void;
}

export function FilterPanel({
  dateFilters,
  onDateFilterChange,
  showReqDate = false,
  showSourcingDate = false,
  showScreeningDate = false,
  allHMs = [],
  selectedHMs = [],
  onHMsChange,
  allRecruiters = [],
  selectedRecruiters = [],
  onRecruitersChange,
  allPanelists = [],
  selectedPanelists = [],
  onPanelistsChange,
  allDesignations = [],
  selectedDesignations = [],
  onDesignationsChange,
  allCandidates = [],
  selectedCandidates = [],
  onCandidatesChange,
  allLocations = [],
  selectedLocations = [],
  onLocationsChange,
  reqType = 'all',
  onReqTypeChange,
}: FilterPanelProps) {
  const hasPeopleFilters = allHMs.length > 0 || allRecruiters.length > 0 || allPanelists.length > 0;
  const hasOtherFilters = allDesignations.length > 0 || allCandidates.length > 0 || allLocations.length > 0 || !!onReqTypeChange;

  return (
    <div className="space-y-4">
      {/* Date Filters Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>Date Filters</span>
        </div>
        <div className="flex items-center gap-2 pl-6">
          <DateFilter
            filters={dateFilters}
            onChange={onDateFilterChange}
            showReqDate={showReqDate}
            showSourcingDate={showSourcingDate}
            showScreeningDate={showScreeningDate}
          />
        </div>
      </div>

      {/* People Filters Section */}
      {hasPeopleFilters && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Users className="w-4 h-4 text-purple-600" />
            <span>People Filters</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap pl-6">
            {allHMs.length > 0 && onHMsChange && (
              <MultiSelectFilter
                label="HMs"
                options={allHMs}
                selected={selectedHMs}
                onChange={onHMsChange}
                placeholder="Filter by HM"
              />
            )}
            {allRecruiters.length > 0 && onRecruitersChange && (
              <MultiSelectFilter
                label="Recruiters"
                options={allRecruiters}
                selected={selectedRecruiters}
                onChange={onRecruitersChange}
                placeholder="Filter by recruiter"
              />
            )}
            {allPanelists.length > 0 && onPanelistsChange && (
              <MultiSelectFilter
                label="Panelists"
                options={allPanelists}
                selected={selectedPanelists}
                onChange={onPanelistsChange}
                placeholder="Filter by panelist"
              />
            )}
          </div>
        </div>
      )}

      {/* Other Filters Section */}
      {hasOtherFilters && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Briefcase className="w-4 h-4 text-green-600" />
            <span>Other Filters</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap pl-6">
            {onReqTypeChange && (
              <select
                value={reqType}
                onChange={(e) => onReqTypeChange(e.target.value as ReqType)}
                className="px-3 py-2 bg-white border border-slate-300 rounded-lg hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              >
                <option value="all">All Reqs</option>
                <option value="open">Open Reqs</option>
                <option value="closed">Closed Reqs</option>
              </select>
            )}
            {allDesignations.length > 0 && onDesignationsChange && (
              <MultiSelectFilter
                label="Designations"
                options={allDesignations}
                selected={selectedDesignations}
                onChange={onDesignationsChange}
                placeholder="Filter by designation"
              />
            )}
            {allCandidates.length > 0 && onCandidatesChange && (
              <MultiSelectFilter
                label="Candidates"
                options={allCandidates}
                selected={selectedCandidates}
                onChange={onCandidatesChange}
                placeholder="Filter by candidate"
              />
            )}
            {allLocations.length > 0 && onLocationsChange && (
              <MultiSelectFilter
                label="Locations"
                options={allLocations}
                selected={selectedLocations}
                onChange={onLocationsChange}
                placeholder="Filter by location"
              />
            )}
          </div>
        </div>
      )}

    </div>
  );
}
