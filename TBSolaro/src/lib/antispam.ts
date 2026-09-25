import { createHash } from 'crypto';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Chống spam cho form công khai, không cần dịch vụ captcha bên ngoài — 3 lớp:
 *
 * 1. Honeypot (`_hp`): form render một input ẩn mà người thật không thấy và
 *    không điền. Bot điền bừa mọi field → có giá trị → chặn.
 * 2. Bẫy thời gian (`_t`): form gửi kèm số mili-giây từ lúc trang mở tới lúc
 *    submit. Người thật cần ít nhất vài giây để gõ; bot submit gần như tức thì.
 * 3. Giới hạn tần suất theo IP: đếm submission cùng IP (băm sha256, không lưu
 *    IP thô) trong cửa sổ 10 phút, vượt 5 lần thì chặn 429.
 *
 * Với (1) và (2), route trả về "fake success" 201 — bot tưởng đã gửi thành công
 * nên không đổi chiến thuật, còn dữ liệu rác không được lưu.
 *
 * Về injection: SQL injection đã bị chặn sẵn vì Prisma parameterize toàn bộ
 * truy vấn; XSS phía admin không xảy ra vì React escape mọi chuỗi khi render;
 * nội dung đưa vào email thông báo được escapeHtml trong lib/notify.ts.
 */

const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 phút
const RATE_MAX = 5;                    // tối đa 5 submission / IP / cửa sổ
const MIN_FILL_MS = 3000;              // người thật khó điền form xong dưới 3 giây

export function getIpHash(req: NextRequest): string {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    '';
  if (!ip) return '';
  return createHash('sha256').update(ip).digest('hex');
}

/** true = chắc chắn bot (honeypot có giá trị, hoặc điền form nhanh phi con người) */
export function looksLikeBot(body: Record<string, unknown>): boolean {
  if (typeof body._hp === 'string' && body._hp.trim() !== '') return true;
  // Chỉ phạt khi client CÓ gửi _t và giá trị quá nhỏ. Không gửi _t (ví dụ gọi
  // API trực tiếp) thì không kết luận được — đã có rate limit đỡ phía sau.
  if (body._t !== undefined) {
    const t = Number(body._t);
    if (!Number.isFinite(t) || t < MIN_FILL_MS) return true;
  }
  return false;
}

/** true = IP này gửi quá nhiều trong cửa sổ hiện tại */
export async function isRateLimited(ipHash: string): Promise<boolean> {
  if (!ipHash) return false;
  const since = new Date(Date.now() - RATE_WINDOW_MS);
  const count = await prisma.submission.count({
    where: { ipHash, createdAt: { gte: since } },
  });
  return count >= RATE_MAX;
}
