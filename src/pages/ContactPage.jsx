import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import MapWidget from '../components/MapWidget';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const breadcrumbs = [
    { title: t.contactPage.title }
  ];

  return (
    <div className="page-wrap">
      <SEO
        title={lang === 'en' ? 'Contacts' : 'Контакты'}
        description={lang === 'en'
          ? 'Contact information of LLC KERAMIKA SINTEZ: production address, telephone, email and location map.'
          : 'Контактная информация ООО «KERAMIKA SINTEZ»: адрес производства, телефон, электронная почта и карта проезда.'}
        canonicalPath={lang === 'en' ? '/en/contact' : '/contact'}
        ruPath="/contact"
        enPath="/en/contact"
        lang={lang}
      />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
        
        <div style={{ marginBottom: 28 }}>
          <h1 className="page-title-heading">{t.contactPage.title}</h1>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 36,
          alignItems: 'stretch'
        }}>
          {/* Details */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '32px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: 20 }}>
                {t.home.companyName}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 26 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <MapPin size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {t.contactPage.addressLabel}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--color-text)', marginTop: 2 }}>
                      {t.home.addressFull}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <Phone size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {t.contactPage.phoneLabel}
                    </h3>
                    <a href="tel:+998998336783" style={{ fontSize: '1.05rem', color: 'var(--color-primary)', fontWeight: 700, marginTop: 2, display: 'inline-block' }}>
                      +998 99 8336783
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <Mail size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {t.contactPage.emailLabel}
                    </h3>
                    <a href="mailto:ruslat@yandex.ru" style={{ fontSize: '0.95rem', color: 'var(--color-text)', marginTop: 2, display: 'inline-block' }}>
                      ruslat@yandex.ru
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <Clock size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {lang === 'en' ? 'Working Hours' : 'Режим работы'}
                    </h3>
                    <p style={{ fontSize: '0.94rem', color: 'var(--color-text)', marginTop: 2 }}>
                      {lang === 'en' ? 'Monday — Friday: 09:00 — 18:00 (GMT+5)' : 'Понедельник — Пятница: 09:00 — 18:00 (GMT+5)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 18, borderTop: '1px solid var(--color-border)' }}>
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

          {/* Interactive Google Map in place of the form */}
          <div style={{ height: '100%', minHeight: 460 }}>
            <MapWidget style={{ height: '100%', minHeight: 460 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
