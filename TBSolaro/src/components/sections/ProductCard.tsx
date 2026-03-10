'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Download, ArrowRight } from 'lucide-react';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'featured';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const t = useTranslations('common');

  if (variant === 'compact') {
    return (
      <article className="card group flex flex-col relative cursor-pointer">
        <Link href={`/products/${product.slug}`} className="absolute inset-0 z-0 rounded-2xl" aria-label={product.title} />
        <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 pointer-events-none">
          <img
            src={product.featuredImage}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 flex flex-col flex-1 pointer-events-none relative">
          <p className="text-xs text-brand font-semibold uppercase tracking-wider mb-1">{product.category}</p>
          <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-brand transition-colors">{product.title}</h3>
          {product.subtitle && <p className="text-xs text-gray-500 mb-2">{product.subtitle}</p>}
          <p className="text-xs text-gray-600 line-clamp-2 mb-3 flex-1">{product.excerpt}</p>
          <div className="flex items-center gap-1 text-brand text-xs font-semibold">
            {t('viewDetails')} <ArrowRight size={12} />
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <div className="card flex flex-col md:flex-row overflow-hidden group">
        <div className="md:w-1/2 relative overflow-hidden bg-gray-100 aspect-video md:aspect-auto">
          <img
            src={product.featuredImage}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
        </div>
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <span className="tag-badge mb-3">{product.category}</span>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h3>
          {product.subtitle && <p className="text-brand font-medium mb-3">{product.subtitle}</p>}
          <p className="text-gray-600 mb-6 leading-relaxed">{product.excerpt}</p>
          <ul className="space-y-2 mb-6">
            {product.features.slice(0, 3).map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <Link href={`/products/${product.slug}`} className="btn-primary text-sm px-5 py-2.5">
              {t('viewDetails')}
            </Link>
            {product.downloadUrl && (
              <a href={product.downloadUrl} className="btn-outline text-sm px-5 py-2.5 flex items-center gap-1.5">
                <Download size={14} /> {t('downloadDoc')}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="card group flex flex-col relative cursor-pointer">
      <Link href={`/products/${product.slug}`} className="absolute inset-0 z-0 rounded-2xl" aria-label={product.title} />
      <div className="relative overflow-hidden aspect-video bg-gray-100 pointer-events-none">
        <img
          src={product.featuredImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="tag-badge text-xs">{product.category}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1 pointer-events-none relative">
        <h3 className="font-bold text-gray-900 text-base mb-1 group-hover:text-brand transition-colors">{product.title}</h3>
        {product.subtitle && <p className="text-brand text-sm font-medium mb-2">{product.subtitle}</p>}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1 leading-relaxed">{product.excerpt}</p>
        <ul className="space-y-1.5 mb-5">
          {product.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-brand text-sm font-semibold flex items-center gap-1">
            {t('viewDetails')} <ArrowRight size={14} />
          </span>
          {product.downloadUrl && (
            <a
              href={product.downloadUrl}
              onClick={(e) => e.stopPropagation()}
              className="text-gray-400 hover:text-brand transition-colors pointer-events-auto relative z-10"
              aria-label={t('downloadDoc')}
            >
              <Download size={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
