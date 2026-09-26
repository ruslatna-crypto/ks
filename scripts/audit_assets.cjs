const fs = require('fs');
const path = require('path');

const icons = ['lamp.svg', 'hlopok.svg', 'gril.svg', 'steril.svg', 'plenka.svg', 'kraska.svg', 'sushka.svg'];

icons.forEach(name => {
  const p = path.join('./public/images/icons', name);
  if (fs.existsSync(p)) {
    const stat = fs.statSync(p);
    const content = fs.readFileSync(p, 'utf8');
    const isBase64 = content.includes('data:image/');
    const mimeMatch = content.match(/data:image\/([a-zA-Z0-9_\-+]+);base64/);
    console.log(name, 'Size:', (stat.size / 1024).toFixed(1) + ' KB', 'Base64:', isBase64, 'Mime:', mimeMatch ? mimeMatch[1] : 'vector');
  }
});

// Also check kraska/20473.svg and medicina/ris7rus.svg
['./public/images/kraska/20473.svg', './public/images/medicina/ris7rus.svg'].forEach(p => {
  if (fs.existsSync(p)) {
    const stat = fs.statSync(p);
    const content = fs.readFileSync(p, 'utf8');
    const isBase64 = content.includes('data:image/');
    const mimeMatch = content.match(/data:image\/([a-zA-Z0-9_\-+]+);base64/);
    console.log(path.basename(p), 'Size:', (stat.size / 1024).toFixed(1) + ' KB', 'Base64:', isBase64, 'Mime:', mimeMatch ? mimeMatch[1] : 'vector');
  }
});
