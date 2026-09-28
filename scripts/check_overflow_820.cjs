const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'C:\\Users\\Ruslat\\.gemini\\antigravity-ide\\brain\\8c37f1ec-cf40-40f2-a030-8fea4a154ec5\\scratch\\.chrome-ovf-profile';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });
}

async function test() {
  const p = spawn(CHROME_PATH, ['--headless=new', '--remote-debugging-port=9229', '--user-data-dir=' + USER_DATA_DIR, 'about:blank']);
  await sleep(1500);
  const targets = await getJson('http://127.0.0.1:9229/json');
  const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
  let id = 1;
  const send = (method, params = {}) => new Promise(res => {
    const curId = id++;
    const handler = (m) => {
      const data = JSON.parse(m.data);
      if (data.id === curId) { ws.removeEventListener('message', handler); res(data.result); }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });
  await new Promise(r => ws.onopen = r);
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 820, height: 900, deviceScaleFactor: 1, mobile: true });
  await send('Page.navigate', { url: 'http://127.0.0.1:5173/steril' });
  await sleep(1500);

  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      const docW = document.documentElement.clientWidth;
      const scrollW = document.documentElement.scrollWidth;
      const overflowing = [];
      document.querySelectorAll('*').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.right > docW + 1) {
          overflowing.push({
            tag: el.tagName,
            cls: el.className,
            right: r.right,
            width: r.width,
            diff: r.right - docW
          });
        }
      });
      return { docW, scrollW, hasOverflow: scrollW > docW, overflowing: overflowing.slice(0, 10) };
    })()`,
    returnByValue: true
  });
  console.log('RESULT:', JSON.stringify(res.result.value, null, 2));
  ws.close();
  p.kill();
  if (fs.existsSync(USER_DATA_DIR)) {
    try { fs.rmSync(USER_DATA_DIR, { recursive: true, force: true }); } catch(e) {}
  }
}
test().catch(console.error);
