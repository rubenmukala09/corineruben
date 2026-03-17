-- Phase 2: Add notification deletion policy
CREATE POLICY "Users can delete their notifications"
ON public.notifications FOR DELETE TO authenticated
USING (auth.uid() = user_id);

-- Phase 3: Create 2FA settings table with encrypted secrets
CREATE TABLE public.user_2fa_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  encrypted_totp_secret TEXT,
  backup_codes TEXT[] DEFAULT '{}',
  is_enabled BOOLEAN NOT NULL DEFAULT false,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on 2FA settings
ALTER TABLE public.user_2fa_settings ENABLE ROW LEVEL SECURITY;

-- Users can only view their own 2FA settings
CREATE POLICY "Users can view their own 2FA settings"
ON public.user_2fa_settings FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own 2FA settings
CREATE POLICY "Users can insert their own 2FA settings"
ON public.user_2fa_settings FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own 2FA settings
CREATE POLICY "Users can update their own 2FA settings"
ON public.user_2fa_settings FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own 2FA settings
CREATE POLICY "Users can delete their own 2FA settings"
ON public.user_2fa_settings FOR DELETE TO authenticated
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_user_2fa_settings_updated_at
BEFORE UPDATE ON public.user_2fa_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();