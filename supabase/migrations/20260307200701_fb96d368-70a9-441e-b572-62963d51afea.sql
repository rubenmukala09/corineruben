
-- Storage bucket for site images
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true);

-- RLS policies for site-images bucket
CREATE POLICY "Anyone can view site images"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-images');

CREATE POLICY "Authenticated users can upload site images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'site-images');

CREATE POLICY "Authenticated users can delete site images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'site-images');

-- Site images table to track metadata
CREATE TABLE public.site_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL, -- homepage_hero, homepage_gallery, story_gallery, story_timeline, rsvp, faith
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site images metadata"
ON public.site_images FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert site images metadata"
ON public.site_images FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete site images metadata"
ON public.site_images FOR DELETE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update site images metadata"
ON public.site_images FOR UPDATE
TO authenticated
USING (true);

-- Story events table (replaces hardcoded timeline)
CREATE TABLE public.story_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_fr TEXT,
  title_es TEXT,
  description TEXT NOT NULL,
  description_fr TEXT,
  description_es TEXT,
  date_label TEXT NOT NULL,
  date_label_fr TEXT,
  date_label_es TEXT,
  icon TEXT NOT NULL DEFAULT '💫',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.story_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view story events"
ON public.story_events FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert story events"
ON public.story_events FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update story events"
ON public.story_events FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete story events"
ON public.story_events FOR DELETE
TO authenticated
USING (true);
