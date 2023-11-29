import styled, { keyframes } from "styled-components";

export const HelpText = styled.div`
  font-size: 13px;
  margin-top: 3px;
  color: ${({ theme }) => theme.HELP_TEXT};
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
