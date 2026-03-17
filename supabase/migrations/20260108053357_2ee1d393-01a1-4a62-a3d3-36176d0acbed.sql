-- Create the system_heartbeats table for monitoring critical services
CREATE TABLE public.system_heartbeats (
  service_name TEXT PRIMARY KEY,
  last_heartbeat TIMESTAMPTZ DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'healthy' CHECK (status IN ('healthy', 'struggling', 'dead')),
  error_log TEXT,
  threshold_minutes INTEGER NOT NULL DEFAULT 10,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.system_heartbeats ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can read heartbeat data
CREATE POLICY "Admins can view system heartbeats"
ON public.system_heartbeats
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Policy: Service role (backend) can do everything - this bypasses RLS by default
-- But we add explicit policy for clarity
CREATE POLICY "Service role has full access"
ON public.system_heartbeats
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create function to update heartbeat (called by edge functions)
CREATE OR REPLACE FUNCTION public.update_service_heartbeat(
  p_service_name TEXT,
  p_status TEXT DEFAULT 'healthy',
  p_error_log TEXT DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.system_heartbeats (service_name, last_heartbeat, status, error_log, updated_at)
  VALUES (p_service_name, now(), p_status, p_error_log, now())
  ON CONFLICT (service_name) 
  DO UPDATE SET 
    last_heartbeat = now(),
    status = p_status,
    error_log = COALESCE(p_error_log, system_heartbeats.error_log),
    updated_at = now();
END;
$$;

-- Create function to check stale heartbeats (called by watchdog)
CREATE OR REPLACE FUNCTION public.check_stale_heartbeats()
RETURNS TABLE(
  service_name TEXT,
  last_heartbeat TIMESTAMPTZ,
  minutes_since_heartbeat INTEGER,
  previous_status TEXT,
  new_status TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH updated AS (
    UPDATE public.system_heartbeats h
    SET 
      status = CASE 
        WHEN EXTRACT(EPOCH FROM (now() - h.last_heartbeat)) / 60 > h.threshold_minutes * 2 THEN 'dead'
        WHEN EXTRACT(EPOCH FROM (now() - h.last_heartbeat)) / 60 > h.threshold_minutes THEN 'struggling'
        ELSE 'healthy'
      END,
      updated_at = now()
    WHERE EXTRACT(EPOCH FROM (now() - h.last_heartbeat)) / 60 > h.threshold_minutes
    RETURNING 
      h.service_name,
      h.last_heartbeat,
      EXTRACT(EPOCH FROM (now() - h.last_heartbeat))::INTEGER / 60 as minutes_since,
      h.status as new_status
  )
  SELECT 
    u.service_name,
    u.last_heartbeat,
    u.minutes_since as minutes_since_heartbeat,
    'healthy'::TEXT as previous_status,
    u.new_status
  FROM updated u;
END;
$$;

-- Insert default monitored services
INSERT INTO public.system_heartbeats (service_name, description, threshold_minutes) VALUES
  ('daily_breach_scan', 'Scans for user data in known breach databases', 60),
  ('scam_feed_update', 'Updates the scam phone/email database', 30),
  ('threat_intel_sync', 'Syncs threat intelligence feeds', 15),
  ('user_alert_dispatcher', 'Sends protection alerts to users', 10)
ON CONFLICT (service_name) DO NOTHING;

-- Add trigger for updated_at
CREATE TRIGGER update_system_heartbeats_updated_at
BEFORE UPDATE ON public.system_heartbeats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();