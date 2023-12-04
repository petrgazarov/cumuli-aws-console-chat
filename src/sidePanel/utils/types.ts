export enum TabTitlesEnum {
  chat = "chat",
  config = "config",
  history = "history",
}

export enum ThemeName {
  dark = "dark",
  light = "light",
}

export type ThemesObject = {
  [key in ThemeName]: {
    colors: {
      ACTIVE_TEXT: string;
      BACKGROUND: string;
      FOCUS: string;
      HELP_TEXT: string;
      HIGHLIGHT: string;
      INPUT_BACKGROUND: string;
      PRIMARY_TEXT: string;
    };
    name: ThemeName;
  };
};

export type Theme = ThemesObject[ThemeName];
