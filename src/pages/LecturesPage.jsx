import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ArticleTable from '../components/ArticleTable';
import SEO from '../components/SEO';
import { siteDataBilingual } from '../data/siteContentBilingual';
import { useLanguage } from '../context/LanguageContext';
import { Youtube, ExternalLink, Activity } from 'lucide-react';

const LecturesPage = () => {
  const { lang } = useLanguage();
  const pageEntry = siteDataBilingual['metodika'] || {};
  const pageData = pageEntry[lang] || pageEntry.ru || {};
  const tables = pageEntry.tables || [];
  const images = pageEntry.images || [];

  const breadcrumbs = [
    { title: lang === 'en' ? 'Medicine' : 'Медицина' },
    { title: pageData.title || (lang === 'en' ? 'Lectures and research' : 'Лекции и результаты исследований') }
  ];

  return (
    <div className="page-wrap">
      <SEO
        title={lang === 'en' ? 'Clinical Lectures & Methodologies' : 'Клинические лекции и методики'}
        description={lang === 'en'
          ? '76 clinical lectures and practical methodologies for the medical application of infrared resonant radiation.'
          : '76 клинических лекций и практических методик применения инфракрасного резонансного излучения в медицине.'}
        canonicalPath={lang === 'en' ? '/en/metodika' : '/metodika'}
        ruPath="/metodika"
        enPath="/en/metodika"
        lang={lang}
      />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
        
        <div style={{ marginBottom: 28 }}>
          <h1 className="page-title-heading">{pageData.title}</h1>
        </div>

        {/* Video Lectures Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #FFF5F5 0%, #FFFFFF 100%)',
          border: '1px solid #FECACA',
          borderRadius: 'var(--radius-md)',
          padding: '24px 28px',
          marginBottom: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 18,
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#DC2626', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
              <Youtube size={18} />
              <span>YouTube Channel</span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-dark)', marginBottom: 4 }}>
              {lang === 'en' ? 'Video lectures by Professor R. Rakhimov' : 'Видеолекции профессора Р. Рахимова'}
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', maxWidth: '640px' }}>
              {lang === 'en' 
                ? 'Scientific reports, conference presentations, and in-depth analysis of pulsed functional ceramics physics.' 
                : 'Лекции, доклады на международных конференциях и физический разбор действия импульсной керамики.'}
            </p>
          </div>
          <a
            href="https://www.youtube.com/@Rahimovrx"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#DC2626',
              color: '#ffffff',
              padding: '11px 22px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.92rem',
              transition: 'background 0.15s ease',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)'
            }}
          >
            <span>{lang === 'en' ? 'Watch lectures' : 'Смотреть видео'}</span>
            <ExternalLink size={15} />
          </a>
        </div>

        <article className="article-text-section">
          {pageData.sections && pageData.sections.map((sec, sIdx) => (
            <div key={sIdx} style={{ marginBottom: 28 }}>
              {sec.title && <h2>{sec.title}</h2>}
              {sec.paragraphs && sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>
          ))}

          {/* Scientific Tables */}
          {tables.length > 0 && (
            <div style={{ marginTop: 36 }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 18 }}>
                {lang === 'en' ? 'Scientific Tables and Research Results' : 'Научные таблицы и результаты исследований'}
              </h2>
              {tables.map((tbl, tIdx) => (
                <ArticleTable
                  key={tIdx}
                  tableData={tbl}
                  title={lang === 'en' ? `Table ${tIdx + 1}. Research parameters` : `Таблица ${tIdx + 1}. Показатели исследований`}
                />
              ))}
            </div>
          )}

          {/* Graphs and images */}
          {images.length > 0 && (
            <div style={{ marginTop: 40 }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: 18, color: 'var(--color-dark)' }}>
                {lang === 'en' ? 'Spectral charts and diagrams' : 'Спектральные диаграммы и графики'}
              </h3>
              <div className="photos-grid-layout">
                {images.map((imgObj, idx) => (
                  <div key={idx} className="photo-card-item">
                    <img src={imgObj.url} alt="Chart" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default LecturesPage;
