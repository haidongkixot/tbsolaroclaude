import Link from 'next/link';

interface SustainabilityBannerProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function SustainabilityBanner({
  title = 'Năng lượng bền vững không chỉ thắp sáng mà còn mở ra cơ hội,\ngiúp cộng đồng Cuba học tập và phát triển.',
  description,
  ctaLabel = 'Khám phá ngay',
  ctaHref = '/community',
}: SustainabilityBannerProps) {
  return (
    <section
      className="relative bg-brand-dark overflow-hidden py-16 md:py-24"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(19,67,31,0.92) 0%, rgba(27,94,48,0.85) 50%, rgba(19,67,31,0.7) 100%), url('https://placehold.co/1600x500/1B5E30/FFFFFF?text=Wind+Turbines')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Decorative wind turbine silhouettes */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute bottom-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath d='M100 180V80' stroke='white' strokeWidth='3'/%3E%3Cpath d='M100 80L60 50M100 80L140 50M100 80L100 30' stroke='white' strokeWidth='2' fill='none'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'bottom',
            backgroundSize: '120px',
          }}
        />
      </div>

      <div className="container-site relative z-10 text-center">
        <p className="text-white text-xl md:text-2xl lg:text-3xl font-semibold max-w-3xl mx-auto leading-relaxed mb-8 whitespace-pre-line">
          {title}
        </p>
        {description && (
          <p className="text-white/75 text-base max-w-xl mx-auto mb-8">{description}</p>
        )}
        <Link href={ctaHref} className="btn-outline-white">
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
