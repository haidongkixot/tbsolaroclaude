import { prisma } from '@/lib/prisma';

type Lang = 'Vi' | 'En' | 'Es';

function toLang(locale: string): Lang {
  if (locale === 'en') return 'En';
  if (locale === 'es') return 'Es';
  return 'Vi';
}

function tryParse<T>(v: string, fallback: T): T {
  try { return JSON.parse(v); } catch { return fallback; }
}

// eslint-disable-next-line
function localize(row: Record<string, any>, l: Lang) {
  return {
    id: row.id,
    slug: row.slug,
    status: row.status,
    author: row.author,
    publishedAt: row.publishedAt,
    featuredImage: row.featuredImage,
    seoOgImage: row.seoOgImage,
    gallery: tryParse(row.gallery, [] as string[]),
    tags: tryParse(row.tags, [] as string[]),
    relatedSlugs: tryParse(row.relatedSlugs, [] as string[]),
    title: row[`title${l}`] || row.titleVi,
    excerpt: row[`excerpt${l}`] || row.excerptVi || '',
    content: row[`content${l}`] || row.contentVi || '',
    seoTitle: row[`seoTitle${l}`] || row.seoTitleVi || '',
    seoDesc: row[`seoDesc${l}`] || row.seoDescVi || '',
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function getPublishedPosts(locale = 'vi') {
  const l = toLang(locale);
  const rows = await prisma.blogPost.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
  });
  return rows.map((r) => localize(r as unknown as Record<string, unknown>, l));
}

export async function getPostBySlug(slug: string, locale = 'vi') {
  const l = toLang(locale);
  const row = await prisma.blogPost.findUnique({ where: { slug } });
  if (!row) return null;
  return localize(row as unknown as Record<string, unknown>, l);
}

export async function getRelatedPosts(slugs: string[], locale = 'vi') {
  if (!slugs.length) return [];
  const l = toLang(locale);
  const rows = await prisma.blogPost.findMany({
    where: { slug: { in: slugs }, status: 'published' },
  });
  return rows.map((r) => localize(r as unknown as Record<string, unknown>, l));
}
