-- Fix critical security vulnerabilities in user_roles table

-- Drop existing permissive policies if any
DROP POLICY IF EXISTS "Users can view their own role" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;

-- Create strict RLS policies for user_roles table

-- 1. PREVENT all direct client-side inserts
CREATE POLICY "Prevent direct role assignment from clients"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (false);

-- 2. Users can view their own role only
CREATE POLICY "Users can view own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 3. Admins can view all roles
CREATE POLICY "Admins view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 4. Only admins can update roles
CREATE POLICY "Only admins update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. Only admins can delete roles
CREATE POLICY "Only admins delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add comment documenting the security model
COMMENT ON TABLE public.user_roles IS 
'Role assignment table with strict RLS. All role assignments must go through Edge Functions using service role key. Direct client-side inserts are blocked.';
