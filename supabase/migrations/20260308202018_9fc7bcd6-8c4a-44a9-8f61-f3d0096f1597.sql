
CREATE TABLE public.book_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  access_id TEXT UNIQUE NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  book_ids TEXT[] NOT NULL,
  stripe_session_id TEXT,
  amount_paid INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_accessed_at TIMESTAMPTZ
);

ALTER TABLE public.book_purchases ENABLE ROW LEVEL SECURITY;

-- No direct anonymous/public reads - access validated via edge function using service role
CREATE POLICY "No public access to book_purchases"
  ON public.book_purchases
  FOR ALL
  TO anon, authenticated
  USING (false);
