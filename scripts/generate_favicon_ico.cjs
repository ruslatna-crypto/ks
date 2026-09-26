const fs = require('fs');
const path = require('path');

// Generate a clean 32x32 uncompressed BMP/ICO or standard ICO file for favicon.ico
function generateIco() {
  const width = 32;
  const height = 32;
  
  // Create ICO header (6 bytes)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(1, 4); // 1 image

  // BMP InfoHeader (40 bytes)
  const bih = Buffer.alloc(40);
  bih.writeUInt32LE(40, 0); // size of header
  bih.writeInt32LE(width, 4); // width
  bih.writeInt32LE(height * 2, 8); // height * 2 for ICO BMP (xor + and masks)
  bih.writeUInt16LE(1, 12); // planes
  bih.writeUInt16LE(32, 14); // 32 bpp
  bih.writeUInt32LE(0, 16); // compression: BI_RGB
  bih.writeUInt32LE(width * height * 4, 20); // image size
  bih.writeInt32LE(0, 24); // x resolution
  bih.writeInt32LE(0, 28); // y resolution
  bih.writeUInt32LE(0, 32); // colors used
  bih.writeUInt32LE(0, 36); // important colors

  // Pixel data (BGRA, bottom-up)
  const pixelData = Buffer.alloc(width * height * 4);
  const cx = width / 2;
  const cy = height / 2;
  const rOuter = 14;
  const rInner = 2;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const dx = x - cx;
      const dy = (height - 1 - y) - cy; // bottom-up
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= rOuter && dist >= rInner) {
        if (Math.abs(dx) <= 1) {
          // Central dark divider bar
          pixelData[idx] = 0x1e;     // B
          pixelData[idx + 1] = 0x1e; // G
          pixelData[idx + 2] = 0x20; // R
          pixelData[idx + 3] = 0xff; // A
        } else if (dx < 0) {
          // Left blue resonator (#3E4095)
          pixelData[idx] = 0x95;     // B
          pixelData[idx + 1] = 0x40; // G
          pixelData[idx + 2] = 0x3e; // R
          pixelData[idx + 3] = 0xff; // A
        } else {
          // Right red resonator (#ED3237)
          pixelData[idx] = 0x37;     // B
          pixelData[idx + 1] = 0x32; // G
          pixelData[idx + 2] = 0xed; // R
          pixelData[idx + 3] = 0xff; // A
        }
      } else {
        // Transparent
        pixelData[idx] = 0;
        pixelData[idx + 1] = 0;
        pixelData[idx + 2] = 0;
        pixelData[idx + 3] = 0;
      }
    }
  }

  // 1-bit AND mask for transparency (32 * 32 / 8 = 128 bytes)
  const andMask = Buffer.alloc((width * height) / 8);

  const imageBuffer = Buffer.concat([bih, pixelData, andMask]);

  // Directory entry (16 bytes)
  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(width, 0); // width
  dirEntry.writeUInt8(height, 1); // height
  dirEntry.writeUInt8(0, 2); // color palette
  dirEntry.writeUInt8(0, 3); // reserved
  dirEntry.writeUInt16LE(1, 4); // color planes
  dirEntry.writeUInt16LE(32, 6); // bits per pixel
  dirEntry.writeUInt32LE(imageBuffer.length, 8); // size of image data
  dirEntry.writeUInt32LE(6 + 16, 12); // offset to image data

  const icoBuffer = Buffer.concat([header, dirEntry, imageBuffer]);
  const outPath = path.resolve(__dirname, '../public/favicon.ico');
  fs.writeFileSync(outPath, icoBuffer);
  console.log(`Successfully generated favicon.ico at ${outPath} (${icoBuffer.length} bytes)`);
}

generateIco();
