

## Fix Wedding Date: October 16, 2026

Three places need updating:

1. **`src/contexts/LanguageContext.tsx` line 21** — Change `hero.date` translations from "August 15, 2027" to "October 16, 2026" in all three languages (FR: "16 Octobre 2026", EN: "October 16, 2026", ES: "16 de Octubre de 2026")

2. **`src/pages/Index.tsx` line 483** — Change the fallback date from `'2027-08-15T14:00:00'` to `'2026-10-16T14:00:00'`

3. **`src/components/dashboard/SettingsManager.tsx` line 57** — Update the hint text from `"Format: 2027-08-15T14:00:00"` to `"Format: 2026-10-16T14:00:00"`

