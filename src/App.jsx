import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

// Route-based lazy loading
const HomePage = lazy(() => import('./pages/HomePage'));
const DevelopmentPage = lazy(() => import('./pages/DevelopmentPage'));
const LampPage = lazy(() => import('./pages/LampPage'));
const LecturesPage = lazy(() => import('./pages/LecturesPage'));
const ClinicalPage = lazy(() => import('./pages/ClinicalPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const NewsDetailPage = lazy(() => import('./pages/NewsDetailPage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Scroll to top helper on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageFallback = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px'
  }}>
    <div style={{
      width: '36px',
      height: '36px',
      border: '3px solid var(--color-border)',
      borderTopColor: 'var(--color-primary)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <ScrollToTop />
        <Header />
        <main style={{ flexGrow: 1 }}>
          <Suspense fallback={<PageFallback />}>
            <Routes>
            {/* Home (RU & EN) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/main" element={<HomePage />} />
            <Route path="/en" element={<HomePage />} />
            <Route path="/en/main" element={<HomePage />} />

            {/* Разработки / Developments */}
            <Route path="/sushka" element={<DevelopmentPage pageId="sushka" />} />
            <Route path="/en/sushka" element={<DevelopmentPage pageId="sushka" />} />
            
            <Route path="/sush-ustanovka" element={<DevelopmentPage pageId="sush-ustanovka" />} />
            <Route path="/en/sush-ustanovka" element={<DevelopmentPage pageId="sush-ustanovka" />} />
            
            <Route path="/metodikasushka" element={<DevelopmentPage pageId="metodikasushka" />} />
            <Route path="/en/metodikasushka" element={<DevelopmentPage pageId="metodikasushka" />} />
            
            <Route path="/plenka" element={<DevelopmentPage pageId="plenka" />} />
            <Route path="/en/plenka" element={<DevelopmentPage pageId="plenka" />} />
            
            <Route path="/steril" element={<DevelopmentPage pageId="steril" />} />
            <Route path="/sterilizaciya" element={<DevelopmentPage pageId="steril" />} />
            <Route path="/en/steril" element={<DevelopmentPage pageId="steril" />} />
            
            <Route path="/gril" element={<DevelopmentPage pageId="gril" />} />
            <Route path="/grili" element={<DevelopmentPage pageId="gril" />} />
            <Route path="/en/gril" element={<DevelopmentPage pageId="gril" />} />
            
            <Route path="/lamp" element={<LampPage />} />
            <Route path="/lechebnye-lampy" element={<LampPage />} />
            <Route path="/en/lamp" element={<LampPage />} />
            
            <Route path="/cotton" element={<DevelopmentPage pageId="cotton" />} />
            <Route path="/hlopok" element={<DevelopmentPage pageId="cotton" />} />
            <Route path="/en/cotton" element={<DevelopmentPage pageId="cotton" />} />
            
            <Route path="/paint" element={<DevelopmentPage pageId="paint" />} />
            <Route path="/kraska" element={<DevelopmentPage pageId="paint" />} />
            <Route path="/en/paint" element={<DevelopmentPage pageId="paint" />} />

            {/* Медицина / Medicine */}
            <Route path="/metod" element={<DevelopmentPage pageId="metod" />} />
            <Route path="/en/metod" element={<DevelopmentPage pageId="metod" />} />
            
            <Route path="/virus" element={<DevelopmentPage pageId="virus" />} />
            <Route path="/en/virus" element={<DevelopmentPage pageId="virus" />} />
            
            <Route path="/metodika" element={<LecturesPage />} />
            <Route path="/lekcii" element={<LecturesPage />} />
            <Route path="/en/metodika" element={<LecturesPage />} />
            
            <Route path="/klinik" element={<ClinicalPage />} />
            <Route path="/en/klinik" element={<ClinicalPage />} />

            {/* Контакты / Contacts */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="/en/contact" element={<ContactPage />} />

            {/* Поиск / Search */}
            <Route path="/search" element={<SearchPage />} />
            <Route path="/en/search" element={<SearchPage />} />

            {/* Новости / News */}
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsDetailPage />} />
            <Route path="/en/news" element={<NewsPage />} />
            <Route path="/en/news/:slug" element={<NewsDetailPage />} />

            {/* Статьи / Articles */}
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:slug" element={<ArticleDetailPage />} />
            <Route path="/en/articles" element={<ArticlesPage />} />
            <Route path="/en/articles/:slug" element={<ArticleDetailPage />} />

            {/* Fallback 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </LanguageProvider>
  );
}

export default App;
