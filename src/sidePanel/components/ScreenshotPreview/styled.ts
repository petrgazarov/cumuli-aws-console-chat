import styled from "styled-components";

import { COLORS } from "sidePanel/utils/globalStyles";
import { Theme } from "sidePanel/utils/types";

export const CancelIconButton = styled.button<{ theme: Theme }>`
  position: absolute;
  top: 2px;
  right: 2px;
  display: none;
  border: none;
  background-color: ${COLORS.ORANGE_4};
  border-radius: 2px;
  padding: 1px;
  cursor: pointer;

  &:hover {
    svg {
      stroke: ${COLORS.WHITE_2};
    }
  }
`;

export const ScreenshotContainer = styled.div<{ theme: Theme }>`
  display: flex;
  position: relative;
  align-self: flex-start;
  margin-top: 10px;
  border-radius: 2px;
  border: 1px solid ${COLORS.GRAY_2};

  &:hover {
    ${CancelIconButton} {
      display: flex;
    }
  }
`;
