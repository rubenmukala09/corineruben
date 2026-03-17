-- Drop existing policies on contacts table
DROP POLICY IF EXISTS "Staff can manage contacts" ON public.contacts;
DROP POLICY IF EXISTS "Staff can view all contacts" ON public.contacts;

-- Create new policies with explicit authentication check
-- Policy for SELECT - requires authenticated user with staff or admin role
CREATE POLICY "Authenticated staff can view contacts" 
ON public.contacts 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'staff'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Policy for ALL operations - requires authenticated user with staff or admin role
CREATE POLICY "Authenticated staff can manage contacts" 
ON public.contacts 
FOR ALL 
TO authenticated
USING (has_role(auth.uid(), 'staff'::app_role) OR has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'staff'::app_role) OR has_role(auth.uid(), 'admin'::app_role));