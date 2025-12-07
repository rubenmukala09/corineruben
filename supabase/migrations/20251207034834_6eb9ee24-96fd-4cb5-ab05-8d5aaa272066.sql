-- Add explicit restrictive policy to deny anonymous/public access
-- This is an extra layer of protection even though TO authenticated already restricts access
CREATE POLICY "Deny public access to profiles"
ON public.profiles
AS RESTRICTIVE
FOR ALL
TO anon
USING (false);