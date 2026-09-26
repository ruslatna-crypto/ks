import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import ArticleTable from '../components/ArticleTable';
import Lightbox from '../components/Lightbox';
import SEO from '../components/SEO';
import { siteDataBilingual } from '../data/siteContentBilingual';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { ArrowRight, Layers, FileCheck, ZoomIn, Sparkles, Shield } from 'lucide-react';

const relatedDevelopmentsList = [
  { id: 'sushka', route: '/sushka', ru: 'Сушка овощей и фруктов', en: 'Drying of vegetables and fruits' },
  { id: 'plenka', route: '/plenka', ru: 'Пленка для теплиц', en: 'Greenhouse film' },
  { id: 'steril', route: '/steril', ru: 'Стерилизация инструментов', en: 'Sterilization of instruments' },
  { id: 'lamp', route: '/lamp', ru: 'Лечебные лампы', en: 'Therapeutic lamps' },
  { id: 'gril', route: '/gril', ru: 'Грили и выпечка', en: 'Grills and baking' },
  { id: 'cotton', route: '/cotton', ru: 'Сушка хлопка', en: 'Cotton drying' },
  { id: 'paint', route: '/paint', ru: 'Сушка краски и лаков', en: 'Drying of paints and varnishes' }
];

const DevelopmentPage = ({ pageId }) => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const location = useLocation();

  const pageEntry = siteDataBilingual[pageId] || siteDataBilingual['sushka'];
  const pageData = pageEntry[lang] || pageEntry.ru;
  const images = pageEntry.images || [];
  const tables = pageEntry.tables || [];

  const galleryImages = pageId === 'lamp'
    ? [
        { url: '/images/medicina/lamp_device.png', alt: lang === 'en' ? 'IR Lamp' : 'ИК-лампа' },
        { url: '/images/medicina/ustanovka_st.png', alt: lang === 'en' ? 'Installation "ST"' : 'Установка "ST"' }
      ]
    : images;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightboxAt = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const breadcrumbs = [
    { title: pageData.menu_section || (lang === 'en' ? 'Developments' : 'Разработки') },
    { title: pageData.title }
  ];

  const getPath = (basePath) => {
    if (lang === 'en') {
      return basePath === '/' ? '/en' : `/en${basePath}`;
    }
    return basePath;
  };

  const renderFormattedText = (text) => {
    if (typeof text !== 'string') return text;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const seoDescription = pageData.text 
    ? pageData.text.split('\n')[0].replace(/\*\*/g, '').slice(0, 160)
    : (lang === 'en' ? 'Scientific and technical developments based on functional ceramics.' : 'Научно-технические разработки на основе импульсной функциональной керамики.');

  return (
    <div className="page-wrap">
      <SEO
        title={pageData.title}
        description={seoDescription}
        canonicalPath={lang === 'en' ? `/en/${pageId}` : `/${pageId}`}
        ruPath={`/${pageId}`}
        enPath={`/en/${pageId}`}
        image={galleryImages?.[0]?.url || '/images/logo/logo1.svg'}
        lang={lang}
      />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
        
        <div style={{ marginBottom: 28 }}>
          <h1 className="page-title-heading">{pageData.title}</h1>
        </div>

        {/* Sushka sub-navigation links */}
        {pageId === 'sushka' && (
          <div className="dev-subnav-grid">
            <Link to={getPath('/sush-ustanovka')} className="dev-subnav-card">
              <div className="dev-subnav-card-header">
                <Layers size={20} color="var(--color-primary)" />
                <span>{lang === 'en' ? 'Drying Installation' : 'Сушильная установка'}</span>
              </div>
              <p>
                {lang === 'en' ? 'Models, industrial equipment and specifications' : 'Конструкция, модельный ряд и фото промышленных комплексов'}
              </p>
            </Link>

            <Link to={getPath('/metodikasushka')} className="dev-subnav-card">
              <div className="dev-subnav-card-header">
                <FileCheck size={20} color="var(--color-primary)" />
                <span>{lang === 'en' ? 'Drying Methodology' : 'Методика сушки фруктов и овощей'}</span>
              </div>
              <p>
                {lang === 'en' ? 'Scientific principles, spectrum charts and cell structure preservation' : 'Спектральные графики, сохранение структуры клеток и компонентов'}
              </p>
            </Link>
          </div>
        )}

        {/* Special technological highlights for /plenka (Functional film) */}
        {pageId === 'plenka' && (
          <div style={{
            background: 'linear-gradient(135deg, var(--color-primary-subtle) 0%, #FFFFFF 100%)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '24px 28px',
            margin: '20px 0 36px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', marginBottom: 14 }}>
              <Sparkles size={16} />
              <span>{lang === 'en' ? 'Key Technology Parameters (from source materials)' : 'Ключевые параметры технологии (по материалам исследований)'}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <div style={{ background: '#ffffff', padding: '14px 18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {lang === 'en' ? 'Structure' : 'Структура'}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-dark)', marginTop: 4 }}>
                  {lang === 'en' ? 'Three-layer Cascade Converter' : 'Трехслойный каскадный преобразователь'}
                </div>
              </div>
              <div style={{ background: '#ffffff', padding: '14px 18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {lang === 'en' ? 'Ceramic Content' : 'Содержание керамики'}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-dark)', marginTop: 4 }}>
                  {lang === 'en' ? '0.5–2.5% (greenhouses) / 0.1–1% (drying)' : '0,5–2,5% (теплицы) / 0,1–1% (гелиосушка)'}
                </div>
              </div>
              <div style={{ background: '#ffffff', padding: '14px 18px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {lang === 'en' ? 'Spectrum & Application' : 'Спектр и назначение'}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-dark)', marginTop: 4 }}>
                  {lang === 'en' ? '620–720 nm (phytochrome) · Greenhouses' : '620–720 нм (фитохром) · Теплицы и парники'}
                </div>
              </div>
            </div>
          </div>
        )}

        <article className="article-text-section">
          {pageData.sections && pageData.sections.length > 0 ? (
            pageData.sections.map((sec, sIdx) => {
              if (sec.isLampIntro || sec.title === 'Лампы локального назначения' || sec.title === 'Lamps for local use') {
                return (
                  <div key={sIdx} className="lamp-intro-grid">
                    <div className="lamp-intro-text">
                      {sec.paragraphs && sec.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} style={{ fontSize: '14px', lineHeight: '1.8', marginBottom: pIdx === sec.paragraphs.length - 1 ? 0 : '18px' }}>
                          {renderFormattedText(p)}
                        </p>
                      ))}
                    </div>
                    <div className="lamp-intro-image-wrap">
                      <img
                        src="/images/medicina/lamp_device.png"
                        alt="ИК-лампа"
                        onClick={() => openLightboxAt(0)}
                        style={{ cursor: 'pointer' }}
                        title={lang === 'en' ? 'Click to enlarge' : 'Нажмите для увеличения'}
                      />
                    </div>
                  </div>
                );
              }

              if (sec.isInstallationST) {
                return (
                  <div key={sIdx} className="installation-st-section">
                    {sec.title && (
                      <h2 className="installation-st-title">
                        {sec.title}
                      </h2>
                    )}
                    <div className="installation-st-grid">
                      <div className="installation-st-image-wrap">
                        <img
                          src="/images/medicina/ustanovka_st.png"
                          alt={sec.title || (lang === 'en' ? 'Installation "ST"' : 'Установка "ST"')}
                          onClick={() => openLightboxAt(1)}
                          style={{ cursor: 'pointer' }}
                          title={lang === 'en' ? 'Click to enlarge' : 'Нажмите для увеличения'}
                        />
                      </div>
                      <div className="installation-st-text">
                        {sec.paragraphs && sec.paragraphs.map((p, pIdx) => (
                          <p key={pIdx}>
                            {renderFormattedText(p)}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={sIdx} style={{ marginBottom: 28 }}>
                  {sec.title && (
                    sec.title === 'ТИПЫ ЛАМП' || sec.title === 'TYPES OF LAMPS' ? (
                      <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-primary)', borderBottom: '2px solid var(--color-border)', paddingBottom: '10px', marginTop: '36px', marginBottom: '20px' }}>
                        {sec.title}
                      </h2>
                    ) : (
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary)', marginTop: '24px', marginBottom: '14px' }}>
                        {sec.title}
                      </h3>
                    )
                  )}
                  {sec.paragraphs && sec.paragraphs.map((p, pIdx) => {
                    if (p.startsWith('•') || p.startsWith('-')) {
                      return (
                        <div key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px', lineHeight: 1.65 }}>
                          <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '16px', lineHeight: '1.2' }}>•</span>
                          <span>{renderFormattedText(p.replace(/^[•\-]\s*/, ''))}</span>
                        </div>
                      );
                    }
                    return <p key={pIdx}>{renderFormattedText(p)}</p>;
                  })}
                </div>
              );
            })
          ) : null}

          {/* Tables */}
          {tables.length > 0 && (
            <div style={{ marginTop: 36 }}>
              {tables.map((tbl, tIdx) => (
                <ArticleTable 
                  key={tIdx} 
                  tableData={tbl} 
                  title={lang === 'en' ? `Research Table ${tIdx + 1}` : `Таблица ${tIdx + 1}. Результаты испытаний`} 
                />
              ))}
            </div>
          )}

          {/* Photo gallery */}
          {images.length > 0 && (
            <div style={{ marginTop: 44 }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: 18, color: 'var(--color-dark)' }}>
                {lang === 'en' ? 'Photographs and Diagrams' : 'Фотоматериалы и схемы'}
              </h3>
              <div className="photos-grid-layout">
                {images.map((imgObj, idx) => (
                  <div 
                    key={idx} 
                    className="photo-card-item"
                    onClick={() => openLightboxAt(idx)}
                    title={lang === 'en' ? 'Click to enlarge' : 'Нажмите для увеличения'}
                  >
                    <img src={imgObj.url} alt={imgObj.alt || pageData.title} loading="lazy" />
                    {imgObj.alt && (
                      <div style={{ padding: '10px 14px', fontSize: '0.85rem', color: 'var(--color-text-secondary)', textAlign: 'center', background: 'var(--color-background-alt)' }}>
                        {imgObj.alt}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Related Scientific Developments Section */}
        <section style={{ marginTop: 60, paddingTop: 40, borderTop: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-dark)', marginBottom: 20 }}>
            {lang === 'en' ? 'Related Scientific Developments' : 'Другие научные разработки'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            {otherDevelopments.slice(0, 4).map((dev, idx) => (
              <Link 
                key={idx} 
                to={getPath(dev.route)}
                style={{
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-background-alt)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.15s ease'
                }}
                className="related-dev-link"
              >
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-dark)' }}>
                  {lang === 'en' ? dev.en : dev.ru}
                </span>
                <ArrowRight size={15} color="var(--color-primary)" />
              </Link>
            ))}
          </div>
        </section>

        {/* Lightbox Modal */}
        <Lightbox
          isOpen={lightboxOpen}
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
          onNext={() => setLightboxIndex((prev) => (prev + 1) % galleryImages.length)}
        />
      </div>
    </div>
  );
};

export default DevelopmentPage;
