import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import {
  findUserByEmail,
  RESET_FILE,
  saveToken,
  sendMail,
} from '../../../lib/auth-server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { email } = body;

  if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

  const user = findUserByEmail(email);
  // Always return 200 to prevent email enumeration
  if (!user) {
    return NextResponse.json({ ok: true, message: 'If that email exists, a reset link has been sent.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(); // 2 hours
  saveToken(RESET_FILE, { token, userId: user.id, expiresAt });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sanitynext.co.uk';
  const resetUrl = `${siteUrl}/reset-password?token=${token}`;

  try {
    await sendMail(
      user.email,
      'Reset your password',
      `<p>Hi ${user.name},</p><p><a href="${resetUrl}">Click here</a> to reset your password.</p><p>This link expires in 2 hours.</p>`,
    );
  } catch {
    // Non-fatal
  }

  return NextResponse.json({ ok: true, message: 'If that email exists, a reset link has been sent.' });
}
