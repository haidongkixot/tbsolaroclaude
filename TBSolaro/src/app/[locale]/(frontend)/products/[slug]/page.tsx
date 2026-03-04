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
  return { title: product.title, description: product.excerpt };
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
