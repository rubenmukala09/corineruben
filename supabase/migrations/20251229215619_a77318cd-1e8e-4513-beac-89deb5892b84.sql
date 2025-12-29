-- Fix security definer view by using security invoker (default)
DROP VIEW IF EXISTS public.testimonials_public;
CREATE VIEW public.testimonials_public 
WITH (security_invoker = true) AS
SELECT 
  id,
  name,
  location,
  rating,
  story,
  created_at,
  has_video,
  has_image,
  primary_media_url
FROM public.testimonials
WHERE status = 'approved';

GRANT SELECT ON public.testimonials_public TO anon, authenticated;