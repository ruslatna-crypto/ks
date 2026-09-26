import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Phone, Mail, MapPin, ExternalLink, ArrowRight } from 'lucide-react';

const Footer = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const getPath = (basePath) => {
    if (lang === 'en') {
      return basePath === '/' ? '/en' : `/en${basePath}`;
    }
    return basePath;
  };

  return (
    <footer className="site-footer-corporate">
      <div className="container">
        <div className="footer-top-grid">
          {/* Column 1: Brand & Mission */}
          <div className="footer-col-brand">
            <Link to={getPath('/')} style={{ display: 'inline-block', marginBottom: 14 }}>
              <img 
                src="/images/logo/logo1.svg" 
                alt="KERAMIKA SINTEZ" 
                className="footer-logo-img" 
                style={{ height: 48, background: '#ffffff', padding: '6px 12px', borderRadius: 'var(--radius-sm)' }}
              />
            </Link>
            <div className="footer-brand-title">KERAMIKA SINTEZ</div>
            <div className="footer-brand-subtitle">
              {lang === 'en' ? 'Research & Production Center' : 'Научно-производственный центр'}
            </div>
            <p className="footer-brand-desc" style={{ marginBottom: 18 }}>
              {t.footer.aboutText}
            </p>

            <div className="footer-socials-row">
              <a href="https://wa.me/998998336783" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="WhatsApp">
                <img src="/images/icons/whatsapp.svg" alt="WhatsApp" />
              </a>
              <a href="https://t.me/Rus_Lat" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="Telegram">
                <img src="/images/icons/telegram.svg" alt="Telegram" />
              </a>
              <a href="https://max.ru/u/+998998336783" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="MAX: +998 99 8336783">
                <img src="/images/icons/max.svg" alt="MAX" />
              </a>
              <a href="https://www.youtube.com/@Rahimovrx" target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="YouTube">
                <img src="/images/icons/youtube.svg" alt="YouTube" />
              </a>
            </div>
          </div>

          {/* Column 2: Developments */}
          <div>
            <h4 className="footer-col-title">{t.footer.devTitle}</h4>
            <ul className="footer-nav-list">
              <li><Link to={getPath('/sushka')}>{t.menu.sushka}</Link></li>
              <li><Link to={getPath('/sush-ustanovka')} style={{ paddingLeft: 8, fontSize: '0.84rem' }}>{t.menu.sushUstanovka}</Link></li>
              <li><Link to={getPath('/metodikasushka')} style={{ paddingLeft: 8, fontSize: '0.84rem' }}>{t.menu.metodikaSushka}</Link></li>
              <li><Link to={getPath('/plenka')}>{t.menu.plenka}</Link></li>
              <li><Link to={getPath('/steril')}>{t.menu.steril}</Link></li>
              <li><Link to={getPath('/lamp')}>{t.menu.lamp}</Link></li>
              <li><Link to={getPath('/gril')}>{t.menu.gril}</Link></li>
              <li><Link to={getPath('/cotton')}>{t.menu.cotton}</Link></li>
              <li><Link to={getPath('/paint')}>{t.menu.paint}</Link></li>
            </ul>
          </div>

          {/* Column 3: Science & Methodology */}
          <div>
            <h4 className="footer-col-title">
              {lang === 'en' ? 'Science & Research' : 'Наука и методики'}
            </h4>
            <ul className="footer-nav-list">
              <li><Link to={getPath('/metod')}>{t.menu.metod}</Link></li>
              <li><Link to={getPath('/virus')}>{t.menu.virus}</Link></li>
              <li><Link to={getPath('/klinik')}>{t.menu.klinik}</Link></li>
              <li><Link to={getPath('/metodika')}>{t.menu.metodika}</Link></li>
              <li>
                <a 
                  href="https://www.youtube.com/@Rahimovrx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#F87171' }}
                >
                  <span>{t.menu.lectures}</span>
                </a>
              </li>
              <li style={{ marginTop: 8 }}>
                <Link to={getPath('/news')}>
                  {lang === 'en' ? 'News & Events' : 'Новости компании'}
                </Link>
              </li>
              <li>
                <Link to={getPath('/articles')}>
                  {lang === 'en' ? 'Articles & Publications' : 'Статьи и публикации'}
                </Link>
              </li>
              <li style={{ marginTop: 8 }}>
                <a 
                  href="https://rakhimovr.uz/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#34D399' }}
                >
                  <span>{lang === 'en' ? "Author's site (rakhimovr.uz)" : "Сайт Автора (rakhimovr.uz)"}</span>
                  <ExternalLink size={13} />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="footer-col-title">{t.footer.contactsTitle}</h4>
            <div className="footer-contacts-list">
              <div className="footer-contact-item">
                <MapPin size={17} />
                <span>{t.home.addressFull}</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={17} />
                <a href="tel:+998998336783">+998 99 8336783</a>
              </div>
              <div className="footer-contact-item">
                <Mail size={17} />
                <a href="mailto:ruslat@yandex.ru">ruslat@yandex.ru</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} {lang === 'en' ? 'LLC "KERAMIKA SINTEZ". All rights reserved.' : 'ООО «KERAMIKA SINTEZ». Все права защищены.'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span>{lang === 'en' ? 'Research & Production Center' : 'Научно-производственный центр'}</span>
            <Link to={getPath('/contact')}>{t.header.contact}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
