import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

const NotFoundPage = () => {
  const { lang } = useLanguage();
  const homePath = lang === 'en' ? '/en' : '/';
  const contactPath = lang === 'en' ? '/en/contact' : '/contact';

  return (
    <div style={{ padding: '90px 20px', textAlign: 'center', backgroundColor: 'var(--color-background-alt)' }}>
      <SEO
        title={lang === 'en' ? 'Page Not Found (404)' : 'Страница не найдена (404)'}
        description={lang === 'en'
          ? 'The requested page has been moved, renamed, or is temporarily unavailable.'
          : 'Запрашиваемая страница перемещена, удалена или указан неверный адрес.'}
        canonicalPath="/404"
        lang={lang}
      />
      <div className="container" style={{ maxWidth: 620 }}>
        <div style={{
          display: 'inline-block',
          fontSize: '5.5rem',
          fontWeight: 900,
          color: 'var(--color-primary)',
          lineHeight: 1,
          marginBottom: 16,
          letterSpacing: '-0.04em'
        }}>
          404
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: 12 }}>
          {lang === 'en' ? 'Page Not Found' : 'Страница не найдена'}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.02rem', lineHeight: 1.6, marginBottom: 32 }}>
          {lang === 'en'
            ? 'The requested page has been moved, renamed, or is temporarily unavailable. Please return to the homepage or contact our center.'
            : 'Запрашиваемая страница перемещена, удалена или указан неверный адрес. Воспользуйтесь меню сайта или перейдите на главную страницу научно-производственного центра.'}
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to={homePath} className="hero-btn-primary">
            <Home size={18} />
            <span>{lang === 'en' ? 'Back to Home' : 'На главную'}</span>
          </Link>
          <Link to={contactPath} className="hero-btn-secondary">
            <span>{lang === 'en' ? 'Contact Center' : 'Контакты'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
