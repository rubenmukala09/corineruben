-- Create storage buckets for testimonials
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('testimonial-videos', 'testimonial-videos', true, 104857600, ARRAY['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm']),
  ('testimonial-images', 'testimonial-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies for testimonial videos
CREATE POLICY "Public can view testimonial videos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'testimonial-videos');

CREATE POLICY "Authenticated users can upload videos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'testimonial-videos' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can manage testimonial videos"
  ON storage.objects FOR ALL
  USING (bucket_id = 'testimonial-videos' AND has_role(auth.uid(), 'admin'::app_role));

-- Storage policies for testimonial images
CREATE POLICY "Public can view testimonial images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'testimonial-images');

CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'testimonial-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can manage testimonial images"
  ON storage.objects FOR ALL
  USING (bucket_id = 'testimonial-images' AND has_role(auth.uid(), 'admin'::app_role));