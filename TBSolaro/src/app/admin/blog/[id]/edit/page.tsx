'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlogEditor from '../../_components/BlogEditor';

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const [initial, setInitial] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch(`/api/admin/blog/${id}`)
      .then((r) => r.json())
      .then(setInitial);
  }, [id]);

  async function handleSave(data: Record<string, unknown>) {
    const res = await fetch(`/api/admin/blog/${id}`, {
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
  return <BlogEditor initial={initial} onSave={handleSave} />;
}
