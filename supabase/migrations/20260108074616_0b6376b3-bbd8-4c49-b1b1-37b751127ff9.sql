-- Create user_devices table for device management
CREATE TABLE public.user_devices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  device_name TEXT NOT NULL,
  device_type TEXT NOT NULL CHECK (device_type IN ('mobile', 'desktop', 'tablet', 'iot', 'laptop')),
  status TEXT NOT NULL DEFAULT 'protected' CHECK (status IN ('protected', 'warning', 'at_risk')),
  last_scan TIMESTAMP WITH TIME ZONE DEFAULT now(),
  protection_level INTEGER NOT NULL DEFAULT 100 CHECK (protection_level >= 0 AND protection_level <= 100),
  os_version TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create threat_events table for security incidents
CREATE TABLE public.threat_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id UUID REFERENCES public.user_devices(id) ON DELETE SET NULL,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  threat_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'investigating', 'resolved', 'dismissed')),
  target TEXT,
  description TEXT,
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threat_events ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_devices
CREATE POLICY "Users can view own devices" ON public.user_devices
  FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own devices" ON public.user_devices
  FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update own devices" ON public.user_devices
  FOR UPDATE USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete own devices" ON public.user_devices
  FOR DELETE USING (auth.uid() = profile_id);

CREATE POLICY "Admins can view all devices" ON public.user_devices
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all devices" ON public.user_devices
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS policies for threat_events
CREATE POLICY "Users can view own threats" ON public.threat_events
  FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Admins can view all threats" ON public.threat_events
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all threats" ON public.threat_events
  FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Trigger to log device actions
CREATE OR REPLACE FUNCTION public.log_device_action()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.activity_log (
    action,
    entity_type,
    entity_id,
    user_id,
    details
  ) VALUES (
    TG_OP,
    'user_devices',
    COALESCE(NEW.id, OLD.id)::text,
    auth.uid(),
    jsonb_build_object(
      'device_name', COALESCE(NEW.device_name, OLD.device_name),
      'device_type', COALESCE(NEW.device_type, OLD.device_type),
      'status', COALESCE(NEW.status, OLD.status),
      'operation', TG_OP
    )
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER log_device_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.user_devices
  FOR EACH ROW EXECUTE FUNCTION public.log_device_action();

-- Trigger to log threat actions
CREATE OR REPLACE FUNCTION public.log_threat_action()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.activity_log (
    action,
    entity_type,
    entity_id,
    user_id,
    details
  ) VALUES (
    TG_OP,
    'threat_events',
    COALESCE(NEW.id, OLD.id)::text,
    auth.uid(),
    jsonb_build_object(
      'threat_type', COALESCE(NEW.threat_type, OLD.threat_type),
      'severity', COALESCE(NEW.severity, OLD.severity),
      'status', COALESCE(NEW.status, OLD.status),
      'operation', TG_OP
    )
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER log_threat_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.threat_events
  FOR EACH ROW EXECUTE FUNCTION public.log_threat_action();

-- Updated_at triggers
CREATE TRIGGER update_user_devices_updated_at
  BEFORE UPDATE ON public.user_devices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_threat_events_updated_at
  BEFORE UPDATE ON public.threat_events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();