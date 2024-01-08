import { SCROLLABLE_CONTAINER_ID } from "sidePanel/utils/constants";
import { OS } from "sidePanel/utils/types";

export const scrollToBottom = () => {
  const scrollableElement = document.getElementById(SCROLLABLE_CONTAINER_ID);

  if (scrollableElement) {
    scrollableElement.scrollTop =
      scrollableElement.scrollHeight - scrollableElement.clientHeight - 275;
  }
};

export const scrollToTop = () => {
  const scrollableElement = document.getElementById(SCROLLABLE_CONTAINER_ID);

  if (scrollableElement) {
    scrollableElement.scrollTop = 0;
  }
};

export const isAnyFocusableElementActive = () => {
  return document.activeElement && document.activeElement !== document.body;
};

// https://tecadmin.net/javascript-detect-os/
export const detectOS = () => {
  let os = OS.Unknown;
  const userAgent = window.navigator.userAgent;

  if (userAgent.indexOf("Win") != -1) {
    os = OS.Windows;
  }
  if (userAgent.indexOf("Mac") != -1) {
    os = OS.MacOS;
  }
  if (userAgent.indexOf("X11") != -1) {
    os = OS.UNIX;
  }
  if (userAgent.indexOf("Linux") != -1) {
    os = OS.Linux;
  }

  return os;
};

export const getAllNonCharacterKeys = (): string[] => {
  return [
    "Escape",
    "Enter",
    "Control",
    "Shift",
    "Alt",
    "Meta",
    "AltGraph",
    "CapsLock",
    "NumLock",
    "ScrollLock",
    "Tab",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "F13",
    "F14",
    "F15",
    "F16",
    "F17",
    "F18",
    "F19",
    "PageUp",
    "PageDown",
    "Home",
    "End",
    "ContextMenu",
    "Eisu",
    "Lang1",
    "Lang2",
    "Clear",
  ];
};
