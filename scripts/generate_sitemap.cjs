// scripts/generate_sitemap.cjs
const fs = require('fs');
const path = require('path');
const { clinicalCasesData } = require('../src/data/clinicalCases/clinicalCasesData.js');

const DOMAIN = 'https://www.infraks.uz';

function getFileDate(relPath, fallbackDate = '2026-10-21') {
  try {
    const fullPath = path.resolve(__dirname, '..', relPath);
    if (fs.existsSync(fullPath)) {
      return fs.statSync(fullPath).mtime.toISOString().split('T')[0];
    }
  } catch (e) {}
  return fallbackDate;
}

const CLINICAL_CASES_LASTMOD = getFileDate('src/data/clinicalCases/clinicalCasesData.js', '2026-10-21');

const CORE_PAGES = [
  { ru: '/', en: '/en', changefreq: 'weekly', priority: '1.0', file: 'src/pages/HomePage.jsx' },
  { ru: '/news', en: '/en/news', changefreq: 'daily', priority: '0.9', file: 'src/pages/NewsPage.jsx' },
  { ru: '/news/portal-update', en: '/en/news/portal-update', changefreq: 'monthly', priority: '0.8', file: 'content/ru/news/2026-09-26-portal-update.md' },
  { ru: '/articles', en: '/en/articles', changefreq: 'weekly', priority: '0.9', file: 'src/pages/ArticlesPage.jsx' },
  { ru: '/articles/functional-ceramics-principles', en: '/en/articles/functional-ceramics-principles', changefreq: 'monthly', priority: '0.8', file: 'content/ru/articles/2026-09-26-functional-ceramics-principles.md' },
  { ru: '/sushka', en: '/en/sushka', changefreq: 'monthly', priority: '0.85', file: 'src/pages/SushkaPage.jsx' },
  { ru: '/sush-ustanovka', en: '/en/sush-ustanovka', changefreq: 'monthly', priority: '0.85', file: 'src/pages/DevelopmentPage.jsx' },
  { ru: '/metodikasushka', en: '/en/metodikasushka', changefreq: 'monthly', priority: '0.85', file: 'src/pages/DevelopmentPage.jsx' },
  { ru: '/plenka', en: '/en/plenka', changefreq: 'monthly', priority: '0.85', file: 'src/pages/PlenkaPage.jsx' },
  { ru: '/steril', en: '/en/steril', changefreq: 'monthly', priority: '0.85', file: 'src/pages/SterilPage.jsx' },
  { ru: '/gril', en: '/en/gril', changefreq: 'monthly', priority: '0.85', file: 'src/pages/GrilPage.jsx' },
  { ru: '/lamp', en: '/en/lamp', changefreq: 'weekly', priority: '0.9', file: 'src/pages/LampPage.jsx' },
  { ru: '/hlopok', en: '/en/cotton', changefreq: 'monthly', priority: '0.85', file: 'src/pages/CottonPage.jsx' },
  { ru: '/paint', en: '/en/paint', changefreq: 'monthly', priority: '0.85', file: 'src/pages/PaintPage.jsx' },
  { ru: '/metod', en: '/en/metod', changefreq: 'monthly', priority: '0.9', file: 'src/pages/MetodPage.jsx' },
  { ru: '/virus', en: '/en/virus', changefreq: 'monthly', priority: '0.85', file: 'src/pages/DevelopmentPage.jsx' },
  { ru: '/metodika', en: '/en/metodika', changefreq: 'monthly', priority: '0.85', file: 'src/pages/LecturesPage.jsx' },
  { ru: '/klinik', en: '/en/klinik', changefreq: 'weekly', priority: '0.9', file: 'src/pages/ClinicalCasesPage.jsx' },
  { ru: '/contact', en: '/en/contact', changefreq: 'monthly', priority: '0.8', file: 'src/pages/ContactPage.jsx' }
];

function buildUrlEntry(loc, ruUrl, enUrl, changefreq, priority, lastmod) {
  return `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="ru" href="${ruUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${ruUrl}" />
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function generateSitemapXml() {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    '  <!-- RU Core Pages -->'
  ];

  // 1. RU Core Pages
  for (const page of CORE_PAGES) {
    const ruUrl = `${DOMAIN}${page.ru === '/' ? '/' : page.ru}`;
    const enUrl = `${DOMAIN}${page.en}`;
    const lastmod = getFileDate(page.file);
    lines.push(buildUrlEntry(ruUrl, ruUrl, enUrl, page.changefreq, page.priority, lastmod));
  }

  // 2. EN Core Pages
  lines.push('  <!-- EN Core Pages -->');
  for (const page of CORE_PAGES) {
    const ruUrl = `${DOMAIN}${page.ru === '/' ? '/' : page.ru}`;
    const enUrl = `${DOMAIN}${page.en}`;
    const lastmod = getFileDate(page.file);
    lines.push(buildUrlEntry(enUrl, ruUrl, enUrl, page.changefreq, page.priority, lastmod));
  }

  // 3. RU Clinical Cases
  lines.push(`  <!-- RU Clinical Cases (${clinicalCasesData.length} cases) -->`);
  for (const c of clinicalCasesData) {
    const slug = c.slug || c.id;
    const ruUrl = `${DOMAIN}/klinik/${slug}`;
    const enUrl = `${DOMAIN}/en/klinik/${slug}`;
    lines.push(buildUrlEntry(ruUrl, ruUrl, enUrl, 'monthly', '0.75', CLINICAL_CASES_LASTMOD));
  }

  // 4. EN Clinical Cases
  lines.push(`  <!-- EN Clinical Cases (${clinicalCasesData.length} cases) -->`);
  for (const c of clinicalCasesData) {
    const slug = c.slug || c.id;
    const ruUrl = `${DOMAIN}/klinik/${slug}`;
    const enUrl = `${DOMAIN}/en/klinik/${slug}`;
    lines.push(buildUrlEntry(enUrl, ruUrl, enUrl, 'monthly', '0.75', CLINICAL_CASES_LASTMOD));
  }

  lines.push('</urlset>\n');
  return lines.join('\n');
}

const xml = generateSitemapXml();
const targetPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(targetPath, xml, 'utf-8');
console.log('Successfully generated public/sitemap.xml with', CORE_PAGES.length * 2 + clinicalCasesData.length * 2, 'URLs.');

const distPath = path.resolve(__dirname, '../dist/sitemap.xml');
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, xml, 'utf-8');
  console.log('Successfully updated dist/sitemap.xml');
}
