'use client';

import { AuthProvider } from './AuthContext';
import { CookieConsentProvider } from '../contexts/CookieConsentContext';
import { PostHogProvider } from '../contexts/PostHogContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookieConsentProvider>
      <PostHogProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </PostHogProvider>
    </CookieConsentProvider>
  );
}
