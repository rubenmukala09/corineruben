-- Add veteran_id_url and veteran discount tracking to partner_orders
ALTER TABLE partner_orders 
  ADD COLUMN IF NOT EXISTS veteran_id_url TEXT,
  ADD COLUMN IF NOT EXISTS veteran_discount_applied BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS veteran_discount_amount DECIMAL(10,2) DEFAULT 0;

-- Add comment for documentation
COMMENT ON COLUMN partner_orders.veteran_id_url IS 'Path to veteran ID document in veteran-docs storage bucket';
COMMENT ON COLUMN partner_orders.veteran_discount_applied IS 'Whether veteran discount was applied to this order';
COMMENT ON COLUMN partner_orders.veteran_discount_amount IS 'Amount of veteran discount in dollars';
