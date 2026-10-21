import React from 'react';
import { Search, X } from 'lucide-react';

export default function ClinicalSearchBar({ searchTerm, onSearchChange, lang = 'ru' }) {
  const placeholder = lang === 'en'
    ? 'Search by diagnosis, case name, symptoms, emitter (e.g. KL, RC), patient or keywords...'
    : 'Поиск по диагнозу, названию, симптомам, излучателю (напр. KL, RC), пациенту или словам...';

  return (
    <div className="clinical-search-wrapper">
      <Search className="clinical-search-icon-left" size={20} />
      <input
        type="text"
        className="clinical-search-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label={placeholder}
      />
      {searchTerm && (
        <button
          className="clinical-search-clear-btn"
          onClick={() => onSearchChange('')}
          title={lang === 'en' ? 'Clear search' : 'Очистить поиск'}
          aria-label={lang === 'en' ? 'Clear search' : 'Очистить'}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
