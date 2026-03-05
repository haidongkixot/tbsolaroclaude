import { cache } from 'react';
import { prisma } from '@/lib/prisma';

export type HeroSlide = {
  image: string;
  titleVi: string;
  titleEn: string;
  titleEs: string;
  subtitleVi: string;
  subtitleEn: string;
  subtitleEs: string;
};

export type SiteSettings = {
  logoUrl: string;
  heroSlides: HeroSlide[];
  // legacy single-slide fields
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
  // Homepage section backgrounds
  csrImage: string;
  productsSectionBg: string;
  statsSectionBg: string;
  testimonialsSectionBg: string;
  newsSectionBg: string;
  contactSectionBg: string;
  footerPhone: string;
  footerEmail: string;
  footerAddress: string;
  footerFacebook: string;
  footerYoutube: string;
};

const defaults: SiteSettings = {
  logoUrl: '',
  heroSlides: [],
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
  csrImage: '',
  productsSectionBg: '',
  statsSectionBg: '',
  testimonialsSectionBg: '',
  newsSectionBg: '',
  contactSectionBg: '',
  footerPhone: '',
  footerEmail: '',
  footerAddress: '',
  footerFacebook: '',
  footerYoutube: '',
};

function tryParse<T>(v: string, fallback: T): T {
  try { return JSON.parse(v); } catch { return fallback; }
}

// Cached per request (Next.js React cache)
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { id: 'global' } });
    if (!row) return defaults;
    return {
      logoUrl: row.logoUrl,
      heroSlides: tryParse(row.heroSlides, [] as HeroSlide[]),
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
      csrImage: row.csrImage,
      productsSectionBg: row.productsSectionBg,
      statsSectionBg: row.statsSectionBg,
      testimonialsSectionBg: row.testimonialsSectionBg,
      newsSectionBg: row.newsSectionBg,
      contactSectionBg: row.contactSectionBg,
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
