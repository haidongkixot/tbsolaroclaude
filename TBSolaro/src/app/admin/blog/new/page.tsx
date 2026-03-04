'use client';

import { useRouter } from 'next/navigation';
import BlogEditor from '../_components/BlogEditor';

export default function NewBlogPage() {
  const router = useRouter();

  async function handleSave(data: Record<string, unknown>) {
    const res = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const post = await res.json();
      router.push(`/admin/blog/${post.id}/edit`);
    } else {
      const err = await res.json();
      alert(err.error ?? 'Lỗi khi tạo bài viết');
    }
  }

  return <BlogEditor onSave={handleSave} />;
}
