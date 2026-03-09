'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, FileText, Shield, Loader2, BookOpen } from 'lucide-react';

type WikiPage = {
  id: string;
  slug: string;
  title: string;
  sortOrder: number;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function AdminWikiPage() {
  const [pages, setPages] = useState<WikiPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/wiki');
      if (res.ok) setPages(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: string) {
    const res = await fetch(`/api/admin/wiki/${id}`, { method: 'DELETE' });
    if (res.ok) { setDeleteConfirm(null); load(); }
    else {
      const data = await res.json();
      alert(data.error || 'Không thể xóa trang này.');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Wiki</h2>
          <p className="text-gray-500 text-sm mt-1">Tài liệu nội bộ và hướng dẫn API</p>
        </div>
        <Link href="/admin/wiki/new" className="btn-primary text-sm">
          <Plus size={16} /> Tạo trang mới
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="py-16 flex justify-center"><Loader2 size={24} className="animate-spin text-brand" /></div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Tiêu đề</th>
                <th className="text-left px-4 py-4 font-semibold text-gray-600">Slug</th>
                <th className="text-left px-4 py-4 font-semibold text-gray-600">Loại</th>
                <th className="text-left px-4 py-4 font-semibold text-gray-600">Cập nhật</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-surface flex items-center justify-center shrink-0">
                        {page.isSystem ? <BookOpen size={15} className="text-brand" /> : <FileText size={15} className="text-brand" />}
                      </div>
                      <p className="font-semibold text-gray-900">{page.title}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-400 font-mono">{page.slug}</td>
                  <td className="px-4 py-4">
                    {page.isSystem ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        <Shield size={10} /> Hệ thống
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        <FileText size={10} /> Tùy chỉnh
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-500">
                    {new Date(page.updatedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/wiki/${page.id}/edit`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Chỉnh sửa">
                        <Edit size={14} />
                      </Link>
                      {!page.isSystem && (
                        <button onClick={() => setDeleteConfirm(page.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && pages.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            <FileText size={32} className="mx-auto mb-2 opacity-20" />
            <p className="text-sm">Chưa có trang wiki nào</p>
          </div>
        )}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Xóa trang wiki?</h3>
            <p className="text-sm text-gray-500 mb-6">Hành động này không thể hoàn tác.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 btn-outline text-sm py-2.5">Hủy</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors">Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
