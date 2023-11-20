import styled from "styled-components";

export const ScreenshotContainer = styled.div`
  display: flex;
  position: relative;
  align-self: flex-start;
  margin-top: 10px;
  border-radius: 2px;
  border: 1px solid #414750;
`;

export const CancelIconButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  border: none;
  background-color: #ec7211;
  border-radius: 2px;
  padding: 1px;
  cursor: pointer;

  &:hover {
    svg {
      stroke: #fafafa;
    }
  }
`;
