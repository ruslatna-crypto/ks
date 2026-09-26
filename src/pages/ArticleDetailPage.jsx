import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getArticleBySlug } from '../utils/contentLoader';
import { renderMarkdownBody } from '../utils/markdownRenderer';
import Breadcrumbs from '../components/Breadcrumbs';
import { Calendar, Tag, ArrowLeft, User, FileQuestion } from 'lucide-react';

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const item = getArticleBySlug(slug, lang);

  const backRoute = lang === 'en' ? '/en/articles' : '/articles';

  if (!item) {
    return (
      <div className="container" style={{ paddingTop: '50px', paddingBottom: '70px', textAlign: 'center' }}>
        <FileQuestion size={48} color="var(--color-text-muted)" style={{ margin: '0 auto 16px' }} />
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '12px' }}>
          {lang === 'en' ? 'Article not found' : 'Статья не найдена'}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
          {lang === 'en'
            ? 'The requested article does not exist or has been moved.'
            : 'Запрошенная статья не существует или была перемещена.'}
        </p>
        <Link to={backRoute} className="hero-btn-primary" style={{ display: 'inline-flex', padding: '10px 22px' }}>
          <ArrowLeft size={16} style={{ marginRight: 6 }} />
          <span>{lang === 'en' ? 'Back to Articles' : 'Вернуться к статьям'}</span>
        </Link>
      </div>
    );
  }



  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '80vh', paddingBottom: '70px' }}>
      <div className="container" style={{ paddingTop: '24px' }}>
        <Breadcrumbs currentTitle={item.title} parentTitle={lang === 'en' ? 'Articles' : 'Статьи'} parentRoute={backRoute} />

        <article style={{ maxWidth: '1080px', margin: '30px auto 0' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px', marginBottom: '16px', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
            {item.category && (
              <span className="tech-badge">
                <Tag size={12} />
                <span>{item.category}</span>
              </span>
            )}
            {item.date && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Calendar size={14} />
                <span>{item.date}</span>
              </span>
            )}
            {item.author && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <User size={14} />
                <span>{item.author}</span>
              </span>
            )}
          </div>

          <h1 style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--color-dark)', lineHeight: 1.3, marginBottom: '20px' }}>
            {item.title}
          </h1>

          {item.excerpt && (
            <p style={{ fontSize: '1.15rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '28px', fontStyle: 'italic', borderLeft: '3px solid var(--color-primary)', paddingLeft: '16px' }}>
              {item.excerpt}
            </p>
          )}

          {item.image && (
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '32px', boxShadow: 'var(--shadow-md)', background: 'var(--color-background-alt)' }}>
              <img src={item.image} alt={item.title} style={{ width: '100%', maxHeight: '440px', objectFit: 'cover', display: 'block' }} />
            </div>
          )}

          <div style={{ fontSize: '1.04rem', lineHeight: 1.75, color: 'var(--color-text)' }}>
            {renderMarkdownBody(item.content)}
          </div>

          <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--color-border)' }}>
            <Link to={backRoute} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 600 }}>
              <ArrowLeft size={16} />
              <span>{lang === 'en' ? 'Back to all articles' : 'Вернуться ко всем статьям'}</span>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
