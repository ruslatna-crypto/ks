/**
 * Image Language Localization Utility
 * Project: ООО «KERAMIKA SINTEZ»
 * 
 * Rules:
 * function getLocalizedImage(image, language)
 * - RU: always uses original image.
 * - EN: checks if corresponding _eng file exists.
 *   - If exists -> returns _eng version.
 *   - If does not exist -> returns original file.
 * Common files without _eng are shared between RU and EN.
 */

// Set of all available _eng image file paths in the public directory
export const KNOWN_ENG_IMAGES = new Set([
  // Plenka images
  '/images/plenka/plenka-three-layers_eng.jpg',
  '/images/plenka/plenka-three-layers_eng.png',
  '/images/plenka/plenka-cascade-mechanism_eng.jpg',
  '/images/plenka/plenka-cascade-mechanism_eng.png',
  '/images/plenka/plenka-spectrum-photosynthesis_eng.png',
  '/images/plenka/plenka-plant-impact_eng.jpg',
  '/images/plenka/plenka-plant-impact_eng.png',
  '/images/plenka/plenka-temperature-stabilization_eng.jpg',
  '/images/plenka/plenka-temperature-stabilization_eng.png',
  '/images/plenka/plenka-summary-scheme_eng.png',
  '/images/plenka/ChatGPT Image 15 сент. 2026 г., 18_47_21_eng.png',
  '/images/plenka/ChatGPT Image 15 сент. 2026 г., 18_05_58_eng.png',
  '/images/plenka/30f0f937-7a9d-4c38-abe0-044d54dbaeb9_eng.png',
  '/images/plenka/3c8f77fb-b444-4e56-99d6-b81c7b6caf7b_eng.png',
  '/images/plenka/4de4266e-706b-4aa4-a48b-61c264ada51b_eng.png',
  '/images/plenka/bb3f4bcc-1ef0-4b87-9a9b-0e4ca60d8579_eng.png',
  '/images/plenka/cde5a0d7-1ce1-4329-9c61-45b379d8358c_eng.png',

  // Sushka vremya-sushki & preimushestva
  '/images/sushka/vremya-sushki_eng.jpg',
  '/images/sushka/vremya-sushki_eng.png',
  '/images/sushka/1de59e86-ef6a-4bf7-90a6-9c70c82d6c29_eng.png',
  '/images/sushka/preimushestva_eng.jpg',
  '/images/sushka/preimushestva_eng.png',

  // Steril principle image
  '/images/steril/princ_eng.png',

  // Sushka infographics graphs
  '/images/sushka/infographics/arahis_eng.png',
  '/images/sushka/infographics/banan_eng.png',
  '/images/sushka/infographics/frukt_eng.png',
  '/images/sushka/infographics/graph_morkov_eng.png',
  '/images/sushka/infographics/kukuruza_eng.png',
  '/images/sushka/infographics/makaron_eng.png',
  '/images/sushka/infographics/mango_eng.png',
  '/images/sushka/arahis_eng.png',
  '/images/sushka/banan_eng.png',
  '/images/sushka/frukt_eng.png',
  '/images/sushka/graph_morkov_eng.png',
  '/images/sushka/kukuruza_eng.png',
  '/images/sushka/makaron_eng.png',
  '/images/sushka/mango_eng.png'
]);

/**
 * Resolves localized image path based on target language.
 * @param {string} image - Path to the image (e.g. '/images/plenka/plenka-three-layers.jpg')
 * @param {string} language - Target language code ('ru' or 'en')
 * @returns {string} Localized image path
 */
export function getLocalizedImage(image, language = 'ru') {
  if (!image || typeof image !== 'string') return image;
  if (language !== 'en') return image;

  const queryIndex = image.indexOf('?');
  const query = queryIndex !== -1 ? image.slice(queryIndex) : '';
  const cleanPath = queryIndex !== -1 ? image.slice(0, queryIndex) : image;

  // If image already has _eng, return as is
  if (cleanPath.includes('_eng.')) return image;

  const lastDot = cleanPath.lastIndexOf('.');
  if (lastDot === -1) return image;

  const basePath = cleanPath.slice(0, lastDot);
  const ext = cleanPath.slice(lastDot);

  // 1. Candidate with identical extension: photo.png -> photo_eng.png
  const candidateSameExt = `${basePath}_eng${ext}`;
  if (KNOWN_ENG_IMAGES.has(candidateSameExt)) {
    return `${candidateSameExt}${query}`;
  }

  // 2. Candidate with cross extension (.jpg <-> .png)
  const isJpg = ext.toLowerCase() === '.jpg' || ext.toLowerCase() === '.jpeg';
  const altExt = isJpg ? '.png' : '.jpg';
  const candidateAltExt = `${basePath}_eng${altExt}`;
  if (KNOWN_ENG_IMAGES.has(candidateAltExt)) {
    return `${candidateAltExt}${query}`;
  }

  // 3. Fallback to original image if no _eng exists
  return image;
}

export default getLocalizedImage;
