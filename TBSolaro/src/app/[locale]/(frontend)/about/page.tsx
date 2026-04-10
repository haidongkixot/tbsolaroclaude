import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CheckCircle } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import SustainabilityBanner from '@/components/sections/SustainabilityBanner';
import ContactFormSection from '@/components/sections/ContactFormSection';
import { getSiteSettings, st } from '@/lib/db/settings';
import type { TimelineItem, WhyUsItem, ProcessStep } from '@/lib/db/settings';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata('about', locale);
}

const DEFAULT_TIMELINE: TimelineItem[] = [
  { year: '1992', titleVi: 'Thành lập Tập đoàn Thái Bình', titleEn: 'Thai Binh Group Founded', titleEs: 'Fundación del Grupo Thai Binh', descVi: 'Tập đoàn Thái Bình được thành lập, bắt đầu hành trình xây dựng các giải pháp năng lượng bền vững.', descEn: 'Thai Binh Group was established, beginning the journey of building sustainable energy solutions.', descEs: 'El Grupo Thai Binh fue fundado, comenzando el camino hacia soluciones de energía sostenible.' },
  { year: '2010', titleVi: 'Bắt đầu nghiên cứu Solar', titleEn: 'Solar R&D Begins', titleEs: 'Inicio de I+D Solar', descVi: 'Khởi động bộ phận nghiên cứu và phát triển năng lượng mặt trời, đặt nền móng cho TBSolaro.', descEn: 'Launched the solar energy R&D division, laying the foundation for TBSolaro.', descEs: 'Lanzamos la división de I+D de energía solar, sentando las bases para TBSolaro.' },
  { year: '2018', titleVi: 'Ra mắt TBSolaro', titleEn: 'TBSolaro Launched', titleEs: 'Lanzamiento de TBSolaro', descVi: 'TBSolaro chính thức ra mắt với sứ mệnh phổ cập năng lượng sạch cho cộng đồng.', descEn: 'TBSolaro officially launched with the mission of making clean energy accessible to communities.', descEs: 'TBSolaro se lanzó oficialmente con la misión de hacer accesible la energía limpia.' },
  { year: '2021', titleVi: 'Mở rộng thị trường Cuba', titleEn: 'Cuba Market Expansion', titleEs: 'Expansión al mercado cubano', descVi: 'Triển khai các dự án CSR tại Cuba, mang điện sạch đến trường học và bệnh viện.', descEn: 'Deployed CSR projects in Cuba, bringing clean electricity to schools and hospitals.', descEs: 'Implementamos proyectos CSR en Cuba, llevando electricidad limpia a escuelas y hospitales.' },
  { year: '2023', titleVi: '500+ Dự án hoàn thành', titleEn: '500+ Projects Completed', titleEs: '+500 proyectos completados', descVi: 'Cột mốc quan trọng: Hoàn thành hơn 500 dự án với tổng công suất 10MW+.', descEn: 'Major milestone: Completed over 500 projects with a total capacity of 10MW+.', descEs: 'Hito importante: más de 500 proyectos completados con una capacidad total de 10MW+.' },
  { year: '2024', titleVi: 'Công nghệ thế hệ mới', titleEn: 'Next-Gen Technology', titleEs: 'Tecnología de nueva generación', descVi: 'Ra mắt dòng sản phẩm combo thế hệ mới với pin LFP và biến tần hybrid thông minh.', descEn: 'Launched next-gen combo products with LFP batteries and smart hybrid inverters.', descEs: 'Lanzamos productos combo de nueva generación con baterías LFP e inversores híbridos inteligentes.' },
];

const DEFAULT_WHY_US: WhyUsItem[] = [
  { label: 'A', titleVi: 'Chất lượng vượt trội', titleEn: 'Superior Quality', titleEs: 'Calidad superior', descVi: 'Tất cả sản phẩm đạt tiêu chuẩn quốc tế IEC, được kiểm tra nghiêm ngặt tại nhà máy Thái Bình.', descEn: 'All products meet IEC international standards, rigorously tested at Thai Binh factory.', descEs: 'Todos los productos cumplen con los estándares internacionales IEC, rigurosamente probados.' },
  { label: 'B', titleVi: 'Giải pháp toàn diện', titleEn: 'Complete Solutions', titleEs: 'Soluciones completas', descVi: 'Từ tư vấn, thiết kế, lắp đặt đến bảo trì – TBSolaro cung cấp giải pháp trọn gói.', descEn: 'From consulting, design, installation to maintenance – TBSolaro provides end-to-end solutions.', descEs: 'Desde consultoría, diseño, instalación hasta mantenimiento – TBSolaro ofrece soluciones integrales.' },
  { label: 'C', titleVi: 'Uy tín & Bền vững', titleEn: 'Trust & Sustainability', titleEs: 'Confianza y sostenibilidad', descVi: 'Hơn 30 năm kinh nghiệm của Tập đoàn Thái Bình là nền tảng cho cam kết bền vững của TBSolaro.', descEn: 'Over 30 years of experience from Thai Binh Group is the foundation for TBSolaro\'s sustainability commitment.', descEs: 'Más de 30 años de experiencia del Grupo Thai Binh son la base del compromiso de sostenibilidad de TBSolaro.' },
];

const DEFAULT_PROCESS: ProcessStep[] = [
  { num: '01', titleVi: 'Kiểm định nguyên vật liệu', titleEn: 'Material Inspection', titleEs: 'Inspección de materiales', descVi: 'Nguyên liệu đầu vào được kiểm tra kỹ lưỡng theo tiêu chuẩn quốc tế.', descEn: 'Input materials are thoroughly inspected according to international standards.', descEs: 'Los materiales de entrada se inspeccionan minuciosamente según estándares internacionales.' },
  { num: '02', titleVi: 'Lắp ráp & kiểm tra chất lượng', titleEn: 'Assembly & QC', titleEs: 'Ensamblaje y control de calidad', descVi: 'Quy trình lắp ráp tự động tại nhà máy Thái Bình, kiểm tra 100% sản phẩm.', descEn: 'Automated assembly process at Thai Binh factory, 100% product inspection.', descEs: 'Proceso de ensamblaje automatizado, inspección del 100% de los productos.' },
  { num: '03', titleVi: 'Thử nghiệm hiệu suất', titleEn: 'Performance Testing', titleEs: 'Prueba de rendimiento', descVi: 'Mỗi sản phẩm được thử nghiệm hiệu suất trong điều kiện thực tế trước khi xuất xưởng.', descEn: 'Each product is performance-tested under real conditions before leaving the factory.', descEs: 'Cada producto es probado en condiciones reales antes de salir de fábrica.' },
  { num: '04', titleVi: 'Đóng gói & phân phối', titleEn: 'Packaging & Distribution', titleEs: 'Empaque y distribución', descVi: 'Đóng gói bảo vệ đặc biệt, phân phối đến khách hàng trong nước và quốc tế.', descEn: 'Special protective packaging, distributed to domestic and international customers.', descEs: 'Embalaje protector especial, distribución a clientes nacionales e internacionales.' },
];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [t, settings] = await Promise.all([getTranslations('about'), getSiteSettings()]);

  const l = locale === 'en' ? 'En' : locale === 'es' ? 'Es' : 'Vi';
  const timeline = settings.aboutTimeline.length > 0 ? settings.aboutTimeline : DEFAULT_TIMELINE;
  const whyUs = settings.aboutWhyUs.length > 0 ? settings.aboutWhyUs : DEFAULT_WHY_US;
  const process = settings.aboutProcess.length > 0 ? settings.aboutProcess : DEFAULT_PROCESS;
  const partners = settings.aboutPartners
    ? settings.aboutPartners.split(',').map((s) => s.trim()).filter(Boolean)
    : ['Buffer', 'Attpe', 'Fronier', 'NuLabel', 'Dropbox', 'WebFlow'];

  return (
    <>
      <PageHero
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        backgroundImage={settings.aboutHeroImage || 'https://placehold.co/1600x700/1B5E30/FFFFFF?text=House+Solar'}
        ctaPrimary={{ label: t('ctaBtn'), href: '/projects' }}
        size="lg"
      />

      {/* History Timeline */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="text-center mb-14">
            <h2 className="section-title">{st(settings.sectionTitles, 'about', 'historyTitle', locale) || t('historyTitle')}</h2>
            <p className="section-subtitle">{st(settings.sectionTitles, 'about', 'historySubtitle', locale) || t('historySubtitle')}</p>
          </div>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-brand-surface-dark hidden md:block" aria-hidden="true" />
            <div className="space-y-8 md:space-y-12">
              {timeline.map((item, i) => (
                <div key={item.year + i} className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-brand text-white font-bold text-sm shadow-lg z-10 shrink-0 md:self-start md:mt-2">
                    {item.year}
                  </div>
                  <div className={`md:w-[calc(50%-48px)] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                    <h3 className="font-bold text-gray-900 mb-2">{(item as Record<string, string>)[`title${l}`] || item.titleVi}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{(item as Record<string, string>)[`desc${l}`] || item.descVi}</p>
                  </div>
                  <div className="hidden md:block md:w-[calc(50%-48px)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why TBSolaro */}
      <section className="py-16 md:py-20 bg-brand-surface">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">{st(settings.sectionTitles, 'about', 'whyTitle', locale) || t('whyTitle')}</h2>
            <p className="section-subtitle">{st(settings.sectionTitles, 'about', 'whySubtitle', locale) || t('whySubtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {whyUs.map((item, i) => (
              <div key={item.label + i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-brand text-white text-2xl font-bold flex items-center justify-center mx-auto mb-5">
                  {item.label}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{(item as Record<string, string>)[`title${l}`] || item.titleVi}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{(item as Record<string, string>)[`desc${l}`] || item.descVi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">{st(settings.sectionTitles, 'about', 'processTitle', locale) || t('processTitle')}</h2>
            <p className="section-subtitle">{st(settings.sectionTitles, 'about', 'processSubtitle', locale) || t('processSubtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <div key={step.num + i} className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-5xl font-black text-brand/10 mb-4 leading-none">{step.num}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{(step as Record<string, string>)[`title${l}`] || step.titleVi}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{(step as Record<string, string>)[`desc${l}`] || step.descVi}</p>
                <div className="absolute top-5 right-5 w-8 h-8 rounded-full border-2 border-brand flex items-center justify-center">
                  <CheckCircle size={14} className="text-brand" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-10 bg-gray-50">
        <div className="container-site">
          <h2 className="section-title text-center mb-8">{t('galleryTitle')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-gray-200">
                <img
                  src={`https://placehold.co/400x400/1B5E30/FFFFFF?text=Process+${i}`}
                  alt={`Quy trình sản xuất ${i}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container-site">
          <p className="text-center text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6">{st(settings.sectionTitles, 'about', 'partnersTitle', locale) || t('partnersTitle')}</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {partners.map((p) => (
              <div key={p} className="px-5 py-2 bg-gray-50 rounded-lg text-gray-500 font-semibold text-sm hover:bg-brand-surface hover:text-brand transition-colors">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactFormSection source="about_page" />
      <SustainabilityBanner backgroundImage={settings.sustainabilityBgImage || undefined} />
    </>
  );
}
