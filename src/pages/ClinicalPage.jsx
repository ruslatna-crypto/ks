import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ArticleTable from '../components/ArticleTable';
import SEO from '../components/SEO';
import { siteDataBilingual } from '../data/siteContentBilingual';
import { useLanguage } from '../context/LanguageContext';
import { Activity, FileText } from 'lucide-react';

const ClinicalPage = () => {
  const { lang } = useLanguage();
  const pageEntry = siteDataBilingual['klinik'] || {};
  const pageData = pageEntry[lang] || pageEntry.ru || {};
  const tables = pageEntry.tables || [];
  const images = pageEntry.images || [];

  const breadcrumbs = [
    { title: lang === 'en' ? 'Medicine' : 'Медицина' },
    { title: pageData.title || (lang === 'en' ? 'Clinical cases' : 'Клинические случаи') }
  ];

  return (
    <div className="page-wrap">
      <SEO
        title={lang === 'en' ? 'Clinical Protocols & Research' : 'Клинические испытания и медицинские методики'}
        description={lang === 'en'
          ? 'Clinical trial results and approved medical protocols for pulsed functional ceramics therapy.'
          : 'Результаты клинических испытаний и утвержденные медицинские протоколы импульсной керамической терапии.'}
        canonicalPath={lang === 'en' ? '/en/klinik' : '/klinik'}
        ruPath="/klinik"
        enPath="/en/klinik"
        lang={lang}
      />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
        
        <div style={{ marginBottom: 28 }}>
          <div className="tech-badge" style={{ marginBottom: 12 }}>
            <Activity size={13} />
            <span>{lang === 'en' ? 'Clinical Research' : 'Клинические исследования'}</span>
          </div>
          <h1 className="page-title-heading">{pageData.title}</h1>
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

          {/* Clinical Tables */}
          {tables.length > 0 && (
            <div style={{ marginTop: 36 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 18 }}>
                {lang === 'en' ? 'Clinical Cases Dynamics' : 'Динамика клинических показателей'}
              </h2>
              {tables.map((tbl, tIdx) => (
                <ArticleTable
                  key={tIdx}
                  tableData={tbl}
                  title={lang === 'en' ? `Clinical Case ${tIdx + 1}` : `Клинический случай ${tIdx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Images */}
          {images.length > 0 && (
            <div style={{ marginTop: 40 }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: 18, color: 'var(--color-dark)' }}>
                {lang === 'en' ? 'Clinical observations' : 'Материалы наблюдений'}
              </h3>
              <div className="photos-grid-layout">
                {images.map((imgObj, idx) => (
                  <div key={idx} className="photo-card-item">
                    <img src={imgObj.url} alt="Clinical Case" loading="lazy" />
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

export default ClinicalPage;
