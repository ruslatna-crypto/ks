// api/order.js
// Vercel Serverless Function & Vite dev middleware handler for Telegram order submission

// In-memory rate limiting and deduplication stores (scoped to container instance lifetime)
const rateLimitMap = new Map(); // IP -> Array of timestamps
const recentRequestsMap = new Map(); // Hash -> timestamp

const MAX_PAYLOAD_SIZE = 10 * 1024; // 10 KB
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const DEDUP_WINDOW_MS = 30 * 1000; // 30 seconds
const TELEGRAM_TIMEOUT_MS = 10 * 1000; // 10 seconds

const ALLOWED_ORIGINS = [
  'https://www.infraks.uz',
  'https://infraks.uz',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000'
];

function checkOrigin(req) {
  const origin = req.headers['origin'];
  if (!origin) return null; // Same-origin or non-browser client
  if (
    ALLOWED_ORIGINS.includes(origin) ||
    origin.endsWith('.infraks.uz') ||
    origin.endsWith('.vercel.app')
  ) {
    return origin;
  }
  return false; // Disallowed origin
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function sendResponse(res, statusCode, data, allowedOrigin = null) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8'
  };
  if (allowedOrigin) {
    headers['Access-Control-Allow-Origin'] = allowedOrigin;
    headers['Vary'] = 'Origin';
  }

  if (typeof res.status === 'function') {
    if (allowedOrigin && typeof res.setHeader === 'function') {
      res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
      res.setHeader('Vary', 'Origin');
    }
    return res.status(statusCode).json(data);
  }

  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(data));
}

async function parseBody(req) {
  if (req.body && typeof req.body === 'object') {
    try {
      const serialized = JSON.stringify(req.body);
      if (serialized.length > MAX_PAYLOAD_SIZE) {
        throw new Error('PAYLOAD_TOO_LARGE');
      }
    } catch (e) {
      if (e.message === 'PAYLOAD_TOO_LARGE') throw e;
    }
    return req.body;
  }
  if (typeof req.body === 'string') {
    if (req.body.length > MAX_PAYLOAD_SIZE) {
      throw new Error('PAYLOAD_TOO_LARGE');
    }
    try {
      return JSON.parse(req.body);
    } catch {
      throw new Error('INVALID_JSON');
    }
  }

  return new Promise((resolve, reject) => {
    let rawData = '';
    let bytesReceived = 0;

    req.on('data', chunk => {
      bytesReceived += chunk.length;
      if (bytesReceived > MAX_PAYLOAD_SIZE) {
        req.destroy();
        reject(new Error('PAYLOAD_TOO_LARGE'));
        return;
      }
      rawData += chunk;
    });

    req.on('end', () => {
      if (!rawData) {
        resolve({});
        return;
      }
      try {
        const parsed = JSON.parse(rawData);
        resolve(parsed);
      } catch {
        reject(new Error('INVALID_JSON'));
      }
    });

    req.on('error', err => reject(err));
  });
}

export default async function handler(req, res) {
  const matchedOrigin = checkOrigin(req);
  if (matchedOrigin === false) {
    return sendResponse(res, 403, {
      ok: false,
      error: 'Запрос отклонен: источник не входит в список доверенных доменов.'
    });
  }

  // CORS Preflight check
  if (req.method === 'OPTIONS') {
    const headers = {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    };
    if (matchedOrigin) {
      headers['Access-Control-Allow-Origin'] = matchedOrigin;
      headers['Vary'] = 'Origin';
    }
    if (typeof res.status === 'function') {
      if (matchedOrigin && typeof res.setHeader === 'function') {
        res.setHeader('Access-Control-Allow-Origin', matchedOrigin);
        res.setHeader('Vary', 'Origin');
      }
      return res.status(204).end();
    }
    res.writeHead(204, headers);
    return res.end();
  }

  // Only POST allowed
  if (req.method !== 'POST') {
    return sendResponse(res, 405, {
      ok: false,
      error: 'Метод не разрешен. Поддерживается только POST.'
    }, matchedOrigin);
  }

  // 1. Parse and limit request body
  let body;
  try {
    body = await parseBody(req);
  } catch (err) {
    if (err.message === 'PAYLOAD_TOO_LARGE') {
      return sendResponse(res, 413, {
        ok: false,
        error: 'Превышен максимальный размер запроса (10 КБ).'
      }, matchedOrigin);
    }
    return sendResponse(res, 400, {
      ok: false,
      error: 'Некорректный JSON в теле запроса.'
    }, matchedOrigin);
  }

  if (!body || typeof body !== 'object') {
    return sendResponse(res, 400, {
      ok: false,
      error: 'Тело запроса должно быть JSON-объектом.'
    }, matchedOrigin);
  }

  // 2. Anti-spam: Honeypot check
  if (body.company_website || body.website_url || body._hp) {
    return sendResponse(res, 400, {
      ok: false,
      error: 'Обнаружена подозрительная активность (spam bot detected).'
    }, matchedOrigin);
  }

  // 3. Anti-spam: Submission speed check (token timestamp)
  const now = Date.now();
  if (body._t && typeof body._t === 'number') {
    const elapsed = now - body._t;
    // If submitted faster than 1.2s, likely a bot script
    if (elapsed > 0 && elapsed < 1200) {
      return sendResponse(res, 400, {
        ok: false,
        error: 'Форма заполнена слишком быстро. Пожалуйста, проверьте данные и попробуйте снова.'
      }, matchedOrigin);
    }
  }

  // 4. Rate Limiting by IP (warm serverless instance scope)
  const clientIp = (
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    '127.0.0.1'
  );

  const ipTimestamps = rateLimitMap.get(clientIp) || [];
  const recentTimestamps = ipTimestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return sendResponse(res, 429, {
      ok: false,
      error: 'Слишком много заявок с вашего адреса. Пожалуйста, подождите 10 минут перед повторной отправкой.'
    }, matchedOrigin);
  }

  // 5. Validation of fields
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const items = Array.isArray(body.items) ? body.items : null;
  const product = typeof body.product === 'string' ? body.product.trim() : '';
  const quantityRaw = parseInt(body.quantity, 10);
  const quantity = !isNaN(quantityRaw) && quantityRaw > 0 ? Math.min(quantityRaw, 10000) : 1;
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const city = typeof body.city === 'string' ? body.city.trim() : '';
  const comment = typeof body.comment === 'string' ? body.comment.trim() : '';

  if ((!items || items.length === 0) && !product) {
    return sendResponse(res, 400, {
      ok: false,
      error: 'Пожалуйста, выберите хотя бы один тип лампы.'
    }, matchedOrigin);
  }

  if (!name || name.length < 2) {
    return sendResponse(res, 400, {
      ok: false,
      error: 'Пожалуйста, укажите имя контактного лица (минимум 2 символа).'
    }, matchedOrigin);
  }
  if (name.length > 100) {
    return sendResponse(res, 400, {
      ok: false,
      error: 'Имя слишком длинное (максимум 100 символов).'
    }, matchedOrigin);
  }

  const phoneDigits = phone.replace(/\D/g, '');
  if (!phone || phoneDigits.length < 6 || phone.length > 35) {
    return sendResponse(res, 400, {
      ok: false,
      error: 'Пожалуйста, укажите корректный номер телефона (минимум 6 цифр).'
    }, matchedOrigin);
  }

  if (!email) {
    return sendResponse(res, 400, {
      ok: false,
      error: 'Пожалуйста, укажите адрес электронной почты (email).'
    }, matchedOrigin);
  }

  if (email.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return sendResponse(res, 400, {
      ok: false,
      error: 'Пожалуйста, введите корректный адрес электронной почты.'
    }, matchedOrigin);
  }

  if (city.length > 100) {
    return sendResponse(res, 400, {
      ok: false,
      error: 'Поле города слишком длинное (максимум 100 символов).'
    }, matchedOrigin);
  }

  if (comment.length > 2000) {
    return sendResponse(res, 400, {
      ok: false,
      error: 'Комментарий слишком длинный (максимум 2000 символов).'
    }, matchedOrigin);
  }

  // 6. Deduplication check (same IP + phone + selected items within 30s)
  const itemsKey = items ? items.map(it => it.name || it.id || it).sort().join(',') : product;
  const dedupKey = `${clientIp}_${phoneDigits}_${itemsKey}`;
  const lastSubmitted = recentRequestsMap.get(dedupKey);
  if (lastSubmitted && now - lastSubmitted < DEDUP_WINDOW_MS) {
    return sendResponse(res, 429, {
      ok: false,
      error: 'Повторная отправка. Ваша заявка уже получена и находится в обработке!'
    }, matchedOrigin);
  }

  // 7. Check server environment variables strictly
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('[API/ORDER ERROR] Server configuration error: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing.');
    return sendResponse(res, 500, {
      ok: false,
      error: 'Ошибка конфигурации сервера: переменные TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы на сервере.'
    }, matchedOrigin);
  }

  // 8. Build Telegram notification message
  const dateFormatted = new Date().toLocaleString('ru-RU', {
    timeZone: 'Asia/Tashkent',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  let text = `📦 <b>НОВАЯ ЗАЯВКА НА ЗАКАЗ (INFRAKS)</b>\n`;
  text += `━━━━━━━━━━━━━━━━━━━━\n`;
  if (items && items.length > 0) {
    text += `💡 <b>Выбранные типы ламп:</b>\n`;
    let totalPcs = 0;
    items.forEach(it => {
      const itName = it.name || it.id || it;
      const itQty = parseInt(it.quantity, 10) || 1;
      totalPcs += itQty;
      text += `  • ${escapeHtml(itName)} — ${itQty} шт.\n`;
    });
    if (totalPcs > 0) {
      text += `\n📊 <b>Всего изделий:</b> ${totalPcs} шт.\n`;
    }
  } else {
    text += `💡 <b>Изделие:</b> ${escapeHtml(product)}\n`;
    text += `🔢 <b>Количество:</b> ${quantity} шт.\n`;
  }
  text += `━━━━━━━━━━━━━━━━━━━━\n`;
  text += `👤 <b>Контактное лицо:</b> ${escapeHtml(name)}\n`;
  text += `📞 <b>Телефон:</b> <code>${escapeHtml(phone)}</code>\n`;
  if (email) {
    text += `✉️ <b>Email:</b> ${escapeHtml(email)}\n`;
  }
  if (city) {
    text += `📍 <b>Город:</b> ${escapeHtml(city)}\n`;
  }
  if (comment) {
    text += `\n💬 <b>Комментарий / Требования:</b>\n<i>${escapeHtml(comment)}</i>\n`;
  }
  text += `━━━━━━━━━━━━━━━━━━━━\n`;
  text += `🕒 <b>Время заявки:</b> ${dateFormatted} (Ташкент)\n`;
  text += `🌐 <b>Страница:</b> /lamp\n`;
  text += `🆔 <b>IP:</b> <code>${escapeHtml(clientIp)}</code>`;

  // 9. Send message to Telegram Bot API with timeout controller
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);

  try {
    const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const tgResponse = await fetch(tgUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const tgData = await tgResponse.json().catch(() => ({}));

    if (!tgResponse.ok || !tgData.ok) {
      console.error('[API/ORDER ERROR] Telegram API rejected message:', tgData?.description || tgResponse.statusText);
      return sendResponse(res, 502, {
        ok: false,
        error: `Ошибка доставки сообщения через Telegram: ${tgData?.description || 'Неизвестная ошибка Telegram API'}`
      }, matchedOrigin);
    }

    // Success! Update rate limit and dedup stores
    recentTimestamps.push(now);
    rateLimitMap.set(clientIp, recentTimestamps);
    recentRequestsMap.set(dedupKey, now);

    return sendResponse(res, 200, {
      ok: true,
      messageId: tgData.result?.message_id,
      timestamp: now
    }, matchedOrigin);
  } catch (networkErr) {
    clearTimeout(timeoutId);
    if (networkErr.name === 'AbortError') {
      console.error('[API/ORDER ERROR] Telegram API request timed out (10s)');
      return sendResponse(res, 504, {
        ok: false,
        error: 'Превышено время ожидания ответа от сервера Telegram (тайм-аут 10 с). Пожалуйста, повторите попытку.'
      }, matchedOrigin);
    }
    console.error('[API/ORDER ERROR] Network error connecting to Telegram API:', networkErr.message);
    return sendResponse(res, 502, {
      ok: false,
      error: 'Сетевой сбой при обращении к серверу Telegram. Пожалуйста, попробуйте позже или свяжитесь по телефону.'
    }, matchedOrigin);
  }
}
