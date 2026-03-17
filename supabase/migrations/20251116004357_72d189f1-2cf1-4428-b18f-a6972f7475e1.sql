-- Phase 1: Update RLS policies for user_roles to allow initial role assignment

-- Drop existing restrictive policy if it exists
DROP POLICY IF EXISTS "Prevent direct role assignment from clients" ON user_roles;

-- Allow users to insert their own role ONCE during signup
DROP POLICY IF EXISTS "Users can insert own role once" ON user_roles;
CREATE POLICY "Users can insert own role once" ON user_roles
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id 
    AND NOT EXISTS (
      SELECT 1 FROM user_roles WHERE user_id = auth.uid()
    )
  );

-- Phase 2: Ensure audit logging table exists (skip if already exists)
-- Drop existing policies to recreate cleanly
DO $$ 
BEGIN
  -- Drop existing audit log policies if they exist
  DROP POLICY IF EXISTS "Admins can view audit logs" ON auth_audit_logs;
  DROP POLICY IF EXISTS "Admins can manage audit logs" ON auth_audit_logs;
EXCEPTION
  WHEN undefined_table THEN NULL;
END $$;

-- Create auth_audit_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS auth_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  email TEXT,
  role TEXT,
  action TEXT,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  success BOOLEAN,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on audit logs
ALTER TABLE auth_audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to view audit logs
CREATE POLICY "Admins can view audit logs" ON auth_audit_logs
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create or replace function to log role changes
CREATE OR REPLACE FUNCTION log_role_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO auth_audit_logs (user_id, event_type, role, action, success)
    VALUES (NEW.user_id, 'role_assignment', NEW.role::text, 'INSERT', true);
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO auth_audit_logs (user_id, event_type, role, action, success, metadata)
    VALUES (
      NEW.user_id, 
      'role_change', 
      NEW.role::text, 
      'UPDATE',
      true,
      jsonb_build_object('old_role', OLD.role::text, 'new_role', NEW.role::text)
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for role change logging
DROP TRIGGER IF EXISTS log_role_changes ON user_roles;
CREATE TRIGGER log_role_changes
  AFTER INSERT OR UPDATE ON user_roles
  FOR EACH ROW
  EXECUTE FUNCTION log_role_change();