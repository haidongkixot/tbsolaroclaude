import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

async function isAdmin() {
  const store = await cookies();
  return !!store.get('tb_admin_auth');
}

const API_DOCS_CONTENT = `<h1>TBSolaro External API Reference</h1>
<p>This document describes the external REST API available for integrating with TBSolaro CMS content.</p>

<h2>Authentication</h2>
<p>All requests must include an API key via the <code>Authorization</code> header:</p>
<pre><code>Authorization: Bearer tbsk_your_api_key_here</code></pre>
<p>Manage your API keys in <strong>Admin → API Keys</strong>. Three permission levels are available:</p>
<ul>
<li><strong>read</strong> — GET requests only</li>
<li><strong>write</strong> — GET + POST + PUT requests</li>
<li><strong>all</strong> — Full access including DELETE</li>
</ul>

<h2>Base URL</h2>
<pre><code>https://your-domain.com/api/v1</code></pre>

<h2>Response Format</h2>
<p>All responses return JSON. List endpoints return:</p>
<pre><code>{ "data": [...], "total": 100, "limit": 20, "offset": 0 }</code></pre>
<p>Error responses:</p>
<pre><code>{ "error": "Error message here" }</code></pre>

<h2>Products</h2>
<h3>List Products</h3>
<pre><code>GET /api/v1/products
Query: status=published|draft, category=combo|panel|inverter, limit=20, offset=0</code></pre>

<h3>Get Product</h3>
<pre><code>GET /api/v1/products/:slug</code></pre>

<h3>Create Product</h3>
<pre><code>POST /api/v1/products
Required: slug (string), titleVi (string)
Optional: titleEn, titleEs, subtitleVi/En/Es, excerptVi/En/Es,
          featuresVi/En/Es (JSON array string), specsVi/En/Es (JSON object string),
          tiersVi/En/Es (JSON array string), featuredImage, gallery (JSON array),
          category, status, sortOrder, downloadUrl, tags (JSON array)</code></pre>

<h3>Update Product</h3>
<pre><code>PUT /api/v1/products/:slug
Body: any subset of product fields</code></pre>

<h3>Delete Product</h3>
<pre><code>DELETE /api/v1/products/:slug
Requires: permissions = "all"</code></pre>

<h2>Projects</h2>
<h3>List Projects</h3>
<pre><code>GET /api/v1/projects
Query: status=published|draft, category=enterprise|household|community|csr, limit=20, offset=0</code></pre>

<h3>Get Project</h3>
<pre><code>GET /api/v1/projects/:slug</code></pre>

<h3>Create Project</h3>
<pre><code>POST /api/v1/projects
Required: slug (string), titleVi (string)
Optional: titleEn, titleEs, excerptVi/En/Es, contentVi/En/Es (HTML),
          location, power, installationDate, year, videoUrl,
          featuredImage, gallery (JSON array), category, status, sortOrder</code></pre>

<h3>Update Project</h3>
<pre><code>PUT /api/v1/projects/:slug</code></pre>

<h3>Delete Project</h3>
<pre><code>DELETE /api/v1/projects/:slug
Requires: permissions = "all"</code></pre>

<h2>Blog Posts</h2>
<h3>List Posts</h3>
<pre><code>GET /api/v1/blog
Query: status=published|draft, limit=20, offset=0</code></pre>

<h3>Get Post</h3>
<pre><code>GET /api/v1/blog/:slug</code></pre>

<h3>Create Post</h3>
<pre><code>POST /api/v1/blog
Required: slug (string), titleVi (string)
Optional: titleEn, titleEs, excerptVi/En/Es, contentVi/En/Es (HTML),
          author, publishedAt (ISO date), featuredImage, gallery (JSON array),
          tags (JSON array), status</code></pre>

<h3>Update Post</h3>
<pre><code>PUT /api/v1/blog/:slug</code></pre>

<h3>Delete Post</h3>
<pre><code>DELETE /api/v1/blog/:slug
Requires: permissions = "all"</code></pre>

<h2>Settings</h2>
<h3>Get Site Settings</h3>
<pre><code>GET /api/v1/settings
Returns: logoUrl, heroSlides, footerPhone, footerEmail, footerAddress, and all site-wide settings</code></pre>

<h2>HTTP Status Codes</h2>
<ul>
<li><strong>200</strong> — OK</li>
<li><strong>201</strong> — Created</li>
<li><strong>400</strong> — Bad Request (missing required fields)</li>
<li><strong>401</strong> — Unauthorized (missing or invalid API key)</li>
<li><strong>403</strong> — Forbidden (insufficient permissions)</li>
<li><strong>404</strong> — Not Found</li>
<li><strong>409</strong> — Conflict (slug already exists)</li>
<li><strong>500</strong> — Internal Server Error</li>
</ul>

<h2>Example: Create a Blog Post</h2>
<pre><code>curl -X POST https://your-domain.com/api/v1/blog \\
  -H "Authorization: Bearer tbsk_your_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "slug": "new-solar-project-2025",
    "titleVi": "Dự án điện mặt trời mới 2025",
    "titleEn": "New Solar Project 2025",
    "excerptVi": "Giới thiệu dự án...",
    "contentVi": "&lt;p&gt;Nội dung chi tiết...&lt;/p&gt;",
    "status": "published",
    "publishedAt": "2025-01-15T00:00:00Z"
  }'</code></pre>

<h2>Example: Push Product Data</h2>
<pre><code>curl -X POST https://your-domain.com/api/v1/products \\
  -H "Authorization: Bearer tbsk_your_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "slug": "combo-inv-bat-10",
    "titleVi": "Combo INV-BAT10",
    "titleEn": "Combo INV-BAT10",
    "category": "combo",
    "status": "published",
    "featuresVi": "[\\"10kW inverter\\", \\"LFP battery\\"]"
  }'</code></pre>`;

const GUIDE_CONTENT = `<h1>Hướng Dẫn Xây Dựng Website Doanh Nghiệp Từ A Đến Z</h1>
<p><strong>Phiên bản 1.0</strong> &nbsp;|&nbsp; Ví dụ xuyên suốt: <strong>Công ty SolarViet</strong> — Điện năng lượng mặt trời &nbsp;|&nbsp; Cập nhật: 2026</p>
<p>Đây là hướng dẫn toàn diện để xây dựng một website doanh nghiệp chuyên nghiệp từ hình ảnh thiết kế đến sản phẩm thực tế trên Internet. Tài liệu dành cho nhân sự <strong>không có kiến thức lập trình</strong>, sử dụng Claude AI như một trợ lý lập trình toàn thời gian.</p>

<h2>Công Nghệ Sử Dụng</h2>
<table>
<tr><th>Công cụ</th><th>Mục đích</th><th>Chi phí</th></tr>
<tr><td>Next.js</td><td>Framework xây dựng website</td><td>Miễn phí</td></tr>
<tr><td>Tailwind CSS</td><td>Thiết kế giao diện</td><td>Miễn phí</td></tr>
<tr><td>Prisma + Neon PostgreSQL</td><td>Cơ sở dữ liệu</td><td>Miễn phí (gói cơ bản)</td></tr>
<tr><td>Cloudinary</td><td>Lưu trữ hình ảnh</td><td>Miễn phí (25GB)</td></tr>
<tr><td>Vercel</td><td>Hosting website</td><td>Miễn phí (gói Hobby)</td></tr>
<tr><td>GitHub</td><td>Lưu trữ mã nguồn</td><td>Miễn phí</td></tr>
<tr><td>Claude AI</td><td>Trợ lý lập trình</td><td>~$20/tháng</td></tr>
</table>

<h2>Quy Trình Tổng Quan</h2>
<ol>
<li><strong>Chuẩn bị môi trường</strong> — Cài đặt phần mềm cần thiết trên máy tính</li>
<li><strong>Tạo tài khoản dịch vụ</strong> — GitHub, Vercel, Neon, Cloudinary</li>
<li><strong>Khởi tạo project</strong> — Tạo cấu trúc dự án với Claude</li>
<li><strong>Xây dựng giao diện</strong> — Dịch hình ảnh thiết kế thành code</li>
<li><strong>Đa ngôn ngữ</strong> — Cấu hình hỗ trợ VI/EN/ES</li>
<li><strong>Cơ sở dữ liệu</strong> — Thiết kế và kết nối database</li>
<li><strong>Dữ liệu ban đầu</strong> — Nhập sản phẩm, dự án, bài viết</li>
<li><strong>Upload ảnh</strong> — Kết nối Cloudinary</li>
<li><strong>Admin CMS</strong> — Xây dựng khu vực quản lý nội dung</li>
<li><strong>Deploy</strong> — Đưa website lên Internet</li>
<li><strong>Xử lý lỗi &amp; bảo trì</strong> — Giải quyết sự cố, cập nhật nội dung</li>
</ol>

<hr/>

<h2>Bước 1: Chuẩn Bị Môi Trường Làm Việc</h2>

<h3>1.1 Cài đặt Node.js</h3>
<p>Node.js là nền tảng chạy JavaScript trên máy tính. Bắt buộc phải có.</p>
<ol>
<li>Truy cập <strong>nodejs.org</strong></li>
<li>Tải phiên bản <strong>LTS (Long Term Support)</strong> — ví dụ Node.js 20.x</li>
<li>Chạy file cài đặt, nhấn Next đến khi hoàn thành</li>
<li>Mở <strong>Command Prompt</strong> (Windows: nhấn Win + R, gõ <code>cmd</code>) hoặc <strong>Terminal</strong> (Mac)</li>
<li>Gõ lệnh sau để kiểm tra: <code>node --version</code></li>
<li>Nếu thấy số phiên bản như <code>v20.11.0</code> là cài đặt thành công</li>
</ol>

<h3>1.2 Cài đặt VS Code</h3>
<p>VS Code là trình soạn thảo code miễn phí, phổ biến nhất hiện nay.</p>
<ol>
<li>Truy cập <strong>code.visualstudio.com</strong></li>
<li>Tải và cài đặt cho hệ điều hành của bạn (Windows/Mac)</li>
<li>Mở VS Code, nhấn <strong>Ctrl+Shift+X</strong> để mở Extensions</li>
<li>Tìm kiếm <strong>Claude Code</strong>, cài đặt extension chính thức từ Anthropic</li>
<li>Đăng nhập bằng tài khoản Claude AI của bạn</li>
</ol>

<h3>1.3 Cài đặt Git</h3>
<p>Git là công cụ lưu trữ lịch sử thay đổi code — giống như &ldquo;Track Changes&rdquo; trong Word nhưng mạnh hơn nhiều.</p>
<ol>
<li>Truy cập <strong>git-scm.com</strong></li>
<li>Tải và cài đặt, giữ mặc định tất cả tùy chọn</li>
<li>Kiểm tra: gõ <code>git --version</code> trong Terminal</li>
</ol>

<h3>1.4 Đăng ký Claude AI</h3>
<ol>
<li>Truy cập <strong>claude.ai</strong>, đăng ký tài khoản</li>
<li>Nâng cấp lên gói <strong>Pro</strong> ($20/tháng) để sử dụng Claude Code không giới hạn</li>
<li>Đăng nhập trong VS Code extension Claude Code bằng tài khoản vừa tạo</li>
</ol>

<hr/>

<h2>Bước 2: Tạo Tài Khoản Các Dịch Vụ</h2>

<h3>2.1 GitHub — Lưu trữ mã nguồn</h3>
<p>GitHub lưu toàn bộ code dự án và cho phép cộng tác nhóm, rollback khi có sự cố.</p>
<ol>
<li>Truy cập <strong>github.com</strong>, đăng ký tài khoản miễn phí</li>
<li>Sau khi đăng nhập, nhấn nút <strong>+</strong> ở góc phải trên → <strong>New repository</strong></li>
<li>Điền tên repo: <code>solarviet-website</code></li>
<li>Chọn <strong>Private</strong> (chỉ bạn thấy)</li>
<li>Nhấn <strong>Create repository</strong></li>
<li>Lưu lại URL của repo: <code>https://github.com/tenban/solarviet-website</code></li>
</ol>

<h3>2.2 Vercel — Hosting website</h3>
<p>Vercel tự động deploy website mỗi khi bạn push code lên GitHub.</p>
<ol>
<li>Truy cập <strong>vercel.com</strong></li>
<li>Nhấn <strong>Sign Up</strong> → chọn <strong>Continue with GitHub</strong></li>
<li>Cho phép Vercel quyền truy cập GitHub của bạn</li>
<li>Chưa cần làm gì thêm — sẽ kết nối sau khi có code</li>
</ol>

<h3>2.3 Neon — Cơ sở dữ liệu PostgreSQL</h3>
<p>Neon cung cấp database PostgreSQL miễn phí trên cloud, không cần cài đặt phức tạp.</p>
<ol>
<li>Truy cập <strong>neon.tech</strong>, đăng ký miễn phí</li>
<li>Tạo project mới: tên <code>solarviet</code>, chọn region <strong>Singapore</strong> (gần Việt Nam nhất)</li>
<li>Sau khi tạo, vào tab <strong>Connection Details</strong></li>
<li>Copy <strong>Connection string</strong> — dạng: <code>postgresql://user:pass@host.neon.tech/dbname?sslmode=require</code></li>
<li>Lưu chuỗi này cẩn thận, sẽ dùng ở Bước 7</li>
</ol>

<h3>2.4 Cloudinary — Lưu trữ hình ảnh</h3>
<p>Cloudinary lưu và tối ưu hóa ảnh tự động, giúp website tải nhanh hơn.</p>
<ol>
<li>Truy cập <strong>cloudinary.com</strong>, đăng ký miễn phí (25GB storage)</li>
<li>Vào <strong>Dashboard</strong>, ghi lại 3 thông tin quan trọng:
<ul>
<li><strong>Cloud Name:</strong> ví dụ <code>solarviet</code></li>
<li><strong>API Key:</strong> ví dụ <code>123456789012345</code></li>
<li><strong>API Secret:</strong> ví dụ <code>abcdefghijklmnopqrstuvwxyz</code></li>
</ul></li>
</ol>

<hr/>

<h2>Bước 3: Khởi Tạo Project</h2>

<h3>3.1 Tạo thư mục làm việc</h3>
<ol>
<li>Tạo thư mục trên máy, ví dụ: <code>D:\Projects\SolarViet</code></li>
<li>Mở VS Code, chọn <strong>File → Open Folder</strong>, chọn thư mục vừa tạo</li>
<li>Mở Claude Code (biểu tượng Claude ở thanh bên trái VS Code)</li>
</ol>

<h3>3.2 Prompt khởi tạo project</h3>
<p>Gõ prompt sau vào Claude Code:</p>
<pre><code>Tôi cần tạo một website doanh nghiệp cho công ty SolarViet chuyên về điện năng lượng mặt trời.
Hãy tạo project Next.js 14 mới trong thư mục hiện tại với:
- TypeScript
- Tailwind CSS
- next-intl v4 cho đa ngôn ngữ (vi/en/es, mặc định là vi)
- Cấu trúc Next.js App Router chuẩn
- File .env.local với các biến môi trường placeholder

Sau khi tạo xong, chạy npm install và kiểm tra project build thành công.</code></pre>
<p>Claude sẽ tự động chạy các lệnh và tạo cấu trúc project. Chờ cho đến khi Claude báo hoàn thành (khoảng 3-5 phút).</p>

<h3>3.3 Kết nối GitHub</h3>
<p>Sau khi project được tạo, yêu cầu Claude đẩy code lên GitHub:</p>
<pre><code>Hãy kết nối project này với GitHub repo:
https://github.com/tenban/solarviet-website

Commit tất cả file với message "Initial project setup" và push lên nhánh main.</code></pre>

<hr/>

<h2>Bước 4: Giao Tiếp Hiệu Quả Với Claude</h2>

<h3>4.1 Nguyên tắc viết prompt tốt</h3>
<p>Prompt là câu lệnh bạn gõ vào Claude. Prompt càng rõ ràng, kết quả càng chính xác.</p>
<ul>
<li><strong>Cụ thể:</strong> Thay vì &ldquo;làm đẹp header&rdquo;, hãy nói &ldquo;header cần có logo bên trái, menu ở giữa, button Liên hệ màu xanh bên phải, nền trắng, shadow nhẹ&rdquo;</li>
<li><strong>Cung cấp ngữ cảnh:</strong> Nhắc Claude về dự án — &ldquo;Website SolarViet đang dùng Next.js 14, Tailwind, next-intl v4...&rdquo;</li>
<li><strong>Một việc mỗi lần:</strong> Không yêu cầu quá nhiều thứ cùng lúc trong một prompt</li>
<li><strong>Xem kết quả trước:</strong> Đợi Claude làm xong bước này rồi mới yêu cầu bước tiếp</li>
</ul>

<h3>4.2 Mẫu prompt thường dùng</h3>
<p><strong>Tạo component giao diện mới:</strong></p>
<pre><code>Tạo component HeroSection cho trang chủ SolarViet với:
- Background ảnh toàn màn hình, overlay màu xanh đậm 70%
- Tiêu đề lớn: "Giải Pháp Điện Mặt Trời Hàng Đầu Việt Nam"
- Mô tả ngắn bên dưới tiêu đề
- 2 button: "Xem Sản Phẩm" (nền xanh #16a34a) và "Tư Vấn Ngay" (viền trắng)
- Responsive: trên mobile chữ nhỏ hơn, button xếp dọc</code></pre>

<p><strong>Sửa lỗi:</strong></p>
<pre><code>Bị lỗi này khi chạy npm run build:
[PASTE NỘI DUNG LỖI VÀO ĐÂY]

File bị lỗi: src/components/HeroSection.tsx
Hãy tìm nguyên nhân và sửa.</code></pre>

<p><strong>Thêm tính năng:</strong></p>
<pre><code>Thêm tính năng tìm kiếm sản phẩm trên trang /products:
- Input tìm kiếm ở đầu trang
- Lọc theo tên sản phẩm và mô tả
- Kết quả cập nhật realtime khi gõ
- Hiện "Không tìm thấy sản phẩm" nếu không có kết quả</code></pre>

<h3>4.3 Khi gặp sự cố với Claude</h3>
<ul>
<li>Nếu Claude hỏi lại — trả lời rõ ràng, đừng bỏ trống</li>
<li>Nếu code không chạy — copy TOÀN BỘ thông báo lỗi và paste vào Claude</li>
<li>Nếu giao diện không đúng — mô tả chi tiết cần sửa gì, ở đâu</li>
<li>Nếu Claude làm sai hướng — nhấn <strong>Escape</strong> để dừng, rồi viết lại prompt rõ hơn</li>
</ul>

<hr/>

<h2>Bước 5: Xây Dựng Giao Diện Từ Hình Ảnh Thiết Kế</h2>

<h3>5.1 Chuẩn bị trước khi bắt đầu</h3>
<p>Bạn cần có sẵn:</p>
<ul>
<li>File thiết kế giao diện (từ Figma, Canva, Adobe XD, hoặc ảnh chụp bản vẽ tay)</li>
<li>Logo công ty (file PNG với nền trong suốt, tối thiểu 400px chiều rộng)</li>
<li>Bảng màu thương hiệu (mã màu HEX, ví dụ xanh lá: <code>#16a34a</code>, xanh đậm: <code>#166534</code>)</li>
<li>Font chữ mong muốn (ví dụ: Inter, Roboto, hoặc Be Vietnam Pro)</li>
</ul>

<h3>5.2 Các section của trang chủ SolarViet</h3>
<p>Trang chủ được chia thành nhiều section độc lập, mỗi section là một component:</p>
<ol>
<li><strong>Header/Navigation</strong> — Logo, menu điều hướng, button CTA, chọn ngôn ngữ</li>
<li><strong>Hero Section</strong> — Banner lớn với tiêu đề và call-to-action chính</li>
<li><strong>Stats Section</strong> — Số liệu thống kê: số dự án, công suất, khách hàng</li>
<li><strong>Products Section</strong> — Grid sản phẩm nổi bật (3-4 sản phẩm)</li>
<li><strong>Projects Section</strong> — Dự án tiêu biểu đã thực hiện</li>
<li><strong>Why Us Section</strong> — Lý do chọn SolarViet (4-6 điểm mạnh)</li>
<li><strong>Testimonials</strong> — Đánh giá, phản hồi của khách hàng</li>
<li><strong>Contact Section</strong> — Form liên hệ và thông tin</li>
<li><strong>Footer</strong> — Logo, links, thông tin công ty, mạng xã hội</li>
</ol>

<p>Prompt mẫu để tạo từng section:</p>
<pre><code>Tạo component ProductsSection cho trang chủ SolarViet:
- Tiêu đề section: "Sản Phẩm Nổi Bật"
- Grid 3 cột (mobile: 1 cột, tablet: 2 cột, desktop: 3 cột)
- Mỗi card gồm: ảnh sản phẩm, badge danh mục, tên sản phẩm, mô tả ngắn, button "Xem chi tiết"
- Card có hover effect (shadow và scale nhẹ)
- Button "Xem tất cả sản phẩm" ở cuối section, căn giữa
- Màu accent: xanh lá #16a34a
- Dùng dữ liệu placeholder tạm thời cho 3 sản phẩm</code></pre>

<h3>5.3 Kiểm tra giao diện</h3>
<ol>
<li>Trong Terminal VS Code (Ctrl+\`), chạy: <code>npm run dev</code></li>
<li>Mở trình duyệt tại <code>http://localhost:3000</code></li>
<li>Kiểm tra responsive: nhấn F12 → icon điện thoại để xem trên mobile</li>
<li>Kiểm tra các kích thước: 375px (iPhone), 768px (iPad), 1440px (desktop)</li>
</ol>

<hr/>

<h2>Bước 6: Đa Ngôn Ngữ (VI / EN / ES)</h2>

<h3>6.1 Cách next-intl hoạt động</h3>
<p>Website SolarViet hỗ trợ 3 ngôn ngữ. URL theo cấu trúc:</p>
<ul>
<li><code>solarviet.vn/</code> — Tiếng Việt (mặc định)</li>
<li><code>solarviet.vn/en/</code> — English</li>
<li><code>solarviet.vn/es/</code> — Español</li>
</ul>

<h3>6.2 File dịch thuật</h3>
<p>Toàn bộ văn bản tĩnh trên website được lưu trong file JSON:</p>
<ul>
<li><code>messages/vi.json</code> — Tiếng Việt</li>
<li><code>messages/en.json</code> — English</li>
<li><code>messages/es.json</code> — Español</li>
</ul>
<p>Cấu trúc file vi.json ví dụ:</p>
<pre><code>{
  "nav": {
    "home": "Trang chủ",
    "products": "Sản phẩm",
    "projects": "Dự án",
    "blog": "Tin tức",
    "contact": "Liên hệ"
  },
  "hero": {
    "title": "Giải Pháp Điện Mặt Trời Hàng Đầu Việt Nam",
    "subtitle": "SolarViet cung cấp giải pháp lắp đặt điện mặt trời toàn diện"
  }
}</code></pre>

<p>Prompt để Claude dịch:</p>
<pre><code>Dịch toàn bộ nội dung trong messages/vi.json sang tiếng Anh, tạo file messages/en.json.
Giữ nguyên tất cả keys, chỉ dịch values.
Sau đó dịch sang tiếng Tây Ban Nha, tạo messages/es.json.</code></pre>

<h3>6.3 Nội dung động (database)</h3>
<p>Với sản phẩm, dự án, bài viết — mỗi trường có 3 phiên bản ngôn ngữ trong database: <code>titleVi</code>, <code>titleEn</code>, <code>titleEs</code>. Claude sẽ tự động đọc đúng ngôn ngữ dựa trên URL người dùng đang xem.</p>

<hr/>

<h2>Bước 7: Cơ Sở Dữ Liệu (Prisma + Neon PostgreSQL)</h2>

<h3>7.1 Thiết kế schema database</h3>
<p>Database lưu trữ tất cả nội dung có thể thay đổi. Với SolarViet:</p>
<ul>
<li><strong>Product</strong> — Sản phẩm: tên (3 ngôn ngữ), mô tả, ảnh, danh mục, trạng thái</li>
<li><strong>Project</strong> — Dự án: tên, địa điểm, công suất, năm thực hiện, ảnh</li>
<li><strong>BlogPost</strong> — Bài viết tin tức: tiêu đề, nội dung, tác giả, ngày đăng</li>
<li><strong>SiteSetting</strong> — Cài đặt chung: logo, thông tin liên hệ, nội dung hero</li>
</ul>

<p>Prompt thiết kế:</p>
<pre><code>Tạo Prisma schema cho website SolarViet với PostgreSQL (Neon).

Model Product: id, slug (unique), status (draft/published), category (combo/panel/inverter/battery), sortOrder (Int default 0), featuredImage, gallery (String default "[]"), downloadUrl, titleVi, titleEn, titleEs, subtitleVi/En/Es, excerptVi/En/Es, featuresVi/En/Es (JSON array), specsVi/En/Es (JSON object), createdAt, updatedAt

Model Project: id, slug, status, category (enterprise/household/community), location, power, year, featuredImage, gallery (String default "[]"), titleVi/En/Es, excerptVi/En/Es, contentVi/En/Es, createdAt, updatedAt

Model BlogPost: id, slug, status, author (default "Admin"), publishedAt (DateTime nullable), featuredImage, titleVi/En/Es, excerptVi/En/Es, contentVi/En/Es, createdAt, updatedAt

Model SiteSetting: id (String default "1"), key (String unique), value (String), updatedAt

Sau khi tạo schema, chạy: npx prisma db push && npx prisma generate</code></pre>

<h3>7.2 Điền thông tin database</h3>
<p>Mở file <code>.env.local</code> và điền Connection string từ Neon:</p>
<pre><code>DATABASE_URL="postgresql://user:password@ep-xxxx.ap-southeast-1.aws.neon.tech/dbname?sslmode=require"</code></pre>

<h3>7.3 Kiểm tra kết nối</h3>
<pre><code>Chạy Prisma Studio để xem database:
npx prisma studio</code></pre>
<p>Trình duyệt mở tại <code>http://localhost:5555</code> — bạn có thể xem, thêm, sửa, xóa dữ liệu trực tiếp.</p>

<hr/>

<h2>Bước 8: Nhập Dữ Liệu Ban Đầu</h2>

<h3>8.1 Tại sao cần dữ liệu ban đầu</h3>
<p>Database mới tạo hoàn toàn trống. Cần nhập dữ liệu để website có nội dung hiển thị và để kiểm tra giao diện.</p>

<h3>8.2 Tạo seed script</h3>
<p>Prompt cho Claude:</p>
<pre><code>Tạo file prisma/seed.ts để nhập dữ liệu ban đầu cho SolarViet:

3 sản phẩm:
1. slug: combo-5kw, category: combo, status: published
   titleVi: "Combo Điện Mặt Trời Gia Đình 5kW"
   excerptVi: "Giải pháp tiết kiệm điện hoàn chỉnh cho hộ gia đình, công suất 5kW"

2. slug: panel-mono-400w, category: panel, status: published
   titleVi: "Tấm Pin Mặt Trời Mono 400W"

3. slug: inverter-solis-5kw, category: inverter, status: published
   titleVi: "Inverter Solis 5kW"

2 dự án:
1. slug: kcn-thai-binh-500kw, category: enterprise, status: published
   titleVi: "KCN Thái Bình 500kW", location: "Thái Bình", power: "500kW", year: "2024"

2. slug: ho-gia-dinh-ha-noi-10kw, category: household, status: published
   titleVi: "Hộ Gia Đình Hà Nội 10kW", location: "Hà Nội", power: "10kW", year: "2025"

1 bài viết:
slug: dien-mat-troi-2025, status: published
titleVi: "Xu Hướng Điện Mặt Trời Năm 2025"

Sau đó thêm vào package.json:
"prisma": { "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts" }
Và chạy: npx prisma db seed</code></pre>

<h3>8.3 Kiểm tra dữ liệu</h3>
<p>Sau khi seed xong, mở Prisma Studio (<code>npx prisma studio</code>) để xác nhận dữ liệu đã vào đúng.</p>

<hr/>

<h2>Bước 9: Upload Hình Ảnh (Cloudinary)</h2>

<h3>9.1 Cấu hình Cloudinary</h3>
<p>Điền thông tin Cloudinary vào <code>.env.local</code>:</p>
<pre><code>CLOUDINARY_CLOUD_NAME=solarviet
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=solarviet</code></pre>

<h3>9.2 Tạo API endpoint upload</h3>
<pre><code>Tạo API endpoint POST /api/upload để upload ảnh lên Cloudinary:
- Nhận file qua FormData (field tên là "file")
- Upload vào folder "solarviet" trong Cloudinary
- Trả về JSON: { url, publicId }
- Chỉ cho phép admin đã đăng nhập (kiểm tra cookie tb_admin_auth)</code></pre>

<h3>9.3 Component upload ảnh trong Admin</h3>
<pre><code>Tạo component ImageUpload tái sử dụng cho Admin:
- Hiển thị ảnh hiện tại (nếu có)
- Nút "Chọn ảnh" mở file picker, chỉ nhận file ảnh
- Sau khi chọn: preview ngay lập tức + tự động upload lên /api/upload
- Hiển thị loading spinner khi đang upload
- Sau khi upload xong: gọi callback onChange(url) với URL từ Cloudinary
- Nút xóa ảnh (X) để reset về trống</code></pre>

<h3>9.4 Gallery nhiều ảnh</h3>
<pre><code>Tạo component GalleryManager cho Admin:
- Hiển thị grid ảnh đã chọn
- Nút "Thêm ảnh" cho phép chọn nhiều ảnh cùng lúc
- Upload lần lượt từng ảnh lên Cloudinary
- Nút xóa từng ảnh
- Kéo thả để sắp xếp thứ tự (dùng @dnd-kit/sortable)
- Trả về mảng URL dạng JSON string qua onChange</code></pre>

<hr/>

<h2>Bước 10: Xây Dựng Khu Vực Admin CMS</h2>

<h3>10.1 Cấu trúc Admin</h3>
<p>Khu vực Admin cho phép quản lý toàn bộ nội dung website mà không cần động đến code:</p>
<ul>
<li><code>/admin</code> — Dashboard: thống kê tổng quan</li>
<li><code>/admin/products</code> — Danh sách sản phẩm, tạo/sửa/xóa</li>
<li><code>/admin/projects</code> — Danh sách dự án</li>
<li><code>/admin/blog</code> — Quản lý bài viết</li>
<li><code>/admin/settings</code> — Cài đặt: logo, thông tin liên hệ, nội dung hero</li>
<li><code>/admin/users</code> — Quản lý tài khoản admin</li>
</ul>

<h3>10.2 Hệ thống đăng nhập Admin</h3>
<pre><code>Tạo hệ thống đăng nhập Admin cho SolarViet:
- Trang /admin/login với form email + password
- API POST /api/auth/login: kiểm tra credentials, set cookie httpOnly tên "tb_admin_auth"
- API POST /api/auth/logout: xóa cookie
- Middleware bảo vệ tất cả routes /admin/* (redirect về /admin/login nếu chưa đăng nhập)
- Thông tin mặc định: admin@solarviet.vn / SolarViet@2025</code></pre>

<h3>10.3 Trang quản lý sản phẩm — Layout 2 cột</h3>
<pre><code>Tạo trang editor đầy đủ tại /admin/products/new và /admin/products/[id]/edit:

Layout 2 cột:
- Cột trái (70%): Tab ngôn ngữ VI | EN | ES
  + Tên sản phẩm (input)
  + Slug (auto-generate từ tên VI, có thể sửa)
  + Mô tả ngắn (textarea)
  + Nội dung chi tiết (TipTap rich text editor)

- Cột phải (30%) - Sidebar:
  + Ảnh đại diện (ImageUpload component)
  + Gallery ảnh (GalleryManager component)
  + Danh mục (select: combo/panel/inverter/battery)
  + Trạng thái (select: draft/published)
  + Thứ tự sắp xếp (number input)

- Header thanh action: nút "← Quay lại", badge trạng thái, nút "Lưu nháp", nút "Xuất bản"

Khi lưu: gọi PUT /api/admin/products/[id] với toàn bộ dữ liệu form</code></pre>

<h3>10.4 Rich Text Editor (TipTap)</h3>
<pre><code>Tạo component RichEditor dùng TipTap cho Admin:
- Toolbar: Bold, Italic, Underline, H2, H3, Bullet list, Ordered list, Link, Chèn ảnh
- Khi nhấn nút Chèn ảnh: mở file picker → upload lên /api/upload → chèn vào editor
- Output là HTML string
- Props: value (string), onChange (string) => void, placeholder (string)</code></pre>

<h3>10.5 Trang cài đặt website</h3>
<pre><code>Tạo trang /admin/settings với các section:
1. Thông tin cơ bản: Logo (ImageUpload), tên công ty, email, số điện thoại, địa chỉ
2. Hero Section: Badge text (3 ngôn ngữ), background ảnh, tiêu đề (3 ngôn ngữ)
3. Mạng xã hội: Facebook, YouTube, Zalo URL
4. SEO mặc định: Meta title, meta description

Lưu từng section riêng qua API /api/admin/settings</code></pre>

<hr/>

<h2>Bước 11: Quản Lý Người Dùng Admin</h2>

<h3>11.1 Thêm model AdminUser vào database</h3>
<pre><code>Thêm model AdminUser vào Prisma schema:
- id, name, email (unique), passwordHash (bcrypt 12 rounds), role (admin/superadmin), status (active/inactive), createdAt, updatedAt

Cập nhật API /api/auth/login để:
1. Kiểm tra AdminUser trong database trước (dùng bcrypt.compare)
2. Nếu không có user nào trong DB, fallback về env vars ADMIN_EMAIL và ADMIN_PASSWORD</code></pre>

<h3>11.2 Trang quản lý users</h3>
<pre><code>Tạo trang /admin/users:
- Bảng danh sách: tên, email, role, trạng thái, lần đăng nhập cuối
- Nút "Thêm người dùng": form tên + email + mật khẩu
- Nút đổi mật khẩu cho từng user (modal popup)
- Nút vô hiệu hóa/kích hoạt tài khoản
- Không cho phép xóa tài khoản superadmin duy nhất</code></pre>

<hr/>

<h2>Bước 12: Deploy Lên Internet (Vercel)</h2>

<h3>12.1 Kiểm tra trước khi deploy</h3>
<p>Bắt buộc phải làm trước:</p>
<ul>
<li>Chạy <code>npm run build</code> trong Terminal — phải thành công, không có lỗi đỏ</li>
<li>Kiểm tra tất cả trang chạy đúng trên localhost</li>
<li>File <code>.env.local</code> KHÔNG được commit lên GitHub (Claude đã thêm vào .gitignore)</li>
</ul>

<h3>12.2 Tạo project trên Vercel</h3>
<ol>
<li>Đăng nhập <strong>vercel.com</strong></li>
<li>Nhấn <strong>Add New → Project</strong></li>
<li>Chọn repo <code>solarviet-website</code> từ danh sách GitHub</li>
<li>Vercel tự nhận diện Next.js — giữ cài đặt mặc định</li>
<li>CHƯA nhấn Deploy — vào <strong>Environment Variables</strong> trước</li>
</ol>

<h3>12.3 Cài đặt biến môi trường trên Vercel</h3>
<p>Thêm tất cả biến sau (copy từ file <code>.env.local</code>):</p>
<pre><code>DATABASE_URL           = postgresql://... (Connection string từ Neon)
CLOUDINARY_CLOUD_NAME  = solarviet
CLOUDINARY_API_KEY     = 123456789012345
CLOUDINARY_API_SECRET  = abcdefghijklmnopqrstuvwxyz
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = solarviet
ADMIN_EMAIL            = admin@solarviet.vn
ADMIN_PASSWORD         = SolarViet@2025</code></pre>
<p>Chọn <strong>All Environments</strong> (Production + Preview + Development) cho mỗi biến.</p>

<h3>12.4 Deploy lần đầu</h3>
<ol>
<li>Nhấn <strong>Deploy</strong></li>
<li>Chờ 2-4 phút, theo dõi Build Logs</li>
<li>Nếu thành công: website live tại URL dạng <code>solarviet-website.vercel.app</code></li>
<li>Truy cập <code>/admin/login</code>, đăng nhập và kiểm tra admin panel</li>
</ol>

<h3>12.5 Chiến lược nhánh Git (Staging vs Production)</h3>
<p>Đây là cách làm chuyên nghiệp để tránh ảnh hưởng website đang chạy khi phát triển tính năng mới:</p>
<ul>
<li><strong>Nhánh develop</strong> → Vercel tự deploy lên staging: <code>solarviet-staging.vercel.app</code></li>
<li><strong>Nhánh main</strong> → Vercel tự deploy lên production: <code>solarviet.vn</code></li>
</ul>
<p>Quy trình chuẩn:</p>
<ol>
<li>Mọi thay đổi làm trên nhánh <code>develop</code></li>
<li>Kiểm tra kỹ trên staging</li>
<li>Khi hài lòng: merge <code>develop</code> → <code>main</code> để cập nhật production</li>
</ol>
<p>Yêu cầu Claude thực hiện deploy production:</p>
<pre><code>Merge nhánh develop vào main và push để deploy lên production.</code></pre>

<h3>12.6 Gắn tên miền riêng</h3>
<ol>
<li>Mua tên miền tại nhà cung cấp (tên.vn, Godaddy, Namecheap)</li>
<li>Vercel → Settings → Domains → <strong>Add Domain</strong>: nhập <code>solarviet.vn</code></li>
<li>Vercel cung cấp DNS records: 2 bản ghi CNAME hoặc A record</li>
<li>Vào quản lý DNS của nhà cung cấp tên miền, thêm các bản ghi đó</li>
<li>Chờ 1-24 giờ cho DNS có hiệu lực</li>
<li>SSL/HTTPS tự động được Vercel cấp (không cần làm gì thêm)</li>
</ol>

<hr/>

<h2>Bước 13: Xử Lý Lỗi Phổ Biến</h2>

<h3>13.1 Lỗi build trên Vercel</h3>
<p><strong>Triệu chứng:</strong> Vercel hiện &ldquo;Build Failed&rdquo;, website không cập nhật sau khi push code</p>
<p><strong>Cách xử lý:</strong></p>
<ol>
<li>Vào Vercel Dashboard → Deployments → nhấn vào deployment lỗi</li>
<li>Xem phần <strong>Build Logs</strong>, cuộn xuống tìm dòng màu đỏ bắt đầu bằng <code>Error:</code></li>
<li>Copy toàn bộ thông báo lỗi, paste vào Claude:</li>
</ol>
<pre><code>Build Vercel bị lỗi. Hãy phân tích và sửa:
[PASTE NỘI DUNG LỖI TỪ VERCEL BUILD LOGS]</code></pre>

<h3>13.2 Lỗi ESLint — unescaped entities</h3>
<p><strong>Triệu chứng:</strong> <code>Error: react/no-unescaped-entities</code></p>
<p><strong>Nguyên nhân:</strong> Trong code giao diện (JSX), ký tự <code>"</code> và <code>'</code> phải viết dưới dạng HTML entity.</p>
<p><strong>Cách sửa:</strong> Yêu cầu Claude &ldquo;Sửa lỗi unescaped entities trong file [tên file]&rdquo;</p>
<p>Bảng quy đổi ký tự:</p>
<table>
<tr><th>Ký tự</th><th>Phải viết thành</th></tr>
<tr><td>&quot; (ngoặc kép trái)</td><td>&amp;ldquo;</td></tr>
<tr><td>&quot; (ngoặc kép phải)</td><td>&amp;rdquo;</td></tr>
<tr><td>&apos; (dấu nháy đơn)</td><td>&amp;apos; hoặc đặt trong {&apos;...&apos;}</td></tr>
</table>

<h3>13.3 Lỗi kết nối database</h3>
<p><strong>Triệu chứng:</strong> Website trắng hoặc lỗi <code>Can&apos;t reach database server</code></p>
<p><strong>Kiểm tra theo thứ tự:</strong></p>
<ol>
<li>Neon Dashboard → kiểm tra project còn active (không bị suspend do không dùng lâu)</li>
<li>Vercel → Settings → Environment Variables → kiểm tra DATABASE_URL đúng chưa</li>
<li>Copy lại Connection string từ Neon, cập nhật trong Vercel env vars, redeploy</li>
</ol>

<h3>13.4 Lỗi ảnh không hiển thị</h3>
<p><strong>Triệu chứng:</strong> Ảnh hiện icon hỏng, console lỗi <code>hostname not configured</code></p>
<p><strong>Sửa:</strong></p>
<pre><code>Ảnh từ Cloudinary không hiển thị, lỗi hostname "res.cloudinary.com" chưa được cấu hình.
Thêm domain này vào next.config.js trong phần images.remotePatterns.</code></pre>

<h3>13.5 Lỗi Prisma sau khi thay đổi schema</h3>
<p><strong>Triệu chứng:</strong> TypeScript báo lỗi về các field mới thêm vào model</p>
<p><strong>Sửa:</strong></p>
<pre><code>Chạy lại: npx prisma generate
Nếu cần tạo lại bảng: npx prisma db push</code></pre>

<h3>13.6 Neon database tạm ngưng (Suspend)</h3>
<p>Neon free tier tự động suspend database sau 5 ngày không hoạt động. Cách khắc phục:</p>
<ul>
<li>Vào Neon Dashboard, nhấn <strong>Resume</strong> để kích hoạt lại</li>
<li>Sau lần đầu kết nối lại, database hoạt động bình thường</li>
<li>Nâng cấp lên gói trả phí (~$19/tháng) để tránh bị suspend</li>
</ul>

<hr/>

<h2>Bước 14: Bảo Trì và Cập Nhật</h2>

<h3>14.1 Cập nhật nội dung hàng ngày</h3>
<p>Dùng Admin CMS — không cần kỹ thuật:</p>
<ul>
<li>Thêm sản phẩm mới: <code>/admin/products/new</code></li>
<li>Đăng bài viết mới: <code>/admin/blog/new</code></li>
<li>Cập nhật dự án: <code>/admin/projects</code></li>
<li>Sửa thông tin liên hệ: <code>/admin/settings</code></li>
</ul>

<h3>14.2 Thêm tính năng mới</h3>
<p>Quy trình chuẩn khi cần phát triển thêm:</p>
<ol>
<li>Đảm bảo đang ở nhánh <code>develop</code> (hỏi Claude nếu không chắc)</li>
<li>Mô tả tính năng mới cho Claude</li>
<li>Claude thực hiện và commit lên develop</li>
<li>Kiểm tra kỹ trên staging (<code>solarviet-staging.vercel.app</code>)</li>
<li>Nếu ổn, yêu cầu Claude merge vào main để deploy production</li>
</ol>

<h3>14.3 Theo dõi hiệu suất</h3>
<ul>
<li><strong>Vercel Analytics:</strong> Dashboard → Analytics — lượt truy cập, tốc độ tải trang</li>
<li><strong>Vercel Logs:</strong> Dashboard → Logs — lỗi runtime nếu có</li>
<li><strong>Google Search Console:</strong> Đăng ký miễn phí để theo dõi SEO và lỗi crawl</li>
</ul>

<h3>14.4 Backup dữ liệu</h3>
<p>Neon tự động backup hàng ngày và giữ trong 7 ngày (free tier). Để xuất dữ liệu thủ công:</p>
<pre><code>Xuất dữ liệu từ database ra file JSON để backup:
npx prisma db execute --file export.sql</code></pre>

<hr/>

<h2>Checklist Hoàn Thành Dự Án</h2>
<p>Đánh dấu từng mục khi hoàn thành:</p>
<ul>
<li>Môi trường làm việc: Node.js, VS Code, Git, Claude Code</li>
<li>Tài khoản dịch vụ: GitHub, Vercel, Neon, Cloudinary</li>
<li>Project khởi tạo và push lên GitHub</li>
<li>Giao diện trang chủ (tất cả sections)</li>
<li>Trang sản phẩm, chi tiết sản phẩm</li>
<li>Trang dự án, chi tiết dự án</li>
<li>Trang blog, chi tiết bài viết</li>
<li>Trang liên hệ</li>
<li>3 ngôn ngữ (VI/EN/ES) hoạt động đúng</li>
<li>Database kết nối thành công</li>
<li>Dữ liệu ban đầu đã nhập</li>
<li>Upload ảnh (Cloudinary) hoạt động</li>
<li>Admin CMS: Products, Projects, Blog, Settings</li>
<li>Quản lý người dùng Admin</li>
<li>Deploy Vercel thành công</li>
<li>Tên miền riêng đã gắn và SSL hoạt động</li>
<li>Kiểm tra responsive trên mobile và tablet</li>
<li>SEO cơ bản: meta title, description, OG image</li>
</ul>

<hr/>

<h2>Mẹo Quan Trọng</h2>

<h3>Bảo mật</h3>
<ul>
<li>KHÔNG bao giờ commit file <code>.env.local</code> lên GitHub (chứa mật khẩu database, API keys)</li>
<li>Mật khẩu Admin phải mạnh: tối thiểu 12 ký tự, có chữ hoa, số, ký tự đặc biệt</li>
<li>Thay đổi mật khẩu Admin định kỳ mỗi 3-6 tháng</li>
<li>Không chia sẻ API keys với người không cần thiết</li>
</ul>

<h3>Tối ưu ảnh</h3>
<ul>
<li>Nén ảnh trước khi upload: dùng <strong>squoosh.app</strong> (miễn phí, không cần cài đặt)</li>
<li>Kích thước ảnh featured image: 1200×630px (chuẩn OG Image)</li>
<li>Cloudinary tự động tối ưu và resize ảnh khi deliver</li>
</ul>

<h3>SEO tốt hơn</h3>
<ul>
<li>Điền đầy đủ SEO Title (&lt;60 ký tự) và SEO Description (&lt;160 ký tự) cho mỗi trang</li>
<li>URL (slug) ngắn gọn, không dấu, dùng dấu gạch ngang, không viết tắt khó hiểu</li>
<li>Mỗi ảnh phải có alt text mô tả nội dung ảnh</li>
</ul>

<h3>Khi gặp vấn đề</h3>
<ul>
<li>Copy TOÀN BỘ thông báo lỗi (không tóm tắt) và paste vào Claude</li>
<li>Cung cấp ngữ cảnh: &ldquo;Website SolarViet, Next.js 14, đang thực hiện bước X&rdquo;</li>
<li>Không tự xóa code khi gặp lỗi — để Claude đọc và sửa</li>
<li>Nếu một approach không hoạt động sau 2-3 lần thử, hỏi Claude về cách tiếp cận khác</li>
</ul>

<p><em>Tài liệu này được xây dựng dựa trên kinh nghiệm thực tế phát triển website TBSolaro — một dự án web doanh nghiệp đầy đủ tính năng với Next.js, Prisma, Cloudinary và Vercel. Mọi bước đã được kiểm chứng và áp dụng thành công trong môi trường production.</em></p>`;

const ADMIN_GUIDE_CONTENT = `<h1>Hướng Dẫn Sử Dụng Admin CMS — TBSolaro</h1>
<p>Tài liệu mô tả từng màn hình trong khu vực quản trị (<code>/admin</code>) của website TBSolaro. Dành cho nhân viên vận hành nội dung — không yêu cầu kỹ thuật.</p>

<hr/>

<h2>1. Đăng Nhập — <code>/admin/login</code></h2>
<p>Trang đầu tiên khi truy cập khu vực quản trị. Chưa đăng nhập sẽ tự động chuyển về đây.</p>
<h3>Các trường</h3>
<ul>
<li><strong>Email:</strong> Địa chỉ email tài khoản admin</li>
<li><strong>Mật khẩu:</strong> Mật khẩu tương ứng</li>
<li>Nhấn <strong>Đăng nhập</strong> hoặc Enter để xác nhận</li>
</ul>
<h3>Lưu ý</h3>
<ul>
<li>Sau khi đăng nhập thành công, trình duyệt lưu cookie xác thực. Session giữ nguyên cho đến khi đóng trình duyệt hoặc đăng xuất</li>
<li>Nhấn <strong>Đăng xuất</strong> (góc trên phải sidebar) để kết thúc phiên làm việc</li>
<li>Tài khoản mặc định được cấu hình qua biến môi trường <code>ADMIN_EMAIL</code> / <code>ADMIN_PASSWORD</code> trên Vercel</li>
</ul>

<hr/>

<h2>2. Dashboard — <code>/admin</code></h2>
<p>Trang tổng quan sau khi đăng nhập. Cung cấp cái nhìn nhanh về trạng thái toàn bộ nội dung.</p>
<h3>Thẻ thống kê (hàng trên)</h3>
<table>
<tr><th>Thẻ</th><th>Hiển thị</th><th>Nhấn vào dẫn đến</th></tr>
<tr><td>Sản phẩm</td><td>Số sản phẩm đã xuất bản</td><td>/admin/products</td></tr>
<tr><td>Dự án</td><td>Số dự án đã xuất bản</td><td>/admin/projects</td></tr>
<tr><td>Blog</td><td>Số bài viết đã xuất bản</td><td>/admin/blog</td></tr>
<tr><td>FAQs</td><td>Số câu hỏi thường gặp</td><td>/admin/faq</td></tr>
<tr><td>Showroom</td><td>Số địa điểm showroom</td><td>/admin/showrooms</td></tr>
<tr><td>Tài liệu</td><td>Số tài liệu tải về</td><td>/admin/downloads</td></tr>
</table>
<h3>Bảng danh sách nhanh</h3>
<ul>
<li><strong>Sản phẩm mới nhất:</strong> 4 sản phẩm gần đây — ảnh thumbnail, tên, danh mục, trạng thái</li>
<li><strong>Dự án gần đây:</strong> 4 dự án gần đây — ảnh, tên, công suất, phân loại</li>
</ul>
<h3>Phím tắt hành động nhanh (hàng dưới)</h3>
<ul>
<li>Xem liên hệ mới → <code>/admin/submissions</code></li>
<li>Viết bài blog mới → <code>/admin/blog</code></li>
<li>Cài đặt website → <code>/admin/settings</code></li>
</ul>

<hr/>

<h2>3. Sản Phẩm — <code>/admin/products</code></h2>
<p>Danh sách toàn bộ sản phẩm (cả draft lẫn đã xuất bản).</p>
<h3>Giao diện bảng</h3>
<table>
<tr><th>Cột</th><th>Mô tả</th></tr>
<tr><td>Sản phẩm</td><td>Ảnh thumbnail + tên sản phẩm. Nhấn tên để vào trang chỉnh sửa</td></tr>
<tr><td>Danh mục</td><td>Loại sản phẩm: combo / panel / inverter / battery / other</td></tr>
<tr><td>Trạng thái</td><td>Badge xanh = Published (hiển thị trên web), badge vàng = Draft (ẩn)</td></tr>
<tr><td>Cập nhật</td><td>Ngày chỉnh sửa gần nhất</td></tr>
<tr><td>Thao tác</td><td>Nút Sửa (bút chì) và Xóa (thùng rác)</td></tr>
</table>
<h3>Tạo sản phẩm mới</h3>
<p>Nhấn nút <strong>+ Thêm sản phẩm</strong> (góc trên phải) → chuyển đến <code>/admin/products/new</code></p>
<h3>Xóa sản phẩm</h3>
<p>Nhấn icon thùng rác → hộp thoại xác nhận hiện ra → nhấn <strong>Xóa</strong> để xác nhận. Hành động này không thể hoàn tác.</p>

<hr/>

<h2>4. Tạo / Chỉnh Sửa Sản Phẩm</h2>
<p>Truy cập qua: <code>/admin/products/new</code> hoặc <code>/admin/products/[id]/edit</code></p>

<h3>Thanh header</h3>
<ul>
<li><strong>← Quay lại:</strong> Trở về danh sách (không lưu thay đổi)</li>
<li><strong>Trạng thái hiện tại:</strong> Badge hiển thị Draft hoặc Published</li>
<li><strong>Lưu nháp:</strong> Lưu với trạng thái <code>draft</code> — không hiển thị trên website</li>
<li><strong>Xuất bản:</strong> Lưu với trạng thái <code>published</code> — hiển thị ngay trên website</li>
</ul>

<h3>Tabs ngôn ngữ — 🇻🇳 VI / 🇬🇧 EN / 🇪🇸 ES</h3>
<p>Chuyển tab để nhập nội dung cho từng ngôn ngữ. Các trường dưới đây thay đổi theo tab đang chọn:</p>
<table>
<tr><th>Trường</th><th>Mô tả</th><th>Lưu ý</th></tr>
<tr><td>Tên sản phẩm *</td><td>Tiêu đề chính, hiển thị nổi bật trên card và trang chi tiết</td><td>Bắt buộc cho VI; EN/ES để trống sẽ dùng bản VI</td></tr>
<tr><td>Phụ đề</td><td>Dòng mô tả ngắn màu xanh bên dưới tiêu đề</td><td>Không bắt buộc</td></tr>
<tr><td>Mô tả ngắn</td><td>2-3 câu tóm tắt, hiện trên card sản phẩm trong danh sách</td><td>Khuyến nghị dưới 150 ký tự</td></tr>
<tr><td>Nội dung chi tiết</td><td>Rich text editor — mô tả đầy đủ, tính năng, thông số kỹ thuật</td><td>Hỗ trợ H2/H3, in đậm, danh sách, chèn ảnh, bảng</td></tr>
<tr><td>Tính năng nổi bật</td><td>Danh sách bullet điểm mạnh của sản phẩm (hiện trên card)</td><td>3-5 điểm ngắn gọn là tối ưu</td></tr>
<tr><td>Thông số kỹ thuật</td><td>Bảng thông số dạng key-value (Công suất: 5kW, Bảo hành: 10 năm)</td><td>Nhấn + để thêm hàng, X để xóa</td></tr>
<tr><td>SEO Title</td><td>Tiêu đề hiển thị trên tab trình duyệt và kết quả tìm kiếm Google</td><td>Tối đa 60 ký tự</td></tr>
<tr><td>SEO Description</td><td>Mô tả hiển thị trong kết quả Google</td><td>Tối đa 160 ký tự</td></tr>
</table>

<h3>Sidebar phải — Cài đặt sản phẩm</h3>
<table>
<tr><th>Trường</th><th>Mô tả</th></tr>
<tr><td>Ảnh đại diện</td><td>Ảnh chính hiển thị trên card và đầu trang chi tiết. Nhấn để chọn file, tự động upload lên cloud</td></tr>
<tr><td>Gallery ảnh</td><td>Nhiều ảnh bổ sung — kéo thả để sắp xếp thứ tự, nhấn X để xóa từng ảnh</td></tr>
<tr><td>Danh mục</td><td>combo / panel / inverter / battery / other — ảnh hưởng đến bộ lọc trên trang sản phẩm</td></tr>
<tr><td>Trạng thái</td><td>draft (ẩn) hoặc published (hiển thị)</td></tr>
<tr><td>Thứ tự</td><td>Số nguyên — sản phẩm có số nhỏ hơn hiển thị trước trong danh sách</td></tr>
<tr><td>Slug *</td><td>URL của sản phẩm, ví dụ: <code>combo-5kw-gia-dinh</code> → URL: <code>/products/combo-5kw-gia-dinh</code>. Tự động tạo từ tên VI, có thể sửa tay. Không dùng dấu, khoảng trắng, ký tự đặc biệt</td></tr>
<tr><td>Link tải tài liệu</td><td>URL file PDF/brochure để khách hàng tải. Hiện nút Download trên card sản phẩm</td></tr>
<tr><td>Tags</td><td>Nhãn phân loại bổ sung (ví dụ: off-grid, lithium, 5kWh). Gõ và nhấn Enter để thêm</td></tr>
<tr><td>Sản phẩm liên quan</td><td>Slug của các sản phẩm gợi ý ở cuối trang chi tiết. Gõ slug và nhấn Enter</td></tr>
<tr><td>OG Image (SEO)</td><td>Ảnh hiển thị khi chia sẻ link lên Facebook/Zalo. Nếu trống dùng ảnh đại diện</td></tr>
</table>

<h3>Rich Text Editor — Thanh công cụ soạn thảo</h3>
<table>
<tr><th>Nút</th><th>Chức năng</th><th>Phím tắt</th></tr>
<tr><td><strong>B</strong></td><td>In đậm</td><td>Ctrl+B</td></tr>
<tr><td><em>I</em></td><td>In nghiêng</td><td>Ctrl+I</td></tr>
<tr><td><u>U</u></td><td>Gạch chân</td><td>Ctrl+U</td></tr>
<tr><td>H2 / H3</td><td>Tiêu đề cấp 2 / cấp 3</td><td>—</td></tr>
<tr><td>• List</td><td>Danh sách không thứ tự (bullet)</td><td>—</td></tr>
<tr><td>1. List</td><td>Danh sách có thứ tự (số)</td><td>—</td></tr>
<tr><td>🔗 Link</td><td>Chèn liên kết hyperlink vào văn bản đang chọn</td><td>—</td></tr>
<tr><td>🖼 Ảnh</td><td>Chọn file ảnh từ máy → tự động upload → chèn vào nội dung</td><td>—</td></tr>
<tr><td>≡ Align</td><td>Căn trái / giữa / phải / justify</td><td>—</td></tr>
</table>

<hr/>

<h2>5. Dự Án — <code>/admin/projects</code></h2>
<p>Quản lý toàn bộ dự án thi công của TBSolaro.</p>
<h3>Bảng danh sách</h3>
<table>
<tr><th>Cột</th><th>Mô tả</th></tr>
<tr><td>Dự án</td><td>Ảnh + tên + địa điểm. Nhấn tên để chỉnh sửa</td></tr>
<tr><td>Phân loại</td><td>enterprise / household / community / csr — màu badge khác nhau theo loại</td></tr>
<tr><td>Trạng thái</td><td>draft / published</td></tr>
<tr><td>Cập nhật</td><td>Ngày chỉnh sửa gần nhất</td></tr>
<tr><td>Thao tác</td><td>Sửa / Xóa</td></tr>
</table>

<h3>Tạo / Chỉnh sửa dự án — Cấu trúc tương tự sản phẩm</h3>
<p>Truy cập qua: <code>/admin/projects/new</code> hoặc <code>/admin/projects/[id]/edit</code></p>
<h3>Các trường đặc thù của dự án (ngoài tên, mô tả, nội dung, ảnh tương tự sản phẩm)</h3>
<table>
<tr><th>Trường</th><th>Mô tả</th><th>Ví dụ</th></tr>
<tr><td>Phân loại</td><td>enterprise = Doanh nghiệp; household = Hộ gia đình; community = Cộng đồng; csr = CSR</td><td>enterprise</td></tr>
<tr><td>Địa điểm</td><td>Tỉnh/thành phố nơi lắp đặt</td><td>Bình Dương, Việt Nam</td></tr>
<tr><td>Công suất</td><td>Tổng công suất hệ thống</td><td>500 kWp</td></tr>
<tr><td>Ngày lắp đặt</td><td>Ngày hoàn thành</td><td>2024-03-15</td></tr>
<tr><td>Năm</td><td>Năm thực hiện — hiển thị trên thẻ dự án</td><td>2024</td></tr>
<tr><td>Video URL</td><td>Link YouTube/Vimeo nhúng vào trang chi tiết (tính năng tương lai)</td><td>—</td></tr>
</table>
<p><strong>Lưu ý:</strong> Dự án phân loại <code>csr</code> hiển thị trên trang <strong>Cộng Đồng CSR</strong> (<code>/community</code>), các loại còn lại hiển thị trên trang <strong>Dự Án</strong> (<code>/projects</code>).</p>

<hr/>

<h2>6. Blog / Tin Tức — <code>/admin/blog</code></h2>
<p>Quản lý các bài viết tin tức, thông báo, hướng dẫn đăng trên website.</p>
<h3>Bảng danh sách</h3>
<table>
<tr><th>Cột</th><th>Mô tả</th></tr>
<tr><td>Bài viết</td><td>Ảnh + tiêu đề + tác giả</td></tr>
<tr><td>Tags</td><td>Nhãn phân loại bài viết</td></tr>
<tr><td>Trạng thái</td><td>draft / published — bài draft ẩn hoàn toàn khỏi website</td></tr>
<tr><td>Ngày đăng</td><td>publishedAt — ngày hiển thị trên website (có thể đặt trước)</td></tr>
<tr><td>Thao tác</td><td>Sửa / Xóa</td></tr>
</table>

<h3>Tạo / Chỉnh sửa bài viết</h3>
<p>Truy cập qua: <code>/admin/blog/new</code> hoặc <code>/admin/blog/[id]/edit</code></p>
<h3>Các trường đặc thù của bài viết</h3>
<table>
<tr><th>Trường</th><th>Mô tả</th><th>Lưu ý</th></tr>
<tr><td>Tác giả</td><td>Tên tác giả hiển thị trên bài viết</td><td>Mặc định: Admin</td></tr>
<tr><td>Ngày xuất bản</td><td>Ngày hiển thị trên website — có thể đặt ngày trong tương lai để lên lịch</td><td>Định dạng: YYYY-MM-DD</td></tr>
<tr><td>Tiêu đề *</td><td>Tiêu đề bài viết (3 ngôn ngữ)</td><td>Bắt buộc cho VI</td></tr>
<tr><td>Mô tả ngắn</td><td>Tóm tắt 1-2 câu hiển thị trên card bài viết</td><td>—</td></tr>
<tr><td>Nội dung</td><td>Toàn bộ nội dung bài viết qua Rich Text Editor</td><td>Hỗ trợ đầy đủ định dạng HTML</td></tr>
<tr><td>Tags</td><td>Nhãn phân loại bài viết — nhấn Enter sau mỗi tag</td><td>Ví dụ: năng-lượng-mặt-trời, dự-án-csr</td></tr>
</table>

<hr/>

<h2>7. Cài Đặt Website — <code>/admin/settings</code></h2>
<p>Màn hình quan trọng nhất — điều chỉnh toàn bộ nội dung hình ảnh và thông tin chung của website.</p>
<p>Nhấn nút <strong>Lưu cài đặt</strong> ở đầu hoặc cuối trang để áp dụng thay đổi. Mọi thay đổi chỉ có hiệu lực sau khi nhấn lưu.</p>

<h3>7.1 Thương hiệu (Branding)</h3>
<ul>
<li><strong>Logo website:</strong> Upload logo chính — hiển thị ở Header và Footer. Để trống dùng file logo mặc định (<code>/logo.png</code>). Khuyến nghị logo nền trong suốt (PNG), chiều rộng tối thiểu 200px</li>
</ul>

<h3>7.2 Trang chủ — Hero Slider</h3>
<p>Quản lý banner slideshow ở đầu trang chủ. Có thể thêm nhiều slide, mỗi slide độc lập.</p>
<ul>
<li><strong>Thêm slide mới:</strong> Nhấn nút <strong>+ Thêm slide mới</strong> ở cuối danh sách</li>
<li><strong>Mở rộng/thu gọn slide:</strong> Nhấn vào thanh tiêu đề của slide</li>
<li><strong>Sắp xếp thứ tự:</strong> Nhấn nút ↑ / ↓ trên thanh slide</li>
<li><strong>Xóa slide:</strong> Nhấn icon thùng rác đỏ</li>
</ul>
<p>Mỗi slide gồm:</p>
<table>
<tr><th>Trường</th><th>Mô tả</th></tr>
<tr><td>Hình nền slide</td><td>Ảnh nền toàn màn hình — khuyến nghị 1920×1080px hoặc lớn hơn</td></tr>
<tr><td>Tiêu đề lớn (VI/EN/ES)</td><td>Chuyển tab ngôn ngữ để nhập từng phiên bản</td></tr>
<tr><td>Phụ đề (VI/EN/ES)</td><td>Mô tả ngắn bên dưới tiêu đề chính</td></tr>
</table>

<h3>7.3 Hình nền các trang (Page Hero Backgrounds)</h3>
<p>Ảnh banner đầu mỗi trang con. Để trống dùng ảnh placeholder màu xanh mặc định.</p>
<table>
<tr><th>Trường</th><th>Trang áp dụng</th></tr>
<tr><td>Sản phẩm (Products)</td><td>/products</td></tr>
<tr><td>Dự án (Projects)</td><td>/projects</td></tr>
<tr><td>Giới thiệu (About)</td><td>/about</td></tr>
<tr><td>Liên hệ (Contact)</td><td>/contact</td></tr>
<tr><td>Cộng đồng (Community)</td><td>/community</td></tr>
<tr><td>FAQ</td><td>/faq</td></tr>
<tr><td>Showroom</td><td>/showroom</td></tr>
</table>

<h3>7.4 Hình nền các khối trang chủ</h3>
<p>Mỗi section trên trang chủ có thể có ảnh nền riêng. Để trống dùng màu nền mặc định.</p>
<table>
<tr><th>Trường</th><th>Section trên trang chủ</th></tr>
<tr><td>Khối CSR – Ảnh minh họa</td><td>Section Trách nhiệm xã hội</td></tr>
<tr><td>Khối Sản phẩm – Hình nền</td><td>Section sản phẩm nổi bật</td></tr>
<tr><td>Khối Thống kê – Hình nền</td><td>Section số liệu (dự án, khách hàng...)</td></tr>
<tr><td>Khối Testimonial – Hình nền</td><td>Section đánh giá khách hàng</td></tr>
<tr><td>Khối Tin tức – Hình nền</td><td>Section bài viết mới nhất</td></tr>
<tr><td>Khối Liên hệ – Hình nền</td><td>Section form liên hệ cuối trang</td></tr>
</table>

<h3>7.5 Sustainability Banner</h3>
<ul>
<li><strong>Hình nền banner:</strong> Ảnh nền dải banner "Năng lượng bền vững" cuối mỗi trang</li>
</ul>

<h3>7.6 Tiêu đề các Section</h3>
<p>Ghi đè tiêu đề và phụ đề của các khối nội dung trên từng trang. Có tabs VI / EN / ES để nhập từng ngôn ngữ. <strong>Để trống</strong> sẽ dùng nội dung mặc định từ file dịch thuật.</p>
<table>
<tr><th>Trang</th><th>Các trường có thể ghi đè</th></tr>
<tr><td>🏠 Trang chủ</td><td>Chứng nhận, CSR badge/tiêu đề/mô tả, Sản phẩm, Thống kê, Testimonial, Tin tức</td></tr>
<tr><td>📦 Sản phẩm</td><td>Combo nổi bật (tiêu đề + phụ đề), Tất cả sản phẩm</td></tr>
<tr><td>🏗️ Dự án</td><td>Quy mô triển khai (tiêu đề + phụ đề)</td></tr>
<tr><td>🏢 Giới thiệu</td><td>Lịch sử, Tại sao chọn, Quy trình, Đối tác</td></tr>
</table>

<h3>7.7 Thông tin Footer</h3>
<table>
<tr><th>Trường</th><th>Hiển thị ở</th></tr>
<tr><td>Số điện thoại</td><td>Footer + trang Liên hệ</td></tr>
<tr><td>Email</td><td>Footer + trang Liên hệ</td></tr>
<tr><td>Facebook URL</td><td>Icon mạng xã hội trên Footer</td></tr>
<tr><td>YouTube URL</td><td>Icon mạng xã hội trên Footer</td></tr>
<tr><td>Địa chỉ</td><td>Footer + trang Liên hệ</td></tr>
</table>

<hr/>

<h2>8. Quản Lý Người Dùng — <code>/admin/users</code></h2>
<p>Quản lý tài khoản có quyền truy cập khu vực admin.</p>
<h3>Bảng danh sách</h3>
<table>
<tr><th>Cột</th><th>Mô tả</th></tr>
<tr><td>Người dùng</td><td>Tên + email</td></tr>
<tr><td>Vai trò</td><td>admin hoặc superadmin — superadmin có toàn quyền</td></tr>
<tr><td>Trạng thái</td><td>active (có thể đăng nhập) / inactive (bị khóa)</td></tr>
<tr><td>Thao tác</td><td>Đổi mật khẩu / Vô hiệu hóa / Kích hoạt</td></tr>
</table>
<h3>Thêm người dùng mới</h3>
<p>Nhấn <strong>+ Thêm người dùng</strong> → điền tên, email, mật khẩu → xác nhận. Người dùng mới có vai trò <code>admin</code> mặc định.</p>
<h3>Đổi mật khẩu</h3>
<p>Nhấn icon chìa khóa → nhập mật khẩu mới → xác nhận. Mật khẩu được mã hóa an toàn (bcrypt).</p>
<h3>Lưu ý quan trọng</h3>
<ul>
<li>Không thể xóa hoặc vô hiệu hóa tài khoản <code>superadmin</code> duy nhất</li>
<li>Mật khẩu phải tối thiểu 8 ký tự</li>
<li>Thay đổi mật khẩu định kỳ 3-6 tháng để đảm bảo bảo mật</li>
</ul>

<hr/>

<h2>9. Wiki — <code>/admin/wiki</code></h2>
<p>Hệ thống tài liệu nội bộ — lưu trữ hướng dẫn, quy trình vận hành và tài liệu kỹ thuật.</p>
<h3>Danh sách trang Wiki</h3>
<table>
<tr><th>Cột</th><th>Mô tả</th></tr>
<tr><td>Tiêu đề</td><td>Tên trang — nhấn để xem nội dung chi tiết</td></tr>
<tr><td>Slug</td><td>Định danh URL trang</td></tr>
<tr><td>Loại</td><td>Badge tím = Hệ thống (không thể xóa); Badge xám = Tùy chỉnh</td></tr>
<tr><td>Cập nhật</td><td>Ngày chỉnh sửa gần nhất</td></tr>
<tr><td>Thao tác</td><td>Xem (mắt) / Chỉnh sửa (bút chì) / Xóa (chỉ trang tùy chỉnh)</td></tr>
</table>
<h3>Trang hệ thống (System pages)</h3>
<p>Được tự động tạo lần đầu và không thể xóa:</p>
<ul>
<li><strong>API Reference:</strong> Tài liệu kỹ thuật về External REST API của TBSolaro</li>
<li><strong>Hướng Dẫn Xây Dựng Website:</strong> Hướng dẫn từ A-Z để xây một website doanh nghiệp tương tự</li>
<li><strong>Hướng Dẫn Admin CMS:</strong> Tài liệu này — mô tả từng màn hình admin</li>
</ul>
<h3>Xem nội dung trang Wiki</h3>
<p>Nhấn tiêu đề hoặc icon mắt → trang hiển thị nội dung với định dạng đầy đủ (heading, bảng, code blocks, v.v.)</p>
<h3>Chỉnh sửa trang Wiki</h3>
<p>Nhấn icon bút chì → editor gồm:</p>
<ul>
<li><strong>Tiêu đề:</strong> Tên trang wiki</li>
<li><strong>Nội dung:</strong> Rich text editor (thanh công cụ đầy đủ)</li>
<li><strong>Slug:</strong> Bị khóa cho trang hệ thống; có thể sửa cho trang tùy chỉnh</li>
<li><strong>Thứ tự:</strong> Số thứ tự trong danh sách (số nhỏ hiển thị trước)</li>
</ul>
<h3>Tạo trang Wiki mới</h3>
<p>Nhấn <strong>+ Tạo trang mới</strong> → điền tiêu đề, slug, nội dung → Lưu.</p>

<hr/>

<h2>10. API Keys — <code>/admin/api-keys</code></h2>
<p>Quản lý khóa xác thực cho External API — dùng khi tích hợp dữ liệu website vào hệ thống bên ngoài (ERP, app mobile, v.v.).</p>
<h3>Bảng danh sách API Keys</h3>
<table>
<tr><th>Cột</th><th>Mô tả</th></tr>
<tr><td>Tên</td><td>Nhãn ghi nhớ mục đích của key (ví dụ: Mobile App, ERP Integration)</td></tr>
<tr><td>Key</td><td>Chuỗi bắt đầu bằng <code>tbsk_</code> — chỉ hiển thị đầy đủ khi vừa tạo</td></tr>
<tr><td>Quyền hạn</td><td>read (chỉ đọc) / write (đọc + ghi) / all (toàn quyền kể cả xóa)</td></tr>
<tr><td>Trạng thái</td><td>active / revoked</td></tr>
<tr><td>Sử dụng lần cuối</td><td>Lần cuối key này được dùng để gọi API</td></tr>
</table>
<h3>Tạo API Key mới</h3>
<p>Nhấn <strong>+ Tạo API Key</strong> → chọn tên và quyền hạn. Key được hiển thị <strong>một lần duy nhất</strong> khi tạo — hãy sao chép và lưu trữ an toàn ngay lập tức. Không thể xem lại sau khi đóng hộp thoại.</p>
<h3>Thu hồi Key</h3>
<p>Nhấn <strong>Thu hồi</strong> → key bị vô hiệu hóa ngay lập tức. Dùng khi nghi ngờ key bị lộ.</p>
<h3>Sử dụng API Key</h3>
<pre><code>GET /api/v1/products
Authorization: Bearer tbsk_your_key_here</code></pre>
<p>Chi tiết đầy đủ về API xem tại trang Wiki: <strong>API Reference</strong>.</p>

<hr/>

<h2>11. Liên Hệ / Form Submissions — <code>/admin/submissions</code></h2>
<p>Xem và quản lý tất cả yêu cầu liên hệ từ khách hàng gửi qua form trên website.</p>
<h3>Bảng danh sách</h3>
<table>
<tr><th>Cột</th><th>Mô tả</th></tr>
<tr><td>Khách hàng</td><td>Tên + email người gửi</td></tr>
<tr><td>Điện thoại</td><td>Số điện thoại liên hệ</td></tr>
<tr><td>Nguồn</td><td>Trang website khách hàng gửi form (trang chủ, trang blog, trang sản phẩm, v.v.)</td></tr>
<tr><td>Nội dung</td><td>Tin nhắn / yêu cầu của khách</td></tr>
<tr><td>Trạng thái</td><td>new = Mới chưa xử lý; read = Đã xem; done = Đã xử lý xong</td></tr>
<tr><td>Ngày gửi</td><td>Thời điểm khách gửi form</td></tr>
</table>
<h3>Xử lý submission</h3>
<p>Nhấn vào hàng để xem chi tiết nội dung → thay đổi trạng thái sang <strong>read</strong> hoặc <strong>done</strong> để theo dõi tiến độ xử lý.</p>

<hr/>

<h2>12. FAQ — <code>/admin/faq</code></h2>
<p>Quản lý danh sách câu hỏi thường gặp hiển thị trên trang <code>/faq</code>.</p>
<h3>Thêm câu hỏi mới</h3>
<p>Nhấn <strong>+ Thêm câu hỏi</strong> → điền câu hỏi và câu trả lời (cả 3 ngôn ngữ VI/EN/ES) → Lưu.</p>
<h3>Sắp xếp thứ tự</h3>
<p>Câu hỏi có trường <strong>Thứ tự</strong> (sortOrder) — số nhỏ hiển thị trước. Thay đổi số để sắp xếp lại.</p>
<h3>Nhóm FAQ</h3>
<p>Có thể nhóm câu hỏi theo danh mục (category) — ví dụ: Kỹ thuật, Giá cả, Bảo hành, Chính sách.</p>

<hr/>

<h2>13. Tài Liệu Tải Về — <code>/admin/downloads</code></h2>
<p>Quản lý tài liệu kỹ thuật, brochure, catalog cho phép khách hàng tải.</p>
<h3>Thêm tài liệu</h3>
<p>Nhấn <strong>+ Thêm tài liệu</strong> → điền tiêu đề, chọn file PDF → Upload → Lưu. File được lưu trên cloud và khách hàng có thể tải trực tiếp.</p>
<h3>Phân loại</h3>
<p>Mỗi tài liệu có trường <strong>Loại</strong> (brochure / catalog / manual / certificate / other) để phân nhóm trên trang tải về.</p>

<hr/>

<h2>14. Showroom — <code>/admin/showrooms</code></h2>
<p>Quản lý danh sách địa điểm showroom / văn phòng để hiển thị trên trang <code>/showroom</code> và bản đồ liên hệ.</p>
<h3>Các trường</h3>
<table>
<tr><th>Trường</th><th>Mô tả</th></tr>
<tr><td>Tên showroom</td><td>Tên hiển thị — ví dụ: Văn phòng Hà Nội</td></tr>
<tr><td>Địa chỉ</td><td>Địa chỉ đầy đủ</td></tr>
<tr><td>Tỉnh/Thành phố</td><td>Dùng để nhóm theo khu vực</td></tr>
<tr><td>Điện thoại</td><td>Số điện thoại riêng của showroom</td></tr>
<tr><td>Giờ mở cửa</td><td>Ví dụ: T2-T7: 8:00 - 17:00</td></tr>
<tr><td>Google Maps Link</td><td>URL Google Maps — tạo bằng cách nhấn "Share" trên Google Maps và copy link</td></tr>
<tr><td>Ảnh showroom</td><td>Ảnh ngoại thất / nội thất</td></tr>
</table>

<hr/>

<h2>15. Giới Thiệu (About) — <code>/admin/about</code></h2>
<p>Quản lý nội dung trang Giới thiệu (<code>/about</code>) — lịch sử công ty, sứ mệnh, đội ngũ.</p>
<h3>Các section có thể chỉnh sửa</h3>
<ul>
<li><strong>Timeline lịch sử:</strong> Thêm/sửa/xóa các mốc thời gian phát triển của công ty (năm, tiêu đề, mô tả — 3 ngôn ngữ)</li>
<li><strong>Tại sao chọn TBSolaro:</strong> 4-6 điểm mạnh với icon emoji, tiêu đề và mô tả</li>
<li><strong>Quy trình làm việc:</strong> Các bước từ tư vấn đến bàn giao, mỗi bước có số thứ tự, tiêu đề và mô tả</li>
<li><strong>Đối tác:</strong> Nội dung HTML tự do — có thể chèn logo đối tác, tên công ty chứng nhận</li>
</ul>
<p><strong>Lưu ý:</strong> Tiêu đề của từng section (ví dụ: "Lịch sử hình thành", "Tại sao chọn chúng tôi") có thể ghi đè tại <strong>Cài đặt → Tiêu đề các Section → Trang Giới thiệu</strong>.</p>

<hr/>

<h2>Phím Tắt Và Lưu Ý Chung</h2>
<h3>Quy tắc slug</h3>
<ul>
<li>Chỉ dùng chữ thường a-z, số 0-9 và dấu gạch ngang <code>-</code></li>
<li>Không dấu tiếng Việt, không khoảng trắng, không ký tự đặc biệt</li>
<li>Ví dụ đúng: <code>combo-pin-5kwh-gia-dinh</code></li>
<li>Ví dụ sai: <code>Combo Điện 5kWh!</code></li>
<li><strong>Không thể đổi slug sau khi đã xuất bản</strong> — URL cũ sẽ bị 404 nếu thay đổi slug</li>
</ul>
<h3>Luồng làm việc khuyến nghị</h3>
<ol>
<li>Tạo nội dung mới với trạng thái <strong>Draft</strong></li>
<li>Xem trước trên staging (tbsolaro-staging.vercel.app) qua tab ẩn danh</li>
<li>Điều chỉnh nội dung và ảnh nếu cần</li>
<li>Nhấn <strong>Xuất bản</strong> khi nội dung hoàn thiện</li>
</ol>
<h3>Upload ảnh — lưu ý</h3>
<ul>
<li>Định dạng hỗ trợ: JPG, PNG, WebP, GIF</li>
<li>Kích thước khuyến nghị: ảnh đại diện 1200×630px, gallery 1600×900px</li>
<li>Nén ảnh trước khi upload tại <strong>squoosh.app</strong> để tăng tốc website</li>
<li>Ảnh tự động upload lên Vercel Blob — không cần quản lý thủ công</li>
</ul>
<h3>Khi gặp sự cố</h3>
<ul>
<li><strong>Không thể lưu:</strong> Kiểm tra các trường bắt buộc (*) đã điền đầy đủ chưa</li>
<li><strong>Ảnh không upload:</strong> Kiểm tra dung lượng file (tối đa 4.5MB), thử nén trước</li>
<li><strong>Nội dung không cập nhật trên website:</strong> Nhấn Ctrl+Shift+R để xóa cache trình duyệt</li>
<li><strong>Lỗi kỹ thuật bất thường:</strong> Chụp ảnh màn hình lỗi và liên hệ nhà phát triển với kèm thông tin URL đang thực hiện và thao tác đã làm</li>
</ul>`;

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let pages = await prisma.wikiPage.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] });

  // Ensure all system pages exist
  const existingSlugs = new Set(pages.map((p: { slug: string }) => p.slug));
  const systemPages = [
    { slug: 'api-reference', title: 'API Reference', content: API_DOCS_CONTENT, sortOrder: 0, isSystem: true },
    { slug: 'huong-dan-xay-dung-web', title: 'Hướng Dẫn Xây Dựng Website', content: GUIDE_CONTENT, sortOrder: 1, isSystem: true },
    { slug: 'huong-dan-su-dung-admin', title: 'Hướng Dẫn Sử Dụng Admin CMS', content: ADMIN_GUIDE_CONTENT, sortOrder: 2, isSystem: true },
  ];

  let seeded = false;
  for (const page of systemPages) {
    await prisma.wikiPage.upsert({
      where: { slug: page.slug },
      create: page,
      update: { title: page.title, content: page.content, sortOrder: page.sortOrder },
    });
    seeded = true;
  }

  if (seeded) {
    pages = await prisma.wikiPage.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] });
  }

  return NextResponse.json(pages);
}

export async function POST(req: Request) {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { title, slug, content, sortOrder } = await req.json();
  if (!title || !slug) return NextResponse.json({ error: 'title and slug are required.' }, { status: 400 });
  const existing = await prisma.wikiPage.findUnique({ where: { slug } });
  if (existing) return NextResponse.json({ error: 'Slug already exists.' }, { status: 409 });
  const page = await prisma.wikiPage.create({ data: { title, slug, content: content || '', sortOrder: sortOrder || 0 } });
  return NextResponse.json(page, { status: 201 });
}
