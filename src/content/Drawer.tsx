import React from "react";
import ReactDOM from "react-dom";
import { setupToggleDrawerEvent } from "./toggleDrawer";

setupToggleDrawerEvent();

const DrawerElementId = "cumuli-drawer";

class Drawer extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, Drawer!</h1>
      </div>
    );
  }
}

const setupDrawer = () => {
  const appMainElement = document
    .getElementById("app")
    ?.getElementsByTagName("main")[0];

  if (appMainElement && appMainElement.parentNode) {
    clearInterval(intervalId); // Stop checking once the element is found

    const rootElement = document.createElement("div");
    rootElement.id = DrawerElementId;

    // Hide existing drawer if it exists. Not all pages have an existing drawer.
    if (appMainElement.nextSibling instanceof HTMLElement) {
      appMainElement.nextSibling.style.display = "none";
    }

    appMainElement.parentNode.appendChild(rootElement);
    ReactDOM.render(<Drawer />, document.getElementById(DrawerElementId));
  }
};

const intervalId = setInterval(setupDrawer, 50);

// Stop trying to set it up after 30 seconds
setTimeout(() => {
  clearInterval(intervalId);
}, 30000);
