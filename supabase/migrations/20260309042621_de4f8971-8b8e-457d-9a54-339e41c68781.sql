
-- 1. Create separate security audit table
CREATE TABLE public.profile_security_audit (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  failed_login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMPTZ,
  last_login_at TIMESTAMPTZ,
  last_login_ip TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Migrate existing data
INSERT INTO public.profile_security_audit (user_id, failed_login_attempts, locked_until, last_login_at, last_login_ip)
SELECT id, failed_login_attempts, locked_until, last_login_at, last_login_ip
FROM public.profiles
WHERE failed_login_attempts IS NOT NULL 
   OR locked_until IS NOT NULL 
   OR last_login_at IS NOT NULL 
   OR last_login_ip IS NOT NULL;

-- 3. Drop security columns from profiles
ALTER TABLE public.profiles DROP COLUMN IF EXISTS failed_login_attempts;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS locked_until;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS last_login_at;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS last_login_ip;

-- 4. Enable RLS on the new table
ALTER TABLE public.profile_security_audit ENABLE ROW LEVEL SECURITY;

-- 5. Block all anonymous access
CREATE POLICY "Block anon select profile_security_audit"
  ON public.profile_security_audit FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon insert profile_security_audit"
  ON public.profile_security_audit FOR INSERT TO anon WITH CHECK (false);
CREATE POLICY "Block anon update profile_security_audit"
  ON public.profile_security_audit FOR UPDATE TO anon USING (false);
CREATE POLICY "Block anon delete profile_security_audit"
  ON public.profile_security_audit FOR DELETE TO anon USING (false);

-- 6. Admin-only read access
CREATE POLICY "Admins can view security audit"
  ON public.profile_security_audit FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 7. Only system (via security definer functions) can write
CREATE POLICY "Admins can update security audit"
  ON public.profile_security_audit FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert security audit"
  ON public.profile_security_audit FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 8. Update the get_profile_sensitive_data function to exclude security fields
CREATE OR REPLACE FUNCTION public.get_profile_sensitive_data(target_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  result jsonb;
BEGIN
  IF NOT (auth.uid() = target_user_id OR has_role(auth.uid(), 'admin')) THEN
    RAISE EXCEPTION 'Access denied to sensitive profile data';
  END IF;

  INSERT INTO activity_log (user_id, action, entity_type, entity_id, details)
  VALUES (
    auth.uid(),
    'VIEW_SENSITIVE_PROFILE',
    'profiles',
    target_user_id::text,
    jsonb_build_object(
      'accessed_by', auth.uid()::text,
      'target_user', target_user_id::text,
      'timestamp', now()
    )
  );

  SELECT jsonb_build_object(
    'phone', p.phone,
    'date_of_birth', p.date_of_birth,
    'address_street', p.address_street,
    'address_city', p.address_city,
    'address_state', p.address_state,
    'address_zip', p.address_zip
  ) INTO result
  FROM profiles p
  WHERE p.id = target_user_id;

  RETURN result;
END;
$$;

-- 9. Create a new function for admin-only security audit access
CREATE OR REPLACE FUNCTION public.get_profile_security_audit(target_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  result jsonb;
BEGIN
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: admin only';
  END IF;

  INSERT INTO activity_log (user_id, action, entity_type, entity_id, details)
  VALUES (
    auth.uid(),
    'VIEW_SECURITY_AUDIT',
    'profile_security_audit',
    target_user_id::text,
    jsonb_build_object(
      'accessed_by', auth.uid()::text,
      'target_user', target_user_id::text,
      'timestamp', now()
    )
  );

  SELECT jsonb_build_object(
    'failed_login_attempts', s.failed_login_attempts,
    'locked_until', s.locked_until,
    'last_login_at', s.last_login_at,
    'last_login_ip', s.last_login_ip
  ) INTO result
  FROM profile_security_audit s
  WHERE s.user_id = target_user_id;

  RETURN COALESCE(result, '{}'::jsonb);
END;
$$;

-- 10. Add updated_at trigger
CREATE TRIGGER update_profile_security_audit_updated_at
  BEFORE UPDATE ON public.profile_security_audit
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
