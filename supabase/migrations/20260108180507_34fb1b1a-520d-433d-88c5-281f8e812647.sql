-- Phase 1: Database fixes (corrected)

-- 1.1 Delete all products except the 3 cybersecurity services
DELETE FROM public.products 
WHERE name NOT LIKE '%Family Shield%' 
  AND name NOT LIKE '%Watchdog%' 
  AND name NOT LIKE '%Fortress%';

-- 1.2 Add RLS policies for admin access to profiles
DROP POLICY IF EXISTS "Allow authenticated users to read profiles" ON public.profiles;
CREATE POLICY "Allow authenticated users to read profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated 
USING (true);

-- Add RLS policy for user_roles
DROP POLICY IF EXISTS "Allow authenticated users to read user_roles" ON public.user_roles;
CREATE POLICY "Allow authenticated users to read user_roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated 
USING (true);

-- Add RLS policy for clients table
DROP POLICY IF EXISTS "Allow authenticated users to read clients" ON public.clients;
CREATE POLICY "Allow authenticated users to read clients" 
ON public.clients 
FOR SELECT 
TO authenticated 
USING (true);

-- Add INSERT/UPDATE/DELETE policies for clients (admin operations)
DROP POLICY IF EXISTS "Allow authenticated users to insert clients" ON public.clients;
CREATE POLICY "Allow authenticated users to insert clients" 
ON public.clients 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to update clients" ON public.clients;
CREATE POLICY "Allow authenticated users to update clients" 
ON public.clients 
FOR UPDATE 
TO authenticated 
USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to delete clients" ON public.clients;
CREATE POLICY "Allow authenticated users to delete clients" 
ON public.clients 
FOR DELETE 
TO authenticated 
USING (true);