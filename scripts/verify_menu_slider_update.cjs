const fs = require('fs');
const path = require('path');

console.log('=== VERIFYING MENU AND SLIDER REPOSITIONING ===\n');

let pass = true;

function check(title, condition, errorMsg) {
  if (condition) {
    console.log(`[PASS] ${title}`);
  } else {
    console.error(`[FAIL] ${title}: ${errorMsg}`);
    pass = false;
  }
}

// 1. Check Header.jsx
const headerJsx = fs.readFileSync(path.resolve(__dirname, '../src/components/Header.jsx'), 'utf8');

// Check absence of "Новости" and "Статьи" in desktop navigation
check(
  '"Новости" removed from desktop and mobile navigation in Header.jsx',
  !headerJsx.includes("getPath('/news')") && !headerJsx.includes("getPath('/en/news')"),
  'Found link to /news in Header.jsx'
);

check(
  '"Статьи" removed from desktop and mobile navigation in Header.jsx',
  !headerJsx.includes("getPath('/articles')") && !headerJsx.includes("getPath('/en/articles')"),
  'Found link to /articles in Header.jsx'
);

// Check that developments menu remains flat 1-level
check(
  'Developments menu remains flat 1-level without 3rd level',
  !headerJsx.includes("getPath('/sush-ustanovka')") &&
  !headerJsx.includes("getPath('/metodikasushka')") &&
  !headerJsx.includes('t.menu.sushUstanovka') &&
  !headerJsx.includes('t.menu.metodikaSushka'),
  'Found 3rd level sublinks in Header.jsx'
);

check(
  'No "Основные направления" or "Промышленные направления" in Header.jsx',
  !headerJsx.includes('Основные направления') &&
  !headerJsx.includes('Core Directions') &&
  !headerJsx.includes('Промышленные направления') &&
  !headerJsx.includes('Industrial & Medical'),
  'Found category direction headers in Header.jsx'
);

// 2. Check HomePage.jsx for HeroSlider position and removal of hero-intro-section
const homeJsx = fs.readFileSync(path.resolve(__dirname, '../src/pages/HomePage.jsx'), 'utf8');

check(
  'hero-intro-section removed from HomePage.jsx',
  !homeJsx.includes('hero-intro-section') &&
  !homeJsx.includes('hero-stats-panel') &&
  !homeJsx.includes('hero-intro-title'),
  'Found hero-intro-section in HomePage.jsx'
);

// Check that HeroSlider is placed immediately after SEO
const seoIndex = homeJsx.indexOf('<SEO');
const sliderIndex = homeJsx.indexOf('<HeroSlider');
const cardsIndex = homeJsx.indexOf('home-cards-section');

check(
  'HeroSlider is located immediately under Header/SEO on HomePage',
  seoIndex !== -1 && sliderIndex !== -1 && sliderIndex > seoIndex && sliderIndex < cardsIndex,
  'HeroSlider is not positioned immediately after SEO before home-cards-section'
);

// 3. Check Route preservation in App.jsx
const appJsx = fs.readFileSync(path.resolve(__dirname, '../src/App.jsx'), 'utf8');
check(
  'Routes /news and /articles preserved in App.jsx',
  appJsx.includes('path="/news"') &&
  appJsx.includes('path="/en/news"') &&
  appJsx.includes('path="/articles"') &&
  appJsx.includes('path="/en/articles"'),
  'Routes for /news or /articles missing in App.jsx'
);

check(
  'Routes /news/:slug and /articles/:slug preserved in App.jsx',
  appJsx.includes('path="/news/:slug"') &&
  appJsx.includes('path="/en/news/:slug"') &&
  appJsx.includes('path="/articles/:slug"') &&
  appJsx.includes('path="/en/articles/:slug"'),
  'Dynamic routes for news/articles slug missing in App.jsx'
);

// 4. Check Decap CMS config for news and articles collections
const configYml = fs.readFileSync(path.resolve(__dirname, '../public/admin/config.yml'), 'utf8');
check(
  'Decap CMS preserves news_ru, news_en, articles_ru, articles_en',
  configYml.includes('name: "news_ru"') &&
  configYml.includes('name: "news_en"') &&
  configYml.includes('name: "articles_ru"') &&
  configYml.includes('name: "articles_en"'),
  'CMS collections missing from config.yml'
);

// 5. Check CSS rules for social and lang buttons preserved
const indexCss = fs.readFileSync(path.resolve(__dirname, '../src/styles/index.css'), 'utf8');
check(
  'Social buttons remain circular (+40%, border-radius: 50%, border: none)',
  indexCss.includes('.social-icon-btn {') &&
  indexCss.includes('border-radius: 50%;') &&
  indexCss.includes('width: 52px;') &&
  indexCss.includes('border: none;'),
  'Social button styling modified'
);

check(
  'Social button hover pulse preserved (:hover only)',
  indexCss.includes('.social-icon-btn:hover {') &&
  indexCss.includes('animation: socialHoverPulse 800ms ease-in-out infinite;'),
  'Social button hover pulse missing'
);

check(
  'RU / ENG buttons retain rectangular shape with hover pulse',
  indexCss.includes('.lang-btn {') &&
  indexCss.includes('border-radius: 4px;') &&
  indexCss.includes('.lang-btn:hover {') &&
  indexCss.includes('animation: langHoverPulse 850ms ease-in-out infinite;'),
  'Language button hover styling modified'
);

check(
  'Phone styling remains plain text contact',
  indexCss.includes('.header-phone') &&
  indexCss.includes('background: transparent;') &&
  indexCss.includes('border: none;'),
  'Phone styling modified'
);

console.log('\n----------------------------------------');
if (pass) {
  console.log('>>> ALL REPOSITIONING CHECKS PASSED (100%) <<<');
  process.exit(0);
} else {
  console.error('>>> SOME REPOSITIONING CHECKS FAILED <<<');
  process.exit(1);
}
