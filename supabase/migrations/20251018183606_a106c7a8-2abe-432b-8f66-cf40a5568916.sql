-- Fix Workers table RLS to prevent self-modification of sensitive fields
-- Drop the existing overly permissive worker update policy
DROP POLICY IF EXISTS "Workers can update their own profile" ON public.workers;

-- Create a new restricted update policy for workers
-- Workers can update their profile but NOT sensitive fields like hourly_rate, worker_id, position, hire_date
CREATE POLICY "Workers can update non-sensitive profile fields"
  ON public.workers
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    -- Ensure sensitive fields haven't changed
    AND hourly_rate IS NOT DISTINCT FROM (SELECT hourly_rate FROM public.workers WHERE id = auth.uid())
    AND worker_id IS NOT DISTINCT FROM (SELECT worker_id FROM public.workers WHERE id = auth.uid())
    AND position IS NOT DISTINCT FROM (SELECT position FROM public.workers WHERE id = auth.uid())
    AND hire_date IS NOT DISTINCT FROM (SELECT hire_date FROM public.workers WHERE id = auth.uid())
  );

-- Ensure clients table has proper INSERT/UPDATE/DELETE restrictions
-- The existing "Admins and managers can manage clients" FOR ALL policy covers this,
-- but let's verify no other policies allow unauthorized access

-- Add explicit comment for audit trail
COMMENT ON POLICY "Workers can update non-sensitive profile fields" ON public.workers IS 
  'Allows workers to update their profile but prevents modification of hourly_rate, worker_id, position, and hire_date for security';

COMMENT ON POLICY "Admins and managers can manage clients" ON public.clients IS
  'Only admin and staff roles can perform any CRUD operations on client data containing PII';