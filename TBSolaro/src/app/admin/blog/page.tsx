'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Eye, Trash2, Search } from 'lucide-react';
import { getPublishedPosts } from '@/lib/data/blog';
import type { BlogPost } from '@/types';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(getPublishedPosts());
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const filtered = posts.filter(
    (p) => search === '' || p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog & Tin tức</h2>
          <p className="text-gray-500 text-sm mt-1">{posts.length} bài viết</p>
        </div>
        <button onClick={() => { setEditingPost(null); setShowForm(true); }} className="btn-primary text-sm">
          <Plus size={16} /> Viết bài mới
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Tìm kiếm bài viết..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10 py-2.5 text-sm" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Bài viết</th>
              <th className="text-left px-4 py-4 font-semibold text-gray-600">Tags</th>
              <th className="text-left px-4 py-4 font-semibold text-gray-600">Ngày đăng</th>
              <th className="text-left px-4 py-4 font-semibold text-gray-600">Trạng thái</th>
              <th className="text-right px-6 py-4 font-semibold text-gray-600">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 line-clamp-1">{post.title}</p>
                      <p className="text-xs text-gray-400">{post.author}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-600 text-xs">{post.publishedAt}</td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Đã xuất bản
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-brand hover:bg-brand-surface rounded-lg transition-colors"><Eye size={15} /></Link>
                    <button onClick={() => { setEditingPost(post); setShowForm(true); }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={15} /></button>
                    <button onClick={() => setPosts((prev) => prev.filter((p) => p.id !== post.id))} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-16 text-center text-gray-400">Không tìm thấy bài viết nào</div>}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">{editingPost ? 'Sửa bài viết' : 'Viết bài mới'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label><input className="input-field" defaultValue={editingPost?.title || ''} placeholder="Tiêu đề bài viết" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label><input className="input-field" defaultValue={editingPost?.slug || ''} placeholder="tieu-de-bai-viet" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Tác giả</label><input className="input-field" defaultValue={editingPost?.author || ''} placeholder="Tên tác giả" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label><textarea rows={2} className="textarea-field" defaultValue={editingPost?.excerpt || ''} placeholder="Mô tả ngắn..." /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Nội dung (HTML)</label><textarea rows={6} className="textarea-field font-mono text-xs" defaultValue={editingPost?.content || ''} placeholder="<p>Nội dung...</p>" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Tags (cách nhau bởi dấu phẩy)</label><input className="input-field" defaultValue={editingPost?.tags?.join(', ') || ''} placeholder="tag1, tag2, tag3" /></div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="btn-outline text-sm px-5 py-2.5">Hủy</button>
              <button onClick={() => setShowForm(false)} className="btn-primary text-sm px-5 py-2.5">{editingPost ? 'Cập nhật' : 'Xuất bản'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
