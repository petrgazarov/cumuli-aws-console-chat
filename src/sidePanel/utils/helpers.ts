import { SCROLLABLE_CONTAINER_ID } from "sidePanel/utils/constants";

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
