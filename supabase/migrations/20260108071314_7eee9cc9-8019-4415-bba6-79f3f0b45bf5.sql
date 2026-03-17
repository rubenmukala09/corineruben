-- Create storage bucket for digital products (books, guides, etc.)
INSERT INTO storage.buckets (id, name, public)
VALUES ('digital-products', 'digital-products', false)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for digital products bucket
CREATE POLICY "Admin can upload digital products"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'digital-products' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admin can update digital products"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'digital-products' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admin can delete digital products"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'digital-products' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Authenticated users can download purchased products"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'digital-products');

-- Create admin_audit_logs table for tracking admin actions
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID NOT NULL,
  action_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS on admin_audit_logs
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
ON public.admin_audit_logs FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can insert audit logs
CREATE POLICY "Admins can create audit logs"
ON public.admin_audit_logs FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create dashboard_health table for monitoring page connectivity
CREATE TABLE IF NOT EXISTS public.dashboard_health (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_name TEXT NOT NULL UNIQUE,
  dashboard_url TEXT NOT NULL,
  status TEXT DEFAULT 'healthy' CHECK (status IN ('healthy', 'degraded', 'offline')),
  last_check TIMESTAMPTZ DEFAULT now(),
  response_time_ms INTEGER,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS on dashboard_health
ALTER TABLE public.dashboard_health ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can view health status
CREATE POLICY "Authenticated users can view dashboard health"
ON public.dashboard_health FOR SELECT
TO authenticated
USING (true);

-- Only admins can modify health records
CREATE POLICY "Admins can manage dashboard health"
ON public.dashboard_health FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Insert initial dashboard health records
INSERT INTO public.dashboard_health (dashboard_name, dashboard_url, status) VALUES
  ('Admin Dashboard', '/admin', 'healthy'),
  ('Client Dashboard', '/client-portal', 'healthy'),
  ('Portal Dashboard', '/portal', 'healthy'),
  ('Security Dashboard', '/admin/security', 'healthy')
ON CONFLICT (dashboard_name) DO NOTHING;

-- Add file_url column to products table for digital products if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'products' 
    AND column_name = 'file_url'
  ) THEN
    ALTER TABLE public.products ADD COLUMN file_url TEXT;
  END IF;
END $$;

-- Add cover_image_url column to products table if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'products' 
    AND column_name = 'cover_image_url'
  ) THEN
    ALTER TABLE public.products ADD COLUMN cover_image_url TEXT;
  END IF;
END $$;

-- Add product_type column to products table if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'products' 
    AND column_name = 'product_type'
  ) THEN
    ALTER TABLE public.products ADD COLUMN product_type TEXT DEFAULT 'physical' CHECK (product_type IN ('physical', 'digital', 'book', 'subscription'));
  END IF;
END $$;

-- Create function to log admin actions
CREATE OR REPLACE FUNCTION public.log_admin_action(
  p_action_type TEXT,
  p_entity_type TEXT,
  p_entity_id TEXT DEFAULT NULL,
  p_details JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_log_id UUID;
BEGIN
  -- Verify caller is admin
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can log admin actions';
  END IF;

  INSERT INTO admin_audit_logs (
    admin_user_id,
    action_type,
    entity_type,
    entity_id,
    details
  ) VALUES (
    auth.uid(),
    p_action_type,
    p_entity_type,
    p_entity_id,
    p_details
  )
  RETURNING id INTO v_log_id;

  RETURN v_log_id;
END;
$$;

-- Create trigger to update dashboard_health updated_at
CREATE OR REPLACE FUNCTION public.update_dashboard_health_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_dashboard_health_timestamp ON public.dashboard_health;
CREATE TRIGGER update_dashboard_health_timestamp
BEFORE UPDATE ON public.dashboard_health
FOR EACH ROW
EXECUTE FUNCTION public.update_dashboard_health_updated_at();