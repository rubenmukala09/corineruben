

## Plan: Merge Pages and Fill Story Placeholders

### 1. Fill Story Event Placeholders

Insert 5 placeholder story events into the `story_events` database table with romantic placeholder content (in EN/FR/ES) that you can later modify from the dashboard. Events like "First Meeting", "First Date", "The Trip That Changed Everything", "Moving In Together", "The Proposal".

Also update the `___________` placeholder translations in `LanguageContext.tsx` for the hero date and story events with temporary placeholder text (e.g., "August 15, 2027" for the date, and meaningful placeholder titles/descriptions for the story events).

### 2. Merge Gallery into Story Page

- Move the Gallery page's **photo upload functionality** (upload panel, lightbox, uploaded photos from DB) into `Story.tsx`, placed below the existing gallery section
- The Story page already has a masonry gallery section — extend it to also show user-uploaded photos and include the upload button + lightbox
- Keep the existing admin-curated gallery grid, then add a "Guest Photos" section below with the upload form and community photos

### 3. Merge Venue into RSVP Page

- Add the full Venue content (ceremony/reception cards, map embed, day schedule, transport, hotels) as a section **above** the RSVP form in `RSVP.tsx`
- Import and use the same `useSiteSettings` and `useVenueData` hooks already used in `Venue.tsx`
- Style it as a natural lead-in: "Here's where we're celebrating — now RSVP below"

### 4. Remove Standalone Routes and Update Navigation

- **Remove** `/venue` and `/gallery` routes from `App.tsx`
- **Remove** imports of `Venue` and `Gallery` pages
- **Update Navigation.tsx**: Remove `/venue` and `/gallery` links; update nav to show Story (which now includes Gallery) and RSVP (which now includes Venue)
- **Update Footer.tsx**: Update links to remove `/venue` and `/gallery`, point to `/story` and `/rsvp` instead
- Keep `Venue.tsx` and `Gallery.tsx` files but they'll be unreachable (or delete them)

### Files to Edit
- **DB migration**: Insert 5 story events into `story_events` table
- `src/contexts/LanguageContext.tsx` — Fill `___________` placeholders with temporary content
- `src/pages/Story.tsx` — Add Gallery upload + lightbox + user photos section
- `src/pages/RSVP.tsx` — Add Venue section above the RSVP form
- `src/App.tsx` — Remove `/venue` and `/gallery` routes
- `src/components/Navigation.tsx` — Remove venue/gallery nav links
- `src/components/Footer.tsx` — Update links

