// Content Loader for Decap CMS static Git-based files
// Parses Markdown with YAML Front Matter and JSON data via Vite import.meta.glob

const rawMarkdownFiles = import.meta.glob('/content/**/*.md', { query: '?raw', import: 'default', eager: true });
const rawJsonFiles = import.meta.glob('/content/**/*.json', { query: '?raw', import: 'default', eager: true });

function parseFrontMatter(rawText) {
  if (!rawText || !rawText.startsWith('---')) {
    return { data: {}, content: (rawText || '').trim() };
  }
  const endIdx = rawText.indexOf('\n---', 3);
  if (endIdx === -1) {
    return { data: {}, content: rawText.trim() };
  }
  const yamlBlock = rawText.slice(3, endIdx).trim();
  const content = rawText.slice(endIdx + 4).trim();
  const data = {};

  yamlBlock.split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    } else if (val === 'true') {
      val = true;
    } else if (val === 'false') {
      val = false;
    }
    data[key] = val;
  });

  return { data, content };
}

// 1. Get News items
export function getNews(lang = 'ru') {
  const targetPrefix = `/content/${lang}/news/`;
  const items = [];

  for (const [path, raw] of Object.entries(rawMarkdownFiles)) {
    if (path.startsWith(targetPrefix)) {
      const { data, content } = parseFrontMatter(raw);
      if (data.published !== false) {
        const fileSlug = path.replace(targetPrefix, '').replace(/\.md$/, '');
        items.push({
          ...data,
          content,
          path,
          fileSlug,
          slug: data.slug || fileSlug
        });
      }
    }
  }

  // Sort by date descending
  return items.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
}

export function getNewsBySlug(rawSlug, lang = 'ru') {
  if (!rawSlug) return undefined;
  const decoded = decodeURIComponent(rawSlug).trim().toLowerCase();
  const all = getNews(lang);
  return all.find(item => {
    const itemSlug = decodeURIComponent(item.slug || '').trim().toLowerCase();
    const itemFileSlug = decodeURIComponent(item.fileSlug || '').trim().toLowerCase();
    return itemSlug === decoded || itemFileSlug === decoded;
  });
}

// 2. Get Articles items
export function getArticles(lang = 'ru') {
  const targetPrefix = `/content/${lang}/articles/`;
  const items = [];

  for (const [path, raw] of Object.entries(rawMarkdownFiles)) {
    if (path.startsWith(targetPrefix)) {
      const { data, content } = parseFrontMatter(raw);
      if (data.published !== false) {
        const fileSlug = path.replace(targetPrefix, '').replace(/\.md$/, '');
        items.push({
          ...data,
          content,
          path,
          fileSlug,
          slug: data.slug || fileSlug
        });
      }
    }
  }

  // Sort by date descending
  return items.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
}

export function getArticleBySlug(rawSlug, lang = 'ru') {
  if (!rawSlug) return undefined;
  const decoded = decodeURIComponent(rawSlug).trim().toLowerCase();
  const all = getArticles(lang);
  return all.find(item => {
    const itemSlug = decodeURIComponent(item.slug || '').trim().toLowerCase();
    const itemFileSlug = decodeURIComponent(item.fileSlug || '').trim().toLowerCase();
    return itemSlug === decoded || itemFileSlug === decoded;
  });
}

// 3. Get Structured JSON settings
export function getSiteSettings() {
  for (const [path, raw] of Object.entries(rawJsonFiles)) {
    if (path.includes('site.json')) {
      try { return JSON.parse(raw); } catch (e) { return {}; }
    }
  }
  return {};
}

export function getContacts() {
  for (const [path, raw] of Object.entries(rawJsonFiles)) {
    if (path.includes('contacts.json')) {
      try { return JSON.parse(raw); } catch (e) { return {}; }
    }
  }
  return {};
}

export function getNavigation() {
  for (const [path, raw] of Object.entries(rawJsonFiles)) {
    if (path.includes('navigation.json')) {
      try { return JSON.parse(raw); } catch (e) { return {}; }
    }
  }
  return {};
}
