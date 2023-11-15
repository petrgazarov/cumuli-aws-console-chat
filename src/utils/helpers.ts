import { ChatMessage } from "utils/types";

export const getTextContentFromMessage = (message: ChatMessage) => {
  if (typeof message.content === "string") {
    return message.content;
  }

  return message.content
    .map((content) => {
      if (typeof content === "string") {
        return content;
      } else if (content.type === "text") {
        return content.text;
      } else if (content.type === "image_url") {
        return `<Screenshot attached>`;
      }
    })
    .join("\n\n");
};

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
