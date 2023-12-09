import { createRoot } from "react-dom/client";

import App from "./App";

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(<App />);

navigator.storage.persist().then((granted) => {
  if (granted) {
    console.debug("[Cumuli] Storage is persisted");
  } else {
    console.debug("[Cumuli] Storage is not persisted");
  }
});
