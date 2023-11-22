import { OS } from "./types";

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

// https://tecadmin.net/javascript-detect-os/
export const detectOS = () => {
  let os = OS.Unknown;
  const userAgent = window.navigator.userAgent;

  if (userAgent.indexOf("Win") != -1) {os = OS.Windows;}
  if (userAgent.indexOf("Mac") != -1) {os = OS.MacOS;}
  if (userAgent.indexOf("X11") != -1) {os = OS.UNIX;}
  if (userAgent.indexOf("Linux") != -1) {os = OS.Linux;}

  return os;
};
