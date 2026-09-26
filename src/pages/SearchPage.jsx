import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import siteData from '../data/siteContent';
import { getNews, getArticles } from '../utils/contentLoader';
import { Search, FileText, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SearchPage = () => {
  const { lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const qParam = searchParams.get('q') || '';
    setQuery(qParam);
    performSearch(qParam);
  }, [searchParams]);

  const performSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const q = searchTerm.toLowerCase();
    const hits = [];

    siteData.forEach((page) => {
      let score = 0;
      let matchedSnippets = [];

      if (page.title.toLowerCase().includes(q)) {
        score += 15;
      }

      for (const sec of page.sections || []) {
        if (sec.title && sec.title.toLowerCase().includes(q)) {
          score += 6;
          matchedSnippets.push(sec.title);
        }
        for (const p of sec.paragraphs || []) {
          const idx = p.toLowerCase().indexOf(q);
          if (idx !== -1) {
            score += 3;
            const start = Math.max(0, idx - 60);
            const end = Math.min(p.length, idx + 140);
            const snip = (start > 0 ? '...' : '') + p.substring(start, end) + (end < p.length ? '...' : '');
            matchedSnippets.push(snip);
          }
        }
      }

      for (const tbl of page.tables || []) {
        for (const row of tbl) {
          for (const cell of row) {
            if (cell.toLowerCase().includes(q)) {
              score += 2;
              matchedSnippets.push(`${lang === 'en' ? 'In table:' : 'В таблице:'} ${cell}`);
            }
          }
        }
      }

      if (score > 0) {
        hits.push({
          page,
          score,
          snippets: matchedSnippets.slice(0, 2)
        });
      }
    });

    // 2. Search dynamic News items
    const newsItems = getNews(lang);
    newsItems.forEach((item) => {
      let score = 0;
      let matchedSnippets = [];
      if (item.title && item.title.toLowerCase().includes(q)) {
        score += 20;
      }
      if (item.excerpt && item.excerpt.toLowerCase().includes(q)) {
        score += 8;
        matchedSnippets.push(item.excerpt);
      }
      if (item.content) {
        const idx = item.content.toLowerCase().indexOf(q);
        if (idx !== -1) {
          score += 4;
          const start = Math.max(0, idx - 60);
          const end = Math.min(item.content.length, idx + 140);
          matchedSnippets.push((start > 0 ? '...' : '') + item.content.substring(start, end) + (end < item.content.length ? '...' : ''));
        }
      }
      if (score > 0) {
        hits.push({
          page: {
            title: item.title,
            route: lang === 'en' ? `/en/news/${item.slug}` : `/news/${item.slug}`,
            menu_section: lang === 'en' ? 'News' : 'Новости'
          },
          score,
          snippets: matchedSnippets.slice(0, 2)
        });
      }
    });

    // 3. Search dynamic Articles items
    const articleItems = getArticles(lang);
    articleItems.forEach((item) => {
      let score = 0;
      let matchedSnippets = [];
      if (item.title && item.title.toLowerCase().includes(q)) {
        score += 20;
      }
      if (item.excerpt && item.excerpt.toLowerCase().includes(q)) {
        score += 8;
        matchedSnippets.push(item.excerpt);
      }
      if (item.content) {
        const idx = item.content.toLowerCase().indexOf(q);
        if (idx !== -1) {
          score += 4;
          const start = Math.max(0, idx - 60);
          const end = Math.min(item.content.length, idx + 140);
          matchedSnippets.push((start > 0 ? '...' : '') + item.content.substring(start, end) + (end < item.content.length ? '...' : ''));
        }
      }
      if (score > 0) {
        hits.push({
          page: {
            title: item.title,
            route: lang === 'en' ? `/en/articles/${item.slug}` : `/articles/${item.slug}`,
            menu_section: lang === 'en' ? 'Articles' : 'Статьи'
          },
          score,
          snippets: matchedSnippets.slice(0, 2)
        });
      }
    });

    hits.sort((a, b) => b.score - a.score);
    setResults(hits);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  const breadcrumbs = [
    { title: lang === 'en' ? 'Site Search' : 'Поиск по сайту' }
  ];

  const getTargetRoute = (route) => {
    return lang === 'en' ? `/en${route}` : route;
  };

  return (
    <div className="page-wrap">
      <SEO
        title={lang === 'en' ? 'Search Materials' : 'Поиск по материалам'}
        description={lang === 'en'
          ? 'Search scientific developments, clinical lectures, publications and news across the KERAMIKA SINTEZ portal.'
          : 'Поиск по научно-техническим разработкам, клиническим лекциям, публикациям и новостям портала KERAMIKA SINTEZ.'}
        canonicalPath={lang === 'en' ? '/en/search' : '/search'}
        ruPath="/search"
        enPath="/en/search"
        lang={lang}
      />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
        
        <div style={{ marginBottom: 28 }}>
          <h1 className="page-title-heading">
            {lang === 'en' ? 'Search Scientific Materials' : 'Поиск по материалам сайта'}
          </h1>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleFormSubmit} style={{ margin: '24px 0 36px' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ position: 'relative', flexGrow: 1 }}>
              <input
                type="text"
                className="search-input-field"
                style={{ paddingLeft: 46, fontSize: '1.02rem', height: 48 }}
                placeholder={lang === 'en' 
                  ? 'Enter keywords (e.g., drying, film, lamp, spectrum, sterilization)...' 
                  : 'Введите ключевые слова (например: сушка, плёнка, лампа, спектр, полимеризация)...'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Search size={20} color="var(--color-text-muted)" style={{ position: 'absolute', left: 16, top: 14 }} />
            </div>
            <button type="submit" className="hero-btn-primary" style={{ padding: '0 26px', height: 48 }}>
              {lang === 'en' ? 'Search' : 'Найти'}
            </button>
          </div>
        </form>

        {/* Search Results */}
        {query && (
          <div style={{ marginBottom: 22, color: 'var(--color-text-secondary)', fontSize: '0.94rem' }}>
            {lang === 'en' ? (
              <>Found matches: <strong>{results.length}</strong> for query «{query}»</>
            ) : (
              <>Найдено совпадений: <strong>{results.length}</strong> по запросу «{query}»</>
            )}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {results.map(({ page, snippets }, idx) => (
            <div 
              key={idx} 
              style={{
                background: '#ffffff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '22px 26px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 10 }}>
                <Link to={getTargetRoute(page.route)} className="hero-btn-secondary" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                  <span>{lang === 'en' ? 'View' : 'Перейти'}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '6px 0 10px', color: 'var(--color-dark)' }}>
                <Link to={getTargetRoute(page.route)} style={{ color: 'inherit' }}>
                  {page.title}
                </Link>
              </h2>

              {snippets.map((snip, sIdx) => (
                <p key={sIdx} style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 6 }}>
                  {snip}
                </p>
              ))}
            </div>
          ))}

          {query && results.length === 0 && (
            <div style={{ padding: '60px 20px', textAlign: 'center', background: 'var(--color-background-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <FileText size={46} color="var(--color-text-muted)" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8, color: 'var(--color-dark)' }}>
                {lang === 'en' ? 'Nothing found' : 'Ничего не найдено'}
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', maxWidth: 440, margin: '0 auto', fontSize: '0.92rem' }}>
                {lang === 'en'
                  ? 'Try changing the wording, checking the spelling, or using broader terms (e.g., drying, lamp, film).'
                  : 'Попробуйте изменить формулировку, проверить написание или использовать более общие термины (например: сушка, лампа, плёнка).'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
