#!/usr/bin/env node
// build.js — Build Shinkansen extension for Chrome or Firefox
// Usage: node tools/build.js --target chrome|firefox [--outdir dist/]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(REPO_ROOT, 'shinkansen');

function parseArgs() {
  const args = process.argv.slice(2);
  const targetIdx = args.indexOf('--target');
  const outdirIdx = args.indexOf('--outdir');
  const target = targetIdx >= 0 ? args[targetIdx + 1] : null;
  const outdir = outdirIdx >= 0 ? args[outdirIdx + 1] : 'dist';
  if (!target || !['chrome', 'firefox'].includes(target)) {
    console.error('Usage: node tools/build.js --target chrome|firefox [--outdir dist/]');
    process.exit(1);
  }
  return { target, outdir };
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function getVersion() {
  const manifest = JSON.parse(fs.readFileSync(path.join(SRC_DIR, 'manifest.json'), 'utf8'));
  return manifest.version;
}

function buildChrome({ outdir }) {
  const version = getVersion();
  const buildDir = path.join(REPO_ROOT, outdir, 'chrome', 'shinkansen');
  const zipPath = path.join(REPO_ROOT, outdir, `shinkansen-v${version}.zip`);

  console.log(`[chrome] Copying to ${buildDir}...`);
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true });
  }
  copyDir(SRC_DIR, buildDir);

  // Clean up firefox artifacts from chrome build
  const firefoxArtifacts = [
    path.join(buildDir, 'manifest.firefox.json'),
    path.join(buildDir, 'background-firefox.js'),
  ];
  for (const artifact of firefoxArtifacts) {
    if (fs.existsSync(artifact)) {
      fs.unlinkSync(artifact);
    }
  }

  console.log(`[chrome] Zipping to ${zipPath}...`);
  execSync(`cd "${path.dirname(buildDir)}" && zip -r "${zipPath}" shinkansen/`, { stdio: 'inherit' });
  console.log(`[chrome] Done: ${zipPath}`);
}

function buildFirefox({ outdir }) {
  const version = getVersion();
  const buildDir = path.join(REPO_ROOT, outdir, 'firefox', 'shinkansen');
  const zipPath = path.join(REPO_ROOT, outdir, `shinkansen-v${version}-firefox.zip`);

  console.log(`[firefox] Copying to ${buildDir}...`);
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true });
  }
  copyDir(SRC_DIR, buildDir);

  // Bundle background.js into background-firefox.js
  console.log('[firefox] Bundling background.js...');
  const bundleOut = path.join(buildDir, 'background-firefox.js');
  execSync(
    `npx esbuild "${path.join(SRC_DIR, 'background.js')}" --bundle --outfile="${bundleOut}" --format=iife --platform=browser`,
    { stdio: 'inherit', cwd: REPO_ROOT }
  );

  // Swap manifest to firefox version
  const firefoxManifest = path.join(SRC_DIR, 'manifest.firefox.json');
  const manifestDest = path.join(buildDir, 'manifest.json');
  fs.copyFileSync(firefoxManifest, manifestDest);

  // Neutralize UI copy for Firefox (build-time replacement, never touches source)
  const optionsHtml = path.join(buildDir, 'options', 'options.html');
  if (fs.existsSync(optionsHtml)) {
    let html = fs.readFileSync(optionsHtml, 'utf8');
    html = html.replace(
      '>chrome://extensions/shortcuts<',
      '>瀏覽器擴充功能快捷鍵設定<'
    );
    fs.writeFileSync(optionsHtml, html);
  }
  const privacyHtml = path.join(buildDir, 'privacy-policy.html');
  if (fs.existsSync(privacyHtml)) {
    let html = fs.readFileSync(privacyHtml, 'utf8');
    html = html.replace(/<code>chrome\.storage\.local<\/code>/g, '<code>browser.storage.local</code>');
    html = html.replace(/<code>chrome\.storage\.sync<\/code>/g, '<code>browser.storage.sync</code>');
    html = html.replace(/Chrome 的內建同步機制/g, '瀏覽器內建同步機制');
    fs.writeFileSync(privacyHtml, html);
  }

  // Clean up chrome-only artifacts from firefox build
  const chromeArtifacts = [
    path.join(buildDir, 'manifest.firefox.json'),
    path.join(buildDir, 'background.js'),
  ];
  for (const artifact of chromeArtifacts) {
    if (fs.existsSync(artifact)) {
      fs.unlinkSync(artifact);
    }
  }

  console.log(`[firefox] Zipping to ${zipPath}...`);
  execSync(`cd "${path.dirname(buildDir)}" && zip -r "${zipPath}" shinkansen/`, { stdio: 'inherit' });
  console.log(`[firefox] Done: ${zipPath}`);
}

const { target, outdir } = parseArgs();
console.log(`Building target: ${target}\n`);

if (target === 'chrome') {
  buildChrome({ outdir });
} else {
  buildFirefox({ outdir });
}
