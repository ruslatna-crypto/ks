import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Detect language from URL path
  const isEnPath = location.pathname.startsWith('/en');
  const [lang, setLang] = useState(isEnPath ? 'en' : 'ru');

  useEffect(() => {
    if (location.pathname.startsWith('/en')) {
      setLang('en');
    } else {
      setLang('ru');
    }
  }, [location.pathname]);

  const switchLanguage = (newLang) => {
    if (newLang === lang) return;
    setLang(newLang);

    const currentPath = location.pathname;
    if (newLang === 'en') {
      if (!currentPath.startsWith('/en')) {
        const targetPath = currentPath === '/' ? '/en' : `/en${currentPath}`;
        navigate(targetPath);
      }
    } else {
      if (currentPath.startsWith('/en')) {
        const targetPath = currentPath.replace(/^\/en(\/|$)/, '/') || '/';
        navigate(targetPath);
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
