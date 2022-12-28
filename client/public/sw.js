const staticCacheName = 'site-static'
const dynamicCacheName = 'site-dynamic'
const assets = [
	'/',
	'/index.html',
	'/logo192.png',
	'/logo512.png',
	'/mask512.png',
	'/logoApple.png'
]

// install event
self.addEventListener('install', evt => {
	//console.log('service worker installed');
	evt.waitUntil(
		caches.open(staticCacheName).then((cache) => {
			cache.addAll(assets)
		})
	)
})

// activate event
self.addEventListener('activate', evt => {
	//console.log('service worker activated');
	evt.waitUntil(
		caches.keys().then(keys => {
			//console.log(keys);
			return Promise.all(keys
				.filter(key => key !== staticCacheName && key !== dynamicCacheName)
				.map(key => caches.delete(key))
			)
		})
	)
})

// fetch events
self.addEventListener('fetch', evt => {
	evt.respondWith(
		caches.match(evt.request).then(cacheRes => {
			return cacheRes || fetch(evt.request).then(fetchRes => {
				return caches.open(dynamicCacheName).then(cache => {
					cache.put(evt.request.url, fetchRes.clone())
					// check cached items size
					return fetchRes
				})
			})
		})
	)
})