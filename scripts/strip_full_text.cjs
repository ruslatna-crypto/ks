const fs = require('fs');
const path = require('path');

// We load the module via dynamic import or read as JSON if possible
async function main() {
  const mod = await import('../src/data/siteContentBilingual.js');
  const data = mod.siteDataBilingual;

  let strippedCount = 0;
  let savedBytes = 0;

  for (const [key, page] of Object.entries(data)) {
    if (page.ru && page.ru.full_text) {
      savedBytes += page.ru.full_text.length;
      delete page.ru.full_text;
      strippedCount++;
    }
    if (page.en && page.en.full_text) {
      savedBytes += page.en.full_text.length;
      delete page.en.full_text;
      strippedCount++;
    }
  }

  console.log('Removed full_text instances:', strippedCount);
  console.log('Saved raw characters:', savedBytes);

  const outCode = `// Bilingual site content (Russian & English) - Optimized runtime data
export const siteDataBilingual = ${JSON.stringify(data, null, 2)};

export default siteDataBilingual;
`;

  fs.writeFileSync('./src/data/siteContentBilingual.js', outCode, 'utf8');
  console.log('Successfully updated src/data/siteContentBilingual.js');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
