import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Search, Menu, X, ChevronDown, Phone, Mail, FileText, ExternalLink, ArrowRight } from 'lucide-react';

const Header = () => {
  const { lang, switchLanguage } = useLanguage();
  const t = translations[lang];
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchData, setSearchData] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [devOpen, setDevOpen] = useState(false);
  const [medOpen, setMedOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  // Lazy load search dataset only when search is opened
  useEffect(() => {
    if (isSearchOpen && !searchData) {
      import('../data/siteContent').then(m => {
        setSearchData(m.siteData || m.default);
      });
    }
  }, [isSearchOpen, searchData]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 60);
    } else {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!searchQuery.trim() || !searchData) {
      setSearchResults([]);
      return;
    }

    const q = searchQuery.toLowerCase();
    const hits = [];

    searchData.forEach((page) => {
      let score = 0;
      let snippet = '';

      if (page.title.toLowerCase().includes(q)) {
        score += 10;
        snippet = page.title;
      }

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
              const end = Math.min(p.length, idx + 80);
              snippet = (start > 0 ? '...' : '') + p.substring(start, end) + (end < p.length ? '...' : '');
            }
          }
        }
      }

      for (const tbl of page.tables || []) {
        for (const row of tbl) {
          for (const cell of row) {
            if (cell.toLowerCase().includes(q)) {
              score += 2;
              if (!snippet) snippet = cell;
            }
          }
        }
      }

      if (score > 0) {
        hits.push({ page, score, snippet: snippet || page.title });
      }
    });

    hits.sort((a, b) => b.score - a.score);
    setSearchResults(hits);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(getPath(searchResults[0].page.route));
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isCurrent = (path) => {
    if (lang === 'en') {
      return location.pathname === `/en${path === '/' ? '' : path}` || (path === '/' && location.pathname === '/en');
    }
    return location.pathname === path;
  };

  const getPath = (basePath) => {
    if (lang === 'en') {
      return basePath === '/' ? '/en' : `/en${basePath}`;
    }
    return basePath;
  };

  const isDevActive = () => {
    const devRoutes = ['/sushka', '/sush-ustanovka', '/metodikasushka', '/plenka', '/steril', '/gril', '/lamp', '/cotton', '/paint'];
    return devRoutes.some(r => isCurrent(r));
  };

  const isMedActive = () => {
    const medRoutes = ['/metod', '/virus', '/klinik', '/metodika'];
    return medRoutes.some(r => isCurrent(r));
  };

  return (
    <>
      <header className="site-header">
        <div className="container">
          {/* Top Row: Brand & Quick Actions */}
          <div className="header-top">
            <Link to={getPath('/')} className="logo-wrap" title="ООО KERAMIKA SINTEZ">
              <img src="/images/logo/logo1.svg" alt="KERAMIKA SINTEZ" />
            </Link>

            <div className="header-top-right">
              <a href="tel:+998998336783" className="header-phone">
                <Phone size={14} />
                <span>+998 99 8336783</span>
              </a>

              <div className="header-socials">
                <a href="https://wa.me/998998336783" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="WhatsApp">
                  <img src="/images/icons/whatsapp.svg" alt="WhatsApp" />
                </a>
                <a href="https://t.me/Rus_Lat" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Telegram">
                  <img src="/images/icons/telegram.svg" alt="Telegram" />
                </a>
                <a href="https://max.ru/u/+998998336783" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="MAX: +998 99 8336783">
                  <img src="/images/icons/max.svg" alt="MAX" />
                </a>
                <a href="https://www.youtube.com/@Rahimovrx" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="YouTube">
                  <img src="/images/icons/youtube.svg" alt="YouTube" />
                </a>
              </div>

              {/* Language Switcher & Author Site Link */}
              <div className="lang-switcher">
                <button
                  className={`lang-btn ${lang === 'ru' ? 'active' : ''}`}
                  onClick={() => switchLanguage('ru')}
                  title="Русский язык"
                >
                  <img src="/images/home/flag-1-3.svg" alt="РФ" />
                  <span>Рус</span>
                </button>
                <button
                  className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => switchLanguage('en')}
                  title="English version"
                >
                  <img src="/images/home/flag-1-1.svg" alt="EN" />
                  <span>Eng</span>
                </button>
                <a
                  href="https://rakhimovr.uz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lang-btn lang-btn-author"
                  title="https://rakhimovr.uz/"
                >
                  <span>{lang === 'en' ? "Author's site" : "Сайт Автора"}</span>
                </a>
              </div>

              <button 
                className="mobile-toggle"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Меню"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="header-divider" />

        {/* Main Navigation Menu Bar */}
        <div className="container">
          <div className="header-nav-bar">
            <ul className="nav-links-list">
              <li className="nav-item-wrap">
                <Link to={getPath('/')} className={`nav-item-link ${isCurrent('/') ? 'active' : ''}`}>
                  {t.header.home}
                </Link>
              </li>

              {/* Mega Menu Dropdown: Разработки / Developments */}
              <li className="nav-item-wrap">
                <span className={`nav-item-link ${isDevActive() ? 'active' : ''}`} role="button">
                  {t.header.developments} <ChevronDown size={14} />
                </span>
                <div className="nav-dropdown mega-menu">
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '6px 12px 10px' }}>
                      {lang === 'en' ? 'Core Directions' : 'Основные направления'}
                    </div>
                    <Link to={getPath('/sushka')} className="dropdown-card-item">
                      <span className="dropdown-card-title">{t.menu.sushka}</span>
                      <span className="dropdown-card-desc">
                        {lang === 'en' ? 'Vegetables & fruit drying tech' : 'Сушка овощей и фруктов'}
                      </span>
                    </Link>
                    <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '6px' }}>
                      <Link to={getPath('/sush-ustanovka')} className="dropdown-item" style={{ fontSize: '0.84rem', padding: '5px 8px' }}>
                        {t.menu.sushUstanovka}
                      </Link>
                      <Link to={getPath('/metodikasushka')} className="dropdown-item" style={{ fontSize: '0.84rem', padding: '5px 8px' }}>
                        {t.menu.metodikaSushka}
                      </Link>
                    </div>
                    <Link to={getPath('/plenka')} className="dropdown-card-item">
                      <span className="dropdown-card-title">{t.menu.plenka}</span>
                      <span className="dropdown-card-desc">
                        {lang === 'en' ? 'Functional film for greenhouses' : 'Пленка для теплиц и парников'}
                      </span>
                    </Link>
                    <Link to={getPath('/steril')} className="dropdown-card-item">
                      <span className="dropdown-card-title">{t.menu.steril}</span>
                      <span className="dropdown-card-desc">
                        {lang === 'en' ? 'Medical instrument sterilization' : 'Стерилизация инструментов'}
                      </span>
                    </Link>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '6px 12px 10px' }}>
                      {lang === 'en' ? 'Industrial & Medical' : 'Промышленные и медицинские'}
                    </div>
                    <Link to={getPath('/lamp')} className="dropdown-card-item">
                      <span className="dropdown-card-title">{t.menu.lamp}</span>
                      <span className="dropdown-card-desc">
                        {lang === 'en' ? 'Pulsed IR therapeutic lamps' : 'Лечебные импульсные лампы'}
                      </span>
                    </Link>
                    <Link to={getPath('/gril')} className="dropdown-card-item">
                      <span className="dropdown-card-title">{t.menu.gril}</span>
                      <span className="dropdown-card-desc">
                        {lang === 'en' ? 'Grills and baking equipment' : 'Грили, выпечка, жарочные шкафы'}
                      </span>
                    </Link>
                    <Link to={getPath('/cotton')} className="dropdown-card-item">
                      <span className="dropdown-card-title">{t.menu.cotton}</span>
                      <span className="dropdown-card-desc">
                        {lang === 'en' ? 'Raw cotton drying & seed stimulation' : 'Сушка хлопка и стимуляция'}
                      </span>
                    </Link>
                    <Link to={getPath('/paint')} className="dropdown-card-item">
                      <span className="dropdown-card-title">{t.menu.paint}</span>
                      <span className="dropdown-card-desc">
                        {lang === 'en' ? 'Paint and varnish polymerization' : 'Сушка краски и лаков'}
                      </span>
                    </Link>
                  </div>
                </div>
              </li>

              {/* Dropdown: Медицина / Medicine */}
              <li className="nav-item-wrap">
                <span className={`nav-item-link ${isMedActive() ? 'active' : ''}`} role="button">
                  {t.header.medicine} <ChevronDown size={14} />
                </span>
                <div className="nav-dropdown" style={{ minWidth: '300px' }}>
                  <Link to={getPath('/metod')} className="dropdown-item">
                    {t.menu.metod}
                  </Link>
                  <Link to={getPath('/virus')} className="dropdown-item">
                    {t.menu.virus}
                  </Link>
                  <Link to={getPath('/klinik')} className="dropdown-item">
                    {t.menu.klinik}
                  </Link>
                  <Link to={getPath('/metodika')} className="dropdown-item">
                    {t.menu.metodika}
                  </Link>
                  <a 
                    href="https://www.youtube.com/@Rahimovrx" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="dropdown-item" 
                    style={{ color: '#dc2626' }}
                  >
                    <span>{t.menu.lectures}</span>
                  </a>
                </div>
              </li>

              <li className="nav-item-wrap">
                <Link to={getPath('/news')} className={`nav-item-link ${isCurrent('/news') ? 'active' : ''}`}>
                  {lang === 'en' ? 'News' : 'Новости'}
                </Link>
              </li>

              <li className="nav-item-wrap">
                <Link to={getPath('/articles')} className={`nav-item-link ${isCurrent('/articles') ? 'active' : ''}`}>
                  {lang === 'en' ? 'Articles' : 'Статьи'}
                </Link>
              </li>

              <li className="nav-item-wrap">
                <Link to={getPath('/contact')} className={`nav-item-link ${isCurrent('/contact') ? 'active' : ''}`}>
                  {t.header.contact}
                </Link>
              </li>
            </ul>

            <button 
              className={`nav-search-btn ${isSearchOpen ? 'active' : ''}`}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label={t.header.searchBtn}
            >
              <Search size={15} />
              <span>{t.header.searchBtn}</span>
            </button>
          </div>
        </div>

        {/* Search Bar displayed directly under the menu */}
        {isSearchOpen && (
          <div className="header-search-bar">
            <div className="container">
              <form onSubmit={handleSearchSubmit} className="search-bar-form">
                <div className="search-input-wrap">
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="search-input-field"
                    placeholder={lang === 'ru' ? 'Поиск по научным материалам и разработкам...' : 'Search scientific developments and materials...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
                <button type="submit" className="search-submit-btn">
                  <Search size={15} />
                  <span>{lang === 'ru' ? 'Найти' : 'Search'}</span>
                </button>
                <button
                  type="button"
                  className="search-close-btn"
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                  title={lang === 'ru' ? 'Закрыть' : 'Close'}
                  aria-label="Закрыть"
                >
                  <X size={18} />
                </button>
              </form>

              {searchQuery.trim() && (
                <div className="search-dropdown-results">
                  {searchResults.length === 0 ? (
                    <div className="search-no-results">
                      {lang === 'ru' ? 'По вашему запросу ничего не найдено' : 'No results found for your query'}
                    </div>
                  ) : (
                    <div className="search-results-scroll">
                      {searchResults.map(({ page, snippet }, idx) => (
                        <div
                          key={idx}
                          className="search-result-row"
                          onClick={() => {
                            navigate(getPath(page.route));
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                        >
                          <div className="search-result-row-title">
                            <FileText size={15} color="var(--color-primary)" />
                            <span>{page.title}</span>
                          </div>
                          {snippet && <p className="search-result-row-snippet">{snippet}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="mobile-drawer" onClick={() => setIsMobileOpen(false)}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <img src="/images/logo/logo1.svg" alt="KERAMIKA SINTEZ" style={{ height: 42 }} />
              <button 
                onClick={() => setIsMobileOpen(false)}
                style={{ padding: 6, color: 'var(--color-dark)' }}
                aria-label="Закрыть"
              >
                <X size={24} />
              </button>
            </div>

            {/* Language Switcher in Mobile Drawer */}
            <div className="lang-switcher" style={{ marginBottom: 22, width: 'fit-content' }}>
              <button
                className={`lang-btn ${lang === 'ru' ? 'active' : ''}`}
                onClick={() => { switchLanguage('ru'); setIsMobileOpen(false); }}
              >
                <img src="/images/home/flag-1-3.svg" alt="РФ" />
                <span>Рус</span>
              </button>
              <button
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => { switchLanguage('en'); setIsMobileOpen(false); }}
              >
                <img src="/images/home/flag-1-1.svg" alt="EN" />
                <span>Eng</span>
              </button>
              <a
                href="https://rakhimovr.uz/"
                target="_blank"
                rel="noopener noreferrer"
                className="lang-btn lang-btn-author"
              >
                <span>{lang === 'en' ? "Author's site" : "Сайт Автора"}</span>
              </a>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Link to={getPath('/')} onClick={() => setIsMobileOpen(false)} className="nav-item-link">
                {t.header.home}
              </Link>

              <div>
                <button 
                  onClick={() => setDevOpen(!devOpen)} 
                  className="nav-item-link" 
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <span>{t.header.developments}</span>
                  <ChevronDown size={16} style={{ transform: devOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                </button>
                {devOpen && (
                  <div style={{ paddingLeft: 14, display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
                    <Link to={getPath('/sushka')} onClick={() => setIsMobileOpen(false)} className="dropdown-item">{t.menu.sushka}</Link>
                    <Link to={getPath('/sush-ustanovka')} onClick={() => setIsMobileOpen(false)} className="dropdown-item" style={{ fontSize: '0.85rem' }}>{t.menu.sushUstanovka}</Link>
                    <Link to={getPath('/metodikasushka')} onClick={() => setIsMobileOpen(false)} className="dropdown-item" style={{ fontSize: '0.85rem' }}>{t.menu.metodikaSushka}</Link>
                    <Link to={getPath('/plenka')} onClick={() => setIsMobileOpen(false)} className="dropdown-item">{t.menu.plenka}</Link>
                    <Link to={getPath('/steril')} onClick={() => setIsMobileOpen(false)} className="dropdown-item">{t.menu.steril}</Link>
                    <Link to={getPath('/gril')} onClick={() => setIsMobileOpen(false)} className="dropdown-item">{t.menu.gril}</Link>
                    <Link to={getPath('/lamp')} onClick={() => setIsMobileOpen(false)} className="dropdown-item">{t.menu.lamp}</Link>
                    <Link to={getPath('/cotton')} onClick={() => setIsMobileOpen(false)} className="dropdown-item">{t.menu.cotton}</Link>
                    <Link to={getPath('/paint')} onClick={() => setIsMobileOpen(false)} className="dropdown-item">{t.menu.paint}</Link>
                  </div>
                )}
              </div>

              <div>
                <button 
                  onClick={() => setMedOpen(!medOpen)} 
                  className="nav-item-link" 
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <span>{t.header.medicine}</span>
                  <ChevronDown size={16} style={{ transform: medOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                </button>
                {medOpen && (
                  <div style={{ paddingLeft: 14, display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
                    <Link to={getPath('/metod')} onClick={() => setIsMobileOpen(false)} className="dropdown-item">{t.menu.metod}</Link>
                    <Link to={getPath('/virus')} onClick={() => setIsMobileOpen(false)} className="dropdown-item">{t.menu.virus}</Link>
                    <Link to={getPath('/klinik')} onClick={() => setIsMobileOpen(false)} className="dropdown-item">{t.menu.klinik}</Link>
                    <Link to={getPath('/metodika')} onClick={() => setIsMobileOpen(false)} className="dropdown-item">{t.menu.metodika}</Link>
                    <a href="https://www.youtube.com/@Rahimovrx" target="_blank" rel="noopener noreferrer" className="dropdown-item" style={{ color: '#dc2626' }}>{t.menu.lectures}</a>
                  </div>
                )}
              </div>

              <Link to={getPath('/news')} onClick={() => setIsMobileOpen(false)} className="nav-item-link">
                {lang === 'en' ? 'News' : 'Новости'}
              </Link>

              <Link to={getPath('/articles')} onClick={() => setIsMobileOpen(false)} className="nav-item-link">
                {lang === 'en' ? 'Articles' : 'Статьи'}
              </Link>

              <Link to={getPath('/contact')} onClick={() => setIsMobileOpen(false)} className="nav-item-link">
                {t.header.contact}
              </Link>
            </nav>

            <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid var(--color-border)' }}>
              <a href="tel:+998998336783" className="header-phone" style={{ marginBottom: 12, width: '100%', justifyContent: 'center' }}>
                <Phone size={15} />
                <span>+998 99 8336783</span>
              </a>
              <a href="mailto:ruslat@yandex.ru" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: 16 }}>
                <Mail size={15} color="var(--color-primary)" />
                <span>ruslat@yandex.ru</span>
              </a>
              <div className="header-socials" style={{ justifyContent: 'center' }}>
                <a href="https://wa.me/998998336783" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="WhatsApp">
                  <img src="/images/icons/whatsapp.svg" alt="WhatsApp" />
                </a>
                <a href="https://t.me/Rus_Lat" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Telegram">
                  <img src="/images/icons/telegram.svg" alt="Telegram" />
                </a>
                <a href="https://max.ru/u/+998998336783" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="MAX: +998 99 8336783">
                  <img src="/images/icons/max.svg" alt="MAX" />
                </a>
                <a href="https://www.youtube.com/@Rahimovrx" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="YouTube">
                  <img src="/images/icons/youtube.svg" alt="YouTube" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
