import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  verifyToken,
  findUserById,
  readUsers,
  writeUsers,
  hashPassword,
  COOKIE_NAME,
} from '../../../../lib/auth-server';

async function getAuthUser(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;
  return findUserById(payload.id);
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { name, surname, phone, company, address, postcode, password } = body;

  const users = readUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx === -1) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  if (name) users[idx].name = name.trim();
  if (surname !== undefined) users[idx].surname = surname.trim();
  if (phone !== undefined) users[idx].phone = phone;
  if (company !== undefined) users[idx].company = company;
  if (address !== undefined) users[idx].address = address;
  if (postcode !== undefined) users[idx].postcode = postcode;

  if (password) {
    const strongPwRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!strongPwRe.test(password)) {
      return NextResponse.json(
        { error: 'Password must be 8+ chars with uppercase, lowercase, number, and symbol' },
        { status: 400 },
      );
    }
    users[idx].passwordHash = hashPassword(password);
  }

  writeUsers(users);

  const { passwordHash, ...profile } = users[idx];
  return NextResponse.json({ ok: true, profile });
}
