import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendSubmissionNotification } from '@/lib/notify';
import { getIpHash, looksLikeBot, isRateLimited } from '@/lib/antispam';

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

    // Bot rơi vào honeypot / bẫy thời gian: trả fake success để bot không đổi
    // chiến thuật, nhưng không lưu gì cả.
    if (looksLikeBot(body)) {
      return NextResponse.json({ success: true, id: `cs_${Date.now()}` }, { status: 201 });
    }

    const ipHash = getIpHash(request);
    if (await isRateLimited(ipHash)) {
      return NextResponse.json({ error: 'Quá nhiều yêu cầu, vui lòng thử lại sau ít phút.' }, { status: 429 });
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
        ipHash,
      },
    });

    // Không bao giờ throw; timeout 5s — xem lib/notify.ts
    await sendSubmissionNotification(submission);

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
