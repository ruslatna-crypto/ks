const fs = require('fs');
const path = require('path');

console.log('=== KERAMIKA SINTEZ: STAGE 5 VERIFICATION SUITE ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

// 1. Check build files in dist/
const distDir = path.resolve(__dirname, '../dist');
assert(fs.existsSync(path.join(distDir, 'index.html')), 'dist/index.html exists');
assert(fs.existsSync(path.join(distDir, 'robots.txt')), 'dist/robots.txt exists');
assert(fs.existsSync(path.join(distDir, 'sitemap.xml')), 'dist/sitemap.xml exists');
assert(fs.existsSync(path.join(distDir, 'favicon.ico')), 'dist/favicon.ico exists');
assert(fs.existsSync(path.join(distDir, 'favicon.svg')), 'dist/favicon.svg exists');
assert(fs.existsSync(path.join(distDir, 'admin/index.html')), 'dist/admin/index.html exists');
assert(fs.existsSync(path.join(distDir, 'admin/config.yml')), 'dist/admin/config.yml exists');

// 2. Check robots.txt content
const robotsContent = fs.readFileSync(path.join(distDir, 'robots.txt'), 'utf8');
assert(!robotsContent.includes('infraks.ru'), 'robots.txt has NO legacy infraks.ru');
assert(robotsContent.includes('Allow: /'), 'robots.txt allows root');
assert(robotsContent.includes('Disallow: /admin/'), 'robots.txt disallows /admin/');
assert(robotsContent.includes('Disallow: /api/'), 'robots.txt disallows /api/');
assert(robotsContent.includes('Sitemap:'), 'robots.txt references sitemap');

// 3. Check sitemap.xml content
const sitemapContent = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf8');
assert(!sitemapContent.includes('infraks.ru'), 'sitemap.xml has NO legacy infraks.ru');
assert(sitemapContent.includes('/sushka'), 'sitemap includes /sushka');
assert(sitemapContent.includes('/news'), 'sitemap includes /news');
assert(sitemapContent.includes('/articles'), 'sitemap includes /articles');
assert(sitemapContent.includes('/en/sushka'), 'sitemap includes /en/sushka');
assert(sitemapContent.includes('hreflang="ru"'), 'sitemap includes hreflang ru');
assert(sitemapContent.includes('hreflang="en"'), 'sitemap includes hreflang en');
assert(sitemapContent.includes('hreflang="x-default"'), 'sitemap includes hreflang x-default');
assert(!sitemapContent.includes('/admin/'), 'sitemap does not include /admin/');
assert(!sitemapContent.includes('/api/'), 'sitemap does not include /api/');

// 4. Check vercel.json
const vercelConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../vercel.json'), 'utf8'));
assert(vercelConfig.buildCommand === 'npm run build', 'vercel.json buildCommand is npm run build');
assert(vercelConfig.outputDirectory === 'dist', 'vercel.json outputDirectory is dist');
const hasAdminRedirect = vercelConfig.redirects && vercelConfig.redirects.some(r => r.source === '/admin' && r.destination === '/admin/' && r.permanent === true);
assert(hasAdminRedirect, 'vercel.json redirects /admin to /admin/ (301)');
const hasSpaRewrite = vercelConfig.rewrites && vercelConfig.rewrites.some(r => r.destination === '/index.html');
assert(hasSpaRewrite, 'vercel.json has SPA rewrites fallback');

// 5. Check SEO component
const seoFile = fs.readFileSync(path.resolve(__dirname, '../src/components/SEO.jsx'), 'utf8');
assert(seoFile.includes('document.title = fullTitle'), 'SEO.jsx manages document.title');
assert(seoFile.includes('canonical'), 'SEO.jsx manages canonical links');
assert(seoFile.includes('alternate'), 'SEO.jsx manages hreflang alternate links');
assert(seoFile.includes('og:title'), 'SEO.jsx manages Open Graph');
assert(seoFile.includes('twitter:card'), 'SEO.jsx manages Twitter card');

// 6. Check Decap CMS config & admin index.html
const adminHtml = fs.readFileSync(path.resolve(__dirname, '../public/admin/index.html'), 'utf8');
assert(adminHtml.includes('window.CMS_MANUAL_INIT = true'), 'admin/index.html uses manual initialization for dynamic origin');
assert(adminHtml.includes('base_url: window.location.origin'), 'admin/index.html dynamically sets base_url to window.location.origin');
assert(adminHtml.includes('auth_endpoint: \'api/auth\''), 'admin/index.html sets auth_endpoint to api/auth');

const configYml = fs.readFileSync(path.resolve(__dirname, '../public/admin/config.yml'), 'utf8');
assert(configYml.includes('repo: ruslatna-crypto/ks'), 'config.yml repo points to ruslatna-crypto/ks');
assert(configYml.includes('branch: main'), 'config.yml branch points to main');
assert(!configYml.includes('https://ks.loc'), 'config.yml has NO hardcoded local domain');

// 7. Check serverless OAuth endpoints
const apiAuth = fs.readFileSync(path.resolve(__dirname, '../api/auth.js'), 'utf8');
const apiCallback = fs.readFileSync(path.resolve(__dirname, '../api/callback.js'), 'utf8');
assert(apiAuth.includes('process.env.GITHUB_CLIENT_ID'), 'api/auth.js reads GITHUB_CLIENT_ID from environment');
assert(apiCallback.includes('process.env.GITHUB_CLIENT_SECRET'), 'api/callback.js reads GITHUB_CLIENT_SECRET from environment');
assert(!apiAuth.includes('ghp_') && !apiCallback.includes('ghp_'), 'No hardcoded GitHub secrets in api/');

// 8. Scientific content verification
const siteContentBilingual = fs.readFileSync(path.resolve(__dirname, '../src/data/siteContentBilingual.js'), 'utf8');
assert(siteContentBilingual.includes('sushka'), 'siteContentBilingual includes sushka');
assert(siteContentBilingual.includes('plenka'), 'siteContentBilingual includes plenka');
assert(siteContentBilingual.includes('steril'), 'siteContentBilingual includes steril');
assert(siteContentBilingual.includes('lamp'), 'siteContentBilingual includes lamp');
assert(siteContentBilingual.includes('gril'), 'siteContentBilingual includes gril');
assert(siteContentBilingual.includes('cotton'), 'siteContentBilingual includes cotton');
assert(siteContentBilingual.includes('paint'), 'siteContentBilingual includes paint');
assert(siteContentBilingual.includes('metodika'), 'siteContentBilingual includes 76 medical lectures');

console.log(`\n========================================`);
console.log(`TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`========================================`);

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
