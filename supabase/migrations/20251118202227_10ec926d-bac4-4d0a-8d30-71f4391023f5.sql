-- Ensure user_roles table has proper structure with app_role enum
-- This enum should match the roles used in useUserRole hook
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM (
        'admin',
        'secretary',
        'training_coordinator',
        'business_consultant',
        'support_specialist',
        'staff',
        'moderator',
        'user'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    assigned_by UUID REFERENCES auth.users(id),
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for user_roles
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Function to safely assign role to user
CREATE OR REPLACE FUNCTION public.assign_user_role(
    target_user_id UUID,
    target_role app_role,
    assigned_by_user_id UUID DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Insert role if not exists
    INSERT INTO public.user_roles (user_id, role, assigned_by)
    VALUES (target_user_id, target_role, assigned_by_user_id)
    ON CONFLICT (user_id, role) DO NOTHING;
    
    -- Log the assignment
    INSERT INTO public.auth_audit_logs (event_type, email, metadata, success)
    SELECT 
        'role_assigned',
        u.email,
        jsonb_build_object(
            'role', target_role,
            'assigned_by', assigned_by_user_id,
            'target_user_id', target_user_id
        ),
        true
    FROM auth.users u
    WHERE u.id = target_user_id;
END;
$$;

-- Function to assign role by email (useful for setup)
CREATE OR REPLACE FUNCTION public.assign_role_by_email(
    target_email TEXT,
    target_role app_role
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    target_user_id UUID;
BEGIN
    -- Get user ID by email
    SELECT id INTO target_user_id
    FROM auth.users
    WHERE email = target_email
    LIMIT 1;
    
    IF target_user_id IS NOT NULL THEN
        -- Assign the role
        PERFORM public.assign_user_role(target_user_id, target_role, NULL);
    END IF;
END;
$$;