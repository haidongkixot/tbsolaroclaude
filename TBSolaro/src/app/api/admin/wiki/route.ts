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

export async function GET() {
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let pages = await prisma.wikiPage.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] });

  // Auto-seed the API docs page if wiki is empty
  if (pages.length === 0) {
    await prisma.wikiPage.create({
      data: {
        slug: 'api-reference',
        title: 'API Reference',
        content: API_DOCS_CONTENT,
        sortOrder: 0,
        isSystem: true,
      },
    });
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
