-- =====================================================
-- ADD WORKERS TABLE AUDIT LOGGING & SENSITIVE DATA FUNCTION
-- =====================================================

-- 1. Add audit trigger to workers table
DROP TRIGGER IF EXISTS audit_workers_access ON public.workers;
CREATE TRIGGER audit_workers_access
  AFTER INSERT OR UPDATE OR DELETE ON public.workers
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_access();

-- 2. Create secure function to access worker sensitive data with logging
CREATE OR REPLACE FUNCTION public.get_worker_sensitive_data(target_worker_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  result jsonb;
  is_admin boolean;
  is_staff boolean;
  worker_user_id uuid;
BEGIN
  -- Get the user_id associated with this worker
  SELECT user_id INTO worker_user_id
  FROM workers
  WHERE id = target_worker_id;

  -- Check if user is admin or staff
  SELECT EXISTS(
    SELECT 1 FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'staff')
  ) INTO is_admin;

  -- Only allow own data or admin/staff access
  IF NOT (auth.uid() = worker_user_id OR is_admin) THEN
    RAISE EXCEPTION 'Access denied to sensitive worker data';
  END IF;
  
  -- Log the sensitive data access
  INSERT INTO activity_log (user_id, action, entity_type, entity_id, details)
  VALUES (
    auth.uid(),
    'VIEW_SENSITIVE_WORKER',
    'workers',
    target_worker_id::text,
    jsonb_build_object(
      'accessed_by', auth.uid()::text,
      'target_worker', target_worker_id::text,
      'timestamp', now()
    )
  );
  
  SELECT jsonb_build_object(
    'phone', phone,
    'address', address,
    'emergency_contact_name', emergency_contact_name,
    'emergency_contact_phone', emergency_contact_phone,
    'hourly_rate', hourly_rate,
    'bank_account_info', bank_account_info
  ) INTO result
  FROM workers
  WHERE id = target_worker_id;
  
  RETURN COALESCE(result, '{}'::jsonb);
END;
$function$;

-- 3. Create table for tracking form submission health
CREATE TABLE IF NOT EXISTS public.form_submission_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_type TEXT NOT NULL,
  submission_count INTEGER DEFAULT 0,
  success_count INTEGER DEFAULT 0,
  failure_count INTEGER DEFAULT 0,
  last_submission_at TIMESTAMP WITH TIME ZONE,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT date_trunc('hour', now()),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add unique constraint for hourly windows per form type
CREATE UNIQUE INDEX IF NOT EXISTS idx_form_metrics_type_window 
ON public.form_submission_metrics(form_type, window_start);

-- Enable RLS
ALTER TABLE public.form_submission_metrics ENABLE ROW LEVEL SECURITY;

-- Only admins can view form metrics
CREATE POLICY "Admins can view form metrics"
ON public.form_submission_metrics
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- 4. Create dashboard health tracking table
CREATE TABLE IF NOT EXISTS public.dashboard_health_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  dashboard_name TEXT NOT NULL,
  check_type TEXT NOT NULL DEFAULT 'connectivity',
  status TEXT NOT NULL DEFAULT 'healthy',
  response_time_ms INTEGER,
  error_message TEXT,
  tables_checked TEXT[],
  last_check_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add unique constraint for dashboard name
CREATE UNIQUE INDEX IF NOT EXISTS idx_dashboard_health_name 
ON public.dashboard_health_checks(dashboard_name);

-- Enable RLS
ALTER TABLE public.dashboard_health_checks ENABLE ROW LEVEL SECURITY;

-- Only admins can view dashboard health
CREATE POLICY "Admins can view dashboard health"
ON public.dashboard_health_checks
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- System can update health checks
CREATE POLICY "System can manage dashboard health"
ON public.dashboard_health_checks
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- 5. Create RLS policy status view for monitoring
CREATE OR REPLACE VIEW public.rls_policy_status AS
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Grant access to authenticated users (admins will filter in app)
GRANT SELECT ON public.rls_policy_status TO authenticated;