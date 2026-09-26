import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, ArrowRight } from 'lucide-react';
import siteData from '../data/siteContent';

const SearchModal = ({ isOpen, onClose }) => {
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

    const q = query.toLowerCase();
    const hits = [];

    siteData.forEach((page) => {
      let score = 0;
      let snippet = '';

      if (page.title.toLowerCase().includes(q)) {
        score += 10;
        snippet = page.title;
      }

      // Search in sections and paragraphs
      for (const sec of page.sections || []) {
        if (sec.title && sec.title.toLowerCase().includes(q)) {
          score += 5;
          if (!snippet) snippet = sec.title;
        }
        for (const p of sec.paragraphs || []) {
          const idx = p.toLowerCase().indexOf(q);
          if (idx !== -1) {
            score += 2;
            if (!snippet) {
              const start = Math.max(0, idx - 40);
              const end = Math.min(p.length, idx + 100);
              snippet = (start > 0 ? '...' : '') + p.substring(start, end) + (end < p.length ? '...' : '');
            }
          }
        }
      }

      // Search in tables
      for (const tbl of page.tables || []) {
        for (const row of tbl) {
          for (const cell of row) {
            if (cell.toLowerCase().includes(q)) {
              score += 2;
              if (!snippet) snippet = `В таблице: ${cell}`;
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
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <Search size={20} color="#64748b" />
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Введите запрос (например: сушка, лампа, спектр, вирус, эмаль)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
            }}
          />
          <button onClick={onClose} aria-label="Закрыть">
            <X size={20} color="#64748b" />
          </button>
        </div>

        <div className="search-results-list">
          {query.trim() && results.length === 0 && (
            <div style={{ padding: '30px 20px', textAlign: 'center', color: '#64748b' }}>
              По запросу «{query}» ничего не найдено. Попробуйте изменить формулировку.
            </div>
          )}

          {results.map(({ page, snippet }, idx) => (
            <div
              key={idx}
              className="search-result-item"
              role="button"
              onClick={() => {
                navigate(page.route);
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
              <strong>Популярные разделы:</strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                {['Сушка овощей и фруктов', 'Лечебные лампы', 'Стерилизация', 'Пленка для теплиц', 'Сушка краски', 'Клинические случаи'].map((tag, i) => (
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
