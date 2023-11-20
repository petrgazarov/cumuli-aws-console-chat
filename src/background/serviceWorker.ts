import { LLM_CHANNEL, COMMAND_CHANNEL } from "utils/constants";
import {
  setupLlmChannelListener,
  setupCommandChannelListener,
} from "./listeners";
import { DrawerInstance } from "./types";

const drawerInstances: { [tabId: number]: DrawerInstance } = {};

chrome.runtime.onConnect.addListener((port) => {
  const tabId = port.sender?.tab?.id;
  if (typeof tabId !== "number") throw new Error("tabId is not a number");
  console.log("tabId", tabId);

  if (!drawerInstances[tabId]) {
    drawerInstances[tabId] = {
      createdAt: new Date(),
      open: false,
      messages: [],
      tabId,
    };
  }
  const drawerInstance = drawerInstances[tabId];

  if (port.name === LLM_CHANNEL) {
    setupLlmChannelListener(port, drawerInstance);
  } else if (port.name === COMMAND_CHANNEL) {
    setupCommandChannelListener(port, drawerInstance);
  }
});
