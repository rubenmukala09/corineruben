

# Full Website Audit: Out-of-Context and Missing Items

## 1. Broken Links / Dead Routes

### CRITICAL: `/safety-vault` Route Does Not Exist
- **Services.tsx (line 148)**: The "Safety Vault" service card links to `/safety-vault`, but there is NO route for this in `App.tsx` and the `SafetyVault.tsx` page was previously deleted.
- **BreadcrumbNav.tsx (line 20)**: Also references `/safety-vault`.
- **Fix**: Either remove the Safety Vault card from the Services page or redirect `/safety-vault` to an appropriate page (e.g., `/training`).

### Orphaned Page: `GuestScanner.tsx`
- `src/pages/GuestScanner.tsx` still exists as a full page file (206 lines) with its own Navigation/Footer, but it is NOT routed in `App.tsx`. The route `/guest-scanner` redirects to `/training/ai-analysis`. This file is dead code.
- **Fix**: Delete `GuestScanner.tsx`.

---

## 2. PremiumGlassmorphismWidgets Still on Homepage
- Per project memory, the "PremiumGlassmorphismWidgets" block was supposed to be removed from the homepage. However, it is still imported and rendered on `Index.tsx` (lines 25, 119-123).
- **Fix**: Remove the import and the `<section id="widgets">` block from `Index.tsx`.

---

## 3. ProtectionPathSection Imported but Never Rendered
- `Index.tsx` (line 13) imports `ProtectionPathSection` but it is NEVER used anywhere in the JSX.
- **Fix**: Remove the unused import.

---

## 4. Money Counter Animation Still on Business Page
- Per project memory, the "money counting effect" should be removed. However, `Business.tsx` still uses `useCounterAnimation` (lines 85-87) with animated counters for pricing cards (`price1Counter`, `price2Counter`, `price3Counter`).
- **Fix**: Replace animated counters with static price text, matching the approach already applied to the Training page.

---

## 5. Inconsistencies Between Pages

### Services Page Out of Sync
- **Safety Vault** is listed as a standalone service with its own pricing ($19/mo) on the Services page, but it actually exists only as a feature within the Training page's "Family Safety Vault" section (included with Family & Premium Plans). These are contradictory.
- **ScamShield pricing** on Services ($29/mo) doesn't match any plan on the Training page (Training shows $79-$510 per session, not monthly subscriptions).
- **Fix**: Align Services page offerings with actual available products on Training and Business pages, or clearly differentiate them.

### Duplicate "How It Works" Sections on Training
- The Training page has TWO "How It Works" sections:
  1. Section 2 (line 737): "How It Works" - 3 steps (Book, Learn, Get Support)
  2. Section 4 (line 906): "Simple Protection in 4 Steps" - 4 steps (Suspicious? Forward, Analysis, Guidance)
- These are confusingly similar and could be consolidated.

---

## 6. Missing Functionality

### No Scam Prevention Workshop card (`$49`)
- The structured data in Training SEO references an "Individual Training Session" at $89, but the cheapest displayed plan is Group Class at $79. The earlier "Scam Prevention Workshop" card mentioned in the user request is not present. This may be intentional but should be verified.

### AI Analysis Page: No Actual AI Processing
- The `TrainingAiAnalysis.tsx` page has a chat interface using `useAiChat()` and a file scan workflow using `useGuestScanner()`. The file scan requires payment. However, the chat/AI analysis itself does not appear to connect to any actual AI model for free text queries -- it depends on the `useAiChat` hook implementation, which should be verified.

---

## 7. Stale/Unused Imports

- **Training.tsx**: Imports `Video` from lucide (line 43) and `Upload` (line 27) but only uses them in admin-only conditional block. Not critical but adds bundle weight.
- **Business.tsx**: The `useCounterAnimation` import and usage should be removed if counter effects are being eliminated.

---

## Implementation Plan

### Step 1: Fix Broken `/safety-vault` Link
- Remove the "Safety Vault" card from `Services.tsx` or redirect the link to `/training`
- Clean up `BreadcrumbNav.tsx` reference

### Step 2: Delete Orphaned `GuestScanner.tsx`
- Delete `src/pages/GuestScanner.tsx`

### Step 3: Clean Homepage (Index.tsx)
- Remove `PremiumGlassmorphismWidgets` import and section
- Remove unused `ProtectionPathSection` import

### Step 4: Remove Counter Animation from Business Page
- Replace `useCounterAnimation` with static text in `Business.tsx`
- Remove the hook import

### Step 5: Align Services Page
- Update or remove the Safety Vault card on Services page
- Review and correct pricing discrepancies so they match actual offerings

### Step 6: Consolidate Training Page
- Consider merging the two "How It Works" sections into one clear flow

