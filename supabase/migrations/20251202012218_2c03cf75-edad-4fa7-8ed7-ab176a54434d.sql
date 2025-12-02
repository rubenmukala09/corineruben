-- Create external_security_links table for Latest Security Articles section
CREATE TABLE public.external_security_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  external_url TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'Security News',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.external_security_links ENABLE ROW LEVEL SECURITY;

-- Public can view active links
CREATE POLICY "Public can view active external links"
ON public.external_security_links
FOR SELECT
USING (is_active = true);

-- Admins and staff can manage all links
CREATE POLICY "Admins can manage external links"
ON public.external_security_links
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'staff'::app_role));

-- Create index for ordering
CREATE INDEX idx_external_security_links_order ON public.external_security_links(display_order, created_at DESC);

-- Create trigger for updated_at
CREATE TRIGGER update_external_security_links_updated_at
BEFORE UPDATE ON public.external_security_links
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();