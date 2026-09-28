import { getLocalizedImage, KNOWN_ENG_IMAGES } from '../src/utils/imageLocalization.js';
import fs from 'fs';
import path from 'path';

console.log('Testing imageLocalization...');
console.log('Known _eng images count:', KNOWN_ENG_IMAGES.size);

const testCases = [
  // Plenka
  { src: '/images/plenka/plenka-hero.png', ru: '/images/plenka/plenka-hero.png', en: '/images/plenka/plenka-hero.png' },
  { src: '/images/plenka/plenka-three-layers.jpg', ru: '/images/plenka/plenka-three-layers.jpg', en: '/images/plenka/plenka-three-layers_eng.jpg' },
  { src: '/images/plenka/plenka-cascade-mechanism.jpg', ru: '/images/plenka/plenka-cascade-mechanism.jpg', en: '/images/plenka/plenka-cascade-mechanism_eng.jpg' },
  { src: '/images/plenka/plenka-spectrum-photosynthesis.png', ru: '/images/plenka/plenka-spectrum-photosynthesis.png', en: '/images/plenka/plenka-spectrum-photosynthesis_eng.png' },
  { src: '/images/plenka/plenka-plant-impact.jpg', ru: '/images/plenka/plenka-plant-impact.jpg', en: '/images/plenka/plenka-plant-impact_eng.jpg' },
  { src: '/images/plenka/plenka-temperature-stabilization.jpg', ru: '/images/plenka/plenka-temperature-stabilization.jpg', en: '/images/plenka/plenka-temperature-stabilization_eng.jpg' },
  { src: '/images/plenka/plenka-summary-scheme.png', ru: '/images/plenka/plenka-summary-scheme.png', en: '/images/plenka/plenka-summary-scheme_eng.png' },
  
  // Sushka
  { src: '/images/sushka/uzbekistan-3.jpg', ru: '/images/sushka/uzbekistan-3.jpg', en: '/images/sushka/uzbekistan-3.jpg' },
  { src: '/images/sushka/vremya-sushki.jpg', ru: '/images/sushka/vremya-sushki.jpg', en: '/images/sushka/vremya-sushki_eng.jpg' },
  { src: '/images/sushka/preimushestva.jpg', ru: '/images/sushka/preimushestva.jpg', en: '/images/sushka/preimushestva_eng.jpg' },
  { src: '/images/sushka/infographics/arahis.png', ru: '/images/sushka/infographics/arahis.png', en: '/images/sushka/infographics/arahis_eng.png' },
  { src: '/images/sushka/infographics/banan.png', ru: '/images/sushka/infographics/banan.png', en: '/images/sushka/infographics/banan_eng.png' },
  { src: '/images/sushka/infographics/frukt.png', ru: '/images/sushka/infographics/frukt.png', en: '/images/sushka/infographics/frukt_eng.png' },
  { src: '/images/sushka/infographics/graph_morkov.png', ru: '/images/sushka/infographics/graph_morkov.png', en: '/images/sushka/infographics/graph_morkov_eng.png' },
  { src: '/images/sushka/infographics/kukuruza.png', ru: '/images/sushka/infographics/kukuruza.png', en: '/images/sushka/infographics/kukuruza_eng.png' },
  { src: '/images/sushka/infographics/makaron.png', ru: '/images/sushka/infographics/makaron.png', en: '/images/sushka/infographics/makaron_eng.png' },
  { src: '/images/sushka/infographics/mango.png', ru: '/images/sushka/infographics/mango.png', en: '/images/sushka/infographics/mango_eng.png' }
];

let passed = 0;
for (const tc of testCases) {
  const resRu = getLocalizedImage(tc.src, 'ru');
  const resEn = getLocalizedImage(tc.src, 'en');
  const ruOk = resRu === tc.ru;
  const enOk = resEn === tc.en;
  
  // Also check that physical file exists in public/
  const fileRu = path.join('public', resRu.replace(/^\//, ''));
  const fileEn = path.join('public', resEn.replace(/^\//, ''));
  const existsRu = fs.existsSync(fileRu);
  const existsEn = fs.existsSync(fileEn);

  if (ruOk && enOk && existsRu && existsEn) {
    passed++;
    console.log(`[PASS] ${tc.src}`);
    console.log(`       RU -> ${resRu} (exists: ${existsRu})`);
    console.log(`       EN -> ${resEn} (exists: ${existsEn})`);
  } else {
    console.error(`[FAIL] ${tc.src}`);
    console.error(`       RU -> got ${resRu} (expected ${tc.ru}, fileExists: ${existsRu})`);
    console.error(`       EN -> got ${resEn} (expected ${tc.en}, fileExists: ${existsEn})`);
  }
}

console.log(`\nVerification finished: ${passed} / ${testCases.length} PASS`);
if (passed === testCases.length) {
  process.exit(0);
} else {
  process.exit(1);
}
