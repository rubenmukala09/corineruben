-- Add length constraints to critical user input tables for security

-- website_inquiries table (Contact form)
ALTER TABLE public.website_inquiries 
  ADD CONSTRAINT check_name_length CHECK (char_length(name) <= 100),
  ADD CONSTRAINT check_email_length CHECK (char_length(email) <= 255),
  ADD CONSTRAINT check_message_length CHECK (char_length(message) <= 1000),
  ADD CONSTRAINT check_subject_length CHECK (subject IS NULL OR char_length(subject) <= 200),
  ADD CONSTRAINT check_phone_length CHECK (phone IS NULL OR char_length(phone) <= 20);

-- profiles table (User registration)
ALTER TABLE public.profiles
  ADD CONSTRAINT check_first_name_length CHECK (first_name IS NULL OR char_length(first_name) <= 50),
  ADD CONSTRAINT check_last_name_length CHECK (last_name IS NULL OR char_length(last_name) <= 50),
  ADD CONSTRAINT check_username_length CHECK (username IS NULL OR char_length(username) <= 50),
  ADD CONSTRAINT check_profile_email_length CHECK (email IS NULL OR char_length(email) <= 255),
  ADD CONSTRAINT check_profile_phone_length CHECK (phone IS NULL OR char_length(phone) <= 20);

-- booking_requests table
ALTER TABLE public.booking_requests
  ADD CONSTRAINT check_booking_full_name_length CHECK (char_length(full_name) <= 100),
  ADD CONSTRAINT check_booking_email_length CHECK (char_length(email) <= 255),
  ADD CONSTRAINT check_booking_phone_length CHECK (phone IS NULL OR char_length(phone) <= 20),
  ADD CONSTRAINT check_booking_message_length CHECK (message IS NULL OR char_length(message) <= 1000),
  ADD CONSTRAINT check_service_name_length CHECK (char_length(service_name) <= 200),
  ADD CONSTRAINT check_positive_prices CHECK (base_price IS NULL OR base_price >= 0),
  ADD CONSTRAINT check_discount_valid CHECK (discount_amount IS NULL OR discount_amount >= 0),
  ADD CONSTRAINT check_final_price_positive CHECK (final_price IS NULL OR final_price >= 0);

-- purchase_requests table  
ALTER TABLE public.purchase_requests
  ADD CONSTRAINT check_purchase_full_name_length CHECK (char_length(full_name) <= 100),
  ADD CONSTRAINT check_purchase_email_length CHECK (char_length(email) <= 255),
  ADD CONSTRAINT check_purchase_phone_length CHECK (phone IS NULL OR char_length(phone) <= 20),
  ADD CONSTRAINT check_purchase_message_length CHECK (message IS NULL OR char_length(message) <= 1000),
  ADD CONSTRAINT check_item_name_length CHECK (char_length(item_name) <= 200),
  ADD CONSTRAINT check_purchase_positive_prices CHECK (customer_price IS NULL OR customer_price >= 0),
  ADD CONSTRAINT check_purchase_quantity CHECK (quantity > 0);

-- job_applications table
ALTER TABLE public.job_applications
  ADD CONSTRAINT check_applicant_name_length CHECK (char_length(name) <= 100),
  ADD CONSTRAINT check_applicant_email_length CHECK (char_length(email) <= 255),
  ADD CONSTRAINT check_applicant_phone_length CHECK (char_length(phone) <= 20),
  ADD CONSTRAINT check_position_length CHECK (char_length(position) <= 100),
  ADD CONSTRAINT check_cover_letter_length CHECK (char_length(cover_letter) <= 2000);