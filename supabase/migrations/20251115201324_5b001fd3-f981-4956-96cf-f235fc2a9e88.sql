-- Phase 1: Email Automation System Tables

-- Email Templates Table
CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  html_body TEXT NOT NULL,
  text_body TEXT,
  template_variables JSONB DEFAULT '[]'::jsonb,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Email Campaigns Table
CREATE TABLE IF NOT EXISTS public.email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  template_id UUID REFERENCES public.email_templates(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  schedule_type TEXT NOT NULL CHECK (schedule_type IN ('one-time', 'recurring')),
  schedule_config JSONB,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'active', 'paused', 'completed')),
  sent_count INTEGER DEFAULT 0,
  open_rate NUMERIC(5,2),
  click_rate NUMERIC(5,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_sent_at TIMESTAMPTZ
);

-- Scheduled Emails Table
CREATE TABLE IF NOT EXISTS public.scheduled_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES public.email_templates(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES public.email_campaigns(id) ON DELETE SET NULL,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  template_data JSONB DEFAULT '{}'::jsonb,
  scheduled_for TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')),
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  error_message TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Email Delivery Logs Table
CREATE TABLE IF NOT EXISTS public.email_delivery_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scheduled_email_id UUID REFERENCES public.scheduled_emails(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES public.email_campaigns(id) ON DELETE SET NULL,
  recipient_email TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained', 'failed')),
  provider_message_id TEXT,
  delivered_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  bounced BOOLEAN DEFAULT false,
  complained BOOLEAN DEFAULT false,
  error_details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Campaign Recipients Table
CREATE TABLE IF NOT EXISTS public.campaign_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.email_campaigns(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'opened', 'clicked', 'bounced')),
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(campaign_id, recipient_email)
);

-- Add featured and display_order to testimonials
ALTER TABLE public.testimonials 
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Enable RLS
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_delivery_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_recipients ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can manage email templates"
  ON public.email_templates FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage email campaigns"
  ON public.email_campaigns FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view scheduled emails"
  ON public.scheduled_emails FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view delivery logs"
  ON public.email_delivery_logs FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage campaign recipients"
  ON public.campaign_recipients FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert 7 Pre-built Email Templates
INSERT INTO public.email_templates (name, subject, html_body, text_body, category, template_variables) VALUES
(
  'Booking Confirmation',
  'Your Service Request has been Received - {{request_number}}',
  '<h1>Thank You for Your Request!</h1>
  <p>Dear {{customer_name}},</p>
  <p>We have received your request for <strong>{{service_name}}</strong>.</p>
  <p><strong>Request Number:</strong> {{request_number}}</p>
  <p><strong>Service Type:</strong> {{service_type}}</p>
  <p>Our team will review your request and contact you within 24-48 hours to schedule your service.</p>
  <p>If you have any questions, please don''t hesitate to reach out.</p>
  <p>Best regards,<br>InVision Elders Team</p>',
  'Thank you for your request! Request #{{request_number}} for {{service_name}} has been received. We will contact you within 24-48 hours.',
  'transactional',
  '["customer_name", "service_name", "request_number", "service_type"]'
),
(
  'Newsletter Welcome',
  'Welcome to InVision Elders Newsletter',
  '<h1>Welcome to Our Community!</h1>
  <p>Thank you for subscribing to the InVision Elders newsletter.</p>
  <p>You''ll receive updates about:</p>
  <ul>
    <li>Elder care tips and resources</li>
    <li>Training opportunities</li>
    <li>Community events</li>
    <li>Special offers and promotions</li>
  </ul>
  <p>Stay connected with us!</p>',
  'Welcome to InVision Elders! Thank you for subscribing. You will receive updates about elder care, training, and community events.',
  'newsletter',
  '[]'
),
(
  'Testimonial Thank You',
  'Thank You for Sharing Your Story',
  '<h1>Thank You!</h1>
  <p>Dear {{customer_name}},</p>
  <p>Thank you for taking the time to share your experience with InVision Elders.</p>
  <p>Your testimonial helps us improve our services and helps other families make informed decisions.</p>
  <p>We truly appreciate your trust in us.</p>
  <p>Warm regards,<br>InVision Elders Team</p>',
  'Thank you {{customer_name}} for sharing your story with InVision Elders. Your feedback helps us serve families better.',
  'transactional',
  '["customer_name"]'
),
(
  'Monthly Newsletter',
  'InVision Elders Monthly Update - {{month}}',
  '<h1>Monthly Newsletter</h1>
  <p>Dear Subscriber,</p>
  <p>Here''s what''s happening this month at InVision Elders:</p>
  {{content}}
  <p>Stay tuned for more updates!</p>',
  'InVision Elders Monthly Update for {{month}}',
  'newsletter',
  '["month", "content"]'
),
(
  'Service Reminder',
  'Upcoming Service Appointment Reminder',
  '<h1>Service Reminder</h1>
  <p>Dear {{customer_name}},</p>
  <p>This is a reminder about your upcoming appointment:</p>
  <p><strong>Service:</strong> {{service_name}}</p>
  <p><strong>Date:</strong> {{appointment_date}}</p>
  <p><strong>Time:</strong> {{appointment_time}}</p>
  <p>Please call us if you need to reschedule.</p>',
  'Reminder: Your {{service_name}} appointment is scheduled for {{appointment_date}} at {{appointment_time}}.',
  'transactional',
  '["customer_name", "service_name", "appointment_date", "appointment_time"]'
),
(
  'Training Enrollment Confirmation',
  'Welcome to {{course_name}}',
  '<h1>Training Enrollment Confirmed</h1>
  <p>Dear {{student_name}},</p>
  <p>You are now enrolled in <strong>{{course_name}}</strong>.</p>
  <p><strong>Start Date:</strong> {{start_date}}</p>
  <p><strong>Duration:</strong> {{duration}}</p>
  <p>We look forward to seeing you in class!</p>',
  'You are enrolled in {{course_name}}. Start date: {{start_date}}. Duration: {{duration}}.',
  'transactional',
  '["student_name", "course_name", "start_date", "duration"]'
),
(
  'Job Application Received',
  'Application Received for {{position}}',
  '<h1>Application Received</h1>
  <p>Dear {{applicant_name}},</p>
  <p>Thank you for applying for the <strong>{{position}}</strong> position at InVision Elders.</p>
  <p>We have received your application and will review it carefully. If your qualifications match our needs, we will contact you for an interview.</p>
  <p>Thank you for your interest in joining our team!</p>',
  'Thank you {{applicant_name}} for applying to {{position}}. We will review your application and contact you if selected for an interview.',
  'transactional',
  '["applicant_name", "position"]'
);

-- Create trigger function to schedule booking confirmation emails
CREATE OR REPLACE FUNCTION public.schedule_booking_confirmation_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  template_record RECORD;
BEGIN
  -- Get the booking confirmation template
  SELECT id INTO template_record FROM public.email_templates 
  WHERE name = 'Booking Confirmation' AND is_active = true LIMIT 1;
  
  IF template_record.id IS NOT NULL THEN
    -- Schedule the email
    INSERT INTO public.scheduled_emails (
      template_id,
      recipient_email,
      recipient_name,
      template_data,
      scheduled_for,
      status
    ) VALUES (
      template_record.id,
      NEW.email,
      NEW.full_name,
      jsonb_build_object(
        'customer_name', NEW.full_name,
        'service_name', NEW.service_name,
        'request_number', NEW.request_number,
        'service_type', NEW.service_type
      ),
      now(),
      'pending'
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for booking confirmations
DROP TRIGGER IF EXISTS trigger_booking_confirmation_email ON public.booking_requests;
CREATE TRIGGER trigger_booking_confirmation_email
  AFTER INSERT ON public.booking_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.schedule_booking_confirmation_email();

-- Create trigger function to schedule newsletter welcome emails
CREATE OR REPLACE FUNCTION public.schedule_newsletter_welcome_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  template_record RECORD;
BEGIN
  -- Get the newsletter welcome template
  SELECT id INTO template_record FROM public.email_templates 
  WHERE name = 'Newsletter Welcome' AND is_active = true LIMIT 1;
  
  IF template_record.id IS NOT NULL THEN
    -- Schedule the email
    INSERT INTO public.scheduled_emails (
      template_id,
      recipient_email,
      template_data,
      scheduled_for,
      status
    ) VALUES (
      template_record.id,
      NEW.email,
      '{}'::jsonb,
      now(),
      'pending'
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for newsletter subscriptions
DROP TRIGGER IF EXISTS trigger_newsletter_welcome_email ON public.newsletter_subscribers;
CREATE TRIGGER trigger_newsletter_welcome_email
  AFTER INSERT ON public.newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION public.schedule_newsletter_welcome_email();

-- Create trigger function to schedule testimonial thank you emails
CREATE OR REPLACE FUNCTION public.schedule_testimonial_thank_you_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  template_record RECORD;
BEGIN
  -- Get the testimonial thank you template
  SELECT id INTO template_record FROM public.email_templates 
  WHERE name = 'Testimonial Thank You' AND is_active = true LIMIT 1;
  
  IF template_record.id IS NOT NULL THEN
    -- Schedule the email
    INSERT INTO public.scheduled_emails (
      template_id,
      recipient_email,
      recipient_name,
      template_data,
      scheduled_for,
      status
    ) VALUES (
      template_record.id,
      NEW.email,
      NEW.name,
      jsonb_build_object('customer_name', NEW.name),
      now(),
      'pending'
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for testimonials
DROP TRIGGER IF EXISTS trigger_testimonial_thank_you_email ON public.testimonials;
CREATE TRIGGER trigger_testimonial_thank_you_email
  AFTER INSERT ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION public.schedule_testimonial_thank_you_email();

-- Update timestamps trigger
CREATE OR REPLACE FUNCTION public.update_email_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_email_templates_updated_at
  BEFORE UPDATE ON public.email_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_email_updated_at();

CREATE TRIGGER update_email_campaigns_updated_at
  BEFORE UPDATE ON public.email_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_email_updated_at();