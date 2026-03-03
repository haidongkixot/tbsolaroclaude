import type { SiteSetting, NavItem } from '@/types';

export const siteSettings: SiteSetting[] = [
  { key: 'site_name', value: 'TBSolaro', group: 'general', label: 'Tên website' },
  { key: 'site_tagline', value: 'Kiến tạo năng lượng bền vững, nuôi dưỡng tương lai xanh', group: 'general', label: 'Slogan' },
  { key: 'site_description', value: 'TBSolaro – Thương hiệu điện năng lượng mặt trời hàng đầu của Tập đoàn Thái Bình', group: 'general', label: 'Mô tả' },
  { key: 'logo_url', value: '/images/logo.svg', group: 'brand', label: 'Logo URL' },
  { key: 'contact_address', value: 'Sector H, de la Zona Especial de desarrollo Mariel Municipality Mariel, Province Artemisa, Cuba', group: 'contact', label: 'Địa chỉ' },
  { key: 'contact_phone', value: '+53-44-555501', group: 'contact', label: 'Điện thoại' },
  { key: 'contact_email', value: 'contact@tbsolaro.com', group: 'contact', label: 'Email' },
  { key: 'social_facebook', value: 'https://facebook.com/tbsolaro', group: 'social', label: 'Facebook' },
  { key: 'social_youtube', value: 'https://youtube.com/tbsolaro', group: 'social', label: 'YouTube' },
  { key: 'footer_copy', value: '© 2025 TBSolaro – A member of Thai Binh corporation | All Rights Reserved', group: 'footer', label: 'Copyright text' },
];

export const mainNav: NavItem[] = [
  { label: 'Trang chủ', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Sản phẩm', href: '/products' },
  { label: 'Showroom', href: '/showroom' },
  { label: 'Cộng đồng', href: '/community' },
  { label: 'Dự án', href: '/projects' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Liên hệ', href: '/contact' },
];

export const footerQuickLinks: NavItem[] = [
  { label: 'Giới thiệu về TBSolaro', href: '/about' },
  { label: 'Combo sản phẩm', href: '/products' },
  { label: 'Dự án tiêu biểu', href: '/projects' },
  { label: 'CSR & Cộng đồng', href: '/community' },
  { label: 'Tin tức & Truyền thông', href: '/blog' },
];

export const footerPolicyLinks: NavItem[] = [
  { label: 'Hỗ trợ khách hàng', href: '/contact' },
  { label: 'Chính sách bảo hành & dịch vụ', href: '/faq' },
  { label: 'Chính sách bảo mật', href: '/faq' },
  { label: 'Quy trình lắp đặt & bảo trì', href: '/faq' },
  { label: 'Hướng dẫn đăng ký hóa đơn', href: '/faq' },
  { label: 'FAQ – Câu hỏi thường gặp', href: '/faq' },
];
