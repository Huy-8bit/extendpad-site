# extendpad-site

Product website for [ExtendPad](https://github.com/Huy-8bit/ExtendPad), published with GitHub Pages at
<https://huy-8bit.github.io/extendpad-site/>.

Static [Astro](https://astro.build) site with plain CSS, sharing the visual system of the LockLens site.
`site` and `base` are set in [`astro.config.mjs`](astro.config.mjs); every internal link goes through `url()`
in [`src/config.ts`](src/config.ts) so it respects the `/extendpad-site/` base path.

## Develop

```sh
npm install
npm run dev        # http://localhost:4321/extendpad-site/
npm run verify     # type check + production build + link check
```

## Where things live

| File | What it holds |
| --- | --- |
| [`src/config.ts`](src/config.ts) | Every external URL: repository, releases, issues, portfolio, and the two download links with sizes and requirements |
| [`src/content.ts`](src/content.ts) | Page copy: features, setup steps, measured performance, limitations, FAQ |
| [`public/screenshots/`](public/screenshots/) | Real photos/screenshots. The "In use" gallery appears only when this folder contains images; optional alt text in `captions.json` |
| [`scripts/check-links.mjs`](scripts/check-links.mjs) | Checks that internal links resolve under `/extendpad-site/`, that `#anchors` exist, and that the download buttons point at the GitHub Releases URLs |
| `public/og.png` | Social preview image, regenerated with `npx playwright install chromium && npm run og` |

## Deploy

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): type check, build and link
check, then `actions/upload-pages-artifact` and `actions/deploy-pages`. In the repository settings,
**Pages → Build and deployment → Source** must be set to **GitHub Actions**.
