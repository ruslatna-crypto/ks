import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { lang } = useLanguage();

  return (
    <footer className="site-footer-corporate">
      <div className="container">
        <p className="footer-copyright-single">
          {lang === 'en'
            ? '© 2026 LLC "KERAMIKA SINTEZ". All rights reserved.'
            : '© 2026 ООО «KERAMIKA SINTEZ». Все права защищены.'}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
