-- Insert cybersecurity service packages with partner_id
INSERT INTO public.products (
  name,
  slug,
  description,
  base_price,
  product_type,
  status,
  sku,
  stock_quantity,
  images,
  tags,
  is_featured,
  partner_id
) VALUES 
(
  'Basic Family Shield',
  'basic-family-shield',
  'AI Call Blocking & SMS Filter - Protect your family from scam calls and phishing texts with intelligent AI-powered filtering.',
  9.99,
  'subscription',
  'active',
  'SVC-BFS-001',
  9999,
  '["https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800"]'::jsonb,
  ARRAY['cybersecurity', 'family', 'protection', 'ai', 'subscription'],
  true,
  'd4017742-4eae-4e8d-91d3-75388fdd302c'
),
(
  'Senior Watchdog Plus',
  'senior-watchdog-plus',
  '24/7 Identity Monitoring & Financial Alerts - Comprehensive monitoring for seniors including identity theft protection and real-time financial alerts.',
  19.99,
  'subscription',
  'active',
  'SVC-SWP-002',
  9999,
  '["https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800"]'::jsonb,
  ARRAY['cybersecurity', 'seniors', 'identity', 'monitoring', 'subscription'],
  true,
  'd4017742-4eae-4e8d-91d3-75388fdd302c'
),
(
  'Total Home Fortress',
  'total-home-fortress',
  'Complete Network Security & Data Recovery - Enterprise-grade protection for your entire home network with automatic backup and data recovery services.',
  49.99,
  'subscription',
  'active',
  'SVC-THF-003',
  9999,
  '["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800"]'::jsonb,
  ARRAY['cybersecurity', 'network', 'enterprise', 'recovery', 'subscription'],
  true,
  'd4017742-4eae-4e8d-91d3-75388fdd302c'
);