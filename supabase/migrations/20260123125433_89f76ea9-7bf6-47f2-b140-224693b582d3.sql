-- Phase 1: Security Fixes - RLS Policy Audit and Privacy Views

-- 1.1 Create donations_summary view with masked emails for staff (admins see full data)
CREATE OR REPLACE VIEW public.donations_summary WITH (security_invoker = true) AS
SELECT 
  id,
  CASE 
    WHEN EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
    THEN email
    ELSE CONCAT(LEFT(email, 2), '***@***')
  END as email,
  donor_name,
  amount,
  donation_type,
  message,
  payment_status,
  created_at,
  updated_at
FROM public.donations;

-- 1.2 Create testimonials_staff view without emails (admins see full data via base table)
CREATE OR REPLACE VIEW public.testimonials_staff WITH (security_invoker = true) AS
SELECT 
  id,
  name,
  location,
  rating,
  story,
  featured,
  status,
  has_video,
  has_image,
  primary_media_url,
  display_location,
  display_order,
  submitted_at,
  approved_at,
  created_at,
  updated_at
  -- email excluded for staff view
FROM public.testimonials;

-- 1.3 Update enrollments table for course enrollment system
-- Add user_id column to enrollments for direct user tracking
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'enrollments' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE public.enrollments ADD COLUMN user_id UUID REFERENCES auth.users(id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'enrollments' AND column_name = 'progress_percentage'
  ) THEN
    ALTER TABLE public.enrollments ADD COLUMN progress_percentage INTEGER DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'enrollments' AND column_name = 'last_accessed_at'
  ) THEN
    ALTER TABLE public.enrollments ADD COLUMN last_accessed_at TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;

-- 1.4 Create RLS policies for enrollments to allow users to see their own enrollments
DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.enrollments;
CREATE POLICY "Users can view their own enrollments" 
ON public.enrollments 
FOR SELECT 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can enroll themselves" ON public.enrollments;
CREATE POLICY "Users can enroll themselves" 
ON public.enrollments 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update their own enrollment progress" ON public.enrollments;
CREATE POLICY "Users can update their own enrollment progress" 
ON public.enrollments 
FOR UPDATE 
USING (user_id = auth.uid());

-- 1.5 Ensure RLS is enabled on enrollments
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- 1.6 Create client_notes table for admin client management
CREATE TABLE IF NOT EXISTS public.client_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content TEXT,
  importance TEXT DEFAULT 'normal' CHECK (importance IN ('normal', 'high', 'urgent')),
  is_pinned BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.client_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Staff can manage client notes" ON public.client_notes;
CREATE POLICY "Staff can manage client notes" 
ON public.client_notes 
FOR ALL 
USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'staff'))
);

-- 1.7 Create client_messages table for communication tracking
CREATE TABLE IF NOT EXISTS public.client_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES auth.users(id),
  message_type TEXT DEFAULT 'email' CHECK (message_type IN ('email', 'sms', 'call', 'note')),
  subject TEXT,
  content TEXT NOT NULL,
  is_from_client BOOLEAN DEFAULT false,
  is_read BOOLEAN DEFAULT false,
  is_starred BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.client_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Staff can manage client messages" ON public.client_messages;
CREATE POLICY "Staff can manage client messages" 
ON public.client_messages 
FOR ALL 
USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'staff'))
);

-- 1.8 Create user_booking_requests view for portal
CREATE OR REPLACE VIEW public.user_booking_requests WITH (security_invoker = true) AS
SELECT 
  id,
  request_number,
  service_name,
  service_type,
  service_tier,
  preferred_dates,
  status,
  base_price,
  discount_amount,
  final_price,
  created_at,
  updated_at
FROM public.booking_requests
WHERE user_id = auth.uid() OR email = (SELECT email FROM auth.users WHERE id = auth.uid());

-- 1.9 Add RLS policy for booking_requests to allow users to view their own
DROP POLICY IF EXISTS "Users can view their own booking requests" ON public.booking_requests;
CREATE POLICY "Users can view their own booking requests" 
ON public.booking_requests 
FOR SELECT 
USING (
  user_id = auth.uid() 
  OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
  OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'staff'))
);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION public.update_client_notes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS update_client_notes_timestamp ON public.client_notes;
CREATE TRIGGER update_client_notes_timestamp
  BEFORE UPDATE ON public.client_notes
  FOR EACH ROW EXECUTE FUNCTION public.update_client_notes_updated_at();