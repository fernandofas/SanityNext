'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as api from '../api/auth';
import type { User } from '../api/auth';

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: any) => Promise<void>;
  logout: () => Promise<void>;
  forgot: (email: string) => Promise<void>;
  refresh: () => Promise<void>;
  openAuth: (mode?: 'login' | 'register') => void;
  closeAuth: () => void;
  authOpen: boolean;
  authMode: 'login' | 'register';
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const refresh = async () => {
    setLoading(true);
    try {
      const u = await api.getMe();
      setUser(u);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void refresh(); }, []);

  const handleLogin = async (email: string, password: string) => {
    const u = await api.login(email, password);
    setUser(u);
    setAuthOpen(false);
  };

  const handleRegister = async (payload: any) => {
    const u = await api.register(payload);
    if (u) {
      setUser(u);
      setAuthOpen(false);
    } else {
      setAuthOpen(false);
    }
  };

  const handleLogout = async () => {
    await api.logout();
    setUser(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const handleForgot = async (email: string) => {
    await api.forgot(email);
  };

  const openAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const closeAuth = () => setAuthOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        forgot: handleForgot,
        refresh,
        openAuth,
        closeAuth,
        authOpen,
        authMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
