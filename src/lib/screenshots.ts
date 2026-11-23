// Real photos/screenshots in public/screenshots/ (read at build time). Optional alt text lives in
// public/screenshots/captions.json as { "file.jpg": "Alt text" }; otherwise the file name is used.
import fs from 'node:fs';
import path from 'node:path';
import { url } from '../config';

export type Screenshot = { src: string; alt: string };

export function getScreenshots(): Screenshot[] {
  const dir = path.join(process.cwd(), 'public', 'screenshots');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f)).sort();
  const captionsFile = path.join(dir, 'captions.json');
  const captions: Record<string, string> = fs.existsSync(captionsFile) ? JSON.parse(fs.readFileSync(captionsFile, 'utf8')) : {};
  const human = (f: string) => {
    const s = f.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim();
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  return files.map((f) => ({ src: url(`/screenshots/${f}`), alt: captions[f] ?? human(f) }));
}
