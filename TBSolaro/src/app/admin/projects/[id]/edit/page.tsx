'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProjectEditor from '../../_components/ProjectEditor';

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [initial, setInitial] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch(`/api/admin/projects/${id}`)
      .then((r) => r.json())
      .then(setInitial);
  }, [id]);

  async function handleSave(data: Record<string, unknown>) {
    const res = await fetch(`/api/admin/projects/${id}`, {
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
  return <ProjectEditor initial={initial} onSave={handleSave} />;
}
