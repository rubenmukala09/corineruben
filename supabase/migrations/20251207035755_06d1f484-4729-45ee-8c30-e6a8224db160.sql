-- Remove the public SELECT policy from testimonials table
-- Public access should go through testimonials_public view which excludes email
DROP POLICY IF EXISTS "Public can view approved testimonials" ON public.testimonials;