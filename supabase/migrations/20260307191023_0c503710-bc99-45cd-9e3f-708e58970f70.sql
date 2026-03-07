
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Anyone can read announcements (public facing)
CREATE POLICY "Anyone can view announcements" ON public.announcements
  FOR SELECT USING (true);

-- Only authenticated users (admins) can insert
CREATE POLICY "Authenticated users can insert announcements" ON public.announcements
  FOR INSERT TO authenticated WITH CHECK (true);

-- Only authenticated users (admins) can delete
CREATE POLICY "Authenticated users can delete announcements" ON public.announcements
  FOR DELETE TO authenticated USING (true);
