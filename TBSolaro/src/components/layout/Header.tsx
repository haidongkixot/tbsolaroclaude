'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Search, Globe, Menu, X, ChevronDown } from 'lucide-react';
import { mainNav } from '@/lib/data/settings';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container-site">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img src="/logo.png" alt="TBSolaro" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'nav-link py-2',
                  pathname === item.href && 'nav-link-active text-brand'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="hidden lg:flex items-center gap-3">
            {searchOpen ? (
              <form onSubmit={(e) => { e.preventDefault(); setSearchOpen(false); }} className="flex items-center gap-2">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="text-sm border border-gray-300 rounded-full px-4 py-1.5 w-48 focus:outline-none focus:ring-2 focus:ring-brand/50"
                />
                <button type="button" onClick={() => setSearchOpen(false)} className="p-1 text-gray-400 hover:text-brand">
                  <X size={16} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Tìm kiếm"
                className="p-2 text-gray-500 hover:text-brand rounded-full hover:bg-brand-surface transition-colors"
              >
                <Search size={18} />
              </button>
            )}
            <button
              aria-label="Đổi ngôn ngữ"
              className="p-2 text-gray-500 hover:text-brand rounded-full hover:bg-brand-surface transition-colors flex items-center gap-1"
            >
              <Globe size={18} />
              <span className="text-sm font-medium text-gray-600">VI</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-brand rounded-lg"
            aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in">
          <nav className="container-site py-4 flex flex-col gap-1">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-brand-surface text-brand'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-brand'
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 px-4 pt-3 border-t border-gray-100 mt-2">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand">
                <Search size={16} /> Tìm kiếm
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand ml-auto">
                <Globe size={16} /> VI/ES
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
