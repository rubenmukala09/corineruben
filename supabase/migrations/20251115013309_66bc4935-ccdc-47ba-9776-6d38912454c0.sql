-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (subscribe)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Only admins can view subscribers
CREATE POLICY "Admins can view newsletter subscribers"
  ON public.newsletter_subscribers
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'::app_role
    )
  );

-- Only admins can delete subscribers
CREATE POLICY "Admins can delete newsletter subscribers"
  ON public.newsletter_subscribers
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'::app_role
    )
  );

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email 
  ON public.newsletter_subscribers(email);

-- Add comment
COMMENT ON TABLE public.newsletter_subscribers IS 'Stores newsletter subscribers with their subscription details';