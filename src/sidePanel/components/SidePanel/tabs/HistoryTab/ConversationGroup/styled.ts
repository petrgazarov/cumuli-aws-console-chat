import styled from "styled-components";

import { FONT_SIZE_SECONDARY } from "sidePanel/utils/globalStyles";
import { ThemeName } from "sidePanel/utils/types";

export const Container = styled.div``;

export const GroupLabel = styled.div`
  color: ${({ theme }) => theme.colors.HELP_TEXT};
`;

export const GroupContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const DeleteButton = styled.button`
  display: flex;
  opacity: 0;
  position: absolute;
  align-items: center;
  right: 5px;
  height: 40px;
  color: ${({ theme }) =>
    theme.name === ThemeName.dark
      ? theme.colors.HELP_TEXT
      : theme.colors.HIGHLIGHT};
  cursor: pointer;
  background-color: transparent;
  font-size: ${FONT_SIZE_SECONDARY};
  border: ${({ theme }) =>
    theme.name === ThemeName.dark
      ? "none"
      : `1px solid ${theme.colors.HIGHLIGHT}`};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) =>
      theme.name === ThemeName.dark
        ? theme.colors.HIGHLIGHT
        : theme.colors.BACKGROUND};
    background-color: ${({ theme }) =>
      theme.name === ThemeName.dark ? "transparent" : theme.colors.HIGHLIGHT};
  }

  &:focus-visible {
    opacity: 1;
  }
`;

export const GroupItem = styled.div`
  display: flex;

  &:hover {
    ${DeleteButton} {
      opacity: 1;
    }

    text-decoration: underline;
  }
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  margin-right: 65px;
  padding-left: 15px;
  min-width: 0;
  cursor: pointer;
  min-height: 40px;
  max-width: 1500px;

  &:focus-visible {
    text-decoration: underline;
  }
`;

export const Preview = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
