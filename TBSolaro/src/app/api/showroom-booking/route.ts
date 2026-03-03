import { NextRequest, NextResponse } from 'next/server';

const bookings: unknown[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, area, showroom, time } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    const booking = {
      id: `sb_${Date.now()}`,
      name,
      email,
      phone: phone || '',
      area: area || '',
      showroom: showroom || '',
      time: time || '',
      status: 'new',
      submittedAt: new Date().toISOString(),
    };

    bookings.push(booking);
    console.log('[ShowroomBooking]', booking);

    return NextResponse.json({ success: true, id: booking.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ bookings });
}
