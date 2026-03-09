

# Sync & Clean Up: Resources, Reader, and Payment Flow

## Issues Found

1. **Duplicate book catalog**: `Resources.tsx` has its own 300-line `staticBooks` array + 30 individual image imports + local `BookItem` type + local `BOOK_AUTHOR` constant — all duplicating `src/config/bookCatalog.ts` which already has the canonical `BOOK_CATALOG`.

2. **PaymentSuccess.tsx still says "Download ready"**: Lines 89-101 show a `Download` icon with "Download ready" and "Check your email for download links" — contradicts the read-online model. Also still uses `framer-motion`.

3. **Resources stats outdated**: Line 661 says `"15+ Security Products"` — there are no physical products anymore, this should say `"30+ Digital Guides"` or similar.

4. **Resources SEO description** (line 570) still says "physical security products."

5. **Resources hero text** (line 589) says "tools, and products" — should align with digital-only.

6. **RefundPolicy.tsx** (line 66) says "downloadable guides" — minor but should say "digital guides."

7. **BookReader.tsx duplicates image imports**: 30 image imports that could use the `BOOK_CATALOG` images directly via lookup.

## Plan

### 1. Resources.tsx — Use centralized catalog, fix copy
- **Delete** the 300-line `staticBooks` array, local `BookItem` type, local `BOOK_AUTHOR`, and all 30 image imports
- **Import** `BOOK_CATALOG` and `BookItem` from `@/config/bookCatalog`
- Replace all `staticBooks` references with `BOOK_CATALOG`
- Fix stats: `"15+ Security Products"` → `"30+ Expert Guides"`
- Fix SEO description: remove "physical security products"
- Fix hero subtitle: "tools, and products" → "tools, and guides"

### 2. PaymentSuccess.tsx — Fix "Download ready" + remove framer-motion
- Replace `Download` icon with `BookOpen`
- Change "Download ready" → "Access ID sent"
- Change "Check your email for download links" → "Check your email for your Access ID to start reading"
- Change "Arriving in 2-5 minutes" → "Your Access ID will arrive in 2-5 minutes"
- Remove "Shipping in 1-3 business days" (no physical products)
- Replace all `motion.*` elements with plain HTML + CSS `animate-fade-in`/`animate-scale-in`

### 3. BookReader.tsx — Use centralized catalog images
- Remove all 30 individual image imports
- Replace `bookImageMap` with a lookup from `BOOK_CATALOG` (which already has `.image` and `.name`)
- Keep `BOOK_CONTENT` for the 3 books with hand-written chapters; derive generic chapters from catalog data for the rest

### 4. RefundPolicy.tsx — Minor copy fix
- "downloadable guides" → "digital guides"

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/Resources.tsx` | Remove duplicate catalog, use `BOOK_CATALOG`, fix stats/SEO/hero copy |
| `src/components/payment/PaymentSuccess.tsx` | Fix download references, remove framer-motion |
| `src/pages/BookReader.tsx` | Remove 30 image imports, use `BOOK_CATALOG` for image lookup |
| `src/pages/RefundPolicy.tsx` | "downloadable" → "digital" |

