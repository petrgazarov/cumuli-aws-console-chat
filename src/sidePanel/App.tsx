import { useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import SidePanel from "sidePanel/components/SidePanel";
import { COLORS, FONT_FAMILY, FONT_SIZE } from "sidePanel/utils/globalStyles";
import { ColorThemeEnum, Theme } from "sidePanel/utils/types";

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    background-color: ${COLORS.BLACK_2};
    font-family: ${FONT_FAMILY};
    font-size: ${FONT_SIZE};
    line-height: 22px;
  }

  #root {
    overflow-y: hidden;
  }
`;

const App = () => {
  const [theme] = useState<Theme>({ selected: ColorThemeEnum.dark });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <SidePanel />
    </ThemeProvider>
  );
};

export default App;
