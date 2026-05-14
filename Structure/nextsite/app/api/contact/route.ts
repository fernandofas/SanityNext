import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '../../../lib/auth-server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { emailTo, fields } = body;

  if (!fields || !Array.isArray(fields)) {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const to = emailTo || process.env.CONTACT_EMAIL || process.env.SMTP_FROM || 'info@sanitynext.co.uk';

  const rows = fields
    .map((f: { label: string; value: string }) => `<tr><td><strong>${f.label}</strong></td><td>${f.value}</td></tr>`)
    .join('');

  const html = `<table border="0" cellpadding="6" cellspacing="0">${rows}</table>`;

  try {
    await sendMail(to, 'New enquiry from website', html);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Contact email error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
