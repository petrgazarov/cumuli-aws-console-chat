import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

import {
  FONT_FAMILY,
  FONT_SIZE_PRIMARY,
  LINE_HEIGHT,
} from "sidePanel/globalStyles";

export const StyledTextarea = styled(TextareaAutosize)`
  background-color: ${({ theme }) => theme.colors.INPUT_BACKGROUND};
  border-radius: 2px;
  box-sizing: border-box;
  margin-top: 1px;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.colors.PRIMARY_TEXT};
  line-height: ${LINE_HEIGHT};
  max-width: 100%;
  resize: none;
  font-family: ${FONT_FAMILY};
  font-size: ${FONT_SIZE_PRIMARY};
  padding: 4px 8px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.HELP_TEXT};
    font-style: italic;
  }

  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.FOCUS};
  }
`;
