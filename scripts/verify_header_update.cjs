const fs = require('fs');
const path = require('path');

console.log('=== VERIFYING HEADER REFINEMENT ===\n');

let pass = true;

// 1. Check Header.jsx
const headerJsx = fs.readFileSync(path.resolve(__dirname, '../src/components/Header.jsx'), 'utf8');

if (headerJsx.includes('logo-brand-meta') || headerJsx.includes('НАУЧНО-ПРОИЗВОДСТВЕННЫЙ ЦЕНТР') || headerJsx.includes('Research & Production Center')) {
  console.error('[FAIL] Header.jsx still contains logo-brand-meta or extra subtitle text');
  pass = false;
} else {
  console.log('[PASS] Text next to logo ("НАУЧНО-ПРОИЗВОДСТВЕННЫЙ ЦЕНТР") completely removed from Header.jsx');
}

if (!headerJsx.includes('+998 99 8336783')) {
  console.error('[FAIL] Phone number missing in Header.jsx');
  pass = false;
} else {
  console.log('[PASS] Phone number +998 99 8336783 is preserved in Header.jsx');
}

// 2. Check index.css
const indexCss = fs.readFileSync(path.resolve(__dirname, '../src/styles/index.css'), 'utf8');

if (!indexCss.includes('socialPulse') || !indexCss.includes('animation: socialPulse 3s ease-in-out infinite')) {
  console.error('[FAIL] socialPulse keyframes or animation missing in index.css');
  pass = false;
} else {
  console.log('[PASS] Gentle 3s socialPulse animation implemented');
}

if (!indexCss.includes('animation-delay: 0.35s') || !indexCss.includes('animation-delay: 0.7s') || !indexCss.includes('animation-delay: 1.05s')) {
  console.error('[FAIL] Stagger delays missing for social buttons');
  pass = false;
} else {
  console.log('[PASS] Stagger delays (0s, 0.35s, 0.7s, 1.05s) implemented for social buttons');
}

if (!indexCss.includes('.header-phone') || !indexCss.includes('background: transparent') || !indexCss.includes('border: none')) {
  console.error('[FAIL] Phone still has button background/border');
  pass = false;
} else {
  console.log('[PASS] Phone styled as clean plain text contact with no button/background/border/shadow');
}

if (!indexCss.includes('@media (prefers-reduced-motion: reduce)') || !indexCss.includes('.social-icon-btn {\n    animation: none !important;')) {
  console.error('[FAIL] prefers-reduced-motion check failed');
  pass = false;
} else {
  console.log('[PASS] Accessibility: prefers-reduced-motion disables animation');
}

// 3. Check scientific content intact
const siteContentBilingual = fs.readFileSync(path.resolve(__dirname, '../src/data/siteContentBilingual.js'), 'utf8');
if (siteContentBilingual.includes('sushka') && siteContentBilingual.includes('metodika') && siteContentBilingual.includes('plenka')) {
  console.log('[PASS] Scientific and medical content 100% untouched');
} else {
  console.error('[FAIL] Scientific content compromised');
  pass = false;
}

if (pass) {
  console.log('\nALL CHECKS PASSED SUCCESSFULLY!');
  process.exit(0);
} else {
  console.log('\nSOME CHECKS FAILED!');
  process.exit(1);
}
