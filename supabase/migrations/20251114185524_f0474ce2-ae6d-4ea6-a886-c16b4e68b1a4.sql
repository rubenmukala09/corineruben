-- RLS policies for verification_codes (admins only)
CREATE POLICY "Admins can manage verification codes"
ON public.verification_codes
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for password_reset_tokens (admins only)
CREATE POLICY "Admins can manage reset tokens"
ON public.password_reset_tokens
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));