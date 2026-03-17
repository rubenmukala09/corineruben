-- Add RLS policies to scheduled_emails table
ALTER TABLE public.scheduled_emails ENABLE ROW LEVEL SECURITY;

-- Only admins and staff can view scheduled emails
CREATE POLICY "Admins and staff can view scheduled emails"
ON public.scheduled_emails
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'secretary', 'support_specialist')
  )
);

-- Only admins can insert scheduled emails
CREATE POLICY "Admins can create scheduled emails"
ON public.scheduled_emails
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Only admins can update scheduled emails
CREATE POLICY "Admins can update scheduled emails"
ON public.scheduled_emails
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Only admins can delete scheduled emails
CREATE POLICY "Admins can delete scheduled emails"
ON public.scheduled_emails
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);