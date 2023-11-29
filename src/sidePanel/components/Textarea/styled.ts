import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

import {
  FONT_FAMILY,
  FONT_SIZE,
  LINE_HEIGHT,
} from "sidePanel/utils/globalStyles";

export const StyledTextarea = styled(TextareaAutosize)`
  background-color: ${({ theme }) => theme.INPUT_BACKGROUND};
  border-radius: 2px;
  box-sizing: border-box;
  margin-top: 1px;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.PRIMARY_TEXT};
  line-height: ${LINE_HEIGHT};
  max-width: 100%;
  resize: none;
  font-family: ${FONT_FAMILY};
  font-size: ${FONT_SIZE};
  padding: 4px 8px;

  &::placeholder {
    color: ${({ theme }) => theme.GRAY_1};
    font-style: italic;
  }

  &:focus {
    outline: 1px solid ${({ theme }) => theme.FOCUS};
  }
`;
