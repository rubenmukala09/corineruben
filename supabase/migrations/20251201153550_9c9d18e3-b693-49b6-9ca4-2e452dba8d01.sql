CREATE TABLE IF NOT EXISTS public.scam_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_number TEXT NOT NULL UNIQUE,
  user_id UUID,
  submitter_name TEXT NOT NULL,
  submitter_email TEXT NOT NULL,
  submitter_phone TEXT,
  submission_type TEXT NOT NULL,
  suspicious_content TEXT NOT NULL,
  sender_info TEXT,
  urgency TEXT NOT NULL,
  risk_level TEXT,
  ai_confidence NUMERIC,
  threats_detected TEXT[],
  recommendations TEXT[],
  analysis_summary TEXT,
  attachments TEXT[],
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.scam_submissions ENABLE ROW LEVEL SECURITY;