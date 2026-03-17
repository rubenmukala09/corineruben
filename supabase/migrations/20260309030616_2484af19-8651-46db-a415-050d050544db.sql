CREATE TABLE public.book_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  customer_name TEXT,
  topic TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.book_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert book requests"
  ON public.book_requests FOR INSERT TO anon, authenticated
  WITH CHECK (true);