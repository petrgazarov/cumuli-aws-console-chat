import { isPageSupported } from "utils/helpers";
import { CommandChannelAction } from "utils/types";

export { chatChannelListener } from "./channelListeners";

export const commandListener = async (command: string) => {
  if (command === CommandChannelAction.submit_with_screenshot) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabUrl = tabs[0].url;

      if (!tabUrl) {
        return;
      }

      if (!isPageSupported(tabUrl)) {
        console.debug(
          `[Cumuli] Attempted to take screenshot, but page not supported: ${tabUrl}`
        );
        return;
      }

      chrome.runtime.sendMessage({ action: command });
    });
  }
};

export const onTabUpdatedListener = async (
  tabId: number,
  _: chrome.tabs.TabChangeInfo,
  tab: chrome.tabs.Tab
) => {
  if (!tab.url) {
    return;
  }

  if (isPageSupported(tab.url)) {
    await chrome.sidePanel.setOptions({
      enabled: true,
      path: "sidepanel.html",
      tabId,
    });
  } else {
    await chrome.sidePanel.setOptions({
      enabled: false,
      tabId,
    });
  }
};
