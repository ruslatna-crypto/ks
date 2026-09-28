const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'C:\\Users\\Ruslat\\.gemini\\antigravity-ide\\brain\\8c37f1ec-cf40-40f2-a030-8fea4a154ec5\\scratch\\.chrome-verify-profile';

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

async function verifyFixes() {
  console.log('Launching headless Chrome to verify fixes...');
  const p = spawn(CHROME_PATH, ['--headless=new', '--remote-debugging-port=9227', '--user-data-dir=' + USER_DATA_DIR, 'about:blank']);
  await sleep(1500);
  const targets = await getJson('http://127.0.0.1:9227/json');
  const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
  let id = 1;
  const send = (method, params = {}) => new Promise(res => {
    const curId = id++;
    const handler = (m) => {
      const data = JSON.parse(m.data);
      if (data.id === curId) {
        ws.removeEventListener('message', handler);
        res(data.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  await new Promise(r => ws.onopen = r);
  await send('Page.enable');
  await send('Runtime.enable');

  const evalJs = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r && r.exceptionDetails) {
      console.error('JS Exception:', r.exceptionDetails.text, r.exceptionDetails.exception?.description);
    }
    return r ? r.result?.value : null;
  };

  async function waitForSelector(sel, timeoutMs = 8000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      const found = await evalJs(`!!document.querySelector('${sel}')`);
      if (found) return true;
      await sleep(250);
    }
    throw new Error('Timeout waiting for selector: ' + sel);
  }

  // 1. Check RU Page
  console.log('Checking RU /steril ...');
  await send('Page.navigate', { url: 'http://127.0.0.1:5173/steril' });
  await waitForSelector('.steril-card-featured');
  await sleep(500);

  const ruData = await evalJs(`(() => {
    const title = document.title;
    const h1 = document.querySelector('h1')?.innerText.trim();
    const hasHeaderBadge = !!document.querySelector('.steril-header-badge');
    const compBorder = window.getComputedStyle(document.querySelector('.steril-comparison-card')).borderLeftColor;
    const compIconColor = window.getComputedStyle(document.querySelector('.steril-comp-icon')).color;
    
    // Gallery layout check
    const galleryLayout = document.querySelector('.steril-gallery-layout');
    const featuredCard = document.querySelector('.steril-card-featured');
    const subgrid = document.querySelector('.steril-gallery-subgrid');
    const subgridCards = document.querySelectorAll('.steril-gallery-subgrid .steril-gallery-card');
    
    // Equipment specs check
    const hasSpecList = !!document.querySelector('.steril-equip-details, .steril-equip-spec');
    const equipTitle = document.querySelector('.steril-equipment-title')?.innerText.trim();

    return {
      title,
      h1,
      hasHeaderBadge,
      compBorder,
      compIconColor,
      hasGalleryLayout: !!galleryLayout,
      hasFeaturedCard: !!featuredCard,
      subgridCardsCount: subgridCards.length,
      hasSpecList,
      equipTitle
    };
  })()`);
  console.log('RU Verification:', ruData);

  // 2. Check Lightbox on all 5 images
  console.log('\nChecking Lightbox across all 5 images...');
  const lightboxChecks = [];
  
  // Click featured card (index 0)
  await evalJs(`document.querySelector('.steril-card-featured').click()`);
  await sleep(400);
  let lbState = await evalJs(`(() => {
    const o = document.querySelector('.lightbox-overlay');
    return {
      open: !!o,
      src: o?.querySelector('.lightbox-main-img')?.getAttribute('src'),
      cap: o?.querySelector('.lightbox-caption-text')?.innerText.trim()
    };
  })()`);
  lightboxChecks.push(lbState);

  // Click Next 4 times
  for (let i = 1; i <= 4; i++) {
    await evalJs(`document.querySelector('.lightbox-nav-btn.next')?.click()`);
    await sleep(300);
    lbState = await evalJs(`(() => {
      const o = document.querySelector('.lightbox-overlay');
      return {
        open: !!o,
        src: o?.querySelector('.lightbox-main-img')?.getAttribute('src'),
        cap: o?.querySelector('.lightbox-caption-text')?.innerText.trim()
      };
    })()`);
    lightboxChecks.push(lbState);
  }

  // Close with ESC
  await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', windowsVirtualKeyCode: 27 });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', windowsVirtualKeyCode: 27 });
  await sleep(300);
  const isClosed = await evalJs(`!document.querySelector('.lightbox-overlay')`);
  console.log('Lightbox 5 cards sequence:', lightboxChecks);
  console.log('Lightbox closed on ESC:', isClosed);

  // 3. Check EN Page
  console.log('\nChecking EN /en/steril ...');
  await send('Page.navigate', { url: 'http://127.0.0.1:5173/en/steril' });
  await waitForSelector('.steril-card-featured');
  await sleep(400);

  const enData = await evalJs(`(() => {
    return {
      title: document.title,
      h1: document.querySelector('h1')?.innerText.trim(),
      featuredCap: document.querySelector('.steril-card-featured .steril-gallery-caption')?.innerText.trim(),
      subgridFirstCap: document.querySelector('.steril-gallery-subgrid .steril-gallery-caption')?.innerText.trim(),
      equipTitle: document.querySelector('.steril-equipment-title')?.innerText.trim()
    };
  })()`);
  console.log('EN Verification:', enData);

  // 4. Responsive Viewports Check
  console.log('\nChecking Responsive across all 14 breakpoints...');
  const breakpoints = [320, 360, 375, 390, 414, 480, 768, 820, 1024, 1280, 1440, 1600, 1920, 2560];
  await send('Page.navigate', { url: 'http://127.0.0.1:5173/steril' });
  await waitForSelector('.steril-card-featured');
  await sleep(400);

  const responsiveResults = [];
  for (const w of breakpoints) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: w <= 768 });
    await sleep(300);

    const bp = await evalJs(`(() => {
      const scrollW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const overflow = scrollW > clientW;
      
      const pills = document.querySelectorAll('.steril-metric-pill');
      let maxPillW = 0;
      pills.forEach(p => { maxPillW = Math.max(maxPillW, p.offsetWidth); });

      const layout = document.querySelector('.steril-gallery-layout');
      const layoutCols = layout ? window.getComputedStyle(layout).gridTemplateColumns.split(' ').length : 0;
      const subgrid = document.querySelector('.steril-gallery-subgrid');
      const subgridCols = subgrid ? window.getComputedStyle(subgrid).gridTemplateColumns.split(' ').length : 0;

      return {
        width: window.innerWidth,
        scrollW,
        clientW,
        overflow,
        maxPillW,
        layoutCols,
        subgridCols
      };
    })()`);
    responsiveResults.push(bp);
    console.log('Width ' + w + 'px -> Overflow: ' + bp.overflow + ', Layout cols: ' + bp.layoutCols + ', Subgrid cols: ' + bp.subgridCols + ', Max pill w: ' + bp.maxPillW + 'px');
  }

  ws.close();
  p.kill();

  if (fs.existsSync(USER_DATA_DIR)) {
    try { fs.rmSync(USER_DATA_DIR, { recursive: true, force: true }); } catch(e) {}
  }

  fs.writeFileSync('scripts/fixes_verified_output.json', JSON.stringify({ ruData, enData, lightboxChecks, isClosed, responsiveResults }, null, 2), 'utf8');
  console.log('\nFixes verification complete!');
}

verifyFixes().catch(console.error);
