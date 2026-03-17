-- Create a limited profile view for non-admin staff that excludes sensitive PII
-- This view only shows basic professional information
CREATE VIEW public.profiles_limited 
WITH (security_invoker = true) AS
SELECT 
  id,
  username,
  first_name,
  last_name,
  email,
  position,
  department,
  profile_photo_url,
  account_status,
  created_at
FROM public.profiles;

-- Add comment explaining purpose
COMMENT ON VIEW public.profiles_limited IS 'Limited view of profiles excluding sensitive PII like addresses, DOB, phone, and login tracking data. Use this view for staff who need basic profile info.';

-- Grant select on the limited view to authenticated users
GRANT SELECT ON public.profiles_limited TO authenticated;

-- Revoke direct access to sensitive columns isn't possible, but the RLS policies
-- already restrict access appropriately. The key security measures in place are:
-- 1. Anonymous users are blocked (USING false)
-- 2. Users can only see their own profile
-- 3. Only admins can view all profiles
-- 4. Staff should use profiles_limited view for directory lookups