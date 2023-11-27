import { getImageContentFromMessage } from "utils/helpers";
import { UserChatMessage } from "utils/types";

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

export const addScreenshotToMessage = async (message: UserChatMessage) => {
  const imageContent = getImageContentFromMessage(message);

  if (!imageContent) {
    return message;
  }

  const screenshotData = await captureVisibleTab();

  if (imageContent) {
    imageContent.image_url.url = screenshotData;
  }

  return message;
};
