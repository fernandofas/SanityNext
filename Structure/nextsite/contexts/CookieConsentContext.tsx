'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export type CookieCategory = 'essential' | 'analytics' | 'marketing';

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentContextType {
  consent: CookieConsent | null;
  hasConsented: boolean;
  showBanner: boolean;
  acceptAll: () => void;
  acceptSelected: (consent: CookieConsent) => void;
  rejectAll: () => void;
  updateConsent: (consent: CookieConsent) => void;
  resetConsent: () => void;
  openBanner: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const CONSENT_STORAGE_KEY = 'cookie-consent';
const CONSENT_TIMESTAMP_KEY = 'cookie-consent-timestamp';

export const useCookieConsent = () => {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error('useCookieConsent must be used within CookieConsentProvider');
  return ctx;
};

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [hasConsented, setHasConsented] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const checkConsent = useCallback(() => {
    const savedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    const savedTimestamp = localStorage.getItem(CONSENT_TIMESTAMP_KEY);
    if (savedConsent && savedTimestamp) {
      const consentData = JSON.parse(savedConsent) as CookieConsent;
      const timestamp = parseInt(savedTimestamp);
      const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000;
      if (timestamp > oneYearAgo) {
        setConsent(consentData);
        setHasConsented(true);
        setShowBanner(false);
      } else {
        setConsent(null);
        setHasConsented(false);
        setShowBanner(true);
      }
    } else {
      setConsent(null);
      setHasConsented(false);
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
    checkConsent();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) checkConsent();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [checkConsent]);

  // Re-check consent on route change
  useEffect(() => {
    checkConsent();
  }, [pathname, checkConsent]);

  const saveConsent = useCallback((c: CookieConsent) => {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(c));
    localStorage.setItem(CONSENT_TIMESTAMP_KEY, String(Date.now()));
    setConsent(c);
    setHasConsented(true);
    setShowBanner(false);
  }, []);

  const acceptAll = useCallback(() =>
    saveConsent({ essential: true, analytics: true, marketing: true }), [saveConsent]);

  const rejectAll = useCallback(() =>
    saveConsent({ essential: true, analytics: false, marketing: false }), [saveConsent]);

  const acceptSelected = useCallback((c: CookieConsent) =>
    saveConsent({ ...c, essential: true }), [saveConsent]);

  const updateConsent = useCallback((c: CookieConsent) =>
    saveConsent({ ...c, essential: true }), [saveConsent]);

  const resetConsent = useCallback(() => {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    localStorage.removeItem(CONSENT_TIMESTAMP_KEY);
    setConsent(null);
    setHasConsented(false);
    setShowBanner(true);
  }, []);

  const openBanner = useCallback(() => setShowBanner(true), []);

  const value = useMemo(
    () => ({ consent, hasConsented, showBanner, acceptAll, acceptSelected, rejectAll, updateConsent, resetConsent, openBanner }),
    [consent, hasConsented, showBanner, acceptAll, acceptSelected, rejectAll, updateConsent, resetConsent, openBanner]
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
};
