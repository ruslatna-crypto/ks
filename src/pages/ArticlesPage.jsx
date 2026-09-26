import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getArticles } from '../utils/contentLoader';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { BookOpen, Calendar, ArrowRight, User } from 'lucide-react';

const ArticlesPage = () => {
  const { lang } = useLanguage();
  const articlesList = getArticles(lang);

  const getTargetRoute = (slug) => {
    return lang === 'en' ? `/en/articles/${slug}` : `/articles/${slug}`;
  };

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '80vh', paddingBottom: '70px' }}>
      <SEO
        title={lang === 'en' ? 'Scientific Articles & Publications' : 'Научные статьи и публикации'}
        description={lang === 'en'
          ? 'Scientific publications, monographs and engineering overviews on pulsed functional ceramics technology.'
          : 'Научные публикации, монографии и инженерные обзоры по технологии импульсной функциональной керамики.'}
        canonicalPath={lang === 'en' ? '/en/articles' : '/articles'}
        ruPath="/articles"
        enPath="/en/articles"
        lang={lang}
      />
      <div className="container" style={{ paddingTop: '24px' }}>
        <Breadcrumbs currentTitle={lang === 'en' ? 'Articles & Publications' : 'Статьи и публикации'} />

        <div style={{ marginTop: '20px', marginBottom: '36px' }}>
          <h1 className="page-title-heading" style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '12px' }}>
            {lang === 'en' ? 'Scientific & Technical Articles' : 'Научно-технические статьи и обзоры'}
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', maxWidth: '780px', lineHeight: 1.6 }}>
            {lang === 'en'
              ? 'In-depth articles, engineering overviews, and scientific papers on pulsed functional ceramics technology.'
              : 'Тематические статьи, инженерные обзоры и научно-популярные материалы по технологии импульсной функциональной керамики.'}
          </p>
        </div>

        {articlesList.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', background: 'var(--color-background-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <BookOpen size={48} color="var(--color-text-muted)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: 8 }}>
              {lang === 'en' ? 'No articles published yet' : 'Статей пока нет'}
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.94rem' }}>
              {lang === 'en' ? 'Scientific articles will appear here soon.' : 'Материалы появятся в ближайшее время.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '26px' }}>
            {articlesList.map((item, idx) => (
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
                  <div className="card-icon-container card-image" style={{ height: '210px' }}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                )}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px', fontSize: '0.84rem', color: 'var(--color-text-muted)' }}>
                    {item.date && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Calendar size={13} />
                        <span>{item.date}</span>
                      </span>
                    )}
                    {item.author && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <User size={13} />
                        <span>{item.author}</span>
                      </span>
                    )}
                  </div>

                  <h2 style={{ fontSize: '1.28rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '12px', lineHeight: 1.35 }}>
                    <Link to={getTargetRoute(item.slug)} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {item.title}
                    </Link>
                  </h2>

                  <p style={{ fontSize: '0.93rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, flexGrow: 1, marginBottom: '20px' }}>
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
                      <span>{lang === 'en' ? 'Read full article' : 'Читать статью'}</span>
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

export default ArticlesPage;
