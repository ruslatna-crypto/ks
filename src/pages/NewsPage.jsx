import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getNews } from '../utils/contentLoader';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';

const NewsPage = () => {
  const { lang } = useLanguage();
  const newsList = getNews(lang);

  const getTargetRoute = (slug) => {
    return lang === 'en' ? `/en/news/${slug}` : `/news/${slug}`;
  };

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '80vh', paddingBottom: '70px' }}>
      <SEO
        title={lang === 'en' ? 'Company News & Events' : 'Новости и события компании'}
        description={lang === 'en'
          ? 'Official announcements, production updates and scientific exhibitions of KERAMIKA SINTEZ LLC.'
          : 'Официальные сообщения, новости производства и научные выставки ООО «KERAMIKA SINTEZ».'}
        canonicalPath={lang === 'en' ? '/en/news' : '/news'}
        ruPath="/news"
        enPath="/en/news"
        lang={lang}
      />
      <div className="container" style={{ paddingTop: '24px' }}>
        <Breadcrumbs currentTitle={lang === 'en' ? 'News' : 'Новости'} />

        <div style={{ marginTop: '20px', marginBottom: '36px' }}>
          <h1 className="page-title-heading" style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '12px' }}>
            {lang === 'en' ? 'Company News & Events' : 'Новости и события компании'}
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', maxWidth: '780px', lineHeight: 1.6 }}>
            {lang === 'en'
              ? 'Official announcements, scientific updates, and corporate events from LLC "KERAMIKA SINTEZ".'
              : 'Официальные сообщения, научные обновления и производственные события ООО «KERAMIKA SINTEZ».'}
          </p>
        </div>

        {newsList.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', background: 'var(--color-background-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <Newspaper size={48} color="var(--color-text-muted)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: 8 }}>
              {lang === 'en' ? 'No news published yet' : 'Новостей пока нет'}
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.94rem' }}>
              {lang === 'en' ? 'Check back later for company announcements.' : 'Следите за обновлениями в ближайшее время.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {newsList.map((item, idx) => (
              <article 
                key={idx}
                className="ks-dev-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.image && (
                  <div className="card-icon-container card-image" style={{ height: '200px' }}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                )}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    {item.date && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Calendar size={13} />
                        <span>{item.date}</span>
                      </span>
                    )}
                  </div>

                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '12px', lineHeight: 1.35 }}>
                    <Link to={getTargetRoute(item.slug)} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {item.title}
                    </Link>
                  </h2>

                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, flexGrow: 1, marginBottom: '20px' }}>
                    {item.excerpt}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid var(--color-border-light)' }}>
                    <Link 
                      to={getTargetRoute(item.slug)} 
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        fontWeight: 600, 
                        fontSize: '0.9rem', 
                        color: 'var(--color-primary)' 
                      }}
                    >
                      <span>{lang === 'en' ? 'Read full news' : 'Читать новость'}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
