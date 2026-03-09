

# Full System Intelligence Sync

## Problem
Multiple components still carry outdated "download," "physical product," and "shipping" language that contradicts the current read-online-only digital model. Laura's AI system prompt also lacks awareness of the book reader system, internal library, and Access ID flow. Several files are out of sync with the current platform state.

## Changes

### 1. PaymentSuccess.tsx — Remove physical/download product types
The entire `product_type` switch still has `"digital"` (with "download links"), `"physical"` (with "shipping"), and `"mixed"` cases. Since we only sell digital eBooks read online:
- Remove `Download`, `Truck` icon imports
- Change default `product_type` from `"physical"` to `"digital"`
- Replace `"digital"` case content: "Download links" → "Access ID via email", "Download links expire in 24 hours" → "Your Access ID never expires"
- Remove `"physical"` and `"mixed"` cases entirely
- Keep `"subscription"` case as-is
- Replace `BookOpen` for all digital product icons

### 2. PurchaseModal.tsx — Remove download references for books
This modal is used for book purchases. Update:
- Replace `Download` icon with `BookOpen`
- `"Digital Download"` badge → `"Digital eBook"`
- `"Check your email for download links within minutes!"` → `"Check your email for your Access ID to start reading!"`
- `"Where to send your download"` → `"Where to send your Access ID"`
- `"Email * (for receipt & downloads)"` → `"Email * (for receipt & Access ID)"`
- `"Instant email with download links"` → `"Instant email with Access ID"`
- `"Links valid for 24 hours"` → `"Read online anytime"`
- Remove `Truck` import and physical shipping references (no physical products)

### 3. SmartPaymentDialog.tsx — Fix success message
- `"Check your email for download links"` → `"Check your email for your Access ID"`

### 4. AIFooter.tsx (training) — Fix download mention
- `"Please download your conversation in PDF format before closing"` → `"Your conversation will not be saved after this session"`
- `"Audio messages will be converted to text format for download"` → remove

### 5. Laura AI System Prompt (edge function + client config) — Add platform awareness
Update `supabase/functions/ai-chat/index.ts` and `src/lib/lauraConfig.ts` to include:
- Knowledge of the book reader system (`/reader`) with Access ID login
- Internal Library with 5% discount
- Day/Night/Dimmed reading modes
- Book request feature
- No downloads — everything is read online
- Shareable reading links
- Remove any generic/vague phrasing; make Laura aware of actual current features

### 6. PlatformGuide.tsx — Remove unused Download import
- `Download` is imported but never used in JSX; remove it

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/PaymentSuccess.tsx` | Remove physical/mixed cases, update digital case to Access ID language |
| `src/components/PurchaseModal.tsx` | Replace all download/shipping refs with Access ID/read-online language |
| `src/components/payment/SmartPaymentDialog.tsx` | Fix success message |
| `src/components/training/AIFooter.tsx` | Remove download mention in privacy notice |
| `supabase/functions/ai-chat/index.ts` | Update Laura system prompts with full platform awareness |
| `src/lib/lauraConfig.ts` | Update allowed topics and system prompt with current features |
| `src/components/PlatformGuide.tsx` | Remove unused Download import |

