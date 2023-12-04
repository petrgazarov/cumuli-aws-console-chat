import styled, { keyframes } from "styled-components";

import { FONT_SIZE_SECONDARY } from "sidePanel/utils/globalStyles";

export const HelpText = styled.div`
  font-size: ${FONT_SIZE_SECONDARY};
  margin-top: 3px;
  color: ${({ theme }) => theme.colors.HELP_TEXT};
`;

export const LoadingAnimation = keyframes`
  0% { content: ''; }
  25% { content: '.'; }
  50% { content: '..'; }
  75% { content: '...'; }
`;

export const LoadingState = styled.div`
  &::after {
    display: inline-block;
    animation: ${LoadingAnimation} 0.8s steps(4, end) infinite;
    content: "";
  }
`;

export const KeyboardSymbol = styled.span`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
`;

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.HIGHLIGHT};
`;

export const ErrorText = styled.div`
  font-size: ${FONT_SIZE_SECONDARY};
`;
