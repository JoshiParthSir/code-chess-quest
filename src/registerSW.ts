export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swPath = import.meta.env.BASE_URL + 'sw.js';
      navigator.serviceWorker
        .register(swPath)
        .then((registration) => {
          console.log('✅ ServiceWorker registered:', registration);
          
          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 3600000); // Check every hour
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'activated') {
                  console.log('🔄 New version available! Refresh to update.');
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('❌ ServiceWorker registration failed:', error);
        });
    });
  }
}

// Handle app already installed
export function handleAppInstalled() {
  window.addEventListener('appinstalled', () => {
    console.log('✅ ChessVerse installed as app!');
  });
}

// Get install prompt and handle installation
export function getInstallPrompt() {
  let deferredPrompt: any;

  const promptHandler = (e: any) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('📱 PWA install prompt ready');
    return deferredPrompt;
  };

  window.addEventListener('beforeinstallprompt', promptHandler);

  return deferredPrompt;
}
