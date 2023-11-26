import { ChatMessage, ImageMessageContent } from "utils/types";

const captureVisibleTab = () => {
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
};

export const addScreenshotToMessage = async (message: ChatMessage) => {
  if (!Array.isArray(message.content)) {
    return message;
  }
  const screenshotData = await captureVisibleTab();

  const imageContent = message.content.find(
    (content): content is ImageMessageContent => content.type === "image_url"
  );
  if (imageContent) {
    imageContent.image_url.url = screenshotData;
  }

  return message;
};
