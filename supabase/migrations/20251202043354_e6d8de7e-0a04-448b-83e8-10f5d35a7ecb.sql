-- Add RLS policies for scam_submissions table
-- This table allows public users to submit scam reports
-- and allows admins/staff to view and manage them

-- Policy: Allow anyone to submit scam reports
CREATE POLICY "Anyone can submit scam reports"
ON public.scam_submissions
FOR INSERT
TO public
WITH CHECK (true);

-- Policy: Admins and staff can view all scam submissions
CREATE POLICY "Admins can view all scam submissions"
ON public.scam_submissions
FOR SELECT
TO public
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'staff'::app_role)
);

-- Policy: Admins and staff can update scam submissions (for review/status updates)
CREATE POLICY "Admins can update scam submissions"
ON public.scam_submissions
FOR UPDATE
TO public
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'staff'::app_role)
)
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'staff'::app_role)
);