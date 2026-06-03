'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('[DishaSetu] Service Worker registered'))
        .catch((err) => console.error('[DishaSetu] SW registration failed:', err));
    }
  }, []);

  return null;
}
