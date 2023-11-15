import ReactDOM from "react-dom";
import debounce from "lodash.debounce";
import { Drawer } from "./Drawer";

const DrawerRootId = "cumuli-drawer-root";

const appElement = document.getElementById("app");

const renderDrawer = () => {
  // "#app main" element must be present for the drawer to be rendered.
  const appMainElement = appElement?.getElementsByTagName("main")[0];
  if (!appMainElement || !appMainElement.parentNode) return;

  // AWS UI rendering logic sometimes removes the drawer from the DOM.
  // If the drawer is already present, return.
  const cumuliRoot = document.getElementById(DrawerRootId);
  if (cumuliRoot) return;

  const rootElement = document.createElement("div");
  rootElement.id = DrawerRootId;
  appMainElement.parentNode.appendChild(rootElement);
  ReactDOM.render(<Drawer />, document.getElementById(DrawerRootId));
};

const observer = new MutationObserver(
  debounce(renderDrawer, 250, { leading: true, trailing: true })
);

// The #app element is always present on page load.
if (appElement) {
  observer.observe(appElement, { childList: true, subtree: true });
}
