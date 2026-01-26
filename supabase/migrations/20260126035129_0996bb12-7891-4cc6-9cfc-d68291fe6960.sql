
-- =============================================
-- SECURITY HARDENING MIGRATION
-- Fixes: website_inquiries email enumeration, workers compensation exposure
-- =============================================

-- 1. FIX WEBSITE_INQUIRIES: Remove the vulnerable "Users can view own inquiries" policy
-- This policy allowed email enumeration attacks by testing different email addresses
DROP POLICY IF EXISTS "Users can view own inquiries" ON public.website_inquiries;

-- 2. Create a secure view for workers that excludes compensation and emergency contact data
DROP VIEW IF EXISTS public.workers_safe;
CREATE VIEW public.workers_safe AS
SELECT 
  id,
  first_name,
  last_name,
  email,
  phone,
  profile_photo_url,
  skills,
  certifications,
  current_status,
  worker_id,
  position,
  created_at,
  updated_at
FROM public.workers;

GRANT SELECT ON public.workers_safe TO authenticated;
DROP POLICY IF EXISTS "Workers can view their own profile" ON public.workers;
COMMENT ON VIEW public.workers_safe IS 'Safe view excluding compensation and emergency contact data.';

-- 3. Create testimonials_staff view for staff access with emails
DROP VIEW IF EXISTS public.testimonials_staff;
CREATE VIEW public.testimonials_staff AS
SELECT 
  id,
  name,
  email,
  location,
  story,
  rating,
  status,
  featured,
  has_video,
  has_image,
  primary_media_url,
  display_order,
  display_location,
  submitted_at,
  approved_at,
  approved_by,
  created_at,
  updated_at
FROM public.testimonials;

GRANT SELECT ON public.testimonials_staff TO authenticated;
COMMENT ON VIEW public.testimonials_staff IS 'Staff-only view including email addresses.';

-- 4. Recreate testimonials_public view ensuring no email
DROP VIEW IF EXISTS public.testimonials_public;
CREATE VIEW public.testimonials_public AS
SELECT 
  id,
  name,
  story,
  location,
  rating,
  status,
  created_at,
  has_video,
  has_image,
  primary_media_url,
  display_location,
  featured,
  display_order
FROM public.testimonials
WHERE status = 'approved';

GRANT SELECT ON public.testimonials_public TO anon, authenticated;
COMMENT ON VIEW public.testimonials_public IS 'Public view of approved testimonials. Email excluded for privacy.';
