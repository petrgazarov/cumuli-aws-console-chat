import { createGlobalStyle } from "styled-components";

import { ThemeName, ThemesObject } from "sidePanel/utils/types";

export const COLORS = {
  BLACK: "#000",
  BLACK_RUSSIAN_DARK: "#16191f",
  BLACK_RUSSIAN_LIGHT: "#202124",
  BLUE: "#0096ff",
  DARK_GRAY: "#808080",
  GRAY: "#a9a9a9",
  GRAY_95: "#f2f2f2",
  RED: "#ff7070",
  WHITE: "#fff",
};

export const THEMES_OBJECT: ThemesObject = {
  [ThemeName.dark]: {
    colors: {
      ACTIVE_TEXT: COLORS.BLUE,
      BACKGROUND: COLORS.BLACK_RUSSIAN_LIGHT,
      FOCUS: COLORS.GRAY,
      HELP_TEXT: COLORS.GRAY,
      HIGHLIGHT: COLORS.RED,
      INPUT_BACKGROUND: COLORS.BLACK,
      INPUT_BORDER: COLORS.DARK_GRAY,
      INPUT_FOCUSED_BORDER: COLORS.BLUE,
      PRIMARY_TEXT: COLORS.WHITE,
    },
    name: ThemeName.dark,
  },
  [ThemeName.light]: {
    colors: {
      ACTIVE_TEXT: COLORS.BLUE,
      BACKGROUND: COLORS.WHITE,
      FOCUS: COLORS.BLUE,
      HELP_TEXT: COLORS.DARK_GRAY,
      HIGHLIGHT: COLORS.RED,
      INPUT_BACKGROUND: COLORS.GRAY_95,
      INPUT_BORDER: COLORS.DARK_GRAY,
      INPUT_FOCUSED_BORDER: COLORS.BLUE,
      PRIMARY_TEXT: COLORS.BLACK,
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

  html {
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
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
