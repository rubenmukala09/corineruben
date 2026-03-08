

## Fix Console Errors and Ensure Responsiveness

### Issues Found

**1. forwardRef warnings (2 console errors)**
`SectionDivider` (line 100) and `AuroraOrb` (line 33) in `src/pages/Index.tsx` are plain function components that receive refs from parent `motion` components. React warns because they can't accept refs. Fix: wrap both (plus `GoldenCorners`) with `React.forwardRef`.

**2. No runtime/network errors**
The database tables (`guestbook`, `photos`) and storage bucket (`wedding-photos`) are now created. Network requests return 200. No fetch failures.

### Plan

**Edit `src/pages/Index.tsx`** — Convert three small decorative components to use `forwardRef`:

- `AuroraOrb` (line ~33): Wrap with `forwardRef<HTMLDivElement, Props>`
- `SectionDivider` (line ~100): Wrap with `forwardRef<HTMLDivElement, Props>`  
- `GoldenCorners` (line ~123): Wrap with `forwardRef<HTMLDivElement, Props>`

Each will accept a `ref` parameter and attach it to the outermost `<div>`. Import `forwardRef` at the top of the file.

No other code changes needed — the app is otherwise running cleanly on both mobile and desktop.

