import styled from "styled-components";

import { COLORS } from "sidePanel/utils/globalStyles";
import { Theme } from "sidePanel/utils/types";

export const StyledButton = styled.button<{
  disabled: boolean;
  theme: Theme;
}>`
  padding: 4px 20px;
  font-weight: 700;
  border: 1px solid ${COLORS.BLUE_3};
  border-radius: 2px;
  line-height: 22px;
  background-color: transparent;
  color: ${COLORS.BLUE_1};
  cursor: pointer;

  &:hover {
    border: 1px solid ${COLORS.BLUE_2};
    background-color: ${COLORS.BLACK_4};
    color: ${COLORS.WHITE_2};
  }

  &:disabled {
    border: 1px solid ${COLORS.ORANGE_3};
    background-color: transparent;
    color: ${COLORS.ORANGE_2};
    cursor: default;
  }
`;
