-- Fix the security definer view warning by using security_invoker
-- This ensures RLS policies of the querying user are applied

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

-- Grant access to the view
GRANT SELECT ON public.profiles_safe TO authenticated;