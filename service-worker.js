importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

const rev = "1";
const urlsToCache = [
    { url: '/', revision: rev },
    { url: '/index.html', revision: rev },
    { url: '/nav.html', revision: rev },
    { url: '/schedule.html', revision: rev },
    { url: '/standing.html', revision: rev },
    { url: '/manifest.json', revision: rev },
    { url: '/service-worker.js', revision: rev },
    { url: '/pages/home.html', revision: rev },
    { url: '/pages/favourite.html', revision: rev },
    { url: '/img/soccer128.png', revision: rev },
    { url: '/img/soccer256.png', revision: rev },
    { url: '/img/soccer512.png', revision: rev },
    { url: '/css/materialize.min.css', revision: rev },
    { url: '/css/style.css', revision: rev },
    { url: '/js/api.js', revision: rev },
    { url: '/js/db.js', revision: rev },
    { url: '/js/idb.js', revision: rev },
    { url: '/js/index.js', revision: rev },
    { url: '/js/materialize.min.js', revision: rev },
    { url: '/js/nav.js', revision: rev },
    { url: '/js/reg-sw.js', revision: rev },
    { url: '/js/schedule.js', revision: rev },
    { url: '/js/standing.js', revision: rev },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: rev },
    { url: 'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: rev }
];

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);


workbox.precaching.precacheAndRoute(urlsToCache);
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg|html|css|js|json)$/,
    workbox.strategies.staleWhileRevalidate()
);

/*

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg|html|css|js|json)$/,
    workbox.strategies.cacheFirst()
);


workbox.routing.registerRoute(
    // new RegExp('/pages/'),
    /\.(?:png|gif|jpg|jpeg|svg|html|css|js|json)$/,
    workbox.strategies.staleWhileRevalidate()
);


self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});


self.addEventListener("fetch", event => {
    const base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME)
                .then(cache => fetch(event.request)
                    .then(response => {
                        cache.put(event.request.url, response.clone());
                        return response;
                    }))
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(response => response || fetch(event.request))
        )
    }
});

//mekanisme penghapusan cache yang lama agar tidak membebani pengguna
self.addEventListener("activate", event => {
    event.waitUntil(caches.keys()
        .then(cacheNames => Promise.all(
            cacheNames.map(cacheName => {
                if (cacheName !== CACHE_NAME) {
                    console.log(`ServiceWorker: cache ${cacheName} dihapus`);
                    return caches.delete(cacheName);
                }
            })
        ))
    );
});


*/



//Memberikan action pada button notifikasi
self.addEventListener('notificationclick', event => {
    if (!event.action) {
        // Penguna menyentuh area notifikasi diluar action
        console.log('Notification Click.');
        return;
    }

    switch (event.action) {
        case 'yes-action':
            clients.openWindow('http://localhost:8887/');
            break;
        case 'no-action':
            console.log('Pengguna memilih action no');
            break;
        default:
            console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
            break;
    }
});

//untuk event push, agar service worker dapat menerima push notification
self.addEventListener('push', event => {
    let body = event.data ? event.data.text() : 'Push message no payload';

    const options = {
        body: body,
        badge: './img/soccer128.png',
        icon: './img/soccer128.png',
        image: './img/soccer512.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        renotify: true, //setiap notifikasi memberikan tanda baik ringtone atau getar
        tag: 'notifikasi 1',
        requireInteraction: true, //Harus ada interaksi dengan pengguna
        actions: [
            {
                action: 'yes-action',
                title: 'Yes'
            },
            {
                action: 'no-action',
                title: 'No'
            }
        ]
    };
    event.waitUntil(
        self.registration.showNotification('Match Notification', options)
    );
});
