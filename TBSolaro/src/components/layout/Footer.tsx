import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { footerQuickLinks, footerPolicyLinks } from '@/lib/data/settings';
import type { SiteSettings } from '@/lib/db/settings';

export default async function Footer({ settings }: { settings?: SiteSettings }) {
  const t = await getTranslations('footer');
  const phone = settings?.footerPhone || '+53-44-555501';
  const email = settings?.footerEmail || 'contact@tbsolaro.com';
  const address = settings?.footerAddress || 'Sector H, de la Zona Especial de desarrollo Mariel Municipality Mariel, Province Artemisa, Cuba';
  const facebook = settings?.footerFacebook || 'https://facebook.com/tbsolaro';
  const youtube = settings?.footerYoutube || 'https://youtube.com/tbsolaro';
  const logo = settings?.logoUrl || '/logo.png';

  const quickLinkKeys = ['quickLink1', 'quickLink2', 'quickLink3', 'quickLink4', 'quickLink5'] as const;
  const policyLinkKeys = ['policyLink1', 'policyLink2', 'policyLink3', 'policyLink4', 'policyLink5', 'policyLink6'] as const;

  return (
    <footer className="bg-brand-dark text-white">
      <div className="container-site py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex mb-4">
              <img src={logo} alt="TBSolaro" className="h-12 w-auto rounded-lg" />
            </Link>
            <p className="text-white/70 text-xs uppercase tracking-wide font-semibold mb-2 leading-snug">
              {t('company')}
            </p>
            <p className="text-white/60 text-sm mt-4 leading-relaxed">
              {t('tagline')}
            </p>
            <div className="flex items-center gap-3 mt-6">
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 transition-colors">
                  <Facebook size={16} />
                </a>
              )}
              {youtube && (
                <a href={youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 transition-colors">
                  <Youtube size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-5">{t('contactTitle')}</h3>
            <ul className="space-y-4 text-sm text-white/75">
              <li className="flex gap-3">
                <MapPin size={16} className="shrink-0 mt-0.5 text-brand-accent" />
                <span className="leading-relaxed">{address}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="shrink-0 mt-0.5 text-brand-accent" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{phone}</a>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="shrink-0 mt-0.5 text-brand-accent" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
              </li>
            </ul>
          </div>

          {/* Quick Nav Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-5">{t('navTitle')}</h3>
            <ul className="space-y-3">
              {footerQuickLinks.map((link, i) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-accent group-hover:w-2 transition-all duration-200" />
                    {t(quickLinkKeys[i])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-5">{t('policyTitle')}</h3>
            <ul className="space-y-3">
              {footerPolicyLinks.map((link, i) => (
                <li key={link.href + i}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-accent group-hover:w-2 transition-all duration-200" />
                    {t(policyLinkKeys[i])}
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
          <p>{t('copyright')}</p>
          <p>{t('poweredBy')} <span className="text-brand-accent">{t('cms')}</span></p>
        </div>
      </div>
    </footer>
  );
}
