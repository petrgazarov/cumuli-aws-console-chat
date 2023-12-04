import { useMedia } from "react-use";
import { ThemeProvider } from "styled-components";

import SidePanel from "sidePanel/components/SidePanel";
import { GlobalStyle, THEMES_OBJECT } from "sidePanel/utils/globalStyles";
import { ThemeName } from "sidePanel/utils/types";

const App = () => {
  const isDarkMode = useMedia("(prefers-color-scheme: dark)");
  const theme = isDarkMode
    ? THEMES_OBJECT[ThemeName.dark]
    : THEMES_OBJECT[ThemeName.light];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <SidePanel />
    </ThemeProvider>
  );
};

export default App;
