'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Eye, Trash2, Search, FileText } from 'lucide-react';

interface BlogRow {
  id: string; slug: string; titleVi: string; author: string;
  status: string; featuredImage: string; publishedAt: string | null; createdAt: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogRow[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/blog')
      .then((r) => r.json())
      .then((d) => { setPosts(d.items ?? []); setLoading(false); });
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Xóa bài viết "${name}"?`)) return;
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  const filtered = search
    ? posts.filter((p) => p.titleVi.toLowerCase().includes(search.toLowerCase()))
    : posts;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog</h2>
          <p className="text-gray-500 text-sm mt-1">{posts.length} bài viết</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary text-sm flex items-center gap-2">
          <Plus size={16} /> Thêm bài viết
        </Link>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Tìm kiếm bài viết..." value={search}
          onChange={(e) => setSearch(e.target.value)} className="input-field pl-10 py-2.5 text-sm" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {loading ? <div className="py-16 text-center text-gray-400">Đang tải...</div> : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Bài viết</th>
                <th className="text-left px-4 py-4 font-semibold text-gray-600">Tác giả</th>
                <th className="text-left px-4 py-4 font-semibold text-gray-600">Trạng thái</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {post.featuredImage && (
                        <div className="w-12 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <img src={post.featuredImage} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900 line-clamp-1">{post.titleVi}</p>
                        <p className="text-xs text-gray-400">
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('vi-VN') : new Date(post.createdAt).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{post.author}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${post.status === 'published' ? 'bg-green-500' : 'bg-gray-400'}`} />
                      {post.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/vi/blog/${post.slug}`} target="_blank"
                        className="p-2 text-gray-400 hover:text-brand hover:bg-brand-surface rounded-lg transition-colors">
                        <Eye size={15} />
                      </Link>
                      <Link href={`/admin/blog/${post.id}/edit`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={15} />
                      </Link>
                      <button onClick={() => handleDelete(post.id, post.titleVi)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            <FileText size={40} className="mx-auto mb-3 opacity-30" />
            <p>Không tìm thấy bài viết nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
