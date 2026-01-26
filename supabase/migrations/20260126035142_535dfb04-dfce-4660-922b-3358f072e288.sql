
-- Fix Security Definer View warnings by setting views to SECURITY INVOKER
-- This ensures views respect the querying user's RLS policies

ALTER VIEW public.workers_safe SET (security_invoker = true);
ALTER VIEW public.testimonials_staff SET (security_invoker = true);
ALTER VIEW public.testimonials_public SET (security_invoker = true);
