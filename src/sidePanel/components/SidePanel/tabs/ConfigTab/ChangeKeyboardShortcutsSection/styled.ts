import styled from "styled-components";

import { SecondaryButton } from "sidePanel/components/Button";
import { FONT_SIZE_SECONDARY } from "sidePanel/globalStyles";

export const SectionContainer = styled.div`
  margin-top: 35px;
`;

export const ButtonLabel = styled.div`
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.HELP_TEXT};
  font-size: ${FONT_SIZE_SECONDARY};
`;

export const ChangeShortcutsButton = styled(SecondaryButton)`
  width: 247px;
`;
