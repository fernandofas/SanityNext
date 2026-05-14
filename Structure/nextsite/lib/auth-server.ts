import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const DATA_DIR = path.join(process.cwd(), 'data');
export const USERS_FILE = path.join(DATA_DIR, 'users.json');
export const VERIFY_FILE = path.join(DATA_DIR, 'verify.json');
export const RESET_FILE = path.join(DATA_DIR, 'reset.json');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ---- Data helpers ----

export function readJSON(file: string): any[] {
  ensureDir();
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return [];
  }
}

export function writeJSON(file: string, data: any[]) {
  ensureDir();
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  passwordHash: string; // hex:hex (salt:hash)
  phone?: string;
  company?: string;
  address?: string;
  postcode?: string;
  role: string;
  verified: boolean;
  createdAt: string;
};

export function readUsers(): User[] {
  return readJSON(USERS_FILE) as User[];
}

export function writeUsers(users: User[]) {
  writeJSON(USERS_FILE, users);
}

export function findUserByEmail(email: string): User | undefined {
  return readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  return readUsers().find((u) => u.id === id);
}

// ---- Password helpers ----

export function hashPassword(password: string, salt?: string): string {
  const s = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, s, 100_000, 64, 'sha512').toString('hex');
  return `${s}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt] = stored.split(':');
  const attempt = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(attempt), Buffer.from(stored));
}

// ---- JWT helpers ----

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not set');
  return secret;
}

export function signToken(payload: { id: string; email: string; role: string }): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' });
}

export function verifyToken(token: string): { id: string; email: string; role: string } | null {
  try {
    return jwt.verify(token, getJwtSecret()) as any;
  } catch {
    return null;
  }
}

// ---- Token store helpers (for verify/reset) ----

type TokenRecord = { token: string; userId?: string; email?: string; expiresAt: string; used?: boolean };

export function saveToken(file: string, record: TokenRecord) {
  const records = readJSON(file) as TokenRecord[];
  // Clean expired
  const now = Date.now();
  const fresh = records.filter((r) => new Date(r.expiresAt).getTime() > now);
  fresh.push(record);
  writeJSON(file, fresh);
}

export function consumeToken(file: string, token: string): TokenRecord | null {
  const records = readJSON(file) as TokenRecord[];
  const idx = records.findIndex((r) => r.token === token && !r.used && new Date(r.expiresAt).getTime() > Date.now());
  if (idx === -1) return null;
  records[idx].used = true;
  writeJSON(file, records);
  return records[idx];
}

// ---- Mailer ----
import nodemailer from 'nodemailer';

export function buildTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.mailgun.org',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendMail(to: string, subject: string, html: string) {
  const transport = buildTransport();
  await transport.sendMail({
    from: process.env.SMTP_FROM || `"${process.env.SITE_NAME || 'SanityNext'}" <noreply@sanitynext.co.uk>`,
    to,
    subject,
    html,
  });
}

// ---- Cookie helpers ----
export const COOKIE_NAME = 'auth_token';
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',
};
