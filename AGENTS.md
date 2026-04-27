# Shinkansen — Agent Notes

Chrome Extension (Manifest V3), translate web pages to Traditional Chinese (Taiwan). Source in `shinkansen/`.

## Developer Commands

```bash
# All tests (Playwright E2E + Jest)
npm run test:all

# Playwright only
npm test
npm run test:regression   # test/regression/
npm run test:unit         # test/unit/

# Jest only (jsdom-less)
npm run test:jest         # test/jest-unit/**/*.test.cjs
```

## Test Architecture

- **Playwright**: MV3 extension via `chromium.launchPersistentContext` + `--load-extension=shinkansen/`. See `test/fixtures/extension.js`.
  - `workers: 1` mandatory — shared user data dir.
  - Headless needs `--headless=new`; legacy `headless: true` disables service worker.
  - Access content script isolated world via CDP (`Runtime.executionContextCreated`, `auxData.type === 'isolated'`), not `page.evaluate`.
  - Canned LLM responses: `test/regression/fixtures/*.response.txt`.
- **Jest**: `testEnvironment: 'node'`. Helpers create own jsdom to avoid double-jsdom. Timeout 10s.

## Extension Structure

- `shinkansen/manifest.json` — version source of truth.
- Content scripts: `content.js` (main), `content-detect.js`, `content-serialize.js`, `content-inject.js`, `content-spa.js`, `content-youtube.js`, `content-toast.js`, `content-ns.js`, `content-youtube-main.js`.
- Background: `background.js`.
- UI: `popup/`, `options/`.
- Shared libs: `shinkansen/lib/`.

## Version Bump

Bumping `manifest.json` version must sync these files (enforced by `test/version-check.spec.js`):

1. `test/version-check.spec.js` — update `EXPECTED_VERSION`.
2. `README.md` — "目前版本" paragraph.
3. `SPEC.md` — header and "已實作" section title.
4. `CHANGELOG.md` — top entry `**vX.Y.Z**`.
5. `docs/index.html` — GitHub download button URL path, filename, and `<span class="btn-version">` subtitle.

## Release Flow

```bash
./release.sh "description"
```

Commits, tags (`v{manifest_version}`), pushes. GitHub Actions (`release.yml`) creates release with `shinkansen-vX.Y.Z.zip`.

## Fork Policy

This repo is forked from upstream. `main` stays unchanged; all work happens on `develop`. Upstream `master` is merged back periodically.

- **Never modify existing files under `shinkansen/`**. Firefox port changes are applied via:
  - New files: `manifest.firefox.json`, `background-firefox.js`, `lib/firefox-compat.js`
  - Build-time string replacement (options/privacy copy) via `tools/build.js`
- This keeps upstream merges conflict-free.

## Upstream Sync Flow

```bash
# One-time setup (already done):
# git remote add upstream https://github.com/jimmysu0309/shinkansen.git

git fetch upstream
git checkout develop
git merge upstream/main
npm run test:all
node tools/build.js --target firefox --outdir dist
git push
```

Conflict risk is low (only new files added, no source modifications). When upstream bumps `manifest.json` version, also bump `manifest.firefox.json` version to match.

## Conventions

- Regression tests: `test/regression/`. Pure logic unit tests: `test/unit/` or `test/jest-unit/`.
- `PENDING_REGRESSION.md` tracks bugs fixed without regression tests. Non-empty → remind user.
- `docs/index.html` CWS version badge auto-synced by `sync-cws-version.yml` (cron every 6h).
- Extension loads from `shinkansen/` for both development and tests.
