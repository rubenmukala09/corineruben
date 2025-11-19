
-- Fix the log_role_change function to use correct auth_audit_logs columns
CREATE OR REPLACE FUNCTION public.log_role_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  user_email text;
BEGIN
  -- Get user email from profiles or auth.users
  SELECT email INTO user_email
  FROM profiles
  WHERE id = NEW.user_id;

  IF TG_OP = 'INSERT' THEN
    INSERT INTO auth_audit_logs (event_type, email, success, metadata)
    VALUES (
      'role_assignment', 
      user_email,
      true,
      jsonb_build_object(
        'user_id', NEW.user_id::text,
        'role', NEW.role::text,
        'action', 'INSERT'
      )
    );
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO auth_audit_logs (event_type, email, success, metadata)
    VALUES (
      'role_change',
      user_email,
      true,
      jsonb_build_object(
        'user_id', NEW.user_id::text,
        'old_role', OLD.role::text,
        'new_role', NEW.role::text,
        'action', 'UPDATE'
      )
    );
  END IF;
  RETURN NEW;
END;
$$;
