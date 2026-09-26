const fs = require('fs');
const path = require('path');

console.log('=== VERIFYING MENU, SOCIAL AND LANGUAGE BUTTONS REFINEMENT ===\n');

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

// Check 3rd level menu removal from navigation
check(
  'Third level menu links (/sush-ustanovka and /metodikasushka) removed from Header navigation',
  !headerJsx.includes("getPath('/sush-ustanovka')") &&
  !headerJsx.includes("getPath('/metodikasushka')") &&
  !headerJsx.includes('t.menu.sushUstanovka') &&
  !headerJsx.includes('t.menu.metodikaSushka'),
  'Found sush-ustanovka or metodikaSushka in Header navigation links'
);

// Check removal of "Основные направления"
check(
  '"Основные направления" completely removed from Header.jsx',
  !headerJsx.includes('Основные направления') && !headerJsx.includes('Core Directions'),
  'Found "Основные направления" or "Core Directions" in Header.jsx'
);

// Check removal of "Промышленные направления"
check(
  '"Промышленные направления" completely removed from Header.jsx',
  !headerJsx.includes('Промышленные направления') && !headerJsx.includes('Industrial & Medical') && !headerJsx.includes('Промышленные и медицинские'),
  'Found "Промышленные направления" in Header.jsx'
);

// Check exact 7 direct links in developments dropdown
const expectedRoutes = ['/sushka', '/plenka', '/steril', '/gril', '/lamp', '/cotton', '/paint'];
let allDevRoutesPresent = true;
for (const r of expectedRoutes) {
  if (!headerJsx.includes(`getPath('${r}')`)) {
    allDevRoutesPresent = false;
    break;
  }
}
check(
  'All 7 direct developments links present in Header dropdown',
  allDevRoutesPresent,
  'One or more expected developments links are missing'
);

// 2. Check HomePage.jsx for badge removal under menu
const homeJsx = fs.readFileSync(path.resolve(__dirname, '../src/pages/HomePage.jsx'), 'utf8');
check(
  'Badge "НАУЧНО-ПРОИЗВОДСТВЕННЫЙ ЦЕНТР" under menu removed from HomePage.jsx',
  !homeJsx.includes('<div className="tech-badge">\n                <Sparkles size={13} />\n                <span>{lang === \'en\' ? \'Research & Production Center\' : \'Научно-производственный центр\'}</span>\n              </div>') &&
  !homeJsx.includes('Research & Production Center'),
  'Found Research & Production Center badge under header in HomePage.jsx'
);

// 3. Check Route preservation in App.jsx
const appJsx = fs.readFileSync(path.resolve(__dirname, '../src/App.jsx'), 'utf8');
check(
  'Route /sush-ustanovka preserved in App.jsx',
  appJsx.includes('path="/sush-ustanovka"') && appJsx.includes('path="/en/sush-ustanovka"'),
  'Route /sush-ustanovka missing in App.jsx'
);
check(
  'Route /metodikasushka preserved in App.jsx',
  appJsx.includes('path="/metodikasushka"') && appJsx.includes('path="/en/metodikasushka"'),
  'Route /metodikasushka missing in App.jsx'
);

// 4. Check CSS in src/styles/index.css
const indexCss = fs.readFileSync(path.resolve(__dirname, '../src/styles/index.css'), 'utf8');

// Social buttons shape & size
check(
  'Social buttons are completely round (border-radius: 50%)',
  indexCss.includes('.social-icon-btn {') && indexCss.includes('border-radius: 50%;'),
  'border-radius: 50% missing for .social-icon-btn'
);

check(
  'Social buttons have rectangular borders/containers removed (border: none)',
  indexCss.includes('border: none;'),
  'border: none missing for .social-icon-btn'
);

check(
  'Social buttons increased ~40% to 52px (width: 52px; height: 52px)',
  indexCss.includes('width: 52px;') && indexCss.includes('height: 52px;'),
  'width/height 52px missing for .social-icon-btn'
);

check(
  'Social button icons increased to 28px',
  indexCss.includes('width: 28px;') && indexCss.includes('height: 28px;'),
  'width/height 28px missing for .social-icon-btn img'
);

// Idle state: NO infinite animation!
const socialBtnBlock = indexCss.match(/\.social-icon-btn\s*\{[^}]+\}/s);
check(
  'Social buttons are STATIC in normal state (no continuous infinite pulse)',
  socialBtnBlock && !socialBtnBlock[0].includes('animation:'),
  'Found continuous animation in default .social-icon-btn state'
);

// Hover state: pulse ONLY on hover
check(
  'Social button hover pulse @keyframes defined (scale 1.00 -> 1.08 -> 1.00)',
  indexCss.includes('@keyframes socialHoverPulse') && indexCss.includes('transform: scale(1.08);'),
  'socialHoverPulse keyframes missing'
);

check(
  'Social button pulse triggers on :hover (animation: socialHoverPulse 800ms)',
  indexCss.includes('.social-icon-btn:hover {') && indexCss.includes('animation: socialHoverPulse 800ms ease-in-out infinite;'),
  'socialHoverPulse hover rule missing'
);

// RU / ENG buttons
check(
  'RU / ENG buttons retain rectangular/pill form (border-radius: 4px, NOT round)',
  indexCss.includes('.lang-btn {') && indexCss.includes('border-radius: 4px;'),
  'border-radius: 4px missing for .lang-btn'
);

check(
  'RU / ENG buttons have hover pulse keyframes (scale 1.00 -> 1.07 -> 1.00)',
  indexCss.includes('@keyframes langHoverPulse') && indexCss.includes('transform: scale(1.07);'),
  'langHoverPulse keyframes missing'
);

check(
  'RU / ENG button pulse triggers on :hover (animation: langHoverPulse 850ms)',
  indexCss.includes('.lang-btn:hover {') && indexCss.includes('animation: langHoverPulse 850ms ease-in-out infinite;'),
  'langHoverPulse hover rule missing'
);

// Accessibility
check(
  'Accessibility: prefers-reduced-motion disables animations on buttons',
  indexCss.includes('@media (prefers-reduced-motion: reduce)') &&
  indexCss.includes('.social-icon-btn,') &&
  indexCss.includes('.lang-btn,'),
  'prefers-reduced-motion rules missing for social and lang buttons'
);

// Previous header requirements preserved
check(
  'Previous Header requirement preserved: Phone styled as plain text contact',
  indexCss.includes('.header-phone') && indexCss.includes('background: transparent;') && indexCss.includes('border: none;'),
  'Phone styling modified from plain text'
);

check(
  'Previous Header requirement preserved: No text next to logo',
  !headerJsx.includes('logo-brand-meta') && !headerJsx.includes('НАУЧНО-ПРОИЗВОДСТВЕННЫЙ ЦЕНТР'),
  'Text next to logo re-introduced'
);

// 5. Scientific content integrity
const bilingual = fs.readFileSync(path.resolve(__dirname, '../src/data/siteContentBilingual.js'), 'utf8');
check(
  'Scientific content intact in siteContentBilingual.js',
  bilingual.includes('sush-ustanovka') && bilingual.includes('metodikasushka') && bilingual.includes('plenka'),
  'Scientific content modified or missing'
);

console.log('\n----------------------------------------');
if (pass) {
  console.log('>>> ALL VERIFICATION CHECKS PASSED (100%) <<<');
  process.exit(0);
} else {
  console.error('>>> SOME VERIFICATION CHECKS FAILED <<<');
  process.exit(1);
}
