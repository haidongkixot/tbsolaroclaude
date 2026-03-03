'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Eye, Trash2, Search, MapPin, Zap } from 'lucide-react';
import { getPublishedProjects } from '@/lib/data/projects';
import type { Project } from '@/types';

const categoryColors: Record<string, string> = {
  enterprise: 'bg-blue-100 text-blue-700',
  household: 'bg-amber-100 text-amber-700',
  community: 'bg-purple-100 text-purple-700',
  csr: 'bg-green-100 text-green-700',
};

const categoryLabels: Record<string, string> = {
  enterprise: 'Doanh nghiệp', household: 'Hộ gia đình', community: 'Cộng đồng', csr: 'CSR',
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(getPublishedProjects());
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const filtered = projects.filter(
    (p) => search === '' || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())
  );

  const deleteProject = (id: string) => {
    if (confirm('Bạn chắc chắn muốn xóa dự án này?')) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dự án</h2>
          <p className="text-gray-500 text-sm mt-1">{projects.length} dự án</p>
        </div>
        <button onClick={() => { setEditingProject(null); setShowForm(true); }} className="btn-primary text-sm">
          <Plus size={16} /> Thêm dự án
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Tìm kiếm dự án..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10 py-2.5 text-sm" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Dự án</th>
              <th className="text-left px-4 py-4 font-semibold text-gray-600">Loại</th>
              <th className="text-left px-4 py-4 font-semibold text-gray-600">Địa điểm</th>
              <th className="text-left px-4 py-4 font-semibold text-gray-600">Công suất</th>
              <th className="text-right px-6 py-4 font-semibold text-gray-600">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      <img src={project.featuredImage} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                    <p className="font-semibold text-gray-900 line-clamp-1">{project.title}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[project.category]}`}>
                    {categoryLabels[project.category]}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-600 text-xs flex items-center gap-1">
                  <MapPin size={11} /> {project.location}
                </td>
                <td className="px-4 py-4 text-gray-600 text-xs">
                  {project.power && <span className="flex items-center gap-1"><Zap size={11} />{project.power}</span>}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/projects/${project.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-brand hover:bg-brand-surface rounded-lg transition-colors">
                      <Eye size={15} />
                    </Link>
                    <button onClick={() => { setEditingProject(project); setShowForm(true); }} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit size={15} />
                    </button>
                    <button onClick={() => deleteProject(project.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400">Không tìm thấy dự án nào</div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">{editingProject ? 'Sửa dự án' : 'Thêm dự án mới'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên dự án *</label>
                <input className="input-field" defaultValue={editingProject?.title || ''} placeholder="Tên dự án" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input className="input-field" defaultValue={editingProject?.slug || ''} placeholder="project-slug" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại dự án</label>
                  <select className="input-field bg-white" defaultValue={editingProject?.category || 'csr'}>
                    <option value="enterprise">Doanh nghiệp</option>
                    <option value="household">Hộ gia đình</option>
                    <option value="community">Cộng đồng</option>
                    <option value="csr">CSR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Công suất</label>
                  <input className="input-field" defaultValue={editingProject?.power || ''} placeholder="5 kWp" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label>
                <input className="input-field" defaultValue={editingProject?.location || ''} placeholder="Thành phố, Quốc gia" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả ngắn</label>
                <textarea rows={3} className="textarea-field" defaultValue={editingProject?.excerpt || ''} placeholder="Mô tả ngắn..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung (HTML)</label>
                <textarea rows={5} className="textarea-field font-mono text-xs" defaultValue={editingProject?.content || ''} placeholder="<p>Nội dung bài viết...</p>" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="btn-outline text-sm px-5 py-2.5">Hủy</button>
              <button onClick={() => setShowForm(false)} className="btn-primary text-sm px-5 py-2.5">
                {editingProject ? 'Cập nhật' : 'Thêm mới'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
