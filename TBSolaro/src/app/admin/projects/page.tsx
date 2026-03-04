'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Eye, Trash2, Search, FolderOpen } from 'lucide-react';

interface ProjectRow {
  id: string; slug: string; titleVi: string; location: string;
  power: string; category: string; status: string; featuredImage: string; year: string;
}

const catColors: Record<string, string> = {
  enterprise: 'bg-blue-100 text-blue-700', household: 'bg-amber-100 text-amber-700',
  community: 'bg-purple-100 text-purple-700', csr: 'bg-green-100 text-green-700',
};
const catLabels: Record<string, string> = {
  enterprise: 'Doanh nghiệp', household: 'Hộ gia đình', community: 'Cộng đồng', csr: 'CSR',
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/projects')
      .then((r) => r.json())
      .then((d) => { setProjects(d.items ?? []); setLoading(false); });
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Xóa dự án "${name}"?`)) return;
    await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  const filtered = search
    ? projects.filter((p) => p.titleVi.toLowerCase().includes(search.toLowerCase()))
    : projects;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dự án</h2>
          <p className="text-gray-500 text-sm mt-1">{projects.length} dự án</p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary text-sm flex items-center gap-2">
          <Plus size={16} /> Thêm dự án
        </Link>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Tìm kiếm dự án..." value={search}
          onChange={(e) => setSearch(e.target.value)} className="input-field pl-10 py-2.5 text-sm" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {loading ? <div className="py-16 text-center text-gray-400">Đang tải...</div> : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Dự án</th>
                <th className="text-left px-4 py-4 font-semibold text-gray-600">Danh mục</th>
                <th className="text-left px-4 py-4 font-semibold text-gray-600">Trạng thái</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {p.featuredImage && (
                        <div className="w-12 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <img src={p.featuredImage} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900 line-clamp-1">{p.titleVi}</p>
                        <p className="text-xs text-gray-400">{p.location} {p.power && `· ${p.power}`}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${catColors[p.category] ?? 'bg-gray-100 text-gray-600'}`}>
                      {catLabels[p.category] ?? p.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'published' ? 'bg-green-500' : 'bg-gray-400'}`} />
                      {p.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/vi/projects/${p.slug}`} target="_blank"
                        className="p-2 text-gray-400 hover:text-brand hover:bg-brand-surface rounded-lg transition-colors">
                        <Eye size={15} />
                      </Link>
                      <Link href={`/admin/projects/${p.id}/edit`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={15} />
                      </Link>
                      <button onClick={() => handleDelete(p.id, p.titleVi)}
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
            <FolderOpen size={40} className="mx-auto mb-3 opacity-30" />
            <p>Không tìm thấy dự án nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
