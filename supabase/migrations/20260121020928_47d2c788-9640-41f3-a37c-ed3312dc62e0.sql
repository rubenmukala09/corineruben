-- Drop existing view first to recreate with correct columns
DROP VIEW IF EXISTS public.testimonials_public;

-- Create a view that excludes email for public access
CREATE VIEW public.testimonials_public
WITH (security_invoker = on) AS
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

-- Grant access to the public view
GRANT SELECT ON public.testimonials_public TO anon, authenticated;

-- Drop any overly permissive policies on testimonials
DROP POLICY IF EXISTS "Anyone can view approved testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Public can view approved testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow public read access" ON public.testimonials;
DROP POLICY IF EXISTS "Testimonials are publicly readable" ON public.testimonials;
DROP POLICY IF EXISTS "Public can view approved testimonials without email" ON public.testimonials;
DROP POLICY IF EXISTS "Staff can view all testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Anyone can submit testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Staff can update testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Staff can delete testimonials" ON public.testimonials;

-- Create secure policy: Only authenticated users (staff) can access full testimonials table with emails
CREATE POLICY "Staff can view all testimonials"
ON public.testimonials
FOR SELECT
TO authenticated
USING (true);

-- Public can submit testimonials (for testimonial forms)
CREATE POLICY "Anyone can submit testimonials"
ON public.testimonials
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Staff can update testimonials"
ON public.testimonials
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Staff can delete testimonials"
ON public.testimonials
FOR DELETE
TO authenticated
USING (true);