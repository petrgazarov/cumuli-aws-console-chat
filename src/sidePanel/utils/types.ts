export enum TabTitlesEnum {
  chat = "chat",
  config = "config",
  history = "history",
}

export enum ColorThemeName {
  dark = "dark",
  light = "light",
}

export type ColorThemes = {
  [key in ColorThemeName]: {
    ACTIVE_TEXT: string;
    BACKGROUND: string;
    FOCUS: string;
    GRAY_1: string;
    GRAY_2: string;
    HELP_TEXT: string;
    HIGHLIGHT: string;
    INPUT_BACKGROUND: string;
    PRIMARY_TEXT: string;
    SUCCESS_TEXT: string;
  };
};

export type ColorTheme = ColorThemes[ColorThemeName];
