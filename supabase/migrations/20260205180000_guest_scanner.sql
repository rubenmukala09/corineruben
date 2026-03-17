-- Guest scanner tables and storage policies

CREATE TABLE IF NOT EXISTS public.guest_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  file_path TEXT NOT NULL,
  stripe_payment_id TEXT NOT NULL,
  amount_paid NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  threat_level TEXT,
  analysis_results JSONB,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '10 minutes'),
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_guest_scans_expires ON public.guest_scans(expires_at)
  WHERE deleted_at IS NULL;
CREATE INDEX idx_guest_scans_status ON public.guest_scans(status);

ALTER TABLE public.guest_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view guest scans"
  ON public.guest_scans
  FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- Anonymous scam statistics for community safety
CREATE TABLE IF NOT EXISTS public.scam_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scam_type TEXT NOT NULL,
  threat_level TEXT NOT NULL,
  file_type TEXT NOT NULL,
  detected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  location_city TEXT,
  location_state TEXT
);

CREATE INDEX idx_scam_statistics_detected ON public.scam_statistics(detected_at DESC);

ALTER TABLE public.scam_statistics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view scam statistics"
  ON public.scam_statistics
  FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- Storage bucket for guest scans (500MB limit)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'guest-scans',
  'guest-scans',
  false,
  524288000,
  ARRAY[
    'application/pdf',
    'image/jpeg',
    'image/png',
    'video/mp4',
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'audio/x-wav'
  ]
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Guest scans can upload files"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'guest-scans');
