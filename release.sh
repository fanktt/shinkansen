#!/bin/bash
# 用法: ./release.sh [--firefox] "改了什麼"
# 自動 commit、tag、push，GitHub Actions 會自動建 Release 並附 zip
#
# --firefox: 建立 Firefox 版 release（tag 為 vX.Y.Z-firefox）

set -e
cd "$(dirname "$0")"

TARGET="chrome"
if [ "${1:-}" = "--firefox" ]; then
  TARGET="firefox"
  shift
fi

VERSION=$(grep '"version"' shinkansen/manifest.json | head -1 | sed 's/[^0-9.]//g')
MSG="${1:-v${VERSION}}"

if [ "$TARGET" = "firefox" ]; then
  TAG="v${VERSION}-firefox"
else
  TAG="v${VERSION}"
fi

git add -A
git commit -m "v${VERSION} — ${MSG}"

# 若 tag 已存在，先刪除本地和遠端的舊 tag 再重建
if git tag -l "$TAG" | grep -q .; then
  git tag -d "$TAG"
  git push origin ":refs/tags/${TAG}" 2>/dev/null || true
fi
git tag "$TAG"
git push && git push --tags

echo ""
echo "${TAG} 已推送，Release 會在 1 分鐘內自動建立。"
echo "https://github.com/fanktt/shinkansen/releases"
