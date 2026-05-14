import { NextRequest, NextResponse } from 'next/server';
import {
  VERIFY_FILE,
  consumeToken,
  readUsers,
  writeUsers,
} from '../../../lib/auth-server';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token') || '';
  if (!token) return NextResponse.json({ error: 'Token required' }, { status: 400 });

  const record = consumeToken(VERIFY_FILE, token);
  if (!record || !record.userId) {
    return NextResponse.json({ error: 'Invalid or expired verification link' }, { status: 400 });
  }

  const users = readUsers();
  const idx = users.findIndex((u) => u.id === record.userId);
  if (idx === -1) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  users[idx].verified = true;
  writeUsers(users);

  return NextResponse.json({ ok: true, message: 'Account verified. You can now sign in.' });
}
