-- Add assigned_to column for dispatcher workflow
ALTER TABLE public.booking_requests 
ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES public.profiles(id);