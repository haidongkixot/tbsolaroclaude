# TBSolaro — Changelog

## 2026-08-18 (f) — Product tabs (Details / Packaging / Shipping) editable & trilingual

The three tabs on the product detail page were only partly real: *Product Details* showed
the (editable, trilingual) specs table, but **Packaging and Shipping were hardcoded
Vietnamese strings** in `ProductDetailClient.tsx` — the same text on every product, in every
language, with no way to change them from the admin.

All three tabs are now backed by per-language rich-text fields on the product.

- **`prisma/schema.prisma`** — 9 new columns on `Product`: `detailsVi/En/Es`,
  `packagingVi/En/Es`, `shippingVi/En/Es` (HTML, `@default("")`). Created on deploy by
  `prisma db push`; additive and safe for existing rows.
- **`src/lib/db/products.ts`** — `localize()` now returns `details`, `packaging`,
  `shipping` via `pickHtml()`, so an untranslated EN/ES field falls back to Vietnamese
  (and TipTap's empty `<p></p>` counts as untranslated).
- **`ProductDetailClient.tsx`** — *Details* tab renders the rich text above the specs
  table; *Packaging*/*Shipping* render their fields. When a field is empty in every
  language the old text still appears, but now localized via new message keys
  `products.packagingFallback` / `products.shippingFallback` (vi/en/es) instead of
  hardcoded Vietnamese.
- **`ProductEditor.tsx`** — new "Nội dung các tab" card with three rich-text editors,
  following the language tabs. All three language instances stay mounted (TipTap does not
  re-sync `value` on tab switch) and are shown/hidden per the selected tab.

No API changes needed — admin and v1 routes spread the request body. Existing products are
unaffected until content is entered: the tabs look exactly as before thanks to the
localized fallbacks.

---

## 2026-08-18 (e) — Production product-data cleanup (data-only, no code)

A row-by-row audit of the 21 production products confirmed **no deploy ever deleted or
overwrote product data** (no `updatedAt` falls on a deploy date; admin-edited titles on the
seeded slugs survived intact). The following pre-existing data-entry issues were fixed
directly in the production database via script:

| Fix | Detail |
|---|---|
| Broken slug | `split-phase-off-grid-inverter 8~12KW` (space + `~`) → `split-phase-off-grid-inverter-8-12kw` |
| Crossed slugs | `solax-x3---mega-g2-lv` (content = X1-SMART G2) → `solax-x1-smart-g2`; `solax-x3-forth-lv` (content = X3 MEGA-G2-LV) → `solax-x3-mega-g2-lv`. No `relatedSlugs` referenced the old values. |
| Brand typo | "SolarX X3-FORTH PLUS" → "SolaX X3-FORTH PLUS" (title only; slug kept to preserve the URL) |
| Contradictory title | SR Series row whose subtitle says "Three Phase" but title said "Split-Phase" → "Off-Grid Inverter – SR Series (Three Phase)". Also disambiguates it from the Single/Split Phase row, which had an identical title. |
| VI/EN feature mismatches | `combo-5kw-cao-cap-bat15`: VI said 5 kWh battery, EN + title (BAT15) say 15 kWh → VI corrected. `combo-5kw-cao-cap-bat10`: EN/ES said 8 panels, VI says 10 (consistent with the cao cấp pattern) → EN/ES corrected. |
| Missing specs/tiers | 6 combos had no specs and no tiers in any language. Generated for vi/en/es, **derived strictly from each combo's own features list** (inverter kW, panel count × wattage, battery count × kWh): a specs table plus a single "Tiêu chuẩn/Standard/Estándar" tier. All 9 combos now complete. |
| Whitespace | Trimmed stray leading/trailing spaces in titles/subtitles on 8 rows. |

Notes: the three renamed slugs mean their old URLs now 404 — the sitemap regenerates
automatically. What was **not** touched: the two Split-Phase rows and two SR Series rows are
genuine variants (distinct subtitles/images/features), not duplicates, and were left as
separate products.

---

## 2026-08-05 (d) — Data-loss fixes, blank EN/ES pages, and 20 new FAQs

Investigation of "several data did not show properly" found three separate problems.

### 1. The seed was destroying admin content on every deploy

`build` runs `prisma generate && prisma db push --accept-data-loss && tsx prisma/seed.ts && next build`,
so the seed is **not** a one-time bootstrap — it re-executes against live production data on
every deploy. Three of its writes were destructive:

| Table | Old behaviour | Effect |
|---|---|---|
| `FAQ` | `deleteMany()` then recreate | **Every FAQ wiped**, including ones added or edited in the admin |
| `Project` | upsert `update:` branch rewrote `titleEn/Es`, `excerptEn/Es`, `contentVi/En/Es` | Admin edits on the 3 seeded slugs reverted |
| `BlogPost` | same, plus `slugEn`/`slugEs` | Admin edits on seeded posts reverted |

All three now create-if-missing and never touch an existing row (`update: {}`, and a
`count()` guard for FAQ). Products were already safe (`update: {}`), as were Downloads and
Testimonials. `SiteSetting` is never touched by the seed.

This was a pre-existing bug, but the three production deploys on 2026-08-05
(13:14, 14:19, 14:36 +07:00) each triggered it. Recovering the lost FAQ rows and the
overwritten project/blog translations requires a Neon point-in-time branch from before
13:10 +07:00 — it cannot be done from the codebase.

### 2. EN/ES pages rendered blank where a translation was never filled in

The language fallback used `row[field + lang] || row[field + 'Vi']`, which only works when an
untranslated column holds `""`. Two kinds of column never do:

- `Product.featuresEn/Es`, `specsEn/Es` and `tiersEn/Es` default to the literal strings
  `"[]"` / `"{}"`, and `ProductEditor.handleSave` writes all three languages on every save.
  An untranslated field therefore holds `"[]"` — truthy — so the fallback never fired and the
  EN/ES product pages showed an empty feature list, empty spec table and **empty combo
  tiers**, even though the Vietnamese content was intact all along.
- TipTap serialises an empty document to `"<p></p>"`, so opening the EN tab of a project or
  blog editor and saving stored `"<p></p>"` in `contentEn`, blanking that article body.

New `src/lib/db/lang.ts` exports `pickJson()` and `pickHtml()`, which treat `"[]"`, `"{}"`,
`"null"` and the empty-TipTap variants as absent and fall back to Vietnamese. Applied to
product features/specs/tiers and to project and blog content. **No data was lost to this** —
the affected pages populate as soon as it deploys.

### 3. Twenty new trilingual FAQs

The 8 seeded FAQs included 4 with broken Vietnamese questions (two of them near-duplicates)
and one whose EN/ES answers discussed selling power to EVN and did not match its question.

`prisma/faq-data.ts` is now the single source of truth, exporting `FAQ_SEED` with 20 entries
in vi/en/es across 8 categories: Sản phẩm & Giải pháp (4), Kỹ thuật (5), Lắp đặt (3),
Chi phí & Giá cả (2), Bảo hành & Dịch vụ (2), Vận hành & Bảo trì (2), Tài chính (1),
Chính sách & Pháp lý (1). Answers avoid quoting prices or promising figures that vary by
site, directing readers to a free consultation instead; the only hard number used is the
~5-year payback on the 500 kWp Bình Dương factory, already published in the project content.

`prisma/seed.ts` imports the list instead of holding it inline, so fresh databases get the
good content. Because production already holds FAQs, the count guard means the seed will
**not** add them there — use the new script:

```bash
npx tsx scripts/sync-faq.ts --dry-run   # report only
npx tsx scripts/sync-faq.ts             # apply
```

It is insert-only, skips any entry whose Vietnamese question already exists, and never
updates or deletes a row, so it is safe to run repeatedly against production.

> Still outstanding: the 4 broken FAQs remain in the production database. Set them to *Nháp*
> or delete them in Admin › FAQs — with the seed fixed, they will not come back.

---

## 2026-08-05 (c) — Testimonials editable from the admin panel

The homepage testimonials were hardcoded in `page.tsx` — three Vietnamese-only entries that
could not be changed without a code deploy. They are now a proper CMS collection with an
admin screen, full vi/en/es translation, avatar upload, star rating, ordering and
draft/published status.

Modelled on the existing FAQ module (a collection of translated records), not on the
About-page JSON blocks, because testimonials grow over time and need image upload and a
publish state.

### New Prisma model — `prisma/schema.prisma`

```prisma
model Testimonial {
  id        String   @id @default(cuid())
  status    String   @default("draft")
  sortOrder Int      @default(0)
  avatar    String   @default("")   // Vercel Blob URL
  rating    Int      @default(5)    // 1–5
  name      String                  // not translated — it is a person's name
  roleVi    String
  roleEn    String   @default("")
  roleEs    String   @default("")
  contentVi String
  contentEn String   @default("")
  contentEs String   @default("")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

`name` is deliberately single-value: a customer's name should read the same in all three
languages. `role` and `content` are translated.

### New files

| File | Purpose |
|---|---|
| `src/lib/db/testimonials.ts` | `getPublishedTestimonials(locale)` — localises rows the same way `db/products.ts` does |
| `src/app/api/admin/testimonials/route.ts` | admin list + create, guarded by `requireAdmin()` |
| `src/app/api/admin/testimonials/[id]/route.ts` | admin get / update / delete |
| `src/app/admin/testimonials/page.tsx` | admin screen — card list + modal editor |

### Changed

- **`src/app/admin/layout.tsx`** — new sidebar entry **"Đánh giá KH"** (Star icon), placed
  after *Về chúng tôi*.
- **`src/app/[locale]/(frontend)/page.tsx`** — the hardcoded `testimonials` array was
  deleted; the page now awaits `getPublishedTestimonials(locale)` alongside its other
  queries. The section is wrapped in `{testimonials.length > 0 && …}` so it disappears
  cleanly when everything is unpublished, and `key` moved from `name` to `id`.
- **`prisma/seed.ts`** — seeds the three original testimonials, now with real EN and ES
  translations.

### Two robustness details

- **Seeding is once-only.** The block is guarded by `count() === 0`, following the Downloads
  pattern rather than the FAQ one. This matters: `npm run build` re-runs the seed on *every*
  production deploy, and the FAQ block calls `deleteMany()` first — so FAQ edits made in the
  admin are wiped on each deploy. Testimonials deliberately avoid that trap; once a row
  exists, the seeder skips the whole block and admin edits survive.
- **`getPublishedTestimonials` catches query errors** and returns `[]`, so if the code
  reaches an environment where the table has not been pushed yet, the homepage renders
  without the section instead of returning a 500. `rating` is also clamped to 0–5 so a bad
  value cannot break the star loop.

### Admin usage

Admin › **Đánh giá KH** › *Thêm đánh giá*. Name and Vietnamese content are required
(the save button stays disabled without them); EN/ES fall back to the Vietnamese text when
left blank. Leaving the avatar empty renders the person's first initial on a brand-green
circle instead of a broken image. Set *Trạng thái* to *Nháp* to hide one entry without
deleting it, and use *Thứ tự* to order the cards.

> Not updated: the seeded admin wiki guide has no section for this screen yet. Wiki pages
> are only seeded when missing, so an existing wiki row would not pick up new text anyway.

Verified with `tsc --noEmit` and `next lint`, both clean. Not run against a database.

---

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
