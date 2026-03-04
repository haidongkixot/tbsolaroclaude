'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductEditor from '../../_components/ProductEditor';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [initial, setInitial] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then((r) => r.json())
      .then(setInitial);
  }, [id]);

  async function handleSave(data: Record<string, unknown>) {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error ?? 'Lỗi khi lưu');
    }
  }

  if (!initial) return <div className="p-8 text-gray-400">Đang tải...</div>;
  return <ProductEditor initial={initial} onSave={handleSave} />;
}
