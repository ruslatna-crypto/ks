import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const MapWidget = ({ className = '', style = {} }) => {
  const { lang } = useLanguage();

  return (
    <div className={`contact-map-wrapper ${className}`.trim()} style={style}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1598.3585895564229!2d69.29234042896854!3d41.32773388305886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef5fcd52001e9%3A0x3c0224dec2ca4e26!2z0J7QntCeICJLZXJhbWlrYSBTaW50ZXo!5e1!3m2!1sru!2s!4v1791748942681!5m2!1sru!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title={lang === 'en' ? 'LLC KERAMIKA SINTEZ on Google Maps' : 'Расположение ООО «Keramika Sintez» на Google Maps'}
        className="contact-map-iframe"
      />
    </div>
  );
};

export default MapWidget;
