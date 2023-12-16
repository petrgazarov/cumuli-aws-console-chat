import styled from "styled-components";

import { LINE_HEIGHT } from "sidePanel/globalStyles";
import { ThemeName } from "sidePanel/utils/types";

export const ButtonBase = styled.button`
  padding: 3px 19px;
  font-weight: 700;
  border-width: 2px;
  border-style: solid;
  border-radius: 2px;
  line-height: ${LINE_HEIGHT};
  cursor: pointer;

  &:disabled {
    cursor: default;
    border-color: ${({ theme }) => theme.colors.HELP_TEXT};
    color: ${({ theme }) => theme.colors.HELP_TEXT};
  }
`;

export const PrimaryButton = styled(ButtonBase)`
  border-color: ${({ theme }) => theme.colors.HIGHLIGHT};
  background-color: transparent;
  color: ${({ theme }) =>
    theme.name === ThemeName.dark
      ? theme.colors.PRIMARY_TEXT
      : theme.colors.HIGHLIGHT};

  &:focus-visible,
  &:hover:enabled {
    color: ${({ theme }) =>
      theme.name === ThemeName.dark
        ? theme.colors.HIGHLIGHT
        : theme.colors.BACKGROUND};
    background-color: ${({ theme }) =>
      theme.name === ThemeName.dark ? "transparent" : theme.colors.HIGHLIGHT};
  }
`;

export const SecondaryButton = styled(ButtonBase)`
  border-color: ${({ theme }) => theme.colors.ACTIVE_TEXT};
  background-color: transparent;
  color: ${({ theme }) =>
    theme.name === ThemeName.dark
      ? theme.colors.PRIMARY_TEXT
      : theme.colors.ACTIVE_TEXT};

  &:focus-visible,
  &:hover:enabled {
    color: ${({ theme }) =>
      theme.name === ThemeName.dark
        ? theme.colors.ACTIVE_TEXT
        : theme.colors.BACKGROUND};
    background-color: ${({ theme }) =>
      theme.name === ThemeName.dark ? "transparent" : theme.colors.ACTIVE_TEXT};
  }
`;
