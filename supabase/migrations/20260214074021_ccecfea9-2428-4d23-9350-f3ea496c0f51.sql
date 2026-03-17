
-- ══════════════════════════════════════════════════════════
-- PORTFOLIO DESIGN SYSTEM - Complete Schema
-- ══════════════════════════════════════════════════════════

-- 1. Portfolio Categories (Primary / Secondary / Hidden hierarchy)
CREATE TABLE public.portfolio_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  visibility TEXT NOT NULL DEFAULT 'primary' CHECK (visibility IN ('primary', 'secondary', 'hidden')),
  display_order INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Style Dictionary (fixed vocabulary, one term = one meaning)
CREATE TABLE public.portfolio_style_dictionary (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  canonical_term TEXT NOT NULL UNIQUE,
  aliases TEXT[] DEFAULT '{}',
  client_facing_label TEXT,
  trend_age TEXT NOT NULL DEFAULT 'trend-aware' CHECK (trend_age IN ('timeless', 'trend-aware', 'trend-led', 'experimental')),
  category TEXT NOT NULL DEFAULT 'visual-style',
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Portfolio Tags (normalized, linked to style dictionary)
CREATE TABLE public.portfolio_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  tag_type TEXT NOT NULL DEFAULT 'style' CHECK (tag_type IN ('style', 'industry', 'mood', 'process', 'strategy', 'grid', 'motion', 'production', 'energy')),
  style_dictionary_id UUID REFERENCES public.portfolio_style_dictionary(id) ON DELETE SET NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Portfolio Projects (main table)
CREATE TABLE public.portfolio_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES public.portfolio_categories(id) ON DELETE SET NULL,
  hero_image_url TEXT,
  thumbnail_url TEXT,
  short_description TEXT,
  client_name TEXT,
  project_date DATE,
  featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Project-Tags junction
CREATE TABLE public.portfolio_project_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.portfolio_projects(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.portfolio_tags(id) ON DELETE CASCADE,
  UNIQUE(project_id, tag_id)
);

-- 6. Case Study Sections (7-section story arc)
CREATE TABLE public.portfolio_case_study_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.portfolio_projects(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL CHECK (section_type IN ('context', 'role_scope', 'visual_strategy', 'design_system', 'key_screens', 'motion_interaction', 'outcome')),
  title TEXT,
  content TEXT,
  media_urls TEXT[] DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Project Gallery Images
CREATE TABLE public.portfolio_gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.portfolio_projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ RLS ═══
ALTER TABLE public.portfolio_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_style_dictionary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_project_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_case_study_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_gallery ENABLE ROW LEVEL SECURITY;

-- Public read for published content
CREATE POLICY "Anyone can view categories" ON public.portfolio_categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view style dictionary" ON public.portfolio_style_dictionary FOR SELECT USING (true);
CREATE POLICY "Anyone can view tags" ON public.portfolio_tags FOR SELECT USING (true);
CREATE POLICY "Anyone can view published projects" ON public.portfolio_projects FOR SELECT USING (status = 'published');
CREATE POLICY "Anyone can view project tags" ON public.portfolio_project_tags FOR SELECT USING (true);
CREATE POLICY "Anyone can view case study sections" ON public.portfolio_case_study_sections FOR SELECT USING (true);
CREATE POLICY "Anyone can view gallery" ON public.portfolio_gallery FOR SELECT USING (true);

-- Admin write access
CREATE POLICY "Admins can manage categories" ON public.portfolio_categories FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage style dictionary" ON public.portfolio_style_dictionary FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage tags" ON public.portfolio_tags FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage projects" ON public.portfolio_projects FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage project tags" ON public.portfolio_project_tags FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage case study sections" ON public.portfolio_case_study_sections FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage gallery" ON public.portfolio_gallery FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_portfolio_categories_updated_at BEFORE UPDATE ON public.portfolio_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_portfolio_projects_updated_at BEFORE UPDATE ON public.portfolio_projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_portfolio_case_study_updated_at BEFORE UPDATE ON public.portfolio_case_study_sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ═══ SEED DATA: Primary Categories (Noun-based naming) ═══
INSERT INTO public.portfolio_categories (name, slug, visibility, display_order, description) VALUES
  ('Brand Systems', 'brand-systems', 'primary', 1, 'Complete brand identity systems and guidelines'),
  ('Digital Design', 'digital-design', 'primary', 2, 'Web, mobile, and digital product design'),
  ('Print Design', 'print-design', 'primary', 3, 'Physical print materials and collateral'),
  ('Typography', 'typography', 'primary', 4, 'Type design, pairings, and typographic systems'),
  ('Illustration', 'illustration', 'primary', 5, 'Custom illustration and visual storytelling'),
  ('Motion Design', 'motion-design', 'primary', 6, 'Animation, video, and motion graphics'),
  ('UI Assets', 'ui-assets', 'primary', 7, 'Interface components and design system assets');

-- ═══ SEED DATA: Style Dictionary ═══
INSERT INTO public.portfolio_style_dictionary (canonical_term, aliases, client_facing_label, trend_age, category) VALUES
  ('Glassmorphism', '{"Glass UI","Frosted UI","Frosted Glass"}', 'Layered, modern interface with depth and clarity', 'trend-aware', 'visual-style'),
  ('Neo-Brutalism', '{"Brutalist","Brutal UI","New Brutalism"}', 'Bold, raw aesthetic with high-contrast elements', 'trend-led', 'visual-style'),
  ('Neumorphism', '{"Soft UI","Skeuomorphic 2.0"}', 'Soft, tactile interface with subtle depth', 'trend-aware', 'visual-style'),
  ('Minimalism', '{"Minimal","Clean Design"}', 'Clean, focused design with purposeful simplicity', 'timeless', 'visual-style'),
  ('Editorial Design', '{"Magazine Style","Editorial Layout"}', 'Story-driven layouts inspired by editorial publishing', 'timeless', 'visual-style'),
  ('Retro-Futurism', '{"Retrofuture","Space Age"}', 'Nostalgic futuristic aesthetic blending past and future', 'trend-led', 'visual-style'),
  ('Art Deco', '{"Deco","Gatsby Style"}', 'Geometric elegance with luxurious metallic accents', 'timeless', 'visual-style'),
  ('Organic Design', '{"Biomorphic","Natural UI"}', 'Flowing, nature-inspired shapes and warm palettes', 'trend-aware', 'visual-style'),
  ('Swiss Modernism', '{"International Style","Grid-Based"}', 'Precision-driven design rooted in typographic grids', 'timeless', 'visual-style'),
  ('Contemporary Editorial', '{"Modern Editorial"}', 'Fresh editorial approach with digital-first thinking', 'trend-aware', 'visual-style');

-- ═══ SEED DATA: Tags ═══
INSERT INTO public.portfolio_tags (name, slug, tag_type, display_order) VALUES
  ('SaaS', 'saas', 'industry', 1),
  ('Healthcare', 'healthcare', 'industry', 2),
  ('Finance', 'finance', 'industry', 3),
  ('E-Commerce', 'e-commerce', 'industry', 4),
  ('Education', 'education', 'industry', 5),
  ('Calm', 'calm', 'mood', 1),
  ('Confident', 'confident', 'mood', 2),
  ('Energetic', 'energetic', 'mood', 3),
  ('Disruptive', 'disruptive', 'mood', 4),
  ('Serious', 'serious', 'mood', 5),
  ('Friendly', 'friendly', 'mood', 6),
  ('Fixed Grid', 'fixed-grid', 'grid', 1),
  ('Fluid Grid', 'fluid-grid', 'grid', 2),
  ('Broken Grid', 'broken-grid', 'grid', 3),
  ('Baseline Grid', 'baseline-grid', 'grid', 4),
  ('Developer-Ready', 'developer-ready', 'production', 1),
  ('Marketing-Ready', 'marketing-ready', 'production', 2),
  ('Scalable Systems', 'scalable-systems', 'production', 3),
  ('Handoff-Optimized', 'handoff-optimized', 'production', 4);
