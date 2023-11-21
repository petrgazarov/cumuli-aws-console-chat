import ReactDOM from "react-dom";
import Drawer from "content/components/Drawer";
import { DRAWER_ROOT_ID } from "utils/constants";
import { UNSUPPORTED_PATHS } from "./constants";


export const resolveHtmlElements = () => {
  let mainElement: HTMLElement | null = null;
  let observedElement: HTMLElement | null = null;

  // Drawer cannot be rendered on these pages
  if (UNSUPPORTED_PATHS.includes(window.location.pathname)) {
    console.debug("[Cumuli] unsupported page, skipping");
    return { mainElement: null, observedElement: null };
  }

  // #app element layout (e.g. main IAM and Route53 pages)
  const appElement = document.getElementById("app");
  if (appElement) {
    observedElement = appElement;

    const main = appElement?.getElementsByTagName("main")[0];
    if (main) {
      mainElement = main;
    }

    return { mainElement, observedElement };
  }

  // #ensemble element layout (e.g. EC2)
  const ensembleElement = document.getElementById("ensemble");
  if (ensembleElement) {
    observedElement = ensembleElement;

    const main = ensembleElement.getElementsByTagName("main");

    if (main.length > 1) {
      console.debug("[Cumuli] found multiple main elements, skipping");
      return { mainElement: null, observedElement: null };
    }
    if (main[0]) {
      mainElement = main[0];
    }

    return { mainElement, observedElement };
  }

  console.debug("[Cumuli] did not match any known page layout");
  return { mainElement: null, observedElement: null };
};

export const renderDrawer = (mainElement: HTMLElement) => {
  const rootElement = document.createElement("div");
  rootElement.id = DRAWER_ROOT_ID;

  if (mainElement.parentNode) {
    mainElement.parentNode.appendChild(rootElement);
    ReactDOM.render(<Drawer />, document.getElementById(DRAWER_ROOT_ID));
  }
};
