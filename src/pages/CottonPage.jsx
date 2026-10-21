import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Lightbox from '../components/Lightbox';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { COTTON_DATA, COTTON_IMAGES } from '../data/cotton/cottonData';
import '../styles/cotton.css';
import { Maximize2, FileText, Play } from 'lucide-react';

const CottonVideoCard = ({ video, isRu }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = React.useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      setIsPlaying(true);
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Playback notice:', err);
        });
      }
    }
  };

  return (
    <div className="cotton-video-card">
      <div 
        className="cotton-video-player-box" 
        onClick={!isPlaying ? handlePlay : undefined}
      >
        <video
          ref={videoRef}
          controls={isPlaying}
          poster={video.poster}
          preload="metadata"
          playsInline
          className="cotton-video-element"
          onPlay={() => setIsPlaying(true)}
        >
          <source src={video.mp4Url} type="video/mp4" />
          <source src={video.aviUrl} type="video/x-msvideo" />
          {isRu ? "Ваш браузер не поддерживает видео." : "Your browser does not support the video tag."}
        </video>

        {!isPlaying && (
          <button 
            type="button" 
            className="cotton-video-play-btn"
            onClick={handlePlay}
            aria-label={isRu ? "Воспроизвести видео" : "Play video"}
          >
            <Play size={26} className="cotton-play-icon" />
          </button>
        )}
      </div>
      <div className="cotton-video-caption">
        <span className="cotton-video-tag">{video.tag}</span>
        <p className="cotton-video-title">{video.title}</p>
        <p className="cotton-video-file-info">{video.filename}</p>
      </div>
    </div>
  );
};

const CottonPage = () => {
  const { lang } = useLanguage();
  const content = COTTON_DATA[lang] || COTTON_DATA.ru;
  const isRu = lang !== 'en';

  const localizedImages = COTTON_IMAGES.map((img) => ({
    ...img,
    url: isRu ? (img.urlRu || img.url) : (img.urlEn || img.url),
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

  const openLightboxById = (id) => {
    const idx = localizedImages.findIndex((i) => i.id === id);
    if (idx >= 0) {
      setLightboxIndex(idx);
      setLightboxOpen(true);
    }
  };

  const handlePrevImage = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : localizedImages.length - 1));
  };

  const handleNextImage = () => {
    setLightboxIndex((prev) => (prev < localizedImages.length - 1 ? prev + 1 : 0));
  };

  // Image references by ID
  const startImg = localizedImages.find((i) => i.id === 'cotton-dryer-start') || localizedImages[0];
  const compImg = localizedImages.find((i) => i.id === 'cotton-comparison-chart') || localizedImages[1];
  const sravsushImg = localizedImages.find((i) => i.id === 'cotton-drying-tech-comparison') || localizedImages[2];
  const semenaImg = localizedImages.find((i) => i.id === 'cotton-seeds-comparison') || localizedImages[3];
  const criteriaImg = localizedImages.find((i) => i.id === 'cotton-criteria-comparison') || localizedImages[4];
  const interesImg = localizedImages.find((i) => i.id === 'cotton-industrial-interest') || localizedImages[5];
  const heroImg = localizedImages.find((i) => i.id === 'cotton-dryer-industrial') || localizedImages[6];
  const realUstImg = localizedImages.find((i) => i.id === 'cotton-conveyor-real') || localizedImages[7];
  const balesImg = localizedImages.find((i) => i.id === 'cotton-bales-storage') || localizedImages[8];
  const fieldImg = localizedImages.find((i) => i.id === 'cotton-field-harvest') || localizedImages[9];
  const protocolImg = localizedImages.find((i) => i.id === 'cotton-protocol-isp');
  const svedenieImg = localizedImages.find((i) => i.id === 'cotton-svedenie');
  const svedenie1Img = localizedImages.find((i) => i.id === 'cotton-svedenie-1');
  const docImages = [protocolImg, svedenieImg, svedenie1Img].filter(Boolean);

  const pdfDocs = [
    {
      id: 'cotton-pdf-otchet',
      title: isRu ? 'Отчет по сушке хлопка' : 'Cotton Drying Report',
      tag: 'PDF',
      pdfUrl: '/pdf/hlopok/Otchet.pdf',
      coverUrl: '/images/hlopok/otchetosuhke1.jpg'
    },
    {
      id: 'cotton-pdf-stimul',
      title: isRu ? 'Стимуляция роста хлопка' : 'Cotton Growth Stimulation',
      tag: 'PDF',
      pdfUrl: '/pdf/hlopok/Stimul.pdf',
      coverUrl: '/images/hlopok/stimulrosta1.jpg'
    }
  ];

  const videoDocs = [
    {
      id: 'cotton-video-process',
      title: isRu ? 'Процесс сушки хлопка' : 'Raw Cotton Drying Process',
      filename: 'Process.avi',
      tag: isRu ? 'Видео' : 'Video',
      mp4Url: '/videos/hlopok/Process.mp4',
      aviUrl: '/videos/hlopok/Process.avi',
      poster: '/videos/hlopok/Process_poster.jpg'
    },
    {
      id: 'cotton-video-vidup',
      title: isRu ? 'Вид сверху установки' : 'Installation Top View',
      filename: 'Vidup.avi',
      tag: isRu ? 'Видео' : 'Video',
      mp4Url: '/videos/hlopok/Vidup.mp4',
      aviUrl: '/videos/hlopok/Vidup.avi',
      poster: '/videos/hlopok/Vidup_poster.jpg'
    }
  ];

  return (
    <div className="page-wrap cotton-page-wrap">
      <SEO
        title={content.seo.title}
        description={content.seo.description}
        canonicalPath={isRu ? '/hlopok' : '/en/cotton'}
        ruPath="/hlopok"
        enPath="/en/cotton"
        lang={lang}
      />

      <div className="container">
        <Breadcrumbs items={content.breadcrumbs} />

        {/* =========================================================
            1. HERO BLOCK
           ========================================================= */}
        <header className="cotton-hero-section">
          <div className="cotton-hero-layout">
            <div className="cotton-hero-text">
              <h1 className="cotton-hero-title">{content.hero.title}</h1>
              <p className="cotton-hero-subtitle">{content.hero.subtitle}</p>
            </div>
            <div 
              className="cotton-hero-media cursor-zoom"
              onClick={() => openLightboxById('cotton-dryer-start')}
              title={isRu ? "Нажмите для увеличения" : "Click to enlarge"}
            >
              <img 
                src={startImg.url} 
                alt={startImg.alt} 
                className="cotton-hero-start-img"
                loading="eager"
              />
              <button className="cotton-zoom-trigger-btn" aria-label={isRu ? "Увеличить" : "Enlarge"}>
                <Maximize2 size={18} />
              </button>
            </div>
          </div>
        </header>

        <article className="cotton-article">

          {/* =========================================================
              1. ТЕХНОЛОГИЯ, КОТОРАЯ РАБОТАЕТ С ВЛАГОЙ
             ========================================================= */}
          <section id="moisture-principle" className="cotton-section cotton-prose-section">
            <h2 className="cotton-section-title">{content.moisturePrinciple.title}</h2>
            <div className="cotton-prose-body">
              {content.moisturePrinciple.paragraphs.map((p, idx) => (
                <p key={idx} className="cotton-body-paragraph">{p}</p>
              ))}
            </div>
          </section>

          {/* =========================================================
              2. ГЛАВНОЕ ПРЕИМУЩЕСТВО — ЭНЕРГОЭФФЕКТИВНОСТЬ
             ========================================================= */}
          <section id="energy-efficiency" className="cotton-section cotton-energy-section">
            <h2 className="cotton-section-title">{content.energyEfficiency.title}</h2>
            <p className="cotton-body-paragraph">
              {content.energyEfficiency.description}
            </p>

            {/* Infographic 1: Convective vs IR with Ceramics (sravnenie1.png / sravnenie1_eng.png) */}
            <div className="cotton-comparison-image-wrap">
              <div 
                className="cotton-comparison-img-box cursor-zoom"
                onClick={() => openLightboxById('cotton-comparison-chart')}
                title={isRu ? "Нажмите для увеличения" : "Click to enlarge"}
              >
                <img 
                  src={compImg.url} 
                  alt={compImg.alt} 
                  className="cotton-comparison-img"
                  loading="lazy"
                />
                <button className="cotton-zoom-trigger-btn" aria-label={isRu ? "Увеличить" : "Enlarge"}>
                  <Maximize2 size={18} />
                </button>
              </div>
              <p className="cotton-comparison-caption">
                {compImg.caption}
              </p>
            </div>

            {/* Infographic 2: Comparison of Drying Technologies (sravsush.png / sravsush_eng.png) */}
            <div className="cotton-comparison-image-wrap">
              <div 
                className="cotton-comparison-img-box cursor-zoom"
                onClick={() => openLightboxById('cotton-drying-tech-comparison')}
                title={isRu ? "Нажмите для увеличения" : "Click to enlarge"}
              >
                <img 
                  src={sravsushImg.url} 
                  alt={sravsushImg.alt} 
                  className="cotton-comparison-img"
                  loading="lazy"
                />
                <button className="cotton-zoom-trigger-btn" aria-label={isRu ? "Увеличить" : "Enlarge"}>
                  <Maximize2 size={18} />
                </button>
              </div>
              <p className="cotton-comparison-caption">
                {sravsushImg.caption}
              </p>
            </div>

            {/* Italic Disclaimer Note Under Second Infographic */}
            <p className="cotton-energy-disclaimer-note">
              <em>{content.energyEfficiency.disclaimer}</em>
            </p>
          </section>

          {/* =========================================================
              3. БЫСТРОЕ СНИЖЕНИЕ ВЛАЖНОСТИ
             ========================================================= */}
          <section id="rapid-drying" className="cotton-section cotton-prose-section">
            <h2 className="cotton-section-title">{content.rapidDrying.title}</h2>
            <div className="cotton-prose-body">
              {content.rapidDrying.paragraphs.map((p, idx) => (
                <p key={idx} className="cotton-body-paragraph">{p}</p>
              ))}
            </div>
          </section>

          {/* =========================================================
              4. НЕ ТОЛЬКО СУШКА: ЕДИНАЯ ТЕХНОЛОГИЯ ДЛЯ ХЛОПКОВОДСТВА
             ========================================================= */}
          <section id="unified-platform" className="cotton-section cotton-prose-section">
            <h2 className="cotton-section-title">{content.unifiedPlatform.title}</h2>
            <div className="cotton-prose-body">
              {content.unifiedPlatform.paragraphs.map((p, idx) => (
                <p key={idx} className="cotton-body-paragraph">{p}</p>
              ))}
            </div>
          </section>

          {/* =========================================================
              5. РЕЗУЛЬТАТЫ ОБРАБОТКИ СЕМЯН
             ========================================================= */}
          <section id="seed-results" className="cotton-section cotton-prose-section">
            <h2 className="cotton-section-title">{content.seedResults.title}</h2>
            <div className="cotton-prose-body">
              {content.seedResults.paragraphs.map((p, idx) => (
                <p key={idx} className="cotton-body-paragraph">{p}</p>
              ))}
            </div>

            {/* Seed Treatment Infographic (semena.png / semena_eng.png) */}
            <div className="cotton-comparison-image-wrap">
              <div 
                className="cotton-comparison-img-box cursor-zoom"
                onClick={() => openLightboxById('cotton-seeds-comparison')}
                title={isRu ? "Нажмите для увеличения" : "Click to enlarge"}
              >
                <img 
                  src={semenaImg.url} 
                  alt={semenaImg.alt} 
                  className="cotton-comparison-img"
                  loading="lazy"
                />
                <button className="cotton-zoom-trigger-btn" aria-label={isRu ? "Увеличить" : "Enlarge"}>
                  <Maximize2 size={18} />
                </button>
              </div>
              <p className="cotton-comparison-caption">
                {semenaImg.caption}
              </p>
            </div>
          </section>

          {/* =========================================================
              6. СРАВНЕНИЕ С АЛЬТЕРНАТИВНЫМИ ПОДХОДАМИ
             ========================================================= */}
          <section id="alternatives" className="cotton-section cotton-prose-section">
            <h2 className="cotton-section-title">{content.comparisonAlternatives.title}</h2>
            <div className="cotton-prose-body">
              {content.comparisonAlternatives.paragraphs.map((p, idx) => (
                <p key={idx} className="cotton-body-paragraph">{p}</p>
              ))}
            </div>

            {/* Criteria Infographic (criteriya.png / criteriya_eng.png) */}
            <div className="cotton-comparison-image-wrap">
              <div 
                className="cotton-comparison-img-box cursor-zoom"
                onClick={() => openLightboxById('cotton-criteria-comparison')}
                title={isRu ? "Нажмите для увеличения" : "Click to enlarge"}
              >
                <img 
                  src={criteriaImg.url} 
                  alt={criteriaImg.alt} 
                  className="cotton-comparison-img"
                  loading="lazy"
                />
                <button className="cotton-zoom-trigger-btn" aria-label={isRu ? "Увеличить" : "Enlarge"}>
                  <Maximize2 size={18} />
                </button>
              </div>
              <p className="cotton-comparison-caption">
                {criteriaImg.caption}
              </p>
            </div>
          </section>

          {/* =========================================================
              7. ПОЧЕМУ ЭТО ИНТЕРЕСНО ПРОМЫШЛЕННОСТИ (ИНФОГРАФИКА)
             ========================================================= */}
          <section id="industrial-advantages" className="cotton-section cotton-prose-section">
            <h2 className="cotton-section-title">{content.industrialAdvantages.title}</h2>

            {/* Industrial Interest Infographic (interes.png / interes_eng.png) */}
            <div className="cotton-comparison-image-wrap">
              <div 
                className="cotton-comparison-img-box cursor-zoom"
                onClick={() => openLightboxById('cotton-industrial-interest')}
                title={isRu ? "Нажмите для увеличения" : "Click to enlarge"}
              >
                <img 
                  src={interesImg.url} 
                  alt={interesImg.alt} 
                  className="cotton-comparison-img"
                  loading="lazy"
                />
                <button className="cotton-zoom-trigger-btn" aria-label={isRu ? "Увеличить" : "Enlarge"}>
                  <Maximize2 size={18} />
                </button>
              </div>
              <p className="cotton-comparison-caption">
                {interesImg.caption}
              </p>
            </div>
          </section>

          {/* =========================================================
              8. КОНСТРУКЦИЯ УСТАНОВКИ
             ========================================================= */}
          <section id="equipment" className="cotton-section cotton-equipment-section">
            <div className="cotton-section-header">
              <h2 className="cotton-section-title">{content.equipmentConstruction.title}</h2>
              <p className="cotton-section-lead">{content.equipmentConstruction.lead}</p>
            </div>

            <div className="cotton-equipment-row">
              {/* Technical flowchart nodes */}
              <div className="cotton-equipment-nodes">
                {content.equipmentConstruction.elements.map((el, idx) => (
                  <div key={el.num} className="cotton-equipment-step">
                    <div className="cotton-equip-step-badge">{el.num}</div>
                    <div className="cotton-equip-step-info">
                      <h4>{el.name}</h4>
                      <p>{el.desc}</p>
                    </div>
                    {idx < content.equipmentConstruction.elements.length - 1 && (
                      <div className="cotton-equip-step-line" aria-hidden="true"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Technical equipment photo */}
              <div 
                className="cotton-equipment-media cursor-zoom"
                onClick={() => openLightboxById('cotton-dryer-industrial')}
                title={isRu ? "Нажмите для увеличения" : "Click to enlarge"}
              >
                <div className="cotton-media-card">
                  <img 
                    src={heroImg.url} 
                    alt={heroImg.alt} 
                    className="cotton-equip-img"
                    loading="lazy"
                  />
                  <button className="cotton-zoom-trigger-btn" aria-label={isRu ? "Увеличить" : "Enlarge"}>
                    <Maximize2 size={18} />
                  </button>
                  <div className="cotton-media-caption">
                    <span className="cotton-img-tag">{heroImg.tag}</span>
                    <p className="cotton-caption-text">{heroImg.caption}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Картинки в один ряд под конструкцией установки: Protokol isp.jpg, Svedenie.jpg, Svedenie1.jpg */}
            {docImages.length > 0 && (
              <div className="cotton-equipment-docs-row">
                {docImages.map((doc) => (
                  <div 
                    key={doc.id}
                    className="cotton-doc-card cursor-zoom"
                    onClick={() => openLightboxById(doc.id)}
                    title={isRu ? "Нажмите для увеличения" : "Click to enlarge"}
                  >
                    <div className="cotton-doc-media">
                      <img 
                        src={doc.url} 
                        alt={doc.alt} 
                        className="cotton-doc-img"
                        loading="lazy"
                      />
                      <button className="cotton-zoom-trigger-btn" aria-label={isRu ? "Увеличить" : "Enlarge"}>
                        <Maximize2 size={18} />
                      </button>
                    </div>
                    <div className="cotton-doc-caption">
                      <span className="cotton-doc-tag">{doc.tag}</span>
                      <p className="cotton-doc-title">{doc.alt}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PDF файлы: Otchet.pdf и Stimul.pdf (размер меньше верхних картинок на 20%) */}
            {pdfDocs.length > 0 && (
              <div className="cotton-equipment-pdf-row">
                {pdfDocs.map((doc) => (
                  <a 
                    key={doc.id}
                    href={doc.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cotton-pdf-card"
                    title={isRu ? "Открыть PDF в программе просмотра" : "Open PDF viewer"}
                  >
                    <div className="cotton-pdf-media">
                      <img 
                        src={doc.coverUrl} 
                        alt={doc.title} 
                        className="cotton-pdf-img"
                        loading="lazy"
                      />
                      <div className="cotton-pdf-badge-overlay">
                        <FileText size={12} />
                        <span>PDF</span>
                      </div>
                    </div>
                    <div className="cotton-pdf-caption">
                      <span className="cotton-pdf-tag">{doc.tag}</span>
                      <p className="cotton-pdf-title">{doc.title}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* Видео: Process.avi и Vidup.avi */}
            {videoDocs.length > 0 && (
              <div className="cotton-equipment-video-row">
                {videoDocs.map((video) => (
                  <CottonVideoCard 
                    key={video.id} 
                    video={video} 
                    isRu={isRu} 
                  />
                ))}
              </div>
            )}

          </section>

        </article>
      </div>

      {/* Lightbox Component for high-res image viewing */}
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

export default CottonPage;
