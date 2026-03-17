-- Fix sanitize_pii_input function to handle both 'message' and 'requirements' columns
-- Some tables use 'message', others use 'requirements' for text content

CREATE OR REPLACE FUNCTION public.sanitize_pii_input()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  column_exists boolean;
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
  
  -- Check and truncate 'message' field if it exists on the record
  BEGIN
    IF NEW.message IS NOT NULL AND length(NEW.message) > 10000 THEN
      NEW.message := substring(NEW.message, 1, 10000);
    END IF;
  EXCEPTION WHEN undefined_column THEN
    -- Column doesn't exist on this table, skip
    NULL;
  END;
  
  -- Check and truncate 'requirements' field if it exists on the record
  BEGIN
    IF NEW.requirements IS NOT NULL AND length(NEW.requirements) > 10000 THEN
      NEW.requirements := substring(NEW.requirements, 1, 10000);
    END IF;
  EXCEPTION WHEN undefined_column THEN
    -- Column doesn't exist on this table, skip
    NULL;
  END;
  
  -- Check and truncate 'notes' field if it exists on the record
  BEGIN
    IF NEW.notes IS NOT NULL AND length(NEW.notes) > 10000 THEN
      NEW.notes := substring(NEW.notes, 1, 10000);
    END IF;
  EXCEPTION WHEN undefined_column THEN
    -- Column doesn't exist on this table, skip
    NULL;
  END;
  
  RETURN NEW;
END;
$function$;