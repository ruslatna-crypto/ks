import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ExternalLink, Activity, Image as ImageIcon, Table as TableIcon } from 'lucide-react';
import DOMPurify from 'dompurify';
import ClinicalChart from './ClinicalChart';

/**
 * Robust HTML sanitizer powered by DOMPurify:
 * - Preserves semantic typography, lists, and clinical data tables.
 * - Strictly forbids dangerous executable elements (script, iframe, object, embed, form, etc.).
 * - Blocks inline event handlers (on*).
 * - Restricts URI schemes to safe protocols, disallowing javascript:, vbscript:, and data:.
 */
const SANITIZE_CONFIG = {
  USE_PROFILES: { html: true },
  FORBID_TAGS: [
    'script',
    'iframe',
    'object',
    'embed',
    'applet',
    'form',
    'input',
    'button',
    'textarea',
    'select',
    'link',
    'meta',
    'style'
  ],
  FORBID_ATTR: [
    'action',
    'formaction',
    'xlink:href'
  ],
  ALLOW_DATA_ATTR: false,
  ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
};

export function sanitizeClinicalHtml(html) {
  if (!html || typeof html !== 'string') return '';
  const purify = (typeof DOMPurify === 'function' && typeof DOMPurify.sanitize !== 'function' && typeof window !== 'undefined')
    ? DOMPurify(window)
    : DOMPurify;
  if (purify && typeof purify.sanitize === 'function') {
    return purify.sanitize(html, SANITIZE_CONFIG);
  }
  return html;
}

export default function ClinicalCaseCard({
  caseItem,
  isExpanded = false,
  onToggle,
  onImageClick,
  lang = 'ru',
  categories = []
}) {
  const title = lang === 'en' ? (caseItem.titleEn || caseItem.titleRu) : caseItem.titleRu;
  const content = lang === 'en' ? (caseItem.contentEn || caseItem.contentRu) : caseItem.contentRu;
  const patient = lang === 'en' ? caseItem.patientEn : caseItem.patientRu;

  const categoryObj = categories.find(c => c.id === caseItem.category);
  const categoryLabel = categoryObj ? (lang === 'en' ? categoryObj.en : categoryObj.ru) : caseItem.category;

  const caseUrl = lang === 'en' ? `/en/klinik/${caseItem.id}` : `/klinik/${caseItem.id}`;

  return (
    <article className={`clinical-card ${isExpanded ? 'is-expanded' : ''}`} id={`case-${caseItem.id}`}>
      {/* Clickable Header */}
      <div
        className="clinical-card-header"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <div className="clinical-card-main-info">
          {/* Metadata row */}
          <div className="clinical-card-meta-row">
            <span className="clinical-case-index">
              #{caseItem.index}
            </span>
            <span className="clinical-category-badge">
              {categoryLabel}
            </span>
            {caseItem.hasTable && (
              <span className="clinical-feature-badge" title={lang === 'en' ? 'Contains data table' : 'Содержит таблицу данных'}>
                <TableIcon size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: -1 }} />
                {lang === 'en' ? 'Table' : 'Таблица'}
              </span>
            )}
            {caseItem.hasChart && (
              <span className="clinical-feature-badge" title={lang === 'en' ? 'Contains dynamic chart' : 'Содержит график динамики'}>
                <Activity size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: -1 }} />
                {lang === 'en' ? 'Chart' : 'График'}
              </span>
            )}
            {caseItem.images && caseItem.images.length > 0 && (
              <span className="clinical-feature-badge" title={lang === 'en' ? 'Contains medical illustration' : 'Содержит иллюстрации'}>
                <ImageIcon size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: -1 }} />
                {lang === 'en' ? 'Photo / X-Ray' : 'Фото / Рентген'}
              </span>
            )}
          </div>

          {/* Title with crawlable direct link */}
          <h3 className="clinical-card-title">
            <Link
              to={caseUrl}
              onClick={(e) => e.stopPropagation()}
              style={{ color: 'inherit', textDecoration: 'none' }}
              title={lang === 'en' ? 'Open case page' : 'Открыть страницу наблюдения'}
            >
              {title}
            </Link>
          </h3>

          {/* Tags row: Patient, Emitters */}
          <div className="clinical-card-tags-row">
            {patient && (
              <span className="clinical-patient-tag">
                {patient}
              </span>
            )}
            {caseItem.emitters && caseItem.emitters.map((em, idx) => (
              <span key={idx} className="clinical-emitter-tag">
                {em}
              </span>
            ))}
          </div>
        </div>

        {/* Toggle chevron */}
        <div className="clinical-card-toggle" aria-hidden="true">
          <ChevronDown size={20} />
        </div>
      </div>

      {/* Expanded Accordion Body */}
      {isExpanded && (
        <div className="clinical-card-body">
          {/* Chart if present */}
          {caseItem.hasChart && caseItem.chartData && (
            <ClinicalChart chartData={caseItem.chartData} lang={lang} />
          )}

          {/* Main Original Content */}
          <div
            className="clinical-card-content"
            dangerouslySetInnerHTML={{ __html: sanitizeClinicalHtml(content) }}
          />

          {/* Image Gallery if present */}
          {caseItem.images && caseItem.images.length > 0 && (
            <div className="clinical-card-media">
              <div className="clinical-card-media-title">
                <ImageIcon size={16} />
                {lang === 'en' ? 'Clinical observation materials:' : 'Материалы клинического наблюдения:'}
              </div>
              <div className="clinical-media-grid">
                {caseItem.images.map((img, imgIdx) => {
                  const src = (lang === 'en' && img.srcEn) ? img.srcEn : img.src;
                  const alt = (lang === 'en' && img.altEn) ? img.altEn : img.altRu;
                  return (
                    <div
                      key={imgIdx}
                      className="clinical-thumbnail-wrap"
                      onClick={() => onImageClick && onImageClick(caseItem.images, imgIdx)}
                      title={lang === 'en' ? 'Click to enlarge' : 'Нажмите для увеличения'}
                    >
                      <img src={src} alt={alt} className="clinical-thumbnail-img" loading="lazy" />
                      <div className="clinical-thumbnail-overlay">
                        <span>{lang === 'en' ? 'Enlarge' : 'Увеличить'}</span>
                      </div>
                      {alt && <div className="clinical-thumbnail-caption">{alt}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer Bar */}
          <div className="clinical-card-footer">
            <span className="clinical-source-label">
              {lang === 'en'
                ? 'Clinical observation from original infraks.ru archive'
                : 'Клиническое наблюдение из исходного архива infraks.ru'}
            </span>
            <Link to={caseUrl} className="clinical-single-url-link">
              <span>{lang === 'en' ? 'Open case page' : 'Страница случая'}</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}
