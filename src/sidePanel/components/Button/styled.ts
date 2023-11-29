import styled from "styled-components";

import { LINE_HEIGHT } from "sidePanel/utils/globalStyles";
import { ColorTheme } from "sidePanel/utils/types";

const ButtonBase = styled.button<{
  disabled: boolean;
  theme: ColorTheme;
}>`
  padding: 4px 20px;
  font-weight: 700;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  line-height: ${LINE_HEIGHT};
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`;

export const PrimaryButton = styled(ButtonBase)`
  border-color: ${({ theme }) => theme.HIGHLIGHT};
  background-color: transparent;
  color: ${({ theme }) => theme.PRIMARY_TEXT};

  &:hover {
    color: ${({ theme }) => theme.HIGHLIGHT};
  }
`;

export const SecondaryButton = styled(ButtonBase)`
  border-color: ${({ theme }) => theme.ACTIVE_TEXT};
  background-color: transparent;
  color: ${({ theme }) => theme.PRIMARY_TEXT};

  &:hover {
    color: ${({ theme }) => theme.ACTIVE_TEXT};
  }

  &:disabled {
    border-color: ${({ theme }) => theme.HELP_TEXT};
    color: ${({ theme }) => theme.HELP_TEXT};
  }
`;
