-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "category" TEXT NOT NULL DEFAULT 'combo',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "downloadUrl" TEXT NOT NULL DEFAULT '',
    "featuredImage" TEXT NOT NULL DEFAULT '',
    "gallery" TEXT NOT NULL DEFAULT '[]',
    "tags" TEXT NOT NULL DEFAULT '[]',
    "relatedSlugs" TEXT NOT NULL DEFAULT '[]',
    "seoOgImage" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "titleVi" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL DEFAULT '',
    "titleEs" TEXT NOT NULL DEFAULT '',
    "subtitleVi" TEXT NOT NULL DEFAULT '',
    "subtitleEn" TEXT NOT NULL DEFAULT '',
    "subtitleEs" TEXT NOT NULL DEFAULT '',
    "excerptVi" TEXT NOT NULL DEFAULT '',
    "excerptEn" TEXT NOT NULL DEFAULT '',
    "excerptEs" TEXT NOT NULL DEFAULT '',
    "featuresVi" TEXT NOT NULL DEFAULT '[]',
    "featuresEn" TEXT NOT NULL DEFAULT '[]',
    "featuresEs" TEXT NOT NULL DEFAULT '[]',
    "specsVi" TEXT NOT NULL DEFAULT '{}',
    "specsEn" TEXT NOT NULL DEFAULT '{}',
    "specsEs" TEXT NOT NULL DEFAULT '{}',
    "tiersVi" TEXT NOT NULL DEFAULT '[]',
    "tiersEn" TEXT NOT NULL DEFAULT '[]',
    "tiersEs" TEXT NOT NULL DEFAULT '[]',
    "seoTitleVi" TEXT NOT NULL DEFAULT '',
    "seoTitleEn" TEXT NOT NULL DEFAULT '',
    "seoTitleEs" TEXT NOT NULL DEFAULT '',
    "seoDescVi" TEXT NOT NULL DEFAULT '',
    "seoDescEn" TEXT NOT NULL DEFAULT '',
    "seoDescEs" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "category" TEXT NOT NULL DEFAULT 'enterprise',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "location" TEXT NOT NULL DEFAULT '',
    "power" TEXT NOT NULL DEFAULT '',
    "installationDate" TEXT NOT NULL DEFAULT '',
    "year" TEXT NOT NULL DEFAULT '',
    "videoUrl" TEXT NOT NULL DEFAULT '',
    "featuredImage" TEXT NOT NULL DEFAULT '',
    "gallery" TEXT NOT NULL DEFAULT '[]',
    "relatedSlugs" TEXT NOT NULL DEFAULT '[]',
    "seoOgImage" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "titleVi" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL DEFAULT '',
    "titleEs" TEXT NOT NULL DEFAULT '',
    "excerptVi" TEXT NOT NULL DEFAULT '',
    "excerptEn" TEXT NOT NULL DEFAULT '',
    "excerptEs" TEXT NOT NULL DEFAULT '',
    "contentVi" TEXT NOT NULL DEFAULT '',
    "contentEn" TEXT NOT NULL DEFAULT '',
    "contentEs" TEXT NOT NULL DEFAULT '',
    "seoTitleVi" TEXT NOT NULL DEFAULT '',
    "seoTitleEn" TEXT NOT NULL DEFAULT '',
    "seoTitleEs" TEXT NOT NULL DEFAULT '',
    "seoDescVi" TEXT NOT NULL DEFAULT '',
    "seoDescEn" TEXT NOT NULL DEFAULT '',
    "seoDescEs" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "publishedAt" DATETIME,
    "author" TEXT NOT NULL DEFAULT 'Admin',
    "featuredImage" TEXT NOT NULL DEFAULT '',
    "gallery" TEXT NOT NULL DEFAULT '[]',
    "tags" TEXT NOT NULL DEFAULT '[]',
    "relatedSlugs" TEXT NOT NULL DEFAULT '[]',
    "seoOgImage" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "titleVi" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL DEFAULT '',
    "titleEs" TEXT NOT NULL DEFAULT '',
    "excerptVi" TEXT NOT NULL DEFAULT '',
    "excerptEn" TEXT NOT NULL DEFAULT '',
    "excerptEs" TEXT NOT NULL DEFAULT '',
    "contentVi" TEXT NOT NULL DEFAULT '',
    "contentEn" TEXT NOT NULL DEFAULT '',
    "contentEs" TEXT NOT NULL DEFAULT '',
    "seoTitleVi" TEXT NOT NULL DEFAULT '',
    "seoTitleEn" TEXT NOT NULL DEFAULT '',
    "seoTitleEs" TEXT NOT NULL DEFAULT '',
    "seoDescVi" TEXT NOT NULL DEFAULT '',
    "seoDescEn" TEXT NOT NULL DEFAULT '',
    "seoDescEs" TEXT NOT NULL DEFAULT ''
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
