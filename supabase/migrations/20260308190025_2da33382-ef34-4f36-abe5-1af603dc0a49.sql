
-- 1. Create guestbook table
CREATE TABLE public.guestbook (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  message text NOT NULL,
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved guestbook entries"
  ON public.guestbook FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can insert guestbook entries"
  ON public.guestbook FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update guestbook"
  ON public.guestbook FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete guestbook"
  ON public.guestbook FOR DELETE USING (auth.role() = 'authenticated');

-- 2. Create photos table
CREATE TABLE public.photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  uploader_name text NOT NULL,
  storage_path text NOT NULL,
  public_url text NOT NULL,
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved photos"
  ON public.photos FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can insert photos"
  ON public.photos FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update photos"
  ON public.photos FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete photos"
  ON public.photos FOR DELETE USING (auth.role() = 'authenticated');

-- 3. Create wedding-photos storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('wedding-photos', 'wedding-photos', true);

-- 4. Storage RLS: anyone can upload to wedding-photos
CREATE POLICY "Anyone can upload wedding photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'wedding-photos');

-- 5. Storage RLS: anyone can view wedding photos
CREATE POLICY "Anyone can view wedding photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'wedding-photos');
