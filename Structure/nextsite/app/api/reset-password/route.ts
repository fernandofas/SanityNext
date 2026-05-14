import { NextRequest, NextResponse } from 'next/server';
import {
  RESET_FILE,
  consumeToken,
  readUsers,
  writeUsers,
  hashPassword,
  findUserById,
} from '../../../lib/auth-server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { token, password } = body;

  if (!token || !password) {
    return NextResponse.json({ error: 'Token and password are required' }, { status: 400 });
  }

  const strongPwRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  if (!strongPwRe.test(password)) {
    return NextResponse.json(
      { error: 'Password must be 8+ chars with uppercase, lowercase, number, and symbol' },
      { status: 400 },
    );
  }

  const record = consumeToken(RESET_FILE, token);
  if (!record || !record.userId) {
    return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 });
  }

  const users = readUsers();
  const idx = users.findIndex((u) => u.id === record.userId);
  if (idx === -1) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  users[idx].passwordHash = hashPassword(password);
  writeUsers(users);

  return NextResponse.json({ ok: true, message: 'Password reset successfully.' });
}
