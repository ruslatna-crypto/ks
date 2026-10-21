import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  User,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  Check,
  Building2
} from 'lucide-react';
import '../styles/lamp-order.css';

const LAMP_ITEMS = [
  { id: 'RC', name: 'RC', price: 250 },
  { id: 'GI', name: 'GI', price: 120 },
  { id: 'AF', name: 'AF', price: 145 },
  { id: 'KL', name: 'KL', price: 130 },
  { id: 'ZB', name: 'ZB', price: 110 },
  { id: 'AV', name: 'AV', price: 130 },
  { id: 'AK', name: 'AK', price: 145 },
  { id: 'KH', name: 'KH', price: 130 },
  { id: 'KB', name: 'KB', price: 160 },
  { id: 'GI_ZB', name: 'GI/ZB', price: 120 },
  { id: 'RC_ZB', name: 'RC/ZB', price: 175 },
  { id: 'ZRK', name: 'ZRK', price: 165 },
  { id: 'KL_ZB', name: 'KL/ZB', price: 170 },
  { id: 'ST', name: 'ST', price: 900 },
  { id: 'GI_KL', name: 'GI/KL', price: 120 },
  { id: 'SPARKA', name: 'SPARKA', price: 1100 },
  { id: 'PLAFON', name: 'Плафон', nameEn: 'Plafon (Shade)', price: 10 },
  { id: 'POWER_UNIT', name: 'Блок питания', nameEn: 'Power Supply', price: 25 }
];

const LampOrderForm = () => {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  // Per-item quantities: { [itemId]: number }
  const [quantities, setQuantities] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    organization: '',
    email: '',
    city: '',
    comment: ''
  });

  const [honeypot, setHoneypot] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState(null);
  const mountTimeRef = useRef(Date.now());

  // Toggle card on click
  const handleToggleCard = (itemId) => {
    setQuantities((prev) => {
      const current = prev[itemId] || 0;
      if (current > 0) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: 1 };
    });
    if (errorMsg) setErrorMsg('');
  };

  // Stepper increment / decrement matching рис. 1
  const handleStep = (e, itemId, delta) => {
    e.stopPropagation();
    setQuantities((prev) => {
      const current = prev[itemId] || 0;
      const nextVal = current + delta;
      if (nextVal <= 0) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: Math.min(100, nextVal) };
    });
    if (errorMsg) setErrorMsg('');
  };

  // Selected items list
  const selectedItems = LAMP_ITEMS.filter((item) => (quantities[item.id] || 0) > 0).map((item) => ({
    id: item.id,
    name: isEn && item.nameEn ? item.nameEn : item.name,
    price: item.price,
    quantity: quantities[item.id]
  }));

  // Calculate dynamic order total and total quantity
  const totalSum = LAMP_ITEMS.reduce((sum, item) => {
    const qty = quantities[item.id] || 0;
    return sum + qty * item.price;
  }, 0);

  const totalQuantity = LAMP_ITEMS.reduce((sum, item) => {
    return sum + (quantities[item.id] || 0);
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Honeypot check
    if (honeypot) {
      console.warn('Bot detected via honeypot');
      return;
    }

    if (selectedItems.length === 0) {
      setErrorMsg(
        isEn
          ? 'Please select at least one lamp type.'
          : 'Пожалуйста, отметьте галочками хотя бы один тип лампы.'
      );
      return;
    }

    // Client-side quick check
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMsg(
        isEn
          ? 'Please specify your name (minimum 2 characters).'
          : 'Пожалуйста, укажите имя контактного лица (минимум 2 символа).'
      );
      return;
    }

    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim() || digitsOnly.length < 6) {
      setErrorMsg(
        isEn
          ? 'Please provide a valid contact phone number (minimum 6 digits).'
          : 'Пожалуйста, укажите корректный номер телефона (минимум 6 цифр).'
      );
      return;
    }

    if (!formData.email.trim()) {
      setErrorMsg(
        isEn
          ? 'Please specify your email address.'
          : 'Пожалуйста, укажите адрес электронной почты.'
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setErrorMsg(
        isEn
          ? 'Please enter a valid email address.'
          : 'Пожалуйста, введите корректный адрес электронной почты.'
      );
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        items: selectedItems,
        totalSum: totalSum,
        totalQuantity: totalQuantity,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        organization: formData.organization.trim(),
        email: formData.email.trim(),
        city: formData.city.trim(),
        comment: formData.comment.trim(),
        _t: mountTimeRef.current,
        company_website: honeypot
      };

      const res = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(
          data.error ||
            (isEn
              ? 'Failed to send order request. Please try again later.'
              : 'Ошибка отправки заявки. Пожалуйста, попробуйте позже.')
        );
      }

      // Success
      setSuccessData({
        items: selectedItems,
        totalSum: totalSum,
        totalQuantity: totalQuantity,
        name: formData.name,
        phone: formData.phone,
        organization: formData.organization,
        email: formData.email,
        messageId: data.messageId
      });
    } catch (err) {
      console.error('Order submit error:', err);
      setErrorMsg(
        err.message ||
          (isEn
            ? 'Connection error. Please try again later.'
            : 'Ошибка соединения. Пожалуйста, попробуйте позже.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setErrorMsg('');
    setQuantities({});
    mountTimeRef.current = Date.now();
    setFormData({
      name: '',
      phone: '',
      organization: '',
      email: '',
      city: '',
      comment: ''
    });
  };

  return (
    <section className="lamp-order-section" id="order-form">
      <div className="lamp-order-container">
        {/* Header Block */}
        <div className="lamp-order-header">
          <h2 className="lamp-order-title">
            {isEn ? 'Order Emitters' : 'Заказ излучателей'}
          </h2>
          <p className="lamp-order-subtitle">
            {isEn
              ? 'Submit a direct request for manufacturing and delivery.'
              : 'Оформите прямую заявку на изготовление и поставку.'}
          </p>
        </div>

        {/* Success Card */}
        {successData ? (
          <div className="lamp-order-success-card">
            <div className="lamp-order-success-icon-wrap">
              <CheckCircle2 size={56} className="lamp-order-success-icon" />
            </div>
            <h3 className="lamp-order-success-title">
              {isEn ? 'Order Request Sent Successfully!' : 'Заявка успешно отправлена!'}
            </h3>
            <p className="lamp-order-success-desc">
              {isEn
                ? 'Thank you! Your order inquiry has been confirmed and delivered to our technical director in Telegram.'
                : 'Спасибо! Ваша заявка подтверждена и успешно доставлена руководителю в Telegram.'}
            </p>

            <div className="lamp-order-summary-box">
              <div className="lamp-order-summary-row">
                <span className="lamp-order-summary-label">
                  {isEn ? 'Selected items:' : 'Выбранные позиции:'}
                </span>
                <span className="lamp-order-summary-value">
                  {successData.items
                    .map((it) => `${it.name} — ${it.quantity} ${isEn ? 'pcs' : 'шт.'}`)
                    .join(', ')}
                </span>
              </div>
              <div className="lamp-order-summary-row">
                <span className="lamp-order-summary-label">
                  {isEn ? 'Total quantity:' : 'Всего изделий:'}
                </span>
                <span className="lamp-order-summary-value font-bold text-primary">
                  {successData.totalQuantity || successData.items.reduce((s, it) => s + (it.quantity || 1), 0)} {isEn ? 'pcs' : 'шт.'}
                </span>
              </div>
              <div className="lamp-order-summary-row">
                <span className="lamp-order-summary-label">
                  {isEn ? 'Contact name:' : 'Контактное лицо:'}
                </span>
                <span className="lamp-order-summary-value">{successData.name}</span>
              </div>
              {successData.organization && (
                <div className="lamp-order-summary-row">
                  <span className="lamp-order-summary-label">{isEn ? 'Organization:' : 'Организация:'}</span>
                  <span className="lamp-order-summary-value">{successData.organization}</span>
                </div>
              )}
              <div className="lamp-order-summary-row">
                <span className="lamp-order-summary-label">{isEn ? 'Phone:' : 'Телефон:'}</span>
                <span className="lamp-order-summary-value font-mono">{successData.phone}</span>
              </div>
              <div className="lamp-order-summary-row">
                <span className="lamp-order-summary-label">Email:</span>
                <span className="lamp-order-summary-value">{successData.email}</span>
              </div>
            </div>

            <div className="lamp-order-direct-contact">
              <ShieldCheck size={16} />
              <span>
                {isEn
                  ? 'Urgent inquiries: +998 99 8336783 (WhatsApp / Telegram: @Rus_Lat)'
                  : 'Для срочных вопросов: +998 99 8336783 (WhatsApp / Telegram: @Rus_Lat)'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="lamp-order-btn-reset"
            >
              {isEn ? 'Submit Another Order' : 'Оформить ещё одну заявку'}
            </button>
          </div>
        ) : (
          /* Main Order Form */
          <form onSubmit={handleSubmit} className="lamp-order-card" noValidate>
            {/* Honeypot field (hidden from genuine users) */}
            <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
              <label htmlFor="company_website_input">Leave blank</label>
              <input
                id="company_website_input"
                type="text"
                name="company_website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {errorMsg && (
              <div className="lamp-order-error-banner" role="alert">
                <AlertCircle size={20} className="lamp-order-error-icon" />
                <div className="lamp-order-error-text">{errorMsg}</div>
              </div>
            )}

            {/* Checkbox Grid with Stepper Quantity (matching рис. 1) */}
            <div className="lamp-checkbox-section">
              <label className="lamp-order-label">
                <span>{isEn ? 'Select lamp types and accessories' : 'Выберите типы ламп и комплектующие'}</span>
                <span className="lamp-order-required">*</span>
              </label>

              <div className="lamp-checkbox-grid">
                {LAMP_ITEMS.map((item) => {
                  const qty = quantities[item.id] || 0;
                  const isChecked = qty > 0;
                  const itemName = isEn && item.nameEn ? item.nameEn : item.name;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleToggleCard(item.id)}
                      className={`lamp-checkbox-card ${isChecked ? 'is-checked' : ''}`}
                      role="checkbox"
                      aria-checked={isChecked}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          handleToggleCard(item.id);
                        }
                      }}
                    >
                      <div className="lamp-checkbox-left">
                        <div className="lamp-checkbox-box">
                          {isChecked && <Check size={14} className="lamp-checkbox-check" />}
                        </div>
                        <span className="lamp-checkbox-title">{itemName}</span>
                      </div>

                      {/* Stepper widget matching рис. 1 */}
                      <div
                        className="lamp-item-stepper"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="lamp-stepper-btn"
                          onClick={(e) => handleStep(e, item.id, -1)}
                          title={isEn ? 'Decrease' : 'Уменьшить'}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="lamp-stepper-val">{qty}</span>
                        <button
                          type="button"
                          className="lamp-stepper-btn"
                          onClick={(e) => handleStep(e, item.id, 1)}
                          title={isEn ? 'Increase' : 'Увеличить'}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Items Summary Bar */}
              <div className="lamp-order-total-bar">
                <div className="lamp-order-total-count">
                  {isEn ? 'Selected items:' : 'Выбрано позиций:'}{' '}
                  <strong>{selectedItems.length}</strong>
                  {totalQuantity > 0 && (
                    <span className="lamp-order-total-pcs">
                      {' '}({totalQuantity} {isEn ? 'pcs' : 'шт.'})
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className="lamp-order-form-grid">
              {/* Contact Name */}
              <div className="lamp-order-col-span-1">
                <label className="lamp-order-label">
                  <User size={15} />
                  <span>{isEn ? 'Contact Person / Name' : 'Ваше имя / Контактное лицо'}</span>
                  <span className="lamp-order-required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder={isEn ? 'e.g. Dr. Robert Vance' : 'Например: Иванов Иван'}
                  value={formData.name}
                  onChange={handleChange}
                  className="lamp-order-input"
                  required
                  maxLength={100}
                />
              </div>

              {/* Phone */}
              <div className="lamp-order-col-span-1">
                <label className="lamp-order-label">
                  <Phone size={15} />
                  <span>{isEn ? 'Phone Number' : 'Номер телефона'}</span>
                  <span className="lamp-order-required">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder={isEn ? '+1 (555) 000-0000' : '+998 90 123-45-67'}
                  value={formData.phone}
                  onChange={handleChange}
                  className="lamp-order-input"
                  required
                  maxLength={35}
                />
              </div>

              {/* Organization (Optional) */}
              <div className="lamp-order-col-span-1">
                <label className="lamp-order-label">
                  <Building2 size={15} />
                  <span>{isEn ? 'Organization / Clinic' : 'Организация / Клиника'}</span>
                  <span className="lamp-order-optional">({isEn ? 'optional' : 'необязательно'})</span>
                </label>
                <input
                  type="text"
                  name="organization"
                  placeholder={isEn ? 'e.g. Health Center, Clinic' : 'Например: Клиника «Здоровье», НИИ'}
                  value={formData.organization}
                  onChange={handleChange}
                  className="lamp-order-input"
                  maxLength={100}
                />
              </div>

              {/* Email (Required) */}
              <div className="lamp-order-col-span-1">
                <label className="lamp-order-label">
                  <Mail size={15} />
                  <span>Email</span>
                  <span className="lamp-order-required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="contact@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="lamp-order-input"
                  required
                  maxLength={100}
                />
              </div>

              {/* City / Delivery location */}
              <div className="lamp-order-col-span-2">
                <label className="lamp-order-label">
                  <MapPin size={15} />
                  <span>{isEn ? 'City / Delivery Region' : 'Город / Регион доставки'}</span>
                  <span className="lamp-order-optional">({isEn ? 'optional' : 'необязательно'})</span>
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder={isEn ? 'e.g. Tashkent, Moscow, Berlin' : 'Например: Ташкент, Москва, Алматы'}
                  value={formData.city}
                  onChange={handleChange}
                  className="lamp-order-input"
                  maxLength={100}
                />
              </div>

              {/* Comment / Questions */}
              <div className="lamp-order-col-span-2">
                <label className="lamp-order-label">
                  <MessageSquare size={15} />
                  <span>{isEn ? 'Comment / Technical Requirements' : 'Комментарий или пожелания'}</span>
                  <span className="lamp-order-optional">({isEn ? 'optional' : 'необязательно'})</span>
                </label>
                <textarea
                  name="comment"
                  rows={3}
                  placeholder={
                    isEn
                      ? 'Specify questions, clinical application details, or delivery notes...'
                      : 'Укажите вопросы по комплектации, особенности применения или пожелания по доставке...'
                  }
                  value={formData.comment}
                  onChange={handleChange}
                  className="lamp-order-textarea"
                  maxLength={2000}
                />
              </div>
            </div>

            {/* Submit & Guarantee Footer */}
            <div className="lamp-order-footer">
              <button
                type="submit"
                disabled={isLoading}
                className="lamp-order-submit-btn"
              >
                {isLoading ? (
                  <>
                    <span className="lamp-order-spinner" />
                    <span>{isEn ? 'Sending order request...' : 'Отправка заявки...'}</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>
                      {isEn ? 'Submit Order' : 'Отправить заявку'}
                    </span>
                  </>
                )}
              </button>

              <div className="lamp-order-guarantee">
                <Clock size={15} className="lamp-order-guarantee-icon" />
                <span>
                  {isEn
                    ? 'Direct transmission to supervisor Telegram. Rapid response within 1 business day.'
                    : 'Прямая отправка в Telegram руководству. Ответ специалиста в течение рабочего дня.'}
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default LampOrderForm;
