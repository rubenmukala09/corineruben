

## Mobile Performance Analysis (66%) — What's Actually Happening

After examining the audit data in detail, most of the 12 performance issues flagged are **not from your app code** — they come from platform-level infrastructure and cannot be fixed through code changes.

### Issues Outside Our Control (platform-level)

| Issue | Cause | Fixable? |
|---|---|---|
| **Redirects** (780ms) | Lovable staging → custom domain redirect | No |
| **Render blocking requests** (2,240ms) | DM Sans font injected by Lovable badge | No (remove badge in Settings) |
| **Unused JavaScript** (119 KiB) | Google Tag Manager scripts from Lovable | No |
| **Cache lifetimes** (16 KiB) | Google Analytics cache headers | No |
| **Document latency** (100ms) | Redirect chain | No |
| **Network dependency tree** | Font chain through Google Fonts → gstatic | No |

### Suspicious Audit Data

The audit's LCP element references `bold-moves.webp` with text "Start your online journey / Build your website today" and a `div.services` selector — **this is NOT your wedding app**. This appears to be a domain parking page at `corineruben.com`. The CLS layout shift is also attributed to this parking page content.

This means the PageSpeed analysis may be hitting a cached or intermittent parking page at your custom domain rather than your actual app.

### What Can Be Improved In Code

Only two items are partially addressable:

1. **SEO score (58%)** — Likely caused by the parking page content being analyzed. Need to verify the custom domain is properly serving the app. If it is, we can add structured data and improve meta tags.

2. **Font loading strategy** — The Google Fonts stylesheet in `index.html` is already using `media="print" onload="this.media='all'"` pattern (non-blocking). The render-blocking DM Sans flagged in the audit is from the Lovable badge, not our code.

### Recommended Action

The most impactful fix is **removing the Lovable badge** in your project Settings, which would eliminate the render-blocking DM Sans request (est. 2,240ms savings) and the unused JavaScript from Google Tag Manager (119 KiB). This alone could push the performance score significantly higher.

No code changes are needed — the issues are infrastructure-level.

