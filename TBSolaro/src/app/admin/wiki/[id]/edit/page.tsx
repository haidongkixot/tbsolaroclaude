'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Shield } from 'lucide-react';
import RichEditor from '@/components/admin/RichEditor';

export default function WikiEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [isSystem, setIsSystem] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/admin/wiki/${id}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data) {
          setTitle(data.title);
          setSlug(data.slug);
          setContent(data.content);
          setSortOrder(data.sortOrder);
          setIsSystem(data.isSystem);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  async function handleSave() {
    if (!title.trim() || !slug.trim()) { setError('Tiêu đề và slug là bắt buộc.'); return; }
    setSaving(true); setError('');
    try {
      const res = await fetch(`/api/admin/wiki/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, content, sortOrder }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Lỗi không xác định.'); }
      else { router.push('/admin/wiki'); }
    } finally { setSaving(false); }
  }

  if (loading) return <div className="py-16 flex justify-center"><Loader2 size={24} className="animate-spin text-brand" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/wiki" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              {isSystem && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700"><Shield size={10} /> Hệ thống</span>}
            </div>
            <p className="text-gray-500 text-sm mt-0.5 font-mono">{slug}</p>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary text-sm flex items-center gap-2 disabled:opacity-50">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          Lưu thay đổi
        </button>
      </div>

      {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label>
              <input className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
              <RichEditor value={content} onChange={setContent} placeholder="Viết nội dung tài liệu..." />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm">Cài đặt trang</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
              <input className="input-field font-mono text-xs" value={slug} onChange={(e) => setSlug(e.target.value)} disabled={isSystem} />
              {isSystem && <p className="text-xs text-gray-400 mt-1">Slug của trang hệ thống không thể thay đổi.</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự</label>
              <input type="number" className="input-field" value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
