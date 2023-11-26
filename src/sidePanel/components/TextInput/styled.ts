import styled from "styled-components";

import {
  BORDER_RADIUS,
  FONT_FAMILY,
  FONT_SIZE,
} from "sidePanel/utils/globalStyles";

export const StyledTextInput = styled.input`
  height: 25px;
  background-color: #1a2029;
  border-radius: ${BORDER_RADIUS};
  box-sizing: border-box;
  margin-top: 1px;
  outline: 2px dotted transparent;
  border: 1px solid ${({ theme }) => theme.BORDER};
  color: ${({ theme }) => theme.TEXT_MAIN};
  line-height: 22px;
  max-width: 100%;
  resize: none;
  font-family: ${FONT_FAMILY};
  font-size: ${FONT_SIZE};
  padding: 4px 8px;
`;
