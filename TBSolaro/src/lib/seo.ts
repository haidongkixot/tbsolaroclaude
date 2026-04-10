import type { Metadata } from 'next';

const BASE = 'https://tbsolaro.com';
const OG_IMAGE = 'https://tbsolaro.com/og-default.png';

const META: Record<string, Record<string, { title: string; description: string }>> = {
  home: {
    vi: { title: 'TBSolaro – Năng Lượng Mặt Trời Bền Vững', description: 'TBSolaro – Thương hiệu điện năng lượng mặt trời hàng đầu của Tập đoàn Thái Bình. Combo pin mặt trời, biến tần, pin lưu trữ cho gia đình và doanh nghiệp.' },
    en: { title: 'TBSolaro – Sustainable Solar Energy', description: 'TBSolaro – Leading solar energy brand by Thai Binh Group. Solar panel combos, inverters, and battery storage for homes and businesses.' },
    es: { title: 'TBSolaro – Energía Solar Sostenible', description: 'TBSolaro – Marca líder de energía solar del Grupo Thai Binh. Combos de paneles solares, inversores y almacenamiento de baterías para hogares y empresas.' },
  },
  about: {
    vi: { title: 'Về Chúng Tôi', description: 'Tìm hiểu lịch sử, sứ mệnh và quy trình sản xuất của TBSolaro – Thương hiệu điện mặt trời hàng đầu từ Tập đoàn Thái Bình.' },
    en: { title: 'About Us', description: 'Discover the history, mission, and production process of TBSolaro – leading solar energy brand by Thai Binh Group.' },
    es: { title: 'Sobre Nosotros', description: 'Descubra la historia, misión y proceso de producción de TBSolaro – marca líder de energía solar del Grupo Thai Binh.' },
  },
  products: {
    vi: { title: 'Sản Phẩm', description: 'Khám phá combo năng lượng mặt trời TBSolaro: tấm pin, biến tần, pin lưu trữ lithium LFP. Giải pháp phù hợp mọi nhu cầu gia đình và doanh nghiệp.' },
    en: { title: 'Products', description: 'Explore TBSolaro solar combos: panels, inverters, lithium LFP storage. Solutions for every home and business need.' },
    es: { title: 'Productos', description: 'Explore los combos solares TBSolaro: paneles, inversores, almacenamiento de litio LFP. Soluciones para cada hogar y empresa.' },
  },
  projects: {
    vi: { title: 'Dự Án', description: 'Các dự án năng lượng mặt trời TBSolaro – từ hộ gia đình đến doanh nghiệp và cộng đồng CSR tại Việt Nam và Cuba.' },
    en: { title: 'Projects', description: 'TBSolaro solar projects – from households to enterprises and CSR communities in Vietnam and Cuba.' },
    es: { title: 'Proyectos', description: 'Proyectos solares TBSolaro – desde hogares hasta empresas y comunidades CSR en Vietnam y Cuba.' },
  },
  blog: {
    vi: { title: 'Tin Tức & Truyền Thông', description: 'Cập nhật tin tức, câu chuyện thương hiệu và kiến thức năng lượng mặt trời từ TBSolaro.' },
    en: { title: 'News & Stories', description: 'Latest news, brand stories, and solar energy insights from TBSolaro.' },
    es: { title: 'Noticias e Historias', description: 'Últimas noticias, historias de marca y conocimientos sobre energía solar de TBSolaro.' },
  },
  contact: {
    vi: { title: 'Liên Hệ & Tải Tài Liệu', description: 'Kết nối cùng TBSolaro – đối tác năng lượng xanh của bạn. Tải tài liệu kỹ thuật, catalog sản phẩm và liên hệ tư vấn.' },
    en: { title: 'Contact & Downloads', description: 'Connect with TBSolaro – your green energy partner. Download technical documents, product catalogs, and get consultation.' },
    es: { title: 'Contacto y Descargas', description: 'Conéctese con TBSolaro – su socio de energía verde. Descargue documentos técnicos, catálogos y obtenga asesoramiento.' },
  },
  community: {
    vi: { title: 'Cộng Đồng & CSR', description: 'TBSolaro lan tỏa ánh sáng – Các dự án CSR mang năng lượng sạch đến cộng đồng Cuba và Việt Nam.' },
    en: { title: 'Community & CSR', description: 'TBSolaro spreading light – CSR projects bringing clean energy to communities in Cuba and Vietnam.' },
    es: { title: 'Comunidad y RSC', description: 'TBSolaro extendiendo la luz – Proyectos de RSC llevando energía limpia a comunidades en Cuba y Vietnam.' },
  },
  faq: {
    vi: { title: 'Câu Hỏi Thường Gặp', description: 'Giải đáp câu hỏi thường gặp về hệ thống điện mặt trời, chi phí lắp đặt, bảo hành và dịch vụ TBSolaro.' },
    en: { title: 'FAQ', description: 'Answers to frequently asked questions about solar power systems, installation costs, warranty, and TBSolaro services.' },
    es: { title: 'Preguntas Frecuentes', description: 'Respuestas a preguntas frecuentes sobre sistemas de energía solar, costos de instalación, garantía y servicios TBSolaro.' },
  },
  showroom: {
    vi: { title: 'Showroom', description: 'Tham quan Showroom TBSolaro – Trải nghiệm trực tiếp sản phẩm năng lượng mặt trời và đặt lịch tư vấn.' },
    en: { title: 'Showroom', description: 'Visit TBSolaro Showroom – Experience solar energy products firsthand and book a consultation.' },
    es: { title: 'Showroom', description: 'Visite el Showroom TBSolaro – Experimente los productos de energía solar en persona y reserve una consulta.' },
  },
};

export function getPageMeta(page: string, locale: string): { title: string; description: string } {
  return META[page]?.[locale] || META[page]?.vi || { title: 'TBSolaro', description: '' };
}

export function buildMetadata(page: string, locale: string, extra?: Partial<Metadata>): Metadata {
  const m = getPageMeta(page, locale);
  const path = page === 'home' ? '' : `/${page}`;
  const url = `${BASE}${locale === 'vi' ? '' : `/${locale}`}${path}`;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: {
        vi: `${BASE}${path}`,
        en: `${BASE}/en${path}`,
        es: `${BASE}/es${path}`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: 'TBSolaro',
      locale: locale === 'en' ? 'en_US' : locale === 'es' ? 'es_ES' : 'vi_VN',
      type: 'website',
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: [OG_IMAGE],
    },
    ...extra,
  };
}

export { BASE, OG_IMAGE };
