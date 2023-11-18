export function getOpenAiApiKey(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("openAiApiKey", function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.openAiApiKey);
      }
    });
  });
}

export function setOpenAiApiKey(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ openAiApiKey: apiKey }, function () {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}
