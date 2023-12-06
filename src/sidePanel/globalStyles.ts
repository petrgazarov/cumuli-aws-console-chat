import { createGlobalStyle } from "styled-components";

import { ThemeName, ThemesObject } from "sidePanel/utils/types";

export const COLORS = {
  BLACK: "#000",
  BLACK_RUSSIAN_DARK: "#16191f",
  BLACK_RUSSIAN_LIGHT: "#202124",
  DARK_GRAY: "#808080",
  GRAY: "#a9a9a9",
  GRAY_95: "#f2f2f2",
  LIGHT_GRAY: "#d5dbdb",
  PURPLE: "#614de0",
  RED: "#ff7070",
  WHITE: "#fff",
};

export const THEMES_OBJECT: ThemesObject = {
  [ThemeName.dark]: {
    colors: {
      ACTIVE_TEXT: COLORS.PURPLE,
      BACKGROUND: COLORS.BLACK_RUSSIAN_LIGHT,
      FOCUS: COLORS.DARK_GRAY,
      HELP_TEXT: COLORS.DARK_GRAY,
      HIGHLIGHT: COLORS.RED,
      INPUT_BACKGROUND: COLORS.BLACK,
      PRIMARY_TEXT: COLORS.LIGHT_GRAY,
    },
    name: ThemeName.dark,
  },
  [ThemeName.light]: {
    colors: {
      ACTIVE_TEXT: COLORS.PURPLE,
      BACKGROUND: COLORS.WHITE,
      FOCUS: COLORS.DARK_GRAY,
      HELP_TEXT: COLORS.DARK_GRAY,
      HIGHLIGHT: COLORS.RED,
      INPUT_BACKGROUND: COLORS.GRAY_95,
      PRIMARY_TEXT: COLORS.BLACK_RUSSIAN_DARK,
    },
    name: ThemeName.light,
  },
};

export const FONT_FAMILY = '"Anonymous Pro", Arial, sans-serif';

export const FONT_SIZE_PRIMARY = "15px";

export const FONT_SIZE_SECONDARY = "14px";

export const BORDER_RADIUS = "2px";

export const LINE_HEIGHT = "22px";

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    background-color: ${({ theme }) => theme.colors.BACKGROUND};
    font-family: ${FONT_FAMILY};
    font-size: ${FONT_SIZE_PRIMARY};
    line-height: ${LINE_HEIGHT};
    color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
  }

  #root {
    overflow-y: hidden;
  }

  button {
    font-family: ${FONT_FAMILY};
    font-size: inherit;
  }

  *:focus-visible {
    outline: 1px ${({ theme }) =>
      theme.name === ThemeName.dark
        ? `dotted ${theme.colors.ACTIVE_TEXT}`
        : `solid ${theme.colors.ACTIVE_TEXT}`};
  }
`;
