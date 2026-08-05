import { prisma } from '@/lib/prisma';

type Lang = 'Vi' | 'En' | 'Es';

function toLang(locale: string): Lang {
  if (locale === 'en') return 'En';
  if (locale === 'es') return 'Es';
  return 'Vi';
}

export type LocalizedTestimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
};

// eslint-disable-next-line
function localize(row: Record<string, any>, l: Lang): LocalizedTestimonial {
  return {
    id: row.id,
    name: row.name,
    role: row[`role${l}`] || row.roleVi || '',
    content: row[`content${l}`] || row.contentVi || '',
    // Clamp so a bad value can never break the star loop on the homepage
    rating: Math.max(0, Math.min(5, Number(row.rating) || 0)),
    avatar: row.avatar || '',
  };
}

export async function getPublishedTestimonials(locale = 'vi'): Promise<LocalizedTestimonial[]> {
  const l = toLang(locale);
  try {
    const rows = await prisma.testimonial.findMany({
      where: { status: 'published' },
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map((r) => localize(r as unknown as Record<string, unknown>, l));
  } catch {
    // Table not pushed yet — render the page without the section rather than 500
    return [];
  }
}
