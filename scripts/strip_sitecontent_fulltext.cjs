const fs = require('fs');

async function main() {
  const mod = await import('../src/data/siteContent.js');
  const data = mod.siteData || mod.default;

  let strippedCount = 0;
  let savedBytes = 0;

  data.forEach(page => {
    if (page.full_text) {
      savedBytes += page.full_text.length;
      delete page.full_text;
      strippedCount++;
    }
  });

  console.log('Stripped full_text from siteContent.js:', strippedCount, 'Saved bytes:', savedBytes);

  const outCode = `// Automatically generated site content - Optimized runtime data
export const siteData = ${JSON.stringify(data, null, 2)};

export default siteData;
`;

  fs.writeFileSync('./src/data/siteContent.js', outCode, 'utf8');
  console.log('Successfully updated src/data/siteContent.js');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
