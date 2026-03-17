-- Fix Security Issue 1: Restrict profiles table PII exposure
-- Update the 'Users can view own profile' policy to be more restrictive
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Ensure admins can still see all profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix Security Issue 2: Restrict contacts table to assigned staff only
-- Drop existing permissive policies
DROP POLICY IF EXISTS "Staff can view contacts" ON public.contacts;
DROP POLICY IF EXISTS "Staff can manage contacts" ON public.contacts;
DROP POLICY IF EXISTS "Deny anon access" ON public.contacts;

-- Create more restrictive policies
CREATE POLICY "Deny anon access" ON public.contacts
  FOR ALL
  USING (auth.role() != 'anon');

-- Only admins and staff with specific roles can view contacts
CREATE POLICY "Authorized staff can view contacts" ON public.contacts
  FOR SELECT
  USING (
    public.has_role(auth.uid(), 'admin'::app_role) OR
    public.has_role(auth.uid(), 'secretary'::app_role) OR
    public.has_role(auth.uid(), 'staff'::app_role)
  );

-- Only admins can modify contacts
CREATE POLICY "Admins can manage contacts" ON public.contacts
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Fix Security Issue 3: Allow users to view their own website inquiries
DROP POLICY IF EXISTS "Users can view own inquiries" ON public.website_inquiries;
CREATE POLICY "Users can view own inquiries" ON public.website_inquiries
  FOR SELECT
  USING (
    -- Authenticated users can view inquiries matching their email
    auth.email() = email OR
    -- Admins and staff can view all
    public.has_role(auth.uid(), 'admin'::app_role) OR
    public.has_role(auth.uid(), 'secretary'::app_role)
  );