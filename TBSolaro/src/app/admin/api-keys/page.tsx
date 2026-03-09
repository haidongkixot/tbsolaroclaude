'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Key, Check, Copy, ToggleLeft, ToggleRight, Loader2, X, Shield, Eye } from 'lucide-react';

type ApiKey = {
  id: string;
  name: string;
  keyPrefix: string;
  permissions: 'read' | 'write' | 'all';
  status: 'active' | 'revoked';
  lastUsed?: string | null;
  createdAt: string;
};

const permConfig = {
  read:  { label: 'Read only',  color: 'bg-blue-100 text-blue-700',   desc: 'GET requests only' },
  write: { label: 'Read/Write', color: 'bg-amber-100 text-amber-700', desc: 'GET + POST + PUT' },
  all:   { label: 'Full access',color: 'bg-red-100 text-red-700',     desc: 'GET + POST + PUT + DELETE' },
};

export default function AdminApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPerms, setNewPerms] = useState<'read' | 'write' | 'all'>('read');
  const [creating, setCreating] = useState(false);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/api-keys');
      if (res.ok) setKeys(await res.json());
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleCreate() {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch('/api/admin/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, permissions: newPerms }),
      });
      const data = await res.json();
      if (res.ok) {
        setCreatedKey(data.fullKey);
        setNewName('');
        setNewPerms('read');
        setShowCreate(false);
        load();
      }
    } finally { setCreating(false); }
  }

  async function handleToggle(key: ApiKey) {
    const newStatus = key.status === 'active' ? 'revoked' : 'active';
    const res = await fetch(`/api/admin/api-keys/${key.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) load();
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/admin/api-keys/${id}`, { method: 'DELETE' });
    if (res.ok) { setDeleteConfirm(null); load(); }
  }

  function handleCopy() {
    if (createdKey) {
      navigator.clipboard.writeText(createdKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const activeCount = keys.filter((k) => k.status === 'active').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">API Keys</h2>
          <p className="text-gray-500 text-sm mt-1">{keys.length} khóa · {activeCount} đang hoạt động</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary text-sm"><Plus size={16} /> Tạo API key</button>
      </div>

      {/* New Key Banner */}
      {createdKey && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
              <Check size={15} className="text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-green-900 mb-1">API key đã được tạo!</p>
              <p className="text-xs text-green-700 mb-3">Sao chép và lưu ngay. Bạn sẽ không thể xem lại key này.</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white border border-green-200 rounded-lg px-3 py-2 text-xs font-mono text-gray-800 break-all">{createdKey}</code>
                <button onClick={handleCopy} className="shrink-0 p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                </button>
              </div>
            </div>
            <button onClick={() => setCreatedKey(null)} className="text-green-400 hover:text-green-600 shrink-0"><X size={18} /></button>
          </div>
        </div>
      )}

      {/* Info box */}
      <div className="mb-6 bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
        <Eye size={16} className="text-blue-500 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-700">
          <p className="font-semibold mb-1">Cách sử dụng API key</p>
          <p>Thêm header <code className="bg-blue-100 px-1 rounded">Authorization: Bearer YOUR_KEY</code> vào mọi request tới <code className="bg-blue-100 px-1 rounded">/api/v1/</code>. Xem tài liệu đầy đủ trong <strong>Wiki → API Reference</strong>.</p>
        </div>
      </div>

      {/* Keys table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="py-16 flex justify-center"><Loader2 size={24} className="animate-spin text-brand" /></div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Tên</th>
                <th className="text-left px-4 py-4 font-semibold text-gray-600">Key</th>
                <th className="text-left px-4 py-4 font-semibold text-gray-600">Quyền</th>
                <th className="text-left px-4 py-4 font-semibold text-gray-600">Trạng thái</th>
                <th className="text-left px-4 py-4 font-semibold text-gray-600">Lần dùng cuối</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {keys.map((k) => {
                const pc = permConfig[k.permissions];
                return (
                  <tr key={k.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                          <Key size={15} className="text-gray-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{k.name}</p>
                          <p className="text-xs text-gray-400">{new Date(k.createdAt).toLocaleDateString('vi-VN')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-600">{k.keyPrefix}</code>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${pc.color}`}>
                          <Shield size={10} /> {pc.label}
                        </span>
                        <p className="text-xs text-gray-400 mt-0.5">{pc.desc}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <button onClick={() => handleToggle(k)} className="flex items-center gap-1.5 group">
                        {k.status === 'active' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                            <ToggleRight size={11} /> Hoạt động
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 group-hover:bg-green-50 group-hover:text-green-700 transition-colors">
                            <ToggleLeft size={11} /> Đã thu hồi
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-500">
                      {k.lastUsed ? new Date(k.lastUsed).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : <span className="text-gray-300 italic">Chưa sử dụng</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        <button onClick={() => setDeleteConfirm(k.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {!loading && keys.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            <Key size={32} className="mx-auto mb-2 opacity-20" />
            <p className="text-sm">Chưa có API key nào</p>
            <p className="text-xs mt-1">Tạo key đầu tiên để cho phép truy cập API bên ngoài.</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Tạo API key mới</h3>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên key *</label>
                <input className="input-field" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Ví dụ: Agent crawler, Mobile app..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mức quyền</label>
                <div className="space-y-2">
                  {(Object.entries(permConfig) as ['read' | 'write' | 'all', typeof permConfig['read']][]).map(([perm, cfg]) => (
                    <label key={perm} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${newPerms === perm ? 'border-brand bg-brand-surface' : 'border-gray-200 hover:border-brand/30'}`}>
                      <input type="radio" name="perm" value={perm} checked={newPerms === perm} onChange={() => setNewPerms(perm)} className="accent-brand" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{cfg.label}</p>
                        <p className="text-xs text-gray-500">{cfg.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700">
                Key đầy đủ chỉ hiển thị <strong>một lần</strong> sau khi tạo. Hãy sao chép và lưu ngay.
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowCreate(false)} className="btn-outline text-sm px-5 py-2.5">Hủy</button>
              <button onClick={handleCreate} disabled={creating || !newName.trim()} className="btn-primary text-sm px-5 py-2.5 disabled:opacity-50 flex items-center gap-2">
                {creating && <Loader2 size={14} className="animate-spin" />}
                Tạo key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4"><Trash2 size={24} className="text-red-600" /></div>
            <h3 className="font-bold text-gray-900 mb-2">Xóa API key?</h3>
            <p className="text-sm text-gray-500 mb-6">Các request đang dùng key này sẽ bị từ chối ngay lập tức.</p>
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
