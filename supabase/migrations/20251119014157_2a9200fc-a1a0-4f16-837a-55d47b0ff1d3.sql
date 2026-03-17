-- Enable realtime for critical tables
ALTER TABLE public.testimonials REPLICA IDENTITY FULL;
ALTER TABLE public.booking_requests REPLICA IDENTITY FULL;
ALTER TABLE public.website_inquiries REPLICA IDENTITY FULL;
ALTER TABLE public.partner_orders REPLICA IDENTITY FULL;
ALTER TABLE public.articles REPLICA IDENTITY FULL;
ALTER TABLE public.job_applications REPLICA IDENTITY FULL;

-- Add indexes for frequently queried fields
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON public.testimonials(status);
CREATE INDEX IF NOT EXISTS idx_booking_requests_status ON public.booking_requests(status);
CREATE INDEX IF NOT EXISTS idx_website_inquiries_status ON public.website_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_partner_orders_created_at ON public.partner_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles(created_at DESC);