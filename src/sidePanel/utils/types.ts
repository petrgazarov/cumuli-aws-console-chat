export enum TabTitlesEnum {
  chat = "chat",
  config = "config",
  history = "history",
}

export type ColorTheme = {
  GRAY_1: string;
  GRAY_2: string;
  BLACK_1: string;
  BLACK_2: string;
  BLACK_3: string;
  BLACK_4: string;
  BLACK_5: string;
  WHITE_1: string;
  WHITE_2: string;
  BLUE_1: string;
  BLUE_2: string;
  BLUE_3: string;
  BLUE_4: string;
  BLUE_5: string;
  RED: string;
  ORANGE_1: string;
  ORANGE_2: string;
  ORANGE_3: string;
  ORANGE_4: string;
};

export type Colors = {
  dark: ColorTheme;
  light: ColorTheme;
};
