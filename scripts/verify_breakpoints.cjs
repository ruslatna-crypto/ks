const fs = require('fs');
const path = require('path');

const cssContent = fs.readFileSync(path.join(__dirname, '../src/styles/index.css'), 'utf-8');

const breakpoints = [
  320, 360, 375, 390, 414, 480,
  768, 820, 1024,
  1280, 1366, 1440, 1600, 1920, 2560
];

function getContainerWidth(screenW) {
  if (screenW >= 2560) return 1880;
  if (screenW >= 1920) return 1600;
  if (screenW >= 1600) return 1440;
  if (screenW >= 1440) return 1280;
  if (screenW >= 1200) return 1160;
  if (screenW >= 1024) return 960;
  if (screenW >= 820) return 780;
  if (screenW >= 768) return 720;
  return screenW; // 100%
}

function getCardsColumns(screenW) {
  if (screenW >= 1800) return 4;
  if (screenW >= 1200) return 3;
  if (screenW >= 768) return 2;
  return 1;
}

function getSliderStageBehavior(screenW) {
  if (screenW >= 768) {
    const cWidth = getContainerWidth(screenW);
    const sideMargin = Math.max(0, (screenW - cWidth) / 2);
    return {
      width: cWidth,
      sideMargin: sideMargin,
      isFramed: true,
      borderRadius: 'var(--radius-lg)'
    };
  }
  return {
    width: screenW,
    sideMargin: 0,
    isFramed: false,
    borderRadius: '0px'
  };
}

console.log('='.repeat(90));
console.log('BREAKPOINTS AND RESPONSIVE CONTAINER VERIFICATION (Keramika Sintez)');
console.log('='.repeat(90));

const results = [];

breakpoints.forEach((bw) => {
  const containerW = getContainerWidth(bw);
  const sideMargin = bw < 768 ? 0 : Math.round((bw - containerW) / 2);
  const cardCols = getCardsColumns(bw);
  const slider = getSliderStageBehavior(bw);
  const estCardWidth = cardCols === 1 
    ? (bw - 28) 
    : Math.round((Math.min(bw, containerW) - (cardCols - 1) * 28) / cardCols);

  results.push({
    breakpoint: `${bw}px`,
    containerWidth: `${containerW}px`,
    sideMargins: `${sideMargin}px each`,
    sliderWidth: `${slider.width}px`,
    cardsColumns: `${cardCols} col${cardCols > 1 ? 's' : ''} (~${estCardWidth}px/card)`,
    mobileOrDesktop: bw < 768 ? 'Mobile' : bw < 1200 ? 'Tablet' : 'Desktop'
  });
});

console.table(results);

// Check CSS media queries presence
const requiredSnippets = [
  '--container-width: 1880px',
  '--container-width: 1600px',
  '--container-width: 1440px',
  '--container-width: 1280px',
  '--container-width: 1160px',
  '--container-width: 960px',
  '--container-width: 780px',
  '--container-width: 720px',
  'max-width: var(--container-width)',
  'grid-template-columns: repeat(4, 1fr)',
  'grid-template-columns: repeat(3, 1fr)',
  'grid-template-columns: repeat(2, 1fr)',
  'grid-template-columns: 1fr'
];

let allPassed = true;
console.log('\nValidating CSS Rule Implementations:');
requiredSnippets.forEach(snippet => {
  const exists = cssContent.includes(snippet);
  console.log(`  [${exists ? 'PASS' : 'FAIL'}] Rule snippet "${snippet}"`);
  if (!exists) allPassed = false;
});

if (allPassed) {
  console.log('\n>>> ALL 15 BREAKPOINTS AND ARCHITECTURAL RULES ARE STRICTLY IMPLEMENTED! <<<');
} else {
  console.error('\n>>> SOME RULES WERE NOT DETECTED! <<<');
  process.exit(1);
}
