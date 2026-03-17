-- Create booking_requests table for all service bookings
CREATE TABLE IF NOT EXISTS public.booking_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_number TEXT NOT NULL DEFAULT generate_request_number(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Service details
  service_type TEXT NOT NULL, -- 'training', 'scamshield', 'business', 'website', 'guide', 'product'
  service_name TEXT NOT NULL,
  service_tier TEXT, -- e.g., 'Standard Group', 'Family Plan', 'Landing Page'
  
  -- Customer info
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Veteran status
  is_veteran BOOLEAN DEFAULT FALSE,
  veteran_type TEXT, -- 'active_duty', 'veteran', 'reservist', 'first_responder'
  veteran_id_last4 TEXT,
  
  -- Pricing
  base_price NUMERIC,
  discount_amount NUMERIC DEFAULT 0,
  final_price NUMERIC,
  
  -- Additional details
  message TEXT,
  preferred_dates TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending', -- pending, contacted, confirmed, completed, cancelled
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can insert booking requests"
  ON public.booking_requests
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own booking requests"
  ON public.booking_requests
  FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Admins can view all booking requests"
  ON public.booking_requests
  FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can update booking requests"
  ON public.booking_requests
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- Trigger for updated_at
CREATE TRIGGER update_booking_requests_updated_at
  BEFORE UPDATE ON public.booking_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Index for faster queries
CREATE INDEX idx_booking_requests_status ON public.booking_requests(status);
CREATE INDEX idx_booking_requests_service_type ON public.booking_requests(service_type);
CREATE INDEX idx_booking_requests_created_at ON public.booking_requests(created_at DESC);