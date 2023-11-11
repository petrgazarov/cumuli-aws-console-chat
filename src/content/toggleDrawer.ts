const drawerWidth = "400px";
let closeDrawerClassNames: Array<string> = [];

const toggleChatDrawer = () => {
  const chatDrawer = document.querySelector(
    'main + div[class^="awsui_drawer_"]'
  );

  if (chatDrawer instanceof HTMLElement) {
    const classNames = Array.from(chatDrawer.classList);
    if (classNames.length > 1) {
      closeDrawerClassNames = classNames;
      openChatDrawer(chatDrawer, classNames);
    } else {
      closeChatDrawer(chatDrawer);
    }
  }
};

const openChatDrawer = (chatDrawer: HTMLElement, classNames: Array<string>) => {
  const targetClassName = classNames.find((name) =>
    name.startsWith("awsui_drawer_")
  );
  if (targetClassName) {
    chatDrawer.className = targetClassName;
  }
  if (chatDrawer.firstElementChild instanceof HTMLElement) {
    chatDrawer.firstElementChild.style.width = drawerWidth;
  }
  const helpPanels = chatDrawer.querySelectorAll('[aria-label="help panel"]');
  if (helpPanels.length >= 2) {
    helpPanels[0].setAttribute("aria-hidden", "true");
    helpPanels[1].setAttribute("aria-hidden", "false");
  }

  chatDrawer.style.width = drawerWidth;
};

const closeChatDrawer = (chatDrawer: HTMLElement) => {
  chatDrawer.className = closeDrawerClassNames.join(" ");

  const helpPanels = chatDrawer.querySelectorAll('[aria-label="help panel"]');
  if (helpPanels.length >= 2) {
    helpPanels[0].setAttribute("aria-hidden", "false");
    helpPanels[1].setAttribute("aria-hidden", "true");
  }
  if (chatDrawer.firstElementChild instanceof HTMLElement) {
    chatDrawer.firstElementChild.style.width = "";
  }

  chatDrawer.removeAttribute("style");
};

export const setupToggleDrawerEvent = () => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "k" && event.metaKey) {
      toggleChatDrawer();
    }
  });
};
