

## Fix: Best Practices Issues (92% → higher)

The screenshot shows two Best Practices issues:

1. **Browser errors logged to the console** -- Likely caused by the Lovable staging environment's Tailwind CDN warning or network errors outside our control. Need to check for any application-level console errors we can fix.

2. **Displays images with incorrect aspect ratio** -- Several `<img>` tags are missing explicit `width`/`height` attributes, causing the browser to render them at dimensions that don't match their natural aspect ratio. Key offenders:

### Images to fix

| Location | Issue |
|---|---|
| `Index.tsx:660` hero background img | No `width`/`height` |
| `Index.tsx:1035` flowers img | `width={297} height={428}` may not match natural ratio when CSS forces `w-full h-full` in a non-matching container |
| `Story.tsx:187` gallery images | No `width`/`height` at all |
| `Login.tsx:73` rings img | No `width`/`height` |
| `Index.tsx:789, 867` small thumbnails | Already have width/height ✓ |

### Plan

1. **Add `width` and `height` attributes** to all `<img>` tags missing them, using values that match the CSS aspect ratio they're rendered at. This prevents the "incorrect aspect ratio" audit failure.

2. **Review console errors** -- The Tailwind CDN warning is from the Lovable staging environment and cannot be fixed via code. Any application-level errors would need investigation, but current console logs show none.

### Changes

- **`src/pages/Index.tsx`**: Add `width`/`height` to the hero background image (line 660). Verify flowers image dimensions match container aspect ratio (line 1035).
- **`src/pages/Story.tsx`**: Add `width`/`height` to gallery `<img>` tags (line 187-192).
- **`src/pages/Login.tsx`**: Add `width`/`height` to the rings image (line 73).

All changes are attribute-only additions -- no visual or functional impact.

