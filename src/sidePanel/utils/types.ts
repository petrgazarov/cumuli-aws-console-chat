export enum TabTitlesEnum {
  chat = "chat",
  config = "config",
  history = "history",
}

export type ColorTheme = {
  BACKGROUND: string;
  BORDER: string;
  TEXT_MAIN: string;
  TEXT_DISABLED: string;
  TEXT_HIGHLIGHT: string;
};

export type Colors = {
  dark: ColorTheme;
  light: ColorTheme;
};
