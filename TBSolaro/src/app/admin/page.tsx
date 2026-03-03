import Link from 'next/link';
import { Package, FolderOpen, FileText, HelpCircle, MapPin, Download, MessageSquare, TrendingUp, Users, Zap, ArrowRight } from 'lucide-react';
import { getPublishedProducts } from '@/lib/data/products';
import { getPublishedProjects } from '@/lib/data/projects';
import { getPublishedPosts } from '@/lib/data/blog';
import { getPublishedFAQs } from '@/lib/data/faq';
import { getPublishedShowrooms } from '@/lib/data/showrooms';
import { getPublishedDocuments } from '@/lib/data/downloads';

const stats = [
  { label: 'Sản phẩm', count: 0, icon: Package, href: '/admin/products', color: 'bg-blue-50 text-blue-600' },
  { label: 'Dự án', count: 0, icon: FolderOpen, href: '/admin/projects', color: 'bg-green-50 text-brand' },
  { label: 'Blog', count: 0, icon: FileText, href: '/admin/blog', color: 'bg-purple-50 text-purple-600' },
  { label: 'FAQs', count: 0, icon: HelpCircle, href: '/admin/faq', color: 'bg-amber-50 text-amber-600' },
  { label: 'Showroom', count: 0, icon: MapPin, href: '/admin/showrooms', color: 'bg-red-50 text-red-600' },
  { label: 'Tài liệu', count: 0, icon: Download, href: '/admin/downloads', color: 'bg-teal-50 text-teal-600' },
];

export default function AdminDashboard() {
  const products = getPublishedProducts();
  const projects = getPublishedProjects();
  const posts = getPublishedPosts();
  const faqs = getPublishedFAQs();
  const showrooms = getPublishedShowrooms();
  const documents = getPublishedDocuments();

  const counts = [products.length, projects.length, posts.length, faqs.length, showrooms.length, documents.length];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Tổng quan nội dung website TBSolaro</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href} className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <div className="text-2xl font-black text-gray-900 mb-0.5">{counts[i]}</div>
              <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
            </Link>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Recent Products */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Sản phẩm mới nhất</h3>
            <Link href="/admin/products" className="text-brand text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Xem tất cả <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                  <img src={p.featuredImage} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.title}</p>
                  <p className="text-xs text-gray-400">{p.category}</p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">{p.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Dự án gần đây</h3>
            <Link href="/admin/projects" className="text-brand text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Xem tất cả <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {projects.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                  <img src={p.featuredImage} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.title}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1"><Zap size={10} />{p.power || 'N/A'}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  p.category === 'csr' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>{p.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Nav Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { href: '/admin/submissions', label: 'Xem liên hệ mới', desc: 'Quản lý form submissions', icon: MessageSquare, color: 'border-l-blue-500' },
          { href: '/admin/blog', label: 'Viết bài blog mới', desc: 'Quản lý tin tức & bài viết', icon: FileText, color: 'border-l-purple-500' },
          { href: '/admin/settings', label: 'Cài đặt website', desc: 'Logo, menu, footer, SEO', icon: TrendingUp, color: 'border-l-brand' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`bg-white rounded-2xl border border-gray-200 border-l-4 ${item.color} p-5 hover:shadow-md transition-shadow flex items-center gap-4`}
            >
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
