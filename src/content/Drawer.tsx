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

const rootElement = document.createElement("div");
rootElement.id = DrawerElementId;
const appMainElement = document.querySelector("#app main");

if (appMainElement && appMainElement.parentNode) {
  // Remove existing drawer if it exists. Not all pages have the existing drawer.
  if (appMainElement.nextSibling) {
    appMainElement.parentNode.removeChild(appMainElement.nextSibling);
  }

  appMainElement.parentNode.appendChild(rootElement);
  ReactDOM.render(<Drawer />, document.getElementById(DrawerElementId));
}
