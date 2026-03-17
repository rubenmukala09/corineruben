
-- ============================================
-- Graphic Design Portfolio CMS
-- ============================================

-- 1. Categories
CREATE TABLE public.graphic_design_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.graphic_design_categories ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can view categories"
  ON public.graphic_design_categories FOR SELECT
  USING (true);

-- Admin write
CREATE POLICY "Admins can manage categories"
  ON public.graphic_design_categories FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_gd_categories_updated_at
  BEFORE UPDATE ON public.graphic_design_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. Tags
CREATE TABLE public.graphic_design_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES public.graphic_design_categories(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.graphic_design_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tags"
  ON public.graphic_design_tags FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage tags"
  ON public.graphic_design_tags FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 3. Projects
CREATE TABLE public.graphic_design_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  thumbnail_url TEXT,
  hero_image_url TEXT,
  short_description TEXT,
  full_description TEXT,
  category_id UUID REFERENCES public.graphic_design_categories(id) ON DELETE SET NULL,
  client_name TEXT,
  project_year INT DEFAULT EXTRACT(YEAR FROM now())::INT,
  tools_used TEXT,
  is_featured BOOLEAN DEFAULT false,
  gallery JSONB DEFAULT '[]'::JSONB,
  live_link TEXT,
  seo_title TEXT,
  seo_meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.graphic_design_projects ENABLE ROW LEVEL SECURITY;

-- Public read for published
CREATE POLICY "Anyone can view published projects"
  ON public.graphic_design_projects FOR SELECT
  USING (status = 'published' OR (auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'admin')));

-- Admin write
CREATE POLICY "Admins can manage projects"
  ON public.graphic_design_projects FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_gd_projects_updated_at
  BEFORE UPDATE ON public.graphic_design_projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Project-Tag junction
CREATE TABLE public.graphic_design_project_tags (
  project_id UUID NOT NULL REFERENCES public.graphic_design_projects(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.graphic_design_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, tag_id)
);

ALTER TABLE public.graphic_design_project_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view project tags"
  ON public.graphic_design_project_tags FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage project tags"
  ON public.graphic_design_project_tags FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. Indexes
CREATE INDEX idx_gd_projects_category ON public.graphic_design_projects(category_id);
CREATE INDEX idx_gd_projects_status ON public.graphic_design_projects(status);
CREATE INDEX idx_gd_projects_featured ON public.graphic_design_projects(is_featured);
CREATE INDEX idx_gd_projects_year ON public.graphic_design_projects(project_year);
CREATE INDEX idx_gd_tags_category ON public.graphic_design_tags(category_id);

-- 6. Seed categories
INSERT INTO public.graphic_design_categories (name, slug, description, display_order) VALUES
  ('Branding & Identity', 'branding-identity', 'Logo design, brand guidelines, visual identity systems', 1),
  ('Print Design', 'print-design', 'Posters, flyers, brochures, packaging, and editorial layouts', 2),
  ('Digital Design', 'digital-design', 'Social media graphics, web graphics, digital ads, and banners', 3),
  ('Marketing & Advertising', 'marketing-advertising', 'Campaign design, promotional materials, and presentations', 4),
  ('Typography', 'typography', 'Custom type design, lettering, and calligraphy', 5),
  ('Illustration & Visual Art', 'illustration-visual-art', 'Vector illustration, character design, icons, and patterns', 6),
  ('Motion & Hybrid Design', 'motion-graphic-design', 'Motion graphics, animated posters, and social media animation', 7),
  ('UI / UX Graphic Assets', 'ui-ux-graphic-assets', 'UI kits, icon sets, and design systems', 8);

-- 7. Seed tags
INSERT INTO public.graphic_design_tags (name, slug, category_id) VALUES
  -- Branding
  ('Logo Design', 'logo-design', (SELECT id FROM public.graphic_design_categories WHERE slug = 'branding-identity')),
  ('Brand Guidelines', 'brand-guidelines', (SELECT id FROM public.graphic_design_categories WHERE slug = 'branding-identity')),
  ('Rebranding', 'rebranding', (SELECT id FROM public.graphic_design_categories WHERE slug = 'branding-identity')),
  ('Visual Identity', 'visual-identity', (SELECT id FROM public.graphic_design_categories WHERE slug = 'branding-identity')),
  ('Personal Branding', 'personal-branding', (SELECT id FROM public.graphic_design_categories WHERE slug = 'branding-identity')),
  -- Print
  ('Poster Design', 'poster-design', (SELECT id FROM public.graphic_design_categories WHERE slug = 'print-design')),
  ('Flyer Design', 'flyer-design', (SELECT id FROM public.graphic_design_categories WHERE slug = 'print-design')),
  ('Brochure Design', 'brochure-design', (SELECT id FROM public.graphic_design_categories WHERE slug = 'print-design')),
  ('Business Cards', 'business-cards', (SELECT id FROM public.graphic_design_categories WHERE slug = 'print-design')),
  ('Packaging Design', 'packaging-design', (SELECT id FROM public.graphic_design_categories WHERE slug = 'print-design')),
  ('Magazine Layout', 'magazine-layout', (SELECT id FROM public.graphic_design_categories WHERE slug = 'print-design')),
  -- Digital
  ('Social Media Graphics', 'social-media-graphics', (SELECT id FROM public.graphic_design_categories WHERE slug = 'digital-design')),
  ('Web Graphics', 'web-graphics', (SELECT id FROM public.graphic_design_categories WHERE slug = 'digital-design')),
  ('Digital Ads', 'digital-ads', (SELECT id FROM public.graphic_design_categories WHERE slug = 'digital-design')),
  ('Email Design', 'email-design', (SELECT id FROM public.graphic_design_categories WHERE slug = 'digital-design')),
  ('Banner Design', 'banner-design', (SELECT id FROM public.graphic_design_categories WHERE slug = 'digital-design')),
  -- Marketing
  ('Campaign Design', 'campaign-design', (SELECT id FROM public.graphic_design_categories WHERE slug = 'marketing-advertising')),
  ('Promotional Design', 'promotional-design', (SELECT id FROM public.graphic_design_categories WHERE slug = 'marketing-advertising')),
  ('Billboard Design', 'billboard-design', (SELECT id FROM public.graphic_design_categories WHERE slug = 'marketing-advertising')),
  ('Presentation Design', 'presentation-design', (SELECT id FROM public.graphic_design_categories WHERE slug = 'marketing-advertising')),
  -- Typography
  ('Typography Design', 'typography-design', (SELECT id FROM public.graphic_design_categories WHERE slug = 'typography')),
  ('Custom Type', 'custom-type', (SELECT id FROM public.graphic_design_categories WHERE slug = 'typography')),
  ('Lettering', 'lettering', (SELECT id FROM public.graphic_design_categories WHERE slug = 'typography')),
  ('Calligraphy', 'calligraphy', (SELECT id FROM public.graphic_design_categories WHERE slug = 'typography')),
  -- Illustration
  ('Vector Illustration', 'vector-illustration', (SELECT id FROM public.graphic_design_categories WHERE slug = 'illustration-visual-art')),
  ('Character Design', 'character-design', (SELECT id FROM public.graphic_design_categories WHERE slug = 'illustration-visual-art')),
  ('Icon Design', 'icon-design', (SELECT id FROM public.graphic_design_categories WHERE slug = 'illustration-visual-art')),
  ('Infographic Design', 'infographic-design', (SELECT id FROM public.graphic_design_categories WHERE slug = 'illustration-visual-art')),
  ('Pattern Design', 'pattern-design', (SELECT id FROM public.graphic_design_categories WHERE slug = 'illustration-visual-art')),
  -- Motion
  ('Motion Graphics', 'motion-graphics', (SELECT id FROM public.graphic_design_categories WHERE slug = 'motion-graphic-design')),
  ('Animated Posters', 'animated-posters', (SELECT id FROM public.graphic_design_categories WHERE slug = 'motion-graphic-design')),
  ('Social Media Animation', 'social-media-animation', (SELECT id FROM public.graphic_design_categories WHERE slug = 'motion-graphic-design')),
  -- UI/UX
  ('UI Kits', 'ui-kits', (SELECT id FROM public.graphic_design_categories WHERE slug = 'ui-ux-graphic-assets')),
  ('Icon Sets', 'icon-sets', (SELECT id FROM public.graphic_design_categories WHERE slug = 'ui-ux-graphic-assets')),
  ('Design Systems', 'design-systems', (SELECT id FROM public.graphic_design_categories WHERE slug = 'ui-ux-graphic-assets'));

-- 8. Storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) VALUES ('graphic-design-portfolio', 'graphic-design-portfolio', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view portfolio images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'graphic-design-portfolio');

CREATE POLICY "Admins can upload portfolio images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'graphic-design-portfolio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update portfolio images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'graphic-design-portfolio' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete portfolio images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'graphic-design-portfolio' AND public.has_role(auth.uid(), 'admin'));
