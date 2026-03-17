-- Phase 2: Analytics Dashboard Tables

-- Analytics Events Table
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  session_id TEXT,
  event_name TEXT NOT NULL,
  event_category TEXT,
  event_data JSONB DEFAULT '{}'::jsonb,
  page_url TEXT,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Page Views Table
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  session_id TEXT NOT NULL,
  page_url TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  duration_seconds INTEGER,
  scroll_depth INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User Sessions Table
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT UNIQUE NOT NULL,
  user_id UUID,
  ip_address TEXT,
  user_agent TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  country TEXT,
  city TEXT,
  referrer TEXT,
  landing_page TEXT,
  exit_page TEXT,
  page_views_count INTEGER DEFAULT 0,
  duration_seconds INTEGER DEFAULT 0,
  bounce BOOLEAN DEFAULT false,
  started_at TIMESTAMPTZ DEFAULT now(),
  ended_at TIMESTAMPTZ
);

-- Conversion Events Table
CREATE TABLE IF NOT EXISTS public.conversion_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  session_id TEXT,
  conversion_type TEXT NOT NULL,
  conversion_value NUMERIC,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Traffic Sources Table
CREATE TABLE IF NOT EXISTS public.traffic_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  source TEXT,
  medium TEXT,
  campaign TEXT,
  content TEXT,
  term TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Funnel Steps Table
CREATE TABLE IF NOT EXISTS public.funnel_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  step_name TEXT NOT NULL,
  step_order INTEGER NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traffic_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_steps ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Admins only)
CREATE POLICY "Admins can view analytics events"
  ON public.analytics_events FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view page views"
  ON public.page_views FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view sessions"
  ON public.user_sessions FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view conversions"
  ON public.conversion_events FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view traffic sources"
  ON public.traffic_sources FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view funnel steps"
  ON public.funnel_steps FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for performance
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at DESC);
CREATE INDEX idx_analytics_events_event_name ON public.analytics_events(event_name);
CREATE INDEX idx_analytics_events_session_id ON public.analytics_events(session_id);

CREATE INDEX idx_page_views_created_at ON public.page_views(created_at DESC);
CREATE INDEX idx_page_views_session_id ON public.page_views(session_id);
CREATE INDEX idx_page_views_page_url ON public.page_views(page_url);

CREATE INDEX idx_user_sessions_started_at ON public.user_sessions(started_at DESC);
CREATE INDEX idx_user_sessions_session_id ON public.user_sessions(session_id);

CREATE INDEX idx_conversion_events_created_at ON public.conversion_events(created_at DESC);
CREATE INDEX idx_conversion_events_type ON public.conversion_events(conversion_type);

-- Phase 3: Video Testimonials Tables

-- Testimonial Media Table
CREATE TABLE IF NOT EXISTS public.testimonial_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  testimonial_id UUID REFERENCES public.testimonials(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_seconds INTEGER,
  file_size_bytes BIGINT,
  mime_type TEXT,
  width INTEGER,
  height INTEGER,
  processing_status TEXT DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add media columns to testimonials
ALTER TABLE public.testimonials 
ADD COLUMN IF NOT EXISTS has_video BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS has_image BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS primary_media_url TEXT;

-- Enable RLS
ALTER TABLE public.testimonial_media ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view approved testimonial media"
  ON public.testimonial_media FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.testimonials t 
      WHERE t.id = testimonial_media.testimonial_id 
      AND t.status = 'approved'::testimonial_status
    )
  );

CREATE POLICY "Admins can manage testimonial media"
  ON public.testimonial_media FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Update testimonials trigger for media flags
CREATE OR REPLACE FUNCTION public.update_testimonial_media_flags()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.testimonials
  SET 
    has_video = EXISTS (
      SELECT 1 FROM public.testimonial_media 
      WHERE testimonial_id = NEW.testimonial_id 
      AND media_type = 'video'
    ),
    has_image = EXISTS (
      SELECT 1 FROM public.testimonial_media 
      WHERE testimonial_id = NEW.testimonial_id 
      AND media_type = 'image'
    )
  WHERE id = NEW.testimonial_id;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_update_testimonial_media_flags
  AFTER INSERT OR DELETE ON public.testimonial_media
  FOR EACH ROW
  EXECUTE FUNCTION public.update_testimonial_media_flags();