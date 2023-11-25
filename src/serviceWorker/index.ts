import { CHAT_CHANNEL, COMMAND_CHANNEL } from "utils/constants";
import { NewChatConversation } from "utils/types";

import {
  chatChannelListener,
  commandChannelListener,
  commandListener,
  onTabUpdatedListener,
  onInstalledListener,
} from "./listeners";

chrome.runtime.onConnect.addListener((port) => {
  const chatConversation = NewChatConversation();

  if (port.name === CHAT_CHANNEL) {
    port.onMessage.addListener(
      chatChannelListener.bind(null, port, chatConversation)
    );
  } else if (port.name === COMMAND_CHANNEL) {
    port.onMessage.addListener(commandChannelListener);
  }
});

chrome.commands.onCommand.addListener(commandListener);

chrome.tabs.onUpdated.addListener(onTabUpdatedListener);

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener(onInstalledListener);
