
-- Create timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ═══ RSVPS TABLE ═══
CREATE TABLE public.rsvps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  attending BOOLEAN NOT NULL DEFAULT true,
  guests INTEGER NOT NULL DEFAULT 1,
  companions TEXT[] DEFAULT '{}',
  cuisine TEXT,
  meal TEXT,
  sides TEXT[] DEFAULT '{}',
  drinks TEXT[] DEFAULT '{}',
  dietary TEXT,
  table_name TEXT,
  stay_anonymous BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'declined')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an RSVP (public form)
CREATE POLICY "Anyone can insert rsvps"
  ON public.rsvps FOR INSERT
  WITH CHECK (true);

-- Only authenticated admin can view all RSVPs
CREATE POLICY "Authenticated users can view rsvps"
  ON public.rsvps FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated admin can update RSVPs
CREATE POLICY "Authenticated users can update rsvps"
  ON public.rsvps FOR UPDATE
  TO authenticated
  USING (true);

-- Only authenticated admin can delete RSVPs
CREATE POLICY "Authenticated users can delete rsvps"
  ON public.rsvps FOR DELETE
  TO authenticated
  USING (true);

CREATE TRIGGER update_rsvps_updated_at
  BEFORE UPDATE ON public.rsvps
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ═══ GIFTS TABLE ═══
CREATE TABLE public.gifts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  from_name TEXT NOT NULL,
  amount INTEGER NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a gift (public form)
CREATE POLICY "Anyone can insert gifts"
  ON public.gifts FOR INSERT
  WITH CHECK (true);

-- Only authenticated admin can view gifts
CREATE POLICY "Authenticated users can view gifts"
  ON public.gifts FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated admin can delete gifts
CREATE POLICY "Authenticated users can delete gifts"
  ON public.gifts FOR DELETE
  TO authenticated
  USING (true);
