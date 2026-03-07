
ALTER TABLE public.announcements 
  ADD COLUMN title_fr TEXT,
  ADD COLUMN title_es TEXT,
  ADD COLUMN content_fr TEXT,
  ADD COLUMN content_es TEXT;

-- Backfill: copy existing title/content as English defaults
UPDATE public.announcements SET title_fr = title, title_es = title, content_fr = content, content_es = content;
