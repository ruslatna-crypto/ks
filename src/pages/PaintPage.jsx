import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import Lightbox from '../components/Lightbox';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { PAINT_DATA } from '../data/paint/paintData';
import '../styles/paint.css';
import {
  Maximize2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Layers,
  Sparkles,
  Sliders,
  Check
} from 'lucide-react';

const PaintPage = () => {
  const { lang } = useLanguage();
  const isRu = lang !== 'en';
  const data = isRu ? PAINT_DATA.ru : PAINT_DATA.en;

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Gallery items for lightbox (Hero installation + diagram + tradic + princip + 4 specimens)
  const lightboxImages = useMemo(() => {
    return [
      {
        url: data.hero.image,
        alt: data.hero.imageAlt,
        caption: data.hero.imageAlt
      },
      {
        url: data.hero.diagram,
        alt: data.hero.diagramAlt,
        caption: data.hero.diagramAlt
      },
      {
        url: data.techComparison.image,
        alt: data.techComparison.imageAlt,
        caption: data.techComparison.title
      },
      {
        url: data.physicsChain.image,
        alt: data.physicsChain.imageAlt,
        caption: data.physicsChain.title
      },
      {
        url: data.companiesSection.image,
        alt: data.companiesSection.imageAlt,
        caption: data.companiesSection.title
      },
      ...data.companiesSection.docs.map((doc) => ({
        url: doc.url,
        alt: doc.alt,
        caption: doc.caption
      })),
      {
        url: data.testResults.sravImage,
        alt: data.testResults.sravImageAlt,
        caption: data.testResults.title
      },
      {
        url: data.testResults.primerImage,
        alt: data.testResults.primerImageAlt,
        caption: data.testResults.materialsTable?.title || data.testResults.title
      },
      ...data.gallerySection.items.map((item) => ({
        url: item.image,
        alt: item.alt,
        caption: item.caption || item.title
      }))
    ];
  }, [data]);

  const openLightboxForUrl = (url) => {
    const foundIdx = lightboxImages.findIndex((img) => img.url === url);
    if (foundIdx !== -1) {
      setLightboxIndex(foundIdx);
      setLightboxOpen(true);
    }
  };

  const openLightboxAt = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const breadcrumbs = [
    { label: isRu ? 'Разработки' : 'Developments', path: isRu ? '/#developments' : '/en#developments' },
    { label: data.hero.title }
  ];

  return (
    <div className="paint-page-wrap">
      {/* 1. SEO Meta */}
      <SEO
        title={data.seo.title}
        description={data.seo.description}
        canonicalPath={data.seo.canonicalPath}
        ruPath={data.seo.ruPath}
        enPath={data.seo.enPath}
        image={data.seo.image}
        lang={lang}
      />

      {/* 2. Breadcrumbs */}
      <div className="container" style={{ paddingTop: 14 }}>
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* 3. Hero Section */}
      <header className="paint-hero-section">
        <div className="container">
          <div className="paint-hero-intro-grid">
            <div className="paint-hero-text-block">
              <h1 className="paint-hero-title">{data.hero.title}</h1>
              <p className="paint-hero-p">{data.hero.paragraph1}</p>
              <p className="paint-hero-p">{data.hero.paragraph2}</p>
            </div>

            <div className="paint-hero-ust-wrap">
              <figure 
                className="paint-hero-ust-figure" 
                onClick={() => openLightboxForUrl(data.hero.image)}
                title={isRu ? 'Нажмите для увеличения' : 'Click to enlarge'}
              >
                <img 
                  src={data.hero.image} 
                  alt={data.hero.imageAlt} 
                  loading="eager"
                />
                <span className="paint-zoom-hint">
                  <Maximize2 size={13} />
                  {isRu ? 'Увеличить' : 'Zoom'}
                </span>
              </figure>
            </div>
          </div>
        </div>
      </header>

      {/* 4. Technology Comparison: Traditional vs Innovative */}
      <section className="paint-section">
        <div className="container">
          <div className="paint-section-header">
            <h2 className="paint-section-title">{data.techComparison.title}</h2>
            <p className="paint-section-subtitle">{data.techComparison.subtitle}</p>
          </div>

          <div className="paint-tech-image-wrap">
            <figure 
              className="paint-clickable-figure"
              onClick={() => openLightboxForUrl(data.techComparison.image)}
              title={isRu ? 'Нажмите для увеличения' : 'Click to enlarge'}
            >
              <img 
                src={data.techComparison.image} 
                alt={data.techComparison.imageAlt} 
                loading="lazy"
              />
              <span className="paint-zoom-hint">
                <Maximize2 size={13} />
                {isRu ? 'Увеличить' : 'Zoom'}
              </span>
            </figure>
          </div>
        </div>
      </section>

      {/* 5. Physical Mechanism: Basic Physical Principle */}
      <section className="paint-section paint-section-princip" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="paint-princip-image-wrap">
            <figure 
              className="paint-clickable-figure"
              onClick={() => openLightboxForUrl(data.physicsChain.image)}
              title={isRu ? 'Нажмите для увеличения' : 'Click to enlarge'}
            >
              <img 
                src={data.physicsChain.image} 
                alt={data.physicsChain.imageAlt} 
                loading="lazy"
              />
              <span className="paint-zoom-hint">
                <Maximize2 size={13} />
                {isRu ? 'Увеличить' : 'Zoom'}
              </span>
            </figure>
          </div>
        </div>
      </section>

      {/* 6. Properties of the Resulting Coating */}
      <section className="paint-section">
        <div className="container">
          <div className="paint-section-header">
            <h2 className="paint-section-title">{data.coatingProperties.title}</h2>
            <p className="paint-section-subtitle">{data.coatingProperties.subtitle}</p>
          </div>

          <div className="paint-properties-grid">
            {data.coatingProperties.properties.map((prop, idx) => (
              <div key={idx} className="paint-property-card">
                <div className="paint-property-top">
                  <div className="paint-property-icon-box">
                    {idx === 0 && <CheckCircle2 size={20} />}
                    {idx === 1 && <ShieldCheck size={20} />}
                    {idx === 2 && <Layers size={20} />}
                    {idx === 3 && <Sparkles size={20} />}
                    {idx === 4 && <Sliders size={20} />}
                  </div>
                  <h3 className="paint-property-title">{prop.title}</h3>
                </div>
                <p className="paint-property-desc">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Industrial Marketing & Corporate Recognition (9 Sectors, 25 Companies) */}
      <section className="paint-section">
        <div className="container">
          <div className="paint-section-header">
            <h2 className="paint-section-title">{data.companiesSection.title}</h2>
            <p className="paint-section-subtitle">{data.companiesSection.subtitle}</p>
          </div>

          <div className="paint-oblast-image-wrap" style={{ marginBottom: 32 }}>
            <figure 
              className="paint-clickable-figure"
              onClick={() => openLightboxForUrl(data.companiesSection.image)}
              title={isRu ? 'Нажмите для увеличения' : 'Click to enlarge'}
            >
              <img 
                src={data.companiesSection.image} 
                alt={data.companiesSection.imageAlt} 
                loading="lazy"
              />
              <span className="paint-zoom-hint">
                <Maximize2 size={13} />
                {isRu ? 'Увеличить' : 'Zoom'}
              </span>
            </figure>
          </div>

          <div className="paint-docs-row">
            {data.companiesSection.docs.map((doc, idx) => (
              <figure 
                key={idx}
                className="paint-clickable-figure paint-doc-figure"
                onClick={() => openLightboxForUrl(doc.url)}
                title={isRu ? 'Нажмите для увеличения' : 'Click to enlarge'}
              >
                <img src={doc.url} alt={doc.alt} loading="lazy" />
                <span className="paint-zoom-hint">
                  <Maximize2 size={13} />
                  {isRu ? 'Увеличить' : 'Zoom'}
                </span>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Test Results: Automotive Enamel ML-1111 & Materials Matrix */}
      <section className="paint-section">
        <div className="container">
          <div className="paint-section-header">
            <h2 className="paint-section-title">{data.testResults.title}</h2>
            <p className="paint-section-subtitle">{data.testResults.subtitle}</p>
          </div>

          <p className="paint-test-intro-text">{data.testResults.intro}</p>

          {/* Srav (Table 1 + impacts replacement) */}
          <div className="paint-srav-image-wrap" style={{ marginBottom: 36 }}>
            <figure 
              className="paint-clickable-figure"
              onClick={() => openLightboxForUrl(data.testResults.sravImage)}
              title={isRu ? 'Нажмите для увеличения' : 'Click to enlarge'}
            >
              <img 
                src={data.testResults.sravImage} 
                alt={data.testResults.sravImageAlt} 
                loading="lazy"
              />
              <span className="paint-zoom-hint">
                <Maximize2 size={13} />
                {isRu ? 'Увеличить' : 'Zoom'}
              </span>
            </figure>
          </div>

          {/* Primer (Table 2 replacement) */}
          <div className="paint-primer-image-wrap">
            <figure 
              className="paint-clickable-figure"
              onClick={() => openLightboxForUrl(data.testResults.primerImage)}
              title={isRu ? 'Нажмите для увеличения' : 'Click to enlarge'}
            >
              <img 
                src={data.testResults.primerImage} 
                alt={data.testResults.primerImageAlt} 
                loading="lazy"
              />
              <span className="paint-zoom-hint">
                <Maximize2 size={13} />
                {isRu ? 'Увеличить' : 'Zoom'}
              </span>
            </figure>
          </div>
        </div>
      </section>

      {/* 9. Gallery of Specimens (4 Materials) */}
      <section className="paint-section">
        <div className="container">
          <div className="paint-section-header">
            <h2 className="paint-section-title">{data.gallerySection.title}</h2>
            <p className="paint-section-subtitle">{data.gallerySection.subtitle}</p>
          </div>

          <div className="paint-gallery-grid">
            {data.gallerySection.items.map((specimen, idx) => (
              <div 
                key={specimen.id} 
                className="paint-specimen-card"
                onClick={() => openLightboxForUrl(specimen.image)}
                title={isRu ? 'Нажмите для увеличения' : 'Click to enlarge'}
              >
                <div className="paint-specimen-img-box">
                  <img src={specimen.image} alt={specimen.alt} loading="lazy" />
                  <span className="paint-specimen-time-tag">{specimen.time}</span>
                </div>
                <div className="paint-specimen-body">
                  <h3 className="paint-specimen-title">{specimen.title}</h3>
                  <p className="paint-specimen-desc">{specimen.description}</p>
                  <div className="paint-specimen-footer">
                    <Maximize2 size={14} />
                    <span>{isRu ? 'Увеличить образец' : 'Inspect specimen'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* 11. Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : lightboxImages.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev < lightboxImages.length - 1 ? prev + 1 : 0))}
      />
    </div>
  );
};

export default PaintPage;
