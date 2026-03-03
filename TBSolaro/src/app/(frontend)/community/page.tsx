import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import ProjectCard from '@/components/sections/ProjectCard';
import SustainabilityBanner from '@/components/sections/SustainabilityBanner';
import { getCSRProjects } from '@/lib/data/projects';

export const metadata: Metadata = {
  title: 'Cộng Đồng & CSR',
  description: 'TBSolaro lan tỏa ánh sáng, nuôi dưỡng tương lai – Các dự án CSR mang năng lượng sạch đến cộng đồng.',
};

export default function CommunityPage() {
  const csrProjects = getCSRProjects();

  return (
    <>
      <PageHero
        title="Lan tỏa ánh sáng, Nuôi dưỡng tương lai"
        subtitle="TBSolaro không chỉ cung cấp giải pháp năng lượng – chúng tôi mang ánh sáng đến những cộng đồng cần được hỗ trợ nhất"
        backgroundImage="https://placehold.co/1600x700/1B5E30/FFFFFF?text=Community+Solar"
        ctaPrimary={{ label: 'Xem tất cả dự án', href: '/projects' }}
        ctaSecondary={{ label: 'Liên hệ với chúng tôi', href: '/contact' }}
        size="lg"
      />

      {/* CSR Highlights */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">CSR Project Highlight</h2>
            <p className="section-subtitle">Những dự án tiêu biểu đã thay đổi cuộc sống của hàng nghìn người</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {csrProjects.map((project) => (
              <ProjectCard key={project.id} project={project} variant="csr" />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/projects" className="btn-primary">
              Xem thêm dự án <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-16 bg-brand">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-white/20">
                Thực tế tại Cuba
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                Thực tế tự hành trình CSR tại Cuba
              </h2>
              <p className="text-white/75 leading-relaxed mb-6">
                Cùng xem lại hành trình TBSolaro mang ánh sáng đến những ngôi trường và bệnh viện tại Cuba –
                nơi điện là điều kiện tối thiểu cho sự phát triển của cộng đồng.
              </p>
              <div className="flex items-center gap-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400">★</span>
                ))}
                <span className="text-white/70 text-sm ml-1">Đánh giá từ cộng đồng</span>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black/20 border border-white/20">
              <img
                src="https://placehold.co/800x450/1B5E30/FFFFFF?text=Video+CSR+Cuba"
                alt="Video CSR Cuba"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  aria-label="Phát video"
                >
                  <Play size={28} className="text-brand ml-1" fill="currentColor" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16">
        <div className="container-site">
          <div className="text-center mb-10">
            <h2 className="section-title">Tác động thực tế</h2>
            <p className="section-subtitle">Những con số nói lên tầm ảnh hưởng của các dự án CSR TBSolaro</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '5+', label: 'Quốc gia có dự án CSR', emoji: '🌍' },
              { value: '2,000+', label: 'Học sinh hưởng lợi', emoji: '👨‍🎓' },
              { value: '15', label: 'Cơ sở y tế và giáo dục', emoji: '🏫' },
              { value: '50 tấn', label: 'CO₂ giảm phát thải/năm', emoji: '🌱' },
            ].map((item) => (
              <div key={item.label} className="text-center bg-brand-surface rounded-2xl p-6 border border-brand/10">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <div className="text-3xl font-black text-brand mb-1">{item.value}</div>
                <p className="text-gray-600 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SustainabilityBanner />
    </>
  );
}
