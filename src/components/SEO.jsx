import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Universal SEO & Meta manager for ООО «KERAMIKA SINTEZ».
 * Dynamically updates document.title, description, canonical, hreflang, Open Graph and Twitter tags.
 */
export default function SEO({
  title,
  description,
  canonicalPath,
  ruPath,
  enPath,
  image = '/images/logo/logo1.svg',
  type = 'website',
  article = null,
  lang = 'ru'
}) {
  const location = useLocation();

  useEffect(() => {
    // 1. Determine site origin dynamically or from VITE_SITE_URL
    const origin = (typeof window !== 'undefined' && window.location && window.location.origin)
      ? window.location.origin
      : 'https://ks.vercel.app';

    // 2. Set document title
    const brandName = 'KERAMIKA SINTEZ';
    const fullTitle = title 
      ? `${title} | ${brandName}` 
      : `ООО «KERAMIKA SINTEZ» — Научно-производственный портал`;
    document.title = fullTitle;

    // Helper: update or create meta tag
    const setMeta = (attribute, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper: update or create link tag
    const setLink = (rel, href, hreflang) => {
      const selector = hreflang 
        ? `link[rel="${rel}"][hreflang="${hreflang}"]` 
        : `link[rel="${rel}"]:not([hreflang])`;
      let el = document.querySelector(selector);
      if (!href) {
        if (el) el.remove();
        return;
      }
      if (!el) {
        el = document.createElement('link');
        el.setAttribute(rel, rel);
        if (hreflang) el.setAttribute('hreflang', hreflang);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // 3. Meta description
    if (description) {
      setMeta('name', 'description', description);
    }

    // 4. Canonical URL
    const activePath = canonicalPath || location.pathname;
    const cleanCanonicalPath = activePath.startsWith('/') ? activePath : `/${activePath}`;
    const canonicalUrl = `${origin}${cleanCanonicalPath === '/' ? '' : cleanCanonicalPath}`;
    setLink('canonical', canonicalUrl);

    // 5. Hreflang alternate links (RU, EN, x-default)
    const effectiveRuPath = ruPath !== undefined 
      ? ruPath 
      : (activePath.startsWith('/en') ? activePath.replace(/^\/en/, '') || '/' : activePath);
    const effectiveEnPath = enPath !== undefined 
      ? enPath 
      : (activePath.startsWith('/en') ? activePath : `/en${activePath === '/' ? '' : activePath}`);

    if (effectiveRuPath) {
      const ruUrl = `${origin}${effectiveRuPath === '/' ? '' : effectiveRuPath}`;
      setLink('alternate', ruUrl, 'ru');
      setLink('alternate', ruUrl, 'x-default');
    }
    if (effectiveEnPath) {
      const enUrl = `${origin}${effectiveEnPath}`;
      setLink('alternate', enUrl, 'en');
    }

    // 6. Open Graph
    const absoluteImage = image.startsWith('http') ? image : `${origin}${image.startsWith('/') ? '' : '/'}${image}`;
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description || '');
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', absoluteImage);
    setMeta('property', 'og:site_name', 'KERAMIKA SINTEZ');
    setMeta('property', 'og:locale', lang === 'en' ? 'en_US' : 'ru_RU');

    // 7. Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description || '');
    setMeta('name', 'twitter:image', absoluteImage);

    // 8. Article specific metadata
    if (article && type === 'article') {
      if (article.date) setMeta('property', 'article:published_time', article.date);
      if (article.author) setMeta('property', 'article:author', article.author);
      if (article.category) setMeta('property', 'article:section', article.category);
    }

    // 9. Document lang attribute
    document.documentElement.lang = lang;

  }, [title, description, canonicalPath, ruPath, enPath, image, type, article, lang, location.pathname]);

  return null;
}
