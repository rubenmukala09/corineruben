-- Create enrollment table to restrict zoom link exposure to enrolled users only
CREATE TABLE public.zoom_class_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES public.zoom_classes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (class_id, user_id)
);

-- Enable RLS on enrollments table
ALTER TABLE public.zoom_class_enrollments ENABLE ROW LEVEL SECURITY;

-- Indexes for performance
CREATE INDEX idx_zoom_class_enrollments_user_id ON public.zoom_class_enrollments(user_id);
CREATE INDEX idx_zoom_class_enrollments_class_id ON public.zoom_class_enrollments(class_id);

-- Admins manage enrollments
CREATE POLICY "Admins can manage zoom_class_enrollments"
ON public.zoom_class_enrollments
AS RESTRICTIVE
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Users can view their own enrollments (read-only)
CREATE POLICY "Users can view their own enrollments"
ON public.zoom_class_enrollments
AS RESTRICTIVE
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Remove overly-permissive policy that exposed all zoom links
DROP POLICY IF EXISTS "Authenticated users can view zoom classes" ON public.zoom_classes;

-- Allow only admins and enrolled users to view class rows (and thus zoom_link)
CREATE POLICY "Users can view enrolled zoom classes"
ON public.zoom_classes
AS RESTRICTIVE
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.zoom_class_enrollments e
    WHERE e.class_id = id AND e.user_id = auth.uid()
  )
);
