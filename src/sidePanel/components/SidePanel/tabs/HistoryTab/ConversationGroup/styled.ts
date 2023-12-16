import styled from "styled-components";

import { ButtonBase } from "sidePanel/components/Button";
import { FONT_SIZE_SECONDARY } from "sidePanel/globalStyles";
import { ThemeName } from "sidePanel/utils/types";

export const Container = styled.div``;

export const GroupLabel = styled.div`
  color: ${({ theme }) => theme.colors.HELP_TEXT};
  font-size: ${FONT_SIZE_SECONDARY};
`;

export const GroupContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DeleteButton = styled(ButtonBase)`
  opacity: 0;
  margin-right: 5px;
  padding: 3px 9px;
  color: ${({ theme }) =>
    theme.name === ThemeName.dark
      ? theme.colors.PRIMARY_TEXT
      : theme.colors.HIGHLIGHT};
  background-color: transparent;
  font-size: ${FONT_SIZE_SECONDARY};
  border-color: ${({ theme }) => theme.colors.HIGHLIGHT};

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

export const PreviewContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  margin-right: 15px;
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

export const GroupItem = styled.div`
  display: flex;

  &:hover {
    ${DeleteButton} {
      opacity: 1;
    }

    ${PreviewContainer} {
      text-decoration: underline;
    }
  }
`;
