import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Breadcrumbs = ({ items = [] }) => {
  const { lang } = useLanguage();
  const homePath = lang === 'en' ? '/en' : '/';
  const homeText = lang === 'en' ? 'Home' : 'Главная';

  // Filter out any redundant 'Home'/'Главная' item if provided in items array, and ignore empty items
  const filteredItems = items.filter((item) => {
    const title = (item.title || item.label || '').trim();
    if (!title) return false;
    if ((item.path === '/' || item.path === '/en') && (title.toLowerCase() === 'главная' || title.toLowerCase() === 'home')) {
      return false;
    }
    return true;
  });

  return (
    <nav className="breadcrumbs" aria-label="Хлебные крошки">
      <Link to={homePath} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        <Home size={14} />
        <span>{homeText}</span>
      </Link>
      {filteredItems.map((item, index) => {
        const title = item.title || item.label;
        const isLast = index === filteredItems.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight size={13} color="var(--color-text-muted)" />
            {item.path && !isLast ? (
              <Link to={item.path}>{title}</Link>
            ) : (
              <span className="breadcrumbs-current">{title}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
