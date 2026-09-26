import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Breadcrumbs = ({ items = [] }) => {
  const { lang } = useLanguage();
  const homePath = lang === 'en' ? '/en' : '/';
  const homeText = lang === 'en' ? 'Home' : 'Главная';

  return (
    <nav className="breadcrumbs" aria-label="Хлебные крошки">
      <Link to={homePath} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
        <Home size={14} />
        <span>{homeText}</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={13} color="var(--color-text-muted)" />
          {item.path ? (
            <Link to={item.path}>{item.title}</Link>
          ) : (
            <span className="breadcrumbs-current">{item.title}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
