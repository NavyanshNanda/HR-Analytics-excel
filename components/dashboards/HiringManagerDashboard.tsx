'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { CandidateRecord, DateFilters, ReqType } from '@/lib/types';
import { 
  calculatePanelistMetrics,
  getPanelistsForHM,
  calculatePipelineMetrics,
  calculateReqMetrics
} from '@/lib/calculations';
import { filterDataForHiringManager, filterDataByReqType } from '@/lib/dataProcessing';
import { filterByDateRange, getTTFAlerts } from '@/lib/utils';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { FilterPanel } from '@/components/layout/FilterPanel';
import { DateFilter } from '@/components/ui/DateFilter';
import { MultiSelectFilter } from '@/components/ui/MultiSelectFilter';
import { FilterBadge } from '@/components/ui/FilterBadge';
import { MetricCard, MetricCardGroup } from '@/components/ui/MetricCard';
import { ChartCard } from '@/components/ui/ChartCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PanelistPerformance } from '@/components/charts/PanelistPerformance';
import { CandidateFunnel } from '@/components/charts/CandidateFunnel';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { formatHoursToReadable, formatDate } from '@/lib/utils';
import { Users, UserCheck, AlertTriangle, TrendingUp, CheckCircle, Target, TrendingDown, X, Filter as FilterIcon } from 'lucide-react';
import { useRef } from 'react';

interface HiringManagerDashboardProps {
  data: CandidateRecord[];
  hmName: string;
}

export default function HiringManagerDashboard({ data, hmName }: HiringManagerDashboardProps) {
  // State for filters
  const [dateFilters, setDateFilters] = useState<DateFilters>({});
  const [selectedPanelists, setSelectedPanelists] = useState<string[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [selectedDesignations, setSelectedDesignations] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [reqType, setReqType] = useState<ReqType>('all');
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  const [showCandidateTable, setShowCandidateTable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const systemAlertsRef = useRef<HTMLDivElement>(null);
  const candidateTableRef = useRef<HTMLDivElement>(null);
  
  const itemsPerPage = 20;
  
  // Auto-show alerts and candidates when sections are selected
  useEffect(() => {
    if (activeSection === 'alerts') {
      setShowAllAlerts(true);
    } else if (activeSection === 'candidates') {
      setShowCandidateTable(true);
    }
  }, [activeSection]);

  const handleBarClick = (category: string) => {
    setCategoryFilter(category === 'all' ? null : category);
    setShowCandidateTable(true);
    setActiveSection('candidates');
    setCurrentPage(1);
    setTimeout(() => {
      if (candidateTableRef.current) {
        const elementPosition = candidateTableRef.current.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 120;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  const getPipelineCategoryLabel = (cf: string) => {
    const labels: Record<string, string> = {
      'screening': 'Screening Cleared',
      'r1': 'Round 1 Cleared',
      'r2': 'Round 2 Cleared',
      'r3': 'Round 3 Cleared',
      'selected': 'Selected',
    };
    return labels[cf] ?? cf;
  };

  // Filter data for this HM
  const hmData = useMemo(() => {
    return filterDataForHiringManager(data, hmName);
  }, [data, hmName]);
  
  // Calculate req metrics for open/closed reqs
  const reqMetrics = useMemo(() => {
    return calculateReqMetrics(hmData);
  }, [hmData]);
  
  // Apply all filters
  const filteredData = useMemo(() => {
    let result = filterByDateRange(hmData, dateFilters);
    
    if (selectedPanelists.length > 0) {
      result = result.filter(r =>
        selectedPanelists.includes(r.panelistNameR1) ||
        selectedPanelists.includes(r.panelistNameR2) ||
        selectedPanelists.includes(r.panelistNameR3)
      );
    }
    
    if (selectedCandidates.length > 0) {
      result = result.filter(r => selectedCandidates.includes(r.candidateName));
    }
    
    if (selectedDesignations.length > 0) {
      result = result.filter(r => selectedDesignations.includes(r.designation));
    }
    
    if (selectedLocations.length > 0) {
      result = result.filter(r => selectedLocations.includes(r.currentLocation));
    }
    
    // Apply req type filter (open/closed)
    if (reqType !== 'all') {
      result = filterDataByReqType(result, reqType, reqMetrics.reqs);
    }
    
    return result;
  }, [hmData, dateFilters, selectedPanelists, selectedCandidates, selectedDesignations, selectedLocations, reqType, reqMetrics]);
  
  // Get unique values for filters
  const allPanelists = useMemo(() => {
    return Array.from(new Set([
      ...hmData.map(r => r.panelistNameR1).filter(Boolean),
      ...hmData.map(r => r.panelistNameR2).filter(Boolean),
      ...hmData.map(r => r.panelistNameR3).filter(Boolean),
    ])).sort();
  }, [hmData]);
  
  const allCandidates = useMemo(() => {
    return Array.from(new Set(hmData.map(r => r.candidateName).filter(Boolean))).sort();
  }, [hmData]);
  
  const allDesignations = useMemo(() => {
    return Array.from(new Set(hmData.map(r => r.designation).filter(Boolean))).sort();
  }, [hmData]);
  
  const allLocations = useMemo(() => {
    return Array.from(new Set(hmData.map(r => r.currentLocation).filter(Boolean))).sort();
  }, [hmData]);
  
  // Get unique panelists under this HM from filtered data
  const panelists = useMemo(() => getPanelistsForHM(filteredData), [filteredData]);
  
  // Calculate metrics for each panelist
  const panelistMetrics = useMemo(() => {
    return panelists.map(panelist => calculatePanelistMetrics(filteredData, panelist));
  }, [filteredData, panelists]);
  
  // Calculate pipeline metrics
  const pipelineMetrics = useMemo(() => {
    return calculatePipelineMetrics(filteredData);
  }, [filteredData]);
  
  // Get pipeline data for chart
  const pipelineData = useMemo(() => {
    return [
      { name: 'Total Candidates', value: filteredData.length, fill: '#3B82F6', category: 'all' },
      { name: 'Screening Cleared', value: pipelineMetrics.screeningCleared, fill: '#6366F1', category: 'screening' },
      { name: 'Round 1 Cleared', value: pipelineMetrics.r1Cleared, fill: '#8B5CF6', category: 'r1' },
      { name: 'Round 2 Cleared', value: pipelineMetrics.r2Cleared, fill: '#EC4899', category: 'r2' },
      { name: 'Round 3 Cleared', value: pipelineMetrics.r3Cleared, fill: '#22C55E', category: 'r3' },
      { name: 'Selected', value: pipelineMetrics.selected, fill: '#10B981', category: 'selected' },
    ];
  }, [filteredData.length, pipelineMetrics]);
  
  // Calculate offer acceptance rate
  const offerAcceptanceRate = useMemo(() => {
    const offered = pipelineMetrics.selected;
    const joined = pipelineMetrics.joined;
    return offered > 0 ? ((joined / offered) * 100).toFixed(1) : '0.0';
  }, [pipelineMetrics]);
  
  // Calculate overall conversion rate
  const overallConversionRate = useMemo(() => {
    const total = filteredData.length;
    const selected = pipelineMetrics.selected;
    return total > 0 ? ((selected / total) * 100).toFixed(1) : '0.0';
  }, [filteredData.length, pipelineMetrics.selected]);
  
  // Get only panelist alerts (no recruiter alerts)
  const panelistAlerts = useMemo(() => {
    const alerts: { panelistName: string; candidateName: string; round: string; interviewDate: Date | null; feedbackDate: Date | null; hours: number | null; isPending: boolean }[] = [];
    
    panelistMetrics.forEach(pm => {
      pm.interviews.forEach(interview => {
        if (interview.isAlert || interview.isPendingFeedback) {
          alerts.push({
            panelistName: pm.panelistName,
            candidateName: interview.candidateName,
            round: interview.round,
            interviewDate: interview.interviewDate,
            feedbackDate: interview.feedbackDate,
            hours: interview.timeDifferenceHours,
            isPending: interview.isPendingFeedback,
          });
        }
      });
    });
    
    // Sort by panelist name to group alerts together
    return alerts.sort((a, b) => a.panelistName.localeCompare(b.panelistName));
  }, [panelistMetrics]);
  
  // Calculate TTF alerts (HM only sees TTF, not TTH)
  const ttfAlerts = useMemo(() => getTTFAlerts(filteredData), [filteredData]);
  
  // Split alerts into Personal (HM's own) and Team (everyone else's)
  const personalAlerts = useMemo(() => {
    return panelistAlerts.filter(alert => alert.panelistName === hmName);
  }, [panelistAlerts, hmName]);
  
  const teamAlerts = useMemo(() => {
    return panelistAlerts.filter(alert => alert.panelistName !== hmName);
  }, [panelistAlerts, hmName]);
  
  const totalAlerts = panelistAlerts.length + ttfAlerts.length;
  
  // Calculate aggregate panelist metrics
  const aggregatePanelistMetrics = useMemo(() => {
    const totalInterviews = panelistMetrics.reduce((sum, p) => sum + p.totalInterviews, 0);
    const passedInterviews = panelistMetrics.reduce((sum, p) => sum + p.passedInterviews, 0);
    const avgPassRate = panelistMetrics.length > 0 
      ? panelistMetrics.reduce((sum, p) => sum + p.passRate, 0) / panelistMetrics.length 
      : 0;
    
    // Calculate overall average feedback time
    let totalFeedbackHours = 0;
    let totalValidFeedbacks = 0;
    
    panelistMetrics.forEach(pm => {
      pm.interviews.forEach(interview => {
        if (interview.timeDifferenceHours !== null && interview.timeDifferenceHours >= 0) {
          totalFeedbackHours += interview.timeDifferenceHours;
          totalValidFeedbacks++;
        }
      });
    });
    
    const avgFeedbackTime = totalValidFeedbacks > 0 ? totalFeedbackHours / totalValidFeedbacks : 0;
    
    return {
      totalInterviews,
      passedInterviews,
      avgPassRate,
      totalAlerts: panelistAlerts.length,
      avgFeedbackTime
    };
  }, [panelistMetrics, panelistAlerts.length]);
  
  const activeFilterCount = selectedPanelists.length + selectedCandidates.length + selectedDesignations.length + selectedLocations.length + (reqType !== 'all' ? 1 : 0);
  
  // Clear all filters
  const clearAllFilters = () => {
    setDateFilters({});
    setSelectedPanelists([]);
    setSelectedCandidates([]);
    setSelectedDesignations([]);
    setSelectedLocations([]);
    setReqType('all');
  };
  
  return (
    <div className="min-h-screen bg-surface-secondary">
      <DashboardHeader
        title="Hiring Manager Dashboard"
        subtitle={`Managing ${panelists.length} panelists • ${filteredData.length} candidates`}
        userName={hmName}
        userRole="Hiring Manager"
        recruiterAlerts={[]}
        panelistAlerts={panelistAlerts}
        onBellClick={() => setActiveSection('alerts')}
        activeFilterCount={activeFilterCount}
        onClearAll={clearAllFilters}
        actions={
          <FilterPanel
            dateFilters={dateFilters}
            onDateFilterChange={setDateFilters}
            showReqDate={true}
            showSourcingDate={true}
            showScreeningDate={true}
            allPanelists={allPanelists}
            selectedPanelists={selectedPanelists}
            onPanelistsChange={setSelectedPanelists}
            allDesignations={allDesignations}
            selectedDesignations={selectedDesignations}
            onDesignationsChange={setSelectedDesignations}
            allCandidates={allCandidates}
            selectedCandidates={selectedCandidates}
            onCandidatesChange={setSelectedCandidates}
            allLocations={allLocations}
            selectedLocations={selectedLocations}
            onLocationsChange={setSelectedLocations}
            reqType={reqType}
            onReqTypeChange={setReqType}

          />
        }
      />
      
      <div className="flex overflow-x-hidden">
        <DashboardSidebar
          userRole="hiring-manager"
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <main className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 max-w-[1400px] mx-auto w-full" style={{ marginLeft: '256px' }}>
        {/* Filter Badges */}
        {activeFilterCount > 0 && (
          <section className="mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              {selectedPanelists.length > 0 && (
                <FilterBadge
                  label="Panelists"
                  count={selectedPanelists.length}
                  onClear={() => setSelectedPanelists([])}
                />
              )}
              {selectedDesignations.length > 0 && (
                <FilterBadge
                  label="Designations"
                  count={selectedDesignations.length}
                  onClear={() => setSelectedDesignations([])}
                />
              )}
              {selectedCandidates.length > 0 && (
                <FilterBadge
                  label="Candidates"
                  count={selectedCandidates.length}
                  onClear={() => setSelectedCandidates([])}
                />
              )}
              {selectedLocations.length > 0 && (
                <FilterBadge
                  label="Locations"
                  count={selectedLocations.length}
                  onClear={() => setSelectedLocations([])}
                />
              )}
            </div>
          </section>
        )}
        
        {/* Section Header */}
        <div className="mb-5">
          <h1 className="text-base font-semibold text-slate-900 tracking-tight capitalize">
            {activeSection === 'overview' ? 'Dashboard Overview' : 
             activeSection === 'alerts' ? 'Alerts Overview' :
             activeSection === 'panelist-performance' ? 'Panelist Performance' :
             activeSection === 'candidates' ? 'Candidate Details' : activeSection}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {activeSection === 'overview' && 'Key metrics and candidate breakdown'}
            {activeSection === 'alerts' && 'Personal and team alerts requiring attention'}
            {activeSection === 'panelist-performance' && 'Panelist metrics, performance breakdown, and interview round summaries'}
            {activeSection === 'candidates' && 'Detailed candidate information and status tracking'}
          </p>
        </div>
        
        {/* Key Metrics - Show in overview section only */}
        {activeSection === 'overview' && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Overview</h2>
          <MetricCardGroup>
            <MetricCard
              title="Total Candidates"
              value={filteredData.length}
              icon={Users}
              color="blue"
            />
            <MetricCard
              title="Selected"
              value={pipelineMetrics.selected}
              subtitle={`${filteredData.length > 0 ? ((pipelineMetrics.selected / filteredData.length) * 100).toFixed(1) : 0}% conversion`}
              icon={UserCheck}
              color="green"
            />
            <MetricCard
              title="Overall Conversion"
              value={`${overallConversionRate}%`}
              subtitle={`${pipelineMetrics.selected} selected of ${filteredData.length} total`}
              icon={TrendingUp}
              color="indigo"
            />
            <MetricCard
              title="Offer Acceptance"
              value={`${offerAcceptanceRate}%`}
              subtitle={`${pipelineMetrics.joined} joined of ${pipelineMetrics.selected} offered`}
              icon={Target}
              color="purple"
            />
          </MetricCardGroup>
        </section>
        )}
        
        {/* Candidate Breakdown Funnel - Show in overview section only */}
        {activeSection === 'overview' && (
        <section className="mb-8">
          <ChartCard
            title="Candidate Breakdown"
            subtitle="Interview progression and conversion funnel"
            variant="glass"
          >
            <CandidateFunnel
              data={pipelineData}
              onBarClick={handleBarClick}
            />
          </ChartCard>
        </section>
        )}
        
        {/* Candidate Details Table - Show in candidates section only */}
        {activeSection === 'candidates' && (
        <section className="mb-8" ref={candidateTableRef}>
          <ChartCard
            title="Candidate Details"
            subtitle={`${filteredData.length} total candidates`}
            variant="elevated"
            action={
              <button
                onClick={() => setShowCandidateTable(!showCandidateTable)}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                {showCandidateTable ? 'Collapse' : 'View All'}
              </button>
            }
          >
            {showCandidateTable && (
            <div>
            <div className="flex items-center justify-end mb-4 gap-3">
                {/* Category Filter Badge */}
                {categoryFilter && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                    <FilterIcon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">
                      {getPipelineCategoryLabel(categoryFilter!)}
                    </span>
                    <button
                      onClick={() => {
                        setCategoryFilter(null);
                        setCurrentPage(1);
                      }}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded p-0.5"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                {/* Category Dropdown Filter */}
                <select
                  value={categoryFilter || ''}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value || null);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  <option value="Joined">Joined</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Screening Reject">Screening Reject</option>
                  <option value="Pending/Active">Pending/Active</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            
            <div className="overflow-x-auto" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Skill
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Recruiter
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Reject Round
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {(() => {
                    const displayData = (() => {
                      if (!categoryFilter) return filteredData;
                      if (categoryFilter === 'screening') return filteredData.filter(c => c.screeningCheckStatus === 'Cleared');
                      if (categoryFilter === 'r1') return filteredData.filter(c => c.statusOfR1 === 'Cleared');
                      if (categoryFilter === 'r2') return filteredData.filter(c => c.statusOfR2 === 'Cleared');
                      if (categoryFilter === 'r3') return filteredData.filter(c => c.statusOfR3 === 'Cleared');
                      if (categoryFilter === 'selected') return filteredData.filter(c => c.dashboardCategory === 'Selected' || c.dashboardCategory === 'Joined');
                      return filteredData.filter(c => c.dashboardCategory === categoryFilter);
                    })();
                    
                    if (displayData.length === 0) {
                      return (
                        <tr>
                          <td colSpan={6} className="px-4 py-3 text-center text-slate-500">
                            No candidates found matching your criteria
                          </td>
                        </tr>
                      );
                    }
                    
                    return displayData
                      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      .map((candidate, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">
                        {candidate.candidateName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          candidate.dashboardCategory === 'Joined' ? 'bg-green-100 text-green-800' :
                          candidate.dashboardCategory === 'Selected' ? 'bg-emerald-100 text-emerald-800' :
                          candidate.dashboardCategory === 'Rejected' ? 'bg-red-100 text-red-800' :
                          candidate.dashboardCategory === 'Screening Reject' ? 'bg-orange-100 text-orange-800' :
                          candidate.dashboardCategory === 'Pending/Active' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {candidate.dashboardCategory}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">
                        {candidate.skill}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">
                        {candidate.recruiterName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <StatusBadge status={candidate.finalStatus} />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">
                        {candidate.rejectRound || '-'}
                      </td>
                    </tr>
                  ));
                  })()}
                </tbody>
              </table>
            </div>
            
            {(() => {
              const displayData = (() => {
                if (!categoryFilter) return filteredData;
                if (categoryFilter === 'screening') return filteredData.filter(c => c.screeningCheckStatus === 'Cleared');
                if (categoryFilter === 'r1') return filteredData.filter(c => c.statusOfR1 === 'Cleared');
                if (categoryFilter === 'r2') return filteredData.filter(c => c.statusOfR2 === 'Cleared');
                if (categoryFilter === 'r3') return filteredData.filter(c => c.statusOfR3 === 'Cleared');
                if (categoryFilter === 'selected') return filteredData.filter(c => c.dashboardCategory === 'Selected' || c.dashboardCategory === 'Joined');
                return filteredData.filter(c => c.dashboardCategory === categoryFilter);
              })();
              
              if (displayData.length > itemsPerPage) {
                return (
                  <div className="mt-4 border-t border-slate-200 pt-4">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      
                      <div className="flex gap-2">
                        {Array.from({ length: Math.ceil(displayData.length / itemsPerPage) }, (_, i) => i + 1).map(pageNum => (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                              currentPage === pageNum
                                ? 'bg-blue-600 text-white border border-blue-600'
                                : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => setCurrentPage(p => Math.min(Math.ceil(displayData.length / itemsPerPage), p + 1))}
                        disabled={currentPage >= Math.ceil(displayData.length / itemsPerPage)}
                        className="px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                );
              }
              return null;
            })()}
            </div>
            )}
          </ChartCard>
        </section>
        )}
        
        {/* Panelist Performance - Show in panelist-performance section only */}
        {activeSection === 'panelist-performance' && (
        <>
        {/* Panelist Performance Metrics Cards */}
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Panelist Performance Metrics</h2>
          <MetricCardGroup>
            <MetricCard
              title="Total Interviews"
              value={aggregatePanelistMetrics.totalInterviews}
              icon={Users}
              color="blue"
            />
            <MetricCard
              title="Passed Interviews"
              value={aggregatePanelistMetrics.passedInterviews}
              subtitle={`${aggregatePanelistMetrics.totalInterviews > 0 ? ((aggregatePanelistMetrics.passedInterviews / aggregatePanelistMetrics.totalInterviews) * 100).toFixed(1) : 0}% of total`}
              icon={CheckCircle}
              color="green"
            />
            <MetricCard
              title="Avg Pass Rate"
              value={`${aggregatePanelistMetrics.avgPassRate.toFixed(1)}%`}
              subtitle="Across all panelists"
              icon={TrendingUp}
              color="cyan"
            />
            <MetricCard
              title="Panelist Alerts"
              value={aggregatePanelistMetrics.totalAlerts}
              subtitle="Pending feedback"
              icon={AlertTriangle}
              color="yellow"
            />
            <MetricCard
              title="Avg Feedback Time"
              value={formatHoursToReadable(aggregatePanelistMetrics.avgFeedbackTime)}
              subtitle="From interview to feedback"
              icon={Target}
              color="purple"
            />
          </MetricCardGroup>
        </section>
        
        {/* Panelist Performance Breakdown */}
        <section className="mb-8">
          <PanelistPerformance panelists={panelistMetrics} />
        </section>
        </>
        )}
        
        {/* Interview Rounds Summary - Show in panelist-performance section only */}
        {activeSection === 'panelist-performance' && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Interview Rounds Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* R1 Summary */}
            <ChartCard
              title="Round 1"
              variant="glass"
              className="border-l-4 border-blue-500"
            >
              <div className="space-y-2 pt-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Cleared</span>
                  <span className="font-medium text-green-600">{pipelineMetrics.r1Cleared}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Not Cleared</span>
                  <span className="font-medium text-red-600">{pipelineMetrics.r1NotCleared}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Pending</span>
                  <span className="font-medium text-yellow-600">{pipelineMetrics.r1Pending}</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-700 font-medium">Pass Rate</span>
                    <span className="font-bold text-blue-600">
                      {pipelineMetrics.r1Cleared + pipelineMetrics.r1NotCleared > 0
                        ? ((pipelineMetrics.r1Cleared / (pipelineMetrics.r1Cleared + pipelineMetrics.r1NotCleared)) * 100).toFixed(1)
                        : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </ChartCard>
            
            {/* R2 Summary */}
            <ChartCard
              title="Round 2"
              variant="glass"
              className="border-l-4 border-purple-500"
            >
              <div className="space-y-2 pt-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Cleared</span>
                  <span className="font-medium text-green-600">{pipelineMetrics.r2Cleared}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Not Cleared</span>
                  <span className="font-medium text-red-600">{pipelineMetrics.r2NotCleared}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Pending</span>
                  <span className="font-medium text-yellow-600">{pipelineMetrics.r2Pending}</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-700 font-medium">Pass Rate</span>
                    <span className="font-bold text-purple-600">
                      {pipelineMetrics.r2Cleared + pipelineMetrics.r2NotCleared > 0
                        ? ((pipelineMetrics.r2Cleared / (pipelineMetrics.r2Cleared + pipelineMetrics.r2NotCleared)) * 100).toFixed(1)
                        : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </ChartCard>
            
            {/* R3 Summary */}
            <ChartCard
              title="Round 3"
              variant="glass"
              className="border-l-4 border-orange-500"
            >
              <div className="space-y-2 pt-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Cleared</span>
                  <span className="font-medium text-green-600">{pipelineMetrics.r3Cleared}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Not Cleared</span>
                  <span className="font-medium text-red-600">{pipelineMetrics.r3NotCleared}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Pending</span>
                  <span className="font-medium text-yellow-600">{pipelineMetrics.r3Pending}</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-700 font-medium">Pass Rate</span>
                    <span className="font-bold text-orange-600">
                      {pipelineMetrics.r3Cleared + pipelineMetrics.r3NotCleared > 0
                        ? ((pipelineMetrics.r3Cleared / (pipelineMetrics.r3Cleared + pipelineMetrics.r3NotCleared)) * 100).toFixed(1)
                        : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>
        </section>
        )}
        
        {/* System Alerts Section - Show in alerts section only */}
        {activeSection === 'alerts' && (
        <section className="mb-8" ref={systemAlertsRef}>
          <ChartCard
            title="Alerts Overview"
            subtitle={totalAlerts > 0 ? `${totalAlerts} alert${totalAlerts !== 1 ? 's' : ''} requiring attention` : 'All systems running smoothly'}
              icon={<AlertTriangle className="w-5 h-5 text-orange-600" />}
              variant="elevated"
              action={
                <button
                  onClick={() => setShowAllAlerts(!showAllAlerts)}
                  className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium"
                >
                  {showAllAlerts ? 'Collapse Alerts' : 'View All Alerts'}
                </button>
              }
            >
              {showAllAlerts && (
                <div className="space-y-6">
                  {/* Personal Alerts - Full Width */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      <h4 className="font-semibold text-blue-800">
                        Personal Alerts ({personalAlerts.length})
                      </h4>
                      <span className="text-xs text-blue-600">Your pending feedback</span>
                    </div>
                    {personalAlerts.length > 0 ? (
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {personalAlerts.map((alert, idx) => (
                          <div
                            key={idx}
                            className="bg-white rounded-lg p-3 shadow-sm"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-slate-800 truncate">{alert.candidateName}</p>
                                <p className="text-xs text-slate-600 mt-0.5">
                                  Round: {alert.round}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                  Interview: {formatDate(alert.interviewDate)}
                                </p>
                              </div>
                              {alert.isPending ? (
                                <span className="text-xs font-semibold text-yellow-600 whitespace-nowrap ml-2">
                                  Pending
                                </span>
                              ) : (
                                <span className="text-xs font-semibold text-orange-600 whitespace-nowrap ml-2">
                                  {alert.hours !== null ? formatHoursToReadable(alert.hours) : 'Delayed'}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <p className="text-sm">No personal alerts at this time</p>
                      </div>
                    )}
                  </div>

                  {/* Team Alerts - Full Width */}
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
                      <h4 className="font-semibold text-orange-800">
                        Team Alerts ({teamAlerts.length + ttfAlerts.length})
                      </h4>
                      <span className="text-xs text-orange-600">Team member feedback & TTF alerts</span>
                    </div>
                    
                    {/* Team Panelist Feedback Alerts */}
                    {teamAlerts.length > 0 && (
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-orange-700 mb-2">Panelist Feedback ({teamAlerts.length})</h5>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {teamAlerts.map((alert, idx) => (
                            <div
                              key={idx}
                              className="bg-white rounded-lg p-3 shadow-sm"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-slate-800 truncate">{alert.panelistName}</p>
                                  <p className="text-xs text-slate-600 mt-0.5">
                                    {alert.candidateName} • Round: {alert.round}
                                  </p>
                                  <p className="text-xs text-slate-500 mt-1">
                                    Interview: {formatDate(alert.interviewDate)}
                                  </p>
                                </div>
                                {alert.isPending ? (
                                  <span className="text-xs font-semibold text-yellow-600 whitespace-nowrap ml-2">
                                    Pending
                                  </span>
                                ) : (
                                  <span className="text-xs font-semibold text-orange-600 whitespace-nowrap ml-2">
                                    {alert.hours !== null ? formatHoursToReadable(alert.hours) : 'Delayed'}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TTF Alerts */}
                    {ttfAlerts.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-rose-700 mb-2">
                          TTF Alerts ({ttfAlerts.length})
                          <span className="text-xs font-normal text-rose-600 ml-1">&gt; 60 days</span>
                        </h5>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {ttfAlerts.map((alert, idx) => (
                            <div
                              key={idx}
                              className="bg-white rounded-lg p-3 shadow-sm"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-slate-800 truncate">{alert.candidateName}</p>
                                  <p className="text-xs text-slate-600 mt-0.5">
                                    {alert.designation}
                                  </p>
                                  <p className="text-xs text-slate-500 mt-1">
                                    Req Date: {alert.reqDate ? formatDate(alert.reqDate) : 'N/A'}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    Offer Accepted: {alert.offerAcceptanceDate ? formatDate(alert.offerAcceptanceDate) : 'N/A'}
                                  </p>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="text-lg font-bold text-rose-600">{alert.daysElapsed}d</span>
                                  <span className="text-xs font-semibold text-rose-600">+{alert.daysElapsed - 60} over</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {teamAlerts.length === 0 && ttfAlerts.length === 0 && (
                      <div className="text-center py-8 text-slate-500">
                        <p className="text-sm">No team alerts at this time</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </ChartCard>
          </section>
        )
        }
        
        {/* Quick Stats - Show in panelist-performance section only */}
        {activeSection === 'panelist-performance' && (
        <section>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center p-5 bg-white rounded-card border border-slate-200 shadow-card">
              <p className="text-2xl font-bold text-slate-900 tabular-nums">
                {panelistMetrics.reduce((sum, p) => sum + p.totalInterviews, 0)}
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium">Total Interviews</p>
            </div>
            <div className="text-center p-5 bg-white rounded-card border border-slate-200 shadow-card">
              <p className="text-2xl font-bold text-slate-900 tabular-nums">
                {panelistMetrics.length > 0 
                  ? (panelistMetrics.reduce((sum, p) => sum + p.passRate, 0) / panelistMetrics.length).toFixed(1)
                  : 0}%
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium">Avg Pass Rate</p>
            </div>
            <div className="text-center p-5 bg-white rounded-card border border-slate-200 shadow-card">
              <p className="text-2xl font-bold text-slate-900 tabular-nums">
                {panelistMetrics.reduce((sum, p) => sum + p.passedInterviews, 0)}
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium">Interviews Cleared</p>
            </div>
          </div>
        </section>
        )}
      </main>
      </div>
    </div>
  );
}
