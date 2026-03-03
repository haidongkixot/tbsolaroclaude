import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import ProjectCard from '@/components/sections/ProjectCard';
import ContactFormSection from '@/components/sections/ContactFormSection';
import { getPublishedProjects, getCSRProjects, getProjectsByCategory } from '@/lib/data/projects';

export const metadata: Metadata = {
  title: 'Dự Án',
  description: 'Khám phá các dự án năng lượng mặt trời của TBSolaro – từ hộ gia đình đến doanh nghiệp và cộng đồng CSR.',
};

const scales = [
  {
    key: 'enterprise',
    icon: '🏭',
    title: 'Doanh nghiệp – Nhà máy',
    desc: 'Hệ thống năng lượng quy mô lớn, tối ưu chi phí vận hành.',
    image: 'https://placehold.co/700x400/1B5E30/FFFFFF?text=Enterprise+Solar',
  },
  {
    key: 'household',
    icon: '🏠',
    title: 'Hộ gia đình',
    desc: 'Giải pháp mini rooftop tiết kiệm năng lượng.',
    image: 'https://placehold.co/700x400/3D9B5C/FFFFFF?text=Household+Solar',
  },
  {
    key: 'community',
    icon: '🏫',
    title: 'Dự án cộng đồng',
    desc: 'Lắp đặt cho trường học, bệnh viện, vùng xa.',
    image: 'https://placehold.co/700x400/52B788/FFFFFF?text=Community+Solar',
  },
];

export default function ProjectsPage() {
  const csrProjects = getCSRProjects();
  const enterpriseProjects = getProjectsByCategory('enterprise');
  const householdProjects = getProjectsByCategory('household');
  const communityProjects = getProjectsByCategory('community');

  return (
    <>
      <PageHero
        title="Projects"
        subtitle="Dự án triển khai ở nhiều quy mô – từ hộ gia đình đến nhà máy và cộng đồng quốc tế"
        backgroundImage="https://placehold.co/1600x500/1B5E30/FFFFFF?text=Projects+Hero"
        size="md"
      />

      {/* Project Scale */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">Project Scale – Dự án triển khai ở nhiều quy mô</h2>
            <p className="section-subtitle">Đáp ứng nhu cầu đa dạng từ hộ gia đình nhỏ đến tổ hợp công nghiệp</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {scales.map((scale) => (
              <div key={scale.key} className="card group overflow-hidden">
                <div className="relative overflow-hidden aspect-video bg-gray-100">
                  <img
                    src={scale.image}
                    alt={scale.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-2xl mb-1">{scale.icon}</div>
                    <h3 className="font-bold text-sm">{scale.title}</h3>
                    <p className="text-white/80 text-xs mt-1">{scale.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured projects by category */}
          <div className="space-y-12">
            {enterpriseProjects.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="text-2xl">🏭</span> Doanh nghiệp & Nhà máy
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {enterpriseProjects.map((p) => (
                    <ProjectCard key={p.id} project={p} variant="horizontal" />
                  ))}
                </div>
              </div>
            )}
            {householdProjects.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="text-2xl">🏠</span> Hộ gia đình
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {householdProjects.map((p) => (
                    <ProjectCard key={p.id} project={p} variant="horizontal" />
                  ))}
                </div>
              </div>
            )}
            {communityProjects.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="text-2xl">🏫</span> Dự án cộng đồng
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {communityProjects.map((p) => (
                    <ProjectCard key={p.id} project={p} variant="horizontal" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CSR Projects */}
      <section className="py-16 md:py-20 bg-brand-surface">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">CSR Project</h2>
            <p className="section-subtitle">Thay đổi cuộc sống, lan tỏa ánh sáng đến những cộng đồng cần được hỗ trợ nhất</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {csrProjects.map((project) => (
              <ProjectCard key={project.id} project={project} variant="csr" />
            ))}
          </div>
          <div className="text-center">
            <Link href="/community" className="btn-primary">
              Khám phá thêm dự án CSR <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactFormSection source="projects_page" />
    </>
  );
}
