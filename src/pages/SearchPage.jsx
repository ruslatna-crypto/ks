import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { Search, FileText, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getSearchDataset, normalizeSearchText, getQueryStems } from '../utils/searchFilters';

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
  }, [searchParams, lang]);

  const performSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const stems = getQueryStems(searchTerm);
    const hits = [];
    const dataset = getSearchDataset(lang);

    dataset.forEach((page) => {
      let score = 0;
      let matchedSnippets = [];

      const normTitle = normalizeSearchText(page.title);
      for (const stem of stems) {
        if (normTitle.includes(stem)) {
          score += stem === stems[0] ? 15 : 10;
        }
      }

      for (const sec of page.sections || []) {
        const normSecTitle = normalizeSearchText(sec.title);
        for (const stem of stems) {
          if (normSecTitle.includes(stem)) {
            score += 6;
            matchedSnippets.push(sec.title);
          }
        }
        for (const p of sec.paragraphs || []) {
          const normP = normalizeSearchText(p);
          for (const stem of stems) {
            const idx = normP.indexOf(stem);
            if (idx !== -1) {
              score += 3;
              const start = Math.max(0, idx - 60);
              const end = Math.min(p.length, idx + 140);
              const snip = (start > 0 ? '...' : '') + p.substring(start, end) + (end < p.length ? '...' : '');
              matchedSnippets.push(snip);
            }
          }
        }
      }

      for (const tbl of page.tables || []) {
        for (const row of tbl) {
          for (const cell of row) {
            const normCell = normalizeSearchText(cell);
            for (const stem of stems) {
              if (normCell.includes(stem)) {
                score += 2;
                matchedSnippets.push(`${lang === 'en' ? 'In table:' : 'В таблице:'} ${cell}`);
              }
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
    if (lang === 'en') {
      if (route === '/cotton' || route === '/hlopok') return '/en/cotton';
      return route.startsWith('/en') ? route : `/en${route}`;
    }
    return route;
  };

  return (
    <div className="page-wrap">
      <SEO
        title={lang === 'en' ? 'Search Materials' : 'Поиск по материалам'}
        description={lang === 'en'
          ? 'Search scientific developments and clinical lectures across the KERAMIKA SINTEZ portal.'
          : 'Поиск по научно-техническим разработкам и клиническим лекциям портала KERAMIKA SINTEZ.'}
        canonicalPath={lang === 'en' ? '/en/search' : '/search'}
        ruPath="/search"
        enPath="/en/search"
        lang={lang}
        noindex={true}
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
                id="search-page-input"
                name="q"
                type="text"
                aria-label={lang === 'en' ? 'Search scientific materials' : 'Поиск по материалам сайта'}
                className="search-input-field"
                style={{ paddingLeft: 46, fontSize: '1.02rem', height: 48 }}
                placeholder={lang === 'en' 
                  ? 'Enter keywords (e.g., drying, film, lamp, spectrum, sterilization)...' 
                  : 'Введите ключевые слова (например: сушка, плёнка, лампа, спектр, стерилизация)...'}
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

              <h2 style={{ fontSize: '1.25rem', marginBottom: 12 }}>
                <Link to={getTargetRoute(page.route)} style={{ color: 'var(--color-text-heading)', textDecoration: 'none' }}>
                  {page.title}
                </Link>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {snippets.map((snip, sIdx) => (
                  <p key={sIdx} style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {snip}
                  </p>
                ))}
              </div>

              <div style={{ marginTop: 14, fontSize: '0.82rem', color: 'var(--color-primary)' }}>
                {page.route}
              </div>
            </div>
          ))}

          {query && results.length === 0 && (
            <div 
              style={{
                background: '#ffffff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '44px 20px',
                textAlign: 'center',
                color: 'var(--color-text-secondary)'
              }}
            >
              <p style={{ fontSize: '1.05rem', marginBottom: 8 }}>
                {lang === 'en'
                  ? `No results found for query «${query}».`
                  : `По запросу «${query}» ничего не найдено.`}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                {lang === 'en'
                  ? 'Try checking the spelling or using broader search terms (e.g., drying, ceramics, spectrum, sterilization).'
                  : 'Попробуйте изменить формулировку или использовать более общие слова (например: сушка, керамика, спектр, стерилизация).'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
