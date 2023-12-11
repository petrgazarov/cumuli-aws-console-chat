import styled from "styled-components";

export const Container = styled.div`
  align-self: flex-start;
`;

export const CancelIconButton = styled.button`
  position: absolute;
  display: flex;
  opacity: 0;
  top: 2px;
  right: 2px;
  border: none;
  background-color: ${({ theme }) => theme.colors.HIGHLIGHT};
  border-radius: 2px;
  padding: 1px;
  cursor: pointer;

  &:focus-visible {
    opacity: 1;
  }
`;

export const ScreenshotContainer = styled.div`
  display: flex;
  position: relative;
  align-self: flex-start;
  margin-top: 10px;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.INPUT_BACKGROUND};

  &:hover {
    ${CancelIconButton} {
      opacity: 1;
    }
  }
`;

export const ScreenshotImage = styled.img`
  height: 95px;
  width: auto;
`;
