import styled, { keyframes } from "styled-components";

import { ColorTheme } from "sidePanel/utils/types";

export const HelpText = styled.div<{ theme: ColorTheme }>`
  color: ${({ theme }) => theme.ORANGE_1};
  font-size: 12px;
  margin-top: 3px;
`;

export const LoadingAnimation = keyframes`
  0% { content: ''; }
  25% { content: '.'; }
  50% { content: '..'; }
  75% { content: '...'; }
`;

export const LoadingState = styled.div`
  &:after {
    content: "";
    display: inline-block;
    animation: ${LoadingAnimation} 0.8s steps(4, end) infinite;
  }
`;
