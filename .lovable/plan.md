

## Fix: Accessibility contrast issue (96% → target 100%)

**Problem**: The scripture citation text `"— 1 Corinthians 13:4-7"` uses `text-muted-foreground` (HSL 282 12% 40%) against a background of approximately `#eae7e6`, producing a contrast ratio of 3.18:1 — below the required 4.5:1.

**Location**: `src/pages/Index.tsx` — the scripture/quote section, selector: `p.font-sans-elegant.text-sm.text-muted-foreground.font-semibold`

**Fix**: Override the text color on that specific citation element to use a darker shade (e.g., `text-foreground/70` or a custom class) that achieves ≥4.5:1 contrast against the section background.

**Performance (90%)**: No code fix available. The remaining 10% deduction comes from:
- Lovable badge injecting render-blocking DM Sans font (~2.2s)
- Platform redirects (~780ms)
- Google Tag Manager unused JS

The only actionable step is removing the Lovable badge in **Settings → General → Hide 'Lovable' Badge**.

