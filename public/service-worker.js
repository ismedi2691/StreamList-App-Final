// JavaScript source code

const CACHE_NAME = "v1";
const CACHE_ASSETS = [
    '/',
    '/index.html',
    '/offline.html',
    '/manifest.json',
    '/static/js/bundle.js', // Adjust as necessary for build
    '/static/css/main.css', // Adjust as necessary for build
];

// Install Event
this.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching files');
                cache.addAll(CACHE_ASSETS);
            })
            .then(() => this.skipWaiting())
    );
});

// Activate Event
this.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        console.log('Removing old cache');
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

// Fetch Event
this.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .catch(() => caches.match(event.request))
    );
});

