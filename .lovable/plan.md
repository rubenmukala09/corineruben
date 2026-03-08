

## Fix Blinking/Lazy Loading on Homepage

### Root Cause

The `Index.tsx` component uses `useSiteSettings()` and `useSiteImages('homepage_gallery')` but **ignores the `loading` state** from both hooks. This means:

1. First render: `settings` is `{}`, so `coupleName1` falls back to `'Corine'`, `coupleName2` to `'Ruben'`, etc.
2. ~200ms later: data arrives from the database, settings update, and everything re-renders with the real values

This causes a visible "blink" as content shifts from fallback to real data. Other pages (Venue, RSVP, Story, FAQ) already handle this correctly with loading guards.

### Fix

**File: `src/pages/Index.tsx`**

1. Destructure `loading` from both hooks:
   ```tsx
   const { images: homepageGalleryImages, loading: imagesLoading } = useSiteImages('homepage_gallery');
   const { settings, loading: settingsLoading } = useSiteSettings();
   ```

2. Add a loading guard before the main return. Show a minimal, non-jarring loading state (matching the page's aesthetic) while data loads:
   ```tsx
   if (settingsLoading) {
     return (
       <div className="min-h-screen flex flex-col items-center justify-center">
         <Heart className="w-8 h-8 text-primary animate-pulse" />
       </div>
     );
   }
   ```

This is a single-file, targeted fix. The loading state will be brief (~100-300ms) and prevents all the downstream sections from flickering between fallback and real content.

### Files to Edit
- `src/pages/Index.tsx` (3 lines changed)

