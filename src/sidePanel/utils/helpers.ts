import { PANEL_CONTENT_ID } from "sidePanel/utils/constants";

export const scrollPanelToBottom = () => {
  const scrollableParent = document.getElementById(PANEL_CONTENT_ID);

  if (scrollableParent) {
    scrollableParent.scrollTop = scrollableParent.scrollHeight;
  }
};
