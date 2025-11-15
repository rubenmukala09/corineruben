-- Step 1: Add missing role values to app_role enum
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'app_role' AND e.enumlabel = 'secretary') THEN
    ALTER TYPE app_role ADD VALUE 'secretary';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'app_role' AND e.enumlabel = 'training_coordinator') THEN
    ALTER TYPE app_role ADD VALUE 'training_coordinator';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'app_role' AND e.enumlabel = 'business_consultant') THEN
    ALTER TYPE app_role ADD VALUE 'business_consultant';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'app_role' AND e.enumlabel = 'support_specialist') THEN
    ALTER TYPE app_role ADD VALUE 'support_specialist';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'app_role' AND e.enumlabel = 'staff') THEN
    ALTER TYPE app_role ADD VALUE 'staff';
  END IF;
END $$;

-- Step 2: Add admin role to current user
INSERT INTO user_roles (user_id, role)
VALUES ('458c23af-e53c-44b3-891f-fe1a95afef41', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Step 3: Create test email campaigns (minimal fields)
INSERT INTO email_campaigns (name, subject, schedule_type, target_audience)
VALUES
('ScamShield Launch Announcement', 'Protect Yourself from AI Scams', 'recurring', 'all_subscribers'),
('Holiday Security Tips', 'Stay Safe This Holiday Season', 'recurring', 'active_subscribers')
ON CONFLICT DO NOTHING;