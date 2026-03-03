'use client';

import { useState } from 'react';
import { Save, Globe, Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react';
import { siteSettings } from '@/lib/data/settings';

interface SettingValue {
  key: string;
  value: string;
  label: string;
  group: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingValue[]>(siteSettings);
  const [saved, setSaved] = useState(false);

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => prev.map((s) => (s.key === key ? { ...s, value } : s)));
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.group]) acc[setting.group] = [];
    acc[setting.group].push(setting);
    return acc;
  }, {} as Record<string, SettingValue[]>);

  const groupLabels: Record<string, string> = {
    general: 'Cài đặt chung',
    brand: 'Thương hiệu',
    contact: 'Thông tin liên hệ',
    social: 'Mạng xã hội',
    footer: 'Footer',
  };

  const groupIcons: Record<string, React.ReactNode> = {
    general: <Globe size={16} />,
    brand: <span>🎨</span>,
    contact: <MapPin size={16} />,
    social: <LinkIcon size={16} />,
    footer: <span>📄</span>,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cài đặt Website</h2>
          <p className="text-gray-500 text-sm mt-1">Quản lý thông tin chung của website TBSolaro</p>
        </div>
        <button
          onClick={handleSave}
          className={`btn-primary text-sm transition-all ${saved ? 'bg-green-600 hover:bg-green-700' : ''}`}
        >
          <Save size={15} />
          {saved ? 'Đã lưu!' : 'Lưu cài đặt'}
        </button>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedSettings).map(([group, groupSettings]) => (
          <div key={group} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 bg-gray-50">
              <span className="text-brand">{groupIcons[group] || '⚙️'}</span>
              <h3 className="font-semibold text-gray-900 text-sm">{groupLabels[group] || group}</h3>
            </div>
            <div className="p-6 space-y-4">
              {groupSettings.map((setting) => (
                <div key={setting.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{setting.label}</label>
                  {setting.value.length > 80 ? (
                    <textarea
                      rows={2}
                      value={setting.value}
                      onChange={(e) => updateSetting(setting.key, e.target.value)}
                      className="textarea-field text-sm"
                    />
                  ) : (
                    <input
                      type="text"
                      value={setting.value}
                      onChange={(e) => updateSetting(setting.key, e.target.value)}
                      className="input-field text-sm"
                    />
                  )}
                  <p className="text-xs text-gray-400 mt-1 font-mono">key: {setting.key}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Navigation Management */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 bg-gray-50">
            <span>🔗</span>
            <h3 className="font-semibold text-gray-900 text-sm">Menu điều hướng</h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-4">
              Chỉnh sửa file <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">src/lib/data/settings.ts</code> để cập nhật menu điều hướng và footer links.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 text-xs font-mono text-gray-600 leading-relaxed">
              {`// mainNav trong settings.ts\nexport const mainNav: NavItem[] = [\n  { label: 'Trang chủ', href: '/' },\n  { label: 'About Us', href: '/about' },\n  { label: 'Sản phẩm', href: '/products' },\n  // ...\n];`}
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 bg-gray-50">
            <span>🔍</span>
            <h3 className="font-semibold text-gray-900 text-sm">SEO mặc định</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title mặc định</label>
              <input className="input-field text-sm" defaultValue="TBSolaro – Năng Lượng Mặt Trời Bền Vững" placeholder="Meta title..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description mặc định</label>
              <textarea rows={2} className="textarea-field text-sm" defaultValue="TBSolaro – Thương hiệu điện năng lượng mặt trời hàng đầu của Tập đoàn Thái Bình. Kiến tạo năng lượng bền vững, nuôi dưỡng tương lai xanh." placeholder="Meta description..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">OG Image mặc định</label>
              <input className="input-field text-sm" defaultValue="/images/og-default.jpg" placeholder="/images/og-default.jpg" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={handleSave} className={`btn-primary ${saved ? 'bg-green-600 hover:bg-green-700' : ''}`}>
          <Save size={15} /> {saved ? 'Đã lưu!' : 'Lưu tất cả cài đặt'}
        </button>
      </div>
    </div>
  );
}
