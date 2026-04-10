import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts, getPublishedProducts } from '@/lib/db/products';
import ProductDetailClient from './_components/ProductDetailClient';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale);
  if (!product) return {};
  const url = `https://tbsolaro.com${locale === 'vi' ? '' : `/${locale}`}/products/${slug}`;
  return {
    title: product.title,
    description: product.excerpt,
    alternates: {
      canonical: url,
      languages: { vi: `https://tbsolaro.com/products/${slug}`, en: `https://tbsolaro.com/en/products/${slug}`, es: `https://tbsolaro.com/es/products/${slug}` },
    },
    openGraph: {
      title: product.title, description: product.excerpt, url, type: 'website',
      images: product.featuredImage ? [{ url: product.featuredImage, width: 1200, height: 630 }] : [],
    },
    twitter: { card: 'summary_large_image', title: product.title, description: product.excerpt, images: product.featuredImage ? [product.featuredImage] : [] },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params;

  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug, locale),
    getPublishedProducts(locale),
  ]);
  if (!product) notFound();

  const relatedRaw = await getRelatedProducts(product.relatedSlugs || [], locale);
  const related = relatedRaw.length > 0 ? relatedRaw : allProducts.filter((p) => p.slug !== slug).slice(0, 3);

  return <ProductDetailClient product={product as never} related={related as never} />;
}
