# HR Analytics Dashboard — End-User Documentation

> **Document Version:** 1.0  
> **Last Updated:** February 2026  
> **Audience:** HR Professionals — Hiring Managers, Recruiters, Panelists, and HR Leadership  

---

## Table of Contents

### Part I — Getting Started
1. [Platform Overview](#1-platform-overview)
2. [Accessing the Dashboard](#2-accessing-the-dashboard)
3. [Choosing Your Role](#3-choosing-your-role)

### Part II — Navigation
4. [Sidebar Navigation Guide](#4-sidebar-navigation-guide)
   - 4.1 [Super Admin Sidebar](#41-super-admin-sidebar)
   - 4.2 [Hiring Manager Sidebar](#42-hiring-manager-sidebar)
   - 4.3 [Recruiter Sidebar](#43-recruiter-sidebar)
   - 4.4 [Panelist Sidebar](#44-panelist-sidebar)

### Part III — Dashboard Features by Role
5. [Super Admin Dashboard](#5-super-admin-dashboard)
6. [Hiring Manager Dashboard](#6-hiring-manager-dashboard)
7. [Recruiter Dashboard](#7-recruiter-dashboard)
8. [Panelist Dashboard](#8-panelist-dashboard)

### Part IV — Filters & Controls
9. [Using Filters](#9-using-filters)

### Part V — Alerts
10. [Understanding Alerts](#10-understanding-alerts)

### Part VI — Reference
11. [Metric Definitions Glossary](#11-metric-definitions-glossary)
12. [Dashboard Category Definitions](#12-dashboard-category-definitions)
13. [Frequently Asked Questions](#13-frequently-asked-questions)

---

---

# Part I — Getting Started

---

## 1. Platform Overview

The **HR Analytics Dashboard** is a recruitment tracking and analytics platform that gives every member of the hiring team a personalised, real-time view of the recruitment pipeline. It centralises candidate data—from the moment a candidate is sourced all the way through to joining—and surfaces the metrics, trends, and alerts each role needs to make faster, better-informed hiring decisions.

The platform is **role-based**: what you see when you log in is tailored specifically to your function. A Super Admin sees the entire organisation. A Hiring Manager sees only their own team's candidates and panelists. A Recruiter sees only the candidates they sourced. A Panelist sees only the interviews they conducted. This ensures every user works with focused, relevant information without noise from other parts of the organisation.

---

## 2. Accessing the Dashboard

### Step 1 — Open the Platform

Navigate to the platform URL provided by your HR or IT team. You will land on the **HR Analytics Home Page**, which displays the tagline *"Recruitment Tracking & Analytics Platform"* and shows the total number of candidates currently tracked in the system.

The home page has three sections worth noting:

| Section | What It Does |
|---|---|
| **Role Selection Cards** | Four cards in the centre of the page — choose the one matching your role |
| **Feature Highlights** | A brief summary of the three pillars of the platform: Real-time Analytics, Role-based Access, and 48-Hour Alerts |
| **Footer** | Version and copyright information |

### Step 2 — Wait for Data to Load

When the page first opens, you will briefly see a loading spinner with the message **"Loading HR Analytics Dashboard…"**. This is normal — the system is pulling in the latest recruitment data. This typically takes only a few seconds.

If you see an **"Error Loading Data"** message instead, click the **Retry** button. If the problem persists, contact your system administrator.

> **Note:** The platform reads data directly from the organisation's live recruitment tracker. You do not need to upload or import any files yourself — the data is always up to date.

---

## 3. Choosing Your Role

Once the data loads, you will see **four role cards** in the centre of the page. Click the card that matches your position in the hiring process.

---

### 🛡️ Super Admin

> *"Access to all data and metrics across the organisation"*

**Who should select this:** HR Directors, Talent Acquisition Heads, or anyone who needs a bird's-eye view of the entire recruitment operation across all hiring managers, recruiters, and panelists.

**What happens after clicking:** You are taken directly to the **Super Admin Dashboard** — no name selection is required, as this role sees all data.

---

### 💼 Hiring Manager

> *"View your recruiters and panelist performance"*

**Who should select this:** Team leads or department managers who own open requisitions and need to track candidate pipeline health and panelist activity for their roles.

**What happens after clicking:** A **name search field** appears. Type your name and select it from the list. The dashboard will then load showing only the candidates, panelists, and metrics relevant to your requisitions.

---

### 👥 Recruiter

> *"Track your sourced candidates and screening metrics"*

**Who should select this:** Talent Acquisition Recruiters responsible for sourcing candidates and managing them through the screening stage.

**What happens after clicking:** A **name search field** appears. Type your name and select it from the list. The dashboard will then load showing only the candidates you sourced and their pipeline status.

---

### 📋 Panelist

> *"View your interview history and feedback metrics"*

**Who should select this:** Interviewers—technical or functional—who conduct Round 1, Round 2, or Round 3 interviews and submit feedback.

**What happens after clicking:** A **name search field** appears. Type your name and select it from the list. The dashboard will then load showing only the interviews you have conducted and any pending feedback items.

---

### Switching Roles

To switch to a different role or return to the home page from any dashboard, click the **🏠 Home icon** in the top-right corner of the header. This will take you back to the role selection screen.

> **Tip:** Your name must exist in the recruitment data to appear in the lookup list. If your name does not appear, contact your HR administrator to ensure your name is correctly entered in the source tracker.

---

*End of Part I — Getting Started*

---

---

# Part II — Navigation

---

## 4. Sidebar Navigation Guide

Every dashboard has a **collapsible sidebar** fixed to the left side of the screen. It is your primary way of moving between the different sections of your dashboard.

### How the Sidebar Works

| Control | Action |
|---|---|
| **Click any sidebar item** | Jumps to that section of the dashboard — the main content area updates instantly |
| **Active item** | Highlighted with a blue/purple gradient background and a coloured bar on its left edge |
| **Collapse arrow (‹)** | Collapses the sidebar to icon-only mode to give you more screen space |
| **Expand arrow (›)** | Restores the full sidebar with labels |
| **Hover on a collapsed icon** | A tooltip appears showing the section name |

> **Tip:** When the sidebar is collapsed to icons only, you can still navigate between sections by hovering over an icon to see its name, then clicking it.

---

## 4.1 Super Admin Sidebar

The Super Admin has the broadest set of sections, covering the entire recruitment operation.

| # | Sidebar Item | What You Will Find There |
|---|---|---|
| 1 | **Overview** | Key metric cards, the 5-stage Recruitment Pipeline chart, and the Status Distribution pie chart — the high-level health of the entire hiring operation at a glance |
| 2 | **Alerts** | All active system alerts grouped into four categories: Recruiter Sourcing-to-Screening delays, Panelist Feedback delays, Time-to-Hire breaches, and Time-to-Fill breaches |
| 3 | **Panelist Performance** | Aggregate panelist metrics, individual panelist data table with pass rates and average feedback times, and interview round summaries (R1, R2, R3) |
| 4 | **Candidate Details** | A filterable, paginated table of every candidate in the system with their status, skill, recruiter, and rejection round |
| 5 | **Recruiter Performance** | Source distribution chart showing where candidates are coming from, with drilldown capability into sub-sources |

---

## 4.2 Hiring Manager Sidebar

The Hiring Manager's sidebar is scoped to the candidates and panelists associated with their requisitions only.

| # | Sidebar Item | What You Will Find There |
|---|---|---|
| 1 | **Overview** | Key metrics for your pipeline (total candidates, conversion rates, offer acceptance) and a Candidate Breakdown funnel chart — clickable bars navigate you to filtered Candidate Details |
| 2 | **Alerts** | Your personal feedback alerts (interviews where you are the panelist and feedback is overdue) and team alerts (other panelists on your reqs with overdue feedback) |
| 3 | **Panelist Performance** | Performance metrics, pass rates, and interview round summaries for all panelists operating under your requisitions |
| 4 | **Candidate Details** | A filterable table of all candidates under your requisitions, with status, skill, recruiter, and reject round columns |

---

## 4.3 Recruiter Sidebar

The Recruiter's sidebar focuses on the candidates they own and the panelists who interview those candidates.

| # | Sidebar Item | What You Will Find There |
|---|---|---|
| 1 | **My Performance** | Your personal sourcing metrics, the Recruitment Pipeline funnel chart (clickable bars navigate to filtered Candidate Details), and a Status Distribution pie chart |
| 2 | **Alerts** | Your personal sourcing-to-screening delay alerts and team alerts for panelist feedback delays on your candidates |
| 3 | **Panelist Performance** | Aggregate metrics and a round-by-round summary for panelists interviewing your candidates |
| 4 | **Candidate Details** | A searchable, filterable table of all candidates you have sourced |

---

## 4.4 Panelist Sidebar

The Panelist's sidebar is the most focused — everything is scoped to the interviews they personally conducted.

| # | Sidebar Item | What You Will Find There |
|---|---|---|
| 1 | **My Performance** | Your key interview metrics, interviews conducted per round, pass rates per round, and outcome breakdown |
| 2 | **My Interviews** | A full, searchable and filterable table of every interview you have conducted with candidate details and statuses |
| 3 | **Alerts** | All interviews where your feedback has not been submitted on time, displayed as individual alert cards |

---

### Bell Icon — Quick Alert Access

In the **top-right area of the header**, on every dashboard, there is a **bell icon (🔔)**. If there are any active alerts assigned to you, a red badge with a count will appear on the bell.

Clicking the bell icon takes you directly to the **Alerts** section of your dashboard, regardless of which section you are currently viewing. This is the fastest way to check and act on time-sensitive items without navigating the sidebar manually.

---

*End of Part II — Navigation*

---

## Part III — Dashboard Features by Role

Each role has a unique dashboard tailored to their responsibilities. This part walks through every section, metric card, chart, and interactive feature available to each role.

---

### 5. Super Admin Dashboard

**URL path:** `/dashboard/super-admin`  
**Default section on load:** Overview

The Super Admin dashboard provides a complete, organisation-wide view of recruitment. All data is visible — no scoping by HM, recruiter, or panelist.

---

#### 5.1 Overview Section

**Metric Cards**

| Card | What it shows | Note |
|---|---|---|
| Total Candidates | Total number of candidate records after filters are applied | Baseline for all percentage calculations |
| Screening Rejected | Candidates who failed the screening check | Percentage of total shown as subtitle |
| Rejected | Candidates rejected during interview rounds | Percentage of total shown as subtitle |
| Pending/Active | Candidates currently in process | No final status yet |
| Open Reqs | Requisitions that are not yet fully closed | Subtitle shows total remaining openings |
| Closed Reqs | Requisitions that have been filled | Subtitle shows number of candidates joined |
| Avg Feedback Time | Average time from interview date to feedback submission across all panelists | Green when within 48 hours; amber/red when exceeding 48 hours |

**Recruitment Pipeline Chart**

A horizontal bar chart showing five stages: All Candidates → Screening Cleared → Interview Cleared → Offered → Joined.

- **Clicking any bar** immediately navigates to the Candidate Management section with a filter automatically applied to show only candidates matching that pipeline stage.
- Below the chart, three percentage summary tiles show: **Screening Rate**, **Interview Success Rate**, and **Overall Conversion Rate**.

**Status Distribution Pie Chart**

A donut (ring) chart displayed alongside the pipeline chart, showing the proportional breakdown across the four pipeline stages. Hovering over a segment shows the count. A legend below the chart displays the percentage for each stage.

---

#### 5.2 Alerts Section

Shows all system-wide alerts grouped into four categories:

| Alert Type | Trigger Condition |
|---|---|
| Sourcing Delay (Recruiter) | More than 48 hours elapsed between a candidate's sourcing date and screening date |
| Panelist Feedback Delay | More than 48 hours elapsed between an interview date and the panelist's feedback submission |
| Time to Hire (TTH) | Hiring timeline exceeds the defined threshold |
| Time to Fill (TTF) | Requisition fill time exceeds the defined threshold |

Each alert card shows the candidate name, the responsible recruiter or panelist, the dates involved, and the hours elapsed. A total badge count appears on the bell icon in the header when alerts exist.

---

#### 5.3 Candidate Management Section

Displays a full paginated table of all candidates. 20 records are shown per page.

**Table columns:** Candidate Name | Category | Designation | HM | Recruiter | Location | Status | Reject Round

**Filtering within the table:**

- A **category dropdown** at the top-right of the table allows filtering by: Joined, Selected, Rejected, Screening Reject, Pending/Active, Other.
- When a **pipeline stage bar was clicked** from the Overview chart, a blue filter badge appears above the table showing the active stage filter (e.g., "Screening Cleared"). An × button clears the filter.
- Both the table rows and pagination update in real time when a filter is applied.

---

#### 5.4 Recruiter Performance Section

**Source Distribution charts** showing where candidates were sourced from.

- A bar chart shows the count of candidates from each top-level source. **Clicking a source bar** drills into that source's sub-categories (e.g., clicking "Job Portal" shows Naukri, LinkedIn, Indeed separately).
- A "← Back to Sources" button appears in the chart header to return to the top-level view.
- A pie chart alongside the bar chart shows the proportional split of candidates across all sources.

---

#### 5.5 Panelist Performance Section

**Aggregate Metric Cards**

| Card | What it shows |
|---|---|
| Total Interviews | Combined interview count across all panelists |
| Passed Interviews | Total interviews where the candidate cleared |
| Avg Pass Rate | Average pass rate across all panelists |
| Panelist Alerts | Count of interviews with pending or delayed feedback |
| Avg Feedback Time | Average feedback turnaround time across all interviews |

**Individual Panelist Performance Table**

A sortable table listing each panelist with:
- Total interviews conducted
- Pass rate percentage
- R1 / R2 / R3 interview counts
- **Avg Feedback Time** (last column) — colour-coded: green ≤ 24 h, amber ≤ 48 h, red > 48 h

**Interview Rounds Summary**

Three cards showing Round 1, Round 2, and Round 3 breakdown: Cleared count, Not Cleared count, Pending count, and computed pass rate for that round.

---

### 6. Hiring Manager Dashboard

**URL path:** `/dashboard/hiring-manager/[userId]`  
**Default section on load:** Overview

The HM dashboard is scoped exclusively to candidates and panelists associated with that Hiring Manager. Data from other HMs is not visible.

---

#### 6.1 Overview Section

**Metric Cards**

| Card | What it shows |
|---|---|
| Total Candidates | Candidates under this HM after filters |
| Selected | Number of candidates who received an offer |
| Overall Conversion | Percentage selected out of total candidates |
| Offer Acceptance | Percentage of offered candidates who subsequently joined |

**Candidate Breakdown Funnel**

An interactive bar chart showing: Total Candidates → Screening Cleared → Round 1 Cleared → Round 2 Cleared → Round 3 Cleared → Selected.

- **Clicking any bar** navigates to the Candidate Details section with a filter applied for that pipeline stage. The filter badge appears at the top of the candidate table.

---

#### 6.2 Alerts Section

Alerts are split into two clearly labelled groups:

**Personal Alerts (blue panel)**  
Interviews where the HM themselves is the panelist and feedback is pending or delayed.

**Team Alerts (orange panel)**  
Interviews assigned to other panelists in the HM's team with pending or overdue feedback.

Each alert card shows: candidate name, interview round, interview date, and either "Pending" (feedback not yet submitted) or the number of hours elapsed since the interview.

Additionally, **Time to Fill (TTF) alerts** are shown for requisitions that have exceeded the fill-time threshold.

---

#### 6.3 Panelist Performance Section

**Aggregate Metric Cards**

| Card | What it shows |
|---|---|
| Total Interviews | Sum of all interviews across panelists in this HM's team |
| Passed Interviews | Total passed, with percentage subtitle |
| Avg Pass Rate | Average pass rate across the team's panelists |
| Panelist Alerts | Count of pending feedback items |
| Avg Feedback Time | Average feedback turnaround for the team |

**Panelist Performance Table**  
Lists each panelist with interview counts, pass rate, and per-round breakdown.

**Interview Rounds Summary**  
Three cards (R1, R2, R3) each showing Cleared, Not Cleared, Pending counts and the round's pass rate.

---

#### 6.4 Candidate Details Section

A paginated table (20 per page) of all candidates under this HM.

**Table columns:** Candidate | Category | Skill | Recruiter | Status | Reject Round

**Filtering:**

- A **category dropdown** filters by: Joined, Selected, Rejected, Screening Reject, Pending/Active, Other.
- When arriving via a pipeline bar click, a **blue filter badge** shows the active stage (e.g., "Round 1 Cleared"). Click × to clear.

---

### 7. Recruiter Dashboard

**URL path:** `/dashboard/recruiter/[userId]`  
**Default section on load:** My Performance

The Recruiter dashboard is scoped to candidates sourced by that recruiter. It also provides visibility into panelist performance for interviews associated with the recruiter's candidates.

---

#### 7.1 My Performance Section

**Metric Cards**

| Card | What it shows |
|---|---|
| Candidates Sourced | Total candidates this recruiter has submitted |
| Screening Cleared | Candidates who passed the screening check, with pass rate percentage |
| Conversion Rate | Percentage of sourced candidates who were ultimately selected |
| Avg Sourcing to Screening | Average time (in hours/days) between sourcing date and screening date — green when ≤ 48 h, red when > 48 h |

**Recruitment Pipeline Chart**

Identical in format to the SuperAdmin pipeline chart. Clicking a bar navigates to Candidate Details with the corresponding pipeline category filter applied.

Below the chart: **Screening Rate**, **Interview Success Rate**, and **Overall Conversion Rate** percentage tiles.

**Status Distribution Pie Chart**

Shows proportional breakdown of this recruiter's candidates across screening cleared, interview cleared, offered, and joined stages.

**Source Distribution Charts**

Bar and pie charts showing which sources (job portals, referrals, social media, etc.) the recruiter's candidates came from. The bar chart supports **sub-source drill-down** by clicking a source bar.

---

#### 7.2 Alerts Section

Alerts are divided into two groups:

**My Sourcing Alerts (personal)**  
Candidates where more than 48 hours passed between sourcing date and screening date. Shows candidate name, sourcing date, screening date, and hours elapsed.

**Team Panelist Alerts**  
Interviews associated with this recruiter's candidates where the panelist has not submitted feedback within 48 hours.

Additionally, **TTH** (Time to Hire) and **TTF** (Time to Fill) alerts appear if applicable thresholds are exceeded.

---

#### 7.3 Candidate Details Section

Paginated table (20 per page) of all candidates sourced by this recruiter.

**Table columns:** Candidate | Designation | Location | Source | Status | Sourcing Date | Screening Date | Alert

**Controls:**
- **Search box** — filters by candidate name, skill, or designation in real time.
- **Status dropdown** — filter by All, Active, Hired, Rejected, On Hold, or Alert (shows only 48-h delay candidates).
- When arriving via a pipeline bar click, a **pipeline category filter badge** is shown with a clear (×) button.

---

#### 7.4 Panelist Performance Section

Same layout as the HM's Panelist Performance section, but scoped only to panelists who have interviewed this recruiter's candidates.

**Metric cards:** Total Interviews | Passed Interviews | Avg Pass Rate | Panelist Alerts | Avg Feedback Time

**Panelist table** and **Interview Rounds Summary** (R1/R2/R3 cards) are also present.

---

### 8. Panelist Dashboard

**URL path:** `/dashboard/panelist/[userId]`  
**Default section on load:** My Performance

The Panelist dashboard is scoped to interviews conducted by that panelist. It provides personal performance metrics, an interview log, and a dedicated alerts feed.

---

#### 8.1 My Performance Section

**Metric Cards**

| Card | What it shows |
|---|---|
| Total Interviews | Total interviews this panelist has conducted after filters |
| Passed | Number of candidates the panelist passed, with pass rate percentage as subtitle |
| Avg Feedback Time | Average time between interview date and feedback submission — green when ≤ 48 h, red when > 48 h |

**Interviews by Round**

Three coloured tiles showing interview counts for Round 1 (blue), Round 2 (purple), and Round 3 (orange), each with the pass rate for that round.

**Pass Rate Chart**

A visual bar chart comparing cleared vs rejected counts across R1, R2, and R3 simultaneously.

**Interview Outcomes**

Three tiles showing total Passed (green), Failed (red), and Pending (yellow) counts, each with a proportional fill bar indicating their share of total interviews.

---

#### 8.2 My Interviews Section

A full paginated table (20 per page) of all interviews conducted by this panelist.

**Table columns:** Candidate | Round | Status | Interview Date | Feedback Date | Feedback Time | Alert

**Controls:**
- **Search box** — filters by candidate name.
- **Round filter** — All, R1, R2, R3.
- **Status filter** — All, Cleared, Not Cleared, Alert (shows only interviews with pending/delayed feedback).

Each row shows a coloured status badge. Rows with pending feedback show an alert indicator.

---

#### 8.3 Alerts Section

A dedicated feed showing only the panelist's own interviews that require immediate attention.

Each alert card shows:
- Candidate name
- Interview round (R1, R2, or R3)
- Interview date
- Either **"Pending"** (in yellow) — feedback not yet submitted — or the **hours elapsed** since the interview (in orange) — feedback submitted but exceeded 48 hours

If no alerts exist, a clock icon and the message "No alerts at this time — All feedback has been provided" is displayed.

> **Tip:** Clicking the bell icon in the header navigates directly to this section from anywhere in the dashboard.

---

*End of Part III — Dashboard Features by Role*

---

> **Next:** Part IV — Filters & Controls

---

## Part IV — Filters & Controls

Every dashboard exposes a consistent filtering system that narrows the data displayed across all sections simultaneously. Filters are applied globally — changing a filter affects metric cards, charts, and tables at the same time.

---

### 9. Using the Filter System

#### 9.1 Opening the Filter Panel

The filter panel is accessed via the **funnel icon** (⊞) in the top-right area of the sticky header.

- Click the funnel icon to open the panel below the header.
- Click anywhere outside the header area to close it without making changes.
- When any filter is active, a **blue badge** with the count of active filters appears on the funnel icon.

---

#### 9.2 Date Filters

The date filters section is always visible inside the filter panel. It is opened by clicking the **"Filters"** button within the panel, which expands a date-picker popover.

Up to three date ranges are available depending on the dashboard role:

| Date Range | Dashboard it appears on | What it filters |
|---|---|---|
| Req Date | All roles | Candidates whose requisition was raised within the selected range |
| Sourcing Date | All roles | Candidates who were sourced within the selected range |
| Screening Date | All roles | Candidates whose screening occurred within the selected range |

**How to set a date range:**
1. Open the filter panel and click the **"Filters"** button.
2. Choose a **From** date and a **To** date for the relevant date type.
3. The dashboard updates immediately on each date change.
4. A **"Clear all filters"** link at the bottom of the popover removes all date selections.

When at least one date is active, the "Filters" button turns blue with an "Active" badge.

---

#### 9.3 People Filters

The People Filters section appears below the Date Filters row. Each filter is a **multi-select dropdown** showing the relevant people visible to that role.

| Filter | Available to |
|---|---|
| HMs (Hiring Managers) | Super Admin only |
| Recruiters | Super Admin only |
| Panelists | Super Admin, Hiring Manager, Recruiter |

**How to use a multi-select dropdown:**
1. Click the dropdown button (e.g., "Filter by Panelist").
2. A panel opens showing a **search box** and a list of checkboxes.
3. Type in the search box to quickly find a specific name.
4. Click any item to toggle its selection — a blue check mark indicates it is selected.
5. **"Select All (n)"** selects all currently visible (filtered) options at once.
6. **"Clear (n)"** removes all selections in that dropdown.
7. Click the × button in the panel header or click outside to close the dropdown.

The dropdown button label changes to show the count of selected items (e.g., "Panelists (3)").

---

#### 9.4 Other Filters

The Other Filters section provides additional multi-select dropdowns and one toggle.

| Filter | Type | What it does |
|---|---|---|
| Req Type | Dropdown (single select) | Shows only Open Reqs, only Closed Reqs, or All (default) |
| Designations | Multi-select | Filters to candidates with the selected job designations |
| Candidates | Multi-select | Filters to specific candidates by name |
| Locations | Multi-select | Filters to candidates based in the selected cities/locations |

The **Req Type** dropdown has three options: **All Reqs** (default), **Open Reqs** (positions not yet fully filled), and **Closed Reqs** (positions that have been filled).

---

#### 9.5 Active Filter Badges

When any people or other filter is active, a row of **filter badges** appears at the top of the main content area (below the sticky header).

Each badge shows:
- The filter category name (e.g., "Panelists")
- The count of selected items (e.g., "3")
- An × button to clear just that one filter group

Removing a badge instantly removes those selections and refreshes all content.

---

#### 9.6 Clear All Filters

When at least one filter is active, a **"Clear All"** button (with a red × icon) appears in the header to the left of the funnel icon.

Clicking **Clear All** simultaneously resets:
- All date filters
- All people filters (HMs, Recruiters, Panelists)
- All other filters (Designations, Candidates, Locations, Req Type)
- Any pipeline category filter that was applied via a chart bar click

> **Note:** The search box and status dropdown inside the Candidate Details or Interview Details table are local controls — they are **not** cleared by the global Clear All button.

---

#### 9.7 Pipeline Category Filter (Chart Drill-Through)

In addition to the global filter system, clicking a bar in the **Recruitment Pipeline** or **Candidate Breakdown** chart applies a scoped category filter that affects only the candidate table in that session.

| Dashboard | Chart | Filter type |
|---|---|---|
| Super Admin | Recruitment Pipeline | 5-stage: Screening Cleared → Joined |
| Hiring Manager | Candidate Breakdown | Round-based: Screening Cleared → Selected |
| Recruiter | Recruitment Pipeline | 5-stage: Screening Cleared → Joined |

When active, this filter is shown as a **blue badge** above the candidate table with the stage name (e.g., "Screening Cleared"). Clicking × on the badge, or using the category dropdown inside the table, clears it.

---

## Part V — Understanding Alerts

The platform monitors four types of deadline violations and surfaces them as alerts. This section explains what triggers each alert, where it appears, and what action is expected.

---

### 10. Alert Types

#### 10.1 Alert Overview

| Alert | Threshold | Who triggers it | Who sees it |
|---|---|---|---|
| Sourcing Delay | > 48 hours between sourcing date and screening date | Recruiter | Super Admin, Recruiter |
| Panelist Feedback Delay | > 48 hours between interview date and feedback date, OR feedback not submitted | Panelist | Super Admin, HM, Recruiter, Panelist |
| Time to Hire (TTH) | > 30 days between screening date and offer acceptance date | Candidate record | Super Admin, Recruiter |
| Time to Fill (TTF) | > 60 days between req date and offer acceptance date | Requisition | Super Admin, HM, Recruiter |

---

#### 10.2 Sourcing Delay (48-Hour Recruiter Alert)

**What it means:** A candidate was sourced but more than 48 hours passed before they were taken to the screening stage.

**Trigger:** The time difference between `Sourcing Date` and `Screening Date` exceeds 48 hours.

**Where it appears:**
- Super Admin → Alerts section, under "Recruiter Alerts"
- Recruiter → Alerts section, under "My Sourcing Alerts"

**Information shown:** Candidate name, recruiter name, sourcing date, screening date, and the exact hours elapsed.

---

#### 10.3 Panelist Feedback Delay (48-Hour Panelist Alert)

**What it means:** After conducting an interview, the panelist either has not submitted feedback yet, or submitted it more than 48 hours after the interview took place.

**Two sub-types:**

| Sub-type | Indicator in UI |
|---|---|
| Feedback not yet submitted (interview happened, no feedback date recorded) | Yellow **"Pending"** label |
| Feedback submitted but took more than 48 hours | Orange label showing hours elapsed (e.g., "52h") |

**Where it appears:**
- Super Admin → Alerts section, panelist alerts grouped by panelist name
- HM → Alerts section split into "Personal Alerts" (HM is the panelist) and "Team Alerts" (other panelists)
- Recruiter → Alerts section, under "Team Panelist Alerts"
- Panelist → Dedicated "My Alerts" section showing only their own pending feedback

**Information shown:** Candidate name, interview round (R1 / R2 / R3), interview date, and pending status or hours elapsed.

---

#### 10.4 Time to Hire (TTH) Alert

**What it means:** The hiring process for a candidate — measured from the screening date to the offer acceptance date — took longer than 30 days.

**Threshold:** 30 calendar days

**Trigger:** `Offer Acceptance Date − Screening Date > 30 days`

Only candidates where both the screening date and offer acceptance date are present are evaluated.

**Where it appears:**
- Super Admin → Alerts section
- Recruiter → Alerts section

**Information shown:** Candidate name, designation, recruiter, screening date, offer acceptance date, and total days elapsed.

---

#### 10.5 Time to Fill (TTF) Alert

**What it means:** A requisition took longer than 60 days to find a candidate (from the date the req was raised to the offer acceptance).

**Threshold:** 60 calendar days

**Trigger:** `Offer Acceptance Date − Req Date > 60 days`

Only records where both the req date and offer acceptance date are present are evaluated.

**Where it appears:**
- Super Admin → Alerts section
- HM → Alerts section
- Recruiter → Alerts section

**Information shown:** Candidate name, designation, HM, recruiter, req date, offer acceptance date, and total days elapsed.

---

#### 10.6 The Bell Icon

The bell icon in the sticky header provides a real-time summary of pending alerts.

| Bell state | Meaning |
|---|---|
| No badge | No alerts currently active for visible data |
| Blue badge with number | That many alerts are present across all alert types |

**Clicking the bell icon** navigates directly to the Alerts section of the sidebar. All charts and tables switch to the alerts view.

**The bell dropdown** (clicking the chevron on the bell) shows a quick preview of up to the most recent alerts grouped by type — recruiter alerts and panelist alerts — without navigating away from the current section. Clicking a candidate name in the dropdown highlights or scrolls to that candidate.

> **Tip:** Filters affect alerts too. Applying a date range or people filter will reduce (or increase) the number of alerts shown, because alerts are calculated from the same filtered dataset.

---

*End of Part V — Understanding Alerts*

---

## Part VI — Reference & Glossary

---

### 11. Metric Definitions

This section defines every computed metric displayed across the dashboards. All calculations are derived from the underlying candidate records in the data source.

---

#### Pipeline Metrics

| Metric | Definition | Formula |
|---|---|---|
| **Total Candidates** | The total number of candidate records in the current filtered dataset | Count of all records |
| **Screening Cleared** | Candidates who passed the initial screening check | Total − Screening Rejects |
| **Screening Reject** | Candidates who failed the screening check stage | Count where `screeningCheckStatus = 'Not Cleared'` or categorised as Screening Reject |
| **Interview Cleared** | Candidates who passed at least one interview round and were not ultimately rejected | Screening Cleared − Rejected |
| **Offered** | Candidates who received a job offer (Selected) | Count where `dashboardCategory = 'Selected'` |
| **Joined** | Candidates who accepted the offer and joined the organisation | Count where `joiningDate` is present, or `dashboardCategory = 'Joined'` |
| **Rejected** | Candidates who were rejected during any interview round | Count where `dashboardCategory = 'Rejected'` |
| **Pending/Active** | Candidates whose process is still ongoing with no final outcome | Count where `dashboardCategory = 'Pending/Active'` |
| **Screening Rate** | Percentage of total candidates who cleared screening | `(Screening Cleared / Total) × 100` |
| **Interview Success Rate** | Percentage of screened candidates who cleared interviews | `(Interview Cleared / Screening Cleared) × 100` |
| **Overall Conversion Rate** | Percentage of total candidates who were ultimately selected | `(Selected / Total) × 100` |
| **Offer Acceptance Rate** | Percentage of selected candidates who subsequently joined | `(Joined / Selected) × 100` |

---

#### Round-Level Metrics

| Metric | Definition |
|---|---|
| **R1 Cleared** | Candidates who cleared Round 1 (`statusOfR1 = 'Cleared'`) |
| **R1 Not Cleared** | Candidates who did not clear Round 1 |
| **R1 Pending** | Candidates with Round 1 scheduled but result not yet recorded |
| **R1 Pass Rate** | `Cleared R1 / (Cleared R1 + Not Cleared R1) × 100` — excludes pending |
| **R2 / R3 equivalents** | Same logic applied to Round 2 and Round 3 |

---

#### Recruiter Metrics

| Metric | Definition | Formula |
|---|---|---|
| **Candidates Sourced** | Total candidates submitted by the recruiter | Count of records attributed to the recruiter |
| **Screening Cleared** | Of the recruiter's candidates, how many cleared screening | Count where `screeningCheckStatus = 'Cleared'` |
| **Screening Rate** | Percentage of sourced candidates who cleared screening | `(Screening Cleared / Sourced) × 100` |
| **Conversion Rate** | Percentage of sourced candidates ultimately selected | `(Selected / Sourced) × 100` |
| **Avg Sourcing to Screening** | Average elapsed time between a candidate's sourcing date and their screening date | Mean of `(screeningDate − sourcingDate)` in hours, across all candidates with both dates |

---

#### Panelist Metrics

| Metric | Definition | Formula |
|---|---|---|
| **Total Interviews** | Total number of interviews conducted by the panelist across R1, R2, and R3 | Count of all interview records for the panelist |
| **Passed** | Count of interviews where the candidate cleared | Count where interview `status = 'Cleared'` |
| **Failed** | Count of interviews where the candidate did not clear | Count where interview `status = 'Not Cleared'` |
| **Pending** | Interviews where a result has not yet been recorded | Count where status is empty or pending |
| **Pass Rate** | Overall pass rate for the panelist | `Passed / (Passed + Failed) × 100` — excludes pending |
| **Avg Feedback Time** | Average time from interview date to the date feedback was recorded | Mean of `(feedbackDate − interviewDate)` in hours, across all interviews where both dates are present and the difference is ≥ 0 |
| **Alert Count** | Count of interviews where feedback is pending or took >48 hours | Count where `isAlert = true` OR `isPendingFeedback = true` |

---

#### Requisition Metrics

A **Requisition (Req)** is a unique hiring request identified by the combination of Req Date + Designation + HM.

| Metric | Definition |
|---|---|
| **Total Reqs** | Count of unique requisitions in the dataset |
| **Open Reqs** | Requisitions where remaining openings > 0 (not fully filled) |
| **Closed Reqs** | Requisitions where remaining openings = 0 (fully filled) |
| **Total Openings** | Sum of `noOfOpenings` across all requisitions |
| **Total Joined** | Sum of candidates who have joined against each requisition |
| **Total Remaining** | Total Openings − Total Joined |

---

#### Time-Based Thresholds

| Threshold | Value | Applies to |
|---|---|---|
| Sourcing-to-Screening SLA | 48 hours | Recruiters |
| Panelist Feedback SLA | 48 hours | Panelists |
| Time to Hire (TTH) target | 30 days | All roles |
| Time to Fill (TTF) target | 60 days | All roles |
| Avg Feedback colours | ≤ 24 h → green · ≤ 48 h → amber · > 48 h → red | Panelist feedback time cards |

---

### 12. Dashboard Category Definitions

Every candidate record is automatically categorised into one of six **Dashboard Categories** based on the data in the Status and Final Status fields.

| Category | What it means | How it is determined |
|---|---|---|
| **Joined** | The candidate has formally joined the organisation | A Joining Date is present in the record |
| **Selected** | The candidate received and accepted an offer but has not yet joined | `finalStatus = 'Selected'` or `status = 'Selected'` and no joining date |
| **Rejected** | The candidate was rejected at an interview round | `finalStatus = 'Rejected'` or status contains "rejected", with a reject round recorded (R1/R2/R3) |
| **Screening Reject** | The candidate was rejected before reaching any interview round | `status = 'Screening Reject'` or rejected with no round information |
| **Pending/Active** | The candidate is still in process — interview scheduled or awaiting a decision | Status indicates "in process", "pending", "on hold", or "scheduled" |
| **Other** | Records that do not fit cleanly into any of the above | Default fallback for unrecognised status values |

> **Priority order for categorisation:** Joined → Selected → Rejected → Screening Reject → Pending/Active → Other. The system checks each condition in this order and assigns the first match.

---

#### Reject Round

When a candidate is categorised as **Rejected**, the system also records which round they were rejected in:

| Value | Meaning |
|---|---|
| **R1** | Rejected at Round 1 (`statusOfR1 = 'Not Cleared'`) |
| **R2** | Rejected at Round 2 (`statusOfR2 = 'Not Cleared'`) |
| **R3** | Rejected at Round 3 (`statusOfR3 = 'Not Cleared'`) |
| *(blank)* | Round could not be determined |

---

#### Source Normalisation

Candidate source values from the raw data are normalised before display:

| Raw value | Displayed as |
|---|---|
| Walk-In / Walkin / Walk In | Walk-In |
| Employee Referral / Referral | Referral |
| LinkedIn (in sub-source) | Job Site → LinkedIn |
| Unknown + sub-source of "Direct" | Walk-In → Direct |

---

### 13. Frequently Asked Questions

**Q: My dashboard shows no data. What should I check?**  
A: First check whether any filters are active — look for the badge count on the funnel icon and active filter badges below the header. Click **Clear All** to remove all filters. If no data appears after clearing, your user account may not have any candidate records associated with it yet.

---

**Q: Why is the alert count on the bell icon different from the number of alerts shown inside the Alerts section?**  
A: The bell icon badge reflects the combined count of recruiter alerts and panelist alerts. The Alerts section may also include TTH and TTF alerts, Splitting these makes the sections easier to act on.

---

**Q: I clicked a bar in the pipeline chart but nothing happened.**  
A: The bar chart drill-through is available on the Super Admin, Hiring Manager, and Recruiter dashboards when data is present. If the bar's value is 0 (no candidates at that stage), the click still navigates to Candidate Details but the table will be empty because there are no matching records.

---

**Q: What is the difference between "Selected" and "Joined"?**  
A: **Selected** means an offer has been extended and accepted (offer acceptance date is recorded), but the candidate's joining date has not yet been entered. **Joined** means a joining date is present — the candidate has actually started working.

---

**Q: What does "Avg Feedback Time" measure exactly?**  
A: It measures the time elapsed between the date an interview was conducted and the date the panelist's feedback was recorded in the system. Lower is better — the target is under 48 hours. If no feedback date is recorded at all, that interview is counted as "Pending" and flagged as an alert, but it is excluded from the average calculation.

---

**Q: Why does my pass rate look low even though most of my candidates passed?**  
A: Pass rate is calculated only from completed interviews — that is, interviews with a status of either "Cleared" or "Not Cleared". Interviews that are still "Pending" are excluded from the denominator. If many interviews are still pending, the pass rate reflects only the completed portion.

---

**Q: Can I export the data or download a report?**  
A: Export functionality is not available in the current version of the platform. All insights are available on-screen and can be captured via browser print or screenshot tools.

---

**Q: How often is the data refreshed?**  
A: The platform reads from the source data file on each page load. There is no live auto-refresh within a session — reload the page to see the latest data.

---

**Q: I am a Hiring Manager but I also conduct interviews as a panelist. Will my panelist alerts appear?**  
A: Yes. The HM dashboard's Alerts section splits alerts into **Personal Alerts** (where you are the panelist) and **Team Alerts** (where other panelists in your team have pending feedback). Your own pending feedback items appear in the Personal Alerts (blue) panel.

---

**Q: Who should I contact if a candidate's data looks incorrect?**  
A: Data is sourced from the central TA Tracker spreadsheet. Contact your data administrator or HR operations team to correct records at the source — changes will appear in the dashboard on the next page load.

---

*End of Part VI — Reference & Glossary*

---

*End of HR Analytics Platform — User Guide*

> This document covers platform version as of February 2026. For questions or feedback on this guide, contact your HR Analytics system administrator.
