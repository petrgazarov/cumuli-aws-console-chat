import ReactDOM from "react-dom";
import { Drawer } from "./Drawer";

const DrawerRootId = "cumuli-drawer-root";

// Render the drawer as soon as the "#app main" element is found.
const appElement = document.getElementById("app");
const rootElement = document.createElement("div");
rootElement.id = DrawerRootId;

// Setup a MutationObserver to detect when the "#app main" element is added
const observer = new MutationObserver(() => {
  const appMainElement = appElement?.getElementsByTagName("main")[0];

  if (appMainElement && appMainElement.parentNode) {
    appMainElement.parentNode.appendChild(rootElement);
    ReactDOM.render(<Drawer />, document.getElementById(DrawerRootId));
    observer.disconnect(); // Stop observing when element is found
  }
});

// The #app element is present on page load, so it can be observed immediately.
if (appElement) {
  observer.observe(appElement, { childList: true, subtree: true });
}
