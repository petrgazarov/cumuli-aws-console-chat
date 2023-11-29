import { useMedia } from "react-use";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import SidePanel from "sidePanel/components/SidePanel";
import {
  COLOR_THEMES,
  FONT_FAMILY,
  FONT_SIZE,
  LINE_HEIGHT,
} from "sidePanel/utils/globalStyles";
import { ColorThemeName } from "sidePanel/utils/types";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    background-color: ${({ theme }) => theme.BACKGROUND};
    font-family: ${FONT_FAMILY};
    font-size: ${FONT_SIZE};
    line-height: ${LINE_HEIGHT};
    color: ${({ theme }) => theme.PRIMARY_TEXT};
  }

  #root {
    overflow-y: hidden;
  }

  button {
    font-family: ${FONT_FAMILY};
    font-size: inherit;
  }
`;

const App = () => {
  const isDarkMode = useMedia("(prefers-color-scheme: dark)");
  const theme = isDarkMode
    ? COLOR_THEMES[ColorThemeName.dark]
    : COLOR_THEMES[ColorThemeName.light];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <SidePanel />
    </ThemeProvider>
  );
};

export default App;
