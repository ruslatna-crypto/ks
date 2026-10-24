import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const getPath = (basePath) => {
    if (basePath === '/cotton' || basePath === '/hlopok') {
      return lang === 'en' ? '/en/cotton' : '/hlopok';
    }
    if (lang === 'en') {
      return basePath === '/' ? '/en' : `/en${basePath}`;
    }
    return basePath;
  };

  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', paddingTop: '48px', paddingBottom: '32px', marginTop: 'auto', borderTop: '1px solid #1e293b' }}>
      <div className="container">
        {/* Main Footer Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '36px', marginBottom: '40px' }}>
          {/* Column 1: Brand & Contact Info */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.02em' }}>
                KERAMIKA SINTEZ
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#94a3b8', marginBottom: '20px' }}>
              {t.footer.aboutText}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <a href="tel:+998998336783" style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} color="#38bdf8" />
                <span>+998 99 8336783</span>
              </a>
              <a href="mailto:ruslat@yandex.ru" style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="#38bdf8" />
                <span>ruslat@yandex.ru</span>
              </a>
              <div style={{ color: '#94a3b8', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={14} color="#38bdf8" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{t.header.address}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Разработки / Developments */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
              {t.footer.devTitle}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '0.875rem' }}>
              <li><Link to={getPath('/sushka')} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.menu.sushka}</Link></li>
              <li><Link to={getPath('/sush-ustanovka')} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.menu.sushUstanovka || 'Сушильная установка'}</Link></li>
              <li><Link to={getPath('/metodikasushka')} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.menu.metodikaSushka || 'Методика сушки'}</Link></li>
              <li><Link to={getPath('/plenka')} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.menu.plenka}</Link></li>
              <li><Link to={getPath('/steril')} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.menu.steril}</Link></li>
              <li><Link to={getPath('/gril')} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.menu.gril}</Link></li>
              <li><Link to={getPath('/lamp')} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.menu.lamp}</Link></li>
              <li><Link to={getPath('/cotton')} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.menu.cotton}</Link></li>
              <li><Link to={getPath('/paint')} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.menu.paint}</Link></li>
            </ul>
          </div>

          {/* Column 3: Медицина / Medicine */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
              {t.footer.medTitle}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '0.875rem' }}>
              <li><Link to={getPath('/metod')} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.menu.metod}</Link></li>
              <li><Link to={getPath('/virus')} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.menu.virus || 'Метод лечения от вирусов'}</Link></li>
              <li><Link to={getPath('/metodika')} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.menu.metodika}</Link></li>
              <li><Link to={getPath('/klinik')} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.menu.klinik}</Link></li>
              <li>
                <a href="https://www.youtube.com/@Rahimovrx" target="_blank" rel="noopener noreferrer" style={{ color: '#f87171', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span>{t.menu.lectures}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Научные материалы и Навигация */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
              {lang === 'en' ? 'Publications & Company' : 'Материалы и компания'}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '0.875rem' }}>
              <li><Link to={getPath('/articles')} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.header.articles}</Link></li>
              <li><Link to={getPath('/news')} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.header.news}</Link></li>
              <li><Link to={getPath('/contact')} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.header.contact}</Link></li>
              <li><Link to={getPath('/search')} style={{ color: '#cbd5e1', textDecoration: 'none' }}>{t.header.searchBtn}</Link></li>
              <li><a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none' }}>Sitemap XML</a></li>
              <li>
                <a href="https://rakhimovr.uz/" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span>{lang === 'en' ? "Author's site (rakhimovr.uz)" : "Сайт Автора (rakhimovr.uz)"}</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Bottom Row */}
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: '#64748b' }}>
          <div>
            {lang === 'en'
              ? '© 2026 LLC "KERAMIKA SINTEZ". All rights reserved.'
              : '© 2026 ООО «KERAMIKA SINTEZ». Все права защищены.'}
          </div>
          <div>
            {lang === 'en'
              ? 'Pulsed functional ceramics & infrared energy-efficient technologies.'
              : 'Импульсная функциональная керамика и энергоэффективные ИК-технологии.'}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
