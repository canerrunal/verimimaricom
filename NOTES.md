# Veri Mimarı visual redesign notes

## Pre-assessment

- Complexity: L3 — a multi-route Next.js content front-end with interactive calculators and API-backed features.
- Mode: content overhaul. The reference's visual grammar is retained while Veri Mimarı's brand, copy, routes, data and product behavior remain its own.
- High-fidelity scope: palette, typographic scale, warm-paper backgrounds, technical labels, outlined cards, hard shadows, full-width section rhythm, navigation and responsive behavior.
- Intentionally not cloned: Polar branding/copy, illustrations, page structure, analytics, external tracking, proprietary assets and the reference repository's source code.
- Functional boundary: existing calculators, forms, CMS, membership, RAG and API behavior are not replaced.

## Source and licensing

- Visual reference: <https://rehber.finfolis.com/>
- Public source reference: <https://github.com/radioheavy/polar-turkce-rehber>
- Repository license status on 2026-08-01: no declared license. The redesign therefore uses measured visual tokens and an original Next.js implementation; source files are not copied into this project.

## Implementation map

- Global palette, typography, shared cards/forms and responsive behavior: `src/app/globals.css`
- Navigation and brand lockup: `src/components/landing/NavBar.tsx`
- Hero composition and retained live calculator: `src/components/landing/HeroPanel.tsx`
- Full-width alternating landing sections: `src/components/landing/*Section.tsx`
- Structured design identity: `RECON/design-dna.json`

## Run and verify

```bash
npm run typecheck
npm run lint
npm run build
npm run dev
```

Verify `/`, `/araclar`, `/rehberler`, `/projeler`, one calculator route and a mobile width. Confirm calculator input changes still update results and that the mobile navigation opens and closes.
