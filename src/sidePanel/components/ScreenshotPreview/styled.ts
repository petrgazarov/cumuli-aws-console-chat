import styled from "styled-components";

import { ColorTheme } from "sidePanel/utils/types";

export const CancelIconButton = styled.button<{ theme: ColorTheme }>`
  position: absolute;
  top: 2px;
  right: 2px;
  display: none;
  border: none;
  background-color: ${({ theme }) => theme.ORANGE_4};
  border-radius: 2px;
  padding: 1px;
  cursor: pointer;

  &:hover {
    svg {
      stroke: ${({ theme }) => theme.WHITE_2};
    }
  }
`;

export const ScreenshotContainer = styled.div<{ theme: ColorTheme }>`
  display: flex;
  position: relative;
  align-self: flex-start;
  margin-top: 10px;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.GRAY_2};

  &:hover {
    ${CancelIconButton} {
      display: flex;
    }
  }
`;
