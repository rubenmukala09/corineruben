-- Create purchase_requests table for pay-what-you-want items
CREATE TABLE IF NOT EXISTS public.purchase_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_number TEXT NOT NULL DEFAULT generate_request_number(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Item details
  item_type TEXT NOT NULL, -- 'guide', 'book', 'product'
  item_name TEXT NOT NULL,
  
  -- Customer info
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Veteran status
  is_veteran BOOLEAN DEFAULT FALSE,
  veteran_type TEXT,
  veteran_id_last4 TEXT,
  veteran_document_url TEXT, -- storage path for verification doc
  
  -- Pricing (PWYW for guides/books, fixed for products)
  suggested_price NUMERIC,
  customer_price NUMERIC NOT NULL,
  discount_amount NUMERIC DEFAULT 0,
  final_price NUMERIC NOT NULL,
  
  -- Additional details
  message TEXT,
  quantity INTEGER DEFAULT 1,
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Payment
  payment_status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, completed, failed, refunded
  payment_method TEXT, -- card, paypal, etc
  stripe_payment_intent_id TEXT,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, shipped, completed, cancelled
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.purchase_requests ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can insert purchase requests"
  ON public.purchase_requests
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own purchase requests"
  ON public.purchase_requests
  FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Admins can view all purchase requests"
  ON public.purchase_requests
  FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can update purchase requests"
  ON public.purchase_requests
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'));

-- Trigger for updated_at
CREATE TRIGGER update_purchase_requests_updated_at
  BEFORE UPDATE ON public.purchase_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes
CREATE INDEX idx_purchase_requests_status ON public.purchase_requests(status);
CREATE INDEX idx_purchase_requests_payment_status ON public.purchase_requests(payment_status);
CREATE INDEX idx_purchase_requests_item_type ON public.purchase_requests(item_type);
CREATE INDEX idx_purchase_requests_created_at ON public.purchase_requests(created_at DESC);

-- Create storage bucket for veteran verification documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'veteran-docs',
  'veteran-docs',
  false,
  5242880, -- 5MB limit
  ARRAY['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for veteran documents
CREATE POLICY "Users can upload their own veteran docs"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'veteran-docs' AND
    (auth.uid()::text = (storage.foldername(name))[1])
  );

CREATE POLICY "Users can view their own veteran docs"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'veteran-docs' AND
    (auth.uid()::text = (storage.foldername(name))[1])
  );

CREATE POLICY "Admins can view all veteran docs"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'veteran-docs' AND
    (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'staff'))
  );

CREATE POLICY "Users can update their own veteran docs"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'veteran-docs' AND
    (auth.uid()::text = (storage.foldername(name))[1])
  );

CREATE POLICY "Users can delete their own veteran docs"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'veteran-docs' AND
    (auth.uid()::text = (storage.foldername(name))[1])
  );