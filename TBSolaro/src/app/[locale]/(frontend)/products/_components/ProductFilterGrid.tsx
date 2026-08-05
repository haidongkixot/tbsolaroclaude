'use client';

import { useState } from 'react';
import ProductCard from '@/components/sections/ProductCard';
import type { Product } from '@/types';

export type CategoryOption = { key: string; label: string };

interface ProductFilterGridProps {
  title: string;
  products: Product[];
  categories: CategoryOption[];
  /** Category selected on first render. 'all' shows everything. */
  defaultCategory?: string;
  emptyMessage: string;
}

export default function ProductFilterGrid({
  title,
  products,
  categories,
  defaultCategory = 'all',
  emptyMessage,
}: ProductFilterGridProps) {
  // Fall back to 'all' when the preferred default has no products yet, so the grid
  // is never empty on first load just because that category has nothing published.
  const hasDefault = products.some((p) => p.category === defaultCategory);
  const [active, setActive] = useState(
    defaultCategory === 'all' || hasDefault ? defaultCategory : 'all'
  );

  const visible = active === 'all' ? products : products.filter((p) => p.category === active);

  return (
    <>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActive(cat.key)}
              aria-pressed={active === cat.key}
              className={
                active === cat.key
                  ? 'px-4 py-1.5 rounded-full text-sm font-medium border bg-brand text-white border-brand transition-colors'
                  : 'px-4 py-1.5 rounded-full text-sm font-medium border border-gray-300 text-gray-600 hover:border-brand hover:text-brand transition-colors'
              }
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-gray-400 text-sm">{emptyMessage}</p>
      )}
    </>
  );
}
