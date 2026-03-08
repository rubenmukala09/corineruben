

# Website Speed & Lightening Plan — Round 3

## Summary

After two rounds of cleanup, the CSS files still contain significant dead code. Additionally, `framer-motion` remains embedded in 93 components/files. This round focuses on stripping more dead CSS and cleaning up unused design system classes.

## Findings

### Still-Dead CSS (~800+ lines to remove)

**`base.css` (lines 651-910)**: The entire Skeuomorphism 2.0 utility section — `skeuo-raised`, `skeuo-inset`, `skeuo-floating`, `skeuo-coral`, `skeuo-lavender`, `skeuo-gradient`, `skeuo-glass`, `skeuo-button-primary`, `skeuo-button-secondary`, `skeuo-embossed`, `skeuo-debossed`, `skeuo-icon-container`, `skeuo-progress-track`, `skeuo-progress-fill`, `skeuo-pill`, `skeuo-pill-coral`, `skeuo-pill-lavender` — **zero usages** in any component. Also `skeuo-ambient-*` classes and `theme-layer-*` classes have zero component usage. `image-glow-*` classes are only in CSS. That's ~350 lines of dead code.

**`utilities.css`**:
- `glass-effect` (lines 225-236): zero usage
- `accent-dot`, `accent-line`, `accent-corner` (lines 231-272): zero usage  
- `bg-pattern-dots`, `bg-pattern-grid` (lines 274-288): zero usage
- `shimmer-overlay` + keyframe (lines 290-320): used only by `premium-gradient-bg` which itself is only used in 1 training chat component
- `specular-highlight` (lines 986-1009): zero usage
- `texture-grain`, `texture-film`, `texture-paper` (lines 923-984): zero component usage

**`trending-ui.css`**:
- `premium-aurora` + `aurora-drift` keyframe (lines 958-1015): used only in `PremiumChatHistory.tsx` (a lazy-loaded sub-component)
- `premium-3d-card` (lines 939-955): used only in 3 training chat components
- `premium-gradient-text` + keyframe (lines 1072-1095): used only in `PremiumChatHistory.tsx`
- `premium-glass-refraction` (lines 1098-1115): used only in 2 training chat components
- `premium-frosted-dark` (lines 1284-1298): used only in `SmartScanConsole.tsx`
- `micro-tilt` (lines 238-246): zero usage (different from `micro-tilt-3d`)
- `micro-search-reveal` (lines 248-257): zero usage
- `micro-toggle` (lines 259-268): zero usage
- `micro-rotate` (lines 270-275): zero usage

**`components.css`**:
- `neumorphism-inset`, `neumorphism-btn`, `neumorphism-widget`, `neumorphism-circle`, `neumorphism-input` + dark mode variants (lines 633-860): zero usage except `neumorphism-card` (1 usage in ProtectionPathSection)
- `widget-border-gradient`, `widget-border-shimmer`, `widget-glow-hover`, `widget-embossed`, `widget-inner-light`, `widget-frosted`, `widget-border-dotted`, `widget-border-double` (lines 863-1028): used only in `ProtectionPathSection.tsx` (partial)
- `gradient-hero-teal`, `gradient-text-teal` (lines 239-270): zero usage
- `gradient-card`, `gradient-mesh` (lines 272-289): zero usage
- `animated-gradient` + `gradient-shift` (lines 554-564): zero usage
- `glow-effect` (lines 567-585): zero usage
- `card-3d-hover` (lines 527-538): zero usage
- `value-card` + `flip-in` keyframe (lines 593-607): zero usage

### Plan

#### Task 1: Strip Dead CSS from `base.css` (~350 lines)
Remove the entire unused skeuomorphism utility section (lines 651-910): `skeuo-raised`, `skeuo-inset`, `skeuo-floating`, `skeuo-coral`, `skeuo-lavender`, `skeuo-gradient`, `skeuo-glass`, `skeuo-button-primary/secondary`, `skeuo-embossed`, `skeuo-debossed`, `skeuo-icon-container`, `skeuo-progress-*`, `skeuo-divider` (duplicate from components.css), `skeuo-pill*`.

Also remove `theme-layer-coral`, `theme-layer-lavender`, `theme-layer-navy`, `theme-layer-mixed` (lines 911-990) and `glass-cursor-overlay`, `image-glow-*` (lines 992-1054) — the `glass-cursor-overlay` is used in WebsiteDesign.tsx so keep that one, remove the rest that are unused.

#### Task 2: Strip Dead CSS from `utilities.css` (~200 lines)
Remove: `glass-effect`, `accent-dot`, `accent-line`, `accent-corner`, `bg-pattern-dots`, `bg-pattern-grid`, `texture-grain*`, `texture-film`, `texture-paper`, `specular-highlight`.

#### Task 3: Strip Dead CSS from `trending-ui.css` (~200 lines)
Remove: `micro-tilt` (not `micro-tilt-3d`), `micro-search-reveal`, `micro-toggle`, `micro-rotate`, unused hover utilities with zero usage. Keep classes used by training components since they're lazy-loaded anyway.

#### Task 4: Strip Dead CSS from `components.css` (~300 lines)
Remove: all neumorphism classes except `neumorphism-card`, `gradient-hero-teal`, `gradient-text-teal`, `gradient-card`, `gradient-mesh`, `animated-gradient`, `glow-effect`, `card-3d-hover`, `value-card` + `flip-in` keyframe, unused widget border classes with zero usage.

## Files to Modify

| File | Change |
|------|--------|
| `src/styles/base.css` | Remove ~350 lines of unused skeuo/theme-layer classes |
| `src/styles/utilities.css` | Remove ~200 lines of unused accent/texture/pattern classes |
| `src/styles/trending-ui.css` | Remove ~100 lines of unused micro-interaction classes |
| `src/styles/components.css` | Remove ~300 lines of unused neumorphism/gradient/widget classes |

## Impact
- ~950 additional lines of CSS removed (on top of previous ~1,000 lines)
- Total CSS reduction across all rounds: ~2,000 lines (~40-50% of original)
- Faster CSS parsing, smaller download, less memory usage
- No visual impact — all removed classes have zero component references

