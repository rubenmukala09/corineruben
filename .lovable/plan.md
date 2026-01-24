
# Business Page Visual & Accessibility Enhancement Plan

## Overview
Enhance the Business page to have uniform pricing card heights, improved text readability following the elderly accessibility standard, and professional decorative images throughout.

---

## Issues to Fix

### 1. Website Insurance Cards - Unequal Heights
**Location:** Lines 877-1060 in `src/pages/Business.tsx`

**Problem:** The 4 cards (Essential, Professional, Enterprise, Custom) have different numbers of features causing uneven heights.

**Solution:**
- Add `min-h-[520px]` to all card containers for consistent sizing
- Ensure all cards have the same number of feature items (pad with whitespace if needed)
- Use `flex-1` on the feature list to push buttons to the bottom

### 2. AI Services Insurance Cards - Unequal Heights
**Location:** Lines 1339-1558 in `src/pages/Business.tsx`

**Problem:** The 4 insurance tiers (Basic, Standard, Premium, Enterprise) have varying content lengths.

**Solution:**
- Add `min-h-[480px]` to all AI insurance card containers
- Standardize padding and spacing across all cards

### 3. Text Too Small - Accessibility Fix
**Current State:** Many sections use `text-sm` (14px) and `text-xs` (12px) which violates the 22px/20px accessibility standard.

**Changes:**
| Element | Current | New |
|---------|---------|-----|
| Feature list items | `text-sm` | `text-base` |
| Card descriptions | `text-xs` | `text-sm` |
| Trust badges | `text-xs` | `text-sm` |
| Section descriptions | `text-base` | `text-lg` |
| Card titles | `text-lg` | `text-xl` |
| Price labels | `text-sm` | `text-base` |

### 4. Footer Text Visibility
**Location:** `src/components/Footer.tsx`

**Changes:**
- Navigation links: `text-sm` to `text-base`
- Category headers: `text-sm` to `text-base font-bold`
- Brand description: `text-sm` to `text-base`
- Legal disclaimer: `text-xs` to `text-sm`
- Copyright: `text-sm` to `text-base`

### 5. Add Decorative Professional Images
**Locations to add images:**

| Section | Image Asset | Placement |
|---------|-------------|-----------|
| What We Build | `business-professionals-office.jpg` | Right side accent |
| Website Insurance | `security-expert.jpg` | Left floating decoration |
| AI Agents Pricing | `ai-automation-tech.jpg` | Background accent |
| AI Services Insurance | `ai-business-promo.jpg` | Section divider |
| AI Consulting | `team-collaboration.jpg` | Within toggle panel |

---

## Implementation Details

### File 1: `src/pages/Business.tsx`

**Website Insurance Cards (lines 877-1060):**
```tsx
// Add consistent min-height to each card wrapper
<div className="relative pt-5 min-h-[520px]">
  ...
  <Card className="p-6 rounded-2xl ... min-h-[480px]">
```

**AI Services Insurance Cards (lines 1339-1558):**
```tsx
// Standardize card heights
<div className="relative h-full min-h-[480px]">
  <Card className="p-6 rounded-2xl ... min-h-[440px]">
```

**Text Size Increases:**
```tsx
// Feature lists
<ul className="space-y-3 mb-6 text-base text-left flex-1">

// Card titles
<h3 className="text-xl font-bold mb-3">Essential</h3>

// Price display
<p className="text-4xl font-bold text-primary mb-2">$29
  <span className="text-base text-muted-foreground font-normal">/mo</span>
</p>

// Descriptions
<p className="text-sm text-muted-foreground mb-5">Basic protection</p>
```

**Add Decorative Images:**
```tsx
// After Website Insurance section header (around line 874)
<div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-64 h-64 rounded-2xl overflow-hidden opacity-20">
  <img 
    src={securityExpert} 
    alt="" 
    className="w-full h-full object-cover"
    aria-hidden="true"
  />
</div>

// Import at top
import securityExpert from "@/assets/security-expert.jpg";
import aiAutomationTech from "@/assets/ai-automation-tech.jpg";
import teamCollaboration from "@/assets/team-collaboration.jpg";
```

### File 2: `src/components/Footer.tsx`

**Navigation Links:**
```tsx
// Line 143 - change text-sm to text-base
<Link to={link.to} className="text-base text-white/60 hover:text-white transition-colors">

// Line 132 - change text-sm to text-base
<h4 className="font-bold text-base mb-4 text-white/90">Navigation</h4>
```

**Brand Description (line 88):**
```tsx
<p className="text-base text-white/60 max-w-md leading-relaxed">
```

**Legal Disclaimer (line 251):**
```tsx
<p className="text-white/40 text-sm text-center leading-relaxed max-w-4xl mx-auto">
```

---

## Visual Enhancements Summary

### Card Height Standardization
- All Website Insurance cards: `min-h-[520px]`
- All AI Insurance cards: `min-h-[480px]`
- Consistent padding: `p-6` on all cards
- Button alignment: `mt-auto` ensures buttons align at bottom

### Typography Scale Increase
- Body text minimum: `text-base` (16px)
- Feature lists: `text-base` with `space-y-3`
- Card titles: `text-xl` (20px)
- Section headers: Already good at `text-4xl md:text-5xl`

### Decorative Images
- Use `opacity-20` for subtle background accents
- Place in `hidden lg:block` to show only on desktop
- Use `aria-hidden="true"` for accessibility
- Position with `absolute` within section containers

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Business.tsx` | Card heights, text sizes, decorative images |
| `src/components/Footer.tsx` | Text size increases for readability |

---

## Expected Outcome
- All pricing cards will have uniform heights and professional appearance
- Text will be easily readable for elderly users (meeting WCAG accessibility)
- Decorative images will add visual interest without distracting
- Footer will be more legible with larger text
- Overall professional and operational feel maintained
