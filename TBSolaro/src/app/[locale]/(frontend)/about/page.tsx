import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import PageHero from '@/components/sections/PageHero';
import SustainabilityBanner from '@/components/sections/SustainabilityBanner';
import ContactFormSection from '@/components/sections/ContactFormSection';

export const metadata: Metadata = {
  title: 'Về Chúng Tôi',
  description: 'TBSolaro – Thương hiệu điện năng lượng mặt trời hàng đầu của Tập đoàn Thái Bình. Tìm hiểu lịch sử và sứ mệnh của chúng tôi.',
};

const timeline = [
  { year: '1992', title: 'Thành lập Tập đoàn Thái Bình', desc: 'Tập đoàn Thái Bình được thành lập, bắt đầu hành trình xây dựng các giải pháp năng lượng bền vững.' },
  { year: '2010', title: 'Bắt đầu nghiên cứu Solar', desc: 'Khởi động bộ phận nghiên cứu và phát triển năng lượng mặt trời, đặt nền móng cho TBSolaro.' },
  { year: '2018', title: 'Ra mắt TBSolaro', desc: 'TBSolaro chính thức ra mắt với sứ mệnh phổ cập năng lượng sạch cho cộng đồng.' },
  { year: '2021', title: 'Mở rộng thị trường Cuba', desc: 'Triển khai các dự án CSR tại Cuba, mang điện sạch đến trường học và bệnh viện.' },
  { year: '2023', title: '500+ Dự án hoàn thành', desc: 'Cột mốc quan trọng: Hoàn thành hơn 500 dự án với tổng công suất 10MW+.' },
  { year: '2024', title: 'Công nghệ thế hệ mới', desc: 'Ra mắt dòng sản phẩm combo thế hệ mới với pin LFP và biến tần hybrid thông minh.' },
];

const whyUs = [
  {
    label: 'A',
    title: 'Chất lượng vượt trội',
    desc: 'Tất cả sản phẩm đạt tiêu chuẩn quốc tế IEC, được kiểm tra nghiêm ngặt tại nhà máy Thái Bình trước khi đến tay khách hàng.',
  },
  {
    label: 'B',
    title: 'Giải pháp toàn diện',
    desc: 'Từ tư vấn, thiết kế, lắp đặt đến bảo trì – TBSolaro cung cấp giải pháp trọn gói, không lo từng bước.',
  },
  {
    label: 'C',
    title: 'Uy tín & Bền vững',
    desc: 'Hơn 30 năm kinh nghiệm của Tập đoàn Thái Bình là nền tảng cho cam kết bền vững và đáng tin cậy của TBSolaro.',
  },
];

const productionSteps = [
  { num: '01', title: 'Kiểm định nguyên vật liệu', desc: 'Nguyên liệu đầu vào được kiểm tra kỹ lưỡng theo tiêu chuẩn quốc tế trước khi đưa vào sản xuất.' },
  { num: '02', title: 'Lắp ráp & kiểm tra chất lượng', desc: 'Quy trình lắp ráp tự động tại nhà máy Thái Bình, kiểm tra 100% sản phẩm.' },
  { num: '03', title: 'Thử nghiệm hiệu suất trong điều kiện thực tế', desc: 'Mỗi sản phẩm được thử nghiệm hiệu suất trong điều kiện thực tế trước khi xuất xưởng.' },
  { num: '04', title: 'Đóng gói & phân phối toàn cầu', desc: 'Đóng gói bảo vệ đặc biệt, phân phối đến khách hàng trong nước và quốc tế.' },
];

const partners = ['Buffer', 'Attpe', 'Fronier', 'NuLabel', 'Dropbox', 'WebFlow'];

export default async function AboutPage() {
  const t = await getTranslations('about');
  return (
    <>
      <PageHero
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        backgroundImage="https://placehold.co/1600x700/1B5E30/FFFFFF?text=House+Solar"
        ctaPrimary={{ label: t('ctaBtn'), href: '/projects' }}
        size="lg"
      />

      {/* History Timeline */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="text-center mb-14">
            <h2 className="section-title">{t('historyTitle')}</h2>
            <p className="section-subtitle">{t('historySubtitle')}</p>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-brand-surface-dark hidden md:block" aria-hidden="true" />
            <div className="space-y-8 md:space-y-12">
              {timeline.map((item, i) => (
                <div key={item.year} className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Year badge */}
                  <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-brand text-white font-bold text-sm shadow-lg z-10 shrink-0 md:self-start md:mt-2">
                    {item.year}
                  </div>
                  {/* Content */}
                  <div className={`md:w-[calc(50%-48px)] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  {/* Spacer for opposite side */}
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
            <h2 className="section-title">{t('whyTitle')}</h2>
            <p className="section-subtitle">{t('whySubtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {whyUs.map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-brand text-white text-2xl font-bold flex items-center justify-center mx-auto mb-5">
                  {item.label}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('processTitle')}</h2>
            <p className="section-subtitle">{t('processSubtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productionSteps.map((step) => (
              <div key={step.num} className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-5xl font-black text-brand/10 mb-4 leading-none">{step.num}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
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
          <p className="text-center text-xs uppercase tracking-widest text-gray-400 font-semibold mb-6">{t('partnersTitle')}</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {partners.map((p) => (
              <div key={p} className="px-5 py-2 bg-gray-50 rounded-lg text-gray-500 font-semibold text-sm hover:bg-brand-surface hover:text-brand transition-colors">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactFormSection source="about_page" />

      {/* Sustainability Banner */}
      <SustainabilityBanner />
    </>
  );
}
