import { useAtom } from "jotai";
import { useEffect } from "react";
import { useMedia } from "react-use";
import { ThemeProvider } from "styled-components";

import SidePanel from "sidePanel/components/SidePanel";
import { GlobalStyle, THEMES_OBJECT } from "sidePanel/globalStyles";
import { documentWasEverFocusedAtom } from "sidePanel/utils/atoms";
import { ThemeName } from "sidePanel/utils/types";

const App = () => {
  const isDarkMode = useMedia("(prefers-color-scheme: dark)");
  const theme = isDarkMode
    ? THEMES_OBJECT[ThemeName.dark]
    : THEMES_OBJECT[ThemeName.light];

  const [, setDocumentWasEverFocused] = useAtom(documentWasEverFocusedAtom);

  useEffect(() => {
    const handleFocusIn = () => {
      setTimeout(() => {
        setDocumentWasEverFocused(true);
      }, 100);
    };

    document.addEventListener("focusin", handleFocusIn);

    return () => document.removeEventListener("focusin", handleFocusIn);
  }, [setDocumentWasEverFocused]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <SidePanel />
    </ThemeProvider>
  );
};

export default App;
