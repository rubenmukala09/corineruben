-- Enable realtime for booking and purchase requests
ALTER PUBLICATION supabase_realtime ADD TABLE public.booking_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.purchase_requests;