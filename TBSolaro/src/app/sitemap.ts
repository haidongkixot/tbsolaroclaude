import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

const BASE = 'https://tbsolaro.com';
const LOCALES = ['vi', 'en', 'es'] as const;

function localeUrl(path: string) {
  return LOCALES.map((locale) => ({
    url: `${BASE}${locale === 'vi' ? '' : `/${locale}`}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE}${l === 'vi' ? '' : `/${l}`}${path}`])
      ),
    },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, projects, blogs] = await Promise.all([
    prisma.product.findMany({ where: { status: 'published' }, select: { slug: true, updatedAt: true } }),
    prisma.project.findMany({ where: { status: 'published' }, select: { slug: true, updatedAt: true } }),
    prisma.blogPost.findMany({ where: { status: 'published' }, select: { slug: true, slugEn: true, slugEs: true, updatedAt: true } }),
  ]);

  const staticPages = [
    '', '/about', '/products', '/projects', '/blog',
    '/contact', '/community', '/faq', '/showroom',
  ];

  const staticEntries = staticPages.flatMap((path) => localeUrl(path));

  const productEntries = products.flatMap((p) =>
    LOCALES.map((locale) => ({
      url: `${BASE}${locale === 'vi' ? '' : `/${locale}`}/products/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${BASE}${l === 'vi' ? '' : `/${l}`}/products/${p.slug}`])
        ),
      },
    }))
  );

  const projectEntries = projects.flatMap((p) =>
    LOCALES.map((locale) => ({
      url: `${BASE}${locale === 'vi' ? '' : `/${locale}`}/projects/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${BASE}${l === 'vi' ? '' : `/${l}`}/projects/${p.slug}`])
        ),
      },
    }))
  );

  const blogEntries = blogs.flatMap((p) => {
    const slugFor = (l: string) => l === 'en' && p.slugEn ? p.slugEn : l === 'es' && p.slugEs ? p.slugEs : p.slug;
    return LOCALES.map((locale) => ({
      url: `${BASE}${locale === 'vi' ? '' : `/${locale}`}/blog/${slugFor(locale)}`,
      lastModified: p.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${BASE}${l === 'vi' ? '' : `/${l}`}/blog/${slugFor(l)}`])
        ),
      },
    }));
  });

  return [...staticEntries, ...productEntries, ...projectEntries, ...blogEntries];
}
