import { prisma } from '@/lib/prisma';
import type { ProductTier } from '@/types';

type Lang = 'Vi' | 'En' | 'Es';

function toLang(locale: string): Lang {
  if (locale === 'en') return 'En';
  if (locale === 'es') return 'Es';
  return 'Vi';
}

function tryParse<T>(v: string, fallback: T): T {
  try { return JSON.parse(v); } catch { return fallback; }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function localize(row: Record<string, any>, l: Lang) {
  return {
    id: row.id,
    slug: row.slug,
    status: row.status,
    category: row.category,
    sortOrder: row.sortOrder,
    downloadUrl: row.downloadUrl,
    featuredImage: row.featuredImage,
    seoOgImage: row.seoOgImage,
    gallery: tryParse(row.gallery, [] as string[]),
    tags: tryParse(row.tags, [] as string[]),
    relatedSlugs: tryParse(row.relatedSlugs, [] as string[]),
    title: row[`title${l}`] || row.titleVi,
    subtitle: row[`subtitle${l}`] || row.subtitleVi || '',
    excerpt: row[`excerpt${l}`] || row.excerptVi || '',
    features: tryParse(row[`features${l}`] || row.featuresVi, [] as string[]),
    specs: tryParse(row[`specs${l}`] || row.specsVi, {} as Record<string, string>),
    tiers: tryParse(row[`tiers${l}`] || row.tiersVi, [] as ProductTier[]),
    seoTitle: row[`seoTitle${l}`] || row.seoTitleVi || '',
    seoDesc: row[`seoDesc${l}`] || row.seoDescVi || '',
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function getPublishedProducts(locale = 'vi') {
  const l = toLang(locale);
  const rows = await prisma.product.findMany({
    where: { status: 'published' },
    orderBy: { sortOrder: 'asc' },
  });
  return rows.map((r) => localize(r as unknown as Record<string, unknown>, l));
}

export async function getProductBySlug(slug: string, locale = 'vi') {
  const l = toLang(locale);
  const row = await prisma.product.findUnique({ where: { slug } });
  if (!row) return null;
  return localize(row as unknown as Record<string, unknown>, l);
}

export async function getRelatedProducts(slugs: string[], locale = 'vi') {
  if (!slugs.length) return [];
  const l = toLang(locale);
  const rows = await prisma.product.findMany({
    where: { slug: { in: slugs }, status: 'published' },
  });
  return rows.map((r) => localize(r as unknown as Record<string, unknown>, l));
}

export async function getFeaturedCombos(locale = 'vi') {
  const l = toLang(locale);
  const rows = await prisma.product.findMany({
    where: { status: 'published', category: 'combo' },
    orderBy: { sortOrder: 'asc' },
    take: 3,
  });
  return rows.map((r) => localize(r as unknown as Record<string, unknown>, l));
}
