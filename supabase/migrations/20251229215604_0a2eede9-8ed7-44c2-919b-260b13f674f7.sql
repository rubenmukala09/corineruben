-- ============================================
-- PHASE 3: Additional RLS Hardening (Fixed)
-- ============================================

-- Ensure testimonials_public view uses correct column (status instead of is_approved)
DROP VIEW IF EXISTS public.testimonials_public;
CREATE VIEW public.testimonials_public AS
SELECT 
  id,
  name,
  location,
  rating,
  story,
  created_at,
  has_video,
  has_image,
  primary_media_url
FROM public.testimonials
WHERE status = 'approved';

-- Grant access to the public view
GRANT SELECT ON public.testimonials_public TO anon, authenticated;

-- auth_audit_logs - Admin only
DROP POLICY IF EXISTS "Deny anon access" ON public.auth_audit_logs;
CREATE POLICY "Deny anon access" ON public.auth_audit_logs
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Admin can view audit_logs" ON public.auth_audit_logs;
CREATE POLICY "Admin can view audit_logs" ON public.auth_audit_logs
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- activity_log - Admin only
DROP POLICY IF EXISTS "Deny anon access" ON public.activity_log;
CREATE POLICY "Deny anon access" ON public.activity_log
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Admin can view activity_log" ON public.activity_log;
CREATE POLICY "Admin can view activity_log" ON public.activity_log
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- notifications - User can see own, admin all
DROP POLICY IF EXISTS "Deny anon access" ON public.notifications;
CREATE POLICY "Deny anon access" ON public.notifications
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Users view own notifications" ON public.notifications;
CREATE POLICY "Users view own notifications" ON public.notifications
FOR SELECT TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- caregiver_profiles - Restrict access
DROP POLICY IF EXISTS "Deny anon access" ON public.caregiver_profiles;
CREATE POLICY "Deny anon access" ON public.caregiver_profiles
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Users view own caregiver profile" ON public.caregiver_profiles;
CREATE POLICY "Users view own caregiver profile" ON public.caregiver_profiles
FOR ALL TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- developer_profiles - Restrict access
DROP POLICY IF EXISTS "Deny anon access" ON public.developer_profiles;
CREATE POLICY "Deny anon access" ON public.developer_profiles
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Users view own developer profile" ON public.developer_profiles;
CREATE POLICY "Users view own developer profile" ON public.developer_profiles
FOR ALL TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- analyst_profiles - Restrict access
DROP POLICY IF EXISTS "Deny anon access" ON public.analyst_profiles;
CREATE POLICY "Deny anon access" ON public.analyst_profiles
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Users view own analyst profile" ON public.analyst_profiles;
CREATE POLICY "Users view own analyst profile" ON public.analyst_profiles
FOR ALL TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- partners - Restrict access
DROP POLICY IF EXISTS "Deny anon access" ON public.partners;
CREATE POLICY "Deny anon access" ON public.partners
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Users view own partner profile" ON public.partners;
CREATE POLICY "Users view own partner profile" ON public.partners
FOR SELECT TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- partner_commissions - Restrict access
DROP POLICY IF EXISTS "Deny anon access" ON public.partner_commissions;
CREATE POLICY "Deny anon access" ON public.partner_commissions
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Partners view own commissions" ON public.partner_commissions;
CREATE POLICY "Partners view own commissions" ON public.partner_commissions
FOR SELECT TO authenticated
USING (
  partner_id IN (SELECT id FROM public.partners WHERE user_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

-- commission_payouts - Restrict access
DROP POLICY IF EXISTS "Deny anon access" ON public.commission_payouts;
CREATE POLICY "Deny anon access" ON public.commission_payouts
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Partners view own payouts" ON public.commission_payouts;
CREATE POLICY "Partners view own payouts" ON public.commission_payouts
FOR SELECT TO authenticated
USING (
  partner_id IN (SELECT id FROM public.partners WHERE user_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

-- subscriptions - User own, admin all
DROP POLICY IF EXISTS "Deny anon access" ON public.subscriptions;
CREATE POLICY "Deny anon access" ON public.subscriptions
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Users view own subscriptions" ON public.subscriptions;
CREATE POLICY "Users view own subscriptions" ON public.subscriptions
FOR SELECT TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- deals - Staff/admin only
DROP POLICY IF EXISTS "Deny anon access" ON public.deals;
CREATE POLICY "Deny anon access" ON public.deals
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Staff can manage deals" ON public.deals;
CREATE POLICY "Staff can manage deals" ON public.deals
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- events - Staff/admin only
DROP POLICY IF EXISTS "Deny anon access" ON public.events;
CREATE POLICY "Deny anon access" ON public.events
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Staff can manage events" ON public.events;
CREATE POLICY "Staff can manage events" ON public.events
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- bookings - Staff/admin only
DROP POLICY IF EXISTS "Deny anon access" ON public.bookings;
CREATE POLICY "Deny anon access" ON public.bookings
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Staff can manage bookings" ON public.bookings;
CREATE POLICY "Staff can manage bookings" ON public.bookings
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- appointments - Staff and assigned worker
DROP POLICY IF EXISTS "Deny anon access" ON public.appointments;
CREATE POLICY "Deny anon access" ON public.appointments
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Staff can manage appointments" ON public.appointments;
CREATE POLICY "Staff can manage appointments" ON public.appointments
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- client_requests - Staff/admin only
DROP POLICY IF EXISTS "Deny anon access" ON public.client_requests;
CREATE POLICY "Deny anon access" ON public.client_requests
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Staff can manage client_requests" ON public.client_requests;
CREATE POLICY "Staff can manage client_requests" ON public.client_requests
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));

-- client_communications - Staff/admin only
DROP POLICY IF EXISTS "Deny anon access" ON public.client_communications;
CREATE POLICY "Deny anon access" ON public.client_communications
FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Staff can manage client_communications" ON public.client_communications;
CREATE POLICY "Staff can manage client_communications" ON public.client_communications
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'staff'));