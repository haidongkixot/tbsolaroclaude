import Link from 'next/link';
import { Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { footerQuickLinks, footerPolicyLinks } from '@/lib/data/settings';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex mb-4">
              <img src="/logo.png" alt="TBSolaro" className="h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="text-white/70 text-xs uppercase tracking-wide font-semibold mb-2 leading-snug">
              THAI BINH GREEN POWER<br />INVESTMENT CORPORATION
            </p>
            <p className="text-white/60 text-sm mt-4 leading-relaxed">
              Thành viên của Tập đoàn Thái Bình – Pioneering Solar Energy
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://facebook.com/tbsolaro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://youtube.com/tbsolaro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 transition-colors"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-5">Liên hệ</h3>
            <ul className="space-y-4 text-sm text-white/75">
              <li className="flex gap-3">
                <MapPin size={16} className="shrink-0 mt-0.5 text-brand-accent" />
                <span className="leading-relaxed">
                  Sector H, de la Zona Especial de desarrollo Mariel Municipality Mariel, Province Artemisa, Cuba
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="shrink-0 mt-0.5 text-brand-accent" />
                <a href="tel:+5344555501" className="hover:text-white transition-colors">+53-44-555501</a>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="shrink-0 mt-0.5 text-brand-accent" />
                <a href="mailto:contact@tbsolaro.com" className="hover:text-white transition-colors">contact@tbsolaro.com</a>
              </li>
            </ul>
          </div>

          {/* Quick Nav Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-5">Điều hướng nhanh</h3>
            <ul className="space-y-3">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-accent group-hover:w-2 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-5">Hỗ trợ & Chính sách</h3>
            <ul className="space-y-3">
              {footerPolicyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-accent group-hover:w-2 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-site py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>© 2025 TBSolaro – A member of Thai Binh corporation | All Rights Reserved</p>
          <p>Powered by <span className="text-brand-accent">TBSolaro CMS</span></p>
        </div>
      </div>
    </footer>
  );
}
