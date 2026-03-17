-- =============================================================================
-- ADD POLICIES for invoices, appointments, email_campaigns, analytics tables
-- =============================================================================

-- INVOICES TABLE - Customer can view own invoices (via contact_id)
DROP POLICY IF EXISTS "Customers can view own invoices" ON public.invoices;
CREATE POLICY "Customers can view own invoices" ON public.invoices FOR SELECT TO authenticated 
USING (
  contact_id IN (
    SELECT id FROM public.contacts WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
  OR public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'staff'::app_role)
);

-- APPOINTMENTS TABLE - Clients can view own appointments
DROP POLICY IF EXISTS "Clients can view own appointments" ON public.appointments;
CREATE POLICY "Clients can view own appointments" ON public.appointments FOR SELECT TO authenticated 
USING (
  client_id IN (
    SELECT id FROM public.clients WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
  OR public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'staff'::app_role)
);

-- EMAIL_CAMPAIGNS TABLE - Staff can view
DROP POLICY IF EXISTS "Staff can view email campaigns" ON public.email_campaigns;
CREATE POLICY "Staff can view email campaigns" ON public.email_campaigns FOR SELECT TO authenticated 
USING (
  public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'staff'::app_role)
);

-- PAGE_VIEWS TABLE - Staff can view analytics
DROP POLICY IF EXISTS "Staff can view page_views" ON public.page_views;
CREATE POLICY "Staff can view page_views" ON public.page_views FOR SELECT TO authenticated 
USING (
  public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'staff'::app_role)
);

-- USER_SESSIONS TABLE - Staff can view
DROP POLICY IF EXISTS "Staff can view user_sessions" ON public.user_sessions;
CREATE POLICY "Staff can view user_sessions" ON public.user_sessions FOR SELECT TO authenticated 
USING (
  public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'staff'::app_role)
);

-- CONVERSION_EVENTS TABLE - Staff can view
DROP POLICY IF EXISTS "Staff can view conversion_events" ON public.conversion_events;
CREATE POLICY "Staff can view conversion_events" ON public.conversion_events FOR SELECT TO authenticated 
USING (
  public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'staff'::app_role)
);

-- TRAFFIC_SOURCES TABLE - Staff can view
DROP POLICY IF EXISTS "Staff can view traffic_sources" ON public.traffic_sources;
CREATE POLICY "Staff can view traffic_sources" ON public.traffic_sources FOR SELECT TO authenticated 
USING (
  public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'staff'::app_role)
);

-- FUNNEL_STEPS TABLE - Staff can view
DROP POLICY IF EXISTS "Staff can view funnel_steps" ON public.funnel_steps;
CREATE POLICY "Staff can view funnel_steps" ON public.funnel_steps FOR SELECT TO authenticated 
USING (
  public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'staff'::app_role)
);