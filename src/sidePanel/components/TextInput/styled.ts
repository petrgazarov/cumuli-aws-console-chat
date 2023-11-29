import styled from "styled-components";

import {
  BORDER_RADIUS,
  FONT_FAMILY,
  FONT_SIZE,
  LINE_HEIGHT,
} from "sidePanel/utils/globalStyles";

export const Container = styled.div`
  flex-grow: 1;
`;

export const StyledTextInput = styled.input`
  height: 32px;
  background-color: ${({ theme }) => theme.INPUT_BACKGROUND};
  border-radius: ${BORDER_RADIUS};
  box-sizing: border-box;
  margin-top: 1px;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.PRIMARY_TEXT};
  line-height: ${LINE_HEIGHT};
  max-width: 100%;
  resize: none;
  padding: 4px 8px;
  font-family: ${FONT_FAMILY};
  font-size: ${FONT_SIZE};

  &::placeholder {
    color: ${({ theme }) => theme.GRAY_1};
    font-style: italic;
  }

  &:focus {
    outline: 1px solid ${({ theme }) => theme.FOCUS};
  }
`;

export const Label = styled.div`
  margin-bottom: 4px;
  color: ${({ theme }) => theme.HELP_TEXT};
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
  color: ${({ theme }) => theme.SUCCESS_TEXT};
  font-weight: 600;
  font-size: 13px;
  user-select: none;
`;
