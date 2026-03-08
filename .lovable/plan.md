

## Debug Analysis: Full System Health Check

### Critical Issue: Missing Database Tables

The root cause of all build errors is that **two database tables referenced in code do not exist**: `guestbook` and `photos`. The auto-generated `types.ts` doesn't include them, causing TypeScript to reject all queries against these tables.

Additionally, the `Gallery.tsx` page references a `wedding-photos` storage bucket that doesn't exist (only `site-images` exists).

### Plan

**1. Create the `guestbook` table with RLS policies**

```sql
CREATE TABLE public.guestbook (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  message text NOT NULL,
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved entries
CREATE POLICY "Anyone can view approved guestbook entries"
  ON public.guestbook FOR SELECT USING (approved = true);

-- Anyone can insert (submit a message)
CREATE POLICY "Anyone can insert guestbook entries"
  ON public.guestbook FOR INSERT WITH CHECK (true);

-- Authenticated users can update (approve/manage)
CREATE POLICY "Authenticated users can update guestbook"
  ON public.guestbook FOR UPDATE USING (auth.role() = 'authenticated');

-- Authenticated users can delete
CREATE POLICY "Authenticated users can delete guestbook"
  ON public.guestbook FOR DELETE USING (auth.role() = 'authenticated');
```

**2. Create the `photos` table with RLS policies**

```sql
CREATE TABLE public.photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  uploader_name text NOT NULL,
  storage_path text NOT NULL,
  public_url text NOT NULL,
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved photos"
  ON public.photos FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can insert photos"
  ON public.photos FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update photos"
  ON public.photos FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete photos"
  ON public.photos FOR DELETE USING (auth.role() = 'authenticated');
```

**3. Create the `wedding-photos` storage bucket**

The Gallery page uploads to a `wedding-photos` bucket that doesn't exist. Need to create it as a public bucket so uploaded photos can be viewed.

**4. No code changes needed**

The existing `Guestbook.tsx` and `Gallery.tsx` code is correct — it just needs the backing tables and storage bucket to exist. Once the migration runs, `types.ts` will auto-regenerate with the new tables and all build errors will resolve.

### Summary of Issues Found

| Issue | Severity | Fix |
|-------|----------|-----|
| Missing `guestbook` table | Build-breaking | Create via migration |
| Missing `photos` table | Build-breaking | Create via migration |
| Missing `wedding-photos` storage bucket | Runtime error on upload | Create bucket |
| Console warning: `GoldenCorners` missing `forwardRef` | Non-breaking (warning) | Low priority, not causing errors |

