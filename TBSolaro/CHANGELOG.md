# TBSolaro — Changelog

## 2026-08-05 (b) — Toggle scope extended to About; CSR Community removed

Follow-up to the change below, fixing two things it got wrong.

### 1. Both toggles now cover the whole About page

The first pass only hid the *Production Process* block on About and the *Certifications*
strip on the homepage. Two related blocks on the About page were left behind.

**`src/app/[locale]/(frontend)/about/page.tsx`**

- The **Process Gallery** section (heading `about.galleryTitle`, the four `Process N`
  images) is part of the process story, so it is now wrapped in `{settings.showProcess && …}`
  alongside the process steps. Turning Process off hides both.
- The **Partners & certification bodies** strip (heading `about.partnersTitle`,
  "Đối tác & Đơn vị chứng nhận") is now wrapped in `{settings.showCertifications && …}`.
  Since that toggle defaults to off, this strip is hidden by default — matching the
  homepage certification strip.

No new settings were added: the two existing toggles simply cover more ground. The
`aboutPartners` field and the process step editor in Admin › Về chúng tôi are untouched.

### 2. CSR Community removed

The `/community` page ("CSR Community" in the menu) was removed along with every link to it.

**Deleted:** `src/app/[locale]/(frontend)/community/page.tsx`.

**Links removed:**

| Where | Was |
|---|---|
| `src/components/layout/Header.tsx` | `community` entry in `navItems` (desktop + mobile) |
| `src/lib/data/settings.ts` | `footerQuickLinks` "CSR & Cộng đồng" entry, and the unused `mainNav` entry |
| `src/app/sitemap.ts` | `/community` in `staticPages` |
| `src/app/[locale]/(frontend)/page.tsx` | the whole **CSR Highlight** block (its only action pointed at /community) |
| `src/app/[locale]/(frontend)/projects/page.tsx` | the "Explore more CSR projects" button under the CSR category |
| `src/components/sections/SustainabilityBanner.tsx` | default `ctaHref` changed from `/community` to `/projects` |

**Footer label alignment — important detail.** `Footer.tsx` pairs `footerQuickLinks` with
translation keys *by array index*. Dropping the 4th link would have shifted every label
after it, so `quickLinkKeys` was changed from
`['quickLink1' … 'quickLink5']` to `['quickLink1', 'quickLink2', 'quickLink3', 'quickLink5']`
— skipping `quickLink4` ("CSR & Community") so `/blog` keeps its correct "News & Media"
caption. The two lists must stay the same length.

**Unused imports** `ArrowRight` and `Link` were removed from `projects/page.tsx`, which no
longer links anywhere. The homepage still uses both.

**Admin wiki corrected.** Two lines in the seeded documentation
(`src/app/api/admin/wiki/route.ts`) still told editors that `csr` projects appear on
`/community`; they now say all categories render on `/projects`, and `/community` was
dropped from the site-map table. Note this only affects freshly seeded wiki pages — an
existing wiki row in the database keeps its old text.

**Left in place on purpose:** the `community` *project category* (still selectable in the
project editor, still shown as a card badge), the `community` translation namespace, the
`nav.community` / `footer.quickLink4` keys, and the `community` entry in `src/lib/seo.ts`.
None of them are reachable now, and removing them would be deleting content for no gain.

---

## 2026-08-05 (a) — Section visibility toggles & catalog layout changes

Five frontend changes, all built so that **no admin content is deleted**. Every section
that is now hidden keeps its data in the database and its editor in the admin panel;
hiding is purely a display decision that can be reversed from Admin with one click.

---

### Summary

| # | Change | Controlled from | Default |
|---|--------|-----------------|---------|
| 1 | Show/hide Showroom | Admin › Cài đặt › Hiển thị các khối nội dung | **Shown** |
| 2 | CSR merged into the Projects list | — (layout change) | n/a |
| 3 | Products page opens on the "Panels" category | — (code constant) | `panel` |
| 4 | Show/hide the Production Process section | Admin › Cài đặt › Hiển thị các khối nội dung | **Shown** |
| 5 | Hide the Certifications strip | Admin › Cài đặt › Hiển thị các khối nội dung | **Hidden** |

---

### New: section visibility system

Three boolean columns were added to the `SiteSetting` singleton, plus a new
**"👁 Hiển thị các khối nội dung (Section Visibility)"** panel in Admin › Cài đặt
(placed directly under *Thương hiệu*).

**`prisma/schema.prisma`** — `model SiteSetting`

```prisma
// Frontend section visibility toggles (content is always kept in the DB — these only control display)
showShowroom       Boolean @default(true)   // Showroom nav item + /showroom page
showProcess        Boolean @default(true)   // About page "Quy trình sản xuất" section
showCertifications Boolean @default(false)  // Homepage "Chứng nhận & Đối tác" strip
```

**`src/lib/db/settings.ts`** — added the three fields to the `SiteSettings` type, to the
`defaults` object, and to the row mapping in `getSiteSettings()`. The mapping uses
`row.showShowroom ?? defaults.showShowroom` so a settings row created before these
columns existed still renders instead of throwing.

**`src/app/admin/settings/page.tsx`** — added the three fields to the `Form` type and to
`empty`; added a `setBool()` setter alongside the existing string-only `set()`; added a
`<Toggle>` presentational component (checkbox + label + hint + an "Đang hiện/Đang ẩn"
status pill); and hardened the settings fetch so an older row falls back to the defaults
rather than being spread in as `undefined`.

No API change was needed — `PUT /api/admin/settings` spreads the whole body into a Prisma
`upsert`, so the new booleans save automatically.

---

### 1. Showroom show/hide

One switch removes Showroom from the public site entirely. **The admin side is untouched** —
Admin › Showroom still lists and edits showroom records, and the showroom hero image field
stays in settings.

- **`src/components/layout/Header.tsx`** — `Header` now accepts `showShowroom?: boolean`
  (defaults to `true`). A derived `visibleNavItems` filters the `showroom` entry out of the
  `navItems` array; both the desktop nav and the mobile menu now map over `visibleNavItems`
  instead of `navItems`.
- **`src/app/[locale]/(frontend)/layout.tsx`** — passes `showShowroom={settings.showShowroom}`
  into `<Header>`.
- **`src/app/[locale]/(frontend)/showroom/page.tsx`** — calls `notFound()` when the toggle is
  off, so a direct URL returns the standard 404 page. `generateMetadata` additionally returns
  `robots: { index: false, follow: false }` while hidden, so search engines drop the page
  instead of indexing a 404.
- **`src/app/sitemap.ts`** — now awaits `getSiteSettings()` and includes `/showroom` in
  `staticPages` only while the toggle is on.

`POST /api/showroom-booking` was deliberately left reachable — turning the section back on
must not require any other change.

---

### 2. CSR merged into the Projects section

The standalone CSR band on the Projects page was removed and CSR now appears as a normal
category heading inside the existing by-category list, alongside Enterprise / Household /
Community.

**`src/app/[locale]/(frontend)/projects/page.tsx`**

- Deleted the separate `<section className="py-16 md:py-20 bg-brand-surface">` block that sat
  between the projects list and the contact form.
- Added a fourth block inside the existing `<div className="space-y-12">` list, rendered
  under a `🤝 {t('csrTitle')}` heading with `{t('csrSubtitle')}` beneath it, guarded by
  `csrProjects.length > 0` exactly like the other three categories.
- Cards switched from `variant="csr"` to `variant="horizontal"` so CSR matches the visual
  rhythm of the sibling categories.
- The "view community projects" link was kept, restyled from `btn-primary` to
  `btn-outline text-sm` so it reads as a sub-action of the category rather than a page-level CTA.

Nothing else changed: the `csr` category still exists in `Project.category`, in the admin
project editor dropdown, in the `projectCard.csr` translations, and in `getCSRProjects()`.
The `projects.csrTitle` / `csrSubtitle` / `csrBtn` translation keys are all still in use.

> The homepage "CSR Highlight" promo card is a **separate** block and was left untouched.

---

### 3. Products page defaults to the "Panels" category

The category filter on the products page was previously **decorative** — five buttons with no
`onClick`, no state and no href, mapped over translated label strings, so the grid always
showed every published product. It is now a working filter that opens on Panels.

- **New file `src/app/[locale]/(frontend)/products/_components/ProductFilterGrid.tsx`** — a
  client component holding the selected category in `useState`, rendering the heading row,
  the filter pills and the product grid. The active pill is styled `bg-brand text-white` and
  carries `aria-pressed`. Filtering is done in memory over the already-fetched list, so no
  extra query, no `searchParams`, and no change to how the page is rendered or cached.
- **`src/app/[locale]/(frontend)/products/page.tsx`** — added a `PRODUCT_CATEGORIES` constant
  mapping category key → translation key, and a `DEFAULT_PRODUCT_CATEGORY = 'panel'` constant.
  The inline heading/filter/grid markup was replaced by `<ProductFilterGrid />`.

**Safety guard:** if no published product currently uses the `panel` category, the component
silently opens on **All** instead, so the page can never load an empty grid because of the
default. Once panel products are published, the default takes effect automatically.

> The category key is `panel` (singular) — that is the value the admin product editor writes.
> The English label for it is already "Panels" (`products.filterPanel`), which is what the
> button displays.

**New translation key** `products.noProductsMsg`, added to all three catalogs, shown when a
category has no products:

| Locale | Value |
|---|---|
| `messages/vi.json` | Chưa có sản phẩm nào trong danh mục này. |
| `messages/en.json` | No products in this category yet. |
| `messages/es.json` | Aún no hay productos en esta categoría. |

---

### 4. Production Process show/hide

**`src/app/[locale]/(frontend)/about/page.tsx`** — the "Quy trình sản xuất" section is now
wrapped in `{settings.showProcess && ( … )}`. Nothing inside it changed.

The step content still lives in `SiteSetting.aboutProcess` and is still fully editable in
**Admin › Về chúng tôi › ⚙️ Quy trình sản xuất**, and the `processTitle` / `processSubtitle`
overrides remain in Admin › Cài đặt › Section Titles. The Gallery section that follows it is
independent and still always renders.

---

### 5. Certifications hidden on the frontend

**`src/app/[locale]/(frontend)/page.tsx`** — the homepage certifications strip
(heading "Chứng nhận & Đối tác", directly below the hero) is now wrapped in
`{settings.showCertifications && ( … )}`, and that toggle **defaults to `false`**, so the
section is hidden as requested.

The `certifications` array and the whole section markup were left in the file, and the
`home.certTitle` translations plus the Admin › Cài đặt › "Chứng nhận — tiêu đề" override field
were all kept. Ticking the switch restores the section exactly as it was.

> The About page "Đối tác & Đơn vị chứng nhận" strip is a **different** block (driven by
> `aboutPartners`) and was left visible.

---

### Files changed

| File | Change |
|---|---|
| `prisma/schema.prisma` | +3 boolean columns on `SiteSetting` |
| `src/lib/db/settings.ts` | +3 fields in type, defaults and row mapping |
| `src/app/admin/settings/page.tsx` | +visibility panel, `setBool()`, `<Toggle>` component |
| `src/components/layout/Header.tsx` | `showShowroom` prop, `visibleNavItems` |
| `src/app/[locale]/(frontend)/layout.tsx` | pass `showShowroom` to `Header` |
| `src/app/[locale]/(frontend)/showroom/page.tsx` | `notFound()` + `noindex` when hidden |
| `src/app/sitemap.ts` | conditional `/showroom` entry |
| `src/app/[locale]/(frontend)/page.tsx` | certifications wrapped in toggle |
| `src/app/[locale]/(frontend)/about/page.tsx` | process wrapped in toggle |
| `src/app/[locale]/(frontend)/projects/page.tsx` | CSR band → category block |
| `src/app/[locale]/(frontend)/products/page.tsx` | uses `ProductFilterGrid`, default `panel` |
| `src/app/[locale]/(frontend)/products/_components/ProductFilterGrid.tsx` | **new** |
| `messages/{vi,en,es}.json` | +`products.noProductsMsg` |

### Compatibility notes

- **No content was deleted** — no Prisma model, column, translation key or admin editor was
  removed. Every change is additive or a conditional wrapper.
- **No API contract changed.** `/api/products`, `/api/projects`, `/api/v1/*` and
  `/api/admin/settings` all behave exactly as before; the settings endpoint picks up the new
  booleans automatically because it spreads the request body.
- **The three new columns are created on deploy.** `npm run build` runs
  `prisma db push --accept-data-loss` before `next build`, so Vercel adds the columns to the
  staging and production Neon branches during the next deployment. Adding columns that have
  defaults is non-destructive to existing rows.
- Existing settings rows created before this change read as the schema defaults
  (showroom on, process on, certifications off), which is the intended starting state.

### Verification status

- `npx tsc --noEmit` — passes, no errors.
- `npx next lint` — no new warnings (only the pre-existing `<img>`/alt-text warnings).
- **Not run:** the app was not started and the schema was not pushed, because no database is
  reachable from this machine (`.env` points at the stale `file:./dev.db` and `.env.local`'s
  Neon URL does not resolve here). Behaviour needs to be confirmed on staging after deploy.

### Post-deploy checklist

1. Homepage: certifications strip is gone; CSR highlight card still present.
2. `/products`: opens with the **Panels** pill active; clicking each pill filters; "All" shows
   everything. Check in `vi`, `en` and `es`.
3. `/projects`: no green CSR band at the bottom; CSR appears as a heading in the category list.
4. `/about`: process section visible (default on).
5. Admin › Cài đặt › Hiển thị các khối nội dung: toggle each switch off, save, reload the
   matching public page and confirm it hides; toggle back on and confirm it returns.
6. Turn Showroom off → the header nav loses Showroom, `/showroom` 404s, and `/sitemap.xml` no
   longer lists it. Admin › Showroom still works.
