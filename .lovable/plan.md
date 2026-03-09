

# Enhanced Book Reader System

## Overview

The current BookReader page is a basic chapter viewer with minimal features. This plan upgrades it into a polished, feature-rich reading experience with day/night/dimmed modes, an internal library with 5% discount purchasing, book recommendations, a "Request a Book" feature, and shareable external reading links.

## Changes

### 1. Reading Mode Toggle (Day / Night / Dimmed)

Add a reading mode switcher to the reader toolbar with three modes:
- **Day**: White/cream background, dark text (default)
- **Night**: Dark navy/black background, light text
- **Dimmed**: Warm sepia/amber tone, reduced contrast

Implemented as local state with CSS classes applied to the reader container. Persisted in `localStorage` so users keep their preference.

### 2. Enhanced Reader UI

Upgrade the reader content area:
- Adjustable font size (small / medium / large)
- Reading progress bar at the top
- Estimated reading time per chapter
- Smooth scroll-to-top on chapter change
- Bookmark current position (stored in sessionStorage)

### 3. Internal Library (Browse & Buy with 5% Discount)

Add a "Library" tab/section within the reader dashboard (the book selection view) that shows ALL 30 books from the catalog — not just purchased ones. Unpurchased books show a "Buy" button with a **5% discount** badge (vs. external Resources page pricing). Clicking "Buy" opens a payment flow within the reader context.

This requires:
- Displaying the full `staticBooks` catalog inside the reader
- Marking owned vs. unowned books
- Showing discounted price: `price * 0.95`
- A purchase button that invokes the existing checkout flow

### 4. Book Recommendations

On the library/dashboard view, add a "Recommended for You" section that suggests books based on what the user already owns (e.g., if they own "AI Fundamentals," recommend "Deepfake Detection" and "AI Management Guide"). Simple tag-based matching using a static recommendation map.

### 5. "Request a Book" Feature

Add a form/dialog accessible from the internal library where users can suggest a book topic they'd like added to the catalog. Fields: topic, brief description. Submitted to a new `book_requests` database table.

### 6. Shareable External Reading Link

Add a "Share Link" button in the reader that generates a URL like `/reader?email=encoded&access=encoded` — the user can bookmark or share this link to access their books from any device. The ReadBooksDialog will auto-fill from URL params.

## Files to Create

| File | Purpose |
|------|---------|
| `src/components/reader/ReadingModeToggle.tsx` | Day/Night/Dimmed mode switcher component |
| `src/components/reader/InternalLibrary.tsx` | Full catalog browser with 5% discount purchasing |
| `src/components/reader/BookRecommendations.tsx` | Personalized book suggestions |
| `src/components/reader/RequestBookDialog.tsx` | "Suggest a Book" form dialog |

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/BookReader.tsx` | Major refactor: add reading modes, enhanced toolbar, internal library tab, recommendations, request feature, shareable link generation, font size controls, progress bar |
| `src/components/resources/ReadBooksDialog.tsx` | Auto-fill from URL query params for shareable links |

## Database Changes

New table `book_requests`:
```sql
CREATE TABLE public.book_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  customer_name TEXT,
  topic TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.book_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert book requests"
  ON public.book_requests FOR INSERT TO anon, authenticated
  WITH CHECK (true);
```

## Technical Details

### Reading Modes CSS
```tsx
const modeClasses = {
  day: "bg-white text-gray-900",
  night: "bg-[#1a1a2e] text-gray-200",
  dimmed: "bg-[#f4ecd8] text-[#5c4b37]"
};
```

### 5% Internal Discount Logic
```tsx
const internalPrice = (book.price * 0.95).toFixed(2);
// Display: "Was $29.99 → $28.49 (5% Reader Discount)"
```

### Recommendation Map
Static mapping by book category tags — books in similar domains recommended together. No AI needed, just a curated adjacency list.

