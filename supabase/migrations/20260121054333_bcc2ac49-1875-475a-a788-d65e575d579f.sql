-- =====================================================
-- FIX OVERLY PERMISSIVE RLS POLICIES
-- =====================================================

-- =====================================================
-- 1. FIX PROFILES TABLE - Remove USING(true) SELECT policy
-- =====================================================
DROP POLICY IF EXISTS "Allow authenticated users to read profiles" ON public.profiles;

-- Users can only view their own profile (policy already exists, but ensuring it's there)
-- "Authenticated users can view own profile" and "Admins can view all profiles" already exist

-- =====================================================
-- 2. FIX USER_ROLES TABLE - Remove USING(true) SELECT policy
-- =====================================================
DROP POLICY IF EXISTS "Allow authenticated users to read user_roles" ON public.user_roles;

-- Create policy for users to see only their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Admins view all roles policy already exists

-- =====================================================
-- 3. FIX CLIENTS TABLE - Remove USING(true) SELECT policy
-- =====================================================
DROP POLICY IF EXISTS "Allow authenticated users to read clients" ON public.clients;

-- Staff/admin SELECT policy already exists: "Admins and managers can view all clients"

-- =====================================================
-- 4. FIX TESTIMONIALS TABLE - Remove USING(true) SELECT policy
-- =====================================================
DROP POLICY IF EXISTS "Staff can view all testimonials" ON public.testimonials;

-- Proper staff/admin SELECT policy already exists: "Admins can view all testimonials"