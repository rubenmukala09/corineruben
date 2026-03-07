
CREATE TABLE public.enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  answered_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an enquiry
CREATE POLICY "Anyone can insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- Authenticated users can view all enquiries
CREATE POLICY "Authenticated users can view enquiries" ON public.enquiries FOR SELECT TO authenticated USING (true);

-- Authenticated users can update enquiries (to answer them)
CREATE POLICY "Authenticated users can update enquiries" ON public.enquiries FOR UPDATE TO authenticated USING (true);

-- Authenticated users can delete enquiries
CREATE POLICY "Authenticated users can delete enquiries" ON public.enquiries FOR DELETE TO authenticated USING (true);
