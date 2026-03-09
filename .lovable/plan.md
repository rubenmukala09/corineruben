

## Plan: Add Venue Address FAQ & Remove Gift Icon from Nav

### 1. Remove Gift icon from top navigation bar
**File: `src/components/Navigation.tsx`**
- Remove the `{ to: '/registry', icon: Gift, label: t('nav.registry') }` entry from the icon-only links array (line 110)
- Clean up the unused `Gift` import from lucide-react

### 2. Add venue/address info as a default FAQ entry
**Approach:** Insert a pre-populated FAQ row into the database via migration so guests can immediately see address and dress code information on the FAQ page.

**Database migration** — Insert a new FAQ entry with:
- **EN:** "Where is the wedding?" → Answer with ceremony & reception addresses (pulled from existing `site_settings` pattern, but hardcoded as a starter FAQ)
- **FR/ES:** Translated equivalents
- This will automatically appear on the `/faq` page since it already reads from the `faqs` table

Since venue addresses are already managed in the dashboard (VenueManager), the FAQ answer can reference guests to check the Venue page, or we can include the addresses directly. The simplest professional approach: add a FAQ entry pointing guests to the `/venue` page for full details, plus a brief summary.

### Files to edit
1. `src/components/Navigation.tsx` — Remove Gift icon link
2. **Database migration** — Insert default address/venue FAQ entry

