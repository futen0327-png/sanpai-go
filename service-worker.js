const isDev = location.hostname === 'localhost' || location.hostname.includes('vercel.app');

self.addEventListener('fetch', (event) => {
  if (isDev) {
    // 開発モード：常に最新を取得
    event.respondWith(fetch(event.request));
  } else {
    // 本番モード：キャッシュ優先
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
