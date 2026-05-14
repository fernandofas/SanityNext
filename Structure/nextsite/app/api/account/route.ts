import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  verifyToken,
  findUserById,
  readUsers,
  writeUsers,
  COOKIE_NAME,
} from '../../../lib/auth-server';

async function getAuthUser(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;
  return findUserById(payload.id);
}

export async function DELETE(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const users = readUsers().filter((u) => u.id !== user.id);
  writeUsers(users);

  const res = NextResponse.json({ ok: true, message: 'Account deleted.' });
  res.cookies.set(COOKIE_NAME, '', { httpOnly: true, maxAge: 0, path: '/' });
  return res;
}
