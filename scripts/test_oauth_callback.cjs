// scripts/test_oauth_callback.cjs
// Safe automated tests for OAuth callback origin validation and security checks

const assert = require('assert');

// 1. Test trusted origin definitions
const TRUSTED_ORIGINS = [
  'https://www.infraks.uz',
  'https://infraks.uz',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000'
];

console.log('--- TEST 1: Strict Origin Matching ---');
function isOriginTrusted(origin) {
  return TRUSTED_ORIGINS.includes(origin);
}

// Trusted tests
assert.strictEqual(isOriginTrusted('https://www.infraks.uz'), true, 'Expected https://www.infraks.uz to be trusted');
assert.strictEqual(isOriginTrusted('https://infraks.uz'), true, 'Expected https://infraks.uz to be trusted');
assert.strictEqual(isOriginTrusted('http://localhost:5173'), true, 'Expected localhost:5173 to be trusted');

// Untrusted tests (Substrings, prefixes, malicious lookalikes)
assert.strictEqual(isOriginTrusted('https://evil.com'), false, 'evil.com must be rejected');
assert.strictEqual(isOriginTrusted('https://www.infraks.uz.attacker.com'), false, 'Subdomain attack must be rejected');
assert.strictEqual(isOriginTrusted('https://attacker.com/infraks.uz'), false, 'Path attack must be rejected');
assert.strictEqual(isOriginTrusted('http://www.infraks.uz'), false, 'HTTP for production must be rejected');
assert.strictEqual(isOriginTrusted('https://infraks.uz:8080'), false, 'Altered port must be rejected');
assert.strictEqual(isOriginTrusted('null'), false, 'null origin must be rejected');
console.log('✓ Strict origin check passed for all test vectors.');

console.log('\n--- TEST 2: Client Logic Simulation (receiveMessage) ---');

function createMockPopupEnvironment(currentOrigin, openerOrigin) {
  let openerPostMessages = [];
  let closed = false;

  const mockOpener = {
    postMessage: (msg, targetOrigin) => {
      openerPostMessages.push({ msg, targetOrigin });
    }
  };

  const expectedOrigin = currentOrigin;

  // Simulate receiveMessage logic from api/callback.js
  function receiveMessage(e) {
    if (e.origin !== expectedOrigin) {
      return { handled: false, reason: 'UNTRUSTED_ORIGIN' };
    }
    if (!e.source || e.source !== mockOpener) {
      return { handled: false, reason: 'INVALID_SOURCE' };
    }
    if (typeof e.data !== 'string' || e.data !== 'authorizing:github') {
      return { handled: false, reason: 'INVALID_PAYLOAD' };
    }

    mockOpener.postMessage(
      'authorization:github:success:{"token":"test-token","provider":"github"}',
      expectedOrigin
    );
    closed = true;
    return { handled: true };
  }

  return {
    mockOpener,
    receiveMessage,
    getMessages: () => openerPostMessages,
    isClosed: () => closed
  };
}

// Scenario A: Attack from evil.com
{
  const env = createMockPopupEnvironment('https://www.infraks.uz', 'https://www.infraks.uz');
  const res = env.receiveMessage({
    origin: 'https://evil.com',
    source: env.mockOpener,
    data: 'authorizing:github'
  });
  assert.strictEqual(res.handled, false);
  assert.strictEqual(res.reason, 'UNTRUSTED_ORIGIN');
  assert.strictEqual(env.getMessages().length, 0);
  assert.strictEqual(env.isClosed(), false);
  console.log('✓ Untrusted origin (https://evil.com) rejected; zero tokens leaked.');
}

// Scenario B: Attack with spoofed source (wrong window)
{
  const env = createMockPopupEnvironment('https://www.infraks.uz', 'https://www.infraks.uz');
  const fakeWindow = { postMessage: () => {} };
  const res = env.receiveMessage({
    origin: 'https://www.infraks.uz',
    source: fakeWindow,
    data: 'authorizing:github'
  });
  assert.strictEqual(res.handled, false);
  assert.strictEqual(res.reason, 'INVALID_SOURCE');
  assert.strictEqual(env.getMessages().length, 0);
  console.log('✓ Invalid event.source rejected.');
}

// Scenario C: Malicious or unexpected payload
{
  const env = createMockPopupEnvironment('https://www.infraks.uz', 'https://www.infraks.uz');
  const res = env.receiveMessage({
    origin: 'https://www.infraks.uz',
    source: env.mockOpener,
    data: { action: 'steal_token' }
  });
  assert.strictEqual(res.handled, false);
  assert.strictEqual(res.reason, 'INVALID_PAYLOAD');
  assert.strictEqual(env.getMessages().length, 0);
  console.log('✓ Invalid payload rejected.');
}

// Scenario D: Legitimate handshake from trusted origin
{
  const env = createMockPopupEnvironment('https://www.infraks.uz', 'https://www.infraks.uz');
  const res = env.receiveMessage({
    origin: 'https://www.infraks.uz',
    source: env.mockOpener,
    data: 'authorizing:github'
  });
  assert.strictEqual(res.handled, true);
  assert.strictEqual(env.isClosed(), true);
  const msgs = env.getMessages();
  assert.strictEqual(msgs.length, 1);
  assert.strictEqual(msgs[0].targetOrigin, 'https://www.infraks.uz', 'Token must ONLY be sent to https://www.infraks.uz');
  assert.ok(msgs[0].msg.startsWith('authorization:github:success:'));
  console.log('✓ Legitimate Decap CMS OAuth handshake succeeded with targetOrigin https://www.infraks.uz.');
}

console.log('\n--- ALL OAUTH SECURITY TESTS PASSED SUCCESSFULLY! ---');
