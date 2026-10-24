import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

// Synchronous imports for SSR so full semantic HTML is rendered for crawlers
import HomePage from './pages/HomePage';
import DevelopmentPage from './pages/DevelopmentPage';
import SushkaPage from './pages/SushkaPage';
import PlenkaPage from './pages/PlenkaPage';
import SterilPage from './pages/SterilPage';
import GrilPage from './pages/GrilPage';
import MetodPage from './pages/MetodPage';
import LampPage from './pages/LampPage';
import CottonPage from './pages/CottonPage';
import PaintPage from './pages/PaintPage';
import LecturesPage from './pages/LecturesPage';
import ClinicalCasesPage from './pages/ClinicalCasesPage';
import ContactPage from './pages/ContactPage';
import SearchPage from './pages/SearchPage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import NotFoundPage from './pages/NotFoundPage';

const ScrollToTop = () => null;

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

export default function AppSSR() {
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
