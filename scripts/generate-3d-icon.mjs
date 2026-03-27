import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const inputImage = 'C:/Users/Arpit PATEL/AppData/Roaming/Code/User/workspaceStorage/vscode-chat-images/image-1774603490447.png';
const outputImage = path.resolve('public/profile-3d-icon.png');

async function make3dIcon() {
  const source = await sharp(inputImage)
    .resize(440, 440, {
      fit: 'cover',
      position: 'centre',
    })
    .toBuffer();

  const photoMask = Buffer.from(`
    <svg width="440" height="440" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="440" height="440" rx="90" ry="90" fill="white"/>
    </svg>
  `);

  const photo = await sharp(source)
    .composite([{ input: photoMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const backgroundSvg = Buffer.from(`
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#8fd3e3"/>
          <stop offset="100%" stop-color="#5fa8b9"/>
        </linearGradient>
        <radialGradient id="shine" cx="0.2" cy="0.12" r="0.9">
          <stop offset="0%" stop-color="rgba(255,255,255,0.65)"/>
          <stop offset="70%" stop-color="rgba(255,255,255,0.08)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="512" height="512" rx="110" fill="url(#bg)"/>
      <rect x="0" y="0" width="512" height="512" rx="110" fill="url(#shine)"/>
    </svg>
  `);

  const depth1 = Buffer.from('<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="58" width="432" height="432" rx="92" fill="#2f5360" opacity="0.24"/></svg>');
  const depth2 = Buffer.from('<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="50" width="432" height="432" rx="92" fill="#3f6d7b" opacity="0.35"/></svg>');
  const frame = Buffer.from(`
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="frameGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#d7f4fb"/>
          <stop offset="100%" stop-color="#98d5e3"/>
        </linearGradient>
      </defs>
      <rect x="32" y="24" width="448" height="448" rx="96" fill="url(#frameGrad)"/>
      <rect x="32" y="24" width="448" height="448" rx="96" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="3"/>
    </svg>
  `);

  const gloss = Buffer.from(`
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(255,255,255,0.38)"/>
          <stop offset="45%" stop-color="rgba(255,255,255,0.08)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>
      </defs>
      <path d="M64 86 C140 30, 372 16, 452 76 L452 196 C390 164, 148 176, 64 226 Z" fill="url(#g)"/>
    </svg>
  `);

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: backgroundSvg },
      { input: depth1 },
      { input: depth2 },
      { input: frame },
      { input: photo, left: 36, top: 28 },
      { input: gloss },
    ])
    .png({ compressionLevel: 9 })
    .toFile(outputImage);

  await fs.access(outputImage);
  console.log(`3D icon created: ${outputImage}`);
}

make3dIcon().catch((error) => {
  console.error('Failed to create 3D icon:', error);
  process.exit(1);
});
