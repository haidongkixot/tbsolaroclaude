import { prisma } from '@/lib/prisma';

/**
 * Gửi email báo cho admin khi có submission mới từ form liên hệ / đặt lịch.
 *
 * - Danh sách người nhận lấy từ SiteSetting.notifyEmails (Admin › Cài đặt),
 *   mỗi dòng hoặc dấu phẩy một email.
 * - Gửi qua Resend HTTP API (https://resend.com) — không cần thêm dependency.
 *   Cần env RESEND_API_KEY; tùy chọn EMAIL_FROM (mặc định onboarding@resend.dev,
 *   chỉ gửi được tới email chủ tài khoản Resend cho tới khi verify domain).
 * - KHÔNG BAO GIỜ throw: submission đã lưu thành công là điều quan trọng nhất,
 *   lỗi gửi mail chỉ được log lại. Timeout 5s để không giữ response của khách.
 */

type SubmissionLike = {
  id: string;
  type: string;
  source: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  area: string;
  showroom: string;
  preferredTime: string;
  createdAt: Date;
};

const ADMIN_URL = 'https://tbsolaro.com/admin/submissions';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function parseNotifyEmails(raw: string): string[] {
  return Array.from(new Set(
    (raw || '')
      .split(/[\n,;]+/)
      .map((s) => s.trim())
      .filter((s) => /.+@.+\..+/.test(s))
  )).slice(0, 10); // tối đa 10 người nhận
}

function buildEmail(s: SubmissionLike): { subject: string; html: string } {
  const isBooking = s.type === 'booking';
  const subject = isBooking
    ? `[TBSolaro] Đặt lịch showroom mới từ ${s.name}`
    : `[TBSolaro] Liên hệ mới từ ${s.name}`;

  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 12px;color:#6b7280;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 12px;color:#111827">${escapeHtml(value)}</td></tr>`
      : '';

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto">
    <div style="background:#1B5E30;color:#fff;padding:14px 20px;border-radius:12px 12px 0 0">
      <strong>${isBooking ? '📅 Đặt lịch showroom mới' : '✉️ Liên hệ mới từ website'}</strong>
    </div>
    <table style="width:100%;border-collapse:collapse;background:#f9fafb;border:1px solid #e5e7eb;font-size:14px">
      ${row('Họ tên', s.name)}
      ${row('Email', s.email)}
      ${row('Điện thoại', s.phone)}
      ${row('Công ty', s.company)}
      ${isBooking ? row('Showroom', s.showroom) : ''}
      ${isBooking ? row('Diện tích', s.area) : ''}
      ${isBooking && s.preferredTime ? row('Thời gian hẹn', new Date(s.preferredTime).toLocaleString('vi-VN')) : ''}
      ${row('Nội dung', s.message)}
      ${row('Nguồn', s.source)}
      ${row('Thời điểm', s.createdAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }))}
    </table>
    <div style="padding:16px 0;text-align:center">
      <a href="${ADMIN_URL}" style="background:#1B5E30;color:#fff;text-decoration:none;padding:10px 24px;border-radius:999px;font-size:14px;display:inline-block">Mở trang quản trị</a>
    </div>
    <p style="color:#9ca3af;font-size:12px;text-align:center">Email tự động từ TBSolaro CMS — chỉnh danh sách nhận tại Admin › Cài đặt.</p>
  </div>`;

  return { subject, html };
}

export async function sendSubmissionNotification(submission: SubmissionLike): Promise<void> {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return; // chưa cấu hình — bỏ qua trong im lặng, form vẫn hoạt động bình thường

    const settings = await prisma.siteSetting.findUnique({
      where: { id: 'global' },
      select: { notifyEmails: true },
    });
    const recipients = parseNotifyEmails(settings?.notifyEmails ?? '');
    if (recipients.length === 0) return;

    const { subject, html } = buildEmail(submission);
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'TBSolaro <onboarding@resend.dev>',
        to: recipients,
        subject,
        html,
        // Bấm Reply là trả lời thẳng cho khách
        reply_to: /.+@.+\..+/.test(submission.email) ? submission.email : undefined,
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.error('[notify] Resend trả về', res.status, (await res.text()).slice(0, 300));
    }
  } catch (e) {
    console.error('[notify] Gửi email thông báo thất bại:', e instanceof Error ? e.message : e);
  }
}
