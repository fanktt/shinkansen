// firefox-compat.js — Firefox 特定相容性補丁
// 此檔案只在 Firefox build 的 manifest.firefox.json 中載入（scripts 陣列第一個），
// Chrome build 完全不需要也不載入。因此不影響上游合併。

// v1.5.4: Firefox <129 沒有 storage.session，fallback 到 storage.local。
// 瀏覽器重啟後 tabId 會重排，舊 stickyTabs 資料無意義，啟動時清空避免誤觸發。
if (typeof browser !== 'undefined' && !browser.storage?.session) {
  browser.runtime.onStartup?.addListener(() => {
    browser.storage.local.remove('stickyTabs').catch(() => {});
  });
}
