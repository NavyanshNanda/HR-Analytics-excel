# HR Analytics Dashboard

A comprehensive role-based HR Analytics Dashboard built with Next.js 14+, TypeScript, Tailwind CSS, and Recharts.

## Features

### 4 User Roles with Distinct Dashboards

1. **Super Admin** - Complete overview of all recruitment data
   - Recruitment Pipeline funnel chart
   - Source Distribution metrics
   - Final Status breakdown (Selected, Rejected, In progress, On hold)
   - Date filters (Req Date, Sourcing Date, Screening Date)

2. **Hiring Manager** - View their recruiters and panelists performance
   - Recruiter Performance metrics with 48-hour alerts
   - Panelist Performance metrics with feedback delay alerts
   - Sourcing to Screening time tracking
   - Interview to Feedback time tracking

3. **Recruiter** - Track their sourced candidates
   - Source distribution chart
   - Candidate profiles table
   - 48-hour violation alerts for Sourcing → Screening
   - Conversion metrics (Selected / Total sourced)

4. **Panelist** - View their conducted interviews
   - Interview count breakdown by round (R1/R2/R3)
   - Pass rate by round
   - 48-hour feedback alerts
   - Interview details table with status tracking

### Key Features

- **48-Hour Alert System**: Red alerts for delays in:
  - Sourcing Date to Screening Date (for recruiters)
  - Interview Date to Feedback Date (for panelists)

- **Final Status as Source of Truth**: The Final Status column determines candidate outcome, regardless of individual round statuses

- **Color Coding System**:
  - 🟢 Green: Selected / Cleared
  - 🔴 Red: Rejected / Not Cleared
  - 🟡 Yellow: In Progress / Pending
  - ⚫ Gray: On Hold

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: Zustand
- **CSV Parsing**: PapaParse
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── page.tsx                           # Landing page with user type selection
│   ├── layout.tsx                         # Root layout
│   ├── globals.css                        # Global styles
│   ├── not-found.tsx                      # 404 page
│   ├── api/
│   │   └── data/
│   │       └── route.ts                   # API route for CSV data
│   └── dashboard/
│       ├── loading.tsx                    # Loading state
│       ├── error.tsx                      # Error boundary
│       ├── super-admin/
│       │   └── page.tsx                   # Super Admin dashboard
│       └── [userType]/
│           └── [userId]/
│               └── page.tsx               # Dynamic user dashboards
├── components/
│   ├── dashboards/
│   │   ├── SuperAdminDashboard.tsx
│   │   ├── HiringManagerDashboard.tsx
│   │   ├── RecruiterDashboard.tsx
│   │   └── PanelistDashboard.tsx
│   ├── charts/
│   │   ├── RecruitmentPipeline.tsx
│   │   ├── SourceDistribution.tsx
│   │   ├── FinalStatusBreakdown.tsx
│   │   ├── RecruiterPerformance.tsx
│   │   ├── PanelistPerformance.tsx
│   │   └── PassRateChart.tsx
│   └── ui/
│       ├── AlertBadge.tsx
│       ├── DateFilter.tsx
│       ├── DashboardHeader.tsx
│       ├── LoadingSpinner.tsx
│       ├── MetricCard.tsx
│       ├── StatusBadge.tsx
│       ├── UserNameLookup.tsx
│       └── UserTypeSelector.tsx
├── lib/
│   ├── types.ts                           # TypeScript interfaces
│   ├── dataProcessing.ts                  # CSV parsing & data filtering
│   ├── calculations.ts                    # Metrics calculations
│   └── utils.ts                           # Utility functions
├── store/
│   └── userStore.ts                       # Zustand store
└── TA Tracker - HM Sheet.csv              # Data source
```

## Data Structure

The CSV file contains the following key columns:
- Candidate info: Name, Skill, Designation, Experience, etc.
- Tracking dates: Req Date, Sourcing Date, Screening Date
- Interview rounds: R1, R2, R3 with panelist names, dates, and statuses
- Final outcomes: Final Status, Offer Date, Joining Date, etc.

## Navigation Flow

1. **Landing Page**: Select user type (Super Admin / Hiring Manager / Recruiter / Panelist)
2. **User Selection**: For non-admin roles, select your name from the dropdown
3. **Dashboard**: View role-specific metrics and analytics

## License

MIT
