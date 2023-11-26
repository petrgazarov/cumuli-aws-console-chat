import { setupDb } from "indexedDb/setup";
import { CHAT_CHANNEL } from "utils/constants";

import {
  chatChannelListener,
  commandListener,
  onTabUpdatedListener,
} from "./listeners";

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === CHAT_CHANNEL) {
    port.onMessage.addListener(chatChannelListener.bind(null, port));
  }
});

chrome.commands.onCommand.addListener(commandListener);

chrome.tabs.onUpdated.addListener(onTabUpdatedListener);

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener(setupDb);
