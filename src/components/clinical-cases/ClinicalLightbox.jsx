import React, { useEffect, useState, useRef } from 'react';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export default function ClinicalLightbox({
  images = [],
  currentIndex = 0,
  isOpen = false,
  onClose,
  onIndexChange,
  lang = 'ru'
}) {
  const [scale, setScale] = useState(1);
  const touchStartX = useRef(null);

  useEffect(() => {
    setScale(1);
  }, [currentIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        onIndexChange((currentIndex + 1) % images.length);
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        onIndexChange((currentIndex - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onIndexChange]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex];
  const imgSrc = (lang === 'en' && currentImg.srcEn) ? currentImg.srcEn : currentImg.src;
  const imgAlt = (lang === 'en' && currentImg.altEn) ? currentImg.altEn : currentImg.altRu;

  const zoomIn = (e) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.3, 3));
  };

  const zoomOut = (e) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.3, 0.7));
  };

  const resetZoom = (e) => {
    e.stopPropagation();
    setScale(1);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50 && images.length > 1) {
      if (diff > 0) {
        onIndexChange((currentIndex + 1) % images.length);
      } else {
        onIndexChange((currentIndex - 1 + images.length) % images.length);
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="clinical-lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={lang === 'en' ? 'Image preview' : 'Просмотр изображения'}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Toolbar */}
      <div className="clinical-lightbox-toolbar" onClick={e => e.stopPropagation()}>
        <button
          className="clinical-lightbox-btn"
          onClick={zoomIn}
          title={lang === 'en' ? 'Zoom in' : 'Увеличить'}
          aria-label={lang === 'en' ? 'Zoom in' : 'Увеличить'}
        >
          <ZoomIn size={20} />
        </button>
        <button
          className="clinical-lightbox-btn"
          onClick={zoomOut}
          title={lang === 'en' ? 'Zoom out' : 'Уменьшить'}
          aria-label={lang === 'en' ? 'Zoom out' : 'Уменьшить'}
        >
          <ZoomOut size={20} />
        </button>
        {scale !== 1 && (
          <button
            className="clinical-lightbox-btn"
            onClick={resetZoom}
            title={lang === 'en' ? 'Reset zoom' : 'Сбросить масштаб'}
            aria-label={lang === 'en' ? 'Reset zoom' : 'Сбросить масштаб'}
          >
            <RotateCcw size={18} />
          </button>
        )}
        <button
          className="clinical-lightbox-btn"
          onClick={onClose}
          title={lang === 'en' ? 'Close (Esc)' : 'Закрыть (Esc)'}
          aria-label={lang === 'en' ? 'Close' : 'Закрыть'}
        >
          <X size={22} />
        </button>
      </div>

      {/* Prev / Next buttons */}
      {images.length > 1 && (
        <>
          <button
            className="clinical-lightbox-btn"
            style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 100000 }}
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((currentIndex - 1 + images.length) % images.length);
            }}
            aria-label={lang === 'en' ? 'Previous image' : 'Предыдущее изображение'}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="clinical-lightbox-btn"
            style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 100000 }}
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((currentIndex + 1) % images.length);
            }}
            aria-label={lang === 'en' ? 'Next image' : 'Следующее изображение'}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Main image */}
      <div
        className="clinical-lightbox-img-wrap"
        onClick={e => e.stopPropagation()}
        style={{ transform: `scale(${scale})` }}
      >
        <img
          src={imgSrc}
          alt={imgAlt}
          className="clinical-lightbox-img"
        />
      </div>

      {/* Caption */}
      {imgAlt && (
        <div className="clinical-lightbox-caption" onClick={e => e.stopPropagation()}>
          {imgAlt}
          {images.length > 1 && (
            <span style={{ display: 'block', marginTop: '4px', opacity: 0.8, fontSize: '0.8rem' }}>
              {currentIndex + 1} / {images.length}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
