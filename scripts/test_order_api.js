// scripts/test_order_api.js
import orderHandler from '../api/order.js';

// Load .env.local
import { readFileSync, existsSync } from 'fs';
if (existsSync('.env.local')) {
  const content = readFileSync('.env.local', 'utf-8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      process.env[key.trim()] = vals.join('=').trim();
    }
  });
}

function createMockReqRes({ method = 'POST', body = {}, headers = {} }) {
  const req = {
    method,
    headers: { 'x-real-ip': '127.0.0.1', ...headers },
    body
  };

  let statusCode = 200;
  let responseData = null;
  const setHeaders = {};

  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseData = data;
      return this;
    },
    setHeader(k, v) {
      setHeaders[k.toLowerCase()] = v;
      return this;
    },
    writeHead(code, h = {}) {
      statusCode = code;
      Object.assign(setHeaders, h);
    },
    end(str) {
      if (str) {
        try { responseData = JSON.parse(str); } catch { responseData = str; }
      }
    }
  };

  return { req, res, getResult: () => ({ statusCode, responseData, headers: setHeaders }) };
}

async function runTests() {
  console.log('--- TEST 1: Reject GET method (405) ---');
  {
    const { req, res, getResult } = createMockReqRes({ method: 'GET' });
    await orderHandler(req, res);
    const { statusCode, responseData } = getResult();
    console.log('Status:', statusCode, 'Result:', responseData);
    if (statusCode !== 405) throw new Error('Expected 405 for GET');
  }

  console.log('\n--- TEST 2: CORS Validation (SEC-07: Reject Unauthorized, Allow Verified) ---');
  {
    // 2a. Reject arbitrary external origin
    const tExternal = createMockReqRes({
      method: 'POST',
      headers: { origin: 'https://malicious-attacker.com' }
    });
    await orderHandler(tExternal.req, tExternal.res);
    if (tExternal.getResult().statusCode !== 403) throw new Error('Expected 403 for malicious origin');

    // 2b. Reject arbitrary vercel.app origin (SEC-07 fix verification)
    const tVercel = createMockReqRes({
      method: 'POST',
      headers: { origin: 'https://arbitrary-user.vercel.app' }
    });
    await orderHandler(tVercel.req, tVercel.res);
    if (tVercel.getResult().statusCode !== 403) throw new Error('Expected 403 for arbitrary *.vercel.app domain');

    // 2c. Reject lookalike fake domain
    const tFake = createMockReqRes({
      method: 'POST',
      headers: { origin: 'https://fake-infraks.uz' }
    });
    await orderHandler(tFake.req, tFake.res);
    if (tFake.getResult().statusCode !== 403) throw new Error('Expected 403 for fake-infraks.uz');

    // 2d. Allow confirmed production domain via OPTIONS preflight
    const tProd = createMockReqRes({
      method: 'OPTIONS',
      headers: { origin: 'https://www.infraks.uz' }
    });
    await orderHandler(tProd.req, tProd.res);
    const prodRes = tProd.getResult();
    if (prodRes.statusCode !== 204 || prodRes.headers['access-control-allow-origin'] !== 'https://www.infraks.uz') {
      throw new Error('Expected 204 and CORS header for https://www.infraks.uz');
    }

    // 2e. Allow exact deployment URL when VERCEL_URL is set
    process.env.VERCEL_URL = 'ks-git-preview-test.vercel.app';
    const tPreview = createMockReqRes({
      method: 'OPTIONS',
      headers: { origin: 'https://ks-git-preview-test.vercel.app' }
    });
    await orderHandler(tPreview.req, tPreview.res);
    const previewRes = tPreview.getResult();
    delete process.env.VERCEL_URL;
    if (previewRes.statusCode !== 204 || previewRes.headers['access-control-allow-origin'] !== 'https://ks-git-preview-test.vercel.app') {
      throw new Error('Expected 204 and CORS header for verified VERCEL_URL');
    }

    console.log('CORS SEC-07 checks passed: unauthorized origins rejected, verified origins allowed.');
  }

  console.log('\n--- TEST 3: Reject Honeypot (Spam Bot) (400) ---');
  {
    const { req, res, getResult } = createMockReqRes({
      method: 'POST',
      body: {
        name: 'Bot Spam',
        phone: '+1234567890',
        company_website: 'http://spam-link.com'
      }
    });
    await orderHandler(req, res);
    const { statusCode, responseData } = getResult();
    console.log('Status:', statusCode, 'Result:', responseData);
    if (statusCode !== 400) throw new Error('Expected 400 for honeypot');
  }

  console.log('\n--- TEST 4: Reject Submission Faster than 1.2s (400) ---');
  {
    const { req, res, getResult } = createMockReqRes({
      method: 'POST',
      body: {
        items: [{ id: 'RC', quantity: 1 }],
        name: 'Speed Bot',
        phone: '+998901234567',
        email: 'speed@test.com',
        _t: Date.now() - 200 // 200ms ago
      }
    });
    await orderHandler(req, res);
    const { statusCode, responseData } = getResult();
    console.log('Status:', statusCode, 'Result:', responseData);
    if (statusCode !== 400) throw new Error('Expected 400 for fast submit');
  }

  console.log('\n--- TEST 5: Reject Oversized Body > 10KB (413) ---');
  {
    const hugeString = 'X'.repeat(12 * 1024);
    const { req, res, getResult } = createMockReqRes({
      method: 'POST',
      body: { comment: hugeString }
    });
    await orderHandler(req, res);
    const { statusCode, responseData } = getResult();
    console.log('Status:', statusCode, 'Result:', responseData);
    if (statusCode !== 413) throw new Error('Expected 413 for oversized body');
  }

  console.log('\n--- TEST 6: Reject Missing Items or Product (400) ---');
  {
    const { req, res, getResult } = createMockReqRes({
      method: 'POST',
      body: { name: 'Иван', phone: '+998901234567', email: 'ivan@test.com' }
    });
    await orderHandler(req, res);
    const { statusCode, responseData } = getResult();
    console.log('Status:', statusCode, 'Result:', responseData);
    if (statusCode !== 400) throw new Error('Expected 400 for missing items');
  }

  console.log('\n--- TEST 7: Reject Short Phone < 6 Digits (400) ---');
  {
    const { req, res, getResult } = createMockReqRes({
      method: 'POST',
      body: {
        items: [{ id: 'GI', quantity: 1 }],
        name: 'Иван',
        phone: '123',
        email: 'ivan@test.com',
        _t: Date.now() - 5000
      }
    });
    await orderHandler(req, res);
    const { statusCode, responseData } = getResult();
    console.log('Status:', statusCode, 'Result:', responseData);
    if (statusCode !== 400) throw new Error('Expected 400 for short phone');
  }

  console.log('\n--- TEST 8: Reject Invalid Email (400) ---');
  {
    const { req, res, getResult } = createMockReqRes({
      method: 'POST',
      body: {
        items: [{ id: 'GI', quantity: 1 }],
        name: 'Иван',
        phone: '+998901234567',
        email: 'not-an-email',
        _t: Date.now() - 5000
      }
    });
    await orderHandler(req, res);
    const { statusCode, responseData } = getResult();
    console.log('Status:', statusCode, 'Result:', responseData);
    if (statusCode !== 400) throw new Error('Expected 400 for invalid email');
  }

  console.log('\n--- TEST 9: Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID (500) ---');
  {
    const savedToken = process.env.TELEGRAM_BOT_TOKEN;
    const savedChat = process.env.TELEGRAM_CHAT_ID;
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;

    const { req, res, getResult } = createMockReqRes({
      method: 'POST',
      body: {
        items: [{ id: 'GI', quantity: 1 }],
        name: 'Тест',
        phone: '+998901234567',
        email: 'test@example.com',
        _t: Date.now() - 5000
      }
    });
    await orderHandler(req, res);
    const { statusCode, responseData } = getResult();
    console.log('Status:', statusCode, 'Result:', responseData);

    process.env.TELEGRAM_BOT_TOKEN = savedToken;
    process.env.TELEGRAM_CHAT_ID = savedChat;
    if (statusCode !== 500) throw new Error('Expected 500 when bot token/chat id missing');
  }

  console.log('\n--- TEST 10: Deduplication Check within 30s Window (429) ---');
  {
    // Simulate already submitted request by calling with same payload
    const payload = {
      items: [{ id: 'RC', quantity: 1 }],
      name: 'Дедуп Клиент',
      phone: '+998909999999',
      email: 'dedup@example.com',
      _t: Date.now() - 5000
    };
    // Mock fetch for telegram so we don't spam
    const originalFetch = global.fetch;
    global.fetch = async () => ({
      ok: true,
      json: async () => ({ ok: true, result: { message_id: 999 } })
    });

    try {
      const call1 = createMockReqRes({ method: 'POST', body: payload, headers: { 'x-real-ip': '192.168.1.100' } });
      await orderHandler(call1.req, call1.res);
      const res1 = call1.getResult();
      if (res1.statusCode !== 200) throw new Error('Expected 200 for initial submission');

      // Immediate second submission with identical IP + phone + items
      const call2 = createMockReqRes({ method: 'POST', body: payload, headers: { 'x-real-ip': '192.168.1.100' } });
      await orderHandler(call2.req, call2.res);
      const res2 = call2.getResult();
      console.log('Dedup Status:', res2.statusCode, 'Result:', res2.responseData);
      if (res2.statusCode !== 429) throw new Error('Expected 429 for duplicate submission');
    } finally {
      global.fetch = originalFetch;
    }
  }

  console.log('\n--- TEST 11: Telegram API Error Sanitization (SEC-08) ---');
  {
    const originalFetch = global.fetch;
    global.fetch = async () => ({
      ok: false,
      status: 400,
      json: async () => ({ ok: false, description: 'Bad Request: chat not found' })
    });

    try {
      const { req, res, getResult } = createMockReqRes({
        method: 'POST',
        body: {
          items: [{ id: 'RC', quantity: 1 }],
          name: 'Иван Ошибкин',
          phone: '+998901112233',
          email: 'errtest@example.com',
          _t: Date.now() - 5000
        },
        headers: { 'x-real-ip': '192.168.1.101' }
      });
      await orderHandler(req, res);
      const { statusCode, responseData } = getResult();
      console.log('Status:', statusCode, 'Result:', responseData);
      if (statusCode !== 502) throw new Error('Expected 502 for Telegram API failure');
      if (responseData.error !== 'Не удалось отправить заявку. Пожалуйста, повторите попытку позже или свяжитесь с нами по телефону.') {
        throw new Error('Expected sanitized neutral error message');
      }
      if (JSON.stringify(responseData).includes('Telegram') || JSON.stringify(responseData).includes('chat not found')) {
        throw new Error('Response must not leak internal Telegram details');
      }
      console.log('SEC-08 rejection sanitization test passed: internal details hidden from client.');
    } finally {
      global.fetch = originalFetch;
    }
  }

  console.log('\n--- TEST 12: Telegram Timeout Sanitization (SEC-08) ---');
  {
    const originalFetch = global.fetch;
    global.fetch = async () => {
      const err = new Error('The operation was aborted');
      err.name = 'AbortError';
      throw err;
    };

    try {
      const { req, res, getResult } = createMockReqRes({
        method: 'POST',
        body: {
          items: [{ id: 'RC', quantity: 1 }],
          name: 'Иван Таймутов',
          phone: '+998901112244',
          email: 'timeout@example.com',
          _t: Date.now() - 5000
        },
        headers: { 'x-real-ip': '192.168.1.102' }
      });
      await orderHandler(req, res);
      const { statusCode, responseData } = getResult();
      console.log('Status:', statusCode, 'Result:', responseData);
      if (statusCode !== 504) throw new Error('Expected 504 for timeout');
      if (responseData.error !== 'Превышено время ожидания ответа сервера. Пожалуйста, повторите попытку позже.') {
        throw new Error('Expected sanitized neutral timeout message');
      }
      if (JSON.stringify(responseData).includes('Telegram')) {
        throw new Error('Response must not leak internal Telegram service name');
      }
      console.log('SEC-08 timeout sanitization test passed: internal details hidden from client.');
    } finally {
      global.fetch = originalFetch;
    }
  }

  console.log('\n--- TEST 13: Reject Future Timestamp in _t (400) ---');
  {
    const { req, res, getResult } = createMockReqRes({
      method: 'POST',
      body: {
        items: [{ id: 'RC', quantity: 1 }],
        name: 'Future Bot',
        phone: '+998901234567',
        email: 'future@test.com',
        _t: Date.now() + 60000 // 60s in future
      }
    });
    await orderHandler(req, res);
    const { statusCode, responseData } = getResult();
    console.log('Status:', statusCode, 'Result:', responseData);
    if (statusCode !== 400 || responseData.error !== 'Недопустимая временная метка отправки формы.') {
      throw new Error('Expected 400 for future _t timestamp');
    }
  }

  console.log('\n--- TEST 14: Reject Invalid Non-numeric _t (400) ---');
  {
    const { req, res, getResult } = createMockReqRes({
      method: 'POST',
      body: {
        items: [{ id: 'RC', quantity: 1 }],
        name: 'Bad Timestamp Bot',
        phone: '+998901234567',
        email: 'badts@test.com',
        _t: 'invalid_string'
      }
    });
    await orderHandler(req, res);
    const { statusCode, responseData } = getResult();
    console.log('Status:', statusCode, 'Result:', responseData);
    if (statusCode !== 400 || responseData.error !== 'Некорректная временная метка формы.') {
      throw new Error('Expected 400 for non-numeric _t');
    }
  }

  console.log('\n--- TEST 15: IP Rate Limiting (429 on 6th request within window) ---');
  {
    const originalFetch = global.fetch;
    global.fetch = async () => ({
      ok: true,
      json: async () => ({ ok: true, result: { message_id: 1000 } })
    });

    const testIp = '198.51.100.42';
    try {
      // Send 5 successful requests with varying phones/items to avoid deduplication triggering
      for (let i = 1; i <= 5; i++) {
        const { req, res, getResult } = createMockReqRes({
          method: 'POST',
          body: {
            items: [{ id: 'RC', quantity: i }],
            name: `User ${i}`,
            phone: `+99890000000${i}`,
            email: `user${i}@test.com`,
            _t: Date.now() - 5000
          },
          headers: { 'x-real-ip': testIp }
        });
        await orderHandler(req, res);
        const { statusCode } = getResult();
        if (statusCode !== 200) throw new Error(`Expected 200 on request #${i}`);
      }

      // 6th request from the same IP must be rejected with 429
      const call6 = createMockReqRes({
        method: 'POST',
        body: {
          items: [{ id: 'GI', quantity: 1 }],
          name: 'User 6',
          phone: '+998900000006',
          email: 'user6@test.com',
          _t: Date.now() - 5000
        },
        headers: { 'x-real-ip': testIp }
      });
      await orderHandler(call6.req, call6.res);
      const res6 = call6.getResult();
      console.log('Rate Limit 6th call Status:', res6.statusCode, 'Result:', res6.responseData);
      if (res6.statusCode !== 429) throw new Error('Expected 429 on 6th request from same IP');
    } finally {
      global.fetch = originalFetch;
    }
  }

  console.log('\n--- TEST 16: Cloudflare Turnstile Opt-in Verification ---');
  {
    const originalFetch = global.fetch;
    process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY = 'mock_secret_key_for_testing';

    try {
      // 16a. Missing token when key configured -> 400
      const missingTokenCall = createMockReqRes({
        method: 'POST',
        body: {
          items: [{ id: 'RC', quantity: 1 }],
          name: 'No Token User',
          phone: '+998901234567',
          email: 'notoken@test.com',
          _t: Date.now() - 5000
        },
        headers: { 'x-real-ip': '198.51.100.99' }
      });
      await orderHandler(missingTokenCall.req, missingTokenCall.res);
      const missingRes = missingTokenCall.getResult();
      if (missingRes.statusCode !== 400) throw new Error('Expected 400 for missing Turnstile token');

      // 16b. Invalid token rejected by Cloudflare -> 403
      global.fetch = async (url) => {
        if (url.includes('turnstile')) {
          return {
            ok: true,
            json: async () => ({ success: false, 'error-codes': ['invalid-input-response'] })
          };
        }
        return { ok: true, json: async () => ({ ok: true }) };
      };

      const invalidTokenCall = createMockReqRes({
        method: 'POST',
        body: {
          items: [{ id: 'RC', quantity: 1 }],
          name: 'Invalid Token User',
          phone: '+998901234567',
          email: 'invalidtoken@test.com',
          turnstile_token: 'bad_token',
          _t: Date.now() - 5000
        },
        headers: { 'x-real-ip': '198.51.100.99' }
      });
      await orderHandler(invalidTokenCall.req, invalidTokenCall.res);
      const invalidRes = invalidTokenCall.getResult();
      if (invalidRes.statusCode !== 403) throw new Error('Expected 403 for invalid Turnstile token');

      // 16c. Valid token accepted by Cloudflare -> 200
      global.fetch = async (url) => {
        if (url.includes('turnstile')) {
          return {
            ok: true,
            json: async () => ({ success: true })
          };
        }
        return {
          ok: true,
          json: async () => ({ ok: true, result: { message_id: 2000 } })
        };
      };

      const validTokenCall = createMockReqRes({
        method: 'POST',
        body: {
          items: [{ id: 'RC', quantity: 1 }],
          name: 'Valid Token User',
          phone: '+998901234567',
          email: 'validtoken@test.com',
          turnstile_token: 'good_token',
          _t: Date.now() - 5000
        },
        headers: { 'x-real-ip': '198.51.100.99' }
      });
      await orderHandler(validTokenCall.req, validTokenCall.res);
      const validRes = validTokenCall.getResult();
      if (validRes.statusCode !== 200) throw new Error('Expected 200 for valid Turnstile token');

      console.log('Turnstile opt-in tests passed: missing token 400, invalid token 403, valid token 200.');
    } finally {
      delete process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
      global.fetch = originalFetch;
    }
  }

  console.log('\nALL 16 BACKEND SECURITY, CORS, ANTI-SPAM & SANITIZATION TESTS PASSED!');
}

runTests().catch(err => {
  console.error('Test suite failure:', err);
  process.exit(1);
});
