-- Fix conflicting RLS policies on healthcare_professional_profiles table
-- Remove the conflicting policy that uses auth.role() != 'anon' pattern
DROP POLICY IF EXISTS "Deny anon access" ON public.healthcare_professional_profiles;

-- Ensure the proper denial policy exists (using TO anon USING (false) pattern)
-- This is the correct, explicit way to deny anonymous access
DROP POLICY IF EXISTS "Deny anonymous access to healthcare_professional_profiles" ON public.healthcare_professional_profiles;
CREATE POLICY "Deny anonymous access to healthcare_professional_profiles"
ON public.healthcare_professional_profiles
AS RESTRICTIVE
FOR ALL
TO anon
USING (false);

-- Ensure existing authenticated user policies are correct
-- Drop and recreate to ensure clean state
DROP POLICY IF EXISTS "Users can view own healthcare profile" ON public.healthcare_professional_profiles;
DROP POLICY IF EXISTS "Users can insert own healthcare profile" ON public.healthcare_professional_profiles;
DROP POLICY IF EXISTS "Users can update own healthcare profile" ON public.healthcare_professional_profiles;
DROP POLICY IF EXISTS "Admins can view all healthcare profiles" ON public.healthcare_professional_profiles;

-- Recreate with explicit, clear policies
CREATE POLICY "Healthcare professionals can view own profile"
ON public.healthcare_professional_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Healthcare professionals can insert own profile"
ON public.healthcare_professional_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Healthcare professionals can update own profile"
ON public.healthcare_professional_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all healthcare profiles"
ON public.healthcare_professional_profiles
FOR SELECT
TO authenticated
USING (
  EXISTS(
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);