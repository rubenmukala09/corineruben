-- Phase 1: Security Hardening - Tighten RLS Policies for PII-Sensitive Tables

-- 1. Create a safe public view for testimonials (without email)
CREATE OR REPLACE VIEW public.testimonials_public AS
SELECT 
  id,
  name,
  location,
  rating,
  story,
  status,
  submitted_at,
  approved_at,
  featured,
  display_order,
  has_video,
  has_image,
  primary_media_url,
  created_at,
  updated_at
FROM public.testimonials
WHERE status = 'approved';

-- Grant select access to anonymous and authenticated users
GRANT SELECT ON public.testimonials_public TO anon, authenticated;

-- 2. Tighten booking_requests policies - Remove unauthenticated insert
DROP POLICY IF EXISTS "Anyone can create booking requests" ON public.booking_requests;
DROP POLICY IF EXISTS "Users can view their own booking requests" ON public.booking_requests;
DROP POLICY IF EXISTS "Authenticated users can create booking requests" ON public.booking_requests;

CREATE POLICY "Authenticated users can create booking requests"
ON public.booking_requests
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id OR auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own booking requests"
ON public.booking_requests
FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- 3. Tighten purchase_requests policies (if table exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'purchase_requests') THEN
    DROP POLICY IF EXISTS "Anyone can create purchase requests" ON public.purchase_requests;
    DROP POLICY IF EXISTS "Users can view their own purchase requests" ON public.purchase_requests;
    DROP POLICY IF EXISTS "Authenticated users can create purchase requests" ON public.purchase_requests;
    
    EXECUTE 'CREATE POLICY "Authenticated users can create purchase requests"
    ON public.purchase_requests
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id OR auth.uid() IS NOT NULL)';
    
    EXECUTE 'CREATE POLICY "Users can view their own purchase requests"
    ON public.purchase_requests
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id OR has_role(auth.uid(), ''admin'') OR has_role(auth.uid(), ''staff''))';
  END IF;
END $$;

-- 4. Ensure workers table has proper PII protection
DROP POLICY IF EXISTS "Public can view workers" ON public.workers;
DROP POLICY IF EXISTS "Only admins and staff can view workers" ON public.workers;

CREATE POLICY "Only admins and staff can view workers"
ON public.workers
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- 5. Tighten donations policy - remove email from public view
DROP POLICY IF EXISTS "Public can view donations" ON public.donations;
DROP POLICY IF EXISTS "Only admins can view donation details" ON public.donations;

CREATE POLICY "Only admins can view donation details"
ON public.donations
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- 6. Add audit trigger for sensitive table access
CREATE OR REPLACE FUNCTION public.log_sensitive_access()
RETURNS TRIGGER
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
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id)::text,
    auth.uid(),
    jsonb_build_object(
      'timestamp', NOW(),
      'table', TG_TABLE_NAME,
      'operation', TG_OP
    )
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Apply audit trigger to sensitive tables
DROP TRIGGER IF EXISTS audit_profiles_access ON public.profiles;
CREATE TRIGGER audit_profiles_access
  AFTER INSERT OR UPDATE OR DELETE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_access();

DROP TRIGGER IF EXISTS audit_clients_access ON public.clients;
CREATE TRIGGER audit_clients_access
  AFTER INSERT OR UPDATE OR DELETE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_access();

DROP TRIGGER IF EXISTS audit_healthcare_access ON public.healthcare_professional_profiles;
CREATE TRIGGER audit_healthcare_access
  AFTER INSERT OR UPDATE OR DELETE ON public.healthcare_professional_profiles
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_access();

DROP TRIGGER IF EXISTS audit_senior_access ON public.senior_client_profiles;
CREATE TRIGGER audit_senior_access
  AFTER INSERT OR UPDATE OR DELETE ON public.senior_client_profiles
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_access();

DROP TRIGGER IF EXISTS audit_caregiver_access ON public.caregiver_profiles;
CREATE TRIGGER audit_caregiver_access
  AFTER INSERT OR UPDATE OR DELETE ON public.caregiver_profiles
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_access();

-- Add comments for documentation
COMMENT ON VIEW public.testimonials_public IS 'Public-safe view of testimonials without email addresses or other PII';
COMMENT ON FUNCTION public.log_sensitive_access() IS 'Audit trigger for logging access to tables containing PII';