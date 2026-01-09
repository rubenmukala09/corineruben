-- Fix the log_threat_action trigger function - don't cast entity_id to text
CREATE OR REPLACE FUNCTION public.log_threat_action()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
    COALESCE(NEW.id, OLD.id),
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
$function$;

-- Fix the log_device_action trigger function - don't cast entity_id to text
CREATE OR REPLACE FUNCTION public.log_device_action()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
    COALESCE(NEW.id, OLD.id),
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
$function$;