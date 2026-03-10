import { Link } from '@/i18n/navigation';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="w-20 h-20 rounded-full bg-brand-surface flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl font-black text-brand">404</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Trang không tìm thấy</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
      <div className="flex items-center gap-3">
        <Link href="/" className="btn-primary flex items-center gap-2">
          <Home size={16} /> Về trang chủ
        </Link>
        <Link href="/products" className="btn-outline flex items-center gap-2">
          <ArrowLeft size={16} /> Xem sản phẩm
        </Link>
      </div>
    </div>
  );
}
