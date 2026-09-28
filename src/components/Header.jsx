import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Search, Menu, X, ChevronDown, Phone, Mail, FileText, ExternalLink, ArrowRight, Youtube } from 'lucide-react';

const VkIcon = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <path d="M12.785 16.241s.286-.032.433-.191c.135-.145.131-.418.131-.418s-.019-1.281.576-1.47c.586-.186 1.339 1.239 2.138 1.787.604.415 1.063.324 1.063.324l2.132-.03s1.116-.07.587-.946c-.044-.072-.311-.655-1.602-1.854-1.351-1.256-1.17-1.052.457-3.22 1-.138 1.4-2.22 1.275-2.57-.12-.334-.86-.245-.86-.245l-2.404.015s-.178-.024-.31.054c-.128.077-.21.255-.21.255s-.38 1.012-.888 1.874c-1.071 1.821-1.5 1.918-1.675 1.803-.408-.266-.306-1.07-.306-1.64 0-1.782.27-2.524-.526-2.716-.264-.064-.458-.106-1.134-.113-.867-.01-1.6.003-2.015.207-.276.136-.489.44-.359.458.16.021.523.099.715.361.248.337.24 1.094.24 1.094s.143 2.1-.334 2.361c-.327.18-.775-.187-1.737-1.84-.492-.847-.864-1.783-.864-1.783s-.072-.176-.2-.27c-.156-.114-.374-.15-.374-.15l-2.285.015s-.343.01-.469.158c-.112.131-.009.403-.009.403s1.79 4.188 3.818 6.3c1.86 1.937 3.974 1.809 3.974 1.809h.963z" />
  </svg>
);

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

              {/* Dropdown: Разработки / Developments */}
              <li className="nav-item-wrap">
                <span className={`nav-item-link ${isDevActive() ? 'active' : ''}`} role="button">
                  {t.header.developments} <ChevronDown size={14} />
                </span>
                <div className="nav-dropdown" style={{ minWidth: '320px' }}>
                  <Link to={getPath('/sushka')} className="dropdown-item">
                    {t.menu.sushka}
                  </Link>
                  <Link to={getPath('/plenka')} className="dropdown-item">
                    {t.menu.plenka}
                  </Link>
                  <Link to={getPath('/steril')} className="dropdown-item">
                    {t.menu.steril}
                  </Link>
                  <Link to={getPath('/gril')} className="dropdown-item">
                    {t.menu.gril}
                  </Link>
                  <Link to={getPath('/lamp')} className="dropdown-item">
                    {t.menu.lamp}
                  </Link>
                  <Link to={getPath('/cotton')} className="dropdown-item">
                    {t.menu.cotton}
                  </Link>
                  <Link to={getPath('/paint')} className="dropdown-item">
                    {t.menu.paint}
                  </Link>
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
                <Link to={getPath('/contact')} className={`nav-item-link ${isCurrent('/contact') ? 'active' : ''}`}>
                  {t.header.contact}
                </Link>
              </li>
            </ul>

            <div className="header-nav-actions">
              <a
                href="https://www.youtube.com/@Rahimovrx"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-action-btn header-btn-youtube"
                aria-label="YouTube"
                title="YouTube"
              >
                <Youtube size={15} />
                <span>YouTube</span>
              </a>

              <button
                type="button"
                className="nav-action-btn header-btn-vk"
                aria-label="VK Video"
                title="VK Video"
              >
                <VkIcon size={15} />
                <span>VK Video</span>
              </button>

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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
