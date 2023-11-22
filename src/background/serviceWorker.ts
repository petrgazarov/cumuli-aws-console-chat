import {
  setupChatChannelListener,
  setupCommandChannelListener,
} from "./listeners";
import { DrawerInstance, NewChatConversation } from "./types";

import { CHAT_CHANNEL, COMMAND_CHANNEL } from "utils/constants";

const drawerInstances: { [tabId: number]: DrawerInstance } = {};

chrome.runtime.onConnect.addListener((port) => {
  const tabId = port.sender?.tab?.id;
  if (typeof tabId !== "number") {throw new Error("tabId is not a number");}
  console.log("tabId", tabId);

  if (!drawerInstances[tabId]) {
    drawerInstances[tabId] = {
      tabId,
      open: false,
      conversation: NewChatConversation(),
      createdAt: new Date(),
    };
  }
  const drawerInstance = drawerInstances[tabId];

  if (port.name === CHAT_CHANNEL) {
    setupChatChannelListener(port, drawerInstance);
  } else if (port.name === COMMAND_CHANNEL) {
    setupCommandChannelListener(port, drawerInstance);
  }
});
