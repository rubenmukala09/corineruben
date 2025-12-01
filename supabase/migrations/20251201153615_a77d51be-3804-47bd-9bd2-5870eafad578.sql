CREATE INDEX idx_scam_user_id ON public.scam_submissions(user_id);
CREATE INDEX idx_scam_status ON public.scam_submissions(status);
CREATE INDEX idx_scam_created ON public.scam_submissions(created_at DESC);