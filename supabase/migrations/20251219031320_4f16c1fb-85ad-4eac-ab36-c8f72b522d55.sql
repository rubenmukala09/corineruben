
-- Fix notifications INSERT policy - only allow admins/system or users creating notifications for themselves
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;

-- Create proper INSERT policy - admins can create for anyone, users only for themselves  
CREATE POLICY "Admins can create notifications"
ON public.notifications
FOR INSERT
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'staff'::app_role)
);

-- Also create policy for users to receive system notifications (triggered by DB functions)
CREATE POLICY "Authenticated users can receive notifications"
ON public.notifications
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
);
