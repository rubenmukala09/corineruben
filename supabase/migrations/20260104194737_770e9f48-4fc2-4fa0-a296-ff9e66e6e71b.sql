-- =====================================================
-- PHASE 1: Secure Profile Data Access
-- =====================================================

-- Create a secure limited view for profiles (non-sensitive fields only)
CREATE OR REPLACE VIEW public.profiles_safe AS
SELECT 
  id,
  username,
  first_name,
  last_name,
  email,
  department,
  position,
  profile_photo_url,
  account_status,
  created_at,
  updated_at
FROM public.profiles;

-- Grant access to the view
GRANT SELECT ON public.profiles_safe TO authenticated;

-- Create a security definer function for controlled sensitive data access with logging
CREATE OR REPLACE FUNCTION public.get_profile_sensitive_data(target_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  -- Only allow own data or admin access
  IF NOT (auth.uid() = target_user_id OR has_role(auth.uid(), 'admin')) THEN
    RAISE EXCEPTION 'Access denied to sensitive profile data';
  END IF;
  
  -- Log the sensitive data access
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
    'phone', phone,
    'date_of_birth', date_of_birth,
    'address_street', address_street,
    'address_city', address_city,
    'address_state', address_state,
    'address_zip', address_zip,
    'last_login_ip', last_login_ip
  ) INTO result
  FROM profiles
  WHERE id = target_user_id;
  
  RETURN result;
END;
$$;

-- =====================================================
-- PHASE 2: Restrict Contact Access by Role Hierarchy
-- =====================================================

-- Drop existing overly permissive policies on contacts
DROP POLICY IF EXISTS "Authenticated staff can manage contacts" ON contacts;
DROP POLICY IF EXISTS "Authenticated staff can view contacts" ON contacts;
DROP POLICY IF EXISTS "Authorized staff can view contacts" ON contacts;
DROP POLICY IF EXISTS "Admins can view all contacts" ON contacts;
DROP POLICY IF EXISTS "Admins can manage contacts" ON contacts;

-- Create new tiered policies for contacts

-- Admins have full CRUD access
CREATE POLICY "Admins full access to contacts"
ON contacts FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Secretary can view all contacts (CRM purposes)
CREATE POLICY "Secretary can view contacts"
ON contacts FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'secretary'));

-- Secretary can insert new contacts
CREATE POLICY "Secretary can insert contacts"
ON contacts FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'secretary'));

-- Secretary can update contacts
CREATE POLICY "Secretary can update contacts"
ON contacts FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'secretary'))
WITH CHECK (has_role(auth.uid(), 'secretary'));

-- Business consultants have read-only access
CREATE POLICY "Business consultant view contacts"
ON contacts FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'business_consultant'));

-- Support specialists have read-only access for ticket context
CREATE POLICY "Support specialist view contacts"
ON contacts FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'support_specialist'));

-- =====================================================
-- PHASE 3: Implement Audit Logging for Contacts
-- =====================================================

-- Create trigger function for contact access logging
CREATE OR REPLACE FUNCTION public.log_contact_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.activity_log (
    action,
    entity_type,
    entity_id,
    user_id,
    details
  ) VALUES (
    TG_OP,
    'contacts',
    COALESCE(NEW.id, OLD.id)::text,
    auth.uid(),
    jsonb_build_object(
      'timestamp', NOW(),
      'operation', TG_OP,
      'contact_email', CASE 
        WHEN TG_OP = 'DELETE' THEN OLD.email
        ELSE NEW.email
      END,
      'contact_name', CASE
        WHEN TG_OP = 'DELETE' THEN OLD.first_name || ' ' || OLD.last_name
        ELSE NEW.first_name || ' ' || NEW.last_name
      END,
      'accessed_by', auth.uid()::text
    )
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Drop existing trigger if exists and create new one
DROP TRIGGER IF EXISTS contacts_audit_trigger ON contacts;

CREATE TRIGGER contacts_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON contacts
FOR EACH ROW EXECUTE FUNCTION log_contact_access();

-- Create function to detect suspicious bulk access patterns
CREATE OR REPLACE FUNCTION public.check_contact_bulk_access()
RETURNS TABLE (
  user_id uuid,
  access_count bigint,
  window_minutes integer,
  is_suspicious boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    al.user_id,
    COUNT(*)::bigint as access_count,
    5 as window_minutes,
    (COUNT(*) > 50) as is_suspicious
  FROM activity_log al
  WHERE al.entity_type = 'contacts'
    AND al.created_at > NOW() - INTERVAL '5 minutes'
  GROUP BY al.user_id
  HAVING COUNT(*) > 10;
END;
$$;