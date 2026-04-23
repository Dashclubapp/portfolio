/**
 * scripts/capture-screenshots.ts
 *
 * Captures 4 screenshots of the DashClub demo for the hero section:
 *   - Site public  × desktop (1280×800) + mobile (390×844)
 *   - Back-office  × desktop (1280×800) + mobile (390×844)
 *
 * Usage: npm run screenshots
 */

import { chromium } from 'playwright';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { config } from 'dotenv';

config({ path: path.resolve('.env.local') });

// ── Config ────────────────────────────────────────────────────────────────────

const OUT_DIR  = path.resolve('public/hero');
// Site public : club-starter déployé sur demo.dashclub.app
const SITE_URL = 'https://demo.dashclub.app';
// Back-office : démo Portfolio (dashclub.app/demo/admin), pas de login requis
const BACK_URL = 'https://dashclub.app/demo/admin';

const VIEWPORTS = {
  desktop: { width: 1280, height: 800 },
  mobile:  { width: 390,  height: 844 },
} as const;

// ── Sensitive-data masking ────────────────────────────────────────────────────

// Applied to demo.dashclub.app (club-starter public site)
const SITE_MASK_SCRIPT = /* js */ `
  (() => {
    // "Site propulsé par DashClub" badge — le data-cta est sur la div racine du badge
    const badge = document.querySelector('div[data-cta="demo-badge"]');
    if (badge) badge.style.display = 'none';
  })();
`;

// Applied to dashclub.app/demo/admin (Portfolio back-office demo)
const BACK_MASK_SCRIPT = /* js */ `
  (() => {
    // Bandeau vert DemoBanner Portfolio — ciblé par zIndex 9999 + position fixed
    document.querySelectorAll('div').forEach(el => {
      if (el.style.zIndex === '9999' && el.style.position === 'fixed') {
        el.style.display = 'none';
      }
    });
    // Bandeau sombre "Mode démo DashClub" dans le layout admin
    // Longueur < 150 pour éviter de masquer les divs parents qui contiennent tout le contenu
    document.querySelectorAll('div').forEach(el => {
      const text = (el.textContent ?? '').trim();
      if (text.startsWith('🎯 Mode démo') && text.length < 150 && !el.querySelector('main, aside, nav, table')) {
        el.style.display = 'none';
      }
    });
  })();
`;

// ── Helpers ───────────────────────────────────────────────────────────────────

async function saveOptimized(buffer: Buffer, filename: string): Promise<void> {
  const outPath = path.join(OUT_DIR, filename);
  try {
    await sharp(buffer)
      .png({ compressionLevel: 9 })
      .toFile(outPath);
  } catch {
    await fs.writeFile(outPath, buffer);
  }
  const { size } = await fs.stat(outPath);
  const kb = Math.round(size / 1024);
  const warn = kb > 200 ? '  ⚠️  > 200 KB' : '';
  console.log(`    ✓ ${filename} — ${kb} KB${warn}`);
}

async function capturePublicSite(browser: Awaited<ReturnType<typeof chromium.launch>>) {
  console.log('\n  Site public');
  for (const [label, vp] of Object.entries(VIEWPORTS) as [string, { width: number; height: number }][]) {
    const ctx = await browser.newContext({ viewport: vp });
    const page = await ctx.newPage();
    page.setDefaultTimeout(30_000);

    await page.goto(SITE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    await page.evaluate(SITE_MASK_SCRIPT);

    const buffer = await page.screenshot({ type: 'png' });
    await saveOptimized(Buffer.from(buffer), `screenshot-site-${label}.png`);
    await ctx.close();
  }
}

async function captureBackoffice(browser: Awaited<ReturnType<typeof chromium.launch>>) {
  console.log('\n  Back-office (démo publique — pas de login requis)');

  // Desktop
  const desktopCtx = await browser.newContext({ viewport: VIEWPORTS.desktop });
  const desktopPage = await desktopCtx.newPage();
  desktopPage.setDefaultTimeout(30_000);
  await desktopPage.goto(BACK_URL, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(2500);
  await desktopPage.evaluate(BACK_MASK_SCRIPT);
  const desktopBuf = await desktopPage.screenshot({ type: 'png' });
  await saveOptimized(Buffer.from(desktopBuf), 'screenshot-backoffice-desktop.png');
  await desktopCtx.close();

  // Mobile
  const mobileCtx = await browser.newContext({ viewport: VIEWPORTS.mobile });
  const mobilePage = await mobileCtx.newPage();
  mobilePage.setDefaultTimeout(30_000);
  await mobilePage.goto(BACK_URL, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(2500);
  await mobilePage.evaluate(BACK_MASK_SCRIPT);
  const mobileBuf = await mobilePage.screenshot({ type: 'png' });
  await saveOptimized(Buffer.from(mobileBuf), 'screenshot-backoffice-mobile.png');
  await mobileCtx.close();
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('📸 DashClub — capture screenshots hero');
  console.log(`   Output : ${OUT_DIR}\n`);

  await fs.mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  try {
    await capturePublicSite(browser);
    await captureBackoffice(browser);
    console.log('\n✅ 4 screenshots enregistrés dans public/hero/');
  } catch (err) {
    console.error('\n❌ Erreur :', (err as Error).message);
    throw err;
  } finally {
    await browser.close();
  }
}

main().catch(() => process.exit(1));
