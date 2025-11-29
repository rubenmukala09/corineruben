# InVision Network Security Model

## Overview
This document outlines the comprehensive security architecture for InVision Network, including authentication, authorization, data protection, and monitoring systems.

---

## Role-Based Access Control (RBAC)

### Role Hierarchy

#### 1. **Admin** (`admin`)
- **Access Level**: Full system access
- **Permissions**:
  - View and manage all users
  - Access all admin dashboards
  - Modify system settings
  - Assign and revoke roles
  - View all client data
  - Manage products, orders, and inventory
  - Access security logs and audit trails
- **Dashboard**: `/portal/admin`
- **Security Level**: Highest

#### 2. **Secretary** (`secretary`)
- **Access Level**: Client management and communications
- **Permissions**:
  - View and manage business clients
  - Access client communications
  - Process bookings and inquiries
  - View newsletters and email campaigns
  - Create and manage client notes
- **Dashboard**: `/admin/clients/businesses`
- **Security Level**: High

#### 3. **Training Coordinator** (`training_coordinator`)
- **Access Level**: Training and course management
- **Permissions**:
  - Manage training programs
  - View training participants
  - Schedule training sessions
  - Access training materials
- **Dashboard**: `/portal/trainer`
- **Security Level**: Medium

#### 4. **Business Consultant** (`business_consultant`)
- **Access Level**: Business client consulting
- **Permissions**:
  - View business client profiles
  - Manage business services
  - Access business analytics
- **Dashboard**: `/admin/clients/businesses`
- **Security Level**: Medium

#### 5. **Support Specialist** (`support_specialist`)
- **Access Level**: Customer support
- **Permissions**:
  - View support tickets
  - Access customer inquiries
  - Manage testimonials
  - View client communications
- **Dashboard**: `/portal/staff`
- **Security Level**: Medium

#### 6. **Senior Client** (`senior`)
- **Access Level**: Personal account only
- **Permissions**:
  - View personal dashboard
  - Manage personal profile
  - Access purchased services
  - View safety vault
- **Dashboard**: `/portal/senior`
- **Security Level**: Low (Own data only)

#### 7. **Caregiver** (`caregiver`)
- **Access Level**: Assigned client data only
- **Permissions**:
  - View assigned clients
  - Manage appointments
  - Submit care reports
- **Dashboard**: `/portal/caregiver`
- **Security Level**: Low (Assigned data only)

#### 8. **Healthcare Professional** (`healthcare`)
- **Access Level**: Healthcare-related data
- **Permissions**:
  - View healthcare clients
  - Access medical information
  - Submit healthcare reports
- **Dashboard**: `/portal/healthcare`
- **Security Level**: Medium (HIPAA considerations)

---

## Row-Level Security (RLS) Policies

### Critical Tables with RLS Enabled

#### 1. **Profiles Table**
- **Public Access**: Read-only (name, avatar)
- **User Access**: Full CRUD on own profile
- **Admin Access**: Full CRUD on all profiles
- **PII Protection**: Email, phone stored separately

#### 2. **User Roles Table**
- **Public Access**: None
- **User Access**: Read-only (own roles)
- **Admin Access**: Full CRUD
- **Critical Function**: `has_role()` security definer function bypasses RLS safely

#### 3. **Clients Table**
- **Public Access**: None
- **User Access**: None (unless assigned)
- **Secretary/Admin Access**: Full CRUD
- **Audit**: All access logged to `activity_log`

#### 4. **Booking Requests**
- **Public Access**: INSERT only (new bookings)
- **User Access**: Read own bookings
- **Admin/Secretary Access**: Full CRUD
- **Security**: No unauthenticated reads

#### 5. **Testimonials**
- **Public Access**: Read via `testimonials_public` view (no emails)
- **User Access**: CRUD own testimonials
- **Admin Access**: Full CRUD
- **Email Protection**: Excluded from public view

#### 6. **Healthcare/Caregiver Profiles**
- **Public Access**: None
- **User Access**: CRUD own profile only
- **Admin Access**: Full CRUD
- **Audit**: Sensitive access logged via trigger

---

## Authentication & Authorization

### Authentication Flow
1. **User Login**: Email/password via Supabase Auth
2. **Email Verification**: Auto-confirm enabled for `@invisionnetwork.org`
3. **Password Reset**: Token-based, 1-hour expiration
4. **Session Management**: JWT tokens, httpOnly cookies

### Authorization Flow
1. **Role Check**: Query `user_roles` table via `has_role()` function
2. **Permission Validation**: Client-side + RLS enforcement
3. **Route Protection**: `ProtectedRoute` and `AdminRoute` components
4. **Dashboard Redirect**: Auto-redirect based on assigned role(s)

### Security Functions

#### `has_role(user_id, role)`
```sql
-- Security definer function (bypasses RLS safely)
-- Returns true if user has specified role
```
**Usage**: In RLS policies to check permissions without recursion

#### `assign_user_role(target_user_id, role, assigned_by)`
```sql
-- Assigns role and logs to audit trail
-- Only callable by admins
```

#### `log_sensitive_access()`
```sql
-- Trigger function for audit logging
-- Attached to: profiles, clients, healthcare_professional_profiles,
--              senior_client_profiles, caregiver_profiles
```

---

## Data Protection Measures

### 1. **PII (Personally Identifiable Information)**
- **Email addresses**: Excluded from public views
- **Phone numbers**: Staff access only
- **Addresses**: RLS-protected
- **SSN/Medical info**: Encrypted at rest

### 2. **Payment Information**
- **Stripe Integration**: No card data stored locally
- **PCI Compliance**: Handled by Stripe
- **Payment logs**: Anonymized IDs only

### 3. **Sensitive Tables Audit Triggers**
Tables with automatic logging:
- `profiles`
- `clients`
- `healthcare_professional_profiles`
- `senior_client_profiles`
- `caregiver_profiles`

---

## Monitoring & Alerts

### Activity Logging
All security-relevant events logged to `activity_log`:
- User logins/logouts
- Role assignments/changes
- Permission denials
- Failed authentication attempts
- Sensitive data access
- Data modifications

### Auth Audit Logging
Authentication events logged to `auth_audit_logs`:
- Login attempts (success/failure)
- Password resets
- Email verifications
- Account locks
- Suspicious patterns

### Suspicious Activity Detection
Automatic alerts triggered for:
- **Multiple failed logins** (>5 in 15 minutes)
- **Privilege escalation attempts**
- **Unauthorized data access attempts**
- **Unusual access patterns** (geography, time, volume)
- **Mass data exports**
- **Role modifications outside business hours**

---

## Security Best Practices

### For Developers
1. ✅ **NEVER** store roles in localStorage/sessionStorage
2. ✅ **ALWAYS** use RLS policies for data access
3. ✅ **ALWAYS** use `security definer` functions to avoid RLS recursion
4. ✅ **VALIDATE** all user inputs server-side (edge functions)
5. ✅ **SANITIZE** all database queries (use parameterized queries)
6. ✅ **LOG** all sensitive operations to audit trail
7. ✅ **ENCRYPT** sensitive data at rest
8. ✅ **USE HTTPS** for all connections
9. ✅ **RATE LIMIT** authentication endpoints
10. ✅ **REVIEW** RLS policies regularly

### For Administrators
1. ✅ **REVIEW** security logs weekly
2. ✅ **AUDIT** user roles monthly
3. ✅ **REVOKE** inactive user access after 90 days
4. ✅ **ENFORCE** strong password policies
5. ✅ **MONITOR** suspicious activity alerts
6. ✅ **BACKUP** database daily (encrypted)
7. ✅ **UPDATE** dependencies monthly
8. ✅ **TEST** disaster recovery quarterly

---

## Incident Response

### Security Incident Procedure
1. **Detect**: Automated monitoring alerts
2. **Assess**: Review logs and determine scope
3. **Contain**: Disable affected accounts/systems
4. **Investigate**: Root cause analysis
5. **Remediate**: Fix vulnerability
6. **Notify**: Inform affected parties if required
7. **Document**: Update incident log
8. **Review**: Post-mortem and prevention measures

### Contact Points
- **Security Team**: security@invisionnetwork.org
- **Admin Team**: admin@invisionnetwork.org
- **Emergency**: (937) 555-SAFE

---

## Compliance

### Standards Adherence
- ✅ **WCAG 2.1 AA**: Accessibility compliance
- ✅ **GDPR**: User data rights (delete, export)
- ✅ **HIPAA**: Healthcare data protection (healthcare module)
- ✅ **PCI DSS**: Payment card security (via Stripe)

### Data Retention
- **Activity logs**: 90 days
- **Auth audit logs**: 1 year
- **User data**: Until account deletion
- **Backups**: 30 days (encrypted)

---

## Vulnerability Disclosure

Found a security issue? Please report responsibly:
1. **Email**: security@invisionnetwork.org
2. **Do NOT** disclose publicly until patched
3. **Include**: Detailed steps to reproduce
4. **Response time**: Within 48 hours

---

**Last Updated**: 2024-01-28  
**Review Cycle**: Quarterly  
**Next Review**: 2024-04-28
