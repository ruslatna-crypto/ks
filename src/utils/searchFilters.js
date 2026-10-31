/**
 * Unified search filter rules and dataset loader for INFRAKS.UZ
 * Excludes removed sections and unneeded routes from all search components:
 * - SearchModal.jsx (Quick modal search)
 * - Header.jsx (Inline header search)
 * - SearchPage.jsx (Full search page)
 */

import siteData from '../data/siteContent.js';
import { siteDataBilingual } from '../data/siteContentBilingual.js';

export const EXCLUDED_SEARCH_ROUTES = new Set([
  '/sush-ustanovka',
  '/metodikasushka',
  '/virus',
  '/articles',
  '/news',
  '/metodika',
  '/lekcii',
  '/en/sush-ustanovka',
  '/en/metodikasushka',
  '/en/virus',
  '/en/articles',
  '/en/news',
  '/en/metodika',
  '/en/lekcii'
]);

export const EXCLUDED_SEARCH_IDS = new Set([
  'sush-ustanovka',
  'metodikasushka',
  'virus',
  'articles',
  'news',
  'metodika',
  'lekcii'
]);

/**
 * Validates whether a page object is permitted in search results.
 * @param {Object} page - Page object containing id, route, title, etc.
 * @returns {boolean} True if page is active; false if it belongs to removed sections.
 */
export function isSearchRouteAllowed(page) {
  if (!page) return false;

  if (page.id && EXCLUDED_SEARCH_IDS.has(page.id)) {
    return false;
  }

  if (page.route) {
    if (EXCLUDED_SEARCH_ROUTES.has(page.route)) {
      return false;
    }

    const cleanRoute = page.route.replace(/^\/en/, '');
    if (EXCLUDED_SEARCH_ROUTES.has(cleanRoute)) {
      return false;
    }

    const cleanId = cleanRoute.replace(/^\//, '');
    if (EXCLUDED_SEARCH_IDS.has(cleanId)) {
      return false;
    }
  }

  return true;
}

/**
 * Returns filtered search dataset based on current active language.
 * @param {string} lang - 'ru' or 'en'
 * @returns {Array} Array of allowed search item objects.
 */
export function getSearchDataset(lang = 'ru') {
  if (lang === 'en') {
    return Object.values(siteDataBilingual)
      .filter(isSearchRouteAllowed)
      .map((entry) => ({
        id: entry.id,
        route: entry.en?.route || (entry.id === 'home' ? '/en' : `/en/${entry.id}`),
        title: entry.en?.title || entry.ru?.title || '',
        sections: entry.en?.sections || [],
        tables: entry.en?.tables || []
      }));
  }

  return siteData.filter(isSearchRouteAllowed);
}

/**
 * Normalizes text for search indexing and matching.
 * Replaces 'ё' with 'е' and trims whitespace.
 */
export function normalizeSearchText(str) {
  return (str || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .trim();
}

/**
 * Generates search stem variants for morphological tolerance in queries.
 */
export function getQueryStems(query) {
  const norm = normalizeSearchText(query);
  const stems = [norm];

  if (norm.length >= 5) {
    if (norm.endsWith('ка') || norm.endsWith('ки') || norm.endsWith('ку') || norm.endsWith('ке')) {
      stems.push(norm.slice(0, -1)); // краск, сушк, пленк
    } else if (norm.endsWith('ок')) {
      stems.push(norm.slice(0, -2) + 'к'); // хлопок -> хлопк
      stems.push(norm.slice(0, -2));       // хлопок -> хлоп
    } else if (norm.endsWith('а') || norm.endsWith('ы') || norm.endsWith('е') || norm.endsWith('и') || norm.endsWith('о')) {
      stems.push(norm.slice(0, -1));
    }
  }

  return [...new Set(stems)];
}
