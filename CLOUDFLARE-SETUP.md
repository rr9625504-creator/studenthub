# Cloudflare Workers deployment

This project is configured as a TanStack Start + Nitro Cloudflare Workers app.

## Cloudflare Workers Builds

- Git repository: connect this folder/repository
- Production branch: `main`
- Root directory: `/`
- Build command: `bun run build`
- Deploy command: `npx wrangler deploy`
- Version command: leave the Cloudflare default (`npx wrangler versions upload`) if the UI requires it

Nitro generates the final Wrangler configuration and points Wrangler at the generated Worker output during the build.

## Important

Do not upload `node_modules`, `.output`, `dist`, `.wrangler`, or `.git`. Cloudflare should install dependencies from `package.json`/`bun.lock` and build them in its Linux environment.

The source includes `src/routes/__root.tsx`, all route files referenced by the generated route tree, and the existing shared `RatingStars` / `VerifiedBadge` components.
