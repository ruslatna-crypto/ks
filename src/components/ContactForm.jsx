import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Send, CheckCircle2, Info } from 'lucide-react';

const ContactForm = () => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 450);
  };

  if (isSubmitted) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '44px 30px',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        background: '#ffffff',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <CheckCircle2 size={46} color="#16a34a" style={{ margin: '0 auto 14px' }} />
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 10, color: 'var(--color-dark)' }}>
          {t.contactPage.successMsg}
        </h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.94rem', marginBottom: 16, lineHeight: 1.6 }}>
          {lang === 'en'
            ? 'Your inquiry has been registered. For immediate questions, you can also reach us directly at ruslat@yandex.ru or by phone +998 99 8336783.'
            : 'Ваше обращение принято. Для оперативной связи вы также можете направить письмо напрямую на ruslat@yandex.ru или позвонить по номеру +998 99 8336783.'}
        </p>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: '0.8rem',
          color: 'var(--color-text-muted)',
          background: 'var(--color-background-alt)',
          padding: '6px 12px',
          borderRadius: 'var(--radius-sm)',
          marginBottom: 24
        }}>
          <Info size={14} />
          <span>{lang === 'en' ? 'Direct contact: ruslat@yandex.ru' : 'Прямой контакт: ruslat@yandex.ru'}</span>
        </div>
        <br />
        <button 
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', phone: '', message: '' });
          }}
          style={{
            padding: '10px 22px',
            background: 'var(--color-background-alt)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 600,
            fontSize: '0.9rem',
            color: 'var(--color-text)',
            transition: 'all 0.15s ease'
          }}
        >
          {lang === 'en' ? 'Send another message' : 'Отправить ещё сообщение'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: '#ffffff',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      padding: '32px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: 6 }}>
        {t.contactPage.formTitle}
      </h3>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', marginBottom: 24, lineHeight: 1.5 }}>
        {t.contactPage.formSubtitle}
      </p>

      <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: 6 }}>
          {t.contactPage.nameLabel} <span style={{ color: 'var(--color-accent)' }}>*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          style={{
            width: '100%',
            height: '42px',
            padding: '0 14px',
            fontSize: '0.94rem',
            border: '1.5px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            outline: 'none',
            background: 'var(--color-background)',
            color: 'var(--color-text)',
            transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
          }}
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 18 }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: 6 }}>
            Email <span style={{ color: 'var(--color-accent)' }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            style={{
              width: '100%',
              height: '42px',
              padding: '0 14px',
              fontSize: '0.94rem',
              border: '1.5px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              outline: 'none',
              background: 'var(--color-background)',
              color: 'var(--color-text)'
            }}
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: 6 }}>
            {t.contactPage.phoneFormLabel} <span style={{ color: 'var(--color-accent)' }}>*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            style={{
              width: '100%',
              height: '42px',
              padding: '0 14px',
              fontSize: '0.94rem',
              border: '1.5px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              outline: 'none',
              background: 'var(--color-background)',
              color: 'var(--color-text)'
            }}
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: 6 }}>
          {t.contactPage.messageLabel} <span style={{ color: 'var(--color-accent)' }}>*</span>
        </label>
        <textarea
          name="message"
          required
          rows={4}
          style={{
            width: '100%',
            padding: '12px 14px',
            fontSize: '0.94rem',
            border: '1.5px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            outline: 'none',
            background: 'var(--color-background)',
            color: 'var(--color-text)',
            resize: 'vertical'
          }}
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          height: '46px',
          background: 'var(--color-primary)',
          color: '#ffffff',
          borderRadius: 'var(--radius-sm)',
          fontWeight: 600,
          fontSize: '0.95rem',
          transition: 'all 0.15s ease',
          boxShadow: '0 4px 12px rgba(62, 64, 149, 0.22)'
        }}
      >
        <Send size={16} />
        <span>{isLoading ? '...' : t.contactPage.sendBtn}</span>
      </button>
    </form>
  );
};

export default ContactForm;
