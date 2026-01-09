-- Change entity_id from uuid to text for flexibility
ALTER TABLE public.activity_log ALTER COLUMN entity_id TYPE text USING entity_id::text;