import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Chỉ nhận POST — xem ghi chú về việc gỡ GET trong api/contact/route.ts.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, area, showroom, time } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }
    if (!/.+@.+\..+/.test(String(email))) {
      return NextResponse.json({ error: 'Email không hợp lệ' }, { status: 400 });
    }

    const booking = await prisma.submission.create({
      data: {
        type: 'booking',
        // Form đặt lịch không gửi source — gán cố định phía server
        source: 'showroom_page',
        name: String(name).slice(0, 200),
        email: String(email).slice(0, 200),
        phone: String(phone ?? '').slice(0, 50),
        area: String(area ?? '').slice(0, 200),
        showroom: String(showroom ?? '').slice(0, 200),
        preferredTime: String(time ?? '').slice(0, 50),
      },
    });

    return NextResponse.json({ success: true, id: booking.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
