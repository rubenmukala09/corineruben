

## Plan: Footer Visibility, Merge Details into Homepage, Merge Gallery into Story

### 1. Fix Footer Text Visibility

The footer uses `--footer-muted` which is too dim in both themes. Changes:

- **`src/index.css`**: Increase `--footer-muted` lightness in light mode from `60%` to `75%` and in dark mode from `50%` to `70%`. Also increase `--footer-fg` opacity usage — remove `opacity-70`/`opacity-80` classes from footer text elements.
- **`src/components/Footer.tsx`**: Remove `opacity-70`, `opacity-80`, `opacity-90` from text elements so all footer content is clearly readable. Update link columns to remove `/details` and `/gallery` routes since they'll be merged.

### 2. Merge Details Content into Homepage

Move all 5 detail sections (Ceremony, Reception, Dress Code, Accommodation, Transport) from `Details.tsx` into `Index.tsx` as a dedicated "Wedding Details" section with the same glassmorphic card grid, replacing the existing lightweight highlights cards (lines 498-545) with the full detail cards including times, locations, and descriptions.

- **`src/pages/Index.tsx`**: Replace the existing 3-card highlights section with the full 5-card details grid (Ceremony, Reception, Dress Code, Accommodation, Transport) using the same icons and layout from `Details.tsx`.
- **`src/pages/Details.tsx`**: Delete file.
- **`src/App.tsx`**: Remove the `/details` route.

### 3. Merge Gallery into Story Page

Add the masonry gallery grid from `Gallery.tsx` below the timeline in `Story.tsx`.

- **`src/pages/Story.tsx`**: Import all gallery images and add a gallery section after the timeline, using the same masonry layout (`columns-2 md:columns-3`).
- **`src/pages/Gallery.tsx`**: Delete file.
- **`src/App.tsx`**: Remove the `/gallery` route.

### 4. Update Navigation

- **`src/components/Navigation.tsx`**: Remove "Details" and "Gallery" from the nav links array — reducing from 6 to 4 links (Home, Story, RSVP, Gifts).
- **`src/components/Footer.tsx`**: Update footer link arrays to match.

### 5. Update Explore Section

- **`src/pages/Index.tsx`**: Remove the "Gallery" and "Details" cards from the `features` array in the explore/navigation section (lines 44-49), keeping only Story, Gifts, and RSVP.

### Files Changed
- `src/index.css` — footer color tokens
- `src/components/Footer.tsx` — text visibility + updated links
- `src/components/Navigation.tsx` — remove 2 nav items
- `src/pages/Index.tsx` — add full details section, remove details/gallery from explore
- `src/pages/Story.tsx` — add gallery section
- `src/App.tsx` — remove 2 routes
- Delete `src/pages/Details.tsx` and `src/pages/Gallery.tsx`

