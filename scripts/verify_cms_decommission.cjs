const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== INFRAKS: DECAP CMS DECOMMISSION VERIFICATION SUITE ===\n');

let passCount = 0;
let failCount = 0;

function check(title, fn) {
  try {
    fn();
    console.log(`[PASS] ${title}`);
    passCount++;
  } catch (err) {
    console.error(`[FAIL] ${title}:`, err.message);
    failCount++;
  }
}

const ROOT_DIR = path.resolve(__dirname, '..');

// 1. Verification of removed Decap CMS & OAuth components
check('public/admin directory is completely deleted', () => {
  assert(!fs.existsSync(path.join(ROOT_DIR, 'public/admin')), 'public/admin still exists');
});

check('public/config.yml duplicate is deleted', () => {
  assert(!fs.existsSync(path.join(ROOT_DIR, 'public/config.yml')), 'public/config.yml still exists');
});

check('api/auth.js endpoint is deleted', () => {
  assert(!fs.existsSync(path.join(ROOT_DIR, 'api/auth.js')), 'api/auth.js still exists');
});

check('api/callback.js endpoint is deleted', () => {
  assert(!fs.existsSync(path.join(ROOT_DIR, 'api/callback.js')), 'api/callback.js still exists');
});

check('scripts/test_oauth_callback.cjs test script is deleted', () => {
  assert(!fs.existsSync(path.join(ROOT_DIR, 'scripts/test_oauth_callback.cjs')), 'scripts/test_oauth_callback.cjs still exists');
});

// 2. Verification of package.json
check('package.json has no cms script', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
  assert(!pkg.scripts.cms, 'package.json scripts.cms still exists');
  assert(pkg.scripts.build === 'vite build', 'package.json scripts.build must be preserved');
  assert(pkg.scripts.dev === 'vite', 'package.json scripts.dev must be preserved');
});

// 3. Verification of vercel.json
check('vercel.json is valid and free of /admin headers, redirects, and regex', () => {
  const vercel = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'vercel.json'), 'utf8'));

  // Headers check
  const adminHeader = vercel.headers && vercel.headers.find(h => h.source && h.source.includes('admin'));
  assert(!adminHeader, 'vercel.json still contains admin headers');

  // CSP check in root
  const rootHeader = vercel.headers.find(h => h.source === '/(.*)');
  assert(rootHeader, 'Root security headers must be preserved');
  const csp = rootHeader.headers.find(h => h.key === 'Content-Security-Policy-Report-Only');
  assert(csp, 'CSP header must be present');
  assert(!csp.value.includes('unpkg.com'), 'Root CSP must not contain unpkg.com');
  assert(!csp.value.includes('api.github.com'), 'Root CSP must not contain api.github.com');

  // Redirects check
  const adminRedirect = vercel.redirects && vercel.redirects.find(r => r.source === '/admin');
  assert(!adminRedirect, 'vercel.json still contains admin redirect');

  // Rewrites check
  const spaRewrite = vercel.rewrites && vercel.rewrites.find(r => r.destination === '/index.html');
  assert(spaRewrite, 'SPA rewrite must be preserved');
  assert(!spaRewrite.source.includes('admin/'), 'Rewrites regex must not contain admin/');
  assert(!spaRewrite.source.includes('config\\.yml'), 'Rewrites regex must not contain config.yml');
  assert(spaRewrite.source.includes('uploads/'), 'Rewrites regex must preserve uploads/');
  assert(spaRewrite.source.includes('assets/'), 'Rewrites regex must preserve assets/');
  assert(spaRewrite.source.includes('images/'), 'Rewrites regex must preserve images/');
  assert(spaRewrite.source.includes('pdf/'), 'Rewrites regex must preserve pdf/');
  assert(spaRewrite.source.includes('videos/'), 'Rewrites regex must preserve videos/');
  assert(spaRewrite.source.includes('robots\\.txt'), 'Rewrites regex must preserve robots.txt');
  assert(spaRewrite.source.includes('sitemap\\.xml'), 'Rewrites regex must preserve sitemap.xml');
  assert(spaRewrite.source.includes('favicon\\.ico'), 'Rewrites regex must preserve favicon.ico');
  assert(spaRewrite.source.includes('favicon\\.svg'), 'Rewrites regex must preserve favicon.svg');
});

// 4. Verification of vite.config.js
check('vite.config.js removes admin routes but preserves /api/order middleware', () => {
  const viteConfig = fs.readFileSync(path.join(ROOT_DIR, 'vite.config.js'), 'utf8');
  assert(!viteConfig.includes("req.url === '/admin'"), 'vite.config.js still checks /admin');
  assert(!viteConfig.includes("req.url === '/admin/'"), 'vite.config.js still checks /admin/');
  assert(!viteConfig.includes('/admin/index.html'), 'vite.config.js still references /admin/index.html');
  assert(viteConfig.includes("req.url === '/api/order'"), 'vite.config.js must handle /api/order');
  assert(viteConfig.includes('orderHandler'), 'vite.config.js must import and call orderHandler');
});

// 5. Verification of preserved critical components
check('content/ directory is preserved and contains news and articles', () => {
  assert(fs.existsSync(path.join(ROOT_DIR, 'content/ru/news')), 'content/ru/news must exist');
  assert(fs.existsSync(path.join(ROOT_DIR, 'content/ru/articles')), 'content/ru/articles must exist');
  assert(fs.existsSync(path.join(ROOT_DIR, 'content/en/news')), 'content/en/news must exist');
  assert(fs.existsSync(path.join(ROOT_DIR, 'content/en/articles')), 'content/en/articles must exist');
  assert(fs.existsSync(path.join(ROOT_DIR, 'content/data/site.json')), 'content/data/site.json must exist');
  assert(fs.existsSync(path.join(ROOT_DIR, 'content/data/contacts.json')), 'content/data/contacts.json must exist');
});

check('src/utils/contentLoader.js exists and is untouched', () => {
  assert(fs.existsSync(path.join(ROOT_DIR, 'src/utils/contentLoader.js')), 'contentLoader.js must exist');
  const code = fs.readFileSync(path.join(ROOT_DIR, 'src/utils/contentLoader.js'), 'utf8');
  assert(code.includes('import.meta.glob(\'/content/**/*.md\''), 'contentLoader must read /content/**/*.md');
  assert(code.includes('export function getNews'), 'contentLoader must export getNews');
  assert(code.includes('export function getArticles'), 'contentLoader must export getArticles');
});

check('api/order.js exists and retains Telegram order handling', () => {
  assert(fs.existsSync(path.join(ROOT_DIR, 'api/order.js')), 'api/order.js must exist');
  const code = fs.readFileSync(path.join(ROOT_DIR, 'api/order.js'), 'utf8');
  assert(code.includes('TELEGRAM_BOT_TOKEN'), 'api/order.js must use TELEGRAM_BOT_TOKEN');
  assert(code.includes('TELEGRAM_CHAT_ID'), 'api/order.js must use TELEGRAM_CHAT_ID');
  assert(code.includes('ALLOWED_ORIGINS'), 'api/order.js must keep ALLOWED_ORIGINS');
});

check('public/robots.txt preserves Disallow: /admin/ and Disallow: /api/', () => {
  const robots = fs.readFileSync(path.join(ROOT_DIR, 'public/robots.txt'), 'utf8');
  assert(robots.includes('Disallow: /admin/'), 'robots.txt must still disallow /admin/');
  assert(robots.includes('Disallow: /api/'), 'robots.txt must still disallow /api/');
});

check('public/uploads/.gitkeep is preserved', () => {
  assert(fs.existsSync(path.join(ROOT_DIR, 'public/uploads/.gitkeep')), 'public/uploads/.gitkeep must exist');
});

console.log('\n====================================================');
console.log(`DECOMMISSION RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log('====================================================\n');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
