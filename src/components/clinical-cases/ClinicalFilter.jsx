import React from 'react';

export default function ClinicalFilter({
  categories = [],
  selectedCategory = 'all',
  onSelectCategory,
  categoryCounts = {},
  lang = 'ru'
}) {
  return (
    <div className="clinical-filter-pills" role="tablist" aria-label={lang === 'en' ? 'Categories filter' : 'Фильтр по категориям'}>
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;
        const count = categoryCounts[cat.id] || 0;
        const label = lang === 'en' ? cat.en : cat.ru;

        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            className={`clinical-filter-pill ${isActive ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            <span>{label}</span>
            <span className="clinical-filter-pill-count">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
