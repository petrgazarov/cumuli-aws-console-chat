import styled from "styled-components";

import { ColorTheme } from "sidePanel/utils/types";

export const StyledButton = styled.button<{
  disabled: boolean;
  theme: ColorTheme;
}>`
  padding: 4px 20px;
  color: ${({ theme }) => theme.BLUE_1};
  font-weight: 700;
  border: 1px solid ${({ theme }) => theme.BLUE_3};
  border-radius: 2px;
  line-height: 22px;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.BLACK_4};
    border: 1px solid ${({ theme }) => theme.BLUE_2};
    color: ${({ theme }) => theme.WHITE_2};
  }

  &:disabled {
    cursor: default;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.ORANGE_3};
    color: ${({ theme }) => theme.ORANGE_2};
  }
`;
