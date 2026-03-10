'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit, Loader2, Shield } from 'lucide-react';

export default function WikiViewPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [isSystem, setIsSystem] = useState(false);
  const [updatedAt, setUpdatedAt] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(async (p) => {
      setId(p.id);
      const res = await fetch(`/api/admin/wiki/${p.id}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title);
        setSlug(data.slug);
        setContent(data.content);
        setIsSystem(data.isSystem);
        setUpdatedAt(data.updatedAt);
      }
      setLoading(false);
    });
  }, [params]);

  if (loading) {
    return <div className="py-16 flex justify-center"><Loader2 size={24} className="animate-spin text-brand" /></div>;
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/wiki" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              {isSystem && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                  <Shield size={10} /> Hệ thống
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-gray-400 text-xs font-mono">{slug}</p>
              {updatedAt && (
                <p className="text-gray-400 text-xs">
                  Cập nhật: {new Date(updatedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </p>
              )}
            </div>
          </div>
        </div>
        <Link href={`/admin/wiki/${id}/edit`} className="btn-primary text-sm flex items-center gap-2">
          <Edit size={15} /> Chỉnh sửa
        </Link>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10">
        <div
          className="prose prose-sm md:prose-base max-w-none
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-h1:text-2xl prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-2
            prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-brand prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900
            prose-code:text-brand prose-code:bg-brand-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:text-xs prose-pre:overflow-x-auto
            prose-ul:text-gray-700 prose-ol:text-gray-700
            prose-li:my-1
            prose-table:text-sm prose-table:w-full
            prose-th:bg-gray-50 prose-th:font-semibold prose-th:text-gray-700 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:border prose-th:border-gray-200
            prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-gray-200 prose-td:text-gray-700
            prose-hr:border-gray-200 prose-hr:my-8
            prose-blockquote:border-brand prose-blockquote:text-gray-600"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
