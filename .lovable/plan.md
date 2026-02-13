

# Rebuild Training Page, LauRA Button, and Apply 80% Zoom

## Overview

Three tasks: (1) restore the Training page to match the clean, professional style shown in the reference screenshots, (2) rebuild the LauRA AI assistant button, and (3) apply an 80% global zoom to the entire website. Also fix the existing build error in `dialog.tsx`.

---

## Task 1: Fix Build Error

The `dialog.tsx` file has a TypeScript error on line 42 where `e.currentTarget.querySelector` is called on an `EventTarget` type. Fix by casting to `HTMLElement`.

---

## Task 2: Restore Training Page Style

The reference screenshots show a cleaner, lighter version of the Training page. The current page (1346 lines) has heavy premium effects, large gradient backgrounds, oversized text, and elaborate card styling. Changes needed:

### Section 1: "Why Families Trust InVision Network"
- Keep the trust pillars (Clear Teaching, Privacy-First, Actionable Playbooks, Industry-Leading Expertise) as clean white cards in a 4-column grid instead of the current side-by-side image+list layout
- Keep the Emergency Protocol and Identity Verification cards below as 2-column layout
- Remove the large decorative image with floating stat overlays
- Match the clean card style from screenshots: white background, subtle border, centered icon, title, description

### Section 2: "How It Works" - 3 Steps
- Restore to clean white cards with centered content matching the screenshots
- Remove the image backgrounds from each card
- Use simple icon badges (calendar, graduation cap, shield) instead of photos
- Keep numbered step badges in the top-right corner
- Keep the progress connector dots below

### Section 3: "Scam Prevention Workshops" Pricing
- The current layout already matches reasonably well
- Ensure the card style matches screenshots: clean white cards with badge labels (GROUPS, BEST VALUE, PREMIUM, ORGS), large prices, feature checklists, Book Now buttons
- The "Best Value" card gets a filled dark button, others get outline buttons

### Instructor Showcase
- Keep as-is (already matches screenshots)

### Section 4: "Simple Protection in 4 Steps"
- This section was previously removed in an audit. Restore it with 4 clean white cards matching the screenshots: Something Suspicious, Forward to Us, Expert Analysis, Clear Guidance
- Colorful icon badges (red/orange, blue/pink, teal/blue, green)
- Numbered step badges (01-04)
- Subtitle text in colored accent below each card

### Section 5: "We Analyze All Types of Threats"
- Keep the 8-card grid (Phishing Emails, SMS Scams, Voice Calls, Voice Messages, Suspicious Links, QR Codes, Documents, Social Media)
- Simplify to match screenshot: muted icon backgrounds, clean white cards, "Click to learn more" text

### Section 6: AI Professional Training
- Keep the 4-card grid (AI Automation $299, AI Agency Building $499, Web Design + AI $349, Project Troubleshoot $150/hr)
- Same clean card style as Scam Prevention pricing

### Section 7-8: Secure Your Family + Scams We've Caught
- Keep these sections with current styling (they already look clean)

---

## Task 3: Rebuild LauRA AI Button

The current button (`LauraAIAssistant.tsx`) is a 80x80px rounded square with gradient background. Rebuild it to be a cleaner, more prominent floating button:
- Rounded-2xl glassmorphism container
- Clear "LAURA" text label
- Laura avatar image (56px, `contain: strict`)
- Glowing pulse indicator for online status
- `fetchPriority="high"` for the image
- Remove artificial delays per project memory

---

## Task 4: Apply 80% Global Zoom

Add a CSS variable `--site-scale: 0.8` in `base.css` and apply `zoom: 0.8` or `transform: scale(0.8)` to the root element for desktop viewports only. This makes the entire site appear zoomed out for a more expansive, professional view.

- Apply via `:root` or `body` using CSS `zoom: 0.8` (best cross-browser support for this use case)
- Ensure mobile viewports (below 768px) remain at 100% scale
- Adjust any fixed-position elements (LauRA button, BackToTop, MobileCallButton) to account for the zoom

---

## Technical Details

### Files to modify:
1. **`src/components/ui/dialog.tsx`** - Fix TypeScript error (cast EventTarget)
2. **`src/pages/Training.tsx`** - Major restructure to match reference screenshots
3. **`src/components/chat/LauraAIAssistant.tsx`** - Rebuild floating button
4. **`src/styles/base.css`** - Add global 80% zoom rule

### Files unchanged:
- Navigation, Footer, and other shared components remain as-is
- Existing hooks (useLauraChat, useAdminStatus) stay the same
- No database changes needed

