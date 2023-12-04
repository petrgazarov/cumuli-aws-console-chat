import { PANEL_CONTENT_ID } from "sidePanel/utils/constants";

export const scrollToBottom = () => {
  const scrollableElement = document.getElementById(PANEL_CONTENT_ID);

  if (scrollableElement) {
    scrollableElement.scrollTop = scrollableElement.scrollHeight;
  }
};

export const scrollToTop = () => {
  const scrollableElement = document.getElementById(PANEL_CONTENT_ID);

  if (scrollableElement) {
    scrollableElement.scrollTop = 0;
  }
};
