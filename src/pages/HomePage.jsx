import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import MapWidget from '../components/MapWidget';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Phone, Mail, MapPin, ArrowRight, Layers, Award, Sparkles, Activity, Newspaper, Calendar } from 'lucide-react';
import { getNews } from '../utils/contentLoader';

const cardsData = [
  {
    route: '/lamp',
    icon: '/images/icons/lamp.svg',
    ru: {
      category: 'Медицинские технологии',
      title: 'Лечебные лампы',
      descr: 'Метод Р. Рахимов, основанный на использовании инфракрасных (ИК) медицинских ламп. Этот метод направлен на нормализацию физиологических процессов и устранение патологий посредством ИК-излучения, резонирующего с процессами, требующими коррекции. Излучение таких ламп способствует...'
    },
    en: {
      category: 'Medical technologies',
      title: 'Therapeutic lamps',
      descr: 'The R. Rakhimov method, based on the use of infrared (IR) medical lamps. This method aims to normalize physiological processes and eliminate pathologies through IR radiation that resonates with processes requiring correction. Radiation from such lamps promotes...'
    }
  },
  {
    route: '/cotton',
    icon: '/images/icons/hlopok.svg',
    ru: {
      category: 'Сельское хозяйство',
      title: 'Сушка хлопка и стимуляция семян',
      descr: 'Установка для эффективной сушки хлопка-сырца с применением функциональной керамики. В данной установке использованы два вида керамических материалов, один из которых обеспечивает высококачественную и эффективную сушку …'
    },
    en: {
      category: 'Agriculture',
      title: 'Cotton drying and seed stimulation',
      descr: 'Installation for efficient drying of raw cotton using functional ceramics. This installation utilizes two types of ceramic materials, one of which provides high-quality and efficient drying...'
    }
  },
  {
    route: '/gril',
    icon: '/images/icons/gril.svg',
    ru: {
      category: 'Пищевая промышленность',
      title: 'Грили, выпечка',
      descr: 'Разработаны и испытаны различные виды жарочных шкафов, грилей, шашлычниц, выпечных конвейеров – с использованием керамических излучателей покрытых функциональной керамикой. Метод основан на выборе нужного спектра …'
    },
    en: {
      category: 'Food industry',
      title: 'Grills, baking',
      descr: 'Various types of roasting ovens, grills, barbecue makers, and baking conveyors have been developed and tested using ceramic emitters coated with functional ceramics. The method is based on selecting the required spectrum...'
    }
  },
  {
    route: '/steril',
    icon: '/images/icons/steril.svg',
    ru: {
      category: 'Здравоохранение',
      title: 'Стерилизаторы для медицинских инструментов',
      descr: 'Главное преимущество стерилизации с применением инфракрасных излучателей (покрытыми специальными импульсными функциональными керамиками), заключается в том, что в отличие от используемых в настоящее время методов, достигается …'
    },
    en: {
      category: 'Healthcare',
      title: 'Medical instruments sterilizers',
      descr: 'The main advantage of sterilization using infrared emitters (coated with special pulsed functional ceramics) is that, unlike currently used methods, full eradication of pathogens is achieved...'
    }
  },
  {
    route: '/plenka',
    icon: '/images/icons/plenka.svg',
    ru: {
      category: 'Полимерные материалы',
      title: 'Пленка для теплиц и парников',
      descr: 'Разработаны каскадные преобразователи солнечного излучения на основе полиэтиленовой пленки и функциональной керамики. Композитная пленка, существенно повышает процесс передачи солнечной энергии. Полимерная пленка содержащая 0,1-1% ультрадисперсного порошка …'
    },
    en: {
      category: 'Polymer materials',
      title: 'Film for greenhouses and hothouses',
      descr: 'Cascade solar radiation converters based on polyethylene film and functional ceramics have been developed. The composite film significantly increases the transmission of useful solar energy. Polymer film containing 0.1-1% ultrafine powder...'
    }
  },
  {
    route: '/paint',
    icon: '/images/icons/kraska.svg',
    ru: {
      category: 'Промышленные покрытия',
      title: 'Сушка краски и лаков',
      descr: 'Для сушки, нагрева и полимеризации лаков красок, покрытий из пластмассы, основными требованиями являются высокое качество в соответствии с ISO 9001, экономичность, минимальный расход энергии и …'
    },
    en: {
      category: 'Industrial coatings',
      title: 'Drying of paint and varnishes',
      descr: 'For drying, heating, and polymerization of paints, varnishes, and plastic coatings, the main requirements are high quality in accordance with ISO 9001, efficiency, minimum energy consumption, and...'
    }
  },
  {
    route: '/sushka',
    icon: '/images/icons/sushka.svg',
    ru: {
      category: 'Агропромышленность',
      title: 'Сушилки для овощей и фруктов',
      descr: 'Установка для эффективной сушки фруктов и овощей с использованием излучателей покрытых функциональной керамикой. Прошедшие сушку в заданном режиме фрукты и овощи не нуждаются в предварительной …'
    },
    en: {
      category: 'Agro-industry',
      title: 'Drying of vegetables and fruits',
      descr: 'Installation for efficient drying of fruits and vegetables using emitters coated with functional ceramics. Fruits and vegetables dried in the specified mode do not require preliminary chemical treatment...'
    }
  }
];

const HomePage = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const latestNews = getNews(lang).slice(0, 3);

  const getTargetRoute = (route) => {
    return lang === 'en' ? `/en${route}` : route;
  };

  return (
    <div>
      <SEO
        title={lang === 'en' ? 'Scientific & Production Portal' : 'Научно-производственный портал'}
        description={lang === 'en'
          ? 'KERAMIKA SINTEZ LLC — research, development and implementation of energy-efficient technologies based on pulsed functional ceramics.'
          : 'ООО «KERAMIKA SINTEZ» — исследования, разработка и внедрение энергоэффективных технологий на основе импульсной функциональной керамики.'}
        canonicalPath={lang === 'en' ? '/en' : '/'}
        ruPath="/"
        enPath="/en"
        lang={lang}
      />
      {/* 1. Hero Intro Section: Scientific & Technological Showcase */}
      <section className="hero-intro-section">
        <div className="container">
          <div className="hero-intro-grid">
            <div className="hero-intro-left">
              <div className="tech-badge">
                <Sparkles size={13} />
                <span>{lang === 'en' ? 'Research & Production Center' : 'Научно-производственный центр'}</span>
              </div>
              <h1 className="hero-intro-title">
                {lang === 'en' ? (
                  <>Scientific Developments <br /><span className="accent-title">Based on Functional Ceramics</span></>
                ) : (
                  <>Научные разработки <br /><span className="accent-title">на основе функциональной керамики</span></>
                )}
              </h1>
              <p className="hero-intro-desc">
                {lang === 'en'
                  ? 'Development and industrial implementation of energy-efficient technologies based on pulsed functional ceramics: agricultural drying, therapeutic medical lamps, pathogen sterilization, and polymer solar converters.'
                  : 'Разработка и промышленное внедрение энергоэффективных технологий на базе функциональной импульсной керамики: сушка сельхозпродукции, медицинские лампы, стерилизация и полимерные преобразователи солнечного света.'}
              </p>
              <div className="hero-intro-actions">
                <a href="#developments-grid" className="hero-btn-primary">
                  <span>{lang === 'en' ? 'Explore Developments' : 'Все разработки'}</span>
                  <ArrowRight size={16} />
                </a>
                <Link to={getTargetRoute('/contact')} className="hero-btn-secondary">
                  <span>{lang === 'en' ? 'Contact Center' : 'Связаться с нами'}</span>
                </Link>
              </div>
            </div>

            {/* Technological Stats Widgets (Strictly verified data from siteContent) */}
            <div className="hero-stats-panel">
              <div className="hero-stat-card">
                <div className="hero-stat-val">7</div>
                <div className="hero-stat-label">
                  {lang === 'en' ? 'Core development directions' : 'Ключевых направлений разработок'}
                </div>
              </div>
              <div className="hero-stat-card">
                <div className="hero-stat-val">&gt; 100 000×</div>
                <div className="hero-stat-label">
                  {lang === 'en' ? 'Microbial reduction factor (SPSMI tests)' : 'Снижение микробной обсемененности (тесты СПСГМИ)'}
                </div>
              </div>
              <div className="hero-stat-card">
                <div className="hero-stat-val">{lang === 'en' ? 'Pulsed IR' : 'ИК-импульс'}</div>
                <div className="hero-stat-label">
                  {lang === 'en' ? 'Functional ceramics technology' : 'Импульсная функциональная керамика'}
                </div>
              </div>
              <div className="hero-stat-card">
                <div className="hero-stat-val">R&amp;D</div>
                <div className="hero-stat-label">
                  {lang === 'en' ? 'Proprietary research and equipment' : 'Собственные исследования и оборудование'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Hero Slider (7-slide technological panoramic banner) */}
      <HeroSlider />

      {/* 3. Developments Grid Section */}
      <section className="home-cards-section" id="developments-grid">
        <div className="container">
          <div className="home-section-header">
            <div className="tech-badge" style={{ marginBottom: 12 }}>
              <Layers size={13} />
              <span>{t.home.devTitle}</span>
            </div>
            <h2 className="home-section-title">
              {lang === 'en' ? 'Core Scientific Developments' : 'Ключевые направления разработок'}
            </h2>
            <p className="home-section-subtitle">
              {lang === 'en'
                ? 'High-performance engineering solutions and equipment based on functional ceramic emitters.'
                : 'Высокоэффективные инженерные комплексы и методики на основе импульсных керамических излучателей.'}
            </p>
          </div>

          <div className="home-cards-grid">
            {cardsData.map((card, idx) => {
              const data = card[lang] || card.ru;
              const targetUrl = getTargetRoute(card.route);
              return (
                <Link key={idx} to={targetUrl} className="ks-dev-card infraks-card">
                  <div className="card-icon-container">
                    <img src={card.icon} alt={data.title} loading="lazy" />
                  </div>
                  <div className="ks-card-content infraks-card-content">
                    {data.category && (
                      <span className="tech-badge" style={{ width: 'fit-content', marginBottom: 10 }}>
                        {data.category}
                      </span>
                    )}
                    <h3 className="ks-card-title infraks-card-title">{data.title}</h3>
                    <p className="ks-card-descr infraks-card-descr">{data.descr}</p>
                  </div>
                  <div className="ks-card-footer infraks-card-footer">
                    <span className="infraks-card-footer-text">{t.home.learnMore}</span>
                    <span className="ks-card-footer-arrows infraks-card-footer-arrows" aria-hidden="true">
                      <svg width="24" height="15" viewBox="0 0 24 15" fill="currentColor">
                        <path d="M1 0.5L7.5 7.5L1 14.5H5.8L12.3 7.5L5.8 0.5H1Z" />
                        <path d="M11 0.5L17.5 7.5L11 14.5H15.8L22.3 7.5L15.8 0.5H11Z" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3.5. Latest News & Announcements (Dynamic CMS Content) */}
      {latestNews.length > 0 && (
        <section style={{ padding: '64px 0', backgroundColor: 'var(--color-background-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div className="tech-badge" style={{ marginBottom: 10 }}>
                  <Newspaper size={13} />
                  <span>{lang === 'en' ? 'Company News' : 'Новости компании'}</span>
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-dark)', margin: 0 }}>
                  {lang === 'en' ? 'Latest Events & Updates' : 'Актуальные события и новости'}
                </h2>
              </div>
              <Link 
                to={lang === 'en' ? '/en/news' : '/news'}
                className="hero-btn-secondary"
                style={{ padding: '8px 18px', fontSize: '0.88rem' }}
              >
                <span>{lang === 'en' ? 'All news' : 'Все новости'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '22px' }}>
              {latestNews.map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: '#ffffff',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    {item.category && <span className="tech-badge" style={{ padding: '2px 8px' }}>{item.category}</span>}
                    {item.date && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Calendar size={12} />
                        <span>{item.date}</span>
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.18rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '10px', lineHeight: 1.35 }}>
                    <Link to={lang === 'en' ? `/en/news/${item.slug}` : `/news/${item.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {item.title}
                    </Link>
                  </h3>
                  <p style={{ fontSize: '0.91rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, flexGrow: 1, marginBottom: '16px' }}>
                    {item.excerpt}
                  </p>
                  <Link 
                    to={lang === 'en' ? `/en/news/${item.slug}` : `/news/${item.slug}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.88rem' }}
                  >
                    <span>{lang === 'en' ? 'Read more' : 'Подробнее'}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Contact & Map Section (Clean Corporate Layout) */}
      <section className="home-contact-section">
        <div className="container">
          <div className="home-contact-grid">
            <div className="contact-text-box">
              <div>
                <div className="tech-badge" style={{ marginBottom: 12 }}>
                  <MapPin size={13} />
                  <span>{t.home.contactsTitle}</span>
                </div>
                <h3>{t.home.companyName}</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: 20 }}>
                  {t.footer.aboutText}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <MapPin size={19} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: '0.94rem', color: 'var(--color-text)', lineHeight: 1.5 }}>
                      {t.home.addressFull}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Phone size={18} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                    <a href="tel:+998998336783" style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                      +998 99 8336783
                    </a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Mail size={18} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                    <a href="mailto:ruslat@yandex.ru" style={{ fontSize: '0.94rem', color: 'var(--color-text)' }}>
                      ruslat@yandex.ru
                    </a>
                  </div>
                </div>
              </div>

              {/* Social media links */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--color-border)' }}>
                <a href="https://wa.me/998998336783" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="WhatsApp">
                  <img src="/images/icons/whatsapp.svg" alt="WhatsApp" />
                </a>
                <a href="https://t.me/Rus_Lat" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Telegram">
                  <img src="/images/icons/telegram.svg" alt="Telegram" />
                </a>
                <a href="https://max.ru/u/+998998336783" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="MAX: +998 99 8336783">
                  <img src="/images/icons/max.svg" alt="MAX" />
                </a>
                <a href="https://www.youtube.com/@Rahimovrx" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="YouTube">
                  <img src="/images/icons/youtube.svg" alt="YouTube" />
                </a>
              </div>
            </div>

            <div className="contact-map-card">
              <MapWidget />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
