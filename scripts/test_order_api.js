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

  console.log('\n--- TEST 2: Reject Disallowed CORS Origin (403) ---');
  {
    const { req, res, getResult } = createMockReqRes({
      method: 'POST',
      headers: { origin: 'https://malicious-attacker.com' }
    });
    await orderHandler(req, res);
    const { statusCode, responseData } = getResult();
    console.log('Status:', statusCode, 'Result:', responseData);
    if (statusCode !== 403) throw new Error('Expected 403 for disallowed origin');
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

  console.log('\nALL 10 BACKEND SECURITY & VALIDATION TESTS PASSED!');
}

runTests().catch(err => {
  console.error('Test suite failure:', err);
  process.exit(1);
});
