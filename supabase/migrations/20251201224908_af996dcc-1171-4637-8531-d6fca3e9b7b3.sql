-- Create service_inquiries table for Business page inquiries
CREATE TABLE IF NOT EXISTS public.service_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_number TEXT UNIQUE NOT NULL DEFAULT ('INQ-' || floor(random() * 1000000)::text),
  service_type TEXT NOT NULL CHECK (service_type IN ('ai-automation', 'website-design', 'ai-consultation', 'ai-insurance')),
  service_name TEXT NOT NULL,
  service_price DECIMAL(10,2),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  budget TEXT,
  timeline TEXT,
  requirements TEXT,
  is_veteran BOOLEAN DEFAULT false,
  veteran_type TEXT,
  veteran_id_last4 TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.service_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit inquiries
CREATE POLICY "Anyone can create service inquiry"
  ON public.service_inquiries
  FOR INSERT
  WITH CHECK (true);

-- Admin/staff can view all inquiries
CREATE POLICY "Admin and staff can view all inquiries"
  ON public.service_inquiries
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'staff', 'secretary', 'business_consultant')
    )
  );

-- Admin/staff can update inquiries
CREATE POLICY "Admin and staff can update inquiries"
  ON public.service_inquiries
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role IN ('admin', 'staff', 'secretary', 'business_consultant')
    )
  );

-- Create index for performance
CREATE INDEX idx_service_inquiries_status ON public.service_inquiries(status);
CREATE INDEX idx_service_inquiries_created_at ON public.service_inquiries(created_at DESC);
CREATE INDEX idx_service_inquiries_email ON public.service_inquiries(email);