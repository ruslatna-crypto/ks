import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

const slidesData = [
  {
    id: 1,
    route: '/sushka',
    mainImage: '/images/home/sushka.png',
    position: 'sushka-wood',
    ru: 'Сушилки для овощей и фруктов',
    en: 'Drying of vegetables and fruits',
    categoryRu: 'Агропромышленность',
    categoryEn: 'Agro-industry'
  },
  {
    id: 2,
    route: '/lamp',
    mainImage: '/images/home/med.png',
    position: 'med-bottom',
    ru: 'Лечебные лампы',
    en: 'Therapeutic lamps',
    categoryRu: 'Медицинские технологии',
    categoryEn: 'Medical technologies'
  },
  {
    id: 3,
    route: '/gril',
    mainImage: '/images/home/gril.png',
    position: 'gril-top',
    ru: 'Грили, выпечка',
    en: 'Grills, baking',
    categoryRu: 'Пищевая промышленность',
    categoryEn: 'Food industry'
  },
  {
    id: 4,
    route: '/plenka',
    mainImage: '/images/home/parnik.png',
    position: 'parnik-left',
    ru: 'Пленка для теплиц и парников',
    en: 'Film for greenhouses and hothouses',
    categoryRu: 'Полимерные материалы',
    categoryEn: 'Polymer materials'
  },
  {
    id: 5,
    route: '/paint',
    mainImage: '/images/home/paint.png',
    position: 'paint-stripe',
    ru: 'Сушка краски и лаков',
    en: 'Drying of paint and varnishes',
    categoryRu: 'Промышленные покрытия',
    categoryEn: 'Industrial coatings'
  },
  {
    id: 6,
    route: '/cotton',
    mainImage: '/images/home/hlopok.png',
    position: 'top-left',
    ru: 'Сушка хлопка и стимуляция семян',
    en: 'Cotton drying and seed stimulation',
    categoryRu: 'Сельское хозяйство',
    categoryEn: 'Agriculture'
  },
  {
    id: 7,
    route: '/steril',
    mainImage: '/images/home/ster.png',
    position: 'ster-top',
    ru: 'Стерилизаторы для медицинских инструментов',
    en: 'Medical instruments sterilizers',
    categoryRu: 'Здравоохранение',
    categoryEn: 'Healthcare'
  }
];

const HeroSlider = () => {
  const { lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slidesData.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slidesData.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slidesData.length) % slidesData.length);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  const getTargetRoute = (route) => {
    return lang === 'en' ? `/en${route}` : route;
  };

  return (
    <div 
      className="hero-slider-wrap"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Слайдер разработок"
    >
      <div className="slider-full-stage">
        <div className="hero-slider-stage">
          {slidesData.map((slide, index) => {
            const isActive = index === current;
            const caption = slide[lang] || slide.ru;
            const category = lang === 'en' ? slide.categoryEn : slide.categoryRu;
            return (
              <div
                key={slide.id}
                className={`hero-slide-item ${isActive ? 'active' : ''}`}
              >
                <Link to={getTargetRoute(slide.route)} title={caption} className="slide-banner-link">
                  <img
                    src={slide.mainImage}
                    alt={caption}
                    className="slide-banner-img"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'low'}
                    decoding={index === 0 ? 'sync' : 'async'}
                  />
                  <div className={`slide-caption-badge pos-${slide.position}`}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <span>{caption}</span>
                      <ArrowUpRight size={18} style={{ opacity: 0.8 }} />
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Round Navigation Arrows */}
        <button 
          className="slider-arrow-control prev" 
          onClick={prevSlide}
          aria-label="Предыдущий слайд"
        >
          <ChevronLeft size={26} />
        </button>

        <button 
          className="slider-arrow-control next" 
          onClick={nextSlide}
          aria-label="Следующий слайд"
        >
          <ChevronRight size={26} />
        </button>

        {/* Dots Navigation */}
        <div className="slider-dots-row">
          {slidesData.map((_, i) => (
            <button
              key={i}
              className={`slider-dot-btn ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
