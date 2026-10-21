// scripts/test_clinical_sanitizer.cjs
const assert = require('assert');
const fs = require('fs');

function sanitizeClinicalHtml(html) {
  if (!html || typeof html !== 'string') return '';
  return html
    .replace(/<\s*(script|iframe|object|embed|applet|form|input|button|textarea|style|link|meta)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
    .replace(/<\s*(script|iframe|object|embed|applet|form|input|button|textarea|style|link|meta)\b[^>]*>/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src)\s*=\s*(["'])\s*(javascript|vbscript|data):[\s\S]*?\2/gi, '$1="#blocked"')
    .replace(/(href|src)\s*=\s*(javascript|vbscript|data):[^\s>]*/gi, '$1="#blocked"');
}

// 1. Test attack vectors
const attacks = [
  { in: '<script>alert(1)</script>Safe Text', out: 'Safe Text' },
  { in: '<SCRIPT SRC="http://evil.com/xss.js"></SCRIPT>Safe Text', out: 'Safe Text' },
  { in: '<iframe src="http://evil.com"></iframe>Safe Text', out: 'Safe Text' },
  { in: '<div onclick="steal()">Click</div>', out: '<div>Click</div>' },
  { in: '<img src=x onerror=alert(1)>', out: '<img src=x>' },
  { in: '<a href="javascript:alert(1)">Link</a>', out: '<a href="#blocked">Link</a>' }
];

for (const att of attacks) {
  const result = sanitizeClinicalHtml(att.in);
  assert.strictEqual(result, att.out, `Failed on ${att.in}`);
}
console.log('✓ All attack vectors correctly sanitized.');

// 2. Test that existing clinical cases data is 100% untouched
const content = fs.readFileSync('src/data/clinicalCases/clinicalCasesData.js', 'utf8');
const ruMatches = [...content.matchAll(/"contentRu":\s*"((?:[^"\\]|\\.)*)"/g)].map(m => JSON.parse('"' + m[1] + '"'));
const enMatches = [...content.matchAll(/"contentEn":\s*"((?:[^"\\]|\\.)*)"/g)].map(m => JSON.parse('"' + m[1] + '"'));

let ruDiff = 0;
for (const s of ruMatches) {
  if (sanitizeClinicalHtml(s) !== s) ruDiff++;
}
let enDiff = 0;
for (const s of enMatches) {
  if (sanitizeClinicalHtml(s) !== s) enDiff++;
}

console.log(`Total RU cases: ${ruMatches.length}, Altered: ${ruDiff}`);
console.log(`Total EN cases: ${enMatches.length}, Altered: ${enDiff}`);

assert.strictEqual(ruDiff, 0, 'Zero legitimate RU clinical cases should be altered');
assert.strictEqual(enDiff, 0, 'Zero legitimate EN clinical cases should be altered');

console.log('✓ 100% of formatting, tables, lists, and layout preserved intact!');
