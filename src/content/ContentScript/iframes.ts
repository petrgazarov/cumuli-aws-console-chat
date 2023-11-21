import iframeStyles from "!!raw-loader!content/css/iframe.css";
import { IFRAME_STYLESHEET_ID } from "utils/constants";

export const iframeIds: string[] = [];

export const getIframesOnPage = (): HTMLIFrameElement[] => {
  return Array.from(document.querySelectorAll("main iframe"));
};

export const injectStylesheetIntoIframes = (iframes: HTMLIFrameElement[]) => {
  iframes.forEach((iframe) => {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;

    if (doc) {
      const existingStyleElement = doc.getElementById(IFRAME_STYLESHEET_ID);

      if (!existingStyleElement) {
        const styleElement = doc.createElement("style");
        styleElement.id = IFRAME_STYLESHEET_ID;
        styleElement.textContent = iframeStyles;
        doc.head.appendChild(styleElement);
      }
    }
  });
};
