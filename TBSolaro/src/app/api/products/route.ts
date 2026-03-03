import { NextRequest, NextResponse } from 'next/server';
import { getPublishedProducts, getProductBySlug } from '@/lib/data/products';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const category = searchParams.get('category');

  if (slug) {
    const product = getProductBySlug(slug);
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(product);
  }

  let products = getPublishedProducts();
  if (category) products = products.filter((p) => p.category === category);

  return NextResponse.json({ products, total: products.length });
}
