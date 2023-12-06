import styled from "styled-components";

import {
  BORDER_RADIUS,
  FONT_FAMILY,
  FONT_SIZE_PRIMARY,
  FONT_SIZE_SECONDARY,
  LINE_HEIGHT,
} from "sidePanel/globalStyles";

export const Container = styled.div`
  flex-grow: 1;
`;

export const StyledTextInput = styled.input`
  height: 32px;
  background-color: ${({ theme }) => theme.colors.INPUT_BACKGROUND};
  border-radius: ${BORDER_RADIUS};
  box-sizing: border-box;
  margin-top: 1px;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
  line-height: ${LINE_HEIGHT};
  max-width: 100%;
  resize: none;
  padding: 4px 8px;
  font-family: ${FONT_FAMILY};
  font-size: ${FONT_SIZE_PRIMARY};

  &::placeholder {
    color: ${({ theme }) => theme.colors.HELP_TEXT};
    font-style: italic;
  }

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.FOCUS};
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
  top: 18%;
  color: ${({ theme }) => theme.colors.HELP_TEXT};
  font-weight: 600;
  font-size: ${FONT_SIZE_SECONDARY};
  user-select: none;
`;
