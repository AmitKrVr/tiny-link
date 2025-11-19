## TinyLink

Modern URL shortener built with Next.js 16, Tailwind CSS, Neon PostgreSQL, and Drizzle ORM. Create branded short codes, manage every link from a rich dashboard, and inspect per-link analytics.

### Features

-   REST API (`/api/links`, `/api/links/:code`) using Next.js Route Handlers
-   Server-side redirect route (`/[code]`) that increments click stats
-   Dashboard with form validation (React Hook Form + Zod), live search, copy + delete actions, and loading/error states powered by Zustand + axios
-   Stats page (`/code/:code`) detailing clicks, timestamps, and target URL
-   Health check at `/healthz`

### Project Structure

```
app/
  page.tsx            # Dashboard
  [code]/page.tsx     # Redirect
  code/[code]/page.tsx# Stats view
  api/links/*.ts      # REST endpoints
db/
  schema.ts           # Drizzle schema
lib/
  data/links.ts       # Server actions + helpers
  stores/useLinksStore.ts
  validation/link.ts
components/
  AddLinkForm.tsx
  LinksTable.tsx
  DeleteButton.tsx
  CopyButton.tsx
  Header.tsx
```

### Environment

Copy `.env.example` and provide credentials:

```
DATABASE_URL=postgres://...
NEXT_PUBLIC_BASE_URL=https://your-vercel-domain.com
```

### Development

```bash
npm install
npm run dev
```

### Database

Run migrations with [Drizzle Kit](https://orm.drizzle.team/docs/overview):

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

### Deployment

Deploy to Vercel with Neon for Postgres. Make sure `DATABASE_URL` and `BASE_URL` (your Vercel domain) are configured in the dashboard and re-run `npx drizzle-kit push` if schema changes. All routes are server-rendered and ready for edge/serverless environments.
