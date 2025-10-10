-- ============================================
-- INVISION NETWORK DUAL PORTAL - Final Migration
-- ============================================

-- Update Workers table
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workers' AND column_name='worker_id') THEN
    ALTER TABLE public.workers ADD COLUMN worker_id TEXT UNIQUE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workers' AND column_name='position') THEN
    ALTER TABLE public.workers ADD COLUMN position TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workers' AND column_name='hire_date') THEN
    ALTER TABLE public.workers ADD COLUMN hire_date DATE DEFAULT CURRENT_DATE;
  END IF;
END $$;

-- Worker ID sequence and function
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'worker_id_seq') THEN
    CREATE SEQUENCE worker_id_seq START WITH 1;
  END IF;
END $$;

CREATE OR REPLACE FUNCTION generate_worker_id()
RETURNS TEXT AS $$
DECLARE
  next_id INTEGER;
  formatted_id TEXT;
BEGIN
  next_id := nextval('worker_id_seq');
  formatted_id := 'INV-' || LPAD(next_id::TEXT, 4, '0');
  RETURN formatted_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Events table - add visibility
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='events' AND column_name='visibility') THEN
    ALTER TABLE public.events ADD COLUMN visibility TEXT DEFAULT 'All' CHECK (visibility IN ('All', 'Workers', 'Admins'));
  END IF;
END $$;

-- Messages table - add sender_role
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='internal_messages' AND column_name='sender_role') THEN
    ALTER TABLE public.internal_messages ADD COLUMN sender_role TEXT DEFAULT 'Admin' CHECK (sender_role IN ('Admin', 'Worker'));
  END IF;
END $$;

-- Seed Federal Holidays (using task type since event_type enum doesn't have Holiday)
DO $$
BEGIN
  INSERT INTO public.events (title, event_type, description, scheduled_at, status, visibility)
  VALUES
    ('New Year''s Day', 'task'::event_type, 'Federal Holiday', '2025-01-01 00:00:00+00'::timestamptz, 'scheduled'::event_status, 'All'),
    ('MLK Jr. Day', 'task'::event_type, 'Federal Holiday', '2025-01-20 00:00:00+00'::timestamptz, 'scheduled'::event_status, 'All'),
    ('Presidents Day', 'task'::event_type, 'Federal Holiday', '2025-02-17 00:00:00+00'::timestamptz, 'scheduled'::event_status, 'All'),
    ('Memorial Day', 'task'::event_type, 'Federal Holiday', '2025-05-26 00:00:00+00'::timestamptz, 'scheduled'::event_status, 'All'),
    ('Juneteenth', 'task'::event_type, 'Federal Holiday', '2025-06-19 00:00:00+00'::timestamptz, 'scheduled'::event_status, 'All'),
    ('Independence Day', 'task'::event_type, 'Federal Holiday', '2025-07-04 00:00:00+00'::timestamptz, 'scheduled'::event_status, 'All'),
    ('Labor Day', 'task'::event_type, 'Federal Holiday', '2025-09-01 00:00:00+00'::timestamptz, 'scheduled'::event_status, 'All'),
    ('Veterans Day', 'task'::event_type, 'Federal Holiday', '2025-11-11 00:00:00+00'::timestamptz, 'scheduled'::event_status, 'All'),
    ('Thanksgiving', 'task'::event_type, 'Federal Holiday', '2025-11-27 00:00:00+00'::timestamptz, 'scheduled'::event_status, 'All'),
    ('Christmas', 'task'::event_type, 'Federal Holiday', '2025-12-25 00:00:00+00'::timestamptz, 'scheduled'::event_status, 'All'),
    ('Quarterly Training', 'meeting'::event_type, 'Company training', '2025-03-15 09:00:00+00'::timestamptz, 'scheduled'::event_status, 'All'),
    ('Town Hall', 'meeting'::event_type, 'Monthly town hall', '2025-02-10 14:00:00+00'::timestamptz, 'scheduled'::event_status, 'All'),
    ('System Maintenance', 'task'::event_type, 'Scheduled maintenance', '2025-02-20 02:00:00+00'::timestamptz, 'scheduled'::event_status, 'All')
  ON CONFLICT DO NOTHING;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;