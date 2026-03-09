

## Diagnosis and Plan

### Current Issue: Blank Page
The homepage renders blank. This is likely caused by a build error from the previous round of edits (possibly a syntax error or missing import in one of the edited components). The first priority is fixing this, then aligning the visual design exactly with the reference.

### Reference Image Analysis (fitup design)
The reference shows these distinct sections top-to-bottom:

1. **Nav**: Logo left, centered links (How It Works, About, Start, FAQ, Events), pill "Contact Us" button right
2. **Hero**: 2-col layout. Left: large serif-accent headline "Prefect Fitness Path With *fitup*", subtitle, "GET STARTED" black pill button, "Join Our Community" underlined link, social icons row, avatar stack "Members trusted", big stats "500k+" / "10k+". Right: large rounded image with blue gradient overlay, floating glassmorphic widgets (chart card top-right, shield/stat card bottom-left)
3. **"Why fitup works"**: Centered pill badge, description text, bento grid (large image left, 2 small icon cards right)
4. **"Fit your body with balanced meals"**: 2-col split. Left: headline with italic accent, description, toggle buttons (Non Vegan / Start training), phone button. Right: image grid with floating stat widget
5. **"Find Your Perfect Yoga *style*"**: Left-aligned headline, 3x2 grid of image cards with large overlay text "YOGA" and bottom labels
6. **Exhibition marquee ticker**: scrolling text with decorative icons
7. **Event list (01-04)**: numbered serif titles, dates, "Reserve Your Spot" buttons
8. **Footer**: dark navy, huge logo watermark, copyright line

### Implementation Plan

**Step 1: Fix blank page**
- Check for and fix any build errors (likely in a component edited in the previous round)
- May need to rebuild components that have syntax issues

**Step 2: Ensure exact visual match across all homepage sections**
Each component needs these adjustments to perfectly match the reference:

- **Navigation**: Already close. Verify centered links, pill Contact Us button with dot indicator.
- **HeroHomepage**: Already structured correctly with 2-col layout, serif accents, floating widgets. Fine-tune spacing, image rounding, gradient overlay colors.
- **ThreatTicker**: Already implemented as marquee. Matches reference "exhibition" ticker.
- **HomeIntroSection**: Already has "Why InVision Works" pill badge + bento grid + split "balanced meals" layout. Verify spacing.
- **SiteOrientationGrid**: Already has 3x2 image overlay grid. Matches "Find Your Perfect Yoga style" section.
- **PromoStrip**: Already has 01-04 numbered event list. Matches reference.
- **Footer**: Already dark navy with logo watermark. Matches reference.

**Step 3: Ensure font loading works (DM Sans + DM Serif Display)**
- Change `font-display: optional` to `font-display: swap` in index.html to prevent invisible text
- Fix the font loading script (still references "Rubik" instead of "DM Sans")

**Step 4: Clean up remaining sections** (LiveSecurityStats, WorkshopsPromo, FamilyTrustSection, TestimonialCarousel, TrustBadgesSection, BlogPreview, FAQ, Newsletter, Final CTA)
- Apply consistent fitup styling: rounded-3xl cards, pill badges, serif italic accents, warm beige/cream background, blue primary accent
- Ensure glassmorphic floating widgets on image sections
- Consistent spacing (py-20 md:py-28)

### Files to modify:
1. `index.html` - Fix font-display and font loading script
2. `src/components/HeroHomepage.tsx` - Fine-tune to exact reference match
3. `src/components/Navigation.tsx` - Minor tweaks
4. `src/components/HomeIntroSection.tsx` - Verify exact layout match
5. `src/components/home/SiteOrientationGrid.tsx` - Verify grid matches
6. `src/components/home/ThreatTicker.tsx` - Verify marquee
7. `src/components/home/PromoStrip.tsx` - Verify event list
8. `src/components/home/LiveSecurityStats.tsx` - Apply fitup styling
9. `src/components/home/WorkshopsPromo.tsx` - Apply fitup styling
10. `src/components/home/FamilyTrustSection.tsx` - Apply fitup styling
11. `src/components/home/TestimonialCarousel.tsx` - Apply fitup styling
12. `src/components/home/TrustBadgesSection.tsx` - Apply fitup styling
13. `src/components/home/BlogPreview.tsx` - Apply fitup styling
14. `src/components/Footer.tsx` - Verify large logo footer
15. `src/pages/Index.tsx` - Ensure section order and spacing
16. `src/styles/base.css` - Verify design tokens

The primary risk is the blank page. Once that's resolved, the visual adjustments are incremental since the previous rounds already established the correct structure and design tokens.

