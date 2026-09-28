import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Lightbox from '../components/Lightbox';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { STERIL_CONTENT, STERIL_IMAGES } from '../data/steril/sterilData';
import { getLocalizedImage } from '../utils/imageLocalization';
import { 
  Maximize2, 
  Thermometer, 
  Clock, 
  Zap, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';

const SterilPage = () => {
  const { lang } = useLanguage();
  const content = STERIL_CONTENT[lang] || STERIL_CONTENT.ru;
  const isRu = lang !== 'en';

  const localizedImages = STERIL_IMAGES.map((img) => ({
    ...img,
    url: getLocalizedImage(img.url, lang),
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

  // Scalpel images
  const scalpelImages = localizedImages.filter((img) => img.id.startsWith('scalpel-'));
  // KS-250 Sterilizer unit photo
  const ks250Image = localizedImages.find((img) => img.id === 'sterilizer-ks250');
  const ks250Index = localizedImages.findIndex((img) => img.id === 'sterilizer-ks250');
  // Principle diagram (princ.png / princ_eng.png)
  const principleImage = localizedImages.find((img) => img.id === 'principle-diagram');
  const principleIndex = localizedImages.findIndex((img) => img.id === 'principle-diagram');

  return (
    <div className="page-wrap steril-page-wrap">
      <SEO
        title={content.seo.title}
        description={content.seo.description}
        canonicalPath={isRu ? '/steril' : '/en/steril'}
        ruPath="/steril"
        enPath="/en/steril"
        lang={lang}
      />

      <div className="container">
        <Breadcrumbs items={content.breadcrumbs} />

        {/* 1. Header Block */}
        <header className="steril-header-block">
          <h1 className="page-title-heading">{content.title}</h1>
        </header>

        <article className="steril-article">
          {/* 1. Introduction: Functional Ceramics with Sterilizer Photo & Medical Instruments */}
          <section className="steril-section steril-prose-section">
            <div className="steril-intro-row">
              <div className="steril-intro-text-col">
                <h2 className="steril-prose-heading">{content.functionalCeramics.title}</h2>
                {content.functionalCeramics.paragraphs.map((p, idx) => (
                  <p key={`fc-${idx}`} className="steril-prose-text">{p}</p>
                ))}
              </div>

              {ks250Image && (
                <div 
                  className="steril-intro-media-col"
                  onClick={() => openLightbox(ks250Index)}
                  title={isRu ? 'Нажмите для увеличения' : 'Click to enlarge'}
                >
                  <img 
                    src={ks250Image.url} 
                    alt={ks250Image.alt} 
                    className="steril-intro-img"
                    loading="lazy"
                  />
                </div>
              )}
            </div>

            <div className="steril-prose-block">
              <h2 className="steril-prose-heading">{content.medicalInstruments.title}</h2>
              {content.medicalInstruments.paragraphs.map((p, idx) => (
                <p key={`mi-${idx}`} className="steril-prose-text">{p}</p>
              ))}
            </div>
          </section>

          {/* 2. Surface of Instruments After Treatment (Micrographs: 2 top, 3 bottom) */}
          <section className="steril-section steril-surface-section">
            <div className="steril-section-header">
              <h2 className="steril-section-title">{content.surface.title}</h2>
              <p className="steril-section-subtitle">{content.surface.subtitle}</p>
            </div>

            <div className="steril-gallery-block">
              {/* Row 1: Cards 1 & 2 */}
              <div className="steril-gallery-row steril-gallery-row-top">
                {scalpelImages.slice(0, 2).map((img) => (
                  <div 
                    key={img.id} 
                    className="steril-gallery-card"
                    onClick={() => openLightbox(localizedImages.findIndex((item) => item.id === img.id))}
                  >
                    <div className="steril-gallery-img-wrap">
                      <img 
                        src={img.url} 
                        alt={img.alt} 
                        className="steril-gallery-img"
                        loading="lazy"
                      />
                      <div className="steril-img-overlay">
                        <span className="steril-zoom-btn" title={content.surface.zoomHint}>
                          <Maximize2 size={15} />
                        </span>
                      </div>
                    </div>
                    <div className="steril-gallery-info">
                      <span className="steril-gallery-tag">{img.tag}</span>
                      <p className="steril-gallery-caption">{img.caption}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 2: Cards 3, 4 & 5 */}
              <div className="steril-gallery-row steril-gallery-row-bottom">
                {scalpelImages.slice(2, 5).map((img) => (
                  <div 
                    key={img.id} 
                    className="steril-gallery-card"
                    onClick={() => openLightbox(localizedImages.findIndex((item) => item.id === img.id))}
                  >
                    <div className="steril-gallery-img-wrap">
                      <img 
                        src={img.url} 
                        alt={img.alt} 
                        className="steril-gallery-img"
                        loading="lazy"
                      />
                      <div className="steril-img-overlay">
                        <span className="steril-zoom-btn" title={content.surface.zoomHint}>
                          <Maximize2 size={15} />
                        </span>
                      </div>
                    </div>
                    <div className="steril-gallery-info">
                      <span className="steril-gallery-tag">{img.tag}</span>
                      <p className="steril-gallery-caption">{img.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Operating Principle of Pulsed IR Sterilization */}
          <section className="steril-section steril-prose-section">
            <div className="steril-prose-block">
              <h2 className="steril-prose-heading">{content.pulsePrinciple.title}</h2>
              {content.pulsePrinciple.paragraphs.map((p, idx) => (
                <p key={`pp-${idx}`} className="steril-prose-text">{p}</p>
              ))}
            </div>

            {/* Operating Principle Diagram (princ.png / princ_eng.png) */}
            {principleImage && (
              <figure className="steril-principle-figure">
                <div 
                  className="steril-principle-img-wrap"
                  onClick={() => openLightbox(principleIndex)}
                  title={isRu ? 'Нажмите для увеличения схемы' : 'Click to enlarge diagram'}
                >
                  <img 
                    src={principleImage.url} 
                    alt={principleImage.alt} 
                    className="steril-principle-img"
                    loading="lazy"
                  />
                  <div className="steril-img-overlay">
                    <span className="steril-zoom-btn">
                      <Maximize2 size={20} />
                    </span>
                  </div>
                </div>
              </figure>
            )}
          </section>

          {/* 4. Technical Features & Other Objects */}
          <section className="steril-section steril-prose-section">
            <div className="steril-prose-block">
              <h2 className="steril-prose-heading">{content.technicalFeatures.title}</h2>
              <ul className="steril-features-list">
                {content.technicalFeatures.items.map((item, idx) => (
                  <li key={`tf-${idx}`} className="steril-feature-item">
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="steril-prose-heading">{content.otherObjects.title}</h2>
              {content.otherObjects.paragraphs.map((p, idx) => (
                <p key={`oo-${idx}`} className="steril-prose-text">{p}</p>
              ))}
            </div>
          </section>
        </article>
      </div>

      {/* Lightbox for all images */}
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

export default SterilPage;
