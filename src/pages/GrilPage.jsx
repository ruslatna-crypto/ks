import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Lightbox from '../components/Lightbox';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { GRIL_CONTENT, GRIL_IMAGES } from '../data/gril/grilData';
import '../styles/gril.css';
import { 
  Clock, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  Maximize2, 
  Flame, 
  ShieldCheck, 
  Layers, 
  Globe, 
  Scale, 
  UtensilsCrossed, 
  Sparkles,
  Award,
  Factory,
  Home as HomeIcon,
  ChefHat
} from 'lucide-react';

const GrilPage = () => {
  const { lang } = useLanguage();
  const isRu = lang !== 'en';
  const content = GRIL_CONTENT[lang] || GRIL_CONTENT.ru;

  const localizedImages = GRIL_IMAGES.map((img) => ({
    ...img,
    alt: isRu ? img.altRu : img.altEn,
    caption: isRu ? img.captionRu : img.captionEn,
    tag: isRu ? img.tagRu : img.tagEn
  }));

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handlePrevImage = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : localizedImages.length - 1));
  };

  const handleNextImage = () => {
    setLightboxIndex((prev) => (prev < localizedImages.length - 1 ? prev + 1 : 0));
  };

  // Dedicated image references
  const heroGrillImage = localizedImages.find((img) => img.id === 'gril-hero-bbq');
  const heroGrillIndex = localizedImages.findIndex((img) => img.id === 'gril-hero-bbq');

  const mainBakeryImage = localizedImages.find((img) => img.id === 'bakery-assorted');
  const mainBakeryIndex = localizedImages.findIndex((img) => img.id === 'bakery-assorted');

  const galleryItems = localizedImages.filter((img) => 
    img.id !== 'gril-hero-bbq' && img.id !== 'bakery-assorted'
  );

  return (
    <div className="page-wrap gril-page-wrap">
      <SEO
        title={content.seo.title}
        description={content.seo.description}
        canonicalPath={isRu ? '/gril' : '/en/gril'}
        ruPath="/gril"
        enPath="/en/gril"
        image={heroGrillImage ? heroGrillImage.url : '/images/grili/gr1.jpg'}
        lang={lang}
      />

      <div className="container">
        <Breadcrumbs items={content.breadcrumbs} />

        {/* 1. Header Hero Block */}
        <header className="gril-header-block">
          <div className="gril-header-badges">
            <span className="gril-tag-badge">
              <Sparkles size={14} />
              {isRu ? 'Функциональная керамика' : 'Functional Ceramics'}
            </span>
            <span className="gril-tag-badge">
              <Flame size={14} />
              {isRu ? 'Импульсное ИК-излучение' : 'Pulsed IR Radiation'}
            </span>
            <span className="gril-tag-badge">
              <ShieldCheck size={14} />
              {isRu ? 'Глубокая стерилизация' : 'Simultaneous Sterilization'}
            </span>
            <span className="gril-tag-badge gril-tag-accent">
              <Zap size={14} />
              {isRu ? 'Энергосбережение до 30 раз' : 'Energy Savings up to 30×'}
            </span>
          </div>

          <h1 className="page-title-heading gril-main-title">{content.title}</h1>
          <p className="gril-header-lead">{content.lead}</p>
        </header>

        <article className="gril-article">
          {/* 2. Принцип действия технологии */}
          <section className="gril-section gril-principle-section">
            <div className="gril-section-header">
              <h2 className="gril-section-title">{content.principle.title}</h2>
              <div className="gril-title-bar" />
            </div>

            <div className="gril-principle-prose">
              {content.principle.paragraphs.map((p, idx) => (
                <p key={`pp-${idx}`} className="gril-prose-text">{p}</p>
              ))}
            </div>

            <div className="gril-principle-cards-grid">
              {content.principle.points.map((pt, idx) => (
                <div key={`point-${idx}`} className="gril-principle-card">
                  <div className="gril-card-top-icon">
                    {idx === 0 && <Layers size={22} />}
                    {idx === 1 && <Flame size={22} />}
                    {idx === 2 && <Sparkles size={22} />}
                    {idx === 3 && <ShieldCheck size={22} />}
                  </div>
                  <h3 className="gril-card-title">{pt.title}</h3>
                  <p className="gril-card-descr">{pt.descr}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Блок «Грили и жарочные шкафы» */}
          <section className="gril-section gril-equipment-section">
            <div className="gril-section-header">
              <h2 className="gril-section-title">{content.grillSection.title}</h2>
              <p className="gril-section-subtitle">{content.grillSection.subtitle}</p>
              <div className="gril-title-bar" />
            </div>

            <div className="gril-feature-row">
              <div className="gril-feature-content-col">
                {content.grillSection.paragraphs.map((p, idx) => (
                  <p key={`gp-${idx}`} className="gril-prose-text">{p}</p>
                ))}

                <div className="gril-advantages-box">
                  <h3 className="gril-adv-box-heading">
                    <CheckCircle2 size={18} className="gril-accent-icon" />
                    {isRu ? 'Практические преимущества грилей и жарочных шкафов:' : 'Practical Advantages of Grills & Roasting Ovens:'}
                  </h3>
                  <ul className="gril-features-list">
                    {content.grillSection.advantagesList.map((item, idx) => (
                      <li key={`ga-${idx}`} className="gril-feature-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {heroGrillImage && (
                <div className="gril-feature-media-col">
                  <figure 
                    className="gril-media-figure"
                    onClick={() => openLightbox(heroGrillIndex)}
                    title={content.gallery.zoomHint}
                  >
                    <div className="gril-media-img-wrap">
                      <img 
                        src={heroGrillImage.url} 
                        alt={heroGrillImage.alt} 
                        className="gril-feature-img"
                        loading="lazy"
                      />
                      <div className="gril-media-overlay">
                        <span className="gril-zoom-pill">
                          <Maximize2 size={16} />
                          <span>{content.gallery.zoomHint}</span>
                        </span>
                      </div>
                    </div>
                    <figcaption className="gril-media-caption">
                      <span className="gril-badge-micro">{heroGrillImage.tag}</span>
                      <p>{heroGrillImage.caption}</p>
                    </figcaption>
                  </figure>
                </div>
              )}
            </div>

            {/* Метрики грилей и жарочных шкафов */}
            <div className="gril-metrics-block">
              <h3 className="gril-metrics-heading">
                <Scale size={20} className="gril-accent-icon" />
                {isRu ? 'Сравнительные показатели эффективности (Грили / Жарочные шкафы)' : 'Comparative Performance Indicators (Grills / Roasting Ovens)'}
              </h3>
              <div className="gril-metrics-grid">
                {content.grillSection.metrics.map((m, idx) => (
                  <div key={`gm-${idx}`} className="gril-metric-card">
                    <div className="gril-metric-header">
                      <span className="gril-metric-label">{m.label}</span>
                    </div>
                    <div className="gril-metric-comparison">
                      <div className="gril-val-old" title={isRu ? 'Обычная печь / традиционное оборудование' : 'Conventional oven / standard equipment'}>
                        <span className="val-tag">{isRu ? 'Обычная печь' : 'Conventional'}</span>
                        <span className="val-number">{m.oldVal}</span>
                      </div>
                      <div className="gril-metric-arrow">→</div>
                      <div className="gril-val-new" title={isRu ? 'Оборудование с функциональной керамикой' : 'Functional ceramic equipment'}>
                        <span className="val-tag">{isRu ? 'Керамика Синтез' : 'Keramika Sintez'}</span>
                        <span className="val-number">{m.newVal}</span>
                      </div>
                    </div>
                    <div className="gril-metric-footer">
                      <span className="gril-metric-note">{m.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Блок «Выпечка печенья и хлебобулочных изделий» */}
          <section className="gril-section gril-baking-section">
            <div className="gril-section-header">
              <h2 className="gril-section-title">{content.bakingSection.title}</h2>
              <p className="gril-section-subtitle">{content.bakingSection.subtitle}</p>
              <div className="gril-title-bar" />
            </div>

            <div className="gril-feature-row gril-feature-row-reverse">
              <div className="gril-feature-content-col">
                {content.bakingSection.paragraphs.map((p, idx) => (
                  <p key={`bp-${idx}`} className="gril-prose-text">{p}</p>
                ))}

                <div className="gril-advantages-box">
                  <h3 className="gril-adv-box-heading">
                    <CheckCircle2 size={18} className="gril-accent-icon" />
                    {isRu ? 'Практические преимущества технологии выпечки:' : 'Practical Advantages of Baking Technology:'}
                  </h3>
                  <ul className="gril-features-list">
                    {content.bakingSection.advantagesList.map((item, idx) => (
                      <li key={`ba-${idx}`} className="gril-feature-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {mainBakeryImage && (
                <div className="gril-feature-media-col">
                  <figure 
                    className="gril-media-figure"
                    onClick={() => openLightbox(mainBakeryIndex)}
                    title={content.gallery.zoomHint}
                  >
                    <div className="gril-media-img-wrap gril-media-baking-wrap">
                      <img 
                        src={mainBakeryImage.url} 
                        alt={mainBakeryImage.alt} 
                        className="gril-feature-img"
                        loading="lazy"
                      />
                      <div className="gril-media-overlay">
                        <span className="gril-zoom-pill">
                          <Maximize2 size={16} />
                          <span>{content.gallery.zoomHint}</span>
                        </span>
                      </div>
                    </div>
                    <figcaption className="gril-media-caption">
                      <span className="gril-badge-micro">{mainBakeryImage.tag}</span>
                      <p>{mainBakeryImage.caption}</p>
                    </figcaption>
                  </figure>
                </div>
              )}
            </div>

            {/* Метрики выпечки */}
            <div className="gril-metrics-block">
              <h3 className="gril-metrics-heading">
                <Scale size={20} className="gril-accent-icon" />
                {isRu ? 'Сравнительные показатели выпечки хлебобулочных изделий' : 'Comparative Performance Indicators (Bakery Products)'}
              </h3>
              <div className="gril-metrics-grid">
                {content.bakingSection.metrics.map((m, idx) => (
                  <div key={`bm-${idx}`} className="gril-metric-card">
                    <div className="gril-metric-header">
                      <span className="gril-metric-label">{m.label}</span>
                    </div>
                    <div className="gril-metric-comparison">
                      <div className="gril-val-old" title={isRu ? 'Традиционная печь' : 'Conventional oven'}>
                        <span className="val-tag">{isRu ? 'Обычная печь' : 'Conventional'}</span>
                        <span className="val-number">{m.oldVal}</span>
                      </div>
                      <div className="gril-metric-arrow">→</div>
                      <div className="gril-val-new" title={isRu ? 'ИК-выпечная печь / конвейер' : 'Functional ceramic IR oven'}>
                        <span className="val-tag">{isRu ? 'Керамика Синтез' : 'Keramika Sintez'}</span>
                        <span className="val-number">{m.newVal}</span>
                      </div>
                    </div>
                    <div className="gril-metric-footer">
                      <span className="gril-metric-note">{m.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Результаты испытаний (Узбекистан, Россия, Германия, США) */}
          <section className="gril-section gril-tests-section">
            <div className="gril-section-header">
              <div className="gril-section-title-wrap">
                <Globe size={24} className="gril-accent-icon" />
                <h2 className="gril-section-title">{content.testResults.title}</h2>
              </div>
              <p className="gril-section-subtitle">{content.testResults.subtitle}</p>
              <div className="gril-geography-banner">
                <strong>{isRu ? 'География натурных испытаний:' : 'Field Testing Geography:'}</strong> {content.testResults.geography}
              </div>
              <div className="gril-title-bar" />
            </div>

            <div className="gril-tests-panels-grid">
              {/* Панель 1: Жарочные мини-шкафы */}
              <div className="gril-test-panel">
                <div className="gril-test-panel-header">
                  <ChefHat size={22} className="gril-panel-icon" />
                  <h3 className="gril-test-panel-title">{content.testResults.grillOvensTitle}</h3>
                </div>
                <div className="gril-test-items-list">
                  {content.testResults.grillItems.map((item, idx) => (
                    <div key={`gti-${idx}`} className="gril-test-item-card">
                      <div className="gril-test-icon-col">
                        <img src={item.icon} alt="" className="gril-test-svg-icon" />
                      </div>
                      <div className="gril-test-text-col">
                        <h4 className="gril-test-item-title">{item.title}</h4>
                        <div className="gril-test-item-value">{item.value}</div>
                        <p className="gril-test-item-descr">{item.descr}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Панель 2: Выпечное оборудование */}
              <div className="gril-test-panel">
                <div className="gril-test-panel-header">
                  <UtensilsCrossed size={22} className="gril-panel-icon" />
                  <h3 className="gril-test-panel-title">{content.testResults.bakingTitle}</h3>
                </div>
                <div className="gril-test-items-list">
                  {content.testResults.bakingItems.map((item, idx) => (
                    <div key={`bti-${idx}`} className="gril-test-item-card">
                      <div className="gril-test-icon-col">
                        <img src={item.icon} alt="" className="gril-test-svg-icon" />
                      </div>
                      <div className="gril-test-text-col">
                        <h4 className="gril-test-item-title">{item.title}</h4>
                        <div className="gril-test-item-value">{item.value}</div>
                        <p className="gril-test-item-descr">{item.descr}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 6. Сферы применения оборудования */}
          <section className="gril-section gril-applications-section">
            <div className="gril-section-header">
              <h2 className="gril-section-title">{content.applications.title}</h2>
              <p className="gril-section-subtitle">{content.applications.subtitle}</p>
              <div className="gril-title-bar" />
            </div>

            <div className="gril-applications-grid">
              {content.applications.items.map((app, idx) => (
                <div key={`app-${idx}`} className="gril-application-card">
                  <div className="gril-app-icon-wrap">
                    {idx === 0 && <HomeIcon size={26} />}
                    {idx === 1 && <ChefHat size={26} />}
                    {idx === 2 && <Factory size={26} />}
                  </div>
                  <h3 className="gril-app-title">{app.title}</h3>
                  <p className="gril-app-descr">{app.descr}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Фотогалерея готовой продукции */}
          <section className="gril-section gril-gallery-section">
            <div className="gril-section-header">
              <h2 className="gril-section-title">{content.gallery.title}</h2>
              <p className="gril-section-subtitle">{content.gallery.subtitle}</p>
              <div className="gril-title-bar" />
            </div>

            <div className="gril-gallery-grid">
              {galleryItems.map((img) => {
                const fullIndex = localizedImages.findIndex((item) => item.id === img.id);
                return (
                  <div 
                    key={img.id}
                    className="gril-gallery-card"
                    onClick={() => openLightbox(fullIndex)}
                    title={content.gallery.zoomHint}
                  >
                    <div className="gril-gallery-img-container">
                      <img 
                        src={img.url} 
                        alt={img.alt} 
                        className="gril-gallery-img"
                        loading="lazy"
                      />
                      <div className="gril-gallery-overlay">
                        <span className="gril-gallery-zoom-btn">
                          <Maximize2 size={16} />
                        </span>
                      </div>
                    </div>
                    <div className="gril-gallery-info">
                      <span className="gril-gallery-tag">{img.tag}</span>
                      <p className="gril-gallery-caption">{img.caption}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </article>
      </div>

      {/* Lightbox for full image viewing */}
      <Lightbox
        isOpen={lightboxOpen}
        images={localizedImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />
    </div>
  );
};

export default GrilPage;
