import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Chỉ nhận POST. GET đã bị gỡ có chủ đích: submissions giờ được lưu thật,
// và một endpoint không auth trả về toàn bộ liên hệ là lỗ hổng lộ dữ liệu cá nhân.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, source } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }
    if (!/.+@.+\..+/.test(String(email))) {
      return NextResponse.json({ error: 'Email không hợp lệ' }, { status: 400 });
    }

    const submission = await prisma.submission.create({
      data: {
        type: 'contact',
        name: String(name).slice(0, 200),
        email: String(email).slice(0, 200),
        phone: String(phone ?? '').slice(0, 50),
        company: String(company ?? '').slice(0, 200),
        message: String(message).slice(0, 5000),
        source: String(source ?? 'contact_form').slice(0, 50),
      },
    });

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
