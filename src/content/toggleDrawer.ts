const drawerWidth = "400px";
let closeDrawerClassNames: Array<string> = [];

const toggleChatDrawer = () => {
  openChatDrawer();
};

const openChatDrawer = () => {
  console.log("openChatDrawer");
};

const closeChatDrawer = (chatDrawer: HTMLElement) => {
  console.log("closeChatDrawer");
};

export const setupToggleDrawerEvent = () => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "k" && event.metaKey) {
      toggleChatDrawer();
    }
  });
};
