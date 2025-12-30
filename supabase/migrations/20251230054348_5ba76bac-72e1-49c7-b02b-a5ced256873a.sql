-- Add "Deny anon access" policies to sensitive tables that are missing them
-- These tables contain PII and should not be accessible to anonymous users

-- 1. workers table - employee personal data
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'workers' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.workers
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 2. healthcare_professional_profiles - medical credentials
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'healthcare_professional_profiles' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.healthcare_professional_profiles
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 3. internal_messages - private communications
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'internal_messages' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.internal_messages
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 4. user_2fa_settings - authentication secrets
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'user_2fa_settings' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.user_2fa_settings
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 5. password_reset_tokens - security tokens
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'password_reset_tokens' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.password_reset_tokens
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 6. verification_codes - auth verification
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'verification_codes' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.verification_codes
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 7. trainer_profiles - employee data
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'trainer_profiles' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.trainer_profiles
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 8. senior_client_profiles - vulnerable population data
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'senior_client_profiles' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.senior_client_profiles
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 9. partner_orders - customer order data with PII
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'partner_orders' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.partner_orders
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 10. testimonials - prevent email exposure (public view exists for approved content)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'testimonials' AND policyname = 'Deny anon select'
  ) THEN
    CREATE POLICY "Deny anon select" ON public.testimonials
      AS RESTRICTIVE
      FOR SELECT
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 11. email_campaigns - marketing data
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'email_campaigns' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.email_campaigns
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 12. email_templates - internal templates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'email_templates' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.email_templates
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 13. email_delivery_logs - delivery tracking
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'email_delivery_logs' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.email_delivery_logs
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 14. campaign_recipients - recipient emails
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'campaign_recipients' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.campaign_recipients
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 15. time_off_requests - employee HR data
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'time_off_requests' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.time_off_requests
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 16. user_activity_logs - user behavior tracking
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'user_activity_logs' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.user_activity_logs
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 17. tickets - support tickets
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'tickets' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.tickets
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 18. zoom_class_enrollments - enrollment data
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'zoom_class_enrollments' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.zoom_class_enrollments
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 19. zoom_classes - class scheduling data
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'zoom_classes' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.zoom_classes
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;

-- 20. worker_availability - employee schedule data
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'worker_availability' AND policyname = 'Deny anon access'
  ) THEN
    CREATE POLICY "Deny anon access" ON public.worker_availability
      AS RESTRICTIVE
      FOR ALL
      USING (auth.role() != 'anon');
  END IF;
END $$;