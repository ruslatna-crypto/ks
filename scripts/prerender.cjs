// scripts/prerender.cjs
const fs = require('fs');
const path = require('path');
const { clinicalCasesData } = require('../src/data/clinicalCases/clinicalCasesData.js');

const DIST_DIR = path.resolve(__dirname, '../dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');
const SSR_ENTRY_PATH = path.resolve(__dirname, '../dist-ssr/entry-server.js');

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error('Template dist/index.html not found. Run client build first.');
  process.exit(1);
}

if (!fs.existsSync(SSR_ENTRY_PATH)) {
  console.error('SSR bundle dist-ssr/entry-server.js not found. Run SSR build first.');
  process.exit(1);
}

// Initialize minimal JSDOM environment for DOMPurify during SSR
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = jsdom.window;
global.document = jsdom.window.document;
global.navigator = jsdom.window.navigator;

const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
const { render } = require(SSR_ENTRY_PATH);

const CORE_ROUTES = [
  '/',
  '/en',
  '/news',
  '/en/news',
  '/news/portal-update',
  '/en/news/portal-update',
  '/articles',
  '/en/articles',
  '/articles/functional-ceramics-principles',
  '/en/articles/functional-ceramics-principles',
  '/sushka',
  '/en/sushka',
  '/sush-ustanovka',
  '/en/sush-ustanovka',
  '/metodikasushka',
  '/en/metodikasushka',
  '/plenka',
  '/en/plenka',
  '/steril',
  '/en/steril',
  '/gril',
  '/en/gril',
  '/lamp',
  '/en/lamp',
  '/hlopok',
  '/en/cotton',
  '/paint',
  '/en/paint',
  '/metod',
  '/en/metod',
  '/virus',
  '/en/virus',
  '/metodika',
  '/en/metodika',
  '/klinik',
  '/en/klinik',
  '/contact',
  '/en/contact',
  '/search',
  '/en/search',
  '/404'
];

// Add all 119 clinical cases in RU and EN
const ALL_ROUTES = [...CORE_ROUTES];
for (const c of clinicalCasesData) {
  const slug = c.slug || c.id;
  ALL_ROUTES.push(`/klinik/${slug}`);
  ALL_ROUTES.push(`/en/klinik/${slug}`);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

console.log(`Starting static HTML pre-generation for ${ALL_ROUTES.length} routes...`);
const startTime = Date.now();
let generatedCount = 0;

for (const route of ALL_ROUTES) {
  try {
    const { html, meta } = render(route);

    let pageHtml = template;

    // 1. Set html lang attribute
    const lang = meta.lang || (route.startsWith('/en') ? 'en' : 'ru');
    pageHtml = pageHtml.replace(/<html\s+lang="[^"]*"/i, `<html lang="${lang}"`);

    // 2. Set title
    if (meta.title) {
      pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
    }

    // 3. Set meta description
    if (meta.description) {
      pageHtml = pageHtml.replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="description" content="${escapeHtml(meta.description)}" />`
      );
    }

    // 4. Set robots
    const robots = meta.robots || 'index, follow';
    pageHtml = pageHtml.replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="robots" content="${escapeHtml(robots)}" />`
    );

    // 5. Injects canonical, hreflang, and Open Graph tags
    const canonicalTag = meta.canonicalUrl ? `\n    <link rel="canonical" href="${meta.canonicalUrl}" />` : '';
    const hreflangTags = (meta.ruUrl && meta.enUrl) ? `
    <link rel="alternate" hreflang="ru" href="${meta.ruUrl}" />
    <link rel="alternate" hreflang="en" href="${meta.enUrl}" />
    <link rel="alternate" hreflang="x-default" href="${meta.ruUrl}" />` : '';

    // Remove any existing canonical or alternate links in template head
    pageHtml = pageHtml.replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '');
    pageHtml = pageHtml.replace(/<link\s+rel="alternate"\s+hreflang="[^"]*"[^>]*>\s*/gi, '');

    // Insert canonical & hreflang right before </head>
    pageHtml = pageHtml.replace('</head>', `${canonicalTag}${hreflangTags}\n  </head>`);

    // 6. Update Open Graph & Twitter meta tags
    if (meta.title) {
      pageHtml = pageHtml.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
      pageHtml = pageHtml.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`);
    }
    if (meta.description) {
      pageHtml = pageHtml.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
      pageHtml = pageHtml.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`);
    }
    if (meta.canonicalUrl) {
      pageHtml = pageHtml.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${meta.canonicalUrl}" />`);
    }
    if (meta.image) {
      pageHtml = pageHtml.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${meta.image}" />`);
      pageHtml = pageHtml.replace(/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${meta.image}" />`);
    }

    // 7. Inject full server-rendered HTML into #root
    pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    // 8. Determine target output path
    if (route === '/') {
      fs.writeFileSync(path.join(DIST_DIR, 'index.html'), pageHtml, 'utf-8');
    } else if (route === '/404') {
      fs.writeFileSync(path.join(DIST_DIR, '404.html'), pageHtml, 'utf-8');
    } else {
      const cleanRoute = route.replace(/^\/+/, '').replace(/\/+$/, '');
      const targetDir = path.join(DIST_DIR, cleanRoute);
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'index.html'), pageHtml, 'utf-8');

      // Also write cleanRoute.html for cleanUrls / static web server direct match
      const parentDir = path.dirname(path.join(DIST_DIR, cleanRoute + '.html'));
      fs.mkdirSync(parentDir, { recursive: true });
      fs.writeFileSync(path.join(DIST_DIR, cleanRoute + '.html'), pageHtml, 'utf-8');
    }

    generatedCount++;
  } catch (err) {
    console.error(`Error prerendering route "${route}":`, err);
  }
}

const elapsed = Date.now() - startTime;
console.log(`Successfully prerendered ${generatedCount}/${ALL_ROUTES.length} pages in ${elapsed}ms!`);

// Clean up temporary SSR bundle
const ssrDir = path.resolve(__dirname, '../dist-ssr');
if (fs.existsSync(ssrDir)) {
  fs.rmSync(ssrDir, { recursive: true, force: true });
  console.log('Cleaned up temporary SSR bundle (dist-ssr).');
}
