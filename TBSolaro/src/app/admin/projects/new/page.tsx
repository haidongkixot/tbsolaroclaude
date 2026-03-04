'use client';

import { useRouter } from 'next/navigation';
import ProjectEditor from '../_components/ProjectEditor';

export default function NewProjectPage() {
  const router = useRouter();

  async function handleSave(data: Record<string, unknown>) {
    const res = await fetch('/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const project = await res.json();
      router.push(`/admin/projects/${project.id}/edit`);
    } else {
      const err = await res.json();
      alert(err.error ?? 'Lỗi khi tạo dự án');
    }
  }

  return <ProjectEditor onSave={handleSave} />;
}
