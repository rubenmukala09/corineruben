-- Add display_location column to testimonials table
ALTER TABLE public.testimonials 
ADD COLUMN IF NOT EXISTS display_location text DEFAULT 'home';

-- Add comment for documentation
COMMENT ON COLUMN public.testimonials.display_location IS 'Where to display the testimonial: home, services, about, all';