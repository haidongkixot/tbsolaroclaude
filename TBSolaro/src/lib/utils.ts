import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + '...' : str;
}

/**
 * Extract the 11-character YouTube video id from any common URL form:
 * watch?v=, youtu.be/, embed/, shorts/, live/ — or a raw id pasted directly.
 * Returns null when nothing recognisable is found, so callers can hide the
 * player instead of rendering a broken embed.
 */
export function getYouTubeId(url: string): string | null {
  const s = (url || '').trim();
  if (!s) return null;
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/,          // youtube.com/watch?v=ID
    /youtu\.be\/([A-Za-z0-9_-]{11})/,      // youtu.be/ID
    /\/embed\/([A-Za-z0-9_-]{11})/,        // youtube.com/embed/ID
    /\/shorts\/([A-Za-z0-9_-]{11})/,       // youtube.com/shorts/ID
    /\/live\/([A-Za-z0-9_-]{11})/,         // youtube.com/live/ID
  ];
  for (const re of patterns) {
    const m = s.match(re);
    if (m) return m[1];
  }
  return null;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
