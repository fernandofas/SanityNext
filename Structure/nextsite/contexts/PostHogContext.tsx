'use client';

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { initPostHog, posthog } from '../lib/posthog';

interface PostHogContextType {
  posthog: typeof posthog;
}

const PostHogContext = createContext<PostHogContextType | undefined>(undefined);

export const usePostHog = () => {
  const ctx = useContext(PostHogContext);
  if (!ctx) throw new Error('usePostHog must be used within PostHogProvider');
  return ctx;
};

export const PostHogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    initPostHog();
  }, []);

  const value = useMemo(() => ({ posthog }), []);

  return <PostHogContext.Provider value={value}>{children}</PostHogContext.Provider>;
};
