-- Fix subscribers table: Change admin policies from RESTRICTIVE to PERMISSIVE
-- RESTRICTIVE policies only filter access, they don't grant it
-- Need PERMISSIVE policies to actually grant access to admins

DROP POLICY IF EXISTS "Admins can manage subscribers" ON public.subscribers;
DROP POLICY IF EXISTS "Admins can view all subscribers" ON public.subscribers;
DROP POLICY IF EXISTS "Public can insert subscribers" ON public.subscribers;

-- Admin SELECT policy (PERMISSIVE to grant access)
CREATE POLICY "Admins can view all subscribers"
ON public.subscribers
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin ALL policy (PERMISSIVE to grant full access)
CREATE POLICY "Admins can manage subscribers"
ON public.subscribers
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Public INSERT for newsletter signups (PERMISSIVE)
CREATE POLICY "Public can insert subscribers"
ON public.subscribers
FOR INSERT
TO public
WITH CHECK (true);

-- Fix zoom_classes table: Change policies from RESTRICTIVE to PERMISSIVE
DROP POLICY IF EXISTS "Admins can manage zoom classes" ON public.zoom_classes;
DROP POLICY IF EXISTS "Users can view enrolled zoom classes" ON public.zoom_classes;

-- Admin can see and manage all classes (PERMISSIVE)
CREATE POLICY "Admins can manage zoom classes"
ON public.zoom_classes
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Enrolled users can see their classes (PERMISSIVE)
CREATE POLICY "Users can view enrolled zoom classes"
ON public.zoom_classes
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.zoom_class_enrollments e
    WHERE e.class_id = public.zoom_classes.id
      AND e.user_id = auth.uid()
  )
);

-- Fix zoom_class_enrollments policies too
DROP POLICY IF EXISTS "Admins can manage zoom_class_enrollments" ON public.zoom_class_enrollments;
DROP POLICY IF EXISTS "Users can view their own enrollments" ON public.zoom_class_enrollments;

CREATE POLICY "Admins can manage zoom_class_enrollments"
ON public.zoom_class_enrollments
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own enrollments"
ON public.zoom_class_enrollments
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
