import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Lightbox from '../components/Lightbox';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { PLENKA_CONTENT, PLENKA_FIGURES } from '../data/plenka/plenkaDocData';
import { getLocalizedImage } from '../utils/imageLocalization';
import { Maximize2, Thermometer, Droplets, Sparkles } from 'lucide-react';

const PlenkaPage = () => {
  const { lang } = useLanguage();
  const content = PLENKA_CONTENT[lang] || PLENKA_CONTENT.ru;
  const isRu = lang !== 'en';

  const figures = PLENKA_FIGURES.map((fig) => ({
    ...fig,
    url: getLocalizedImage(fig.url, lang),
    alt: lang === 'en' ? (fig.altEn || fig.alt) : (fig.altRu || fig.alt),
    caption: lang === 'en' ? (fig.captionEn || fig.caption) : (fig.captionRu || fig.caption)
  }));

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (figIndex) => {
    setLightboxIndex(figIndex);
    setLightboxOpen(true);
  };

  const handlePrevImage = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : figures.length - 1));
  };

  const handleNextImage = () => {
    setLightboxIndex((prev) => (prev < figures.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="page-wrap plenka-page-wrap">
      <SEO
        title={content.seo.title}
        description={content.seo.description}
        canonicalPath={isRu ? '/plenka' : '/en/plenka'}
        ruPath="/plenka"
        enPath="/en/plenka"
        lang={lang}
      />

      <div className="container">
        <Breadcrumbs items={content.breadcrumbs} />

        {/* Page Title */}
        <div className="plenka-header-block">
          <h1 className="page-title-heading">{content.title}</h1>
        </div>

        <article className="plenka-article">
          {/* 1. Вводное описание каскадного преобразования */}
          <section id="intro" className="plenka-section plenka-intro-section">
            {content.sections.intro.title && (
              <h2 className="plenka-section-heading">
                {content.sections.intro.title}
              </h2>
            )}

            {/* Hero Image / Рисунок парника (без рамки, слева с обтеканием) */}
            <div 
              className="plenka-hero-float-media cursor-zoom" 
              onClick={() => openLightbox(0)}
              title={isRu ? "Нажмите для увеличения" : "Click to enlarge"}
            >
              <img 
                src={figures[0].url} 
                alt={figures[0].alt} 
                className="plenka-hero-float-img"
                loading="eager"
              />
              <button 
                className="plenka-zoom-trigger-btn" 
                aria-label={isRu ? "Увеличить изображение" : "Enlarge image"}
              >
                <Maximize2 size={18} />
              </button>
            </div>

              {content.sections.intro.paragraphs.map((p, idx) => (
                <p key={idx} className="plenka-text-paragraph">
                  {p}
                </p>
              ))}

              <div className="plenka-callout-box">
                <p className="plenka-callout-lead">
                  {content.sections.intro.tasksLead}
                </p>
                <ul className="plenka-bullet-list">
                  {content.sections.intro.tasks.map((task, idx) => (
                    <li key={idx} className="plenka-bullet-item">
                      <span className="plenka-bullet-dot"></span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 2. Трёхслойный каскадный композит */}
            <section id="composite-structure" className="plenka-section">
              <div className="plenka-section-title-wrap">
                <h2 className="plenka-section-heading">
                  {content.sections.composite.title}
                </h2>
                <span className="plenka-section-subtitle">
                  {content.sections.composite.subtitle}
                </span>
              </div>



              {/* Рис. 1 */}
              <figure className="plenka-doc-figure">
                <div 
                  className="plenka-image-wrapper cursor-zoom" 
                  onClick={() => openLightbox(1)}
                  title={isRu ? "Нажмите для увеличения" : "Click to enlarge"}
                >
                  <img 
                    src={figures[1].url} 
                    alt={figures[1].alt} 
                    className="plenka-doc-image"
                    loading="lazy"
                  />
                  <button className="plenka-zoom-trigger-btn" aria-label={isRu ? "Увеличить" : "Enlarge"}>
                    <Maximize2 size={16} />
                  </button>
                </div>
                <figcaption className="plenka-figure-caption">
                  {figures[1].caption}
                </figcaption>
              </figure>
            </section>

            {/* 3. Работа плёнки */}
            <section id="film-operation" className="plenka-section">
              <h2 className="plenka-section-heading">
                {content.sections.operation.title}
              </h2>
              <p className="plenka-text-paragraph">
                {content.sections.operation.lead}
              </p>

              {/* Рис. 2 */}
              <figure className="plenka-doc-figure">
                <div 
                  className="plenka-image-wrapper cursor-zoom" 
                  onClick={() => openLightbox(2)}
                  title={isRu ? "Нажмите для увеличения" : "Click to enlarge"}
                >
                  <img 
                    src={figures[2].url} 
                    alt={figures[2].alt} 
                    className="plenka-doc-image"
                    loading="lazy"
                  />
                  <button className="plenka-zoom-trigger-btn" aria-label={isRu ? "Увеличить" : "Enlarge"}>
                    <Maximize2 size={16} />
                  </button>
                </div>
                <figcaption className="plenka-figure-caption">
                  {figures[2].caption}
                </figcaption>
              </figure>
            </section>

            {/* 4. Особенно важный диапазон 600–680 нм */}
            <section id="range-600-680" className="plenka-section">
              <h2 className="plenka-section-heading">
                {content.sections.range600_680.title}
              </h2>
              {content.sections.range600_680.paragraphs.map((p, idx) => (
                <p key={idx} className="plenka-text-paragraph">
                  {p}
                </p>
              ))}

              {/* Рис. 3 */}
              <figure className="plenka-doc-figure">
                <div 
                  className="plenka-image-wrapper cursor-zoom" 
                  onClick={() => openLightbox(3)}
                  title={isRu ? "Нажмите для увеличения" : "Click to enlarge"}
                >
                  <img 
                    src={figures[3].url} 
                    alt={figures[3].alt} 
                    className="plenka-doc-image"
                    loading="lazy"
                  />
                  <button className="plenka-zoom-trigger-btn" aria-label={isRu ? "Увеличить" : "Enlarge"}>
                    <Maximize2 size={16} />
                  </button>
                </div>
                <figcaption className="plenka-figure-caption">
                  {figures[3].caption}
                </figcaption>
              </figure>
            </section>

            {/* 5. Воздействие на растения */}
            <section id="plant-impact" className="plenka-section">
              <h2 className="plenka-section-heading">
                {content.sections.plants.title}
              </h2>
              <p className="plenka-text-paragraph">
                {content.sections.plants.lead}
              </p>

              {/* Рис. 4 */}
              <figure className="plenka-doc-figure">
                <div 
                  className="plenka-image-wrapper cursor-zoom" 
                  onClick={() => openLightbox(4)}
                  title={isRu ? "Нажмите для увеличения" : "Click to enlarge"}
                >
                  <img 
                    src={figures[4].url} 
                    alt={figures[4].alt} 
                    className="plenka-doc-image"
                    loading="lazy"
                  />
                  <button className="plenka-zoom-trigger-btn" aria-label={isRu ? "Увеличить" : "Enlarge"}>
                    <Maximize2 size={16} />
                  </button>
                </div>
                <figcaption className="plenka-figure-caption">
                  {figures[4].caption}
                </figcaption>
              </figure>
            </section>

            {/* 6. Воздействие на фотосинтез */}
            <section id="photosynthesis-impact" className="plenka-section">
              <h2 className="plenka-section-heading">
                {content.sections.photosynthesis.title}
              </h2>
              {content.sections.photosynthesis.paragraphs.map((p, idx) => (
                <p key={idx} className="plenka-text-paragraph">
                  {p}
                </p>
              ))}
            </section>

            {/* 7. Воздействие на температуру */}
            <section id="temperature-impact" className="plenka-section">
              <h2 className="plenka-section-heading">
                <Thermometer size={24} className="plenka-heading-icon" />
                <span>{content.sections.temperature.title}</span>
              </h2>
              {content.sections.temperature.paragraphs.map((p, idx) => (
                <p key={idx} className="plenka-text-paragraph">
                  {p}
                </p>
              ))}

              <div className="plenka-diff-box">
                {content.sections.temperature.differences.map((diff, idx) => (
                  <div key={idx} className="plenka-diff-badge">
                    <span className="plenka-diff-text">{diff}</span>
                  </div>
                ))}
              </div>

              <p className="plenka-text-paragraph plenka-highlight-paragraph">
                {content.sections.temperature.stabilizationNote}
              </p>
            </section>

            {/* 8. Что происходит ночью */}
            <section id="night-mode" className="plenka-section">
              <h2 className="plenka-section-heading">
                {content.sections.night.title}
              </h2>
              {content.sections.night.paragraphs.map((p, idx) => (
                <p key={idx} className="plenka-text-paragraph">
                  {p}
                </p>
              ))}
            </section>

            {/* 9. Влияние на влажность */}
            <section id="humidity-impact" className="plenka-section">
              <h2 className="plenka-section-heading">
                <Droplets size={24} className="plenka-heading-icon" />
                <span>{content.sections.humidity.title}</span>
              </h2>
              {content.sections.humidity.paragraphs.map((p, idx) => (
                <p 
                  key={idx} 
                  className={
                    idx === 2 
                      ? 'plenka-text-paragraph plenka-highlight-paragraph' 
                      : 'plenka-text-paragraph'
                  }
                >
                  {p}
                </p>
              ))}
            </section>

            {/* 10. Применение в условиях высокой солнечной радиации */}
            <section id="desert-regions" className="plenka-section">
              <h2 className="plenka-section-heading">
                {content.sections.desert.title}
              </h2>
              {content.sections.desert.paragraphs.map((p, idx) => (
                <p key={idx} className="plenka-text-paragraph">
                  {p}
                </p>
              ))}

              <div className="plenka-behavior-card">
                {content.sections.desert.behavior.map((b, idx) => (
                  <div key={idx} className="plenka-behavior-line">
                    <span className="plenka-behavior-bullet">✦</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <p className="plenka-text-paragraph">
                {content.sections.desert.conclusion}
              </p>

              {/* Рис. 5 */}
              <figure className="plenka-doc-figure">
                <div 
                  className="plenka-image-wrapper cursor-zoom" 
                  onClick={() => openLightbox(5)}
                  title={isRu ? "Нажмите для увеличения" : "Click to enlarge"}
                >
                  <img 
                    src={figures[5].url} 
                    alt={figures[5].alt} 
                    className="plenka-doc-image"
                    loading="lazy"
                  />
                  <button className="plenka-zoom-trigger-btn" aria-label={isRu ? "Увеличить" : "Enlarge"}>
                    <Maximize2 size={16} />
                  </button>
                </div>
                <figcaption className="plenka-figure-caption">
                  {figures[5].caption}
                </figcaption>
              </figure>
            </section>

            {/* 11. Главное преимущество трёхслойной конструкции */}
            <section id="main-advantage" className="plenka-section">
              <h2 className="plenka-section-heading">
                {content.sections.mainAdvantage.title}
              </h2>

              <div className="plenka-comparison-grid">
                {content.sections.mainAdvantage.comparisons.map((c, idx) => (
                  <div 
                    key={idx} 
                    className={
                      idx === 1 
                        ? 'plenka-comparison-card plenka-comparison-active' 
                        : 'plenka-comparison-card'
                    }
                  >
                    <h3 className="plenka-comparison-title">{c.type}</h3>
                    <p className="plenka-comparison-flow">{c.flow}</p>
                  </div>
                ))}
              </div>

              <p className="plenka-text-paragraph plenka-highlight-paragraph">
                {content.sections.mainAdvantage.conclusion}
              </p>
            </section>

            {/* 12. Кратко: что даёт Трёхслойная ИК плёнка */}
            <section id="summary-effects" className="plenka-section">
              <h2 className="plenka-section-heading">
                <Sparkles size={24} className="plenka-heading-icon" />
                <span>{content.sections.summary.title}</span>
              </h2>

              {/* Рис. 6 */}
              <figure className="plenka-doc-figure">
                <div 
                  className="plenka-image-wrapper cursor-zoom" 
                  onClick={() => openLightbox(6)}
                  title={isRu ? "Нажмите для увеличения" : "Click to enlarge"}
                >
                  <img 
                    src={figures[6].url} 
                    alt={figures[6].alt} 
                    className="plenka-doc-image"
                    loading="lazy"
                  />
                  <button className="plenka-zoom-trigger-btn" aria-label={isRu ? "Увеличить" : "Enlarge"}>
                    <Maximize2 size={16} />
                  </button>
                </div>
                <figcaption className="plenka-figure-caption">
                  {figures[6].caption}
                </figcaption>
              </figure>
            </section>
          </article>
      </div>

      {/* Global Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        images={figures}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />
    </div>
  );
};

export default PlenkaPage;
