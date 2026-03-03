import type { FAQ } from '@/types';

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Chi phí lắp đặt hệ thống điện mặt trời là bao nhiêu?',
    answer: 'Chi phí phụ thuộc vào công suất hệ thống và loại sản phẩm. Để biết chi phí chính xác, vui lòng liên hệ với chúng tôi để được tư vấn và báo giá miễn phí dựa trên nhu cầu thực tế của bạn. Chúng tôi cam kết cung cấp giải pháp tối ưu nhất về chi phí và hiệu quả.',
    category: 'Chi phí & Giá cả',
    sortOrder: 1,
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    question: 'Tôi có thể nếu như trong không có ánh sáng mặt trời?',
    answer: 'Hệ thống điện mặt trời kết hợp pin lưu trữ (off-grid/hybrid) cho phép bạn sử dụng điện ngay cả vào ban đêm hoặc những ngày nhiều mây. Pin lưu trữ tích điện vào ban ngày để sử dụng khi không có nắng. Ngoài ra, hệ thống hybrid còn có thể kết hợp với lưới điện quốc gia như nguồn dự phòng.',
    category: 'Kỹ thuật',
    sortOrder: 2,
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    question: 'Thời gian lắp đặt mất bao lâu?',
    answer: 'Thời gian lắp đặt thông thường từ 1-3 ngày cho hệ thống hộ gia đình (5-10 kWp) và 5-15 ngày cho hệ thống công nghiệp (50-500 kWp), tùy thuộc vào quy mô và điều kiện thực tế. Đội ngũ kỹ thuật TBSolaro sẽ thông báo cụ thể sau khi khảo sát.',
    category: 'Lắp đặt',
    sortOrder: 3,
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    question: 'Giải pháp nào phù hợp cho tôi nếu tôi không có nhiều?',
    answer: 'TBSolaro cung cấp nhiều gói sản phẩm đa dạng từ hệ thống mini rooftop 3-5 kWp cho hộ gia đình nhỏ đến các giải pháp quy mô lớn cho doanh nghiệp. Chúng tôi cũng hỗ trợ kết nối với các đối tác tài chính để bạn có thể trả góp với lãi suất ưu đãi. Hãy liên hệ để được tư vấn phù hợp.',
    category: 'Tài chính',
    sortOrder: 4,
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    question: 'Tôi có thể nếu như không bao lâu?',
    answer: 'TBSolaro cung cấp dịch vụ bảo hành và hỗ trợ kỹ thuật toàn diện. Tấm pin được bảo hành hiệu suất 25 năm, biến tần 5-10 năm tùy loại, pin lưu trữ 10 năm. Đội ngũ kỹ thuật của chúng tôi sẵn sàng hỗ trợ và bảo trì định kỳ để đảm bảo hệ thống hoạt động tối ưu.',
    category: 'Bảo hành & Dịch vụ',
    sortOrder: 5,
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '6',
    question: 'Tôi có thể nếu như trong không có ánh sáng mặt trời không?',
    answer: 'Có, chúng tôi có các chương trình bảo trì định kỳ hàng năm. Hệ thống điện mặt trời cần được vệ sinh tấm pin 2-4 lần/năm tùy khu vực và kiểm tra định kỳ các kết nối điện. TBSolaro cung cấp gói bảo trì trọn gói với chi phí hợp lý để đảm bảo hiệu suất tối đa.',
    category: 'Bảo hành & Dịch vụ',
    sortOrder: 6,
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '7',
    question: 'Hệ thống điện mặt trời có thể chịu được thời tiết khắc nghiệt không?',
    answer: 'Tất cả sản phẩm TBSolaro đều được kiểm tra theo tiêu chuẩn quốc tế về khả năng chịu đựng mưa đá, gió bão, nhiệt độ cao và độ ẩm. Tấm pin được thiết kế chịu được gió đến 2.400 Pa và tải tuyết đến 5.400 Pa. Biến tần có tiêu chuẩn bảo vệ IP65/IP66.',
    category: 'Kỹ thuật',
    sortOrder: 7,
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '8',
    question: 'Tôi có thể bán điện lại cho lưới quốc gia không?',
    answer: 'Tùy theo quy định của từng quốc gia và địa phương. Tại Việt Nam, bạn có thể đăng ký bán điện mặt trời mái nhà cho EVN theo biểu giá FIT. TBSolaro hỗ trợ toàn bộ thủ tục đăng ký, từ khảo sát thiết kế đến làm việc với EVN để ký hợp đồng mua bán điện.',
    category: 'Chính sách & Pháp lý',
    sortOrder: 8,
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export function getPublishedFAQs(): FAQ[] {
  return faqs.filter((f) => f.status === 'published').sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getFAQsByCategory(category: string): FAQ[] {
  return faqs.filter((f) => f.status === 'published' && f.category === category);
}

export function getFAQCategories(): string[] {
  const seen: Record<string, boolean> = {};
  return faqs.filter((f) => { if (seen[f.category]) return false; seen[f.category] = true; return true; }).map((f) => f.category);
}
