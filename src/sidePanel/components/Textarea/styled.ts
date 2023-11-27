import styled from "styled-components";

import { FONT_FAMILY, FONT_SIZE } from "sidePanel/utils/globalStyles";
import { ColorTheme } from "sidePanel/utils/types";

export const StyledTextarea = styled.textarea<{ theme: ColorTheme }>`
  min-height: 52px;
  background-color: ${({ theme }) => theme.BLACK_5};
  border-radius: 2px;
  box-sizing: border-box;
  margin-top: 1px;
  outline: 2px dotted transparent;
  border: 1px solid ${({ theme }) => theme.BLUE_3};
  color: #d5dbdb;
  line-height: 22px;
  max-width: 100%;
  resize: none;
  font-family: ${FONT_FAMILY};
  font-size: ${FONT_SIZE};
  padding: 4px 8px;

  &::placeholder {
    font-style: italic;
    color: ${({ theme }) => theme.GRAY_1};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.BLUE_5};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.BLUE_5};
  }
`;
