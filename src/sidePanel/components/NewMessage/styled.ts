import styled, { keyframes } from "styled-components";

import { FONT_FAMILY, FONT_SIZE } from "sidePanel/utils/globalStyles";

export const NewMessageTextarea = styled.textarea`
  min-height: 52px;
  background-color: #1a2029;
  border-radius: 2px;
  box-sizing: border-box;
  margin-top: 1px;
  outline: 2px dotted transparent;
  border: 1px solid #879596;
  color: #d5dbdb;
  line-height: 22px;
  max-width: 100%;
  resize: none;
  font-family: ${FONT_FAMILY};
  font-size: ${FONT_SIZE};
  padding: 4px 8px;

  &:focus {
    border: 1px solid #00a1c9;
    box-shadow: 0 0 0 1px #00a1c9;
  }
`;

export const HelpText = styled.div`
  color: #95a5a6;
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
