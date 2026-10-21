import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Lightbox from '../components/Lightbox';
import PdfModal from '../components/PdfModal';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import {
  METOD_INTRO,
  METOD_EMITTERS,
  METOD_INSTALLATION_ST,
  METOD_DOCUMENTS
} from '../data/metod/metodData';
import '../styles/metod.css';
import {
  Activity,
  CheckCircle2,
  ShieldCheck,
  Check,
  Maximize2,
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  Eye,
  Globe
} from 'lucide-react';

const MetodPage = () => {
  const { lang } = useLanguage();
  const isRu = lang !== 'en';

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activePdf, setActivePdf] = useState(null);

  const openPdfModal = (fileData, docTitle) => {
    setActivePdf({
      url: fileData.url,
      title: docTitle,
      filename: fileData.filename,
      size: fileData.size,
      pages: fileData.pages
    });
  };

  const breadcrumbs = [
    { title: isRu ? 'Медицина' : 'Medicine' },
    { title: isRu ? METOD_INTRO.titleRu : METOD_INTRO.titleEn }
  ];

  const galleryImages = (METOD_INTRO.applicationImages || []).map((img) => ({
    url: img.src,
    alt: isRu ? img.altRu : img.altEn,
    caption: isRu ? img.captionRu : img.captionEn
  }));

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="page-wrap metod-page-wrap">
      <SEO
        title={isRu ? `${METOD_INTRO.titleRu} — KERAMIKA SINTEZ` : `${METOD_INTRO.titleEn} — KERAMIKA SINTEZ`}
        description={isRu
          ? 'Метод резонансной терапии Р. Х. Рахимова «Инфра-Р». Керамические ИК-излучатели (серии K, R, G, AF, Z). Установка «СТ» для органов малого таза.'
          : 'Resonance therapy method of R. Kh. Rakhimov "Infra-R". Ceramic IR emitters (series K, R, G, AF, Z). Installation "ST" for pelvic organs.'}
        canonicalPath={isRu ? '/metod' : '/en/metod'}
        ruPath="/metod"
        enPath="/en/metod"
        image="/images/medicina/ustanovka_st.png"
        lang={lang}
      />

      <div className="container">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <header className="metod-hero">
          <h1 className="metod-hero-title">
            {isRu ? METOD_INTRO.titleRu : METOD_INTRO.titleEn}
          </h1>
          <p className="metod-hero-lead">
            {isRu ? METOD_INTRO.leadRu : METOD_INTRO.leadEn}
          </p>
          <div className="metod-hero-concept">
            {isRu ? METOD_INTRO.conceptRu : METOD_INTRO.conceptEn}
          </div>
        </header>

        {/* Text sections flowing one after another */}
        <section className="metod-intro-text-flow">
          {METOD_INTRO.principles.map((pr, idx) => (
            <div key={idx} className="metod-intro-text-block">
              <h2 className="metod-intro-subheading">
                {isRu ? pr.titleRu : pr.titleEn}
              </h2>
              {(isRu ? (pr.paragraphsRu || [pr.descRu]) : (pr.paragraphsEn || [pr.descEn])).map((pText, pIdx) => (
                <p key={pIdx} className="metod-intro-paragraph">
                  {pText}
                </p>
              ))}
            </div>
          ))}

          {/* Section: Основные группы излучателей */}
          <div className="metod-intro-text-block">
            <h2 className="metod-intro-subheading">
              {isRu ? METOD_INTRO.seriesOverviewTitleRu : METOD_INTRO.seriesOverviewTitleEn}
            </h2>
            <p className="metod-intro-paragraph">
              {isRu ? METOD_INTRO.seriesOverviewIntroRu : METOD_INTRO.seriesOverviewIntroEn}
            </p>
            <ul className="metod-series-bullet-list">
              {METOD_INTRO.seriesGroups.map((grp) => (
                <li key={grp.code} className="metod-series-bullet-item">
                  <strong>{isRu ? grp.titleRu : grp.titleEn}</strong> — {isRu ? grp.textRu : grp.textEn}
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Применение излучателей */}
          {METOD_INTRO.applicationRu && (
            <div className="metod-intro-text-block">
              <h2 className="metod-intro-subheading">
                {isRu ? METOD_INTRO.applicationRu.titleRu : METOD_INTRO.applicationRu.titleEn}
              </h2>
              <p className="metod-intro-paragraph">
                {isRu ? METOD_INTRO.applicationRu.p1Ru : METOD_INTRO.applicationRu.p1En}
              </p>
              <p className="metod-intro-paragraph">
                {isRu ? METOD_INTRO.applicationRu.p2Ru : METOD_INTRO.applicationRu.p2En}
              </p>
              <p className="metod-intro-paragraph">
                {isRu ? METOD_INTRO.applicationRu.conclusionRu : METOD_INTRO.applicationRu.conclusionEn}
              </p>

              {/* Картинки после раздела "Применение излучателей": Локальные лампы и Установка СТ */}
              {METOD_INTRO.applicationImages && METOD_INTRO.applicationImages.length > 0 && (
                <div
                  className="metod-media-gallery"
                  aria-label={isRu ? 'Иллюстрации к разделу «Применение излучателей»' : 'Illustrations for Emitters Application'}
                >
                  {METOD_INTRO.applicationImages.map((imgItem, idx) => {
                    const caption = isRu ? imgItem.captionRu : imgItem.captionEn;
                    const altText = isRu ? imgItem.altRu : imgItem.altEn;
                    return (
                      <figure
                        key={idx}
                        className="metod-media-card"
                        onClick={() => openLightbox(idx)}
                        tabIndex={0}
                        role="button"
                        aria-label={isRu ? `Увеличить: ${caption}` : `Enlarge: ${caption}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openLightbox(idx);
                          }
                        }}
                      >
                        <div className="metod-media-img-wrap">
                          <img
                            src={imgItem.src}
                            alt={altText}
                            loading="lazy"
                            className="metod-media-img"
                          />
                          <span className="metod-media-zoom-badge">
                            <Maximize2 size={13} />
                            <span>{isRu ? 'Увеличить' : 'Zoom'}</span>
                          </span>
                        </div>
                        <figcaption className="metod-media-caption">
                          {caption}
                        </figcaption>
                      </figure>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Emitter Catalog & Filter Bar */}
        <section className="metod-catalog-section">
          <div className="metod-section-header">
            <h2 className="metod-section-title">
              <Activity size={22} color="var(--color-primary)" />
              <span>{isRu ? 'Каталог излучателей и лечебных комбинаций' : 'Catalog of Emitters and Therapeutic Combinations'}</span>
            </h2>
            <p className="metod-section-subtitle">
              {isRu
                ? 'Дифференцированный подбор керамических излучателей по направлениям воздействия и клиническим показаниям.'
                : 'Differentiated selection of ceramic emitters by target effects and clinical indications.'}
            </p>
          </div>

          {/* Cards Stack */}
          <div className="metod-emitters-grid">
            {METOD_EMITTERS.map((emitter) => {
              const seriesClass = `series-${emitter.series.toLowerCase()}`;
              return (
                <article key={emitter.id} className="metod-emitter-card">
                  <div className="metod-emitter-top">
                    <span className="metod-emitter-code">{emitter.code}</span>
                    <span className={`metod-emitter-badge ${seriesClass}`}>
                      {isRu ? emitter.badgeRu : emitter.badgeEn}
                    </span>
                  </div>

                  <h3 className="metod-emitter-title">
                    {isRu ? emitter.titleRu : emitter.titleEn}
                  </h3>

                  <p className="metod-emitter-desc">
                    {isRu ? emitter.descRu : emitter.descEn}
                  </p>

                  <div className="metod-emitter-indications-box">
                    <div className="metod-emitter-indications-title">
                      <CheckCircle2 size={15} color="var(--color-primary)" />
                      <span>{isRu ? emitter.indicationsTitleRu : emitter.indicationsTitleEn}</span>
                    </div>
                    <ul className="metod-emitter-indications-list">
                      {(isRu ? emitter.indicationsRu : emitter.indicationsEn).map((ind, iIdx) => (
                        <li key={iIdx}>
                          <Check size={14} color="var(--color-primary)" />
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {emitter.clinicalNotesRu && (
                    <div className="metod-emitter-clinical-box">
                      <strong>{isRu ? 'Клиническое применение: ' : 'Clinical application: '}</strong>
                      {isRu ? emitter.clinicalNotesRu : emitter.clinicalNotesEn}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* Installation «СТ» Section */}
        <section className="metod-st-section">
          <div className="metod-st-info">
            <h2 className="metod-st-title">
              {isRu ? METOD_INSTALLATION_ST.titleRu : METOD_INSTALLATION_ST.titleEn}
            </h2>
            <p className="metod-st-desc">
              {isRu ? METOD_INSTALLATION_ST.desc1Ru : METOD_INSTALLATION_ST.desc1En}
            </p>
            <p className="metod-st-desc">
              {isRu ? METOD_INSTALLATION_ST.desc2Ru : METOD_INSTALLATION_ST.desc2En}
            </p>
            <div className="metod-st-control-callout">
              <ShieldCheck size={20} color="var(--color-primary)" />
              <span>{isRu ? METOD_INSTALLATION_ST.controlNoteRu : METOD_INSTALLATION_ST.controlNoteEn}</span>
            </div>
          </div>

          <div className="metod-st-indications-flow">
            <h3 className="metod-st-indications-heading">
              {isRu ? 'Показания к применению' : 'Indications for Use'}
            </h3>
            {METOD_INSTALLATION_ST.categories.map((cat) => (
              <div key={cat.id} className="metod-st-category-block">
                <div className="metod-st-category-title">
                  {isRu ? cat.titleRu : cat.titleEn}:
                </div>
                <ul className="metod-st-category-bullets">
                  {(isRu ? cat.itemsRu : cat.itemsEn).map((it, idx) => (
                    <li key={idx} className="metod-st-category-bullet-item">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion / Summary Banner */}
        <section className="metod-conclusion-banner">
          <h3>
            {isRu ? METOD_INTRO.applicationRu.titleRu : METOD_INTRO.applicationRu.titleEn}
          </h3>
          <p>
            {isRu ? METOD_INTRO.applicationRu.p1Ru : METOD_INTRO.applicationRu.p1En}
          </p>
          <p>
            {isRu ? METOD_INTRO.applicationRu.p2Ru : METOD_INTRO.applicationRu.p2En}
          </p>
          <p style={{ fontWeight: 600, color: 'var(--color-dark)', marginTop: 8 }}>
            {isRu ? METOD_INTRO.applicationRu.conclusionRu : METOD_INTRO.applicationRu.conclusionEn}
          </p>
        </section>

        {/* Scientific & Methodological Documents Section */}
        <section className="metod-documents-section" id="documents">
          <div className="metod-section-header">
            <h2 className="metod-section-title">
              <FileText size={22} color="var(--color-primary)" />
              <span>{isRu ? METOD_DOCUMENTS.sectionTitleRu : METOD_DOCUMENTS.sectionTitleEn}</span>
            </h2>
            <p className="metod-section-subtitle">
              {isRu ? METOD_DOCUMENTS.sectionSubtitleRu : METOD_DOCUMENTS.sectionSubtitleEn}
            </p>
          </div>

          <div className="metod-documents-grid">
            {METOD_DOCUMENTS.items.map((item) => {
              const currentFile = isRu ? item.fileRu : item.fileEn;
              const altFile = isRu ? item.fileEn : item.fileRu;
              const title = isRu ? item.titleRu : item.titleEn;
              const category = isRu ? item.categoryRu : item.categoryEn;
              const desc = isRu ? item.descRu : item.descEn;

              return (
                <article key={item.id} className="metod-doc-card">
                  <div className="metod-doc-card-main">
                    {/* Cover thumbnail */}
                    <button
                      type="button"
                      onClick={() => openPdfModal(currentFile, title)}
                      className="metod-doc-cover"
                      title={isRu ? `Открыть «${title}» (PDF)` : `Open "${title}" (PDF)`}
                      aria-label={isRu ? `Открыть «${title}» в просмотрщике` : `Open "${title}" in viewer`}
                    >
                      <img
                        src={currentFile.coverUrl}
                        alt={title}
                        className="metod-doc-cover-img"
                        loading="lazy"
                      />
                      <span className="metod-doc-badge-format">
                        <FileText size={11} />
                        <span>PDF</span>
                      </span>
                      <span className="metod-doc-badge-pages">
                        {currentFile.pages}
                      </span>
                      <span className="metod-doc-cover-hover-hint">
                        <Eye size={16} />
                        <span>{isRu ? 'Просмотр' : 'Preview'}</span>
                      </span>
                    </button>

                    {/* Content details */}
                    <div className="metod-doc-info">
                      <div className="metod-doc-header-row">
                        <span className="metod-doc-category-tag">{category}</span>
                        <span className="metod-doc-size-tag">{currentFile.size}</span>
                      </div>

                      <h3 className="metod-doc-title">
                        <button
                          type="button"
                          onClick={() => openPdfModal(currentFile, title)}
                          className="metod-doc-title-btn"
                        >
                          {title}
                        </button>
                      </h3>

                      <p className="metod-doc-desc">{desc}</p>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="metod-doc-actions-footer">
                    <div className="metod-doc-buttons-group">
                      <button
                        type="button"
                        onClick={() => openPdfModal(currentFile, title)}
                        className="metod-doc-btn metod-doc-btn-open"
                        title={isRu ? 'Открыть документ в просмотрщике' : 'Open document in viewer'}
                      >
                        <Eye size={15} />
                        <span>{isRu ? 'Открыть PDF' : 'Open PDF'}</span>
                      </button>

                      <a
                        href={currentFile.url}
                        download={currentFile.filename}
                        className="metod-doc-btn metod-doc-btn-download"
                        title={isRu ? `Скачать ${currentFile.filename}` : `Download ${currentFile.filename}`}
                      >
                        <Download size={15} />
                        <span>{isRu ? 'Скачать' : 'Download'}</span>
                      </a>
                    </div>

                    <div className="metod-doc-alt-lang-row">
                      <Globe size={13} className="metod-doc-globe-icon" />
                      <span className="metod-doc-alt-lang-label">
                        {isRu ? 'English version:' : 'Русская версия:'}
                      </span>
                      <button
                        type="button"
                        onClick={() => openPdfModal(altFile, isRu ? item.titleEn : item.titleRu)}
                        className="metod-doc-alt-lang-btn"
                        title={isRu ? 'Открыть документ на английском языке' : 'Open document in Russian'}
                      >
                        {altFile.filename} ({altFile.size})
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Author external website cards (styled as interactive cards like ref image) */}
          <div className="metod-author-cards-grid">
            {/* Card 1: Author Website (Method & Lamps) */}
            <a
              href="https://www.rakhimovr.uz/lamp"
              target="_blank"
              rel="noopener noreferrer"
              className="metod-author-card"
            >
              <div className="metod-author-card-header">
                <div className="metod-author-card-icon-box">
                  <FileText size={22} />
                </div>
                <h3 className="metod-author-card-title">
                  {isRu ? 'Более подробно на сайте Автора' : "More details on the Author's website"}
                </h3>
              </div>
              <p className="metod-author-card-desc">
                {isRu
                  ? 'Подробная информация о методике резонансной терапии «Инфра-Р», керамических ИК-излучателях, принципах действия и клинических наблюдениях.'
                  : 'Detailed information on the "Infra-R" resonance therapy methodology, ceramic IR emitters, operating principles, and clinical observations.'}
              </p>
              <div className="metod-author-card-btn">
                <span>{isRu ? 'Перейти на сайт' : 'Visit website'}</span>
                <span className="metod-author-card-arrow">→</span>
              </div>
            </a>

            {/* Card 2: Monographs */}
            <a
              href="https://www.rakhimovr.uz/book"
              target="_blank"
              rel="noopener noreferrer"
              className="metod-author-card"
            >
              <div className="metod-author-card-header">
                <div className="metod-author-card-icon-box">
                  <BookOpen size={22} />
                </div>
                <h3 className="metod-author-card-title">
                  {isRu ? 'Монографии' : 'Monographs'}
                </h3>
              </div>
              <p className="metod-author-card-desc">
                {isRu
                  ? 'Фундаментальные монографии и научные труды профессора Р. Х. Рахимова по керамическому материаловедению, биологическому действию ИК-лучей и медицине.'
                  : 'Fundamental monographs and scientific works by Professor R. Kh. Rakhimov on functional ceramics, biological IR effects, and medicine.'}
              </p>
              <div className="metod-author-card-btn">
                <span>{isRu ? 'Перейти к монографиям' : 'View monographs'}</span>
                <span className="metod-author-card-arrow">→</span>
              </div>
            </a>
          </div>
        </section>

        {/* Lightbox for gallery images */}
        <Lightbox
          isOpen={lightboxOpen}
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
          onNext={() => setLightboxIndex((prev) => (prev + 1) % galleryImages.length)}
        />

        {/* In-page PDF Viewer Modal */}
        <PdfModal
          isOpen={!!activePdf}
          pdf={activePdf}
          onClose={() => setActivePdf(null)}
          isRu={isRu}
        />
      </div>
    </div>
  );
};

export default MetodPage;
