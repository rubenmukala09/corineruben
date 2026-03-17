-- Fix: booking_requests RLS policy references auth.users directly causing "permission denied for table users"
-- Drop the problematic policy and recreate without auth.users reference
DROP POLICY IF EXISTS "Users can view their own booking requests" ON public.booking_requests;

CREATE POLICY "Users can view their own booking requests"
ON public.booking_requests
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
  OR email = auth.email()
  OR has_role(auth.uid(), 'admin')
  OR has_role(auth.uid(), 'staff')
);