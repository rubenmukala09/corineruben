-- Fix the create_threat_notification trigger - threat_events uses profile_id not user_id
CREATE OR REPLACE FUNCTION public.create_threat_notification()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Only create notifications for high/critical threats that have a profile_id
  IF NEW.severity IN ('critical', 'high') AND NEW.profile_id IS NOT NULL THEN
    INSERT INTO public.notifications (
      user_id,
      title,
      message,
      type,
      related_id
    ) VALUES (
      NEW.profile_id,
      CASE 
        WHEN NEW.severity = 'critical' THEN 'Critical Threat Detected'
        ELSE 'High Priority Threat'
      END,
      NEW.description,
      'system'::notification_type,
      NEW.id::TEXT
    );
  END IF;
  RETURN NEW;
END;
$function$;