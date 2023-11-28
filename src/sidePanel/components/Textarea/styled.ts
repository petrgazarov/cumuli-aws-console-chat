import styled from "styled-components";

import { FONT_FAMILY, FONT_SIZE } from "sidePanel/utils/globalStyles";
import { COLORS } from "sidePanel/utils/globalStyles";
import { Theme } from "sidePanel/utils/types";

export const StyledTextarea = styled.textarea<{ theme: Theme }>`
  min-height: 52px;
  background-color: ${COLORS.BLACK_5};
  border-radius: 2px;
  box-sizing: border-box;
  margin-top: 1px;
  outline: 2px dotted transparent;
  border: 1px solid ${COLORS.BLUE_3};
  color: ${COLORS.BLUE_1};
  line-height: 22px;
  max-width: 100%;
  resize: none;
  font-family: ${FONT_FAMILY};
  font-size: ${FONT_SIZE};
  padding: 4px 8px;

  &::placeholder {
    color: ${COLORS.GRAY_1};
    font-style: italic;
  }

  &:focus {
    border: 1px solid ${COLORS.BLUE_5};
    box-shadow: 0 0 0 1px ${COLORS.BLUE_5};
  }
`;
