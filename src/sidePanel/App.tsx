import { useAtom } from "jotai";
import { useEffect } from "react";
import { useMedia } from "react-use";
import { ThemeProvider } from "styled-components";

import SidePanel from "sidePanel/components/SidePanel";
import { GlobalStyle, THEMES_OBJECT } from "sidePanel/globalStyles";
import { documentWasFocusedAtom } from "sidePanel/utils/atoms";
import { ThemeName } from "sidePanel/utils/types";

const App = () => {
  const isDarkMode = useMedia("(prefers-color-scheme: dark)");
  const theme = isDarkMode
    ? THEMES_OBJECT[ThemeName.dark]
    : THEMES_OBJECT[ThemeName.light];

  const [, setDocumentWasFocused] = useAtom(documentWasFocusedAtom);

  /* When the sidepanel initially loads, it does not receive focus authority immediately.
   * Instead, the sidepanel must be focused by the user _before_ it can focus itself programmatically.
   * documentWasFocused state gets rid of the jerkiness that occurs the first time user focuses the sidepanel.
   */
  useEffect(() => {
    const handleFocusIn = () => {
      setTimeout(() => {
        setDocumentWasFocused(true);
      }, 100);
    };

    document.addEventListener("focusin", handleFocusIn);

    return () => document.removeEventListener("focusin", handleFocusIn);
  }, [setDocumentWasFocused]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <SidePanel />
    </ThemeProvider>
  );
};

export default App;
