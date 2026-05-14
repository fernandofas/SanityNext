import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  readUsers,
  writeUsers,
  findUserByEmail,
  hashPassword,
  VERIFY_FILE,
  saveToken,
  sendMail,
  User,
} from '../../../lib/auth-server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { name, surname, email, password, phone, company } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const strongPwRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  if (!strongPwRe.test(password)) {
    return NextResponse.json(
      { error: 'Password must be 8+ chars with uppercase, lowercase, number, and symbol' },
      { status: 400 },
    );
  }

  if (findUserByEmail(email)) {
    return NextResponse.json({ error: 'An account with that email already exists' }, { status: 409 });
  }

  const users = readUsers();
  const newUser: User = {
    id: crypto.randomUUID(),
    name: name.trim(),
    surname: (surname || '').trim(),
    email: email.toLowerCase().trim(),
    passwordHash: hashPassword(password),
    phone: phone || '',
    company: company || '',
    address: '',
    postcode: '',
    role: 'user',
    verified: false,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  writeUsers(users);

  // Create verification token
  const verifyToken = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  saveToken(VERIFY_FILE, { token: verifyToken, userId: newUser.id, expiresAt });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sanitynext.co.uk';
  const verifyUrl = `${siteUrl}/verify?token=${verifyToken}`;

  try {
    await sendMail(
      newUser.email,
      'Verify your account',
      `<p>Hi ${newUser.name},</p><p>Please <a href="${verifyUrl}">click here</a> to verify your account.</p><p>This link expires in 24 hours.</p>`,
    );
  } catch {
    // Non-fatal – user registered but email may not be sent in dev
  }

  return NextResponse.json({ ok: true, message: 'Please check your email to verify your account.' });
}
