-- Security fixes: Add anonymous access denial and bucket validation

-- 1. Block anonymous access to contacts table
CREATE POLICY "Deny anonymous access to contacts"
ON public.contacts
FOR ALL
TO anon
USING (false);

-- 2. Block anonymous access to healthcare_professional_profiles table
CREATE POLICY "Deny anonymous access to healthcare_professional_profiles"
ON public.healthcare_professional_profiles
FOR ALL
TO anon
USING (false);

-- 3. Drop existing overly permissive storage policies and recreate with bucket validation
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload videos" ON storage.objects;

-- Create bucket-specific upload policies
CREATE POLICY "Authenticated users can upload testimonial images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'testimonial-images');

CREATE POLICY "Authenticated users can upload testimonial videos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'testimonial-videos');

CREATE POLICY "Authenticated users can upload veteran docs"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'veteran-docs');