import styled, { keyframes } from "styled-components";

export const LoadingAnimation = keyframes`
  0% { content: ''; }
  25% { content: '.'; }
  50% { content: '..'; }
  75% { content: '...'; }
`;

export const LoadingState = styled.div<{ $showAnimation: boolean }>`
  display: flex;
  align-items: center;
  margin-left: 7px;
  height: 52px;
  font-weight: bold;

  &::after {
    display: ${({ $showAnimation }) =>
      $showAnimation ? "inline-block" : "none"};
    animation: ${LoadingAnimation} 0.8s steps(4, end) infinite;
    content: "";
  }
`;
