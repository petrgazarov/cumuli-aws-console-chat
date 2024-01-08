import styled from "styled-components";

import { PrimaryButton, SecondaryButton } from "sidePanel/components/Button";
import { FONT_SIZE_SECONDARY } from "sidePanel/globalStyles";

export const SectionContainer = styled.div`
  margin-top: 35px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 247px;
`;

export const ButtonLabel = styled.div`
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.HELP_TEXT};
  font-size: ${FONT_SIZE_SECONDARY};
`;

export const ClearDataButton = styled(PrimaryButton)`
  flex-grow: 1;
`;

export const ConfirmButton = styled(PrimaryButton)`
  margin-right: 8px;
`;

export const CancelButton = styled(SecondaryButton)`
  flex-grow: 1;
`;
