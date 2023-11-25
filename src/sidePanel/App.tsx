import { createGlobalStyle } from "styled-components";

import SidePanel from "sidePanel/components/SidePanel";
import { FONT_FAMILY, FONT_SIZE, COLORS } from "sidePanel/utils/globalStyles";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    background-color: ${COLORS.BACKGROUND};
    font-size: ${FONT_SIZE};
    font-family: ${FONT_FAMILY};
  }

  #root {
    overflow-y: hidden;
  }
`;

const App = () => (
  <>
    <GlobalStyle />
    <SidePanel />
  </>
);

export default App;
