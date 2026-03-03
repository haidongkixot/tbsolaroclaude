import { NextRequest, NextResponse } from 'next/server';

// In production, this would save to a database
const submissions: unknown[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, source } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    const submission = {
      id: `cs_${Date.now()}`,
      name,
      email,
      phone: phone || '',
      company: company || '',
      message,
      source: source || 'contact_form',
      status: 'new',
      submittedAt: new Date().toISOString(),
    };

    submissions.push(submission);
    console.log('[ContactSubmission]', submission);

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ submissions });
}
