'use client';

import { useRouter } from 'next/navigation';
import ProductEditor from '../_components/ProductEditor';

export default function NewProductPage() {
  const router = useRouter();

  async function handleSave(data: Record<string, unknown>) {
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const product = await res.json();
      router.push(`/admin/products/${product.id}/edit`);
    } else {
      const err = await res.json();
      alert(err.error ?? 'Lỗi khi tạo sản phẩm');
    }
  }

  return <ProductEditor onSave={handleSave} />;
}
