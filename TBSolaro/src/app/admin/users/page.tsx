'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Shield, UserCheck, UserX, Search, Key } from 'lucide-react';
import type { AdminUser, UserRole } from '@/types';

const mockUsers: AdminUser[] = [
  { id: 'u_1', name: 'Admin TBSolaro', email: 'admin@tbsolaro.com', role: 'superadmin', status: 'active', lastLogin: '2025-07-02T08:15:00Z', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'u_2', name: 'Nguyễn Thị Mai', email: 'mai.nguyen@tbsolaro.com', role: 'admin', status: 'active', lastLogin: '2025-07-01T14:30:00Z', createdAt: '2024-03-15T00:00:00Z' },
  { id: 'u_3', name: 'Trần Văn Hùng', email: 'hung.tran@tbsolaro.com', role: 'editor', status: 'active', lastLogin: '2025-06-30T09:00:00Z', createdAt: '2024-05-20T00:00:00Z' },
  { id: 'u_4', name: 'Lê Thị Hoa', email: 'hoa.le@tbsolaro.com', role: 'editor', status: 'inactive', lastLogin: '2025-05-10T11:00:00Z', createdAt: '2024-06-01T00:00:00Z' },
  { id: 'u_5', name: 'Phạm Minh Tuấn', email: 'tuan.pham@tbsolaro.com', role: 'viewer', status: 'active', lastLogin: undefined, createdAt: '2025-06-15T00:00:00Z' },
];

const roleConfig: Record<UserRole, { label: string; color: string; description: string }> = {
  superadmin: { label: 'Super Admin', color: 'bg-purple-100 text-purple-700', description: 'Toàn quyền hệ thống' },
  admin:      { label: 'Admin',       color: 'bg-blue-100 text-blue-700',   description: 'Quản lý nội dung & người dùng' },
  editor:     { label: 'Editor',      color: 'bg-amber-100 text-amber-700', description: 'Tạo & chỉnh sửa nội dung' },
  viewer:     { label: 'Viewer',      color: 'bg-gray-100 text-gray-600',   description: 'Chỉ xem' },
};

type FormState = {
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  password: string;
};

const emptyForm: FormState = { name: '', email: '', role: 'editor', status: 'active', password: '' };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = users.filter((u) => {
    const matchRole = filterRole === 'all' || u.role === filterRole;
    const matchSearch = search === '' || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  function openAdd() {
    setEditingUser(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(user: AdminUser) {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email, role: user.role, status: user.status, password: '' });
    setShowForm(true);
  }

  function handleSave() {
    if (!form.name.trim() || !form.email.trim()) return;
    if (editingUser) {
      setUsers((prev) => prev.map((u) => u.id === editingUser.id ? { ...u, ...form } : u));
    } else {
      const newUser: AdminUser = {
        id: `u_${Date.now()}`,
        name: form.name,
        email: form.email,
        role: form.role,
        status: form.status,
        createdAt: new Date().toISOString(),
      };
      setUsers((prev) => [...prev, newUser]);
    }
    setShowForm(false);
  }

  function handleDelete(id: string) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setDeleteConfirm(null);
  }

  function toggleStatus(id: string) {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  }

  const activeCount = users.filter((u) => u.status === 'active').length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h2>
          <p className="text-gray-500 text-sm mt-1">{users.length} tài khoản · {activeCount} đang hoạt động</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm">
          <Plus size={16} /> Thêm người dùng
        </button>
      </div>

      {/* Role summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {(Object.entries(roleConfig) as [UserRole, typeof roleConfig[UserRole]][]).map(([role, cfg]) => {
          const count = users.filter((u) => u.role === role).length;
          return (
            <button
              key={role}
              onClick={() => setFilterRole(filterRole === role ? 'all' : role)}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                filterRole === role ? 'border-brand bg-brand-surface' : 'border-gray-200 bg-white hover:border-brand/40'
              }`}
            >
              <p className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-flex mb-2 ${cfg.color}`}>{cfg.label}</p>
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-xs text-gray-500">{cfg.description}</p>
            </button>
          );
        })}
      </div>

      {/* Search + Filter bar */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm tên hoặc email..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </div>
          {filterRole !== 'all' && (
            <button onClick={() => setFilterRole('all')} className="text-xs text-gray-500 hover:text-brand underline">
              Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Người dùng</th>
              <th className="text-left px-4 py-4 font-semibold text-gray-600">Vai trò</th>
              <th className="text-left px-4 py-4 font-semibold text-gray-600">Trạng thái</th>
              <th className="text-left px-4 py-4 font-semibold text-gray-600">Đăng nhập lần cuối</th>
              <th className="text-left px-4 py-4 font-semibold text-gray-600">Ngày tạo</th>
              <th className="text-right px-6 py-4 font-semibold text-gray-600">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((user) => {
              const rc = roleConfig[user.role];
              const initials = user.name.split(' ').map((w) => w[0]).slice(-2).join('').toUpperCase();
              return (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {initials}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${rc.color}`}>
                      <Shield size={11} /> {rc.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => toggleStatus(user.id)} className="group flex items-center gap-1.5">
                      {user.status === 'active' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                          <UserCheck size={11} /> Hoạt động
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 group-hover:bg-green-50 group-hover:text-green-700 transition-colors">
                          <UserX size={11} /> Vô hiệu
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-500">
                    {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                      : <span className="text-gray-300 italic">Chưa đăng nhập</span>
                    }
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(user)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Chỉnh sửa">
                        <Edit size={14} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Đổi mật khẩu">
                        <Key size={14} />
                      </button>
                      {user.role !== 'superadmin' && (
                        <button onClick={() => setDeleteConfirm(user.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            <Shield size={32} className="mx-auto mb-2 opacity-20" />
            <p className="text-sm">Không tìm thấy người dùng nào</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">{editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                <input
                  className="input-field"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  className="input-field"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="email@tbsolaro.com"
                />
              </div>
              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu *</label>
                  <input
                    type="password"
                    className="input-field"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    placeholder="Tối thiểu 8 ký tự"
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                  <select
                    className="input-field bg-white"
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as UserRole }))}
                  >
                    {(Object.entries(roleConfig) as [UserRole, typeof roleConfig[UserRole]][]).map(([role, cfg]) => (
                      <option key={role} value={role}>{cfg.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                  <select
                    className="input-field bg-white"
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as 'active' | 'inactive' }))}
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Vô hiệu</option>
                  </select>
                </div>
              </div>

              {/* Role description */}
              <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600">
                <p className="font-medium text-gray-700 mb-1">Quyền hạn: <span className={`px-1.5 py-0.5 rounded-full ${roleConfig[form.role].color}`}>{roleConfig[form.role].label}</span></p>
                <p>{roleConfig[form.role].description}</p>
                <ul className="mt-2 space-y-0.5 text-gray-500">
                  {form.role === 'superadmin' && <li>• Quản lý toàn bộ hệ thống, người dùng, cài đặt</li>}
                  {(form.role === 'superadmin' || form.role === 'admin') && <li>• Duyệt và xuất bản tất cả nội dung</li>}
                  {(form.role === 'superadmin' || form.role === 'admin' || form.role === 'editor') && <li>• Tạo và chỉnh sửa sản phẩm, dự án, blog</li>}
                  <li>• Xem báo cáo và thống kê</li>
                </ul>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowForm(false)} className="btn-outline text-sm px-5 py-2.5">Hủy</button>
              <button
                onClick={handleSave}
                disabled={!form.name.trim() || !form.email.trim()}
                className="btn-primary text-sm px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingUser ? 'Cập nhật' : 'Tạo tài khoản'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Xóa người dùng?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Hành động này không thể hoàn tác. Tài khoản sẽ bị xóa vĩnh viễn.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 btn-outline text-sm py-2.5">Hủy</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors">
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
