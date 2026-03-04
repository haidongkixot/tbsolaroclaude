'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { Search, Globe, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'products', href: '/products' },
  { key: 'showroom', href: '/showroom' },
  { key: 'community', href: '/community' },
  { key: 'projects', href: '/projects' },
  { key: 'faq', href: '/faq' },
  { key: 'contact', href: '/contact' },
] as const;

const localeOptions = [
  { code: 'vi', label: 'VI – Tiếng Việt' },
  { code: 'en', label: 'EN – English' },
  { code: 'es', label: 'ES – Español' },
];

export default function Header({ logoUrl }: { logoUrl?: string }) {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('nav');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container-site">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img src={logoUrl || '/logo.png'} alt="TBSolaro" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'nav-link py-2',
                  pathname === item.href && 'nav-link-active text-brand'
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search */}
            {searchOpen ? (
              <form
                onSubmit={(e) => { e.preventDefault(); setSearchOpen(false); }}
                className="flex items-center gap-2"
              >
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="text-sm border border-gray-300 rounded-full px-4 py-1.5 w-48 focus:outline-none focus:ring-2 focus:ring-brand/50"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1 text-gray-400 hover:text-brand"
                >
                  <X size={16} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label={t('search')}
                className="p-2 text-gray-500 hover:text-brand rounded-full hover:bg-brand-surface transition-colors"
              >
                <Search size={18} />
              </button>
            )}

            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="p-2 text-gray-500 hover:text-brand rounded-full hover:bg-brand-surface transition-colors flex items-center gap-1"
              >
                <Globe size={18} />
                <span className="text-sm font-medium text-gray-600">{locale.toUpperCase()}</span>
                <ChevronDown
                  size={14}
                  className={cn('transition-transform duration-200', langOpen && 'rotate-180')}
                />
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  {localeOptions.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => switchLocale(opt.code)}
                      className={cn(
                        'w-full text-left px-4 py-2.5 text-sm transition-colors',
                        locale === opt.code
                          ? 'text-brand font-semibold bg-brand-surface'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-brand'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-brand rounded-lg"
            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in">
          <nav className="container-site py-4 flex flex-col gap-1">
            {navItems.map((item) => (
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
                {t(item.key)}
              </Link>
            ))}

            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-2 px-4 pt-3 border-t border-gray-100 mt-2">
              {localeOptions.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => switchLocale(opt.code)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors',
                    locale === opt.code
                      ? 'bg-brand text-white border-brand'
                      : 'border-gray-300 text-gray-600 hover:border-brand hover:text-brand'
                  )}
                >
                  {opt.code.toUpperCase()}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
