-- ============================================
-- PHASE 1: Lock Down All Sensitive Tables
-- ============================================

-- 1. contacts - Block anon, restrict to staff/admin
DROP POLICY IF EXISTS "Deny anon access" ON public.contacts;
CREATE POLICY "Deny anon access" ON public.contacts
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Staff can view contacts" ON public.contacts;
CREATE POLICY "Staff can view contacts" ON public.contacts
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

DROP POLICY IF EXISTS "Staff can manage contacts" ON public.contacts;
CREATE POLICY "Staff can manage contacts" ON public.contacts
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- 2. scheduled_emails - Block anon, restrict to admin only
DROP POLICY IF EXISTS "Deny anon access" ON public.scheduled_emails;
CREATE POLICY "Deny anon access" ON public.scheduled_emails
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Admin can manage scheduled_emails" ON public.scheduled_emails;
CREATE POLICY "Admin can manage scheduled_emails" ON public.scheduled_emails
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 3. buyers - Block anon, restrict to staff/admin
DROP POLICY IF EXISTS "Deny anon access" ON public.buyers;
CREATE POLICY "Deny anon access" ON public.buyers
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Staff can view buyers" ON public.buyers;
CREATE POLICY "Staff can view buyers" ON public.buyers
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff') OR auth.uid() = user_id);

-- 4. invoices - Block anon, restrict to staff/admin
DROP POLICY IF EXISTS "Deny anon access" ON public.invoices;
CREATE POLICY "Deny anon access" ON public.invoices
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Staff can manage invoices" ON public.invoices;
CREATE POLICY "Staff can manage invoices" ON public.invoices
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- 5. donations - Block anon SELECT but allow INSERT for donation forms
DROP POLICY IF EXISTS "Deny anon select on donations" ON public.donations;
CREATE POLICY "Deny anon select on donations" ON public.donations
FOR SELECT TO anon USING (false);

DROP POLICY IF EXISTS "Allow public donation insert" ON public.donations;
CREATE POLICY "Allow public donation insert" ON public.donations
FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can view donations" ON public.donations;
CREATE POLICY "Staff can view donations" ON public.donations
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- 6. service_intake_requests - Block anon SELECT, allow INSERT
DROP POLICY IF EXISTS "Deny anon select on service_intake" ON public.service_intake_requests;
CREATE POLICY "Deny anon select on service_intake" ON public.service_intake_requests
FOR SELECT TO anon USING (false);

DROP POLICY IF EXISTS "Allow public service intake insert" ON public.service_intake_requests;
CREATE POLICY "Allow public service intake insert" ON public.service_intake_requests
FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can view service_intake" ON public.service_intake_requests;
CREATE POLICY "Staff can view service_intake" ON public.service_intake_requests
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- 7. website_inquiries - Block anon SELECT, allow INSERT
DROP POLICY IF EXISTS "Deny anon select on inquiries" ON public.website_inquiries;
CREATE POLICY "Deny anon select on inquiries" ON public.website_inquiries
FOR SELECT TO anon USING (false);

DROP POLICY IF EXISTS "Allow public inquiry insert" ON public.website_inquiries;
CREATE POLICY "Allow public inquiry insert" ON public.website_inquiries
FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can view inquiries" ON public.website_inquiries;
CREATE POLICY "Staff can view inquiries" ON public.website_inquiries
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- 8. clients - Block anon, restrict to staff/admin
DROP POLICY IF EXISTS "Deny anon access" ON public.clients;
CREATE POLICY "Deny anon access" ON public.clients
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Staff can manage clients" ON public.clients;
CREATE POLICY "Staff can manage clients" ON public.clients
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- 9. service_inquiries - Block anon SELECT, allow INSERT
DROP POLICY IF EXISTS "Deny anon select on service_inquiries" ON public.service_inquiries;
CREATE POLICY "Deny anon select on service_inquiries" ON public.service_inquiries
FOR SELECT TO anon USING (false);

DROP POLICY IF EXISTS "Allow public service inquiry insert" ON public.service_inquiries;
CREATE POLICY "Allow public service inquiry insert" ON public.service_inquiries
FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can view service_inquiries" ON public.service_inquiries;
CREATE POLICY "Staff can view service_inquiries" ON public.service_inquiries
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- 10. companies - Block anon, restrict to staff/admin
DROP POLICY IF EXISTS "Deny anon access" ON public.companies;
CREATE POLICY "Deny anon access" ON public.companies
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Staff can manage companies" ON public.companies;
CREATE POLICY "Staff can manage companies" ON public.companies
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- 11. workers - Block anon, restrict appropriately
DROP POLICY IF EXISTS "Deny anon access" ON public.workers;
CREATE POLICY "Deny anon access" ON public.workers
FOR ALL TO anon USING (false);

-- 12. booking_requests - Block anon SELECT, allow INSERT
DROP POLICY IF EXISTS "Deny anon select on booking_requests" ON public.booking_requests;
CREATE POLICY "Deny anon select on booking_requests" ON public.booking_requests
FOR SELECT TO anon USING (false);

-- 13. scam_submissions - Block anon SELECT, allow INSERT
DROP POLICY IF EXISTS "Deny anon select on scam_submissions" ON public.scam_submissions;
CREATE POLICY "Deny anon select on scam_submissions" ON public.scam_submissions
FOR SELECT TO anon USING (false);

DROP POLICY IF EXISTS "Allow public scam submission insert" ON public.scam_submissions;
CREATE POLICY "Allow public scam submission insert" ON public.scam_submissions
FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can view scam_submissions" ON public.scam_submissions;
CREATE POLICY "Staff can view scam_submissions" ON public.scam_submissions
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- 14. onboarding_responses - Block anon, restrict to staff/admin
DROP POLICY IF EXISTS "Deny anon access" ON public.onboarding_responses;
CREATE POLICY "Deny anon access" ON public.onboarding_responses
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Staff can manage onboarding" ON public.onboarding_responses;
CREATE POLICY "Staff can manage onboarding" ON public.onboarding_responses
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff') OR auth.uid() = user_id)
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff') OR auth.uid() = user_id);

-- 15. ai_insurance_purchases - Block anon SELECT, allow INSERT
DROP POLICY IF EXISTS "Deny anon select on ai_insurance" ON public.ai_insurance_purchases;
CREATE POLICY "Deny anon select on ai_insurance" ON public.ai_insurance_purchases
FOR SELECT TO anon USING (false);

DROP POLICY IF EXISTS "Allow public insurance purchase insert" ON public.ai_insurance_purchases;
CREATE POLICY "Allow public insurance purchase insert" ON public.ai_insurance_purchases
FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can view ai_insurance" ON public.ai_insurance_purchases;
CREATE POLICY "Staff can view ai_insurance" ON public.ai_insurance_purchases
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff') OR auth.uid() = user_id);

-- 16. purchase_requests - Block anon SELECT, allow INSERT
DROP POLICY IF EXISTS "Deny anon select on purchase_requests" ON public.purchase_requests;
CREATE POLICY "Deny anon select on purchase_requests" ON public.purchase_requests
FOR SELECT TO anon USING (false);

DROP POLICY IF EXISTS "Allow public purchase request insert" ON public.purchase_requests;
CREATE POLICY "Allow public purchase request insert" ON public.purchase_requests
FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can view purchase_requests" ON public.purchase_requests;
CREATE POLICY "Staff can view purchase_requests" ON public.purchase_requests
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- 17. profiles - Strengthen existing policies
DROP POLICY IF EXISTS "Deny anon access" ON public.profiles;
CREATE POLICY "Deny anon access" ON public.profiles
FOR ALL TO anon USING (false);

-- 18. job_applications - Block anon SELECT, allow INSERT
DROP POLICY IF EXISTS "Deny anon select on job_applications" ON public.job_applications;
CREATE POLICY "Deny anon select on job_applications" ON public.job_applications
FOR SELECT TO anon USING (false);

DROP POLICY IF EXISTS "Allow public job application insert" ON public.job_applications;
CREATE POLICY "Allow public job application insert" ON public.job_applications
FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can view job_applications" ON public.job_applications;
CREATE POLICY "Staff can view job_applications" ON public.job_applications
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- ============================================
-- PHASE 2: Simplify Overlapping RLS Policies
-- ============================================

-- Clean up user_roles (7 policies -> 3)
DROP POLICY IF EXISTS "Prevent direct role assignment from clients" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can modify roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can view all roles" ON public.user_roles;

-- Ensure consolidated policies exist
DROP POLICY IF EXISTS "Users view own role" ON public.user_roles;
CREATE POLICY "Users view own role" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins manage all roles" ON public.user_roles;
CREATE POLICY "Admins manage all roles" ON public.user_roles
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Deny anon on user_roles" ON public.user_roles;
CREATE POLICY "Deny anon on user_roles" ON public.user_roles
FOR ALL TO anon USING (false);

-- Clean up workers duplicate policies
DROP POLICY IF EXISTS "Only admins and staff can view workers" ON public.workers;

-- ============================================
-- PHASE 5: HIPAA-Safe Form Validation
-- ============================================

-- Create input sanitization function
CREATE OR REPLACE FUNCTION public.sanitize_pii_input()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Sanitize phone to valid characters only
  IF NEW.phone IS NOT NULL THEN
    NEW.phone := regexp_replace(NEW.phone, '[^0-9+\-() ]', '', 'g');
  END IF;
  
  -- Validate email format if present
  IF NEW.email IS NOT NULL AND NEW.email != '' AND 
     NEW.email !~ '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Truncate extremely long text fields to prevent abuse
  IF NEW.message IS NOT NULL AND length(NEW.message) > 10000 THEN
    NEW.message := substring(NEW.message, 1, 10000);
  END IF;
  
  IF NEW.notes IS NOT NULL AND length(NEW.notes) > 10000 THEN
    NEW.notes := substring(NEW.notes, 1, 10000);
  END IF;
  
  RETURN NEW;
END;
$$;

-- Apply sanitization triggers to form tables
DROP TRIGGER IF EXISTS sanitize_booking_requests ON public.booking_requests;
CREATE TRIGGER sanitize_booking_requests
  BEFORE INSERT OR UPDATE ON public.booking_requests
  FOR EACH ROW EXECUTE FUNCTION public.sanitize_pii_input();

DROP TRIGGER IF EXISTS sanitize_website_inquiries ON public.website_inquiries;
CREATE TRIGGER sanitize_website_inquiries
  BEFORE INSERT OR UPDATE ON public.website_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.sanitize_pii_input();

DROP TRIGGER IF EXISTS sanitize_service_inquiries ON public.service_inquiries;
CREATE TRIGGER sanitize_service_inquiries
  BEFORE INSERT OR UPDATE ON public.service_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.sanitize_pii_input();

DROP TRIGGER IF EXISTS sanitize_donations ON public.donations;
CREATE TRIGGER sanitize_donations
  BEFORE INSERT OR UPDATE ON public.donations
  FOR EACH ROW EXECUTE FUNCTION public.sanitize_pii_input();

DROP TRIGGER IF EXISTS sanitize_job_applications ON public.job_applications;
CREATE TRIGGER sanitize_job_applications
  BEFORE INSERT OR UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.sanitize_pii_input();

DROP TRIGGER IF EXISTS sanitize_clients ON public.clients;
CREATE TRIGGER sanitize_clients
  BEFORE INSERT OR UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.sanitize_pii_input();