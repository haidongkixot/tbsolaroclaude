/**
 * Adds any FAQ from prisma/faq-data.ts that is not already in the database.
 *
 * Safe to run repeatedly and against production: it only ever INSERTs. Existing
 * rows are never updated or deleted, and an entry whose Vietnamese question already
 * exists is skipped, so re-running does not create duplicates.
 *
 *   npx tsx scripts/sync-faq.ts            # uses DATABASE_URL from the environment
 *   npx tsx scripts/sync-faq.ts --dry-run  # report what would be added, change nothing
 *
 * To target a specific database, set DATABASE_URL for the command, e.g.
 *   DATABASE_URL="postgresql://..." npx tsx scripts/sync-faq.ts --dry-run
 */
import { PrismaClient } from '@prisma/client';
import { FAQ_SEED } from '../prisma/faq-data';

const prisma = new PrismaClient();
const dryRun = process.argv.includes('--dry-run');

function norm(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

async function main() {
  const existing = await prisma.fAQ.findMany({
    select: { id: true, questionVi: true, status: true, category: true },
  });
  const seen = new Set(existing.map((f) => norm(f.questionVi)));

  console.log(`Database currently holds ${existing.length} FAQ(s).`);
  console.log(`Candidate entries in faq-data.ts: ${FAQ_SEED.length}`);
  if (dryRun) console.log('\n-- DRY RUN: nothing will be written --');

  let added = 0;
  let skipped = 0;

  for (const faq of FAQ_SEED) {
    if (seen.has(norm(faq.questionVi))) {
      skipped++;
      console.log(`  skip   ${faq.questionVi.slice(0, 60)}`);
      continue;
    }
    if (!dryRun) await prisma.fAQ.create({ data: faq });
    seen.add(norm(faq.questionVi));
    added++;
    console.log(`  ${dryRun ? 'would add' : 'added'}  ${faq.questionVi.slice(0, 60)}`);
  }

  console.log(`\n${dryRun ? 'Would add' : 'Added'}: ${added}   Skipped (already present): ${skipped}`);

  if (!dryRun) {
    const total = await prisma.fAQ.count();
    console.log(`Database now holds ${total} FAQ(s).`);
  }
}

main()
  .catch((e) => {
    console.error('Failed:', e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
