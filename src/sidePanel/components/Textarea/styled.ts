import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

import {
  FONT_FAMILY,
  FONT_SIZE_PRIMARY,
  LINE_HEIGHT,
} from "sidePanel/globalStyles";
import { ThemeName } from "sidePanel/utils/types";

export enum ContainerBottomMargin {
  default = "0px",
  largeNegative = "-13px",
  smallNegative = "-7px",
}

export const Container = styled.div<{ $bottomMargin: ContainerBottomMargin }>`
  z-index: 1;

  /* Hack to reduce the space before the next message */
  & + * {
    margin-top: ${({ $bottomMargin }) => $bottomMargin};
  }
`;

export const StyledTextarea = styled(TextareaAutosize)`
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.INPUT_BACKGROUND};
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.INPUT_BORDER};
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
  line-height: ${LINE_HEIGHT};
  resize: none;
  font-family: ${FONT_FAMILY};
  font-size: ${FONT_SIZE_PRIMARY};
  padding: 4px 30px 4px 8px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.HELP_TEXT};
    font-style: italic;
  }

  &:focus {
    outline: ${({ theme }) =>
      theme.name === ThemeName.dark
        ? "none"
        : `1px solid ${theme.colors.FOCUS}`};
    border: 1px solid ${({ theme }) => theme.colors.INPUT_FOCUSED_BORDER};
  }
`;

export const SendButton = styled.button<{ $show: boolean }>`
  position: absolute;
  display: ${({ $show }) => ($show ? "flex" : "none")};
  right: 4px;
  bottom: 1px;
  padding: 6px;
  background: transparent;
  border: none;
  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.colors.PRIMARY_TEXT};
  }

  &:disabled {
    cursor: default;

    svg {
      fill: ${({ theme }) => theme.colors.HELP_TEXT};
    }
  }

  &:hover:enabled {
    svg {
      fill: ${({ theme }) => theme.colors.ACTIVE_TEXT};
    }
  }
`;

export const TextareaContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;
