import { NextRequest, NextResponse } from 'next/server';
import {
  findUserByEmail,
  verifyPassword,
  signToken,
  COOKIE_NAME,
  COOKIE_OPTIONS,
} from '../../../lib/auth-server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  const user = findUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  if (!verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  if (!user.verified) {
    return NextResponse.json({ error: 'Please verify your email before signing in' }, { status: 403 });
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS);
  return res;
}
