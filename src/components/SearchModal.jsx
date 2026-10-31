import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getSearchDataset, normalizeSearchText, getQueryStems } from '../utils/searchFilters';

const SearchModal = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const stems = getQueryStems(query);
    const hits = [];
    const dataset = getSearchDataset(lang);

    dataset.forEach((page) => {
      let score = 0;
      let snippet = '';

      const normTitle = normalizeSearchText(page.title);
      for (const stem of stems) {
        if (normTitle.includes(stem)) {
          score += stem === stems[0] ? 15 : 10;
          if (!snippet) snippet = page.title;
        }
      }

      // Search in sections and paragraphs
      for (const sec of page.sections || []) {
        const normSecTitle = normalizeSearchText(sec.title);
        for (const stem of stems) {
          if (normSecTitle.includes(stem)) {
            score += 6;
            if (!snippet) snippet = sec.title;
          }
        }
        for (const p of sec.paragraphs || []) {
          const normP = normalizeSearchText(p);
          for (const stem of stems) {
            const idx = normP.indexOf(stem);
            if (idx !== -1) {
              score += 3;
              if (!snippet) {
                const start = Math.max(0, idx - 40);
                const end = Math.min(p.length, idx + 100);
                snippet = (start > 0 ? '...' : '') + p.substring(start, end) + (end < p.length ? '...' : '');
              }
            }
          }
        }
      }

      // Search in tables
      for (const tbl of page.tables || []) {
        for (const row of tbl) {
          for (const cell of row) {
            const normCell = normalizeSearchText(cell);
            for (const stem of stems) {
              if (normCell.includes(stem)) {
                score += 2;
                if (!snippet) snippet = `${lang === 'en' ? 'In table:' : 'В таблице:'} ${cell}`;
              }
            }
          }
        }
      }

      if (score > 0) {
        hits.push({
          page,
          score,
          snippet: snippet || page.title
        });
      }
    });

    hits.sort((a, b) => b.score - a.score);
    setResults(hits);
  }, [query, lang]);

  const getTargetRoute = (route) => {
    if (lang === 'en') {
      if (route === '/cotton' || route === '/hlopok') return '/en/cotton';
      return route.startsWith('/en') ? route : `/en${route}`;
    }
    return route;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <Search size={20} color="#64748b" />
          <input
            ref={inputRef}
            type="text"
            aria-label={lang === 'en' ? 'Site search' : 'Поиск по сайту'}
            className="search-input"
            placeholder={lang === 'en'
              ? 'Enter search query (e.g.: drying, lamp, spectrum, sterilization, enamel)...'
              : 'Введите запрос (например: сушка, лампа, спектр, стерилизация, эмаль)...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
            }}
          />
          <button onClick={onClose} aria-label={lang === 'en' ? 'Close' : 'Закрыть'}>
            <X size={20} color="#64748b" />
          </button>
        </div>

        <div className="search-results-list">
          {query.trim() && results.length === 0 && (
            <div style={{ padding: '30px 20px', textAlign: 'center', color: '#64748b' }}>
              {lang === 'en'
                ? `No results found for «${query}». Please try different keywords.`
                : `По запросу «${query}» ничего не найдено. Попробуйте изменить формулировку.`}
            </div>
          )}

          {results.map(({ page, snippet }, idx) => (
            <div
              key={idx}
              className="search-result-item"
              role="button"
              onClick={() => {
                navigate(getTargetRoute(page.route));
                onClose();
              }}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="search-result-title">
                  <FileText size={15} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
                  {page.title}
                </span>
                <ArrowRight size={14} color="#0284c7" />
              </div>
              <p className="search-result-snippet">{snippet}</p>
            </div>
          ))}

          {!query.trim() && (
            <div style={{ padding: '24px 20px', color: '#94a3b8', fontSize: '0.9rem' }}>
              <strong>{lang === 'en' ? 'Popular sections:' : 'Популярные разделы:'}</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                {(lang === 'en'
                  ? ['Drying of vegetables and fruits', 'Therapeutic lamps', 'Sterilization', 'Greenhouse film', 'Paint drying', 'Clinical cases']
                  : ['Сушка овощей и фруктов', 'Лечебные лампы', 'Стерилизация', 'Пленка для теплиц', 'Сушка краски', 'Клинические случаи']
                ).map((tag, i) => (
                  <span
                    key={i}
                    onClick={() => setQuery(tag)}
                    style={{
                      padding: '4px 10px',
                      background: '#f1f5f9',
                      borderRadius: 14,
                      cursor: 'pointer',
                      color: '#334155'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
