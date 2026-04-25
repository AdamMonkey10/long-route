// Self-destructing service worker.
// Earlier builds shipped a buggy SW that cached the old single-file index.html.
// On any visit, this stub unregisters itself and purges all caches so the
// browser falls back to plain network requests for the new app.

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys()
        await Promise.all(keys.map(k => caches.delete(k)))
      } catch {}
      try {
        await self.registration.unregister()
      } catch {}
      try {
        const clients = await self.clients.matchAll({ type: 'window' })
        clients.forEach(c => c.navigate(c.url))
      } catch {}
    })(),
  )
})
