// Present only to satisfy Chrome's PWA installability check (a registered
// service worker with a fetch handler). Deliberately does no caching — the
// generated space/header content is dynamic per request and must never be
// served stale, so every fetch just passes straight through to the network.
self.addEventListener("fetch", () => {})
