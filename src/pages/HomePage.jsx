import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import MapWidget from '../components/MapWidget';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Phone, Mail, MapPin } from 'lucide-react';

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
    icon: '/images/grili/gr1.jpg',
    imageFit: 'cover',
    imagePosition: 'center bottom',
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
      {/* 1. Full-Width Hero Slider immediately under header menu */}
      <HeroSlider />

      {/* 2. Developments Grid Section */}
      <section className="home-cards-section" id="developments-grid">
        <div className="container">
          <div className="home-section-header">
            <h2 className="home-section-title">
              {lang === 'en' ? 'Core Scientific Developments' : 'Ключевые направления разработок'}
            </h2>
          </div>

          <div className="home-cards-grid">
            {cardsData.map((card, idx) => {
              const data = card[lang] || card.ru;
              const targetUrl = getTargetRoute(card.route);
              return (
                <Link key={idx} to={targetUrl} className="ks-dev-card infraks-card">
                  <div className="card-icon-container card-image">
                    <img
                      src={card.icon}
                      alt={data.title}
                      loading="lazy"
                      style={
                        card.imageFit
                          ? { objectFit: card.imageFit, objectPosition: card.imagePosition || 'center' }
                          : undefined
                      }
                    />
                  </div>
                  <div className="ks-card-content infraks-card-content">
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

      {/* 3. Contact & Map Section (Clean Corporate Layout) */}
      <section className="home-contact-section">
        <div className="container">
          <div className="home-contact-grid">
            <div className="contact-text-box">
              <div>
                <h3 style={{ marginBottom: 18 }}>{t.home.companyName}</h3>

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
