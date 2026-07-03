# Loads of Traffic

Marketing site for Loads of Traffic, a digital marketing agency focused on affiliate strategy, competitive intelligence, and growth for the e-gaming and consumer sectors.

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router) + React 19
- TypeScript, Tailwind CSS
- [GSAP](https://gsap.com) + [Lenis](https://lenis.darkroom.engineering) for animation and smooth scrolling
- [Resend](https://resend.com) for the contact form email
- [next-sitemap](https://github.com/iamvishnusankar/next-sitemap) for sitemap/robots generation

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Required | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | API key from [resend.com](https://resend.com), used by the contact form (`app/api/route.ts`) to send email. |
| `RESEND_FROM_EMAIL` | No | Sender address for contact form emails. Must be on a domain verified with Resend. Falls back to Resend's `onboarding@resend.dev` test sender if unset. |

## Scripts

- `npm run dev` – start the dev server
- `npm run build` – production build (also regenerates the sitemap via `postbuild`)
- `npm run start` – serve the production build
- `npm run lint` – run ESLint

## Deployment

Deployed on [Vercel](https://vercel.com). Set the environment variables above in the Vercel project settings before deploying.
