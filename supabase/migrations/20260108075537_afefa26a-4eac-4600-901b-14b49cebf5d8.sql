-- Create function to auto-create notification on critical/high threat
CREATE OR REPLACE FUNCTION public.create_threat_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.severity IN ('critical', 'high') THEN
    INSERT INTO public.notifications (
      user_id,
      title,
      message,
      type,
      related_id
    ) VALUES (
      NEW.user_id,
      CASE 
        WHEN NEW.severity = 'critical' THEN 'Critical Threat Detected'
        ELSE 'High Priority Threat'
      END,
      NEW.description,
      CASE 
        WHEN NEW.severity = 'critical' THEN 'error'
        ELSE 'warning'
      END,
      NEW.id::TEXT
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_threat_event_created ON public.threat_events;

CREATE TRIGGER on_threat_event_created
AFTER INSERT ON public.threat_events
FOR EACH ROW
EXECUTE FUNCTION public.create_threat_notification();