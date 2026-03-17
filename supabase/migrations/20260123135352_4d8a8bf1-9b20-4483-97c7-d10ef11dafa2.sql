-- Create course_modules table for structured learning content
CREATE TABLE public.course_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  duration_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create course_lessons table
CREATE TABLE public.course_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  order_index INTEGER DEFAULT 0,
  duration_minutes INTEGER,
  is_free_preview BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX idx_course_modules_course_id ON public.course_modules(course_id);
CREATE INDEX idx_course_lessons_module_id ON public.course_lessons(module_id);
CREATE INDEX idx_course_modules_order ON public.course_modules(course_id, order_index);
CREATE INDEX idx_course_lessons_order ON public.course_lessons(module_id, order_index);

-- Enable RLS
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;

-- RLS policies for course_modules
-- Anyone can view modules (course content structure is public)
CREATE POLICY "Anyone can view course modules" ON public.course_modules
  FOR SELECT USING (true);

-- Only admins can manage modules
CREATE POLICY "Admins can manage course modules" ON public.course_modules
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- RLS policies for course_lessons
-- Anyone can view lessons (actual content access controlled in app)
CREATE POLICY "Anyone can view course lessons" ON public.course_lessons
  FOR SELECT USING (true);

-- Only admins can manage lessons
CREATE POLICY "Admins can manage course lessons" ON public.course_lessons
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Create updated_at trigger for course_modules
CREATE TRIGGER update_course_modules_updated_at
  BEFORE UPDATE ON public.course_modules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create updated_at trigger for course_lessons
CREATE TRIGGER update_course_lessons_updated_at
  BEFORE UPDATE ON public.course_lessons
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed sample content for existing courses
INSERT INTO public.course_modules (course_id, title, description, order_index, duration_minutes)
SELECT 
  c.id,
  'Introduction to ' || c.title,
  'Get started with the fundamentals of this course.',
  1,
  15
FROM public.courses c
WHERE c.active = true;

INSERT INTO public.course_modules (course_id, title, description, order_index, duration_minutes)
SELECT 
  c.id,
  'Core Concepts',
  'Deep dive into the essential concepts you need to know.',
  2,
  30
FROM public.courses c
WHERE c.active = true;

INSERT INTO public.course_modules (course_id, title, description, order_index, duration_minutes)
SELECT 
  c.id,
  'Practical Application',
  'Apply what you have learned with hands-on exercises.',
  3,
  45
FROM public.courses c
WHERE c.active = true;

INSERT INTO public.course_modules (course_id, title, description, order_index, duration_minutes)
SELECT 
  c.id,
  'Advanced Strategies',
  'Master advanced techniques for maximum protection.',
  4,
  30
FROM public.courses c
WHERE c.active = true;

-- Add sample lessons to each module
INSERT INTO public.course_lessons (module_id, title, content, order_index, duration_minutes, is_free_preview)
SELECT 
  m.id,
  'Welcome & Overview',
  'Welcome to this course! In this lesson, we will cover what you will learn and how to get the most out of this training.',
  1,
  5,
  true
FROM public.course_modules m
WHERE m.order_index = 1;

INSERT INTO public.course_lessons (module_id, title, content, order_index, duration_minutes)
SELECT 
  m.id,
  'Key Terminology',
  'Learn the important terms and concepts that will be used throughout this course.',
  2,
  10
FROM public.course_modules m
WHERE m.order_index = 1;