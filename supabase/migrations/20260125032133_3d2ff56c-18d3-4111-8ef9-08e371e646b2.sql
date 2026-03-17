-- Fix threat_events: Allow users to view threats on their own devices
-- profiles.id IS the auth.uid(), so we match profile_id directly
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'threat_events' 
    AND policyname = 'Users can view threats on their devices'
  ) THEN
    CREATE POLICY "Users can view threats on their devices" 
    ON public.threat_events 
    FOR SELECT TO authenticated 
    USING (
      profile_id = auth.uid() OR
      public.has_role(auth.uid(), 'admin'::public.app_role)
    );
  END IF;
END $$;

-- Block anonymous access to threat_events
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'threat_events' 
    AND policyname = 'Block anon select threat_events'
  ) THEN
    CREATE POLICY "Block anon select threat_events" 
    ON public.threat_events 
    AS RESTRICTIVE FOR SELECT TO anon 
    USING (false);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'threat_events' 
    AND policyname = 'Block anon insert threat_events'
  ) THEN
    CREATE POLICY "Block anon insert threat_events" 
    ON public.threat_events 
    AS RESTRICTIVE FOR INSERT TO anon 
    WITH CHECK (false);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'threat_events' 
    AND policyname = 'Block anon update threat_events'
  ) THEN
    CREATE POLICY "Block anon update threat_events" 
    ON public.threat_events 
    AS RESTRICTIVE FOR UPDATE TO anon 
    USING (false);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'threat_events' 
    AND policyname = 'Block anon delete threat_events'
  ) THEN
    CREATE POLICY "Block anon delete threat_events" 
    ON public.threat_events 
    AS RESTRICTIVE FOR DELETE TO anon 
    USING (false);
  END IF;
END $$;