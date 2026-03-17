-- =====================================================
-- COMPREHENSIVE SECURITY FIX: Secure Views & Functions
-- =====================================================

-- 1. Create secure view for healthcare professional profiles
-- Excludes: dea_number, license_number (extremely sensitive - DEA can be used for prescription fraud)
DROP VIEW IF EXISTS public.healthcare_profiles_safe;
CREATE VIEW public.healthcare_profiles_safe 
WITH (security_invoker = true)
AS
SELECT 
  id,
  user_id,
  license_type,
  medical_specialty,
  hospital_affiliation,
  years_in_practice,
  created_at,
  updated_at
FROM public.healthcare_professional_profiles;

COMMENT ON VIEW public.healthcare_profiles_safe IS 'Secure view of healthcare professional profiles excluding sensitive credentials (DEA number, license number). Uses security_invoker to respect RLS policies.';

-- 2. Create secure view for senior client profiles
-- Excludes: emergency_contact_name, emergency_contact_phone, medical_conditions
DROP VIEW IF EXISTS public.senior_profiles_safe;
CREATE VIEW public.senior_profiles_safe 
WITH (security_invoker = true)
AS
SELECT 
  id,
  user_id,
  relationship,
  preferred_language,
  created_at,
  updated_at
FROM public.senior_client_profiles;

COMMENT ON VIEW public.senior_profiles_safe IS 'Secure view of senior client profiles excluding sensitive emergency contact and medical information. Uses security_invoker to respect RLS policies.';

-- 3. Create function to access sensitive healthcare data (with logging)
CREATE OR REPLACE FUNCTION public.get_healthcare_sensitive_data(target_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  result jsonb;
  is_admin boolean;
BEGIN
  -- Check if user is admin
  SELECT EXISTS(
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  ) INTO is_admin;

  -- Only allow own data or admin access
  IF NOT (auth.uid() = target_user_id OR is_admin) THEN
    RAISE EXCEPTION 'Access denied to sensitive healthcare data';
  END IF;
  
  -- Log the sensitive data access
  INSERT INTO activity_log (user_id, action, entity_type, entity_id, details)
  VALUES (
    auth.uid(),
    'VIEW_SENSITIVE_HEALTHCARE',
    'healthcare_professional_profiles',
    target_user_id::text,
    jsonb_build_object(
      'accessed_by', auth.uid()::text,
      'target_user', target_user_id::text,
      'timestamp', now()
    )
  );
  
  SELECT jsonb_build_object(
    'dea_number', dea_number,
    'license_number', license_number
  ) INTO result
  FROM healthcare_professional_profiles
  WHERE user_id = target_user_id;
  
  RETURN COALESCE(result, '{}'::jsonb);
END;
$$;

COMMENT ON FUNCTION public.get_healthcare_sensitive_data IS 'Securely retrieves sensitive healthcare credentials (DEA, license number) with audit logging. Only accessible by data owner or admin.';

-- 4. Create function to access sensitive senior profile data (with logging)
CREATE OR REPLACE FUNCTION public.get_senior_sensitive_data(target_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  result jsonb;
  is_admin boolean;
BEGIN
  -- Check if user is admin
  SELECT EXISTS(
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  ) INTO is_admin;

  -- Only allow own data or admin access
  IF NOT (auth.uid() = target_user_id OR is_admin) THEN
    RAISE EXCEPTION 'Access denied to sensitive senior profile data';
  END IF;
  
  -- Log the sensitive data access
  INSERT INTO activity_log (user_id, action, entity_type, entity_id, details)
  VALUES (
    auth.uid(),
    'VIEW_SENSITIVE_SENIOR',
    'senior_client_profiles',
    target_user_id::text,
    jsonb_build_object(
      'accessed_by', auth.uid()::text,
      'target_user', target_user_id::text,
      'timestamp', now()
    )
  );
  
  SELECT jsonb_build_object(
    'emergency_contact_name', emergency_contact_name,
    'emergency_contact_phone', emergency_contact_phone,
    'medical_conditions', medical_conditions
  ) INTO result
  FROM senior_client_profiles
  WHERE user_id = target_user_id;
  
  RETURN COALESCE(result, '{}'::jsonb);
END;
$$;

COMMENT ON FUNCTION public.get_senior_sensitive_data IS 'Securely retrieves sensitive senior profile data (emergency contacts, medical conditions) with audit logging. Only accessible by data owner or admin.';

-- 5. Add DELETE restriction policies for healthcare profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'healthcare_professional_profiles' 
    AND policyname = 'Only admins can delete healthcare profiles'
  ) THEN
    CREATE POLICY "Only admins can delete healthcare profiles" 
    ON public.healthcare_professional_profiles 
    FOR DELETE 
    TO authenticated 
    USING (
      EXISTS(
        SELECT 1 FROM user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin'
      )
    );
  END IF;
END $$;

-- 6. Add DELETE restriction policies for senior client profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'senior_client_profiles' 
    AND policyname = 'Only admins can delete senior profiles'
  ) THEN
    CREATE POLICY "Only admins can delete senior profiles" 
    ON public.senior_client_profiles 
    FOR DELETE 
    TO authenticated 
    USING (
      EXISTS(
        SELECT 1 FROM user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin'
      )
    );
  END IF;
END $$;

-- 7. Add DELETE restriction policies for caregiver profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'caregiver_profiles' 
    AND policyname = 'Only admins can delete caregiver profiles'
  ) THEN
    CREATE POLICY "Only admins can delete caregiver profiles" 
    ON public.caregiver_profiles 
    FOR DELETE 
    TO authenticated 
    USING (
      EXISTS(
        SELECT 1 FROM user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin'
      )
    );
  END IF;
END $$;

-- 8. Grant access to secure views
GRANT SELECT ON public.healthcare_profiles_safe TO authenticated;
GRANT SELECT ON public.senior_profiles_safe TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_healthcare_sensitive_data TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_senior_sensitive_data TO authenticated;