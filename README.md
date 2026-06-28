# Space Generator v02

Generates a full scrollable "Space" page from simulated trip data via a RAG pipeline
(Voyage AI embeddings + Supabase pgvector) and Claude — rebuilt with Vite + React +
TypeScript, rendering through the real `pebble-ds` React design system instead of
raw HTML strings.

## Setup

```bash
npm install
cp .env.example .env   # fill in your own keys
```

Run `supabase/schema.sql` once in the Supabase SQL editor (skip this if pointing
at the same already-seeded project as v01), then:

```bash
npm run seed   # embeds and stores server/events.ts into space_context_events
npm run dev    # starts the API server on :8787 and the Vite dev server on :5173
```

Open `http://localhost:5173` and click "Generate Space" — this calls
`POST /api/generate`, which embeds a hardcoded query, searches Supabase, classifies
the matches into finance/images/chats/contacts/files/map buckets, and asks Claude to
compile the Space as a JSON UI tree (via forced tool-use), which the frontend renders
through real design-system components.

## Structure

- `server/` — RAG pipeline (`embed.ts`/`search.ts`/`assemble.ts`/`classify.ts`),
  seed data (`events.ts`/`contexts.ts`), and the two Claude-backed generators
  (`genui.ts`, `genheader.ts`) that emit a JSON UI tree via `uiSchema.ts`.
- `src/design-system/` — verbatim copy of the `pebble-ds` React component library.
- `src/space/` — the JSON-tree renderer (`renderer.tsx`) and the four local
  Space-layout primitives (`primitives/`) that don't exist in `pebble-ds` itself
  (`SpaceContainer`, `SectionBlock`, `SectionHeadline`, `Text`, `Headline`).
- `src/App.tsx` / `src/main.tsx` — the device-frame chrome and app entry point.

Vite proxies `/api/*` to the API server in dev (see `vite.config.mts`), so the
frontend `fetch()` calls need no special configuration.
