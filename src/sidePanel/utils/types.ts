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
      INPUT_BORDER: string;
      INPUT_FOCUSED_BORDER: string;
      PRIMARY_TEXT: string;
    };
    name: ThemeName;
  };
};

export type Theme = ThemesObject[ThemeName];

export enum OS {
  Linux = "Linux",
  MacOS = "MacOS",
  UNIX = "UNIX",
  Unknown = "Unknown OS",
  Windows = "Windows",
}
