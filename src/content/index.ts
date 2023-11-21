import debounce from "lodash.debounce";
import { DRAWER_ROOT_ID } from "utils/constants";
import { renderDrawer, resolveHtmlElements } from "./ContentScript";
import pageListeners from "./ContentScript/pageListeners";
import {
  iframeIds,
  getIframesOnPage,
  injectStylesheetIntoIframes,
} from "./ContentScript/iframes";

const renderToDom = () => {
  // Some AWS pages are rendered with iframes.
  // Check if there are any new iframes on the page. If so, inject the stylesheet.
  const iframesOnPage = getIframesOnPage();
  const hasNewIframes = iframesOnPage.some(
    (iframe) => !iframeIds.includes(iframe.id)
  );

  if (hasNewIframes) {
    iframeIds.splice(
      0,
      iframeIds.length,
      ...iframesOnPage.map((iframe) => iframe.id)
    );
    injectStylesheetIntoIframes(iframesOnPage);
  }

  // If the drawer is already present, do nothing.
  if (document.getElementById(DRAWER_ROOT_ID)) return;

  // Remove all listeners before re-rendering
  pageListeners.clear();

  const { mainElement, observedElement } = resolveHtmlElements();
  if (!mainElement || !observedElement) {
    return;
  }

  renderDrawer(mainElement);
};

// AWS UI rendering logic sometimes removes the drawer from the DOM. This observer
// will re-render the drawer when that happens.
const observer = new MutationObserver(
  debounce(renderToDom, 250, {
    leading: true,
    trailing: true,
  })
);

const { observedElement } = resolveHtmlElements();

if (observedElement) {
  observer.observe(observedElement, { childList: true, subtree: true });
}
