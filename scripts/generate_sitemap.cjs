// scripts/generate_sitemap.cjs
const fs = require('fs');
const path = require('path');
const { clinicalCasesData } = require('../src/data/clinicalCases/clinicalCasesData.js');

const DOMAIN = 'https://www.infraks.uz';
const CLINICAL_CASES_LASTMOD = '2026-09-29';

const CORE_PAGES = [
  { ru: '/', en: '/en', changefreq: 'weekly', priority: '1.0', lastmod: '2026-10-20' },
  { ru: '/news', en: '/en/news', changefreq: 'daily', priority: '0.9', lastmod: '2026-09-26' },
  { ru: '/news/portal-update', en: '/en/news/portal-update', changefreq: 'monthly', priority: '0.8', lastmod: '2026-09-26' },
  { ru: '/articles', en: '/en/articles', changefreq: 'weekly', priority: '0.9', lastmod: '2026-09-26' },
  { ru: '/articles/functional-ceramics-principles', en: '/en/articles/functional-ceramics-principles', changefreq: 'monthly', priority: '0.8', lastmod: '2026-09-26' },
  { ru: '/sushka', en: '/en/sushka', changefreq: 'monthly', priority: '0.85', lastmod: '2026-09-28' },
  { ru: '/plenka', en: '/en/plenka', changefreq: 'monthly', priority: '0.85', lastmod: '2026-09-28' },
  { ru: '/steril', en: '/en/steril', changefreq: 'monthly', priority: '0.85', lastmod: '2026-09-28' },
  { ru: '/gril', en: '/en/gril', changefreq: 'monthly', priority: '0.85', lastmod: '2026-10-21' },
  { ru: '/lamp', en: '/en/lamp', changefreq: 'weekly', priority: '0.9', lastmod: '2026-10-21' },
  { ru: '/hlopok', en: '/en/cotton', changefreq: 'monthly', priority: '0.85', lastmod: '2026-10-21' },
  { ru: '/paint', en: '/en/paint', changefreq: 'monthly', priority: '0.85', lastmod: '2026-10-21' },
  { ru: '/metod', en: '/en/metod', changefreq: 'monthly', priority: '0.9', lastmod: '2026-10-21' },
  { ru: '/metodika', en: '/en/metodika', changefreq: 'monthly', priority: '0.85', lastmod: '2026-10-12' },
  { ru: '/klinik', en: '/en/klinik', changefreq: 'weekly', priority: '0.9', lastmod: '2026-10-21' },
  { ru: '/contact', en: '/en/contact', changefreq: 'monthly', priority: '0.8', lastmod: '2026-10-12' }
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
    '  <!-- RU Core Pages (Stages 1, 2, 4 Verified) -->'
  ];

  // 1. RU Core Pages
  for (const page of CORE_PAGES) {
    const ruUrl = `${DOMAIN}${page.ru === '/' ? '/' : page.ru}`;
    const enUrl = `${DOMAIN}${page.en}`;
    lines.push(buildUrlEntry(ruUrl, ruUrl, enUrl, page.changefreq, page.priority, page.lastmod));
  }

  // 2. EN Core Pages
  lines.push('  <!-- EN Core Pages (Stages 1, 2, 4 Verified) -->');
  for (const page of CORE_PAGES) {
    const ruUrl = `${DOMAIN}${page.ru === '/' ? '/' : page.ru}`;
    const enUrl = `${DOMAIN}${page.en}`;
    lines.push(buildUrlEntry(enUrl, ruUrl, enUrl, page.changefreq, page.priority, page.lastmod));
  }

  // 3. RU Clinical Cases
  lines.push('  <!-- RU Clinical Cases (119 cases) -->');
  for (const c of clinicalCasesData) {
    const slug = c.slug || c.id;
    const ruUrl = `${DOMAIN}/klinik/${slug}`;
    const enUrl = `${DOMAIN}/en/klinik/${slug}`;
    lines.push(buildUrlEntry(ruUrl, ruUrl, enUrl, 'monthly', '0.75', CLINICAL_CASES_LASTMOD));
  }

  // 4. EN Clinical Cases
  lines.push('  <!-- EN Clinical Cases (119 cases) -->');
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
