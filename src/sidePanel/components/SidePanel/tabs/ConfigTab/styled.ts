import styled from "styled-components";

import { FONT_SIZE_SECONDARY } from "sidePanel/globalStyles";

export const ConfigTabContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 100%;
`;

export const StyledFooter = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: end;
  justify-content: center;
  font-size: ${FONT_SIZE_SECONDARY};
  color: ${({ theme }) => theme.colors.HELP_TEXT};
`;

export const SourceCodeLink = styled.a`
  color: inherit;
  text-decoration: none;
  margin-left: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.HELP_TEXT};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.ACTIVE_TEXT};
    border-bottom-color: ${({ theme }) => theme.colors.ACTIVE_TEXT};
  }
`;
