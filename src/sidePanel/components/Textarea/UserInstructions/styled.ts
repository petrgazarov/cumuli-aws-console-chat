import styled from "styled-components";

import { FONT_SIZE_SECONDARY } from "sidePanel/globalStyles";

export const HelpText = styled.div`
  font-size: ${FONT_SIZE_SECONDARY};
  margin-top: 3px;
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.HELP_TEXT};
  user-select: none;
`;

export const KeySymbol = styled.span`
  font-family: monospace, sans-serif;
  font-size: 12px;
`;
