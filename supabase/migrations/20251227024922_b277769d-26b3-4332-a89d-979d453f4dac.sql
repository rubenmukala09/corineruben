-- Create service_intake_requests table for high-ticket service inquiries
CREATE TABLE public.service_intake_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  request_number TEXT NOT NULL DEFAULT generate_request_number(),
  
  -- Contact Information
  full_name TEXT NOT NULL,
  company_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  
  -- Service Details
  service_type TEXT NOT NULL, -- 'ai-agents', 'website-design', 'ai-tools', 'ai-insurance'
  agent_type TEXT, -- 'customer-support', 'sales-booking', 'operations-admin'
  plan_selected TEXT NOT NULL,
  
  -- AI Agents specific fields
  preferred_channels TEXT[] DEFAULT '{}',
  current_tools TEXT[] DEFAULT '{}',
  
  -- Website Design specific fields
  website_type TEXT,
  pages_needed TEXT[] DEFAULT '{}',
  has_branding BOOLEAN DEFAULT false,
  branding_upload_url TEXT,
  add_ons TEXT[] DEFAULT '{}',
  
  -- Requirements
  description TEXT,
  timeline TEXT, -- 'asap', '2-4-weeks', '1-2-months', 'flexible'
  budget_confirmed BOOLEAN DEFAULT false,
  
  -- Legal Agreements
  agreed_tos BOOLEAN DEFAULT false,
  agreed_privacy BOOLEAN DEFAULT false,
  agreed_ai_disclaimer BOOLEAN DEFAULT false,
  agreed_onboarding BOOLEAN DEFAULT false,
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'proposal', 'closed', 'archived'
  admin_notes TEXT,
  assigned_to UUID,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID
);

-- Create onboarding_responses table for post-purchase questionnaires
CREATE TABLE public.onboarding_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  
  -- Questionnaire fields
  main_goal TEXT,
  problem_to_solve TEXT,
  timeline TEXT,
  current_tools TEXT,
  team_size TEXT,
  preferred_communication TEXT,
  security_compliance_needs TEXT,
  
  -- Confirmation
  acknowledged_verification BOOLEAN DEFAULT false,
  
  -- Status
  status TEXT DEFAULT 'pending', -- 'pending', 'reviewed', 'completed'
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ai_insurance_purchases table
CREATE TABLE public.ai_insurance_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  
  -- Product details
  coverage_tier TEXT NOT NULL, -- 'basic', 'plus', 'premium'
  billing_cycle TEXT NOT NULL, -- 'monthly', 'yearly'
  amount NUMERIC NOT NULL,
  
  -- Payment
  stripe_payment_id TEXT,
  stripe_subscription_id TEXT,
  payment_status TEXT DEFAULT 'pending',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.service_intake_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_insurance_purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies for service_intake_requests
CREATE POLICY "Anyone can create intake requests" 
  ON public.service_intake_requests 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view their own intake requests" 
  ON public.service_intake_requests 
  FOR SELECT 
  USING (email = current_setting('request.jwt.claims', true)::json->>'email' OR auth.uid() = user_id);

CREATE POLICY "Admins can view all intake requests" 
  ON public.service_intake_requests 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can update intake requests" 
  ON public.service_intake_requests 
  FOR UPDATE 
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- RLS Policies for onboarding_responses
CREATE POLICY "Anyone can create onboarding responses" 
  ON public.onboarding_responses 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view their own onboarding responses" 
  ON public.onboarding_responses 
  FOR SELECT 
  USING (email = current_setting('request.jwt.claims', true)::json->>'email' OR auth.uid() = user_id);

CREATE POLICY "Admins can view all onboarding responses" 
  ON public.onboarding_responses 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can update onboarding responses" 
  ON public.onboarding_responses 
  FOR UPDATE 
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- RLS Policies for ai_insurance_purchases
CREATE POLICY "Anyone can create insurance purchases" 
  ON public.ai_insurance_purchases 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view their own insurance purchases" 
  ON public.ai_insurance_purchases 
  FOR SELECT 
  USING (email = current_setting('request.jwt.claims', true)::json->>'email' OR auth.uid() = user_id);

CREATE POLICY "Admins can view all insurance purchases" 
  ON public.ai_insurance_purchases 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

CREATE POLICY "Admins can update insurance purchases" 
  ON public.ai_insurance_purchases 
  FOR UPDATE 
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- Create triggers for updated_at
CREATE TRIGGER update_service_intake_requests_updated_at
  BEFORE UPDATE ON public.service_intake_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_onboarding_responses_updated_at
  BEFORE UPDATE ON public.onboarding_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ai_insurance_purchases_updated_at
  BEFORE UPDATE ON public.ai_insurance_purchases
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();