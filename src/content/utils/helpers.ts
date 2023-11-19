import { DRAWER_WRAPPER_ID } from "utils/constants";

export const scrollDrawerToBottom = () => {
  const scrollableParent = document.getElementById(DRAWER_WRAPPER_ID);

  if (scrollableParent) {
    scrollableParent.scrollTop = scrollableParent.scrollHeight;
  }
};
