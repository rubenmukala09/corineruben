
# Comprehensive Fix Plan: InVision Network

## Executive Summary
This plan addresses all identified issues from the deep scan, organized into 5 phases by priority. The total effort spans approximately 40-50 development hours.

---

## Phase 1: Security Fixes (Critical Priority)

### 1.1 RLS Policy Audit and Fixes
**Issue:** 21 RLS policies use `WITH CHECK (true)` allowing unrestricted INSERT operations.

**Tables Requiring Attention:**
- `donations` - Allows public insert (intentional for donations form)
- `booking_requests` - Allows public insert (intentional for booking form)
- `job_applications` - Allows public insert (intentional for careers page)
- `newsletter_subscribers` - Allows public insert (intentional for newsletter signup)
- `testimonials` - Allows public insert (intentional for testimonial form)
- `scam_submissions` - Allows public insert (intentional for scam analysis)
- `website_inquiries` - Allows public insert (intentional for contact form)

**Decision Required:**
Most of these are **intentionally public** for form submissions. However, we need to:

1. **Restrict SELECT to admin/staff only** (already done for most)
2. **Block UPDATE/DELETE from public** 
3. **Add rate limiting consideration** for public forms

**Migration to Create:**
```sql
-- Ensure UPDATE/DELETE are restricted (most should already be)
-- Verify no "WITH CHECK (true)" on UPDATE/DELETE operations
-- Keep INSERT public for form submissions but document why
```

### 1.2 Donor Privacy Protection
**Issue:** Staff can view all donor information including emails and amounts.

**Fix:**
- Create a `donations_summary` view that masks email addresses
- Restrict raw donations access to admin-only
- Add audit logging for donations access

### 1.3 Testimonial Email Protection
**Issue:** Testimonial submitter emails accessible to staff.

**Fix:**
- Create `testimonials_public` view (already exists) without emails
- Ensure raw testimonials table only accessible to admins

---

## Phase 2: Dynamic Content System (High Priority)

### 2.1 Connect Articles Page to Database
**Current State:** 
- 6 hardcoded articles in `Articles.tsx` (678 lines)
- Database `articles` table exists with 4 articles

**Fix:**
1. Create `useArticles` hook to fetch from database
2. Refactor `Articles.tsx` to use dynamic data
3. Add pagination support
4. Create article detail page `/articles/:slug`
5. Migrate hardcoded content to database

**New Files:**
- `src/hooks/useArticles.ts`
- `src/pages/ArticleDetail.tsx`

**Modified Files:**
- `src/pages/Articles.tsx` - Replace hardcoded array with database fetch
- `src/App.tsx` - Add route for article detail

### 2.2 Course Enrollment System
**Current State:**
- `courses` table has 4 courses (Scam Prevention 101, Voice Cloning, Family Protection, Business Essentials)
- `enrollments` table exists but is empty
- No user-facing enrollment UI

**Fix:**
1. Create course catalog component
2. Add enrollment button with payment integration (for paid courses)
3. Create user's enrolled courses view in portal
4. Track progress in enrollments table

**New Files:**
- `src/components/courses/CourseCatalog.tsx`
- `src/components/courses/CourseCard.tsx`
- `src/components/courses/EnrollmentButton.tsx`
- `src/pages/portal/MyCourses.tsx`

**Database Changes:**
- Add `profile_id` column to `enrollments` table (currently uses `contact_id`)
- Add `progress_percentage` column

---

## Phase 3: Real Dashboard Metrics (Medium Priority)

### 3.1 Senior Dashboard Real Data
**Current State:** `ProtectionStatusHero.tsx`, `ThreatActivityTimeline.tsx`, `TrainingProgressCard.tsx` all use hardcoded mock data.

**Fix:**
1. Create `useDashboardMetrics` hook
2. Fetch real threat events from `threat_events` table
3. Calculate real training progress from `enrollments` table
4. Track real "threats blocked" (or show "0 - Protection Active" if no threats)

**Modified Files:**
- `src/components/dashboard/ProtectionStatusHero.tsx` - Accept real data props
- `src/components/dashboard/ThreatActivityTimeline.tsx` - Fetch from `threat_events`
- `src/components/dashboard/TrainingProgressCard.tsx` - Fetch from `enrollments`
- `src/pages/portal/SeniorDashboard.tsx` - Wire up real data

### 3.2 Business Dashboard Real Data
**Current State:** `AutomationStatusHero.tsx`, `BusinessMetricsGrid.tsx` use fake metrics:
- "Tasks Automated: 1,247" (fake)
- "Hours Saved: 156" (fake)
- "Revenue Saved: $12,450" (fake)

**Fix Options:**
1. **Option A:** Show "Getting Started" state until real automations are configured
2. **Option B:** Track actual automation usage via analytics
3. **Option C:** Replace with real subscription/service metrics

**Recommended Approach:**
- Show subscription status prominently
- Display actual service usage (if any automation events are logged)
- Remove fake numbers, show educational content about what the automation will do

---

## Phase 4: Booking & Email System (Medium Priority)

### 4.1 Complete Booking Flow
**Current State:**
- 5 pending booking requests in database
- No confirmation UI for users
- No staff calendar management
- No status update notifications

**Fix:**
1. Add booking status to user portal
2. Create staff booking management view
3. Send confirmation emails when status changes
4. Add calendar integration (optional)

**New Files:**
- `src/pages/portal/MyBookings.tsx`
- `src/components/BookingStatusCard.tsx`

### 4.2 Unify Email Templates
**Current State:**
- Database has 7 email templates
- 7+ edge functions have hardcoded HTML emails
- Inconsistent email styling

**Edge Functions with Hardcoded Emails:**
- `send-testimonial-thankyou`
- `heartbeat-watchdog`
- `send-digital-download`
- `send-password-reset`
- `security-alert`
- `process-payment`
- `send-welcome-email`

**Fix:**
1. Create database templates for each email type
2. Create shared email rendering utility
3. Update edge functions to use database templates
4. Ensure consistent branding across all emails

---

## Phase 5: Admin Polish (Low Priority)

### 5.1 Replace Placeholder Data
**Current State:** Admin client tabs use placeholder data:
- `ClientNotesTab.tsx` - Static notes array
- `ClientMessagesTab.tsx` - Static messages
- `ClientBillingTab.tsx` - Placeholder invoices
- `ClientPortalAccessTab.tsx` - Fake login data

**Fix:**
1. Connect to real database tables
2. Create missing tables if needed (client_notes, client_messages)
3. Wire up Stripe for billing data
4. Track real login activity

### 5.2 Scam Analysis Results UI
**Current State:**
- `scam_submissions` table accepts submissions
- `analyze-scam` edge function exists
- No UI to display analysis results to users

**Fix:**
1. Create scam submission results page
2. Show AI analysis outcome
3. Store results in database
4. Allow sharing/reporting

---

## Implementation Order

### Week 1: Security & Articles
| Task | Effort | Priority |
|------|--------|----------|
| Audit RLS policies, document intentional ones | 2h | P0 |
| Create donor privacy view | 1h | P0 |
| Create `useArticles` hook | 2h | P1 |
| Refactor Articles.tsx to use database | 3h | P1 |
| Create ArticleDetail page | 2h | P1 |
| Migrate hardcoded articles to database | 1h | P1 |

### Week 2: Courses & Real Metrics
| Task | Effort | Priority |
|------|--------|----------|
| Update enrollments table schema | 1h | P1 |
| Create CourseCatalog component | 3h | P1 |
| Add enrollment flow with payment | 4h | P1 |
| Create MyCourses portal page | 2h | P1 |
| Replace fake dashboard metrics | 4h | P2 |

### Week 3: Booking & Emails
| Task | Effort | Priority |
|------|--------|----------|
| Create MyBookings portal page | 2h | P2 |
| Add booking status notifications | 3h | P2 |
| Create email template utility | 2h | P2 |
| Update 7 edge functions to use templates | 4h | P2 |

### Week 4: Admin Polish
| Task | Effort | Priority |
|------|--------|----------|
| Wire up client tabs to real data | 6h | P3 |
| Create scam analysis results UI | 3h | P3 |
| Final testing and polish | 4h | P3 |

---

## Technical Details

### Database Migrations Needed

```text
1. Add profile_id to enrollments (or create alias)
2. Add progress tracking to enrollments
3. Create donations_admin_view with full data
4. Create donations_summary view with masked emails
5. Add audit triggers for sensitive data access
```

### New Hooks to Create

```text
- useArticles() - Fetch and paginate articles
- useCourses() - Fetch available courses
- useEnrollments() - User's course enrollments
- useBookingRequests() - User's booking status
- useDashboardMetrics() - Aggregated dashboard data
- useThreatEvents() - Real threat activity (if any)
```

### Route Additions

```text
- /articles/:slug - Individual article view
- /portal/my-courses - User's enrolled courses
- /portal/my-bookings - User's booking requests
- /portal/scam-check/:id - Scam analysis results
```

---

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| RLS changes break forms | Test each form after changes |
| Articles migration loses content | Backup hardcoded content first |
| Dashboard shows "0" everywhere | Design graceful empty states |
| Email template changes break sending | Test in staging first |

---

## Success Metrics

After implementation:
- 0 RLS linter warnings (with intentional exceptions documented)
- Articles page loads from database
- Users can enroll in courses
- Dashboards show real or appropriate placeholder data
- Booking status visible to users
- Consistent email branding

