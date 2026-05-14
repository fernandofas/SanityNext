import { isDevelopment, mockAuthAPI } from '../utils/mockApi';

export type Role = 'administrator' | 'editor' | 'subscriber';
export type User = { id: string; email: string; role: Role; name?: string; surname?: string } | null;

export async function getMe(): Promise<User> {
  if (isDevelopment) return mockAuthAPI.getMe();
  const res = await fetch('/api/me', { credentials: 'include' });
  const data = await res.json();
  return data.user ?? null;
}

export async function login(email: string, password: string): Promise<User> {
  if (isDevelopment) return mockAuthAPI.login(email, password);
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
  return (await res.json()).user;
}

export async function register(payload: any): Promise<User> {
  if (isDevelopment) return mockAuthAPI.register(payload);
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Register failed');
  return null;
}

export async function logout(): Promise<void> {
  if (isDevelopment) return mockAuthAPI.logout();
  await fetch('/api/logout', { method: 'POST', credentials: 'include' });
}

export async function forgot(email: string): Promise<void> {
  if (isDevelopment) return mockAuthAPI.forgot(email);
  await fetch('/api/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(token: string, password: string): Promise<void> {
  if (isDevelopment) return mockAuthAPI.resetPassword(token, password);
  const res = await fetch('/api/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Reset failed');
}
