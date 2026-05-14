// Mock API for development — simulates contact and auth APIs locally

import type { User } from '../api/auth';

let mockUsers: Array<{
  id: string;
  email: string;
  password: string;
  name?: string;
  surname?: string;
  role: 'administrator' | 'editor' | 'subscriber';
  verified: boolean;
}> = [
  {
    id: '1',
    email: 'admin@sanitynext.com',
    password: 'Admin123!',
    name: 'Admin',
    surname: 'User',
    role: 'administrator',
    verified: true,
  },
  {
    id: '2',
    email: 'test@test.com',
    password: 'Test123!',
    name: 'Test',
    surname: 'User',
    role: 'subscriber',
    verified: true,
  },
];

let currentUser: User = null;

export const isDevelopment = process.env.NODE_ENV === 'development';

export const mockContactAPI = async (formData: Record<string, any>) => {
  console.log('Mock Contact API called with:', formData);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const success = Math.random() > 0.1;
  if (success) {
    console.log('Mock email sent successfully!');
    return { success: true };
  } else {
    throw new Error('Mock error: Email sending failed');
  }
};

export const mockAuthAPI = {
  async getMe(): Promise<User> {
    await new Promise((r) => setTimeout(r, 500));
    return currentUser;
  },

  async login(email: string, password: string): Promise<User> {
    await new Promise((r) => setTimeout(r, 500));
    const u = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (!u) throw new Error('Invalid email or password');
    currentUser = { id: u.id, email: u.email, role: u.role, name: u.name, surname: u.surname };
    return currentUser;
  },

  async register(payload: any): Promise<User> {
    await new Promise((r) => setTimeout(r, 500));
    const existing = mockUsers.find((u) => u.email === payload.email);
    if (existing) throw new Error('Email already registered');
    const newUser = {
      id: String(mockUsers.length + 1),
      email: payload.email,
      password: payload.password,
      name: payload.name,
      surname: payload.surname,
      role: 'subscriber' as const,
      verified: true,
    };
    mockUsers.push(newUser);
    currentUser = { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name, surname: newUser.surname };
    return currentUser;
  },

  async logout(): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    currentUser = null;
  },

  async forgot(email: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 500));
    console.log(`Mock: password reset email sent to ${email}`);
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 500));
    console.log(`Mock: password reset with token ${token}`);
  },
};
