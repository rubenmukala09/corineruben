-- Fix profiles_safe view with security_invoker = true to respect RLS
DROP VIEW IF EXISTS public.profiles_safe;
CREATE VIEW public.profiles_safe 
WITH (security_invoker = true)
AS
SELECT 
  id,
  username,
  first_name,
  last_name,
  email,
  department,
  position,
  profile_photo_url,
  account_status,
  created_at,
  updated_at
FROM public.profiles;

COMMENT ON VIEW public.profiles_safe IS 'Secure view of profiles excluding sensitive PII like addresses, DOB, phone, and login tracking. Uses security_invoker to respect RLS policies.';

-- Fix profiles_limited view with security_invoker = true
DROP VIEW IF EXISTS public.profiles_limited;
CREATE VIEW public.profiles_limited
WITH (security_invoker = true)
AS
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

COMMENT ON VIEW public.profiles_limited IS 'Limited view of profiles excluding sensitive PII like addresses, DOB, phone, and login tracking data. Use this view for staff who need basic profile info.';