import styled, { keyframes } from "styled-components";

export const LoadingAnimation = keyframes`
  0% { content: ''; }
  25% { content: '.'; }
  50% { content: '..'; }
  75% { content: '...'; }
`;

export const LoadingState = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;

  &::after {
    display: inline-block;
    animation: ${LoadingAnimation} 0.8s steps(4, end) infinite;
    content: "";
  }
`;
