import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  align?: 'left' | 'center';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  badge?: string;
  overlay?: boolean;
}

const sizeClasses = {
  sm: 'min-h-[200px] py-12',
  md: 'min-h-[320px] py-16',
  lg: 'min-h-[480px] py-20',
  xl: 'min-h-[600px] py-24',
};

export default function PageHero({
  title,
  subtitle,
  description,
  backgroundImage = 'https://placehold.co/1600x700/1B5E30/FFFFFF?text=TBSolaro',
  ctaPrimary,
  ctaSecondary,
  align = 'left',
  size = 'lg',
  badge,
  overlay = true,
}: PageHeroProps) {
  return (
    <section
      className={cn('relative overflow-hidden bg-brand-dark flex items-center', sizeClasses[size])}
      style={{
        backgroundImage: `${overlay ? 'linear-gradient(135deg, rgba(19,67,31,0.88) 0%, rgba(27,94,48,0.65) 60%, rgba(0,0,0,0.3) 100%), ' : ''}url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container-site relative z-10 w-full">
        <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
          {badge && (
            <span className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              {badge}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/80 text-base md:text-lg mb-6 leading-relaxed">{subtitle}</p>
          )}
          {description && (
            <p className="text-white/65 text-sm md:text-base mb-8 leading-relaxed">{description}</p>
          )}
          {(ctaPrimary || ctaSecondary) && (
            <div className={cn('flex flex-wrap gap-4', align === 'center' && 'justify-center')}>
              {ctaPrimary && (
                <a href={ctaPrimary.href} className="btn-white">
                  {ctaPrimary.label}
                </a>
              )}
              {ctaSecondary && (
                <a href={ctaSecondary.href} className="btn-outline-white">
                  {ctaSecondary.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
