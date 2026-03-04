import { cache } from 'react';
import { prisma } from '@/lib/prisma';

export type SiteSettings = {
  logoUrl: string;
  heroImage: string;
  heroTitleVi: string;
  heroTitleEn: string;
  heroTitleEs: string;
  heroSubtitleVi: string;
  heroSubtitleEn: string;
  heroSubtitleEs: string;
  productsHeroImage: string;
  projectsHeroImage: string;
  aboutHeroImage: string;
  contactHeroImage: string;
  communityHeroImage: string;
  faqHeroImage: string;
  showroomHeroImage: string;
  sustainabilityBgImage: string;
  footerPhone: string;
  footerEmail: string;
  footerAddress: string;
  footerFacebook: string;
  footerYoutube: string;
};

const defaults: SiteSettings = {
  logoUrl: '',
  heroImage: '',
  heroTitleVi: '',
  heroTitleEn: '',
  heroTitleEs: '',
  heroSubtitleVi: '',
  heroSubtitleEn: '',
  heroSubtitleEs: '',
  productsHeroImage: '',
  projectsHeroImage: '',
  aboutHeroImage: '',
  contactHeroImage: '',
  communityHeroImage: '',
  faqHeroImage: '',
  showroomHeroImage: '',
  sustainabilityBgImage: '',
  footerPhone: '',
  footerEmail: '',
  footerAddress: '',
  footerFacebook: '',
  footerYoutube: '',
};

// Cached per request (Next.js React cache)
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { id: 'global' } });
    if (!row) return defaults;
    return {
      logoUrl: row.logoUrl,
      heroImage: row.heroImage,
      heroTitleVi: row.heroTitleVi,
      heroTitleEn: row.heroTitleEn,
      heroTitleEs: row.heroTitleEs,
      heroSubtitleVi: row.heroSubtitleVi,
      heroSubtitleEn: row.heroSubtitleEn,
      heroSubtitleEs: row.heroSubtitleEs,
      productsHeroImage: row.productsHeroImage,
      projectsHeroImage: row.projectsHeroImage,
      aboutHeroImage: row.aboutHeroImage,
      contactHeroImage: row.contactHeroImage,
      communityHeroImage: row.communityHeroImage,
      faqHeroImage: row.faqHeroImage,
      showroomHeroImage: row.showroomHeroImage,
      sustainabilityBgImage: row.sustainabilityBgImage,
      footerPhone: row.footerPhone,
      footerEmail: row.footerEmail,
      footerAddress: row.footerAddress,
      footerFacebook: row.footerFacebook,
      footerYoutube: row.footerYoutube,
    };
  } catch {
    return defaults;
  }
});
