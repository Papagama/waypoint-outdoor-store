# Technical handoff

## Local run

```powershell
cd "D:\Projects\3.Waypoint"
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production prerequisites

- Replace demo product data in `lib/products.ts` with a PIM/CMS integration.
- Connect server-side cart/order API, authentication, payment and shipping providers.
- Add security headers, observability, environment secrets and transactional email.
- Replace placeholder domain in metadata/sitemap; validate OG image, robots and canonical URLs.
- Complete rendered visual QA, accessibility testing, legal review and owner sign-off.
