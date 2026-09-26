const fs = require('fs');
const path = require('path');

const icons = ['lamp.svg', 'hlopok.svg', 'gril.svg', 'steril.svg', 'plenka.svg', 'kraska.svg', 'sushka.svg'];

icons.forEach(name => {
  const p = path.join('./public/images/icons', name);
  const content = fs.readFileSync(p, 'utf8');
  const m = content.match(/data:image\/png;base64,([^"]+)/);
  if (m) {
    const buf = Buffer.from(m[1], 'base64');
    // Read PNG header for width & height (PNG stores width at offset 16-20, height at 20-24, big-endian)
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    console.log(name, 'PNG size:', buf.length, 'dimensions:', width + 'x' + height);
  }
});
