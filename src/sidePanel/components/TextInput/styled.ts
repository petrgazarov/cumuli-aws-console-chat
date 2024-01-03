import styled from "styled-components";

import {
  BORDER_RADIUS,
  FONT_FAMILY,
  FONT_SIZE_PRIMARY,
  FONT_SIZE_SECONDARY,
  LINE_HEIGHT,
} from "sidePanel/globalStyles";

import { ThemeName } from "../../utils/types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex-grow: 1;
`;

export const StyledTextInput = styled.input`
  height: 32px;
  background-color: ${({ theme }) => theme.colors.INPUT_BACKGROUND};
  border-radius: ${BORDER_RADIUS};
  border: 1px solid ${({ theme }) => theme.colors.INPUT_BORDER};
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
  line-height: ${LINE_HEIGHT};
  max-width: 100%;
  padding: 4px 8px;
  font-family: ${FONT_FAMILY};
  font-size: ${FONT_SIZE_PRIMARY};

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

  /* Avoid overlapping with the saved status on tiny screens */
  @media (width < 355px) {
    padding-right: 60px;
  }
`;

export const Label = styled.div`
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.HELP_TEXT};
  font-size: ${FONT_SIZE_SECONDARY};
`;

export const TextInputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const SavedStatus = styled.div`
  position: absolute;
  right: 15px;
  top: 17%;
  color: ${({ theme }) => theme.colors.HELP_TEXT};
  font-weight: 600;
  font-size: ${FONT_SIZE_SECONDARY};
  user-select: none;
`;
