-- =============================================================================
-- SECURITY HARDENING: Block anonymous access with RESTRICTIVE policies
-- =============================================================================

-- 1. CONTACTS TABLE
DROP POLICY IF EXISTS "Deny anon access to contacts" ON public.contacts;
CREATE POLICY "Block anon select contacts" ON public.contacts AS RESTRICTIVE FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon insert contacts" ON public.contacts AS RESTRICTIVE FOR INSERT TO anon WITH CHECK (false);
CREATE POLICY "Block anon update contacts" ON public.contacts AS RESTRICTIVE FOR UPDATE TO anon USING (false);
CREATE POLICY "Block anon delete contacts" ON public.contacts AS RESTRICTIVE FOR DELETE TO anon USING (false);

-- 2. SCHEDULED_EMAILS TABLE
DROP POLICY IF EXISTS "Deny anon access to scheduled_emails" ON public.scheduled_emails;
CREATE POLICY "Block anon select scheduled_emails" ON public.scheduled_emails AS RESTRICTIVE FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon insert scheduled_emails" ON public.scheduled_emails AS RESTRICTIVE FOR INSERT TO anon WITH CHECK (false);
CREATE POLICY "Block anon update scheduled_emails" ON public.scheduled_emails AS RESTRICTIVE FOR UPDATE TO anon USING (false);
CREATE POLICY "Block anon delete scheduled_emails" ON public.scheduled_emails AS RESTRICTIVE FOR DELETE TO anon USING (false);

-- 3. TESTIMONIALS TABLE
DROP POLICY IF EXISTS "Deny anon select on testimonials" ON public.testimonials;
CREATE POLICY "Block anon select testimonials" ON public.testimonials AS RESTRICTIVE FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon update testimonials" ON public.testimonials AS RESTRICTIVE FOR UPDATE TO anon USING (false);
CREATE POLICY "Block anon delete testimonials" ON public.testimonials AS RESTRICTIVE FOR DELETE TO anon USING (false);

-- 4. DONATIONS TABLE
DROP POLICY IF EXISTS "Deny anon select on donations" ON public.donations;
CREATE POLICY "Block anon select donations" ON public.donations AS RESTRICTIVE FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon update donations" ON public.donations AS RESTRICTIVE FOR UPDATE TO anon USING (false);
CREATE POLICY "Block anon delete donations" ON public.donations AS RESTRICTIVE FOR DELETE TO anon USING (false);

-- 5. WEBSITE_INQUIRIES TABLE
DROP POLICY IF EXISTS "Deny anon select on website_inquiries" ON public.website_inquiries;
CREATE POLICY "Block anon select website_inquiries" ON public.website_inquiries AS RESTRICTIVE FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon update website_inquiries" ON public.website_inquiries AS RESTRICTIVE FOR UPDATE TO anon USING (false);
CREATE POLICY "Block anon delete website_inquiries" ON public.website_inquiries AS RESTRICTIVE FOR DELETE TO anon USING (false);

-- 6. CLIENTS TABLE
DROP POLICY IF EXISTS "Deny anon access to clients" ON public.clients;
CREATE POLICY "Block anon select clients" ON public.clients AS RESTRICTIVE FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon insert clients" ON public.clients AS RESTRICTIVE FOR INSERT TO anon WITH CHECK (false);
CREATE POLICY "Block anon update clients" ON public.clients AS RESTRICTIVE FOR UPDATE TO anon USING (false);
CREATE POLICY "Block anon delete clients" ON public.clients AS RESTRICTIVE FOR DELETE TO anon USING (false);

-- 7. SERVICE_INQUIRIES TABLE
DROP POLICY IF EXISTS "Deny anon select on service_inquiries" ON public.service_inquiries;
CREATE POLICY "Block anon select service_inquiries" ON public.service_inquiries AS RESTRICTIVE FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon update service_inquiries" ON public.service_inquiries AS RESTRICTIVE FOR UPDATE TO anon USING (false);
CREATE POLICY "Block anon delete service_inquiries" ON public.service_inquiries AS RESTRICTIVE FOR DELETE TO anon USING (false);

-- 8. SCAM_SUBMISSIONS TABLE
DROP POLICY IF EXISTS "Deny anon select on scam_submissions" ON public.scam_submissions;
CREATE POLICY "Block anon select scam_submissions" ON public.scam_submissions AS RESTRICTIVE FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon update scam_submissions" ON public.scam_submissions AS RESTRICTIVE FOR UPDATE TO anon USING (false);
CREATE POLICY "Block anon delete scam_submissions" ON public.scam_submissions AS RESTRICTIVE FOR DELETE TO anon USING (false);

-- 9. JOB_APPLICATIONS TABLE
DROP POLICY IF EXISTS "Deny anon select on job_applications" ON public.job_applications;
CREATE POLICY "Block anon select job_applications" ON public.job_applications AS RESTRICTIVE FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon update job_applications" ON public.job_applications AS RESTRICTIVE FOR UPDATE TO anon USING (false);
CREATE POLICY "Block anon delete job_applications" ON public.job_applications AS RESTRICTIVE FOR DELETE TO anon USING (false);

-- 10. SERVICE_INTAKE_REQUESTS TABLE
DROP POLICY IF EXISTS "Deny anon select on service_intake_requests" ON public.service_intake_requests;
CREATE POLICY "Block anon select service_intake_requests" ON public.service_intake_requests AS RESTRICTIVE FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon update service_intake_requests" ON public.service_intake_requests AS RESTRICTIVE FOR UPDATE TO anon USING (false);
CREATE POLICY "Block anon delete service_intake_requests" ON public.service_intake_requests AS RESTRICTIVE FOR DELETE TO anon USING (false);

-- 11. ONBOARDING_RESPONSES TABLE
DROP POLICY IF EXISTS "Deny anon select on onboarding_responses" ON public.onboarding_responses;
DROP POLICY IF EXISTS "Deny anon access to onboarding_responses" ON public.onboarding_responses;
CREATE POLICY "Block anon select onboarding_responses" ON public.onboarding_responses AS RESTRICTIVE FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon update onboarding_responses" ON public.onboarding_responses AS RESTRICTIVE FOR UPDATE TO anon USING (false);
CREATE POLICY "Block anon delete onboarding_responses" ON public.onboarding_responses AS RESTRICTIVE FOR DELETE TO anon USING (false);

-- 12. AI_INSURANCE_PURCHASES TABLE
DROP POLICY IF EXISTS "Deny anon select on ai_insurance_purchases" ON public.ai_insurance_purchases;
CREATE POLICY "Block anon select ai_insurance_purchases" ON public.ai_insurance_purchases AS RESTRICTIVE FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon update ai_insurance_purchases" ON public.ai_insurance_purchases AS RESTRICTIVE FOR UPDATE TO anon USING (false);
CREATE POLICY "Block anon delete ai_insurance_purchases" ON public.ai_insurance_purchases AS RESTRICTIVE FOR DELETE TO anon USING (false);

-- 13. PURCHASE_REQUESTS TABLE
DROP POLICY IF EXISTS "Deny anon select on purchase_requests" ON public.purchase_requests;
CREATE POLICY "Block anon select purchase_requests" ON public.purchase_requests AS RESTRICTIVE FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon update purchase_requests" ON public.purchase_requests AS RESTRICTIVE FOR UPDATE TO anon USING (false);
CREATE POLICY "Block anon delete purchase_requests" ON public.purchase_requests AS RESTRICTIVE FOR DELETE TO anon USING (false);

-- 14. BOOKING_REQUESTS TABLE
DROP POLICY IF EXISTS "Deny anon select on booking_requests" ON public.booking_requests;
CREATE POLICY "Block anon select booking_requests" ON public.booking_requests AS RESTRICTIVE FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon update booking_requests" ON public.booking_requests AS RESTRICTIVE FOR UPDATE TO anon USING (false);
CREATE POLICY "Block anon delete booking_requests" ON public.booking_requests AS RESTRICTIVE FOR DELETE TO anon USING (false);

-- 15. WORKERS TABLE
DROP POLICY IF EXISTS "Deny anon access to workers" ON public.workers;
CREATE POLICY "Block anon select workers" ON public.workers AS RESTRICTIVE FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon insert workers" ON public.workers AS RESTRICTIVE FOR INSERT TO anon WITH CHECK (false);
CREATE POLICY "Block anon update workers" ON public.workers AS RESTRICTIVE FOR UPDATE TO anon USING (false);
CREATE POLICY "Block anon delete workers" ON public.workers AS RESTRICTIVE FOR DELETE TO anon USING (false);

-- 16. PROFILES TABLE
DROP POLICY IF EXISTS "Deny anon access to profiles" ON public.profiles;
DROP POLICY IF EXISTS "Deny public access to profiles" ON public.profiles;
CREATE POLICY "Block anon select profiles" ON public.profiles AS RESTRICTIVE FOR SELECT TO anon USING (false);
CREATE POLICY "Block anon insert profiles" ON public.profiles AS RESTRICTIVE FOR INSERT TO anon WITH CHECK (false);
CREATE POLICY "Block anon update profiles" ON public.profiles AS RESTRICTIVE FOR UPDATE TO anon USING (false);
CREATE POLICY "Block anon delete profiles" ON public.profiles AS RESTRICTIVE FOR DELETE TO anon USING (false);