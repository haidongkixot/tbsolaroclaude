import { NextResponse } from 'next/server';
import { getPublishedFAQs } from '@/lib/data/faq';

export async function GET() {
  const faqs = getPublishedFAQs();
  return NextResponse.json({ faqs, total: faqs.length });
}
