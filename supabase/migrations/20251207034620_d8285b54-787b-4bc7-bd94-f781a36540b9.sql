-- Drop the overly permissive admin/staff policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Recreate with admin-only access (no staff)
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));