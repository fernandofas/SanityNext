import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken, findUserById, COOKIE_NAME } from '../../../lib/auth-server';

export async function GET(_req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 401 });

  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ user: null }, { status: 401 });

  const user = findUserById(payload.id);
  if (!user) return NextResponse.json({ user: null }, { status: 401 });

  const { passwordHash, ...safeUser } = user;
  return NextResponse.json({ user: safeUser });
}
