import { useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import SidePanel from "sidePanel/components/SidePanel";
import { COLORS, FONT_FAMILY, FONT_SIZE } from "sidePanel/utils/globalStyles";
import { ColorTheme } from "sidePanel/utils/types";

const GlobalStyle = createGlobalStyle<{ theme: ColorTheme }>`
  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    background-color: ${(props) => props.theme.BACKGROUND};
    font-size: ${FONT_SIZE};
    font-family: ${FONT_FAMILY};
  }

  #root {
    overflow-y: hidden;
  }
`;

const App = () => {
  const [theme] = useState(COLORS.dark);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <SidePanel />
    </ThemeProvider>
  );
};

export default App;
