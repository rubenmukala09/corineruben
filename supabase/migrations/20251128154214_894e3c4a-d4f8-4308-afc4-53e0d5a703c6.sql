-- Fix security definer view warning by recreating view with security invoker

-- Drop the existing view
DROP VIEW IF EXISTS public.testimonials_public;

-- Recreate view with explicit security invoker and RLS-respecting query
CREATE OR REPLACE VIEW public.testimonials_public
WITH (security_invoker = true) AS
SELECT 
  id,
  name,
  location,
  rating,
  story,
  status,
  submitted_at,
  approved_at,
  featured,
  display_order,
  has_video,
  has_image,
  primary_media_url,
  created_at,
  updated_at
FROM public.testimonials
WHERE status = 'approved';

-- Grant explicit select permissions
GRANT SELECT ON public.testimonials_public TO anon, authenticated;

-- Add helpful comment
COMMENT ON VIEW public.testimonials_public IS 'Public-safe view of approved testimonials without email addresses. Uses security_invoker to respect RLS policies.';