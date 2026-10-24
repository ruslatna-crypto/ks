import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

import { lazyWithPreload } from './utils/lazyWithPreload';

// Route-based lazy loading with preloading capability for hydration
export const HomePage = lazyWithPreload(() => import('./pages/HomePage'));
export const DevelopmentPage = lazyWithPreload(() => import('./pages/DevelopmentPage'));
export const SushkaPage = lazyWithPreload(() => import('./pages/SushkaPage'));
export const PlenkaPage = lazyWithPreload(() => import('./pages/PlenkaPage'));
export const SterilPage = lazyWithPreload(() => import('./pages/SterilPage'));
export const GrilPage = lazyWithPreload(() => import('./pages/GrilPage'));
export const MetodPage = lazyWithPreload(() => import('./pages/MetodPage'));
export const LampPage = lazyWithPreload(() => import('./pages/LampPage'));
export const CottonPage = lazyWithPreload(() => import('./pages/CottonPage'));
export const PaintPage = lazyWithPreload(() => import('./pages/PaintPage'));
export const LecturesPage = lazyWithPreload(() => import('./pages/LecturesPage'));
export const ClinicalCasesPage = lazyWithPreload(() => import('./pages/ClinicalCasesPage'));
export const ContactPage = lazyWithPreload(() => import('./pages/ContactPage'));
export const SearchPage = lazyWithPreload(() => import('./pages/SearchPage'));
export const NewsPage = lazyWithPreload(() => import('./pages/NewsPage'));
export const NewsDetailPage = lazyWithPreload(() => import('./pages/NewsDetailPage'));
export const ArticlesPage = lazyWithPreload(() => import('./pages/ArticlesPage'));
export const ArticleDetailPage = lazyWithPreload(() => import('./pages/ArticleDetailPage'));
export const NotFoundPage = lazyWithPreload(() => import('./pages/NotFoundPage'));

export function getPageComponentForPath(pathname) {
  if (!pathname) return HomePage;
  const path = pathname.replace(/\/+$/, '') || '/';
  const clean = path.startsWith('/en') ? (path.replace(/^\/en/, '') || '/') : path;

  if (clean === '/' || clean === '/main') return HomePage;
  if (clean === '/sushka') return SushkaPage;
  if (clean === '/sush-ustanovka' || clean === '/metodikasushka' || clean === '/virus') return DevelopmentPage;
  if (clean === '/plenka') return PlenkaPage;
  if (clean === '/steril' || clean === '/sterilizaciya') return SterilPage;
  if (clean === '/gril' || clean === '/grili') return GrilPage;
  if (clean === '/lamp' || clean === '/lechebnye-lampy') return LampPage;
  if (clean === '/cotton' || clean === '/hlopok') return CottonPage;
  if (clean === '/paint' || clean === '/lakokraska' || clean === '/kraska') return PaintPage;
  if (clean === '/metod') return MetodPage;
  if (clean === '/metodika' || clean === '/lekcii') return LecturesPage;
  if (clean.startsWith('/klinik') || clean.startsWith('/clinical-cases')) return ClinicalCasesPage;
  if (clean === '/contact' || clean === '/contacts') return ContactPage;
  if (clean === '/search') return SearchPage;
  if (clean.startsWith('/news/')) return NewsDetailPage;
  if (clean === '/news') return NewsPage;
  if (clean.startsWith('/articles/')) return ArticleDetailPage;
  if (clean === '/articles') return ArticlesPage;
  if (clean === '/404') return NotFoundPage;

  return NotFoundPage;
}


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
            <Route path="/sushka" element={<SushkaPage />} />
            <Route path="/en/sushka" element={<SushkaPage />} />
            
            <Route path="/sush-ustanovka" element={<DevelopmentPage pageId="sush-ustanovka" />} />
            <Route path="/en/sush-ustanovka" element={<DevelopmentPage pageId="sush-ustanovka" />} />
            
            <Route path="/metodikasushka" element={<DevelopmentPage pageId="metodikasushka" />} />
            <Route path="/en/metodikasushka" element={<DevelopmentPage pageId="metodikasushka" />} />
            
            <Route path="/plenka" element={<PlenkaPage />} />
            <Route path="/en/plenka" element={<PlenkaPage />} />
            
            <Route path="/steril" element={<SterilPage />} />
            <Route path="/sterilizaciya" element={<SterilPage />} />
            <Route path="/en/steril" element={<SterilPage />} />
            <Route path="/en/sterilizaciya" element={<SterilPage />} />
            
            <Route path="/gril" element={<GrilPage />} />
            <Route path="/grili" element={<GrilPage />} />
            <Route path="/en/gril" element={<GrilPage />} />
            
            <Route path="/lamp" element={<LampPage />} />
            <Route path="/lechebnye-lampy" element={<LampPage />} />
            <Route path="/en/lamp" element={<LampPage />} />
            
            <Route path="/cotton" element={<CottonPage />} />
            <Route path="/hlopok" element={<CottonPage />} />
            <Route path="/en/cotton" element={<CottonPage />} />
            <Route path="/en/hlopok" element={<CottonPage />} />
            
            <Route path="/paint" element={<PaintPage />} />
            <Route path="/lakokraska" element={<PaintPage />} />
            <Route path="/kraska" element={<PaintPage />} />
            <Route path="/en/paint" element={<PaintPage />} />
            <Route path="/en/lakokraska" element={<PaintPage />} />
            <Route path="/en/kraska" element={<PaintPage />} />

            {/* Медицина / Medicine */}
            <Route path="/metod" element={<MetodPage />} />
            <Route path="/en/metod" element={<MetodPage />} />
            
            <Route path="/virus" element={<DevelopmentPage pageId="virus" />} />
            <Route path="/en/virus" element={<DevelopmentPage pageId="virus" />} />
            
            <Route path="/metodika" element={<LecturesPage />} />
            <Route path="/lekcii" element={<LecturesPage />} />
            <Route path="/en/metodika" element={<LecturesPage />} />
            
            <Route path="/klinik" element={<ClinicalCasesPage />} />
            <Route path="/klinik/:id" element={<ClinicalCasesPage />} />
            <Route path="/en/klinik" element={<ClinicalCasesPage />} />
            <Route path="/en/klinik/:id" element={<ClinicalCasesPage />} />
            <Route path="/clinical-cases" element={<ClinicalCasesPage />} />
            <Route path="/clinical-cases/:id" element={<ClinicalCasesPage />} />
            <Route path="/en/clinical-cases" element={<ClinicalCasesPage />} />
            <Route path="/en/clinical-cases/:id" element={<ClinicalCasesPage />} />

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
