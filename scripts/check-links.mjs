// Checks the production build in dist/:
// - every internal href/src lives under the base path and resolves to a built file,
// - every #fragment points at an element id on the target page,
// - the download buttons point at the expected GitHub Releases URLs.
import fs from 'node:fs';
import path from 'node:path';

const BASE = '/extendpad-site/';
const DIST = path.resolve('dist');
const EXPECTED_DOWNLOADS = [
  'https://github.com/Huy-8bit/ExtendPad/releases/latest/download/ExtendPad.dmg',
  'https://github.com/Huy-8bit/ExtendPad/releases/latest/download/ExtendPad.apk',
];

const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) pages.push(p);
  }
})(DIST);

const idsOf = new Map();
const ids = (file) => {
  if (!idsOf.has(file)) idsOf.set(file, new Set([...fs.readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return idsOf.get(file);
};
const resolve = (pathname) => {
  const rel = decodeURIComponent(pathname.slice(BASE.length));
  const candidates = [path.join(DIST, rel), path.join(DIST, rel, 'index.html')];
  return candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile());
};

const errors = [];
let checked = 0;
let downloadsFound = new Set();
for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const pageUrl = '/' + path.relative(DIST, page).replace(/index\.html$/, '').replace(/\\/g, '/');
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const ref = m[1];
    if (/^(https?:|mailto:|data:)/.test(ref)) {
      if (ref.includes('/releases/latest/download/')) downloadsFound.add(ref);
      continue;
    }
    checked++;
    const [p, frag] = ref.split('#');
    let target = page;
    if (p) {
      if (!p.startsWith(BASE)) {
        errors.push(`${pageUrl}: "${ref}" is not under ${BASE}`);
        continue;
      }
      target = resolve(p);
      if (!target) {
        errors.push(`${pageUrl}: "${ref}" does not resolve to a built file`);
        continue;
      }
    }
    if (frag && target.endsWith('.html') && !ids(target).has(frag)) errors.push(`${pageUrl}: "${ref}" — no element with id="${frag}"`);
  }
}
for (const d of EXPECTED_DOWNLOADS) if (!downloadsFound.has(d)) errors.push(`download link missing: ${d}`);
for (const d of downloadsFound) if (!EXPECTED_DOWNLOADS.includes(d)) errors.push(`unexpected download link: ${d}`);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Checked ${pages.length} page(s), ${checked} internal reference(s); all resolve under ${BASE}. ✓`);
console.log(`Download links: ${[...downloadsFound].join(', ')} ✓`);
