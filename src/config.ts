// Every external URL on the site lives here, so it can be changed in one place.

export const LINKS = {
  repo: 'https://github.com/Huy-8bit/ExtendPad',
  releases: 'https://github.com/Huy-8bit/ExtendPad/releases',
  issues: 'https://github.com/Huy-8bit/ExtendPad/issues',
  portfolio: 'https://huy-8bit.github.io/',
} as const;

export const DOWNLOADS = {
  mac: {
    label: 'Download for Mac (.dmg)',
    href: 'https://github.com/Huy-8bit/ExtendPad/releases/latest/download/ExtendPad.dmg',
    size: 'about 3 MB',
    requirements: ['macOS 13+', 'Apple Silicon & Intel'],
  },
  android: {
    label: 'Download for Android (.apk)',
    href: 'https://github.com/Huy-8bit/ExtendPad/releases/latest/download/ExtendPad.apk',
    size: 'about 1.5 MB',
    requirements: ['Android 8+ / HarmonyOS 2–4'],
  },
} as const;

export const SITE = {
  name: 'ExtendPad',
  title: 'ExtendPad — use an Android tablet as a second display for your Mac over USB-C',
  description:
    'ExtendPad turns an Android tablet into a real extended display for a Mac over a USB-C cable: a genuine second monitor in System Settings → Displays, hardware H.264, no Wi-Fi, local only.',
  author: 'Nguyen Gia Huy',
  year: 2026,
} as const;

/** Prefix a site path with the configured base path (/extendpad-site/). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
