import { posthog } from 'posthog-js';

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
let enabled = false;
let isInitialized = false;

// Immediately check if PostHog created any storage without consent and clean it up
if (typeof window !== 'undefined') {
  const checkAndCleanup = () => {
    try {
      const consent = localStorage.getItem('cookie-consent');
      const hasConsent = consent && JSON.parse(consent).analytics === true;

      if (!hasConsent) {
        const phKeys = Object.keys(localStorage).filter(
          (k) => k.startsWith('ph_') || k.startsWith('__ph_') || k.includes('posthog')
        );
        if (phKeys.length > 0) {
          phKeys.forEach((k) => localStorage.removeItem(k));
        }

        const cookies = document.cookie.split(';');
        cookies.forEach((cookie) => {
          const [name] = cookie.split('=');
          const trimmedName = name.trim();
          if (trimmedName.startsWith('ph_') || trimmedName.includes('posthog')) {
            document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          }
        });
      }
    } catch (e) {
      console.error('Error checking PostHog consent:', e);
    }
  };

  checkAndCleanup();
  setTimeout(checkAndCleanup, 100);
  setTimeout(checkAndCleanup, 500);
}

const hasAnalyticsConsent = (): boolean => {
  try {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return false;
    return JSON.parse(consent).analytics === true;
  } catch {
    return false;
  }
};

export const initPostHog = () => {
  if (!key || isInitialized) return;

  if (typeof window === 'undefined') return;

  if (!hasAnalyticsConsent()) {
    enabled = false;
    return;
  }

  posthog.init(key, {
    api_host: host || 'https://app.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: false,
    persistence: 'localStorage+cookie',
    loaded: (ph) => {
      enabled = true;
      isInitialized = true;
    },
  });
};

export { posthog };
export { enabled };
