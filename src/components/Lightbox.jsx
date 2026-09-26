import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Lightbox = ({ isOpen, images = [], currentIndex = 0, onClose, onPrev, onNext }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex];
  const imgSrc = typeof currentImg === 'string' ? currentImg : currentImg.url;
  const imgCaption = typeof currentImg === 'string' ? '' : (currentImg.alt || currentImg.caption || '');

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close-btn" onClick={onClose} aria-label="Закрыть">
          <X size={32} />
        </button>

        {images.length > 1 && onPrev && (
          <button 
            className="lightbox-nav-btn prev" 
            onClick={onPrev}
            aria-label="Предыдущее изображение"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        <img src={imgSrc} alt={imgCaption || 'Изображение'} className="lightbox-main-img" />

        {imgCaption && <p className="lightbox-caption-text">{imgCaption}</p>}

        {images.length > 1 && onNext && (
          <button 
            className="lightbox-nav-btn next" 
            onClick={onNext}
            aria-label="Следующее изображение"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
