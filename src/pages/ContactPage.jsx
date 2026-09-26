import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import MapWidget from '../components/MapWidget';
import ContactForm from '../components/ContactForm';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Phone, Mail, MapPin, Clock, Building2 } from 'lucide-react';

const ContactPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const breadcrumbs = [
    { title: t.contactPage.title }
  ];

  return (
    <div className="page-wrap">
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
        
        <div style={{ marginBottom: 28 }}>
          <div className="tech-badge" style={{ marginBottom: 12 }}>
            <Building2 size={13} />
            <span>{lang === 'en' ? 'Corporate Office' : 'Корпоративный контакт'}</span>
          </div>
          <h1 className="page-title-heading">{t.contactPage.title}</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 36, alignItems: 'start' }}>
          {/* Details & Map */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '32px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: 10 }}>
              {t.home.companyName}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: 24 }}>
              {t.footer.aboutText}
            </p>

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

            {/* Social Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, paddingTop: 18, borderTop: '1px solid var(--color-border)' }}>
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

            {/* Map Container */}
            <div style={{ height: 280, borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
              <MapWidget />
            </div>
          </div>

          {/* Feedback Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
