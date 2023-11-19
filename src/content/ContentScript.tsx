import ReactDOM from "react-dom";
import debounce from "lodash.debounce";
import Drawer from "content/components/Drawer";
import { DRAWER_ROOT_ID } from "utils/constants";

const appElement = document.getElementById("app");

const renderDrawer = () => {
  // "#app main" element must be present for the drawer to be rendered.
  const appMainElement = appElement?.getElementsByTagName("main")[0];
  if (!appMainElement || !appMainElement.parentNode) return;

  // AWS UI rendering logic sometimes removes the drawer from the DOM.
  // If the drawer is already present, return.
  const cumuliRoot = document.getElementById(DRAWER_ROOT_ID);
  if (cumuliRoot) return;

  const rootElement = document.createElement("div");
  rootElement.id = DRAWER_ROOT_ID;
  appMainElement.parentNode.appendChild(rootElement);
  ReactDOM.render(<Drawer />, document.getElementById(DRAWER_ROOT_ID));
};

const observer = new MutationObserver(
  debounce(renderDrawer, 250, { leading: true, trailing: true })
);

// The #app element is always present on page load.
if (appElement) {
  observer.observe(appElement, { childList: true, subtree: true });
}
