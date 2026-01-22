-- Move pg_net extension to dedicated extensions schema
-- First, create extensions schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS extensions;

-- Grant usage on extensions schema to necessary roles
GRANT USAGE ON SCHEMA extensions TO postgres, anon, authenticated, service_role;

-- Note: Moving extensions requires dropping and recreating them
-- This is safe for pg_net as it's a background worker extension
DROP EXTENSION IF EXISTS pg_net;
CREATE EXTENSION pg_net SCHEMA extensions;

-- Fix overly permissive RLS policies on clients table
-- Drop the permissive policies that allow any authenticated user
DROP POLICY IF EXISTS "Allow authenticated users to delete clients" ON public.clients;
DROP POLICY IF EXISTS "Allow authenticated users to insert clients" ON public.clients;
DROP POLICY IF EXISTS "Allow authenticated users to update clients" ON public.clients;

-- Create proper role-based policies for clients table
CREATE POLICY "Admin and staff can insert clients" 
ON public.clients 
FOR INSERT 
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role) OR 
  public.has_role(auth.uid(), 'staff'::app_role) OR
  public.has_role(auth.uid(), 'secretary'::app_role)
);

CREATE POLICY "Admin and staff can update clients" 
ON public.clients 
FOR UPDATE 
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR 
  public.has_role(auth.uid(), 'staff'::app_role) OR
  public.has_role(auth.uid(), 'secretary'::app_role)
)
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role) OR 
  public.has_role(auth.uid(), 'staff'::app_role) OR
  public.has_role(auth.uid(), 'secretary'::app_role)
);

CREATE POLICY "Admin and staff can delete clients" 
ON public.clients 
FOR DELETE 
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR 
  public.has_role(auth.uid(), 'staff'::app_role)
);

-- Fix overly permissive RLS policies on testimonials table
-- Drop the permissive policies that allow any authenticated user
DROP POLICY IF EXISTS "Staff can delete testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Staff can update testimonials" ON public.testimonials;

-- Create proper role-based policies for testimonials table
CREATE POLICY "Admin and staff can update testimonials" 
ON public.testimonials 
FOR UPDATE 
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR 
  public.has_role(auth.uid(), 'staff'::app_role) OR
  public.has_role(auth.uid(), 'support_specialist'::app_role)
)
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role) OR 
  public.has_role(auth.uid(), 'staff'::app_role) OR
  public.has_role(auth.uid(), 'support_specialist'::app_role)
);

CREATE POLICY "Admin and staff can delete testimonials" 
ON public.testimonials 
FOR DELETE 
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role) OR 
  public.has_role(auth.uid(), 'staff'::app_role)
);