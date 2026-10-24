import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LanguageContext = createContext();

export function getEquivalentRoute(currentPath, targetLang) {
  if (!currentPath) return targetLang === 'en' ? '/en' : '/';

  // Clean trailing slash for lookup if not root
  const clean = currentPath === '/' ? '/' : currentPath.replace(/\/+$/, '');

  const routePairs = {
    '/hlopok': '/en/cotton',
    '/cotton': '/en/cotton',
    '/en/cotton': '/hlopok',
    '/en/hlopok': '/hlopok',
    '/lakokraska': '/en/paint',
    '/kraska': '/en/paint',
    '/paint': '/en/paint',
    '/en/paint': '/paint',
    '/en/lakokraska': '/paint',
    '/en/kraska': '/paint',
    '/clinical-cases': '/en/klinik',
    '/en/clinical-cases': '/klinik',
    '/klinik': '/en/klinik',
    '/en/klinik': '/klinik',
    '/gril': '/en/gril',
    '/grili': '/en/gril',
    '/en/gril': '/gril',
    '/metod': '/en/metod',
    '/en/metod': '/metod'
  };

  if (targetLang === 'en') {
    if (routePairs[clean]) return routePairs[clean];
    if (clean.startsWith('/en')) return clean;
    return clean === '/' ? '/en' : `/en${clean}`;
  } else {
    if (routePairs[clean]) return routePairs[clean];
    if (clean.startsWith('/en')) {
      return clean.replace(/^\/en(\/|$)/, '/') || '/';
    }
    return clean;
  }
}

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
    const targetPath = getEquivalentRoute(location.pathname, newLang);
    navigate(targetPath);
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLanguage, getEquivalentRoute }}>
      {children}
    </LanguageContext.Provider>
  );
};


export const useLanguage = () => useContext(LanguageContext);
