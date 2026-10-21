import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import ClinicalSearchBar from '../components/clinical-cases/ClinicalSearchBar';
import ClinicalFilter from '../components/clinical-cases/ClinicalFilter';
import ClinicalStats from '../components/clinical-cases/ClinicalStats';
import ClinicalCaseCard from '../components/clinical-cases/ClinicalCaseCard';
import ClinicalLightbox from '../components/clinical-cases/ClinicalLightbox';
import { clinicalCasesData, clinicalCategories } from '../data/clinicalCases/clinicalCasesData';
import '../styles/clinical-cases.css';
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronsUpDown, ShieldAlert } from 'lucide-react';

export default function ClinicalCasesPage() {
  const { lang } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedIds, setExpandedIds] = useState(new Set());

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // If id is present, find single case
  const singleCase = useMemo(() => {
    if (!id) return null;
    return clinicalCasesData.find(c => c.id === id || String(c.index) === id);
  }, [id]);

  // Previous and Next cases for single view
  const { prevCase, nextCase } = useMemo(() => {
    if (!singleCase) return { prevCase: null, nextCase: null };
    const currentIndex = clinicalCasesData.findIndex(c => c.id === singleCase.id);
    const prev = currentIndex > 0 ? clinicalCasesData[currentIndex - 1] : null;
    const next = currentIndex < clinicalCasesData.length - 1 ? clinicalCasesData[currentIndex + 1] : null;
    return { prevCase: prev, nextCase: next };
  }, [singleCase]);

  // Filtered cases for list view
  const filteredCases = useMemo(() => {
    return clinicalCasesData.filter(c => {
      // Category filter
      if (selectedCategory !== 'all' && c.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const titleRu = (c.titleRu || '').toLowerCase();
        const titleEn = (c.titleEn || '').toLowerCase();
        const contentRu = (c.contentRu || '').toLowerCase();
        const contentEn = (c.contentEn || '').toLowerCase();
        const emitters = (c.emitters || []).join(' ').toLowerCase();
        const patientRu = (c.patientRu || '').toLowerCase();
        const patientEn = (c.patientEn || '').toLowerCase();

        const match =
          titleRu.includes(query) ||
          titleEn.includes(query) ||
          contentRu.includes(query) ||
          contentEn.includes(query) ||
          emitters.includes(query) ||
          patientRu.includes(query) ||
          patientEn.includes(query);

        if (!match) return false;
      }
      return true;
    });
  }, [selectedCategory, searchTerm]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: clinicalCasesData.length };
    clinicalCategories.forEach(cat => {
      if (cat.id !== 'all') {
        counts[cat.id] = clinicalCasesData.filter(c => c.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Accordion toggle handlers
  const toggleCase = (caseId) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(caseId)) {
        next.delete(caseId);
      } else {
        next.add(caseId);
      }
      return next;
    });
  };

  const expandAll = () => {
    const allIds = new Set(filteredCases.map(c => c.id));
    setExpandedIds(allIds);
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  // Lightbox open handler
  const handleImageClick = (images, index) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // -------------------------------------------------------------
  // RENDER: SINGLE CASE VIEW
  // -------------------------------------------------------------
  if (id) {
    if (!singleCase) {
      return (
        <div className="clinical-page-wrap">
          <div className="container" style={{ paddingTop: '60px', textAlign: 'center' }}>
            <h2>{lang === 'en' ? 'Clinical case not found' : 'Клинический случай не найден'}</h2>
            <p style={{ marginTop: '12px', color: 'var(--color-text-secondary)' }}>
              {lang === 'en'
                ? 'The requested clinical observation does not exist in the archive.'
                : 'Запрошенное клиническое наблюдение отсутствует в архиве.'}
            </p>
            <Link
              to={lang === 'en' ? '/en/klinik' : '/klinik'}
              className="clinical-back-btn"
              style={{ display: 'inline-flex', marginTop: '24px' }}
            >
              <ArrowLeft size={16} />
              {lang === 'en' ? 'Back to All Clinical Cases' : 'Вернуться ко всем клиническим случаям'}
            </Link>
          </div>
        </div>
      );
    }

    const caseTitle = lang === 'en' ? (singleCase.titleEn || singleCase.titleRu) : singleCase.titleRu;
    const breadcrumbs = [
      { title: lang === 'en' ? 'Main' : 'Главная', link: lang === 'en' ? '/en' : '/' },
      { title: lang === 'en' ? 'Medicine' : 'Медицина' },
      { title: lang === 'en' ? 'Clinical Cases' : 'Клинические случаи', link: lang === 'en' ? '/en/klinik' : '/klinik' },
      { title: caseTitle }
    ];

    const prevUrl = prevCase ? (lang === 'en' ? `/en/klinik/${prevCase.id}` : `/klinik/${prevCase.id}`) : null;
    const nextUrl = nextCase ? (lang === 'en' ? `/en/klinik/${nextCase.id}` : `/klinik/${nextCase.id}`) : null;

    return (
      <div className="clinical-page-wrap">
        <SEO
          title={lang === 'en' ? `${caseTitle} | Clinical Cases` : `${caseTitle} | Клинические случаи`}
          description={lang === 'en'
            ? `Clinical observation #${singleCase.index}: ${caseTitle}. Infra-red functional ceramics therapy results.`
            : `Клиническое наблюдение #${singleCase.index}: ${caseTitle}. Результаты терапии функциональной керамикой.`}
          canonicalPath={lang === 'en' ? `/en/klinik/${singleCase.id}` : `/klinik/${singleCase.id}`}
          ruPath={`/klinik/${singleCase.id}`}
          enPath={`/en/klinik/${singleCase.id}`}
          lang={lang}
        />

        <div className="container" style={{ paddingTop: '20px' }}>
          <Breadcrumbs items={breadcrumbs} />

          <div className="clinical-single-case-view">
            {/* Navigation back and prev/next bar */}
            <div className="clinical-nav-back-bar">
              <Link to={lang === 'en' ? '/en/klinik' : '/klinik'} className="clinical-back-btn">
                <ArrowLeft size={18} />
                <span>{lang === 'en' ? 'All Clinical Cases' : 'Все клинические случаи'}</span>
              </Link>

              <div className="clinical-prev-next-nav">
                {prevCase ? (
                  <Link to={prevUrl} className="clinical-nav-arrow-btn" title={lang === 'en' ? prevCase.titleEn : prevCase.titleRu}>
                    <ChevronLeft size={18} />
                    <span>{lang === 'en' ? 'Previous' : 'Предыдущий'}</span>
                  </Link>
                ) : (
                  <button className="clinical-nav-arrow-btn is-disabled" disabled>
                    <ChevronLeft size={18} />
                    <span>{lang === 'en' ? 'Previous' : 'Предыдущий'}</span>
                  </button>
                )}

                {nextCase ? (
                  <Link to={nextUrl} className="clinical-nav-arrow-btn" title={lang === 'en' ? nextCase.titleEn : nextCase.titleRu}>
                    <span>{lang === 'en' ? 'Next' : 'Следующий'}</span>
                    <ChevronRight size={18} />
                  </Link>
                ) : (
                  <button className="clinical-nav-arrow-btn is-disabled" disabled>
                    <span>{lang === 'en' ? 'Next' : 'Следующий'}</span>
                    <ChevronRight size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Semantic H1 for SEO and Accessibility */}
            <h1 className="clinical-single-case-heading" style={{ fontSize: '1.85rem', fontWeight: 800, margin: '20px 0 16px', color: '#0f172a', lineHeight: 1.3 }}>
              {caseTitle}
            </h1>

            {/* Single Case Card (always expanded) */}
            <ClinicalCaseCard
              caseItem={singleCase}
              isExpanded={true}
              onToggle={() => {}}
              onImageClick={handleImageClick}
              lang={lang}
              categories={clinicalCategories}
            />
          </div>
        </div>

        {/* Lightbox Modal */}
        <ClinicalLightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={(newIdx) => setLightboxIndex(newIdx)}
          lang={lang}
        />
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: ARCHIVE LIST VIEW
  // -------------------------------------------------------------
  const breadcrumbs = [
    { title: lang === 'en' ? 'Main' : 'Главная', link: lang === 'en' ? '/en' : '/' },
    { title: lang === 'en' ? 'Medicine' : 'Медицина' },
    { title: lang === 'en' ? 'Clinical Cases' : 'Клинические случаи' }
  ];

  const visibleCases = filteredCases;

  return (
    <div className="clinical-page-wrap">
      <SEO
        title={lang === 'en' ? 'Clinical Cases | KERAMIKA SINTEZ' : 'Клинические случаи | KERAMIKA SINTEZ'}
        description={lang === 'en'
          ? 'An archive of clinical observations presented in the source materials and associated with the use of IR emitters.'
          : 'Архив клинических наблюдений, представленных в материалах метода и связанных с применением ИК-излучателей.'}
        canonicalPath={lang === 'en' ? '/en/klinik' : '/klinik'}
        ruPath="/klinik"
        enPath="/en/klinik"
        lang={lang}
      />

      {/* Hero Section */}
      <section className="clinical-hero-section">
        <div className="container">
          <Breadcrumbs items={breadcrumbs} />

          <div className="clinical-hero-content">
            <div className="clinical-hero-badge">
              <ShieldAlert size={16} />
              <span>{lang === 'en' ? 'Scientific Clinical Archive' : 'Научный клинический архив'}</span>
            </div>

            <h1 className="clinical-hero-title">
              {lang === 'en' ? 'Clinical Cases' : 'Клинические случаи'}
            </h1>

            <p className="clinical-hero-subtitle">
              {lang === 'en'
                ? 'An archive of clinical observations presented in the source materials and associated with the use of IR emitters.'
                : 'Архив клинических наблюдений, представленных в материалах метода и связанных с применением ИК-излучателей.'}
            </p>

            {/* Automatically Computed Statistics */}
            <ClinicalStats
              cases={clinicalCasesData}
              categories={clinicalCategories}
              lang={lang}
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container">
        {/* Controls Section */}
        <section className="clinical-controls-section" aria-label={lang === 'en' ? 'Search and filters' : 'Поиск и фильтры'}>
          {/* Search Bar */}
          <ClinicalSearchBar
            searchTerm={searchTerm}
            onSearchChange={(val) => setSearchTerm(val)}
            lang={lang}
          />

          {/* Category Filter Pills */}
          <ClinicalFilter
            categories={clinicalCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={(catId) => setSelectedCategory(catId)}
            categoryCounts={categoryCounts}
            lang={lang}
          />

          {/* Results Summary Bar */}
          <div className="clinical-results-header">
            <div>
              <span className="clinical-results-count">
                {lang === 'en' ? 'Found: ' : 'Найдено: '}
                {filteredCases.length} {lang === 'en' ? 'of' : 'из'} {clinicalCasesData.length}
              </span>
              {selectedCategory !== 'all' && (
                <span style={{ marginLeft: 8, opacity: 0.8 }}>
                  ({clinicalCategories.find(c => c.id === selectedCategory)?.[lang === 'en' ? 'en' : 'ru']})
                </span>
              )}
            </div>

            {/* Expand / Collapse All */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={expandAll}
                style={{ background: 'none', border: 'none', color: 'var(--color-primary, #3e4095)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
              >
                {lang === 'en' ? 'Expand all' : 'Развернуть все'}
              </button>
              <span style={{ color: 'var(--color-border)' }}>|</span>
              <button
                onClick={collapseAll}
                style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary, #5f6673)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500 }}
              >
                {lang === 'en' ? 'Collapse all' : 'Свернуть все'}
              </button>
            </div>
          </div>
        </section>

        {/* Clinical Cases List */}
        <div className="clinical-cases-list">
          {visibleCases.length > 0 ? (
            visibleCases.map((caseItem) => (
              <ClinicalCaseCard
                key={caseItem.id}
                caseItem={caseItem}
                isExpanded={expandedIds.has(caseItem.id)}
                onToggle={() => toggleCase(caseItem.id)}
                onImageClick={handleImageClick}
                lang={lang}
                categories={clinicalCategories}
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fafbfc', borderRadius: '10px', border: '1px dashed var(--color-border)' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-heading, #16181d)', marginBottom: 8 }}>
                {lang === 'en' ? 'No clinical cases match your query' : 'По вашему запросу клинических случаев не найдено'}
              </p>
              <p style={{ color: 'var(--color-text-secondary, #5f6673)', fontSize: '0.9rem' }}>
                {lang === 'en' ? 'Try changing search keywords or select another category.' : 'Попробуйте изменить поисковый запрос или выберите другую категорию.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <ClinicalLightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={(newIdx) => setLightboxIndex(newIdx)}
        lang={lang}
      />
    </div>
  );
}
