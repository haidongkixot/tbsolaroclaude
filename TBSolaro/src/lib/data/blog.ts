import type { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'kien-tao-nang-luong-ben-vung',
    title: 'Kiến tạo năng lượng bền vững – Nuôi dưỡng tương lai xanh',
    excerpt: 'TBSolaro – Thương hiệu điện năng lượng mặt trời hàng đầu của Tập đoàn Thái Bình, mang sứ mệnh phổ cập năng lượng sạch.',
    content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

<h2>Typography should be easy</h2>

<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>

<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>

<h2>We still need to think about stacked headings though</h2>

<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>

<p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>

<blockquote><p>Năng lượng bền vững không chỉ thắp sáng mà còn mở ra cơ hội, giúp cộng đồng Cuba học tập và phát triển.</p></blockquote>

<p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>`,
    author: 'Đội ngũ TBSolaro',
    publishedAt: '2024-06-15',
    featuredImage: 'https://placehold.co/1200x600/1B5E30/FFFFFF?text=Kien+Tao+Nang+Luong',
    gallery: [
      'https://placehold.co/800x500/1B5E30/FFFFFF?text=Blog+Image+1',
      'https://placehold.co/800x500/236B3A/FFFFFF?text=Blog+Image+2',
      'https://placehold.co/800x500/3D9B5C/FFFFFF?text=Blog+Image+3',
    ],
    tags: ['năng lượng mặt trời', 'bền vững', 'CSR'],
    relatedSlugs: ['xu-huong-nang-luong-tai-tao-2024', 'loi-ich-dien-mat-troi-cho-doanh-nghiep'],
    status: 'published',
    seo: {
      metaTitle: 'Kiến Tạo Năng Lượng Bền Vững | TBSolaro Blog',
      metaDescription: 'TBSolaro chia sẻ về hành trình kiến tạo năng lượng bền vững và sứ mệnh nuôi dưỡng tương lai xanh.',
    },
    createdAt: '2024-06-10T08:00:00Z',
    updatedAt: '2024-06-15T10:00:00Z',
  },
  {
    id: '2',
    slug: 'xu-huong-nang-luong-tai-tao-2024',
    title: 'Xu hướng năng lượng tái tạo 2024 – Cơ hội và thách thức',
    excerpt: 'Phân tích các xu hướng nổi bật trong ngành năng lượng tái tạo năm 2024 và những cơ hội đầu tư hấp dẫn.',
    content: `<p>Năm 2024 đánh dấu bước ngoặt quan trọng cho ngành năng lượng tái tạo toàn cầu. Giá tấm pin mặt trời tiếp tục giảm trong khi hiệu suất ngày càng tăng, tạo ra cơ hội đầu tư hấp dẫn cho cả hộ gia đình và doanh nghiệp.</p>

<h2>Chi phí giảm, hiệu quả tăng</h2>
<p>Giá tấm pin mặt trời đã giảm hơn 90% trong thập kỷ qua. Năm 2024, chi phí trung bình cho hệ thống điện mặt trời hộ gia đình chỉ còn khoảng 12-15 triệu đồng/kWp, với thời gian hoàn vốn 5-7 năm.</p>

<h2>Lưu trữ năng lượng – Giải pháp cho bài toán gián đoạn</h2>
<p>Công nghệ pin lưu trữ lithium LFP ngày càng phổ biến, cho phép hệ thống điện mặt trời hoạt động hiệu quả cả ban đêm và những ngày thiếu nắng.</p>`,
    author: 'Chuyên gia TBSolaro',
    publishedAt: '2024-05-20',
    featuredImage: 'https://placehold.co/1200x600/236B3A/FFFFFF?text=Xu+Huong+2024',
    tags: ['xu hướng', '2024', 'đầu tư', 'năng lượng tái tạo'],
    relatedSlugs: ['kien-tao-nang-luong-ben-vung', 'loi-ich-dien-mat-troi-cho-doanh-nghiep'],
    status: 'published',
    seo: {
      metaTitle: 'Xu Hướng Năng Lượng Tái Tạo 2024 | TBSolaro',
      metaDescription: 'Phân tích xu hướng năng lượng tái tạo 2024 – cơ hội và thách thức cho nhà đầu tư.',
    },
    createdAt: '2024-05-15T08:00:00Z',
    updatedAt: '2024-05-20T10:00:00Z',
  },
  {
    id: '3',
    slug: 'loi-ich-dien-mat-troi-cho-doanh-nghiep',
    title: 'Lợi ích điện mặt trời cho doanh nghiệp – ROI thực tế',
    excerpt: 'Doanh nghiệp đầu tư điện mặt trời tiết kiệm tới 70% chi phí điện, với ROI thực tế từ 4-7 năm.',
    content: `<p>Điện mặt trời không còn chỉ là giải pháp cho hộ gia đình – ngày càng nhiều doanh nghiệp nhận ra lợi ích kinh tế và môi trường của việc tự chủ năng lượng.</p>

<h2>Tiết kiệm chi phí đáng kể</h2>
<p>Một nhà máy sản xuất với hóa đơn điện 500 triệu đồng/tháng có thể tiết kiệm 300-350 triệu đồng/tháng sau khi lắp đặt hệ thống điện mặt trời 500kWp.</p>

<h2>Tăng giá trị thương hiệu</h2>
<p>Chứng chỉ "Doanh nghiệp xanh" và cam kết ESG ngày càng quan trọng với đối tác và khách hàng quốc tế. Đầu tư năng lượng sạch là bước đi chiến lược cho tương lai.</p>`,
    author: 'Đội ngũ TBSolaro',
    publishedAt: '2024-04-10',
    featuredImage: 'https://placehold.co/1200x600/3D9B5C/FFFFFF?text=ROI+Doanh+Nghiep',
    tags: ['doanh nghiệp', 'ROI', 'tiết kiệm điện'],
    relatedSlugs: ['kien-tao-nang-luong-ben-vung', 'xu-huong-nang-luong-tai-tao-2024'],
    status: 'published',
    seo: {
      metaTitle: 'Lợi Ích Điện Mặt Trời Cho Doanh Nghiệp | TBSolaro',
      metaDescription: 'Doanh nghiệp tiết kiệm 70% chi phí điện với năng lượng mặt trời, ROI 4-7 năm.',
    },
    createdAt: '2024-04-05T08:00:00Z',
    updatedAt: '2024-04-10T10:00:00Z',
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPublishedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.status === 'published').sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getRelatedPosts(slugs: string[]): BlogPost[] {
  return blogPosts.filter((p) => slugs.includes(p.slug));
}
