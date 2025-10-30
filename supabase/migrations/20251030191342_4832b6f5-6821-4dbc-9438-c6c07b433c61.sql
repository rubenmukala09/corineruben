-- Add status column to website_inquiries for better workflow management
ALTER TABLE public.website_inquiries
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'archived'));

-- Add veteran verification fields to job_applications
ALTER TABLE public.job_applications
ADD COLUMN IF NOT EXISTS is_veteran BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS veteran_document_url TEXT,
ADD COLUMN IF NOT EXISTS availability TEXT;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_website_inquiries_status ON public.website_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_veteran ON public.job_applications(is_veteran) WHERE is_veteran = TRUE;