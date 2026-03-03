'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, FolderOpen, FileText, HelpCircle,
  MapPin, Download, MessageSquare, Settings, LogOut, Sun, ChevronRight, Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'Sản phẩm', icon: Package },
  { href: '/admin/projects', label: 'Dự án', icon: FolderOpen },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/faq', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/showrooms', label: 'Showroom', icon: MapPin },
  { href: '/admin/downloads', label: 'Tài liệu', icon: Download },
  { href: '/admin/submissions', label: 'Liên hệ', icon: MessageSquare },
  { href: '/admin/users', label: 'Người dùng', icon: Users },
  { href: '/admin/settings', label: 'Cài đặt', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark text-white flex flex-col shrink-0 fixed top-0 left-0 h-screen overflow-y-auto">
        {/* Brand */}
        <div className="p-6 border-b border-white/10">
          <img src="/logo.png" alt="TBSolaro" className="h-9 w-auto brightness-0 invert mb-1" />
          <span className="text-white/50 text-xs">Admin CMS</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {nav.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                  active
                    ? 'bg-white/15 text-white'
                    : 'text-white/65 hover:text-white hover:bg-white/10'
                )}
              >
                <Icon size={17} />
                {label}
                {active && <ChevronRight size={14} className="ml-auto text-white/50" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/65 hover:text-white hover:bg-white/10 transition-all"
          >
            <Sun size={17} /> Xem website
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/65 hover:text-white hover:bg-white/10 transition-all mt-1">
            <LogOut size={17} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-sm font-semibold text-gray-500">
            TBSolaro CMS <span className="text-gray-300 mx-2">/</span>
            <span className="text-gray-900">
              {nav.find((n) => (n.exact ? pathname === n.href : pathname.startsWith(n.href)))?.label || 'Admin'}
            </span>
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white text-sm font-bold">A</div>
            <div className="text-sm">
              <p className="font-medium text-gray-900 leading-none">Admin</p>
              <p className="text-gray-500 text-xs">admin@tbsolaro.com</p>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
