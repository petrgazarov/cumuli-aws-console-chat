import { createRoot } from "react-dom/client";

// TODO: fix this. Weird webpack plugin issue, says "Casing of ./App does not match the underlying filesystem"
// eslint-disable-next-line import/no-unresolved
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
