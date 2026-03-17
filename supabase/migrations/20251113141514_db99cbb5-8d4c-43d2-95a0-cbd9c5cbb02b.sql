-- Drop existing policies on zoom_classes
DROP POLICY IF EXISTS "Admins can manage zoom classes" ON public.zoom_classes;
DROP POLICY IF EXISTS "Users can view enrolled zoom classes" ON public.zoom_classes;

-- Recreate policies with explicit authentication requirement
CREATE POLICY "Admins can manage zoom classes" 
ON public.zoom_classes
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view enrolled zoom classes" 
ON public.zoom_classes
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM zoom_class_enrollments e
    WHERE e.class_id = zoom_classes.id
    AND e.user_id = auth.uid()
  )
);