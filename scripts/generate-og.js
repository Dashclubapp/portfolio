#!/usr/bin/env node
// Script to generate og-preview.jpg for DashClub
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <!-- Background -->
  <rect width="1200" height="630" fill="#0D1F3C"/>

  <!-- Decorative geometric shapes (subtle depth) -->
  <circle cx="1080" cy="-60" r="280" fill="#152E55" opacity="0.55"/>
  <circle cx="120" cy="690" r="220" fill="#152E55" opacity="0.45"/>
  <rect x="860" y="350" width="320" height="320" rx="24" fill="#152E55" opacity="0.25" transform="rotate(-18 1020 510)"/>
  <rect x="-80" y="80" width="220" height="220" rx="24" fill="#152E55" opacity="0.25" transform="rotate(22 30 190)"/>
  <circle cx="600" cy="630" r="340" fill="#152E55" opacity="0.18"/>

  <!-- Subtle horizontal separator line -->
  <line x1="80" y1="498" x2="1120" y2="498" stroke="#C9A84C" stroke-width="1" opacity="0.25"/>

  <!-- ====== LOGO DASHCLUB (centered, 200x130px) ====== -->
  <g transform="translate(500, 45) scale(0.5)">
    <!-- Logo background (same color as BG, just defines logo area) -->
    <rect width="400" height="260" fill="#0D1F3C" rx="16"/>

    <!-- Flag pole -->
    <line x1="192" y1="52" x2="192" y2="108" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>

    <!-- Checker flag row 1 -->
    <rect x="192" y="12" width="14" height="10" fill="#FFFFFF"/>
    <rect x="206" y="12" width="14" height="10" fill="#0D1F3C"/>
    <rect x="220" y="12" width="14" height="10" fill="#FFFFFF"/>
    <rect x="234" y="12" width="14" height="10" fill="#0D1F3C"/>
    <!-- row 2 -->
    <rect x="192" y="22" width="14" height="10" fill="#0D1F3C"/>
    <rect x="206" y="22" width="14" height="10" fill="#FFFFFF"/>
    <rect x="220" y="22" width="14" height="10" fill="#0D1F3C"/>
    <rect x="234" y="22" width="14" height="10" fill="#FFFFFF"/>
    <!-- row 3 -->
    <rect x="192" y="32" width="14" height="10" fill="#FFFFFF"/>
    <rect x="206" y="32" width="14" height="10" fill="#0D1F3C"/>
    <rect x="220" y="32" width="14" height="10" fill="#FFFFFF"/>
    <rect x="234" y="32" width="14" height="10" fill="#0D1F3C"/>
    <!-- row 4 -->
    <rect x="192" y="42" width="14" height="10" fill="#0D1F3C"/>
    <rect x="206" y="42" width="14" height="10" fill="#FFFFFF"/>
    <rect x="220" y="42" width="14" height="10" fill="#0D1F3C"/>
    <rect x="234" y="42" width="14" height="10" fill="#FFFFFF"/>
    <!-- Flag gold border -->
    <rect x="192" y="12" width="56" height="40" fill="none" stroke="#C9A84C" stroke-width="2" rx="1"/>

    <!-- Podium step 3 (left) -->
    <rect x="90" y="152" width="80" height="68" rx="6" fill="#1E3F6E"/>
    <text x="130" y="194" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#8A96A8">3</text>

    <!-- Podium step 1 (center, gold) -->
    <rect x="152" y="108" width="82" height="112" rx="6" fill="#C9A84C"/>
    <rect x="152" y="108" width="82" height="20" rx="6" fill="#E2C170" opacity="0.35"/>
    <text x="193" y="172" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#0D1F3C">1</text>

    <!-- Podium step 2 (right) -->
    <rect x="216" y="132" width="80" height="88" rx="6" fill="#1E3F6E"/>
    <text x="256" y="182" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#8A96A8">2</text>

    <!-- Finish line dashed -->
    <line x1="82" y1="224" x2="304" y2="224" stroke="#C9A84C" stroke-width="1.5" stroke-dasharray="8 5" opacity="0.5"/>
  </g>

  <!-- ====== TITLE: DashClub ====== -->
  <text x="600" y="340"
    text-anchor="middle"
    font-family="Arial Black, Arial, sans-serif"
    font-size="82"
    font-weight="900"
    fill="#FFFFFF"
    letter-spacing="-1">DashClub</text>

  <!-- ====== SUBTITLE ====== -->
  <text x="600" y="406"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="30"
    font-weight="400"
    fill="#FFFFFF"
    opacity="0.88">Le site web professionnel pour votre club sportif</text>

  <!-- ====== TAGLINE (gold) ====== -->
  <text x="600" y="565"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="23"
    font-weight="500"
    fill="#C9A84C">A partir de 19&#8364;/mois &#xB7; Zero commission &#xB7; Paiements Stripe integres</text>
</svg>`;

const svgPath = path.join(__dirname, '../public/og-preview.svg');
const jpgPath = path.join(__dirname, '../public/og-preview.jpg');
const pngPath = path.join(__dirname, '../public/og-image.png');

fs.writeFileSync(svgPath, svgContent, 'utf8');
console.log('SVG written to', svgPath);

// Convert SVG to JPG using ImageMagick
try {
  execSync(`convert -background "#0D1F3C" -size 1200x630 "${svgPath}" -flatten -resize 1200x630! -quality 92 "${jpgPath}"`, {
    stdio: 'inherit'
  });
  console.log('JPG generated at', jpgPath);
  // Also replace og-image.png (used by meta tags) with the same design
  execSync(`convert -background "#0D1F3C" -size 1200x630 "${svgPath}" -flatten -resize 1200x630! "${pngPath}"`, {
    stdio: 'inherit'
  });
  console.log('PNG generated at', pngPath);
  // Clean up temp SVG
  fs.unlinkSync(svgPath);
  console.log('Temp SVG removed');
} catch (err) {
  console.error('Conversion failed:', err.message);
  process.exit(1);
}
