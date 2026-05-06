/**
 * Service Worker - Crono Servicio Automotriz
 * Cache estratégico para carga ultrarrápida y soporte offline básico
 */

const CACHE_NAME = 'crono-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/og-image.svg'
];

// ===== Instalación: precachear archivos estáticos =====
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ===== Activación: limpiar caches viejos =====
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ===== Fetch: estrategia "network first, cache fallback" =====
self.addEventListener('fetch', (event) => {
  // Solo cachear GET requests
  if (event.request.method !== 'GET') return;

  // No cachear requests a APIs externas (WhatsApp, Instagram, Maps)
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la red responde, actualizar cache y devolver
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Si la red falla, intentar desde cache
        return caches.match(event.request);
      })
  );
});
