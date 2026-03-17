-- Digital Library System: books, book_content, access_ids, purchases, update_logs
-- Merges with existing book_purchases table; new tables use UUID PKs for consistency

-- -----------------------------------------------------------------------
-- books
-- -----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.books (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text UNIQUE NOT NULL,
  title         text NOT NULL,
  subtitle      text,
  description   text NOT NULL,
  cover_image   text,
  total_pages   integer NOT NULL DEFAULT 140,
  price         numeric(10,2) NOT NULL,
  bulk_price    numeric(10,2),          -- price per copy when buying 5+
  stripe_price_id text,
  category      text NOT NULL DEFAULT 'cybersecurity',
  author        text NOT NULL DEFAULT 'InVision Network • Department of Literature',
  tag           text,
  is_published  boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Books are publicly readable"
  ON public.books FOR SELECT TO anon, authenticated USING (is_published = true);

CREATE POLICY "Admins can manage books"
  ON public.books FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- -----------------------------------------------------------------------
-- book_content
-- -----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.book_content (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id         uuid NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  chapter_number  integer NOT NULL,
  chapter_title   text NOT NULL,
  content_html    text NOT NULL DEFAULT '',
  page_start      integer NOT NULL DEFAULT 1,
  page_end        integer NOT NULL DEFAULT 10,
  last_ai_update  timestamptz,
  updated_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (book_id, chapter_number)
);

ALTER TABLE public.book_content ENABLE ROW LEVEL SECURITY;

-- Chapter content only visible to users who have purchased the book OR admins
CREATE POLICY "Purchasers can read book content"
  ON public.book_content FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin')
    OR EXISTS (
      SELECT 1 FROM public.book_purchases bp
      WHERE bp.customer_email = auth.email()
        AND book_id::text = ANY(bp.book_ids)
    )
    OR EXISTS (
      SELECT 1 FROM public.access_ids ai
      WHERE ai.book_id = book_content.book_id
        AND ai.assigned_to_email = auth.email()
        AND ai.status = 'assigned'
    )
  );

-- Allow reading first chapter (preview) publicly
CREATE POLICY "First chapter is public preview"
  ON public.book_content FOR SELECT TO anon
  USING (chapter_number = 1);

CREATE POLICY "Admins can manage book content"
  ON public.book_content FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- -----------------------------------------------------------------------
-- access_ids  (pre-generated codes for bulk orders / gifting)
-- -----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.access_ids (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id           uuid NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  access_code       text UNIQUE NOT NULL,
  status            text NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'assigned', 'revoked')),
  assigned_to_email text,
  assigned_at       timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.access_ids ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage access codes"
  ON public.access_ids FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own access codes"
  ON public.access_ids FOR SELECT TO authenticated
  USING (assigned_to_email = auth.email());

-- -----------------------------------------------------------------------
-- purchases  (complements existing book_purchases; tracks per-book orders)
-- -----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.purchases (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email       text NOT NULL,
  book_id          uuid NOT NULL REFERENCES public.books(id) ON DELETE RESTRICT,
  access_id        uuid REFERENCES public.access_ids(id),
  purchase_type    text NOT NULL DEFAULT 'single' CHECK (purchase_type IN ('single', 'bulk')),
  quantity         integer NOT NULL DEFAULT 1,
  amount_paid      numeric(10,2),
  payment_status   text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
  stripe_session_id text,
  created_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own purchases"
  ON public.purchases FOR SELECT TO authenticated
  USING (user_email = auth.email() OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can insert purchases"
  ON public.purchases FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Admins can manage purchases"
  ON public.purchases FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- -----------------------------------------------------------------------
-- update_logs  (AI-driven content update history)
-- -----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.update_logs (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id          uuid NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  chapter_id       uuid REFERENCES public.book_content(id) ON DELETE SET NULL,
  changes_summary  text NOT NULL,
  updated_by       text NOT NULL DEFAULT 'ai',   -- 'ai' | admin email
  updated_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.update_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view update logs"
  ON public.update_logs FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can insert update logs"
  ON public.update_logs FOR INSERT TO service_role WITH CHECK (true);

-- -----------------------------------------------------------------------
-- updated_at auto-trigger
-- -----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_books_updated_at'
  ) THEN
    CREATE TRIGGER set_books_updated_at
      BEFORE UPDATE ON public.books
      FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_book_content_updated_at'
  ) THEN
    CREATE TRIGGER set_book_content_updated_at
      BEFORE UPDATE ON public.book_content
      FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
  END IF;
END;
$$;

-- -----------------------------------------------------------------------
-- Indexes
-- -----------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_books_slug         ON public.books(slug);
CREATE INDEX IF NOT EXISTS idx_books_category     ON public.books(category);
CREATE INDEX IF NOT EXISTS idx_book_content_book  ON public.book_content(book_id, chapter_number);
CREATE INDEX IF NOT EXISTS idx_access_ids_code    ON public.access_ids(access_code);
CREATE INDEX IF NOT EXISTS idx_access_ids_email   ON public.access_ids(assigned_to_email);
CREATE INDEX IF NOT EXISTS idx_purchases_email    ON public.purchases(user_email);
CREATE INDEX IF NOT EXISTS idx_purchases_book     ON public.purchases(book_id);
CREATE INDEX IF NOT EXISTS idx_update_logs_book   ON public.update_logs(book_id, updated_at DESC);
