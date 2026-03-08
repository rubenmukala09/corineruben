

# Dashboard Consolidation Plan: 4 Internal Dashboards

## Current Problem
The system has 14+ portal dashboards (Senior, Business, Caregiver, Healthcare, Analyst, Developer, Trainer, Staff, etc.) — most are nearly identical templates showing tasks/events with different titles. Customer-facing dashboards are unnecessary since this is an internal management platform.

## Proposed Architecture: 4 Dashboards

### 1. Admin Command Center (`/admin`) — Already exists
- **Roles**: `admin`
- **Powers**: Full CRUD over everything — approve, delete, manage all modules
- **No changes needed** — this is already comprehensive with 30+ modules

### 2. Secretary / Office Manager Dashboard (`/portal/secretary`)
- **Roles**: `secretary`
- **Powers**: Approve/deny bookings, manage clients (business + individual), handle messages, manage appointments, view service inquiries
- **New build** — a focused dashboard with:
  - Pending bookings queue with approve/deny actions
  - Client overview (quick counts + recent additions)
  - Unread messages panel
  - Service inquiries list
  - Calendar view for appointments
  - Design: Same neon/cyber aesthetic as admin, but scoped to their permissions

### 3. Training Coordinator Dashboard (`/portal/coordinator`)
- **Roles**: `training_coordinator`
- **Powers**: Manage articles, courses, testimonials, knowledge base content; view individual clients for training purposes
- **New build** — focused on content operations:
  - Content stats (articles published, pending testimonials, courses)
  - Recent articles management with quick edit/publish actions
  - Testimonial approval queue
  - Knowledge base overview
  - Design: Matching neon aesthetic

### 4. Staff & Support Dashboard (`/portal/staff`)
- **Roles**: `staff`, `support_specialist`, `moderator`, `business_consultant`
- **Powers**: View clients, view messages, handle support tickets, limited read access
- **Redesign** existing StaffDashboard with:
  - Assigned tasks and upcoming events
  - Support tickets queue (for support_specialist)
  - Client directory (read-only for most)
  - Activity feed
  - Design: Matching neon aesthetic

## Files to Create/Modify

| Action | File | Purpose |
|--------|------|---------|
| **Create** | `src/pages/portal/SecretaryDashboard.tsx` | New secretary-focused dashboard |
| **Create** | `src/pages/portal/CoordinatorDashboard.tsx` | New training coordinator dashboard |
| **Redesign** | `src/pages/portal/StaffDashboard.tsx` | Consolidated staff/support dashboard |
| **Update** | `src/pages/Portal.tsx` | Remove customer roles, show only 4 internal cards |
| **Update** | `src/App.tsx` | Remove customer dashboard routes, add new routes |
| **Update** | `src/contexts/AuthContext.tsx` | Simplify role redirects to 4 paths |
| **Update** | `src/hooks/useUserRole.tsx` | Update redirect mappings |
| **Delete/Remove** | 7 portal dashboards | `AnalystDashboard`, `BusinessDashboard`, `CaregiverDashboard`, `DeveloperDashboard`, `HealthcareDashboard`, `SeniorDashboard`, `TrainerDashboard` |

## Design Approach
All new dashboards will use the existing neon/cyber admin aesthetic (`bg-[#1F2937]`, gradient icons, `shadow-lg` cards) for visual consistency. No framer-motion entrance animations — instant rendering only. Each dashboard will query only the tables relevant to its role's permissions, respecting existing RLS policies.

## Role-to-Dashboard Mapping Summary

```text
admin                → /admin (Command Center)
secretary            → /portal/secretary
training_coordinator → /portal/coordinator
business_consultant  → /portal/staff (consolidated)
support_specialist   → /portal/staff (consolidated)
staff                → /portal/staff (consolidated)
moderator            → /portal/staff (consolidated)
```

