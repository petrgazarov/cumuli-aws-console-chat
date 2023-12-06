import styled from "styled-components";

import { FONT_SIZE_SECONDARY } from "sidePanel/globalStyles";

export const HelpText = styled.div`
  font-size: ${FONT_SIZE_SECONDARY};
  margin-top: 3px;
  color: ${({ theme }) => theme.colors.HELP_TEXT};
`;

export const KeyboardSymbol = styled.span`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
`;
