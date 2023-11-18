export function captureVisibleTab() {
  return new Promise<string>((resolve, reject) => {
    chrome.tabs.captureVisibleTab(
      chrome.windows.WINDOW_ID_CURRENT,
      { format: "jpeg" },
      (screenshotUrl) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(screenshotUrl);
        }
      }
    );
  });
}
